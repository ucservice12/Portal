"use client";

import { useState, useMemo } from "react";
import { FilterControls } from "@/components/FilterControls";
import { TypographyH1 } from "@/components/custom/Typography";
import { StatCard } from "./StatCard";

import {
  IconArrowDown,
  IconShoppingCart,
  IconArrowUpRight,
} from "@tabler/icons-react";

// Mock data
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

export default function BalanceSheet() {
  const [year, setYear] = useState(2025);
  const [startMonth, setStartMonth] = useState(6);
  const [endMonth, setEndMonth] = useState(6);

  // Current and previous month data
  const current = allCashFlowData.find(
    (d) => d.year === year && d.month === startMonth
  );
  const previous = allCashFlowData.find(
    (d) =>
      d.year === year && d.month === (startMonth === 1 ? 12 : startMonth - 1)
  );

  const inflow = current?.operating.total ?? 0;
  const outflow =
    (current?.investing.total ?? 0) + (current?.financing.total ?? 0);
  const net = inflow - outflow;

  const prevInflow = previous?.operating.total ?? 0;
  const prevOutflow =
    (previous?.investing.total ?? 0) + (previous?.financing.total ?? 0);
  const prevNet = prevInflow - prevOutflow;

  const calcPercentage = (now, prev) => {
    if (prev === 0) return 0;
    return Math.round(((now - prev) / prev) * 100);
  };

  const summaryStats = useMemo(
    () => [
      {
        label: "Gross Cash Inflow",
        value: inflow,
        icon: <IconArrowDown size={20} />,
        percentage: calcPercentage(inflow, prevInflow),
        isPositive: inflow >= prevInflow,
      },
      {
        label: "Gross Cash Outflow",
        value: outflow,
        icon: <IconShoppingCart size={20} />,
        percentage: calcPercentage(outflow, prevOutflow),
        isPositive: outflow <= prevOutflow,
      },
      {
        label: "Net Cash Change",
        value: net,
        icon: <IconArrowUpRight size={20} />,
        percentage: calcPercentage(net, prevNet),
        isPositive: net >= prevNet,
      },
    ],
    [inflow, outflow, net, prevInflow, prevOutflow, prevNet]
  );

  return (
    <div className="space-y-6 mb-6">
      <TypographyH1>Balance Sheet</TypographyH1>

      <FilterControls
        year={year}
        setYear={setYear}
        startMonth={startMonth}
        setStartMonth={setStartMonth}
        endMonth={endMonth}
        setEndMonth={setEndMonth}
        handleRefresh={() => {}}
      />

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
    </div>
  );
}
