import { TypographyH2, TypographyH3 } from '@/components/custom/Typography'
import { useState } from "react"
import { Card } from "@/components/ui/card"
import { CalendarInput } from "@/components/custom/Calendar"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
} from "@/components/ui/dropdown-menu"
import { Ellipsis } from "lucide-react"
import { Link } from 'react-router-dom'

// Mock employee list with department
const employees = [
    { id: "emp1", name: "John Doe", department: "HR" },
    { id: "emp2", name: "Jane Smith", department: "Engineering" },
    { id: "emp3", name: "Robert Johnson", department: "Sales" },
    { id: "emp4", name: "Emily Davis", department: "Marketing" },
    { id: "emp5", name: "Michael Wilson", department: "Finance" },
]

// Initial mock attendance data by employee (with location and selfieUrl)
const initialAttendanceData = {
    emp1: [
        { date: "2024-07-18", status: "Present", inTime: "09:00 AM", outTime: "05:00 PM", department: "HR", location: "Office", selfieUrl: "/selfies/emp1-2024-07-18.jpg" },
        { date: "2024-07-17", status: "Overtime", inTime: "09:00 AM", outTime: "07:00 PM", department: "HR", location: "Office", selfieUrl: "/selfies/emp1-2024-07-17.jpg" },
        { date: "2024-07-17", status: "Present", inTime: "09:00 AM", outTime: "05:00 PM", department: "HR", location: "Office", selfieUrl: "/selfies/emp1-2024-07-17.jpg" },
        { date: "2024-07-16", status: "Absent", inTime: "-", outTime: "-", department: "HR", location: "-", selfieUrl: "" },
    ],
    emp2: [
        { date: "2024-07-18", status: "Late", inTime: "09:15 AM", outTime: "05:00 PM", department: "Engineering", location: "Remote", selfieUrl: "/selfies/emp2-2024-07-18.jpg" },
        { date: "2024-07-17", status: "Paid Leave", inTime: "-", outTime: "-", department: "Engineering", location: "-", selfieUrl: "" },
        { date: "2024-07-16", status: "Half Day", inTime: "09:00 AM", outTime: "01:00 PM", department: "Engineering", location: "Office", selfieUrl: "/selfies/emp2-2024-07-16.jpg" },
    ],
    emp3: [
        { date: "2024-07-18", status: "Present", inTime: "09:02 AM", outTime: "05:00 PM", department: "Sales", location: "Client Site", selfieUrl: "/selfies/emp3-2024-07-18.jpg" },
        { date: "2024-07-17", status: "Overtime", inTime: "09:00 AM", outTime: "08:00 PM", department: "Sales", location: "Office", selfieUrl: "/selfies/emp3-2024-07-17.jpg" },
        { date: "2024-07-17", status: "Present", inTime: "09:00 AM", outTime: "05:00 PM", department: "Sales", location: "Office", selfieUrl: "/selfies/emp3-2024-07-17.jpg" },
        { date: "2024-07-16", status: "Sick Leave", inTime: "-", outTime: "-", department: "Sales", location: "-", selfieUrl: "" },
    ],
    emp4: [
        { date: "2024-07-18", status: "Half Day", inTime: "08:55 AM", outTime: "01:00 PM", department: "Marketing", location: "Office", selfieUrl: "/selfies/emp4-2024-07-18.jpg" },
        { date: "2024-07-17", status: "Absent", inTime: "-", outTime: "-", department: "Marketing", location: "-", selfieUrl: "" },
        { date: "2024-07-16", status: "Present", inTime: "09:10 AM", outTime: "05:00 PM", department: "Marketing", location: "Office", selfieUrl: "/selfies/emp4-2024-07-16.jpg" },
    ],
    emp5: [
        { date: "2024-07-18", status: "Annual Leave", inTime: "-", outTime: "-", department: "Finance", location: "-", selfieUrl: "" },
        { date: "2024-07-17", status: "Present", inTime: "09:00 AM", outTime: "05:00 PM", department: "Finance", location: "Office", selfieUrl: "/selfies/emp5-2024-07-17.jpg" },
        { date: "2024-07-16", status: "Late", inTime: "09:25 AM", outTime: "05:00 PM", department: "Finance", location: "Office", selfieUrl: "/selfies/emp5-2024-07-16.jpg" },
    ],
}

const statusOptions = [
    { value: "Present", label: "Present", color: "bg-green-500" },
    { value: "Late", label: "Late", color: "bg-yellow-500" },
    { value: "Half Day", label: "Half Day", color: "bg-blue-500" },
    { value: "Absent", label: "Absent", color: "bg-red-500" },
    { value: "Sick Leave", label: "Sick Leave", color: "bg-purple-500" },
    { value: "Paid Leave", label: "Paid Leave", color: "bg-pink-500" },
    { value: "Annual Leave", label: "Annual Leave", color: "bg-orange-500" },
    { value: "Overtime", label: "Overtime", color: "bg-indigo-500" },
]

function getStatusBadge(status) {
    const opt = statusOptions.find(o => o.value === status)
    if (!opt) return <Badge>{status}</Badge>
    return <Badge className={`${opt.color} text-white`}>{opt.label}</Badge>
}

function AddAttendanceForm({ form, setForm, handleAddAttendance, statusOptions, getLocation, error, success }) {
    return (
        <>
            <form className="flex flex-col md:flex-row gap-4 items-end">
                <div className="flex flex-col gap-2 w-full md:w-40">
                    <Label>Date</Label>
                    <Input
                        type="date"
                        value={form.date}
                        onChange={e => setForm(f => ({ ...f, date: e.target.value }))}
                        required
                    />
                </div>
                <div className="flex flex-col gap-2 w-full md:w-40">
                    <Label>Status</Label>
                    <Select
                        value={form.status}
                        onValueChange={val => setForm(f => ({ ...f, status: val }))}
                    >
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                            {statusOptions.map(opt => (
                                <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <div className="flex flex-col gap-2 w-full md:w-40">
                    <Label>In Time</Label>
                    <Input
                        type="time"
                        value={form.inTime}
                        onChange={e => setForm(f => ({ ...f, inTime: e.target.value }))}
                        required={form.status !== "Absent" && !form.status.includes("Leave")}
                        disabled={form.status === "Absent" || form.status.includes("Leave")}
                    />
                </div>
                <div className="flex flex-col gap-2 w-full md:w-40">
                    <Label>Out Time</Label>
                    <Input
                        type="time"
                        value={form.outTime}
                        onChange={e => setForm(f => ({ ...f, outTime: e.target.value }))}
                        required={form.status !== "Absent" && !form.status.includes("Leave")}
                        disabled={form.status === "Absent" || form.status.includes("Leave")}
                    />
                </div>
                <div className="grid gap-2 sm:w-fit w-full">
                    <div className='flex justify-between items-center'>
                        <Label>Location</Label>
                        <Button type="button" size="xs" className="text-xs" onClick={getLocation}>Get Location</Button>
                    </div>
                    <div className="flex gap-2">
                        <Input
                            type="text"
                            value={form.location}
                            onChange={e => setForm(f => ({ ...f, location: e.target.value }))}
                            placeholder="Enter location"
                            readOnly
                        />
                    </div>
                </div>
                <div className="flex flex-col gap-2 w-full md:w-40">
                    <Label>Selfie URL</Label>
                    <Input
                        type="text"
                        value={form.selfieUrl}
                        onChange={e => setForm(f => ({ ...f, selfieUrl: e.target.value }))}
                        placeholder="Paste selfie image URL"
                    />
                </div>
            </form>
            <div className="w-full flex md:flex-row flex-col justify-between sm:items-center mt-2">
                {error && <span className="text-red-500 text-xs">{error}</span>}
                {success && <span className="text-green-600 text-xs">{success}</span>}
                <Button onClick={handleAddAttendance} size='sm' type="submit" className="mt-2 w-full md:w-auto">Add Attendance</Button>
            </div>
        </>
    )
}

function AttendanceTable({ employeeAttendance, updateStatus }) {
    const summary = {
        Present: 0,
        Leave: 0,
        Absent: 0,
        Overtime: 0,
    }
    employeeAttendance.forEach(row => {
        if (row.status === "Present") summary.Present++
        else if (["Sick Leave", "Paid Leave", "Annual Leave"].includes(row.status)) summary.Leave++
        else if (row.status === "Absent") summary.Absent++
        else if (row.status === "Overtime") summary.Overtime++
    })

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>In Time</TableHead>
                    <TableHead>Out Time</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Selfie</TableHead>
                    <TableHead>Action</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {employeeAttendance.map((row, idx) => (
                    <TableRow key={idx}>
                        <TableCell>{row.date}</TableCell>
                        <TableCell>{getStatusBadge(row.status)}</TableCell>
                        <TableCell>{row.department}</TableCell>
                        <TableCell>{row.inTime}</TableCell>
                        <TableCell>{row.outTime}</TableCell>
                        <TableCell>{<Link
                            to={`https://maps.google.com/?q=${row.location}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="underline text-blue-600"
                        >
                            View on Map
                        </Link>}</TableCell>
                        <TableCell>
                            {row.selfieUrl
                                ? <img src={row.selfieUrl} alt="Selfie" style={{ width: 40, height: 40, borderRadius: "50%" }} />
                                : "-"}
                        </TableCell>
                        <TableCell>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon">
                                        <Ellipsis />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    {statusOptions.map(opt => (
                                        <DropdownMenuItem
                                            key={opt.value}
                                            onClick={() => updateStatus(row.date, opt.value)}
                                        >
                                            Mark as {opt.label}
                                        </DropdownMenuItem>
                                    ))}
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}

export default function AttendanceHistory() {
    const [selectedEmployee, setSelectedEmployee] = useState(employees[0].id)
    const [attendanceData, setAttendanceData] = useState(initialAttendanceData)
    const today = "2024-07-18"
    const [fromDate, setFromDate] = useState("")
    const [toDate, setToDate] = useState("")
    const [departmentFilter, setDepartmentFilter] = useState("all")
    const employeeAttendance = attendanceData[selectedEmployee] || []
    const todayStatus = employeeAttendance.find(a => a.date === today)
    const [form, setForm] = useState({
        date: today,
        status: "Present",
        inTime: "",
        outTime: "",
        department: employees.find(e => e.id === selectedEmployee)?.department || "",
        location: "",
        selfieUrl: "",
    })
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")
    const allDepartments = Array.from(new Set(employees.map(e => e.department)))

    // Filtering logic
    const filteredAttendance = employeeAttendance.filter(row => {
        let pass = true
        if (fromDate && row.date < fromDate) pass = false
        if (toDate && row.date > toDate) pass = false
        if (departmentFilter !== "all" && row.department !== departmentFilter) pass = false
        return pass
    })

    function updateStatus(date, newStatus) {
        setAttendanceData(prev => {
            const prevEmp = prev[selectedEmployee] || []
            if (newStatus === "Overtime") {
                const alreadyOvertime = prevEmp.some(a => a.date === date && a.status === "Overtime")
                if (!alreadyOvertime) {
                    const presentRec = prevEmp.find(a => a.date === date && a.status === "Present")
                    const baseRec = presentRec || prevEmp.find(a => a.date === date)
                    if (baseRec) {
                        return {
                            ...prev,
                            [selectedEmployee]: [
                                { ...baseRec, status: "Overtime" },
                                ...prevEmp,
                            ],
                        }
                    }
                }
                return prev
            }
            const idx = prevEmp.findIndex(a => a.date === date && a.status !== "Overtime")
            if (idx === -1) return prev
            const updated = [...prevEmp]
            updated[idx] = { ...updated[idx], status: newStatus }
            return { ...prev, [selectedEmployee]: updated }
        })
    }

    function getLocation() {
        setError("")
        setSuccess("")
        if (!navigator.geolocation) {
            setError("Geolocation is not supported by your browser.")
            return
        }
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords
                setForm(f => ({
                    ...f,
                    location: `Lat: ${latitude.toFixed(5)}, Lng: ${longitude.toFixed(5)}`
                }))
                setSuccess("Location fetched successfully.")
            },
            (err) => {
                setError("Unable to fetch location. Please allow location access.")
            }
        )
    }

    function handleAddAttendance() {
        setError("")
        setSuccess("")
        // Validation
        if (!form.date || !form.status) {
            setError("Date and Status are required.")
            return
        }
        if (
            (form.status !== "Absent" && !form.status.includes("Leave")) &&
            (!form.inTime || !form.outTime)
        ) {
            setError("In Time and Out Time are required for Present, Late, Half Day, Overtime.")
            return
        }
        if (!form.location) {
            setError("Location is required. Please click 'Get Location'.")
            return
        }
        setAttendanceData(prev => {
            const prevEmp = prev[selectedEmployee] || []
            let newEmpData = [...prevEmp]
            if (form.status === "Overtime") {
                const hasPresent = prevEmp.some(a => a.date === form.date && a.status === "Present")
                if (!hasPresent) {
                    newEmpData = [
                        { ...form, status: "Present" },
                        ...newEmpData,
                    ]
                }
                newEmpData = [
                    { ...form, status: "Overtime" },
                    ...newEmpData,
                ]
            } else {
                const idx = prevEmp.findIndex(a => a.date === form.date && a.status !== "Overtime")
                if (idx > -1) {
                    newEmpData[idx] = { ...form }
                } else {
                    newEmpData = [{ ...form }, ...newEmpData]
                }
            }
            return { ...prev, [selectedEmployee]: newEmpData }
        })
        setSuccess("Attendance added successfully.")
        setForm({
            date: today,
            status: "Present",
            inTime: "",
            outTime: "",
            department: employees.find(e => e.id === selectedEmployee)?.department || "",
            location: "",
            selfieUrl: "",
        })
    }

    function handleEmployeeChange(empId) {
        setSelectedEmployee(empId)
        const emp = employees.find(e => e.id === empId)
        setForm(f => ({
            ...f,
            department: emp?.department || "",
        }))
    }

    return (
        <div>
            <TypographyH2>Attendance History</TypographyH2>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mt-6'>
                <div className='grid gap-2'>
                    <Label htmlFor="employee">Select Employee</Label>
                    <Select
                        value={selectedEmployee}
                        onValueChange={handleEmployeeChange}
                    >
                        <SelectTrigger id="employee" className="w-full">
                            <SelectValue placeholder="Select employee" />
                        </SelectTrigger>
                        <SelectContent>
                            {employees.map(emp => (
                                <SelectItem key={emp.id} value={emp.id}>{emp.name}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <CalendarInput
                    label="From Date"
                    value={fromDate}
                    onChange={setFromDate}
                    placeholder="MM-DD-YYYY"
                />
                <CalendarInput
                    label="To Date"
                    value={toDate}
                    onChange={setToDate}
                    placeholder="MM-DD-YYYY"
                />
                <div className='grid gap-2'>
                    <Label htmlFor="history-class">Department</Label>
                    <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
                        <SelectTrigger id="history-class" className="w-full">
                            <SelectValue placeholder="Select department" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Departments</SelectItem>
                            {allDepartments.map(dep => (
                                <SelectItem key={dep} value={dep}>{dep}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </div>

            {/* Add Attendance Form */}
            <div className="mt-8">
                <Card>
                    <TypographyH3>
                        Add Attendance
                    </TypographyH3>
                    <div>
                        <AddAttendanceForm
                            form={form}
                            setForm={setForm}
                            handleAddAttendance={handleAddAttendance}
                            statusOptions={statusOptions}
                            getLocation={getLocation}
                            error={error}
                            success={success}
                        />
                    </div>
                </Card>
            </div>

            {/* Today's Status */}
            <div className="mt-8">
                <Card>
                    <TypographyH3>
                        {employees.find(e => e.id === selectedEmployee)?.name}'s Attendance Today
                    </TypographyH3>
                    <div>
                        {todayStatus ? (
                            <div className="flex flex-col gap-2">
                                <div className="flex items-center gap-4">
                                    {getStatusBadge(todayStatus.status)}
                                    <span className="text-sm text-muted-foreground">
                                        In: {todayStatus.inTime} | Out: {todayStatus.outTime}
                                    </span>
                                    {todayStatus.status === "Overtime" && (
                                        <Badge className="bg-indigo-500 text-white ml-2">Overtime</Badge>
                                    )}
                                </div>
                                <div className="flex items-center gap-4 mt-1">
                                    <span className="text-sm text-muted-foreground">
                                        Location:{" "}
                                        {todayStatus.location && todayStatus.location.startsWith("Lat:")
                                            ? (
                                                (() => {
                                                    // Try to parse the location string "Lat: xx, Lng: yy"
                                                    const match = todayStatus.location.match(/Lat:\s*([-\d.]+),\s*Lng:\s*([-\d.]+)/);
                                                    if (match) {
                                                        const lat = parseFloat(match[1]);
                                                        const lng = parseFloat(match[2]);
                                                        return (
                                                            <Link
                                                                to={`https://maps.google.com/?q=${lat},${lng}`}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="underline text-blue-600"
                                                            >
                                                                View on Map
                                                            </Link>
                                                        );
                                                    }
                                                    return todayStatus.location;
                                                })()
                                            )
                                            : (todayStatus.location || "-")
                                        }
                                    </span>
                                    {todayStatus.selfieUrl && (
                                        <span className="flex items-center gap-2">
                                            <span className="text-sm text-muted-foreground">Selfie:</span>
                                            <img
                                                src={todayStatus.selfieUrl}
                                                alt="Selfie"
                                                style={{ width: 40, height: 40, borderRadius: "50%", objectFit: "cover" }}
                                            />
                                        </span>
                                    )}
                                </div>
                            </div>
                        ) : (
                            <span className="text-sm text-muted-foreground">No record for today.</span>
                        )}
                    </div>
                </Card>
            </div>

            {/* Attendance Table with Summary */}
            <Card className="mt-8">
                <div>
                    <div className='flex md:flex-row flex-col sm:justify-between md:items-center mb-6'>
                        <TypographyH3>
                            {employees.find(e => e.id === selectedEmployee)?.name}'s Attendance History
                        </TypographyH3>
                        <Button size="sm" className="text-xs mt-3 sm:mt-0">
                            Generate Salary Slip
                        </Button>
                    </div>
                    <div>
                        <AttendanceTable
                            employeeAttendance={filteredAttendance}
                            updateStatus={updateStatus}
                        />
                    </div>
                </div>
            </Card>
        </div>
    )
}