import React, { useState, useEffect } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";

// --- Validation helpers
const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
const validatePassword = (password) =>
  /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
    password
  );

export function RegisterForm({ className, setEmail }) {
  const { registerUser, setUser, setStep, loading, error, isAuthenticated } = useAuth();

  const [values, setValues] = useState({
    firstName: "",
    email: "",
    password: "",
    confPassword: "",
    terms: false,
  });
  const [showPass, setShowPass] = useState(false);
  const [showConf, setShowConf] = useState(false);
  const [errors, setErrors] = useState({});

  // Redirect to OTP step after registration success
  useEffect(() => {
    if (isAuthenticated) setStep("verifyOtp");
  }, [isAuthenticated, setStep]);

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setValues((v) => ({ ...v, [name]: type === "checkbox" ? checked : value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  }

  function validate(v) {
    const e = {};
    if (!v.firstName.trim()) e.firstName = "First name is required";
    if (!v.email.trim()) e.email = "Email is required";
    else if (!validateEmail(v.email)) e.email = "Invalid email format";
    if (!v.password) e.password = "Password is required";
    else if (!validatePassword(v.password))
      e.password =
        "Password must be 8+ chars and include uppercase, lowercase, number, and special character";
    if (!v.confPassword) e.confPassword = "Confirm password is required";
    else if (v.password !== v.confPassword)
      e.confPassword = "Passwords do not match";
    if (!v.terms) e.terms = "You must accept the terms and conditions";
    return e;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const errs = validate(values);
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    try {
      await registerUser({
        name: values.firstName,
        email: values.email,
        password: values.password,
      });
      setEmail(values.email); // Pass email to parent for OTP
      setUser(values);
    } catch (err) {
      console.log("Registration failed", err);
    }
  }

  return (
    <form
      className={cn("flex flex-col gap-6 w-full max-w-sm mx-auto", className)}
      onSubmit={handleSubmit}
    >
      <h1 className="text-2xl text-center font-bold">Create a new account</h1>

      <div className="grid gap-4">
        {/* First Name */}
        <div className="grid gap-1">
          <Label htmlFor="firstName">First Name</Label>
          <Input
            id="firstName"
            name="firstName"
            value={values.firstName}
            onChange={handleChange}
          />
          {errors.firstName && (
            <span className="text-red-500 text-xs">{errors.firstName}</span>
          )}
        </div>

        {/* Email */}
        <div className="grid gap-1">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={values.email}
            onChange={handleChange}
          />
          {errors.email && (
            <span className="text-red-500 text-xs">{errors.email}</span>
          )}
        </div>

        {/* Password */}
        <div className="grid gap-1 relative">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            name="password"
            type={showPass ? "text" : "password"}
            value={values.password}
            onChange={handleChange}
            className="pr-10"
          />
          <button
            type="button"
            className="absolute right-3 top-7 text-gray-500"
            onClick={() => setShowPass((v) => !v)}
          >
            {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
          {errors.password && (
            <span className="text-red-500 text-xs">{errors.password}</span>
          )}
          <span className="text-xs text-muted-foreground mt-1">
            Must include uppercase, lowercase, number & special character.
          </span>
        </div>

        {/* Confirm Password */}
        <div className="grid gap-1 relative">
          <Label htmlFor="confPassword">Confirm Password</Label>
          <Input
            id="confPassword"
            name="confPassword"
            type={showConf ? "text" : "password"}
            value={values.confPassword}
            onChange={handleChange}
            className="pr-10"
          />
          <button
            type="button"
            className="absolute right-3 top-7 text-gray-500"
            onClick={() => setShowConf((v) => !v)}
          >
            {showConf ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
          {errors.confPassword && (
            <span className="text-red-500 text-xs">{errors.confPassword}</span>
          )}
        </div>

        {/* Terms */}
        <div className="flex items-center gap-3">
          <Checkbox
            id="terms"
            name="terms"
            checked={values.terms}
            onCheckedChange={(checked) =>
              setValues((v) => ({ ...v, terms: checked }))
            }
          />
          <Label htmlFor="terms">Accept terms and conditions</Label>
        </div>
        {errors.terms && (
          <span className="text-red-500 text-xs">{errors.terms}</span>
        )}

        {/* Backend/API Error */}
        {error && <span className="text-red-500 text-xs">{error}</span>}

        {/* Submit */}
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Creating..." : "Create Account"}
        </Button>
      </div>

      <div className="text-center text-sm">
        Already have an account?{" "}
        <button
          type="button"
          onClick={() => setStep("login")}
          className="underline underline-offset-4 font-semibold cursor-pointer"
        >
          Login
        </button>
      </div>
    </form>
  );
}
