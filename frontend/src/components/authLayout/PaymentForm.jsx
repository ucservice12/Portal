import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    TypographyH3,
    TypographyMuted,
    TypographyH5,
} from "@/components/custom/Typography";
import { CreditCard, Calendar, Shield } from "lucide-react";

export function PaymentForm() {
    const [formData, setFormData] = useState({
        name: "",
        cardNumber: "",
        expiry: "",
        cvv: "",
    });

    const [errors, setErrors] = useState({});

    // if (!selectedPlan || !users) {
    //     return (
    //         <div className="w-full max-w-sm mx-auto text-center mt-10">
    //             <p>Please select a plan before proceeding to payment.</p>
    //         </div>
    //     );
    // }

    // const rate = selectedPlan.isYearly
    //     ? selectedPlan.yearlyRate
    //     : selectedPlan.monthlyRate;
    // const total = (rate * users).toFixed(2);

    // Simple validation
    const validate = () => {
        const newErrors = {};
        if (!formData.name) newErrors.name = "Cardholder name is required";
        if (!formData.cardNumber) newErrors.cardNumber = "Card number is required";
        if (!formData.expiry) newErrors.expiry = "Expiry date is required";
        if (!formData.cvv) newErrors.cvv = "CVV is required";
        return newErrors;
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        console.log("Payment Data:", formData);
        // console.log("Selected Plan:", selectedPlan);
        // console.log("Users:", users);
        // console.log("Total:", total, selectedPlan.currency);
    };

    return (
        <div className="w-full mx-auto max-w-xs flex flex-col gap-4">
            <TypographyH3>Payments</TypographyH3>
            <TypographyMuted>
                Review your selected plan before completing the payment.
            </TypographyMuted>
            <TypographyH5 className="text-indigo-600">
                {/* {selectedPlan?.title} - Users: {users} */}
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
                    {errors.name && <div className="text-red-500 text-sm">{errors.name}</div>}
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
                        <CreditCard size={18} className="absolute top-2 right-3 text-gray-400" />
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
                            <Calendar size={18} className="absolute top-2 right-3 text-gray-400" />
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
                            <Shield size={18} className="absolute top-2 right-3 text-gray-400" />
                        </div>
                        {errors.cvv && (
                            <div className="text-red-500 text-sm">{errors.cvv}</div>
                        )}
                    </div>
                </div>

                <Button type="submit" className="w-full mt-4">
                    {/* Pay {total} {selectedPlan.currency} */} 200 INR
                </Button>
            </form>
        </div>
    );
}
