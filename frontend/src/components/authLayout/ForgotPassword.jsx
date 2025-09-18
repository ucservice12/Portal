import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";

export function ForgotPassword() {
    const { setStep } = useAuth();

    return (
        <form
            className={cn("flex flex-col gap-6 lg:mt-22 w-full max-w-sm mx-auto")}
        >
            <div className="flex flex-col gap-2">
                <h1 className="text-2xl font-bold">Forgot Password</h1>
                <p className="text-muted-foreground text-sm">
                    Enter your email below to reset your password
                </p>
            </div>

            <div className="grid gap-6">
                <div className="grid gap-3">
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" type="email" placeholder="m@example.com" required />
                </div>

                <Button type="submit" className="w-full">
                    Send Verification Code
                </Button>
            </div>

            <div className="text-center text-sm">
                If you already know password?{" "}
                <button onClick={() => setStep("login")} className="text-link font-semibold cursor-pointer">
                    Sign In
                </button>
            </div>
        </form>
    );
}
