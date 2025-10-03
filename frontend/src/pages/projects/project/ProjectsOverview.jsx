import { PieChart } from "@mui/x-charts/PieChart";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  LabelList,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";

import { ChartContainer, ChartLegendContent } from "@/components/ui/chart";

import { TypographyH1, TypographyH3 } from "@/components/custom/Typography";
import { RefreshCcw } from "lucide-react";

const STATUS_ORDER = [
  "Planned",
  "Created",
  "In Progress",
  "Review",
  "On Hold",
  "Closed",
  "Delivered",
];

const STATUS_COLORS = {
  Planned: "#d1d5db",
  Created: "#3b82f6",
  "In Progress": "#facc15",
  Review: "#818cf8",
  "On Hold": "#fb923c",
  Closed: "#f87171",
  Delivered: "#22c55e",
};

// Example project data
const PROJECTS = [
  { id: 1, name: "Website Redesign", status: "Created" },
  { id: 2, name: "CRM Integration", status: "Planned" },
  { id: 3, name: "Marketing Campaign", status: "In Progress" },
  { id: 4, name: "Product Launch", status: "On Hold" },
  { id: 5, name: "Bug Fix Sprint", status: "Review" },
  { id: 6, name: "Customer Onboarding", status: "Delivered" },
  { id: 7, name: "API Development", status: "Closed" },
];

// Pie chart data
const PIE_DATA = STATUS_ORDER.map((status) => ({
  name: status,
  value: PROJECTS.filter((p) => p.status === status).length,
  color: STATUS_COLORS[status],
})).filter((d) => d.value > 0);

// Bar chart data (demo purposes)
const BAR_CHART_DATA = STATUS_ORDER.map((status) => ({
  status,
  onTime: Math.floor(Math.random() * 10),
  delayed: Math.floor(Math.random() * 5),
}));

const chartConfig = {
  onTime: {
    label: "On Time",
    color: "#3b82f6",
  },
  delayed: {
    label: "Delayed",
    color: "#f87171",
  },
};

export default function ProjectsOverview() {
  const statusCounts = STATUS_ORDER.map((status) => ({
    name: status,
    count: PROJECTS.filter((p) => p.status === status).length,
    color: STATUS_COLORS[status],
  }));

  return (
    <div className="space-y-8">
      <TypographyH1>Projects Overview</TypographyH1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Pie Chart */}
        <Card>
          <TypographyH3>Projects Status</TypographyH3>
          <PieChart
            series={[
              {
                data: PIE_DATA.map((item) => ({
                  id: item.name,
                  value: item.value,
                  label: item.name,
                  color: item.color,
                })),
              },
            ]}
            height={250}
            margin={{ top: 20, bottom: 20, left: 20, right: 20 }}
          />
          <div className="grid grid-cols-2 gap-3">
            {statusCounts.map((status) => (
              <div
                key={status.name}
                className="flex items-center gap-4 border p-3 rounded-md"
              >
                <div
                  className="w-10 h-10 rounded-full flex justify-center items-center"
                  style={{ backgroundColor: status.color }}
                >
                  <RefreshCcw size={18} color="white" />
                </div>
                <div className="grid gap-1">
                  <Label>{status.name}</Label>
                  <TypographyH3 className="text-lg">
                    {status.count}
                  </TypographyH3>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Bar Chart */}
        <Card className="h-fit">
          <CardContent className="p-4">
            <TypographyH3>On Time vs Delayed</TypographyH3>
            <ChartContainer config={chartConfig}>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart
                  data={BAR_CHART_DATA}
                  margin={{ top: 20, right: 20, left: 0, bottom: 10 }}
                >
                  <CartesianGrid vertical={false} strokeDasharray="3 3" />
                  <XAxis dataKey="status" tickLine={false} axisLine={false} />
                  <YAxis />
                  <Bar
                    dataKey="onTime"
                    fill={chartConfig.onTime.color}
                    radius={[6, 6, 0, 0]}
                  >
                    <LabelList
                      dataKey="onTime"
                      position="top"
                      offset={10}
                      fontSize={12}
                    />
                  </Bar>
                  <Bar
                    dataKey="delayed"
                    fill={chartConfig.delayed.color}
                    radius={[6, 6, 0, 0]}
                  >
                    <LabelList
                      dataKey="delayed"
                      position="top"
                      offset={10}
                      fontSize={12}
                    />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
              <ChartLegendContent />
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
