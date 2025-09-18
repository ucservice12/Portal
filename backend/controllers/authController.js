const crypto = require("crypto");
const User = require("../models/User");
const Organization = require("../models/Organization");
const NotificationTriggers = require("../utils/notificationTriggers");
const { sendEmail } = require("../utils/nodemailer");
const { setOtp, getOtp, deleteOtp } = require("../utils/otpStore");

// @desc    Register user
// @route   POST /api/v1/auth/register
// @access  Public
// const { firstName, email, password, role, organizationId } = req.body;

exports.register = async (req, res) => {
  try {
    const { email } = req.body;

    // Basic validation
    if (!email) {
      return res.status(400).json({
        success: false,
        error: "Email is required",
      });
    }

    // Check if the user already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        error: "User already exists Please Login",
      });
    }
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    await sendEmail({
      to: email,
      subject: "Your OTP Code",
      text: `Your OTP is ${otp}. It is valid for 10 minutes.`,
      html: `<p>Your OTP is <strong>${otp}</strong>. It is valid for 10 minutes.</p>`,
    });

    setOtp(email, otp);

    return res.status(200).json({ success: true, message: "OTP sent successfully" });

    // // Check if organization exists
    // const organization = await Organization.findById(organizationId);
    // if (!organization) {
    //   return res.status(404).json({
    //     success: false,
    //     error: "Organization not found...",
    //   });
    // }

    // Check subscription limits
    // const userCount = await User.countDocuments({
    //   organization: organizationId,
    // });
    // if (userCount >= organization.subscription.features.maxUsers) {
    //   return res.status(400).json({
    //     success: false,
    //     error: "User limit reached for current subscription plan",
    //   });
    // }

    // Generate employee ID
    // const employeeId = `EMP-${String(userCount + 1).padStart(6, "0")}`;

    // Create user
    // const user = await User.create({
    //   firstName,
    //   lastName,
    //   email,
    //   password,
    //   role,
    //   organization: organizationId,
    //   employeeId,
    // });

    // Send welcome notification
    // await NotificationTriggers.onUserCreated(user, password);

    // sendTokenResponse(user, 201, res);
    
  } catch (error) {
    console.error("Registration error:", error);
    return res.status(500).json({
      success: false,
      error: "Server error during registration. Please try again.",
    });
  }
};


// routes/verifyOtp.js
exports.verifyOtp = (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({
        success: false,
        error: "Email and OTP are required",
      });
    }

    const record = getOtp(email); // Retrieve OTP from in-memory store or cache

    if (!record) {
      return res.status(400).json({
        success: false,
        error: "OTP not found or expired",
      });
    }

    if (Date.now() > record.expiresAt) {
      deleteOtp(email); // Clean up expired OTP
      return res.status(400).json({
        success: false,
        error: "OTP expired",
      });
    }

    if (record.otp !== otp) {
      return res.status(400).json({
        success: false,
        error: "Invalid OTP",
      });
    }

    deleteOtp(email); // Clean up used OTP

    return res.status(200).json({
      success: true,
      message: "OTP verified successfully",
    });
  } catch (error) {
    console.error("Error verifying OTP:", error);
    return res.status(500).json({
      success: false,
      error: "Server error while verifying OTP",
    });
  }
};



// @desc    Login user
// @route   POST /api/v1/auth/login
// @access  Public
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate email & password
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        error: "Please provide an email and password",
      });
    }

    // Check for user
    const user = await User.findOne({ email })
      .select("+password")
      .populate("organization", "name subscription");

    if (!user) {
      return res.status(401).json({
        success: false,
        error: "Invalid credentials",
      });
    }

    // Check if user is active
    if (user.status !== "active") {
      return res.status(401).json({
        success: false,
        error: "Account is inactive. Please contact administrator.",
      });
    }

    // Check if organization is active
    if (!user.organization.isActive) {
      return res.status(401).json({
        success: false,
        error: "Organization is inactive. Please contact support.",
      });
    }

    // Check if password matches
    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        error: "Invalid credentials",
      });
    }

    // Update last login
    user.lastLogin = new Date();
    await user.save();

    sendTokenResponse(user, 200, res);
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message,
    });
  }
};

// @desc    Get current logged in user
// @route   GET /api/v1/auth/me
// @access  Private
exports.getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate(
      "organization",
      "name subscription settings"
    );

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message,
    });
  }
};

// @desc    Update user details
// @route   PUT /api/v1/auth/updatedetails
// @access  Private
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

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message,
    });
  }
};

// @desc    Update password
// @route   PUT /api/v1/auth/updatepassword
// @access  Private
exports.updatePassword = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("+password");

    // Check current password
    if (!(await user.matchPassword(req.body.currentPassword))) {
      return res.status(401).json({
        success: false,
        error: "Password is incorrect",
      });
    }

    user.password = req.body.newPassword;
    await user.save();

    sendTokenResponse(user, 200, res);
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message,
    });
  }
};

// @desc    Forgot password
// @route   POST /api/v1/auth/forgotpassword
// @access  Public
exports.forgotPassword = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(404).json({
        success: false,
        error: "There is no user with that email",
      });
    }

    // Get reset token
    const resetToken = user.getResetPasswordToken();

    await user.save({ validateBeforeSave: false });

    // Create reset url
    const resetUrl = `${req.protocol}://${req.get(
      "host"
    )}/api/v1/auth/resetpassword/${resetToken}`;

    const message = `You are receiving this email because you (or someone else) has requested the reset of a password. Please make a PUT request to: \n\n ${resetUrl}`;

    try {
      // Send email notification
      await NotificationService.queueNotification({
        type: "email",
        data: {
          to: user.email,
          subject: "Password Reset Request",
          html: `
            <h3>Password Reset Request</h3>
            <p>You are receiving this email because you (or someone else) has requested the reset of a password.</p>
            <p>Please click the link below to reset your password:</p>
            <a href="${resetUrl}" style="background-color: #007bff; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Reset Password</a>
            <p>If you did not request this, please ignore this email and your password will remain unchanged.</p>
          `,
          organizationId: user.organization,
          metadata: {
            userId: user._id,
            relatedTo: "user",
            relatedId: user._id,
            priority: "high",
          },
        },
      });

      res.status(200).json({
        success: true,
        data: "Email sent",
      });
    } catch (err) {
      console.log(err);
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;

      await user.save({ validateBeforeSave: false });

      return res.status(500).json({
        success: false,
        error: "Email could not be sent",
      });
    }
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message,
    });
  }
};

// @desc    Reset password
// @route   PUT /api/v1/auth/resetpassword/:resettoken
// @access  Public
exports.resetPassword = async (req, res) => {
  try {
    // Get hashed token
    const resetPasswordToken = crypto
      .createHash("sha256")
      .update(req.params.resettoken)
      .digest("hex");

    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        error: "Invalid token",
      });
    }

    // Set new password
    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();

    sendTokenResponse(user, 200, res);
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message,
    });
  }
};

// @desc    Log user out / clear cookie
// @route   GET /api/v1/auth/logout
// @access  Private
exports.logout = async (req, res) => {
  res.cookie("token", "none", {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    data: {},
  });
};

// Get token from model, create cookie and send response
const sendTokenResponse = (user, statusCode, res) => {
  // Create token
  const token = user.getSignedJwtToken();

  const options = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  if (process.env.NODE_ENV === "production") {
    options.secure = true;
  }

  res
    .status(statusCode)
    .cookie("token", token, options)
    .json({
      success: true,
      token,
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
        organization: user.organization,
        permissions: user.permissions,
        preferences: user.preferences,
      },
    });
};
