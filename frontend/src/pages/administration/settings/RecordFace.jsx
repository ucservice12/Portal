import React, { useRef, useState, useEffect } from 'react'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import Webcam from "react-webcam"
import { TypographyH3, TypographyMuted, TypographySmall } from '@/components/custom/Typography'

// Employee data with email
const EMPLOYEES = [
    { value: "john", label: "John Doe", email: "john@example.com" },
    { value: "jane", label: "Jane Smith", email: "jane@example.com" },
    { value: "alice", label: "Alice Johnson", email: "alice@example.com" },
]

// Simulated face detection logic
function isFaceCentered(imageSrc) {
    return Math.random() > 0.5 // placeholder; use real face detection for production
}

export function RecordFace() {
    const webcamRef = useRef(null)
    const [capturedFaces, setCapturedFaces] = useState([])
    const [selectedEmployee, setSelectedEmployee] = useState('')
    const [isFaceOk, setIsFaceOk] = useState(false)
    const [cameraError, setCameraError] = useState(false)
    const [showWebcam, setShowWebcam] = useState(false)

    // Face validation every second when webcam is shown
    useEffect(() => {
        if (!showWebcam) return
        const interval = setInterval(() => {
            if (webcamRef.current) {
                const imageSrc = webcamRef.current.getScreenshot()
                if (imageSrc) {
                    const faceStatus = isFaceCentered(imageSrc)
                    setIsFaceOk(faceStatus)
                }
            }
        }, 1000)
        return () => clearInterval(interval)
    }, [showWebcam])

    // Find employee info
    const selectedEmpObj = EMPLOYEES.find(e => e.value === selectedEmployee)
    // Check if already captured
    const alreadyCaptured = capturedFaces.some(r => r.employee === selectedEmployee)

    const handleShowWebcam = () => {
        setShowWebcam(true)
        setIsFaceOk(false)
        setCameraError(false)
    }

    const handleCapture = () => {
        const imageSrc = webcamRef.current?.getScreenshot()
        if (imageSrc && selectedEmployee && isFaceOk) {
            setCapturedFaces(prev => {
                const newRecord = {
                    employee: selectedEmployee,
                    email: selectedEmpObj?.email || "",
                    timestamp: new Date().toISOString(),
                    image: imageSrc,
                }
                // Update if exists, else add
                const idx = prev.findIndex(r => r.employee === selectedEmployee)
                if (idx !== -1) {
                    const updated = [...prev]
                    updated[idx] = newRecord
                    return updated
                } else {
                    return [newRecord, ...prev]
                }
            })
            setShowWebcam(false)
        }
    }

    // Only show one card per employee
    const faceRecords = EMPLOYEES.map(emp => {
        const record = capturedFaces.find(r => r.employee === emp.value)
        if (!record) return null
        return (
            <Card key={emp.value} className="flex justify-center items-center space-y-2">
                <div>
                    <TypographyH3 className="capitalize">
                        {emp.label}
                    </TypographyH3>
                    <TypographyMuted>
                        {emp.email}
                    </TypographyMuted>
                    <TypographySmall>
                        {new Date(record.timestamp).toLocaleString()}
                    </TypographySmall>
                    <img src={record.image} alt="Face" className="object-cover w-64 h-64 rounded-full" />
                </div>
            </Card>
        )
    }).filter(Boolean)

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-4">
                <Select onValueChange={setSelectedEmployee} value={selectedEmployee}>
                    <SelectTrigger className="sm:w-[300px]">
                        <SelectValue placeholder="Select Employee" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Employees</SelectLabel>
                            {EMPLOYEES.map(emp => (
                                <SelectItem key={emp.value} value={emp.value}>{emp.label}</SelectItem>
                            ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>
                <Button
                    onClick={handleShowWebcam}
                    disabled={!selectedEmployee}
                >
                    {alreadyCaptured ? "Update Face Impression" : "Add Face Impression"}
                </Button>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                {showWebcam && (
                    <Card className='flex flex-col justify-center items-center'>
                        <TypographyH3>Face Record</TypographyH3>
                        {cameraError ? (
                            <div className="text-red-600 font-semibold">
                                Camera not accessible. Please allow webcam access.
                            </div>
                        ) : (
                            <Webcam
                                audio={false}
                                ref={webcamRef}
                                screenshotFormat="image/jpeg"
                                className={`object-cover w-64 h-64 rounded-full border-4 ${isFaceOk ? 'border-green-600' : 'border-red-600'}`}
                                videoConstraints={{ facingMode: "user" }}
                                onUserMediaError={() => setCameraError(true)}
                            />
                        )}
                        {!cameraError && (
                            <p className={`text-sm ${isFaceOk ? 'text-green-600' : 'text-red-600'}`}>
                                {isFaceOk ? 'Face properly detected' : 'Face not centered. Please adjust'}
                            </p>
                        )}
                        <Button
                            className="mt-4"
                            onClick={handleCapture}
                            disabled={!isFaceOk}
                        >
                            Capture
                        </Button>
                    </Card>
                )}

                <div>
                    {faceRecords.length === 0 && (
                        <TypographyMuted>No face records yet.</TypographyMuted>
                    )}
                    {faceRecords}
                </div>
            </div>
        </div>
    )
}