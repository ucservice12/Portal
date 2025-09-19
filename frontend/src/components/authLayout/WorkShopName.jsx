import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { useOrganization } from "@/context/OrganizationContext";

export function WorkShopName() {
  const { setStep } = useAuth();
  const {
    loading,
    error,
    setError,
    orgName,
    setOrgName,
  } = useOrganization();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!orgName.trim()) {
      setError("Organization name is required");
      return;
    }

    setOrgName(orgName.trim());
    setStep("pricingPlanes");
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
            value={orgName}
            onChange={(e) => setOrgName(e.target.value)}
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
