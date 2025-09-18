import React, { useState, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { verifyEmailOtp } from "@/api/auth";

export function VerifyOtp() {
    const { otpEmail, loading, setLoading, setStep, user } = useAuth();

    const [otp, setOtp] = useState(Array(6).fill(""));
    const [error, setError] = useState("");

    // Refs for all inputs
    const inputRefs = useRef([]);

    const handleChange = (idx, val) => {
        if (!/^[0-9]?$/.test(val)) return;

        const newOtp = [...otp];
        newOtp[idx] = val;
        setOtp(newOtp);

        if (val && idx < 5) inputRefs.current[idx + 1]?.focus();
    };

    const handleKeyDown = (idx, e) => {
        if (e.key === "Backspace" && !otp[idx] && idx > 0) {
            inputRefs.current[idx - 1]?.focus();
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const otpCode = otp.join("");

        if (otpCode.length < 6) {
            setError("Please enter the full 6-digit code.");
            return;
        }

        setError("");
        setLoading(true);

        try {
            const res = await verifyEmailOtp(otpCode, otpEmail);

            if (res.status === 200) {
                // Convert user object to base64 (JWT-like)
                const encodedUser = btoa(JSON.stringify(user));
                localStorage.setItem("cognitoIdentity", encodedUser);

                setStep("createOrg");
            } else {
                setStep("register");
            }
        } catch (err) {
            setError(err?.message || "Failed to verify OTP");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form
            className="w-full max-w-sm lg:mt-20 mx-auto flex flex-col items-center space-y-6"
            onSubmit={handleSubmit}
        >
            <div className="text-4xl text-blue-500">📩</div>
            <h2 className="sm:text-3xl text-2xl font-semibold tracking-tight mb-1">
                Verify your Email
            </h2>
            <p className="text-muted-foreground text-sm mb-4 text-center">
                We have sent a verification code to your email
                <br />
                <span className="font-semibold">{otpEmail}</span>
            </p>

            {/* OTP Input Boxes */}
            <div className="flex space-x-2">
                {otp.map((digit, idx) => (
                    <Input
                        key={idx}
                        type="text"
                        maxLength={1}
                        className="sm:w-10 w-9 sm:h-10 h-9 text-center border rounded-md text-xl"
                        value={digit}
                        onChange={(e) => handleChange(idx, e.target.value)}
                        onKeyDown={(e) => handleKeyDown(idx, e)}
                        ref={(el) => (inputRefs.current[idx] = el)}
                    />
                ))}
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            {/* Verify Button */}
            <Button
                className="w-full py-2 rounded-md text-white font-semibold bg-blue-500 hover:bg-blue-600"
                type="submit"
                disabled={loading}
            >
                {loading ? "Verifying..." : "Verify"}
            </Button>

            {/* Actions */}
            <div className="grid grid-cols-2 gap-4 w-full">
                <Button type="button" onClick={() => console.log("Resend OTP")}>
                    Resend
                </Button>
                <Button
                    variant="secondary"
                    className="w-full"
                    type="button"
                    onClick={() => console.log("Cancel")}
                >
                    Cancel
                </Button>
            </div>
        </form>
    );
}
