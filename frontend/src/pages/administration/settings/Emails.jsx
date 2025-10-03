"use client"

import React, { useState } from "react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { TypographyH3 } from "@/components/custom/Typography"

export default function DepartmentEmails() {
    const [emails, setEmails] = useState({
        sales: "",
        manager: "",
        finance: "",
        admin: "",
        hr: "",
    })

    const handleChange = (field, value) => {
        setEmails((prev) => ({
            ...prev,
            [field]: value,
        }))
    }

    const handleSubmit = () => {
        console.log("Department Emails:", emails)
    }

    return (
        <div className="max-w-5xl space-y-6">
            <TypographyH3>
                Department Email Setup
            </TypographyH3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="grid gap-2">
                    <Label htmlFor="sales">Sales Email</Label>
                    <Input
                        id="sales"
                        type="email"
                        placeholder="sales@example.com"
                        value={emails.sales}
                        onChange={(e) => handleChange("sales", e.target.value)}
                    />
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="manager">Manager Email</Label>
                    <Input
                        id="manager"
                        type="email"
                        placeholder="manager@example.com"
                        value={emails.manager}
                        onChange={(e) => handleChange("manager", e.target.value)}
                    />
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="finance">Finance Email</Label>
                    <Input
                        id="finance"
                        type="email"
                        placeholder="finance@example.com"
                        value={emails.finance}
                        onChange={(e) => handleChange("finance", e.target.value)}
                    />
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="admin">Admin Email</Label>
                    <Input
                        id="admin"
                        type="email"
                        placeholder="admin@example.com"
                        value={emails.admin}
                        onChange={(e) => handleChange("admin", e.target.value)}
                    />
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="hr">HR Email</Label>
                    <Input
                        id="hr"
                        type="email"
                        placeholder="hr@example.com"
                        value={emails.hr}
                        onChange={(e) => handleChange("hr", e.target.value)}
                    />
                </div>
            </div>

            <Button onClick={handleSubmit} className="mt-4">
                Submit
            </Button>
        </div>
    )
}
