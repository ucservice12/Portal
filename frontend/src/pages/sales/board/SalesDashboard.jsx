"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  TypographyH2,
  TypographyP,
  TypographyH3,
} from "@/components/custom/Typography";
import { Plus } from "lucide-react";
import { InvoiceTable } from "./InvoiceTable";
import { CustomersTable } from "./CustomersTable";
import { Link } from "react-router-dom";
import CurrentSalesPayment from "../current-sales/CurrentSalesPayment";

const filters = ["Last 7 Days", "Last 30 Days", "Last 12 Months"];

const metrics = [
  { label: "Revenue", value: "0.00", percentage: "0.00%" },
  { label: "Payments", value: "0.00", percentage: "0.00%" },
  { label: "Invoice Overdue", value: "0.00", percentage: "0.00%" },
  { label: "Projected Revenue", value: "0.00", percentage: "0.00%" },
  { label: "Call Made", value: "0" },
  { label: "Email Sent", value: "0" },
  { label: "Meeting Booked", value: "0" },
  { label: "Follow-ups Due", value: "0" },
  { label: "New Leads", value: "0" },
  { label: "MQLs", value: "0" },
  { label: "SQLs", value: "0" },
  { label: "Opportunities", value: "0" },
  { label: "Conversation Rate (Lead->Customer)", value: "0" },
];

export default function SalesDashboard() {
  const [selectedFilter, setSelectedFilter] = useState("Last 7 Days");

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <TypographyH2>Sales</TypographyH2>

        <div className="flex flex-wrap gap-2">
          {filters.map((filter) => (
            <Button
              key={filter}
              size="sm"
              className="w-full"
              variant={selectedFilter === filter ? "default" : "outline"}
              onClick={() => setSelectedFilter(filter)}
            >
              {filter}
            </Button>
          ))}
        </div>

        <div className="flex flex-wrap gap-2">
          <Link to="/current-sales/invoices/create" className="w-full">
            <Button size="sm" className="w-full">
              <Plus />
              New Invoice
            </Button>
          </Link>
          <Link to="/future-sales/estimates/create" className="w-full">
            <Button size="sm" className="w-full">
              <Plus />
              New Estimate
            </Button>
          </Link>
          <Link to="/current-sales/customers" className="w-full">
            <Button size="sm" className="w-full">
              <Plus />
              New Customers
            </Button>
          </Link>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {metrics.map(({ label, value, percentage }) => (
          <Card key={label} className="min-h-[110px]">
            <CardContent className="p-4 space-y-2">
              <div className="flex items-center justify-between">
                <TypographyP className="text-sm font-light">
                  {label}
                </TypographyP>
                {percentage && <Badge variant="secondary">{percentage}</Badge>}
              </div>
              <TypographyH2 className="font-bold">{value}</TypographyH2>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="space-y-6">
        <TypographyH2>Recent Activity</TypographyH2>

        {/* Invoice Section */}
        <div className="border-t-2 pt-6 grid gap-4">
          <div className="flex justify-between items-center">
            <TypographyH3>Invoice</TypographyH3>
            <Link to="/current-sales/invoices">
              <Button>View All</Button>
            </Link>
          </div>
          <InvoiceTable invoices={[]} />
        </div>

        {/* Payment Section */}
        <div className="border-t-2 pt-6 grid gap-4">
          <div className="flex justify-between items-center">
            <TypographyH3>Payments</TypographyH3>
            <Link to="/current-sales">
              <Button>View All</Button>
            </Link>
          </div>
          <CurrentSalesPayment />
        </div>

        {/* Customer Section */}
        <div className="border-t-2 pt-6 grid gap-4">
          <div className="flex justify-between items-center">
            <TypographyH3>Customers</TypographyH3>
            <Link to="/current-sales/customers">
              <Button>View All</Button>
            </Link>
          </div>
          <CustomersTable customers={[]} />
        </div>
      </div>
    </div>
  );
}
