import { version } from "@/../package.json";
import { GalleryVerticalEnd } from "lucide-react";
import { LoginForm } from "./LoginForm";
import { RegisterForm } from "./RegisterForm";
import { ForgotPassword } from "./ForgotPassword";
import { VerifyOtp } from "./VerifyOtp";
import { WorkShopName } from "./WorkShopName";
import { PaymentForm } from "./PaymentForm";
import { PricingPlanes } from "./PricingPlanes";
import { useAuth } from "@/context/AuthContext";

export default function AuthLayout({ title = "Acme Inc." }) {
  const { step, user, logout } = useAuth();

  //  check if user is logged in via localStorage
  const cognitoIdentityToken = localStorage.getItem("cognitoIdentity");

  const renderStep = () => {
    switch (step) {
      case "login":
        return <LoginForm />;
      case "register":
        return <RegisterForm />;
      case "forgot-password":
        return <ForgotPassword />;
      case "verifyOtp":
        return <VerifyOtp />;
      case "createOrg":
        return <WorkShopName />;
      case "pricingPlanes":
        return <PricingPlanes />;
      case "payment":
        return <PaymentForm />;
      default:
        return <LoginForm />;
    }
  };

  return (
    <div className="grid min-h-svh lg:grid-cols-2 bg-gradient-to-br from-blue-950 to-[#009896]">
      {/* Left Side */}
      <div className="flex flex-col gap-4 m-3 rounded-lg bg-white">
        {/* Header / Logo */}
        <div className="flex justify-between items-center border-b p-4">
          <a href="#" className="flex items-center gap-2 font-medium">
            <div className="bg-primary text-primary-foreground flex w-7 h-7 items-center justify-center rounded-md">
              <GalleryVerticalEnd className="w-5 h-5" />
            </div>
            {title}
          </a>

          {/* User Info / Logout */}
          <div className="flex flex-col items-end">
            <p className="text-sm capitalize">
              {user ? `Welcome, ${user.firstName || "User"}` : "Welcome"}
            </p>

            {/* ✅ Show logout only if logged in */}
            {cognitoIdentityToken && user && (
              <button
                onClick={logout}
                className="mt-1 text-sm text-blue-600 hover:underline cursor-pointer"
              >
                Logout
              </button>
            )}
          </div>
        </div>

        {/* Form Container */}
        <div className="flex flex-1 p-6">
          <div className="w-full max-w-2xl mx-auto">{renderStep()}</div>
        </div>
      </div>

      {/* Right Side */}
      <div className="relative flex flex-col items-center justify-center p-8 text-white lg:p-12">
        <div className="max-w-lg space-y-4 z-10 text-center lg:text-left">
          <h1 className="text-3xl lg:text-4xl font-extrabold leading-tight">
            CRM Applications: Real-time Engagement on a Unified Platform
          </h1>
          <p className="text-blue-100 text-sm lg:text-base leading-relaxed">
            Delight360 is the ultimate all-in-one super app for businesses —
            streamline HR, recruitment, tasks, goals, sales, marketing,
            appraisal, and finance. Say goodbye to multiple platforms and enjoy
            convenience in one place.
          </p>
        </div>

        {/* Illustration */}
        <div className="md:mt-8 z-10">
          <img
            src="https://www.pega.com/sites/default/files/styles/1024/public/media/images/2022-01/pega-crm-hero-img.png?itok=J4kdqtXr"
            alt="CRM illustration"
            className="hidden lg:block w-[320px] h-[320px] lg:w-[400px] lg:h-[400px] object-cover"
          />
        </div>

        {/* Footer */}
        <p className="text-sm lg:text-base leading-relaxed mt-6 z-10 text-center lg:text-left">
          Copyright © {new Date().getFullYear()} Delighteck. All rights
          reserved.
          <br />
          Version: {version}
        </p>
      </div>
    </div>
  );
}
