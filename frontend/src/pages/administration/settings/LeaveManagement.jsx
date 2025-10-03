"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { X } from "lucide-react"
import { TypographyH3 } from "@/components/custom/Typography"

export default function LeaveManagement() {
    const [formData, setFormData] = useState({
        teamMember: "",
        noOfLeaves: "0",
        noOfLeavesTaken: "0",
        noOfLeavesRemaining: "0",
        noOfMedicalLeaves: "0",
        noOfMedicalLeavesTaken: "0",
        noOfMedicalLeavesRemaining: "0",
        noOfCoffLeaves: "0",
        noOfCoffLeavesTaken: "0",
        noOfCoffLeavesRemaining: "0",
    })

    const handleChange = (field, value) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }))
    }

    const handleSubmit = () => {
        console.log("Form Submitted:", formData)
    }

    return (
        <div className="max-w-5xl space-y-4">
            <TypographyH3>Leaves Management</TypographyH3>
            <div className="relative sm:w-[400px] w-full space-y-2">
                <Label>Select Team Member</Label>
                <Select
                    value={formData.teamMember}
                    onValueChange={(value) => handleChange("teamMember", value)}
                >
                    <SelectTrigger className="sm:w-[450px] w-full pr-8">
                        <SelectValue placeholder="Select Member" />
                    </SelectTrigger>
                    <SelectContent className="w-[400px]">
                        <SelectItem value="amolmahor500">amolmahor500</SelectItem>
                        <SelectItem value="johndoe123">johndoe123</SelectItem>
                    </SelectContent>
                </Select>

                {formData?.teamMember && (
                    <button
                        type="button"
                        className="absolute right-2 top-1/2 p-1 text-gray-400 hover:text-gray-700"
                        onClick={() => handleChange("teamMember", "")}
                        tabIndex={-1}
                    >
                        <X className="w-4 h-4" />
                    </button>
                )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="grid gap-2">
                    <Label>No Of Leaves</Label>
                    <Input
                        value={formData.noOfLeaves}
                        onChange={(e) => handleChange("noOfLeaves", e.target.value)}
                    />
                </div>
                <div className="grid gap-2">
                    <Label>No Of Leaves Taken</Label>
                    <Input
                        value={formData.noOfLeavesTaken}
                        onChange={(e) => handleChange("noOfLeavesTaken", e.target.value)}
                    />
                </div>

                <div className="grid gap-2">
                    <Label>No Of Leaves Remaining</Label>
                    <Input
                        value={formData.noOfLeavesRemaining}
                        onChange={(e) => handleChange("noOfLeavesRemaining", e.target.value)}
                    />
                </div>
                <div className="grid gap-2">
                    <Label>No Of Medical Leaves</Label>
                    <Input
                        value={formData.noOfMedicalLeaves}
                        onChange={(e) => handleChange("noOfMedicalLeaves", e.target.value)}
                    />
                </div>

                <div className="grid gap-2">
                    <Label>No Of Medical Leaves Taken</Label>
                    <Input
                        value={formData.noOfMedicalLeavesTaken}
                        onChange={(e) => handleChange("noOfMedicalLeavesTaken", e.target.value)}
                    />
                </div>
                <div className="grid gap-2">
                    <Label>No Of Medical Leaves Remaining</Label>
                    <Input
                        value={formData.noOfMedicalLeavesRemaining}
                        onChange={(e) => handleChange("noOfMedicalLeavesRemaining", e.target.value)}
                    />
                </div>

                <div className="grid gap-2">
                    <Label>No Of COff Leaves</Label>
                    <Input
                        value={formData.noOfCoffLeaves}
                        onChange={(e) => handleChange("noOfCoffLeaves", e.target.value)}
                    />
                </div>
                <div className="grid gap-2">
                    <Label>No Of COff Leaves Taken</Label>
                    <Input
                        value={formData.noOfCoffLeavesTaken}
                        onChange={(e) => handleChange("noOfCoffLeavesTaken", e.target.value)}
                    />
                </div>
                <div className="grid gap-2">
                    <Label>No Of COff Leaves Remaining</Label>
                    <Input
                        value={formData.noOfCoffLeavesRemaining}
                        onChange={(e) => handleChange("noOfCoffLeavesRemaining", e.target.value)}
                    />
                </div>
            </div>

            <Button onClick={handleSubmit} className="mt-4">
                Submit
            </Button>
        </div>
    )
}
