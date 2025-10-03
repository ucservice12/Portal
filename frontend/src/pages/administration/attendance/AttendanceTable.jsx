"use client"

import { useState } from "react"
import { CheckCircle, Clock, Ellipsis, XCircle } from "lucide-react"
import { TypographyH4 } from "@/components/custom/Typography"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

const initialData = [
    {
        id: 1,
        name: "John Doe",
        department: "Engineering",
        status: "present",
        checkIn: "09:00 AM",
        checkOut: "05:00 PM",
    },
    {
        id: 2,
        name: "Jane Smith",
        department: "Marketing",
        status: "late",
        checkIn: "09:15 AM",
        checkOut: "05:30 PM",
    },
    {
        id: 3,
        name: "Robert Johnson",
        department: "Finance",
        status: "present",
        checkIn: "08:55 AM",
        checkOut: "05:05 PM",
    },
    {
        id: 4,
        name: "Emily Davis",
        department: "HR",
        status: "present",
        checkIn: "08:50 AM",
        checkOut: "04:55 PM",
    },
    {
        id: 5,
        name: "Michael Wilson",
        department: "Sales",
        status: "absent",
        checkIn: "-",
        checkOut: "-",
    },
    {
        id: 6,
        name: "Sarah Thompson",
        department: "Engineering",
        status: "present",
        checkIn: "09:02 AM",
        checkOut: "05:10 PM",
    },
    {
        id: 7,
        name: "David Martinez",
        department: "Marketing",
        status: "late",
        checkIn: "09:30 AM",
        checkOut: "05:45 PM",
    },
    {
        id: 8,
        name: "Jennifer Garcia",
        department: "Finance",
        status: "absent",
        checkIn: "-",
        checkOut: "-",
    },
]

export function AttendanceTable() {
    const [data, setData] = useState(initialData)

    const updateStatus = (id, newStatus) => {
        setData((prev) =>
            prev.map((item) =>
                item.id === id
                    ? {
                        ...item,
                        status: newStatus,
                        checkIn:
                            newStatus === "absent"
                                ? "-"
                                : newStatus === "late"
                                    ? "09:30 AM"
                                    : "09:00 AM",
                        checkOut: newStatus === "absent" ? "-" : "05:00 PM",
                    }
                    : item
            )
        )
    }

    return (
        <Card className="p-0 md:pt-2">
            <CardHeader>
                <CardTitle />
                <TypographyH4>Attendance Records</TypographyH4>
                <CardDescription>Today's attendance for all employees</CardDescription>
            </CardHeader>
            <CardContent>
                {/* Enable horizontal scrolling */}
                <div className="w-full overflow-x-auto">
                    <Table className="min-w-[720px]">
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>Department</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Check In</TableHead>
                                <TableHead>Check Out</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {data?.slice(0, 4).map((item) => (
                                <TableRow key={item.id}>
                                    <TableCell className="font-medium">{item.name}</TableCell>
                                    <TableCell>{item.department}</TableCell>
                                    <TableCell>
                                        <Badge
                                            variant="outline"
                                            className={
                                                item.status === "present"
                                                    ? "bg-green-100 text-green-800 border-green-200"
                                                    : item.status === "late"
                                                        ? "bg-yellow-100 text-yellow-800 border-yellow-200"
                                                        : "bg-red-100 text-red-800 border-red-200"
                                            }
                                        >
                                            {item.status === "present" ? (
                                                <CheckCircle className="mr-1 h-3 w-3" />
                                            ) : item.status === "late" ? (
                                                <Clock className="mr-1 h-3 w-3" />
                                            ) : (
                                                <XCircle className="mr-1 h-3 w-3" />
                                            )}
                                            {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>{item.checkIn}</TableCell>
                                    <TableCell>{item.checkOut}</TableCell>
                                    <TableCell className="text-right">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" size="icon">
                                                    <Ellipsis />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuItem onClick={() => updateStatus(item.id, "present")}>
                                                    Mark as Present
                                                </DropdownMenuItem>
                                                <DropdownMenuItem onClick={() => updateStatus(item.id, "late")}>
                                                    Mark as Late
                                                </DropdownMenuItem>
                                                <DropdownMenuItem onClick={() => updateStatus(item.id, "absent")}>
                                                    Mark as Absent
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </CardContent>
        </Card>
    )
}
