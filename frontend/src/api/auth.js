import { customAxios } from "@/services/customAxios";

// Register new user
export function register(data) {
    return customAxios.post("/auth/register", data);
}

// User login
export function login(data) {
    return customAxios.post("/auth/login", data);
}

// Verify email OTP
export function verifyEmailOtp(otp, email) {
    return customAxios.post("/auth/verify-otp", { otp, email });
}

// Get current user
export function getMe() {
    console.log("GetMe called");
    // return customAxios.get("/auth/me");
}

// Update user details
export function updateDetails(data) {
    console.log("Update details called with:", data);
    // return customAxios.put("/auth/updatedetails", data);
}

// Update password
export function updatePassword(data) {
    console.log("Update password called with:", data);
    // return customAxios.put("/auth/updatepassword", data);
}

// Forgot password
export function forgotPassword(email) {
    console.log("Forgot password called with:", email);
    // return customAxios.post("/auth/forgotpassword", { email });
}

// Reset password
export function resetPassword(token, password) {
    console.log("Reset password called with:", { token, password });
    // return customAxios.put(`/auth/resetpassword/${token}`, { password });
}

// Logout user
export function logout() {
    console.log("Logout called");
    // return customAxios.get("/auth/logout");
}
