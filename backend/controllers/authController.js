const crypto = require("crypto");
const User = require("../models/User");
const Organization = require('../models/Organization');
const NotificationTriggers = require("../utils/notificationTriggers");
const { sendEmail } = require("../utils/nodemailer");
const { setOtp, getOtp, deleteOtp } = require("../utils/otpStore");
const sendTokenResponse = require("../utils/sendTokenResponse");

// ================== REGISTER WITH OTP ==================
exports.registerOrVerify = async (req, res) => {
  try {
    const { email, otp, firstName, password } = req.body;

    if (!email) {
      return res.status(400).json({ success: false, error: "Email is required" });
    }

    // STEP 1: Send OTP
    if (!otp) {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(409).json({ success: false, error: "User already exists. Please Login" });
      }

      const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();
      setOtp(email, generatedOtp);

      await sendEmail({
        to: email,
        subject: "Delight360 - Email Verification Code",
        html: `<h3>Your verification code is: <b>${generatedOtp}</b></h3><p>Valid for 10 minutes.</p>`,
      });

      return res.status(200).json({ success: true, step: "verifyOtp", message: "OTP sent successfully" });
    }

    // STEP 2: Verify OTP
    const record = getOtp(email);
    if (!record) return res.status(400).json({ success: false, error: "OTP not found or expired" });
    if (Date.now() > record.expiresAt) {
      deleteOtp(email);
      return res.status(400).json({ success: false, error: "OTP expired" });
    }
    if (record.otp !== otp) return res.status(400).json({ success: false, error: "Invalid OTP" });

    deleteOtp(email);

    // STEP 3: Create user
    const user = await User.create({
      firstName,
      email,
      password,
      status: "active",
      role: "admin",
    });

    // STEP 4: Send JWT
    sendTokenResponse(user, 201, res, "User created successfully");
  } catch (error) {
    console.error("Register error:", error);
    return res.status(500).json({ success: false, error: "Server error" });
  }
};

// ================== LOGIN ==================
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ success: false, error: "Please provide email and password" });
    }

    const user = await User.findOne({ email })
      .select("+password")
      .populate("organization", "name subscription isActive");

    if (!user) return res.status(401).json({ success: false, error: "Invalid credentials" });

    if (user.status !== "active") {
      return res.status(401).json({ success: false, error: "Account inactive. Contact admin." });
    }

    if (user.organization && !user.organization.isActive) {
      return res.status(401).json({ success: false, error: "Organization inactive. Contact support." });
    }

    if (user.organization?.subscription) {
      const subStatus = user.organization.subscription.status;
      if (["expired", "inactive"].includes(subStatus)) {
        return res.status(401).json({ success: false, error: `Subscription ${subStatus}. Please renew.` });
      }
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) return res.status(401).json({ success: false, error: "Invalid credentials" });

    user.lastLogin = new Date();
    await user.save();

    sendTokenResponse(user, 200, res, "Login successful");
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ success: false, error: "Server error" });
  }
};

// ================== GET ME ==================
exports.getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate('organization');
    if (!user) return res.status(404).json({ success: false, error: 'User not found' });

    if (user.organization && user.organization.isExpired()) {
      user.organization.subscription.status = 'expired';
      user.organization.isActive = false;
      await user.organization.save();
    }

    res.status(200).json({ success: true, data: user });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

// ================== UPDATE DETAILS ==================
exports.updateDetails = async (req, res) => {
  try {
    const fieldsToUpdate = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      phone: req.body.phone,
      preferences: req.body.preferences,
    };

    const user = await User.findByIdAndUpdate(req.user.id, fieldsToUpdate, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({ success: true, data: user });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

// ================== UPDATE PASSWORD (logged in) ==================
exports.updatePassword = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("+password");
    if (!(await user.matchPassword(req.body.currentPassword))) {
      return res.status(401).json({ success: false, error: "Password incorrect" });
    }
    user.password = req.body.newPassword;
    await user.save();
    sendTokenResponse(user, 200, res, "Password updated successfully");
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

// ================== FORGOT PASSWORD (Step 1) ==================
exports.forgotPassword = async (req, res) => {
  try {
    const email = req.body.email.trim().toLowerCase();
    const user = await User.findOne({ email });
    if (!user)
      return res.status(404).json({ success: false, error: "No user found with that email" });

    // Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // Store OTP properly
    setOtp(email, otp);  // Now OTP stored as { otp, expiresAt }

    // Send OTP email
    await sendEmail({
      to: email,
      subject: "Password Reset OTP - Delight360",
      html: `<h3>Password Reset</h3><p>Your OTP is: <b>${otp}</b></p><p>Valid for 10 minutes.</p>`,
    });

    return res.status(200).json({
      success: true,
      step: "verifyOtp",
      message: "OTP sent successfully",
    });

  } catch (err) {
    console.error("forgotPassword error:", err);
    return res.status(500).json({ success: false, error: "Server error" });
  }
};

// ================== VERIFY OTP (Step 2) ==================
exports.verifyForgotOtp = async (req, res) => {
  try {
    const email = req.body.email.trim().toLowerCase();
    const otp = req.body.otp;
    const record = getOtp(email); // this must not be undefined if OTP was set

    if (!record || !record.otp) {
      return res.status(400).json({ success: false, error: "No OTP found. Please request a new one." });
    }

    if (Date.now() > record.expiresAt) {
      deleteOtp(email);
      return res.status(400).json({ success: false, error: "OTP expired. Please request a new one." });
    }

    if (record.otp !== otp) {
      return res.status(400).json({ success: false, error: "Invalid OTP. Please check and try again." });
    }

    // OTP verified
    deleteOtp(email);       // remove old OTP
    markVerified(email);    // mark email verified for password reset

    return res.status(200).json({
      success: true,
      step: "resetPassword",
      message: "OTP verified successfully. You can reset your password now.",
    });
  } catch (err) {
    console.error("verifyForgotOtp error:", err);
    return res.status(500).json({ success: false, error: "Server error" });
  }
};


// ================== RESET PASSWORD (Step 3) ==================
exports.resetPassword = async (req, res) => {
  try {
    const email = req.body.email.trim().toLowerCase();
    const newPassword = req.body.newPassword;

    const record = getOtp(email);
    if (!record || !record.verified) {
      return res.status(400).json({ success: false, error: "OTP not verified. Cannot reset password." });
    }

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ success: false, error: "User not found" });

    user.password = newPassword;
    await user.save();

    deleteOtp(email); // clean up

    sendTokenResponse(user, 200, res, "Password reset successful");
  } catch (err) {
    console.error("resetPassword error:", err);
    return res.status(500).json({ success: false, error: "Server error" });
  }
};

// ================== LOGOUT ==================
exports.logout = async (req, res) => {
  res.cookie("cognitoIdentity", "none", {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
    sameSite: "lax",
  });
  res.status(200).json({ success: true, message: "Logged out successfully" });
};
