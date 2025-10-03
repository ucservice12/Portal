"use client";

import { useState } from "react";
import {
    Card,
    CardContent,
} from "@/components/ui/card";
import { TypographyH1, TypographyH3 } from "@/components/custom/Typography";
import { FilterControls } from "@/components/FilterControls"

import {
    PieChart as MUIPieChart,
} from "@mui/x-charts";

import {
    LineChart as ReLineChart,
    Line,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    Legend,
} from "recharts";

// Sample data
const cashFlowData = [
    { month: "Jan", inflow: 10000 },
    { month: "Feb", inflow: 12000 },
    { month: "Mar", inflow: 8000 },
    { month: "Apr", inflow: 15000 },
    { month: "May", inflow: 17000 },
    { month: "Jun", inflow: 20000 },
];

const profitLossData = [
    { month: "Jan", profit: 5000, loss: -2000 },
    { month: "Feb", profit: 6000, loss: -2500 },
    { month: "Mar", profit: 5500, loss: -3000 },
    { month: "Apr", profit: 8000, loss: -4000 },
    { month: "May", profit: 7000, loss: -3500 },
    { month: "Jun", profit: 9000, loss: -4200 },
];

const expensesData = [
    { id: "Employee", value: 8000, color: "#2563eb" },
    { id: "Vendor", value: 12000, color: "#f59e42" },
];

export default function FinanceBoard() {
    const [year, setYear] = useState("2025");
    const [startMonth, setStartMonth] = useState("Jan");
    const [endMonth, setEndMonth] = useState("Jun");

    const totalExpenses = expensesData.reduce((a, b) => a + b.value, 0);

    const handleRefresh = () => {
        console.log("Refreshed");
    };

    return (
        <div className="space-y-8">
            <TypographyH1>Overview</TypographyH1>

            {/* Filters */}
            <FilterControls
                year={year}
                setYear={setYear}
                startMonth={startMonth}
                setStartMonth={setStartMonth}
                endMonth={endMonth}
                setEndMonth={setEndMonth}
                handleRefresh={handleRefresh}
            />

            {/* Charts */}
            <div className="grid grid-cols-1 gap-8">
                {/* Cash Flow */}
                <Card>
                    <TypographyH3>Cash Flow</TypographyH3>
                    <CardContent>
                        <div style={{ width: "100%", height: 250 }}>
                            <ResponsiveContainer>
                                <ReLineChart data={cashFlowData}>
                                    <CartesianGrid strokeDasharray="2 2" />
                                    <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                                    <YAxis tick={{ fontSize: 12 }} />
                                    <Tooltip />
                                    <Legend wrapperStyle={{ fontSize: "12px" }} />
                                    <Line type="monotone" dataKey="inflow" stroke="#22d3ee" name="Cash Inflow" />
                                </ReLineChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>

                {/* Profit & Loss */}
                <Card>
                    <TypographyH3>Profit & Loss</TypographyH3>
                    <CardContent>
                        <div style={{ width: "100%", height: 250 }}>
                            <ResponsiveContainer>
                                <ReLineChart data={profitLossData}>
                                    <CartesianGrid strokeDasharray="2 2" />
                                    <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                                    <YAxis tick={{ fontSize: 12 }} />
                                    <Tooltip />
                                    <Legend wrapperStyle={{ fontSize: "12px" }} />
                                    <Line type="monotone" dataKey="profit" stroke="#16a34a" name="Profit" />
                                    <Line type="monotone" dataKey="loss" stroke="#dc2626" name="Loss" />
                                </ReLineChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>

                {/* Expenses Pie Chart */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    <Card>
                        <TypographyH3>Expenses</TypographyH3>
                        <CardContent className="flex flex-col items-center relative">
                            <MUIPieChart
                                series={[
                                    {
                                        data: expensesData,
                                        innerRadius: 60,
                                        outerRadius: 100,
                                        paddingAngle: 2,
                                        cornerRadius: 4,
                                        cx: 150,
                                        cy: 120,
                                        color: ({ dataIndex }) => expensesData[dataIndex].color,
                                        valueFormatter: (v) => `₹${v.toLocaleString()}`,
                                    },
                                ]}
                                width={300}
                                height={240}
                            />
                            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                                <div className="text-sm text-muted-foreground">Total</div>
                                <div className="font-bold text-lg">{totalExpenses.toLocaleString()}</div>
                            </div>
                            <div className="flex gap-6 mt-4 text-sm">
                                {expensesData.map((item) => (
                                    <div key={item.id} className="flex items-center gap-2">
                                        <span className="inline-block w-3 h-3 rounded-full" style={{ background: item.color }} />
                                        <span>{item.id}:</span>
                                        <span className="font-semibold">₹{item.value.toLocaleString()}</span>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
