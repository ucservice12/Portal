const express = require("express");
const {
  registerOrVerify,
  login,
  getMe,
  updateDetails,
  updatePassword,
  forgotPassword,
  verifyForgotOtp,
  resetPassword,
  logout,
} = require("../controllers/authController");

const { protect } = require("../middleware/auth");

const router = express.Router();

// Public routes
router.post("/register", registerOrVerify);
router.post("/login", login);

// Forgot password (OTP flow)
router.post("/forgotpassword", forgotPassword);
router.post("/verifyforgototp", verifyForgotOtp);
router.put("/resetpassword", resetPassword);

// Logout
router.get("/logout", logout);

// Protected routes
router.get("/me", protect, getMe);
router.put("/updatedetails", protect, updateDetails);
router.put("/updatepassword", protect, updatePassword);

module.exports = router;
