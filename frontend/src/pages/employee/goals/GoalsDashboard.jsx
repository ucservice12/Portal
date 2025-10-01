import { Pie, PieChart, ResponsiveContainer, Cell } from "recharts";
import { Card, CardContent } from "@/components/ui/card";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Label } from "@/components/ui/label";
import { TypographyH2, TypographyH3 } from "@/components/custom/Typography";
import { RefreshCcw } from "lucide-react";

const GoalData = [
  {
    id: 1,
    label: "Total Assigned",
    count: 10,
    bg: "bg-blue-300",
  },
  {
    id: 2,
    label: "Completed",
    count: 4,
    bg: "bg-green-300",
  },
  {
    id: 3,
    label: "In Progress",
    count: 6,
    bg: "bg-yellow-300",
  },
];

const chartData = [
  {
    name: "In Progress",
    value: GoalData.find((g) => g.label === "In Progress")?.count || 0,
    fill: "#FACC15", // yellow-400
  },
  {
    name: "Completed",
    value: GoalData.find((g) => g.label === "Completed")?.count || 0,
    fill: "#4ADE80", // green-400
  },
];

// Provide at least a dummy config object to avoid crash
const chartConfig = {
  "In Progress": { label: "In Progress", color: "#FACC15" },
  Completed: { label: "Completed", color: "#4ADE80" },
};

export default function GoalsDashboard() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
      <Card className="md:col-span-3">
        {GoalData.map((option) => (
          <CardContent
            key={option?.id}
            className="flex items-center gap-4 border p-4 rounded-md"
          >
            <div
              className={`w-10 h-10 rounded-full ${option.bg} flex justify-center items-center`}
            >
              <RefreshCcw size={18} />
            </div>
            <div className="grid gap-2">
              <Label>{option?.label}</Label>
              <TypographyH2 className="opacity-85">
                {option?.count}
              </TypographyH2>
            </div>
          </CardContent>
        ))}
      </Card>

      <Card className="flex flex-col md:col-span-4">
        <TypographyH3>Goal Status</TypographyH3>
        <CardContent>
          <ChartContainer
            config={chartConfig}
            className="[&_.recharts-pie-label-text]:fill-foreground mx-auto aspect-square pb-0"
          >
            <ResponsiveContainer>
              <PieChart>
                <ChartTooltip content={<ChartTooltipContent hideLabel />} />
                <Pie
                  data={chartData}
                  dataKey="value"
                  nameKey="name"
                  label
                  outerRadius={80}
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <ChartLegend
                  content={<ChartLegendContent nameKey="name" />}
                  className="-translate-y-2 flex-wrap gap-2 *:basis-1/4 *:justify-center"
                />
              </PieChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
}
