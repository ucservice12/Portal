"use client";

import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Plus } from "lucide-react";
import { TypographyH2 } from "@/components/custom/Typography";
import { FilterPanel } from "@/components/FilterPanel";
import { InvoiceTable } from "./InvoiceTable";
import SalesSummaryCard from "@/components/SalesSummaryCard";
import { Link, useLocation } from "react-router-dom";

// Function to get summary data
function getSummaryData() {
  return [
    { label: "Total Invoices", value: 3 },
    { label: "Paid Invoice", value: 2 },
    { label: "Overdue Invoice", value: 1 },
    { label: "Cancelled Invoice", value: 0 },
  ];
}

// Function to get all dummy invoices
export function getDummyInvoices() {
  return [
    {
      number: "Testing-I-2025-0",
      customer: "User",
      CustomerEmail: "User@gmail.com",
      issuedOn: "2025-06-14",
      dueDate: "2025-06-14",
      amount: 3000,
      status: "Paid Invoice",
    },
    {
      number: "Testing-I-2025-1",
      customer: "Prajakta Raut",
      CustomerEmail: "prajktaraute@gmail.com",
      issuedOn: "2025-06-13",
      dueDate: "2025-06-14",
      amount: 5000,
      status: "Overdue Invoice",
    },
    {
      number: "Testing-I-2025-2",
      customer: "Demo User",
      CustomerEmail: "demouser@gmail.com",
      issuedOn: "2025-06-10",
      dueDate: "2025-06-13",
      amount: 1000,
      status: "Paid Invoice",
    },
    // Add more dummy data here if needed
  ];
}

export default function CurrentSalesInvoices() {
  const [tab, setTab] = useState("All");
  const [invoiceNumber, setInvoiceNumber] = useState("");
  const [dateRange, setDateRange] = useState("");
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);

  const location = useLocation();

  const summaryData = getSummaryData();
  const invoices = getDummyInvoices();

  const filteredInvoices = useMemo(() => {
    let result = invoices;

    if (tab !== "All") {
      result = result.filter((inv) => inv.status === tab);
    }

    if (invoiceNumber) {
      result = result.filter((inv) =>
        inv.number.toLowerCase().includes(invoiceNumber.toLowerCase())
      );
    }

    const getDateRange = (range) => {
      const today = new Date();
      if (range === "Last Week") {
        const lastWeek = new Date(today);
        lastWeek.setDate(today.getDate() - 7);
        return [lastWeek, today];
      }
      if (range === "Last Month") {
        const lastMonth = new Date(today);
        lastMonth.setMonth(today.getMonth() - 1);
        return [lastMonth, today];
      }
      if (range === "Last Year") {
        const lastYear = new Date(today);
        lastYear.setFullYear(today.getFullYear() - 1);
        return [lastYear, today];
      }
      return [null, null];
    };

    if (dateRange && dateRange !== "All") {
      const [start, end] = getDateRange(dateRange);
      result = result.filter((inv) => {
        const due = new Date(inv.dueDate);
        return due >= start && due <= end;
      });
    }

    if (fromDate && toDate) {
      const from = new Date(fromDate);
      const to = new Date(toDate);
      result = result.filter((inv) => {
        const due = new Date(inv.dueDate);
        return due >= from && due <= to;
      });
    }

    return result;
  }, [tab, invoiceNumber, dateRange, fromDate, toDate, invoices]);

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <TypographyH2>Invoices</TypographyH2>
        {location.pathname === "/current-sales/invoices" && (
          <Link to="/current-sales/invoices/create">
            <Button>
              <Plus />
              Create
            </Button>
          </Link>
        )}
      </div>

      <div className="flex gap-6 sm:flex-row flex-col">
        <FilterPanel
          invoiceNumber={invoiceNumber}
          setInvoiceNumber={setInvoiceNumber}
          dateRange={dateRange}
          setDateRange={setDateRange}
          fromDate={fromDate}
          setFromDate={setFromDate}
          toDate={toDate}
          placeholder="Search By Invoice Number"
          setToDate={setToDate}
        />

        <div className="flex-1 space-y-4">
          <Card className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 border divide-x divide-gray-200 overflow-hidden">
            {summaryData.map((item, index) => (
              <SalesSummaryCard
                key={index}
                label={item.label}
                value={item.value}
                showVertical={index !== summaryData.length - 1}
                showHorizontal={index !== summaryData.length - 1}
              />
            ))}
          </Card>

          <div className="flex flex-wrap gap-2">
            {["All", "Paid Invoice", "Overdue Invoice"].map((status) => (
              <Button
                key={status}
                variant={tab === status ? "default" : "outline"}
                onClick={() => setTab(status)}
              >
                {status}
              </Button>
            ))}
          </div>

          <InvoiceTable invoices={filteredInvoices} />
        </div>
      </div>
    </div>
  );
}
