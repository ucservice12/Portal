import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CheckIcon, ChevronDown, ChevronUp } from "lucide-react";
import {
    TypographyH1,
    TypographyH4,
} from "@/components/custom/Typography";

const plans = [
    {
        id: 1,
        key: "free",
        title: "Free",
        description: "Basic features for individuals",
        price: "0 INR / month",
        storage: "5 GB",
        features: [
            "1 User",
            "Basic Dashboard",
            "Community Support",
            "Email Notifications",
            "Limited API Access",
            "Standard Security",
            "Mobile Access",
            "Basic Analytics",
            "Free Updates",
            "Basic File Sharing",
        ],
    },
    {
        id: 2,
        key: "starter",
        title: "Starter",
        description: "Essential tools for small teams",
        price: "499 INR / month",
        storage: "50 GB",
        features: [
            "Up to 5 Users",
            "Team Dashboard",
            "Email Support",
            "Priority Notifications",
            "API Access",
            "Enhanced Security",
            "Mobile & Tablet Access",
            "Advanced Analytics",
            "Custom Branding",
            "File Sharing & Collaboration",
        ],
    },
    {
        id: 3,
        key: "professional",
        title: "Professional",
        description: "Advanced features for growing teams",
        price: "999 INR / month",
        storage: "200 GB",
        features: [
            "Up to 20 Users",
            "Advanced Dashboard",
            "Priority Email Support",
            "Custom Workflows",
            "Full API Access",
            "Data Encryption",
            "Cross-Device Sync",
            "Detailed Analytics & Reports",
            "Custom Branding + Themes",
            "Team Collaboration Tools",
        ],
    },
    {
        id: 4,
        key: "enterprise",
        title: "Enterprise",
        description: "Custom solutions for large organizations",
        price: "Contact Sales",
        storage: "Unlimited",
        features: [
            "Unlimited Users",
            "Dedicated Account Manager",
            "24/7 Support",
            "Custom Integrations",
            "Unlimited API Access",
            "Enterprise-Grade Security",
            "Advanced Compliance Tools",
            "Full Customization",
            "AI-Powered Insights",
            "Unlimited Storage & Backups",
        ],
    },
];

export function PricingPlanes() {
    const [users, setUsers] = useState(1);
    const [selectedPlan, setSelectedPlan] = useState(plans[0]); // default Free plan
    const [expandedPlans, setExpandedPlans] = useState({}); // which plans are expanded
    const [error, setError] = useState("");

    const toggleFeatures = (planId) => {
        setExpandedPlans((prev) => ({
            ...prev,
            [planId]: !prev[planId],
        }));
    };

    const handleSelectPlan = (plan) => {
        setSelectedPlan(plan);
        setError("");
        console.log("Selected Plan:", plan);
    };

    const handleContinue = () => {
        if (!selectedPlan) {
            setError("Please select a plan before continuing.");
            return;
        }
        if (users < 1) {
            setError("At least 1 user is required.");
            return;
        }

        setError("");
        console.log("Final Data:", {
            users,
            selectedPlan,
        });
    };

    return (
        <>
            <div className="grid gap-4 text-center w-full">
                <TypographyH1>Plans for teams of all sizes</TypographyH1>
                <div className="mb-4 flex items-center gap-2 w-full justify-center">
                    <Label htmlFor="users">Number of Users:</Label>
                    <Input
                        id="users"
                        type="number"
                        min="1"
                        max="1000"
                        className="w-64"
                        value={users}
                        onChange={(e) => setUsers(Number(e.target.value))}
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {plans.map((plan) => {
                    const isSelected = selectedPlan?.id === plan.id;
                    const isExpanded = expandedPlans[plan.id] || false;

                    return (
                        <Card
                            key={plan.id}
                            className={`p-6 gap-1 transition-all cursor-pointer ${isSelected
                                ? "border-2 border-indigo-600 shadow-md"
                                : "border border-gray-200"
                                }`}
                        >
                            <div onClick={() => handleSelectPlan(plan)}>
                                <TypographyH4>{plan.title}</TypographyH4>
                                <p className="text-muted-foreground text-sm mb-2">
                                    {plan.description}
                                </p>
                                <p className="font-semibold text-lg">{plan.price}</p>
                                <p className="font-medium text-indigo-700">
                                    Storage: {plan.storage}
                                </p>
                            </div>

                            <ul className="grid gap-2 text-sm text-muted-foreground mt-4">
                                {(isExpanded ? plan.features : plan.features.slice(0, 3)).map(
                                    (feature, idx) => (
                                        <li key={idx} className="flex items-start gap-2">
                                            <CheckIcon className="mt-1 h-4 w-4 text-indigo-800" />
                                            <span>{feature}</span>
                                        </li>
                                    )
                                )}
                            </ul>

                            {plan.features.length > 3 && (
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="mt-2 w-full flex items-center justify-center gap-1"
                                    onClick={() => toggleFeatures(plan.id)}
                                >
                                    {isExpanded ? "Show Less" : "Show More"}
                                    {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                                </Button>
                            )}

                            <p className="flex items-start gap-2 mt-2 text-sm text-indigo-700">
                                <CheckIcon className="mt-1 h-4 w-4 text-indigo-800" />
                                {users} user{users > 1 ? "s" : ""} selected
                            </p>
                        </Card>
                    );
                })}
            </div>

            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

            <Button
                className="w-full mt-6"
                onClick={handleContinue}
            >
                Continue to Payment
            </Button>
        </>
    );
}
