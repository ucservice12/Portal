"use client";

import { useState } from "react";
import {
  IconArrowDown,
  IconShoppingCart,
  IconArrowUpRight,
} from "@tabler/icons-react";
import { ArrowUp } from "lucide-react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { TypographyH1 } from "@/components/custom/Typography";
import { FilterControls } from "@/components/FilterControls";
import { StatCard } from "./StatCard";

// Mock data for multiple months
const allCashFlowData = [
  {
    year: 2025,
    month: 6,
    heading: "Cash inflow and cash outflow",
    dateRange: "01/06/2025 to 30/06/2025",
    operating: {
      title: "Operating Activities",
      data: [
        { label: "Sales", value: 2000 },
        { label: "Purchases", value: 0 },
        { label: "Inventory", value: 0 },
        { label: "Payroll", value: 0 },
        { label: "Sales Taxes", value: 0 },
        { label: "Others", value: 0 },
      ],
      total: 2000,
    },
    investing: {
      title: "Investing Activities",
      data: [
        { label: "Property, Plant, Equipment", value: 0 },
        { label: "Others", value: 0 },
      ],
      total: 0,
    },
    financing: {
      title: "Financing Activities",
      data: [
        { label: "Loans and Lines of Credit", value: 0 },
        { label: "Owners and Shareholders", value: 0 },
        { label: "Others", value: 0 },
      ],
      total: 0,
    },
  },
  {
    year: 2025,
    month: 5,
    heading: "Cash inflow and cash outflow",
    dateRange: "01/05/2025 to 31/05/2025",
    operating: {
      title: "Operating Activities",
      data: [
        { label: "Sales", value: 1500 },
        { label: "Purchases", value: 100 },
        { label: "Inventory", value: 200 },
        { label: "Payroll", value: 200 },
        { label: "Sales Taxes", value: 50 },
        { label: "Others", value: 50 },
      ],
      total: 900,
    },
    investing: {
      title: "Investing Activities",
      data: [
        { label: "Property, Plant, Equipment", value: 300 },
        { label: "Others", value: 0 },
      ],
      total: 300,
    },
    financing: {
      title: "Financing Activities",
      data: [
        { label: "Loans and Lines of Credit", value: 100 },
        { label: "Owners and Shareholders", value: 0 },
        { label: "Others", value: 0 },
      ],
      total: 100,
    },
  },
];

export default function CashFlow() {
  const [year, setYear] = useState(2025);
  const [startMonth, setStartMonth] = useState(6);
  const [endMonth, setEndMonth] = useState(6);

  const filteredData = allCashFlowData.find(
    (entry) => entry.year === year && entry.month === startMonth
  );

  const inflow = filteredData?.operating.total ?? 0;
  const outflow =
    (filteredData?.investing.total ?? 0) + (filteredData?.financing.total ?? 0);
  const netCashChange = inflow - outflow;

  const summaryStats = [
    {
      label: "Gross Cash Inflow",
      value: inflow,
      icon: <IconArrowDown size={20} />,
      percentage: 0,
      isPositive: true,
    },
    {
      label: "Gross Cash Outflow",
      value: outflow,
      icon: <IconShoppingCart size={20} />,
      percentage: 0,
      isPositive: false,
    },
    {
      label: "Net Cash Change",
      value: netCashChange,
      icon: <IconArrowUpRight size={20} />,
      percentage: 0,
      isPositive: netCashChange >= 0,
    },
  ];

  return (
    <div className="space-y-6 mb-6">
      <TypographyH1>Cash Flow</TypographyH1>

      {/* Filters */}
      <FilterControls
        year={year}
        setYear={setYear}
        startMonth={startMonth}
        setStartMonth={setStartMonth}
        endMonth={endMonth}
        setEndMonth={setEndMonth}
        handleRefresh={() => {}}
      />

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {summaryStats.map((stat, idx) => (
          <StatCard
            key={idx}
            label={stat.label}
            value={stat.value}
            percentage={stat.percentage}
            isPositive={stat.isPositive}
            icon={stat.icon}
          />
        ))}
      </div>

      {/* Export Button */}
      <div className="flex justify-end">
        <Button>
          <ArrowUp className="mr-2 h-4 w-4" />
          Export
        </Button>
      </div>

      {/* Table */}
      {filteredData ? (
        <Table>
          <TableHeader>
            <TableRow className="bg-muted font-bold">
              <TableHead>{filteredData.heading}</TableHead>
              <TableHead className="text-right">
                {filteredData.dateRange}
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {/* Operating */}
            <TableRow className="bg-muted/40">
              <TableCell colSpan={2} className="font-semibold">
                {filteredData.operating.title}
              </TableCell>
            </TableRow>
            {filteredData.operating.data.map((row, idx) => (
              <TableRow key={`op-${idx}`}>
                <TableCell>{row.label}</TableCell>
                <TableCell className="text-right">{row.value}</TableCell>
              </TableRow>
            ))}
            <TableRow className="font-semibold">
              <TableCell>Net Cash Flow from Operating Activities</TableCell>
              <TableCell className="text-right">
                {filteredData.operating.total}
              </TableCell>
            </TableRow>

            {/* Investing */}
            <TableRow className="bg-muted/40">
              <TableCell colSpan={2} className="font-semibold">
                {filteredData.investing.title}
              </TableCell>
            </TableRow>
            {filteredData.investing.data.map((row, idx) => (
              <TableRow key={`inv-${idx}`}>
                <TableCell>{row.label}</TableCell>
                <TableCell className="text-right">{row.value}</TableCell>
              </TableRow>
            ))}
            <TableRow className="font-semibold">
              <TableCell>Net Cash Flow from Investing Activities</TableCell>
              <TableCell className="text-right">
                {filteredData.investing.total}
              </TableCell>
            </TableRow>

            {/* Financing */}
            <TableRow className="bg-muted/40">
              <TableCell colSpan={2} className="font-semibold">
                {filteredData.financing.title}
              </TableCell>
            </TableRow>
            {filteredData.financing.data.map((row, idx) => (
              <TableRow key={`fin-${idx}`}>
                <TableCell>{row.label}</TableCell>
                <TableCell className="text-right">{row.value}</TableCell>
              </TableRow>
            ))}
            <TableRow className="font-semibold">
              <TableCell>Net Cash Flow from Financing Activities</TableCell>
              <TableCell className="text-right">
                {filteredData.financing.total}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      ) : (
        <div className="text-muted-foreground">No data available</div>
      )}
    </div>
  );
}
