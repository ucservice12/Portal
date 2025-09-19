import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  TypographyH3,
  TypographyMuted,
  TypographyH5,
} from "@/components/custom/Typography";
import {
  CreditCard,
  Calendar,
  Shield,
  SkipBack,
  SkipForward,
} from "lucide-react";
import { useOrganization } from "@/context/OrganizationContext";
import { useAuth } from "@/context/AuthContext";
import { createOrganization as createOrgApi } from "@/api/organization";

export function PaymentForm() {
  const { orgName, users, selectedPlan } = useOrganization();
  const { setStep, user, setUser, saveAuth } = useAuth();

  console.log("user in payment form:", user);

  const [formData, setFormData] = useState({
    name: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
  });
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState("");
  const [loading, setLoading] = useState(false);

  if (!selectedPlan || !users) {
    return (
      <div className="w-full max-w-sm mx-auto text-center mt-10">
        <p>Please select a plan before proceeding to payment.</p>
      </div>
    );
  }

  const total = selectedPlan?.price?.includes("Contact")
    ? "Custom Pricing"
    : `${parseInt(selectedPlan.price) * users} INR`;

  const validate = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "Cardholder name is required";
    if (!formData.cardNumber) newErrors.cardNumber = "Card number is required";
    if (!formData.expiry) newErrors.expiry = "Expiry date is required";
    if (!formData.cvv) newErrors.cvv = "CVV is required";
    return newErrors;
  };

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  // Helper: create org + update user + save token
  const handleCreateOrg = async (payload) => {
    const response = await createOrgApi(payload);
    const newOrg = response.data.user;

    console.log("Organization Created:", response.data.user);

    // Safely update user with org
    if (user) {
      const updatedUser = {
        ...user,
        organization: newOrg._id || newOrg.id,
      };
      setUser(updatedUser);
    }

    // Save token in localStorage/cookie if backend returned it
    if (response.data.token) {
      saveAuth(response.data.token, user);
    }

    return newOrg;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length)
      return setErrors(validationErrors);

    setLoading(true);
    setErrors({});
    setApiError("");

    try {
      const now = new Date();
      const endDate =
        selectedPlan?.billing === "yearly"
          ? new Date(now.setFullYear(now.getFullYear() + 1))
          : new Date(now.setMonth(now.getMonth() + 1));

      const payload = {
        name: orgName,
        createdBy: user?._id,
        size: users <= 10 ? "1-10" : users <= 50 ? "11-50" : "51-200",
        contact: { email: user?.email },
        subscription: {
          plan: selectedPlan.key,
          status: "active",
          startDate: new Date(),
          endDate,
          features: {
            maxUsers: users,
            maxStorage: selectedPlan.storage || 10,
            modules: {
              crm: true,
              projects: selectedPlan.key !== "free",
              hr: selectedPlan.key === "enterprise",
              invoicing: selectedPlan.key !== "free",
              reports: true,
              api: selectedPlan.key === "enterprise",
            },
          },
        },
        paymentDetails: formData,
      };

      await handleCreateOrg(payload);
      // setStep("dashboard"); 
    } catch (err) {
      console.error("Payment Error:", err);
      setApiError(
        err.response?.data?.message || "Payment failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSkip = async () => {
    setLoading(true);
    setApiError("");

    try {
      const now = new Date();
      const endDate =
        selectedPlan?.billing === "yearly"
          ? new Date(now.setFullYear(now.getFullYear() + 1))
          : new Date(now.setMonth(now.getMonth() + 1));

      const payload = {
        name: orgName?.trim(),
        createdBy: user?._id,
        size: users <= 10 ? "1-10" : users <= 50 ? "11-50" : "51-200",
        contact: { email: user?.email },
        subscription: {
          plan: selectedPlan.key,
          status: "active",
          startDate: new Date(),
          endDate,
          features: {
            maxUsers: users,
            maxStorage:
              Number(String(selectedPlan.storage).replace(/[^0-9]/g, "")) || 10,
            modules: {
              crm: true,
              projects: true,
              hr: true,
              invoicing: true,
              reports: true,
              api: true,
            },
          },
        },
      };

      await handleCreateOrg(payload);
      setStep("dashboard"); 

    } catch (err) {
      console.error("Skip Payment Error:", err);
      setApiError(err.response?.data?.message || "Failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full mx-auto max-w-xs flex flex-col gap-4">
      <TypographyH3>Payments</TypographyH3>
      <TypographyMuted>
        Review your selected plan before completing the payment.
      </TypographyMuted>
      <TypographyH5 className="text-indigo-600">
        {selectedPlan?.title} - Users: {users}
      </TypographyH5>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Cardholder Name */}
        <div className="grid gap-1">
          <Label>Cardholder Name</Label>
          <Input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          {errors.name && (
            <div className="text-red-500 text-sm">{errors.name}</div>
          )}
        </div>

        {/* Card Number */}
        <div className="grid gap-1">
          <Label>Card Number</Label>
          <div className="relative">
            <Input
              type="text"
              name="cardNumber"
              placeholder="1234 5678 1234 5678"
              value={formData.cardNumber}
              onChange={handleChange}
            />
            <CreditCard
              size={18}
              className="absolute top-2 right-3 text-gray-400"
            />
          </div>
          {errors.cardNumber && (
            <div className="text-red-500 text-sm">{errors.cardNumber}</div>
          )}
        </div>

        {/* Expiry & CVV */}
        <div className="flex gap-4">
          <div className="w-1/2 grid gap-1">
            <Label>Expiry Date</Label>
            <div className="relative">
              <Input
                type="text"
                name="expiry"
                placeholder="MM/YY"
                value={formData.expiry}
                onChange={handleChange}
              />
              <Calendar
                size={18}
                className="absolute top-2 right-3 text-gray-400"
              />
            </div>
            {errors.expiry && (
              <div className="text-red-500 text-sm">{errors.expiry}</div>
            )}
          </div>
          <div className="w-1/2 grid gap-1">
            <Label>CVV</Label>
            <div className="relative">
              <Input
                type="text"
                name="cvv"
                placeholder="123"
                value={formData.cvv}
                onChange={handleChange}
              />
              <Shield
                size={18}
                className="absolute top-2 right-3 text-gray-400"
              />
            </div>
            {errors.cvv && (
              <div className="text-red-500 text-sm">{errors.cvv}</div>
            )}
          </div>
        </div>

        {apiError && <p className="text-red-500 text-sm">{apiError}</p>}

        <Button type="submit" className="w-full mt-4" disabled={loading}>
          Pay {total}
        </Button>
      </form>

      <div className="flex justify-between mt-2">
        <Button
          onClick={() => setStep("pricingPlanes")}
          variant="outline"
          className="w-fit"
          disabled={loading}
        >
          <SkipBack /> Back
        </Button>
        <Button
          onClick={handleSkip}
          variant="secondary"
          className="w-fit"
          disabled={loading}
        >
          <SkipForward /> Skip
        </Button>
      </div>
    </div>
  );
}
