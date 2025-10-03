"use client"
import React, { useState } from "react"
import { Bar, BarChart, LabelList, Pie, XAxis, PieChart } from "recharts"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
    ChartLegend,
    ChartLegendContent
} from "@/components/ui/chart"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { TypographyH4 } from "@/components/custom/Typography"

// Mock weekly attendance data (Sun–Sat)
const weeklyData = [
    { date: "2024-07-14", absent: 30, present: 120, late: 10 },
    { date: "2024-07-15", absent: 25, present: 130, late: 5 },
    { date: "2024-07-16", absent: 20, present: 135, late: 8 },
    { date: "2024-07-17", absent: 18, present: 140, late: 7 },
    { date: "2024-07-18", absent: 22, present: 128, late: 12 },
    { date: "2024-07-19", absent: 27, present: 125, late: 9 },
    { date: "2024-07-20", absent: 15, present: 138, late: 6 },
]

// Mock monthly attendance data (one entry per week)
const monthlyData = [
    { date: "2024-07-01", absent: 120, present: 500, late: 40 },
    { date: "2024-07-08", absent: 110, present: 520, late: 35 },
    { date: "2024-07-15", absent: 100, present: 530, late: 30 },
    { date: "2024-07-22", absent: 90, present: 540, late: 25 },
]

const chartConfig = {
    absent: {
        label: "Absent",
        color: "var(--chart-1)",
    },
    present: {
        label: "Present",
        color: "var(--chart-2)",
    },
    late: {
        label: "Late",
        color: "var(--chart-3)",
    },
}

export const description = "A stacked bar chart with a legend"
export const iframeHeight = "600px"
export const containerClassName =
    "[&>div]:w-full [&>div]:max-w-md flex items-center justify-center min-h-svh"

export function AttendanceChart() {
    const [filter, setFilter] = useState("week")
    const data = filter === "week" ? weeklyData : monthlyData

    return (
        <Card className="p-0 pt-3">
            <CardHeader>
                <div className="flex justify-between items-center">
                    <div>
                        <CardTitle />
                        <TypographyH4>
                            Attendance Chart
                        </TypographyH4>
                        <CardDescription>
                            {filter === "week"
                                ? "Daily attendance breakdown (Sun–Sat)."
                                : "Weekly attendance breakdown (Month view)."}
                        </CardDescription>
                    </div>
                    <Select value={filter} onValueChange={setFilter}>
                        <SelectTrigger>
                            <SelectValue placeholder="Report" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="week">Weekly</SelectItem>
                            <SelectItem value="month">Monthly</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig}>
                    <BarChart accessibilityLayer data={data}>
                        <XAxis
                            dataKey="date"
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                            tickFormatter={(value) => {
                                if (filter === "week") {
                                    return new Date(value).toLocaleDateString("en-US", {
                                        weekday: "short",
                                    })
                                } else {
                                    // Show week number or date for month
                                    return `W${Math.ceil(new Date(value).getDate() / 7)}`
                                }
                            }}
                        />
                        <Bar
                            dataKey="absent"
                            stackId="a"
                            fill="var(--color-absent)"
                            radius={[0, 0, 4, 4]}
                        />
                        <Bar
                            dataKey="present"
                            stackId="a"
                            fill="var(--color-present)"
                            radius={[4, 4, 0, 0]}
                        />
                        <Bar
                            dataKey="late"
                            stackId="a"
                            fill="var(--color-late)"
                            radius={[4, 4, 0, 0]}
                        />
                        <ChartTooltip
                            content={<ChartTooltipContent indicator="line" />}
                            cursor={false}
                            defaultIndex={1}
                        />
                    </BarChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}

export function AttendanceOverview() {
    const [filter, setFilter] = useState("week")
    const data = filter === "week" ? weeklyData : monthlyData

    // Aggregate totals for the overview
    const totalPresent = data.reduce((sum, d) => sum + (d.present || 0), 0)
    const totalLate = data.reduce((sum, d) => sum + (d.late || 0), 0)
    const totalAbsent = data.reduce((sum, d) => sum + (d.absent || 0), 0)

    const overviewData = [
        { browser: "present", visitors: totalPresent, fill: "var(--color-present)" },
        { browser: "late", visitors: totalLate, fill: "var(--color-late)" },
        { browser: "absent", visitors: totalAbsent, fill: "var(--color-absent)" },
    ]

    return (
        <Card className="p-0 pt-3">
            <CardHeader className="items-center pb-0">
                <CardTitle />
                <TypographyH4>
                    Attendance Overview
                </TypographyH4>
                <CardDescription>
                    Summary for Total Month
                </CardDescription>
            </CardHeader>
            <CardContent className="flex-1 p-0">
                <ChartContainer
                    config={chartConfig}
                    className="[&_.recharts-text]:fill-background mx-auto aspect-square max-h-[250px]"
                >
                    <PieChart>
                        <ChartTooltip
                            content={<ChartTooltipContent nameKey="browser" />}
                        />
                        <Pie data={overviewData} dataKey="visitors" labelLine={false}
                            label={({ name, value, percent }) =>
                                `${chartConfig[name]?.label || name}: ${value} (${(percent * 100).toFixed(0)}%)`
                            }
                        >
                            <LabelList
                                dataKey="browser"
                                className="fill-background"
                                stroke="none"
                                fontSize={12}
                                formatter={(value) =>
                                    chartConfig[value]?.label
                                }
                            />
                            <ChartLegend
                                content={<ChartLegendContent nameKey="browser" />}
                                className="-translate-y-2 flex-wrap gap-2 *:basis-1/4 *:justify-center"
                            />
                        </Pie>
                    </PieChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}