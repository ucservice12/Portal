import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { useOrganization } from "@/context/OrganizationContext";
import { createOrganization as createOrgApi } from "@/api/organization";

export function WorkShopName() {
    const { user, setStep } = useAuth();
    const { organizations, setOrganizations, loading, setLoading, error, setError } = useOrganization();

    const [org, setOrg] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Frontend validation
        if (!org.trim()) {
            setError("Organization name is required");
            return;
        }

        setLoading(true);
        setError("");

        try {
            // Call backend API
            const response = await createOrgApi(org.trim(), user);

            console.log("Workspace Created:", response.data);

            if (response.status === 200) {
                localStorage.removeItem("cognitoIdentity");
                localStorage.setItem("cognitoIdentityToken", JSON.stringify(res.data.token));
                setStep("pricingPlanes");
            }

        } catch (err) {
            console.error("Error creating organization:", err);

            // Robust backend error handling
            const backendError =
                err.response?.data?.error ||
                err.response?.data?.message ||
                err.message ||
                "Failed to create organization";

            setError(backendError);
        } finally {
            setLoading(false);
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
                        value={org}
                        onChange={(e) => setOrg(e.target.value)}
                    />
                    <small className="text-xs leading-none font-medium">
                        - Try the name of your company or organization.
                    </small>
                </div>

                {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

                <Button className="w-full mt-4" type="submit" disabled={loading}>
                    {loading ? "Creating..." : "Continue"}
                </Button>
            </div>
        </form>
    );
}
