// utils/otpStore.js
const otpStore = new Map();

function setOtp(email, otp) {
    const expiresAt = Date.now() + 10 * 60 * 1000; // 10 minutes
    otpStore.set(email, { otp, expiresAt });
}

function getOtp(email) {
    return otpStore.get(email);
}

function deleteOtp(email) {
    otpStore.delete(email);
}

module.exports = {
    setOtp,
    getOtp,
    deleteOtp,
};
