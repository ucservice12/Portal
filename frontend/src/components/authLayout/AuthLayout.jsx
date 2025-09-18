import { useState } from "react";
import { version } from "@/../package.json";
import { GalleryVerticalEnd } from "lucide-react";
import { LoginForm } from "./LoginForm";
import { RegisterForm } from "./RegisterForm";
import { ForgotPassword } from "./ForgotPassword";
import { VerifyOtp } from "./VerifyOtp";
import { WorkShopName } from "./WorkShopName";
import { useAuth } from "@/context/AuthContext"; // useAuth from context

export default function AuthLayout({ title = "Acme Inc." }) {
    // Use context instead of Redux
    const { step, setStep } = useAuth();
    const [email, setEmail] = useState("");

    return (
        <div className="grid min-h-svh lg:grid-cols-2">
            {/* Left side with logo + form */}
            <div className="flex flex-col gap-4 p-10">
                {/* Logo */}
                <div className="flex justify-center gap-2 md:justify-start">
                    <a href="#" className="flex items-center gap-2 font-medium">
                        <div className="bg-primary text-primary-foreground flex w-6 h-6 items-center justify-center rounded-md">
                            <GalleryVerticalEnd className="w-4 h-4" />
                        </div>
                        {title}
                    </a>
                </div>

                {/* Form section */}
                <div className="flex flex-1 items-center justify-center">
                    <div className="w-full max-w-sm">
                        {step === "login" && <LoginForm setStep={setStep} />}
                        {step === "register" && <RegisterForm setStep={setStep} setEmail={setEmail} />}
                        {step === "forgot-password" && <ForgotPassword setStep={setStep} />}
                        {step === "verifyOtp" && <VerifyOtp setStep={setStep} otpEmail={email} />}
                        {step === "createOrg" && <WorkShopName setStep={setStep} />}
                    </div>
                </div>
            </div>

            {/* Right side image + content */}
            <div className="relative flex flex-col items-center justify-center bg-gradient-to-br from-blue-950 to-[#009896] text-white p-8 lg:p-12">
                <div className="max-w-lg space-y-4 z-10">
                    <h1 className="text-3xl lg:text-4xl font-extrabold leading-tight">
                        CRM Applications: Real-time Engagement on a Unified Platform
                    </h1>
                    <p className="text-blue-100 text-sm lg:text-base leading-relaxed">
                        Delight360 is the ultimate all-in-one super app for businesses — streamlining HR, recruitment, tasks, goals, sales, marketing, appraisal, and finance. Say goodbye to multiple platforms and enjoy convenience in one place.
                    </p>
                </div>

                <div className="mt-8 z-10">
                    <img
                        src="https://www.pega.com/sites/default/files/styles/1024/public/media/images/2022-01/pega-crm-hero-img.png?itok=J4kdqtXr"
                        alt="CRM illustration"
                        className="w-[320px] hidden lg:block h-[320px] lg:w-[400px] lg:h-[400px] object-cover"
                    />
                </div>

                {/* Footer */}
                <p className="text-sm lg:text-base leading-relaxed mt-6 z-10">
                    Copyright © {new Date().getFullYear()} Delighteck. All rights reserved. Version: {version}
                </p>

                {/* Decorative overlay */}
                <div className="absolute inset-0 bg-black/20 rounded-lg pointer-events-none"></div>
            </div>
        </div>
    );
}
