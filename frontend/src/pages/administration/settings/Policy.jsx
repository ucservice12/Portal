import React, { useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { UploadCloud } from "lucide-react"

export default function Policy() {
    const [selectedTab, setSelectedTab] = useState("Leave Policy")
    const [leaveFile, setLeaveFile] = useState(null)
    const [handbookFile, setHandbookFile] = useState(null)

    const leaveInputRef = useRef(null)
    const handbookInputRef = useRef(null)

    const handleDrop = (e, setter) => {
        e.preventDefault()
        const file = e.dataTransfer.files[0]
        if (file?.type === "application/pdf") {
            setter(file)
        } else {
            alert("Only PDF files are allowed")
        }
    }

    const handleFileChange = (e, setter) => {
        const file = e.target.files?.[0]
        if (file?.type === "application/pdf") {
            setter(file)
        } else {
            alert("Only PDF files are allowed")
        }
    }

    const renderFilePreview = (file, title) => (
        <div className="mt-4">
            <p className="text-sm font-medium">{file.name}</p>
            <div className="relative w-full pt-[141.42%] mt-2 rounded-md overflow-hidden border">
                {/* A4 Ratio (1:1.414) — height = 141.42% of width */}
                <iframe
                    src={URL.createObjectURL(file)}
                    title={title}
                    className="absolute top-0 left-0 w-full h-full"
                />
            </div>
        </div>
    )

    return (
        <div className="space-y-6 max-w-4xl px-4 sm:py-6">
            {/* Top Tab Buttons */}
            <div className="flex gap-4">
                <Button
                    variant={selectedTab === "Leave Policy" ? "default" : "outline"}
                    onClick={() => setSelectedTab("Leave Policy")}
                >
                    Leave Policy
                </Button>
                <Button
                    variant={selectedTab === "Employee Handbook" ? "default" : "outline"}
                    onClick={() => setSelectedTab("Employee Handbook")}
                >
                    Employee Handbook
                </Button>
            </div>

            {/* Upload Section */}
            {selectedTab === "Leave Policy" && (
                <div className="grid gap-4">
                    <Label>Leave Policy</Label>
                    <div
                        className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center cursor-pointer"
                        onClick={() => leaveInputRef.current?.click()}
                        onDrop={(e) => handleDrop(e, setLeaveFile)}
                        onDragOver={(e) => e.preventDefault()}
                    >
                        <UploadCloud className="mx-auto text-gray-500 mb-2" />
                        <p className="text-sm text-gray-600">Drag & drop PDF here or click to upload</p>
                        <input
                            type="file"
                            accept="application/pdf"
                            onChange={(e) => handleFileChange(e, setLeaveFile)}
                            ref={leaveInputRef}
                            className="hidden"
                        />
                    </div>
                    {leaveFile && renderFilePreview(leaveFile, "Leave Policy")}
                </div>
            )}

            {selectedTab === "Employee Handbook" && (
                <div className="grid gap-4">
                    <Label>Employee Handbook</Label>
                    <div
                        className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center cursor-pointer"
                        onClick={() => handbookInputRef.current?.click()}
                        onDrop={(e) => handleDrop(e, setHandbookFile)}
                        onDragOver={(e) => e.preventDefault()}
                    >
                        <UploadCloud className="mx-auto text-gray-500 mb-2" />
                        <p className="text-sm text-gray-600">Drag & drop PDF here or click to upload</p>
                        <input
                            type="file"
                            accept="application/pdf"
                            onChange={(e) => handleFileChange(e, setHandbookFile)}
                            ref={handbookInputRef}
                            className="hidden"
                        />
                    </div>
                    {handbookFile && renderFilePreview(handbookFile, "Employee Handbook")}
                </div>
            )}

            {/* Action Buttons */}
            <div className="flex justify-end gap-4">
                <Button variant="outline" size="sm">Discard</Button>
                <Button size="sm">Save Changes</Button>
            </div>
        </div>
    )
}
