import { customAxios } from "@/services/customAxios";

// ================== AUTH API SERVICES ==================

// Register new user (Step 1: Send OTP, Step 2: Verify + Create User)
export function register(data) {
  // data: { email } OR { email, otp, firstName, password }
  return customAxios.post("/auth/register", data);
}

// User login
export function login(data) {
  // data: { email, password }
  return customAxios.post("/auth/login", data);
}

// Get current user
export function getMe() {
  return customAxios.get("/auth/me");
}

// Update user details
export function updateDetails(data) {
  return customAxios.put("/auth/updatedetails", data);
}

// Update password (when logged in)
export function updatePassword(data) {
  // data: { currentPassword, newPassword }
  return customAxios.put("/auth/updatepassword", data);
}

// ================== PASSWORD RESET FLOW ==================

// Step 1: Forgot password (send OTP)
export function forgotPassword(email) {
  return customAxios.post("/auth/forgotpassword", { email });
}

// Step 2: Verify OTP
export function verifyForgotOtp(email, otp) {
  return customAxios.post("/auth/verifyforgototp", { email, otp });
}

// Step 3: Reset password (after OTP verified)
export function resetPassword(email, password) {
  return customAxios.post("/auth/resetpassword", { email, password });
}

// ================== LOGOUT ==================
export function logoutApi() {
  return customAxios.get("/auth/logout");
}
