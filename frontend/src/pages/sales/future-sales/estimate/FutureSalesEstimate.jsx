"use client";

import { useState, useMemo, use } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { TypographyH2 } from "@/components/custom/Typography";
import { EstimateTable } from "./EstimateTable";
import { FilterPanel } from "@/components/FilterPanel";
import { Link, useLocation } from "react-router-dom";

// Dummy estimate data
export function getDummyEstimates() {
  return [
    {
      id: "est-0",
      number: "EST-2025-001",
      customer: "User",
      CustomerEmail: "amol@example.com",
      issuedOn: "2025-06-01",
      dueDate: "2025-06-15",
      amount: 7500,
      status: "Not Expired",
    },
    {
      id: "est-1",
      number: "EST-2024-012",
      customer: "Prajakta Raut",
      CustomerEmail: "prajakta@example.com",
      issuedOn: "2024-05-01",
      dueDate: "2024-05-15",
      amount: 5000,
      status: "Expired",
    },
    // Add more as needed
  ];
}

export function FutureSalesEstimate() {
  const { pathname } = useLocation();

  const [tab, setTab] = useState("All");
  const [numberFilter, setNumberFilter] = useState("");
  const [dateRange, setDateRange] = useState("");
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);

  const estimates = getDummyEstimates();

  const filteredEstimates = useMemo(() => {
    let data = estimates;

    if (tab !== "All") {
      data = data.filter((e) => e.status === tab);
    }

    if (numberFilter) {
      data = data.filter((e) =>
        e.number.toLowerCase().includes(numberFilter.toLowerCase())
      );
    }

    // dateRange presets: Last Week / Month / Year
    const getRange = (r) => {
      const today = new Date();
      if (r === "Last Week") {
        const d = new Date(today);
        d.setDate(d.getDate() - 7);
        return [d, today];
      }
      if (r === "Last Month") {
        const d = new Date(today);
        d.setMonth(d.getMonth() - 1);
        return [d, today];
      }
      if (r === "Last Year") {
        const d = new Date(today);
        d.setFullYear(d.getFullYear() - 1);
        return [d, today];
      }
      return [null, null];
    };
    if (dateRange && dateRange !== "All") {
      const [s, e] = getRange(dateRange);
      data = data.filter((e1) => {
        const d = new Date(e1.dueDate);
        return s && e >= d && d >= s;
      });
    }

    if (fromDate && toDate) {
      const fd = new Date(fromDate);
      const td = new Date(toDate);
      data = data.filter((e1) => {
        const d = new Date(e1.dueDate);
        return fd <= d && d <= td;
      });
    }

    return data;
  }, [tab, numberFilter, dateRange, fromDate, toDate, estimates]);

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <TypographyH2>Estimates</TypographyH2>
        {pathname === "/future-sales" && (
          <Link to="/future-sales/estimates/create">
            <Button>
              <Plus />
              Create Estimate
            </Button>
          </Link>
        )}
      </div>

      <div className="flex flex-col sm:flex-row gap-6">
        <FilterPanel
          invoiceNumber={numberFilter}
          setInvoiceNumber={setNumberFilter}
          dateRange={dateRange}
          setDateRange={setDateRange}
          fromDate={fromDate}
          toDate={toDate}
          setFromDate={setFromDate}
          setToDate={setToDate}
          placeholder="Search by Estimate Number"
        />

        <div className="flex-1 space-y-4">
          <div className="flex flex-wrap gap-2">
            {["All", "Expired", "Not Expired"].map((status) => (
              <Button
                key={status}
                size="xs"
                variant={tab === status ? "default" : "outline"}
                onClick={() => setTab(status)}
              >
                {status}
              </Button>
            ))}
          </div>

          <EstimateTable estimates={filteredEstimates} />
        </div>
      </div>
    </div>
  );
}
