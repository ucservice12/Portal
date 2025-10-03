import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { FilterControls } from "@/components/FilterControls";
import { Button } from "@/components/ui/button";
import { StatCard } from "./StatCard";
import {
  IconArrowDown,
  IconShoppingCart,
  IconTrendingUp,
  IconCash,
} from "@tabler/icons-react";
import { ArrowUp } from "lucide-react";
import { TypographyH1 } from "@/components/custom/Typography";
import { useEffect, useState } from "react";

// Mock full data set (normally fetched from API)
const allData = [
  {
    date: "2025-06",
    data: {
      stats: [
        {
          label: "Income",
          value: 2000,
          isPositive: true,
          icon: <IconArrowDown size={24} />,
        },
        {
          label: "Cost Goods Sold",
          value: 0,
          isPositive: true,
          icon: <IconShoppingCart size={24} />,
        },
        {
          label: "Operating Expenses",
          value: 0,
          isPositive: true,
          icon: <IconTrendingUp size={24} />,
        },
        {
          label: "Net Profit",
          value: 2000,
          isPositive: true,
          icon: <IconCash size={24} />,
        },
      ],
      table: [
        { account: "Income", value: 2000 },
        { account: "Bills", value: 0 },
        { account: "Payrolls", value: 0 },
        { account: "Gross Profit", value: 2000 },
        { account: "Operating Expense", value: 0 },
        { account: "Net Profit", value: 2000 },
      ],
    },
  },
  {
    date: "2025-05",
    data: {
      stats: [
        {
          label: "Income",
          value: 1500,
          isPositive: true,
          icon: <IconArrowDown size={24} />,
        },
        {
          label: "Cost Goods Sold",
          value: 200,
          isPositive: true,
          icon: <IconShoppingCart size={24} />,
        },
        {
          label: "Operating Expenses",
          value: 300,
          isPositive: true,
          icon: <IconTrendingUp size={24} />,
        },
        {
          label: "Net Profit",
          value: 1000,
          isPositive: true,
          icon: <IconCash size={24} />,
        },
      ],
      table: [
        { account: "Income", value: 1500 },
        { account: "Bills", value: 100 },
        { account: "Payrolls", value: 200 },
        { account: "Gross Profit", value: 1200 },
        { account: "Operating Expense", value: 200 },
        { account: "Net Profit", value: 1000 },
      ],
    },
  },
];

export default function ProfitLoss() {
  const [year, setYear] = useState("2025");
  const [startMonth, setStartMonth] = useState("06");
  const [endMonth, setEndMonth] = useState("06");

  const [selectedData, setSelectedData] = useState(allData[0].data);
  const [dateLabel, setDateLabel] = useState("01/06/2025 To 30/06/2025");

  useEffect(() => {
    const dateKey = `${year}-${startMonth}`;
    const entry = allData.find((d) => d.date === dateKey);
    if (entry) {
      setSelectedData(entry.data);
      setDateLabel(`01/${startMonth}/${year} To 30/${endMonth}/${year}`);
    }
  }, [year, startMonth, endMonth]);

  return (
    <div className="space-y-6 mb-6">
      <TypographyH1>Profit Loss</TypographyH1>

      <FilterControls
        year={year}
        setYear={setYear}
        startMonth={startMonth}
        setStartMonth={setStartMonth}
        endMonth={endMonth}
        setEndMonth={setEndMonth}
        handleRefresh={() => {
          // For now useEffect handles refresh. API call logic can go here.
        }}
      />

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs">
        {selectedData.stats.map((stat, idx) => (
          <StatCard
            key={idx}
            label={stat.label}
            value={stat.value}
            percentage={0}
            isPositive={stat.isPositive}
            icon={stat.icon}
          />
        ))}
      </div>

      {/* Export Button */}
      <div className="flex justify-end">
        <Button>
          <ArrowUp />
          Export
        </Button>
      </div>

      {/* Profit & Loss Table */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-center">Accounts</TableHead>
            <TableHead className="text-center">{dateLabel}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {selectedData.table.map((row, index) => (
            <TableRow key={index}>
              <TableCell className="text-center">{row.account}</TableCell>
              <TableCell className="text-center">{row.value}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
