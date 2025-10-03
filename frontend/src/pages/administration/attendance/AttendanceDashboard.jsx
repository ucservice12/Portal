import { TypographyH2, TypographyH4 } from "@/components/custom/Typography"
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { AttendanceChart, AttendanceOverview } from "./AttendanceChart"
import { AttendanceStats } from "./AttendanceStats"
import { DateRangePicker } from "./DateRangePicker"
import { AttendanceTable } from "./AttendanceTable"

export default function AttendanceDashboard() {
    return (
        <div className="flex flex-col min-h-screen overflow-hidden">
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                <TypographyH2>
                    Attendance Dashboard
                </TypographyH2>
                
                <DateRangePicker />
            </header>
            <main className="flex-1 space-y-4">
                <AttendanceStats />
                <AttendanceTable />
                <div className="grid grid-cols-1 lg:grid-cols-7 gap-4">
                    <div className="lg:col-span-4">
                        <AttendanceChart />
                    </div>
                    <div className="lg:col-span-3">
                        <Card className="p-4 sm:p-6">
                            <div className="flex justify-between">
                                <TypographyH4>Recent Activity</TypographyH4>
                                <Button variant="link" size="xs" className="underline">
                                    View all employees
                                </Button>
                            </div>
                            <div className="space-y-4 mt-4">
                                {recentActivity.map((activity, index) => (
                                    <div key={index} className="flex items-start gap-4">
                                        <div
                                            className={`mt-0.5 h-2 w-2 rounded-full ${activity.status === "present" ? "bg-green-500" : activity.status === "late" ? "bg-yellow-500" : "bg-red-500"}`}
                                        />
                                        <div className="space-y-1">
                                            <p className="text-sm font-medium">{activity.name}</p>
                                            <p className="text-xs text-muted-foreground">{activity.time}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </Card>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <AttendanceOverview />
                </div>
            </main>
        </div>
    )
}

const recentActivity = [
    {
        name: "John Doe",
        time: "Today, 9:00 AM",
        status: "present",
    },
    {
        name: "Jane Smith",
        time: "Today, 9:15 AM",
        status: "late",
    },
    {
        name: "Robert Johnson",
        time: "Today, 9:02 AM",
        status: "present",
    },
    {
        name: "Emily Davis",
        time: "Today, 8:55 AM",
        status: "present",
    },
    {
        name: "Michael Wilson",
        time: "Today, Absent",
        status: "absent",
    },
]