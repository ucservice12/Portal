import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";

export function VerifyOtp({ otpEmail }) {
    const { verifyOtp, setStep, loading, error } = useAuth();

    const [otp, setOtp] = useState(Array(6).fill(""));
    const inputs = [];

    // Handle OTP input change
    const handleChange = (idx, val) => {
        if (!/^[0-9]?$/.test(val)) return; // allow only digits
        const newOtp = [...otp];
        newOtp[idx] = val;
        setOtp(newOtp);

        // Auto focus next input
        if (val && idx < 5 && inputs[idx + 1]) {
            inputs[idx + 1].focus();
        }
    };

    // Handle backspace
    const handleKeyDown = (idx, e) => {
        if (e.key === "Backspace" && !otp[idx] && idx > 0) {
            inputs[idx - 1].focus();
        }
    };

    // Submit OTP
    const handleVerify = async (e) => {
        e.preventDefault();
        const otpCode = otp.join("");

        if (otpCode.length !== 6) {
            alert("Enter 6 digit code");
            return;
        }

        if (!otpEmail) {
            alert("Email is missing");
            return;
        }

        try {
            await verifyOtp({ email: otpEmail, otp: otpCode });
            // success handling (step change) can be done in context if needed
        } catch (err) {
            console.log("OTP verification failed", err);
        }
    };

    return (
        <form
            className="w-full max-w-sm lg:mt-20 mx-auto flex flex-col items-center space-y-6"
            onSubmit={handleVerify}
        >
            <div className="text-4xl text-blue-500">📩</div>
            <h2 className="sm:text-3xl text-2xl font-semibold tracking-tight mb-1">
                Verify your Email
            </h2>
            <p className="text-muted-foreground text-sm mb-4">
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
                        className="sm:w-10 w-9 sm:h-10 h-9 text-center border rounded-md text-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={digit}
                        onChange={(e) => handleChange(idx, e.target.value)}
                        onKeyDown={(e) => handleKeyDown(idx, e)}
                        ref={(el) => (inputs[idx] = el)}
                    />
                ))}
            </div>

            {/* Error */}
            {error && <span className="text-red-500 text-xs">{error}</span>}

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
                <Button type="button" onClick={() => setOtp(Array(6).fill(""))}>
                    Resend
                </Button>
                <Button
                    variant="secondary"
                    className="w-full"
                    type="button"
                    onClick={() => setStep("login")} // ✅ use context
                >
                    Cancel
                </Button>
            </div>
        </form>
    );
}
