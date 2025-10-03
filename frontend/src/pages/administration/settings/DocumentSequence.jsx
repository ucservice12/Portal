"use client"

import React, { useState } from "react"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { TypographyH3 } from "@/components/custom/Typography"

export default function DocumentSequence() {
    const [formData, setFormData] = useState({
        invoice: "",
        estimate: "",
        proposal: "",
        salarySlip: "",
        form16: "",
    })

    const handleChange = (field, value) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }))
    }

    const handleSubmit = () => {
        console.log("Document Sequence:", formData)
    }

    const handleReset = () => {
        setFormData({
            invoice: "",
            estimate: "",
            proposal: "",
            salarySlip: "",
            form16: "",
        })
    }

    const handleDelete = () => {
        console.log("Deleted form data.")
        handleReset()
    }

    return (
        <div className="max-w-5xl space-y-6">
            <TypographyH3>Document Sequence</TypographyH3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="grid gap-2">
                    <Label htmlFor="invoice">Invoice Sequence Number</Label>
                    <Input
                        id="invoice"
                        value={formData.invoice}
                        placeholder="Enter invoice sequence"
                        onChange={(e) => handleChange("invoice", e.target.value)}
                    />
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="estimate">Estimate Sequence Number</Label>
                    <Input
                        id="estimate"
                        value={formData.estimate}
                        placeholder="Enter estimate sequence"
                        onChange={(e) => handleChange("estimate", e.target.value)}
                    />
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="proposal">Proposal Sequence Number</Label>
                    <Input
                        id="proposal"
                        value={formData.proposal}
                        placeholder="Enter proposal sequence"
                        onChange={(e) => handleChange("proposal", e.target.value)}
                    />
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="salarySlip">Salary Slip Sequence Number</Label>
                    <Input
                        id="salarySlip"
                        value={formData.salarySlip}
                        placeholder="Enter salary slip sequence"
                        onChange={(e) => handleChange("salarySlip", e.target.value)}
                    />
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="form16">Form16 Sequence Number</Label>
                    <Input
                        id="form16"
                        value={formData.form16}
                        placeholder="Enter Form16 sequence"
                        onChange={(e) => handleChange("form16", e.target.value)}
                    />
                </div>
            </div>

            <div className="mt-4 flex items-center gap-4">
                <Button onClick={handleSubmit}>Submit</Button>
                <Button variant="reset" onClick={handleReset}>
                    Reset
                </Button>
                <Button variant="destructive" onClick={handleDelete}>
                    Delete
                </Button>
            </div>
        </div>
    )
}
