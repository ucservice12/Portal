import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext"; // step from auth
import { useOrganization } from "@/context/OrganizationContext"; // org context

export function WorkShopName() {
    const { setStep, user } = useAuth();
    const { createOrganization, loading, error } = useOrganization();
    const [org, setOrg] = useState("");

    console.log("User in WorkShopName:", user);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!org.trim()) return; // minimal check

        try {
            await createOrganization({
                organizationName: org,
                userData: { name: user.name, email: user.email },
            });
            // Move to next step
            setStep("dashboard");
        } catch (err) {
            console.log("Failed to create organization", err);
        }
    };

    return (
        <form className="sm:mt-36 w-full max-w-sm mx-auto" onSubmit={handleSubmit}>
            <div>
                <h2 className="text-lg sm:text-3xl font-semibold tracking-tight">
                    Name your Workspace
                </h2>

                <div className="mt-6 grid gap-2">
                    <Input
                        id="organizationName"
                        type="text"
                        placeholder="Workspace Name"
                        value={org}
                        onChange={(e) => setOrg(e.target.value)}
                    />
                    <small className="text-xs leading-none font-medium">
                        - Try the name of your company or organization.
                    </small>

                    {/* Error from context */}
                    {error && <span className="text-red-500 text-xs">{error}</span>}
                </div>

                <Button className="w-full mt-4" type="submit" disabled={loading}>
                    {loading ? "Creating..." : "Continue"}
                </Button>
            </div>
        </form>
    );
}
