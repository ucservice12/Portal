import { Card } from "@/components/ui/card";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { TypographyH4 } from "@/components/custom/Typography";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

// Sample data
const timesheetData = [
  { day: "Mon", hours: 7 },
  { day: "Tue", hours: 5 },
  { day: "Wed", hours: 6 },
  { day: "Thu", hours: 4 },
  { day: "Fri", hours: 3 },
  { day: "Sat", hours: 0 },
  { day: "Sun", hours: 0 },
];

export function Timesheet() {
  return (
    <Card>
      <div className="flex justify-between items-center">
        <TypographyH4>Timesheet</TypographyH4>
        <Select>
          <SelectTrigger className="w-36 h-8">
            <SelectValue placeholder="Your Timesheet" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="your">Your Timesheet</SelectItem>
            <SelectItem value="team">Team Timesheet</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <div className="h-56 rounded-2xl border py-2">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={timesheetData}>
              <XAxis
                dataKey="day"
                axisLine={false}
                tickLine={false}
                stroke="currentColor"
                className="text-muted-foreground text-xs"
              />
              <YAxis
                domain={[0, 24]}
                tickCount={5}
                axisLine={false}
                tickLine={false}
                stroke="currentColor"
                className="text-muted-foreground text-xs"
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--popover))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "0.375rem",
                  fontSize: "0.75rem",
                }}
                labelStyle={{
                  color: "hsl(var(--foreground))",
                }}
                itemStyle={{
                  color: "hsl(var(--foreground))",
                }}
              />
              <Bar
                dataKey="hours"
                fill="hsl(var(--primary))"
                radius={[4, 4, 0, 0]}
                barSize={14}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <Button className="w-full mt-4" size="sm">
          Submit Timesheet
        </Button>
      </div>
    </Card>
  );
}
    