"use client";

import { Card } from "@/components/ui/card";
import { StatusBadge } from "@/components/ui/StatusBadge";
import {
  TypographyH2,
  TypographyP,
  TypographyH4,
  TypographyH5,
  TypographyMuted,
} from "@/components/custom/Typography";
import { PieChart } from "@mui/x-charts/PieChart";
import { RefreshCcw } from "lucide-react";
import { IoPersonSharp } from "react-icons/io5";

const COLORS = [
  "#3B82F6",
  "#10B981",
  "#EF4444",
  "#F59E0B",
  "#8B5CF6",
  "#14B8A6",
  "#F97316",
];

const statusData = [
  { id: 0, value: 1, label: "Created" },
  { id: 1, value: 2, label: "In Progress" },
  { id: 2, value: 0, label: "Cancelled" },
  { id: 3, value: 1, label: "On Hold" },
  { id: 4, value: 3, label: "Done" },
  { id: 5, value: 1, label: "Testing" },
  { id: 6, value: 2, label: "Done Approved" },
];

const timeData = [
  { name: "Created", OnTime: 1, Delayed: 0 },
  { name: "In Progress", OnTime: 2, Delayed: 1 },
  { name: "Done", OnTime: 3, Delayed: 0 },
  { name: "Testing", OnTime: 0, Delayed: 1 },
];

const hours = [
  { label: "Assigned Hours", value: 10 },
  { label: "Balance Hours", value: 6 },
  { label: "Billed Hours", value: 5 },
  { label: "Extra Hours", value: 1 },
];

const statusSummary = statusData.map((item, index) => ({
  label: item.label,
  value: item.value,
  color: COLORS[index % COLORS.length],
}));

const timeSummary = [
  {
    label: "Total On Time",
    value: timeData.reduce((sum, item) => sum + item.OnTime, 0),
    color: "#3B82F6",
  },
  {
    label: "Total Delayed",
    value: timeData.reduce((sum, item) => sum + item.Delayed, 0),
    color: "#EF4444",
  },
];

const meta = {
  manager: {
    name: "anishasachul107",
    email: "anishasachul107@gmail.com",
  },
  teamLead: {
    name: "anishasachul107",
    email: "anishasachul107@gmail.com",
  },
  invoice: "Pending",
  purchaseOrder: "Not Received",
  startDate: "10-07-2025",
  completionDate: "10-07-2025",
  customer: "company name",
  domain: "https://anisha.com",
};

export default function TaskDashboardOverview() {
  return (
    <div className="space-y-6">
      <TypographyH2>Project Task Name</TypographyH2>

      {/* Responsive Grid for Summaries */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Hours Summary */}
        <Card className="flex flex-col gap-2">
          <TypographyH4>Hours Summary</TypographyH4>
          {hours.map((hour, index) => (
            <Card key={hour.label}>
              <div className="flex items-center gap-4">
                <div
                  className="w-10 h-10 rounded-full flex justify-center items-center"
                  style={{ backgroundColor: COLORS[index % COLORS.length] }}
                >
                  <RefreshCcw size={18} color="white" />
                </div>
                <div>
                  <TypographyP>{hour.label}</TypographyP>
                  <TypographyH2>{hour.value}</TypographyH2>
                </div>
              </div>
            </Card>
          ))}
        </Card>

        {/* Task Status Summary */}
        <Card className="flex flex-col gap-2">
          <TypographyH4>Task Status Summary</TypographyH4>
          <div className="grid sm:grid-cols-2 gap-4">
            {statusSummary.map((task) => (
              <Card key={task.label} className="mx-2">
                <div className="flex items-center gap-2">
                  <div
                    className="w-10 h-10 rounded-full flex justify-center items-center"
                    style={{ backgroundColor: task.color }}
                  >
                    <RefreshCcw size={18} color="white" />
                  </div>
                  <div>
                    <TypographyP>{task.label}</TypographyP>
                    <TypographyH2>{task.value}</TypographyH2>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </Card>
        {/* Task Status Pie Chart */}
        <div className="flex flex-col gap-4">
          <Card>
            <TypographyH4>Task Status</TypographyH4>
            <PieChart
              series={[
                {
                  data: statusData.map((item, index) => ({
                    id: item.label,
                    value: item.value,
                    label: item.label,
                    color: COLORS[index % COLORS.length],
                  })),
                },
              ]}
              height={250}
            />
          </Card>
          {/* Time Summary */}
          <Card className="flex gap-4">
            <TypographyH4>Timing Summary</TypographyH4>
            <div className="grid sm:grid-cols-2 gap-4">
              {timeSummary.map((item) => (
                <Card key={item.label}>
                  <div className="flex items-center gap-4">
                    <div
                      className="w-10 h-10 rounded-full flex justify-center items-center"
                      style={{ backgroundColor: item.color }}
                    >
                      <RefreshCcw size={18} color="white" />
                    </div>
                    <div>
                      <TypographyP>{item.label}</TypographyP>
                      <TypographyH2>{item.value}</TypographyH2>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </Card>
        </div>
      </div>

      {/* Metadata Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card>
          <div className="flex gap-4">
            <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center">
              <IoPersonSharp className="text-gray-600" />
            </div>
            <div className="grid gap-1">
              <TypographyH5>Manager</TypographyH5>
              <TypographyMuted>{meta.manager.name}</TypographyMuted>
              <TypographyMuted>{meta.manager.email}</TypographyMuted>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex gap-4">
            <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center">
              <IoPersonSharp className="text-gray-600" />
            </div>
            <div className="grid gap-1">
              <TypographyH5>Team Lead</TypographyH5>
              <TypographyMuted>{meta.teamLead.name}</TypographyMuted>
              <TypographyMuted>{meta.teamLead.email}</TypographyMuted>
            </div>
          </div>
        </Card>

        <Card>
          <p className="font-medium">Invoice</p>
          <StatusBadge status={meta.invoice} />
        </Card>

        <Card>
          <p className="font-medium">Purchase Order</p>
          <StatusBadge status={meta.purchaseOrder} />
        </Card>

        <Card>
          <p className="font-medium">Start Date</p>
          <TypographyMuted>{meta.startDate}</TypographyMuted>
        </Card>

        <Card>
          <p className="font-medium">Completion Date</p>
          <TypographyMuted>{meta.completionDate}</TypographyMuted>
        </Card>

        <Card>
          <p className="font-medium">Customer</p>
          <TypographyMuted>{meta.customer}</TypographyMuted>
        </Card>

        <Card>
          <p className="font-medium">Domain</p>
          <TypographyMuted>{meta.domain}</TypographyMuted>
        </Card>
      </div>
    </div>
  );
}
