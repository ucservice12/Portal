import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { RefreshCcw } from "lucide-react";

const years = ["2025", "2024", "2023"];
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];

export function FilterControls({
  year,
  startMonth,
  endMonth,
  setYear,
  setStartMonth,
  setEndMonth,
  handleRefresh,
}) {
  return (
    <div className="grid sm:grid-cols-3 gap-3 sm:gap-8">
      <div className="grid gap-2">
        <Label>Financial Year</Label>
        <Select value={year} onValueChange={setYear}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select Year" />
          </SelectTrigger>
          <SelectContent>
            {years.map((y) => (
              <SelectItem key={y} value={y}>
                {y}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-2">
        <Label>Start Month</Label>
        <Select value={startMonth} onValueChange={setStartMonth}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Start Month" />
          </SelectTrigger>
          <SelectContent>
            {months.map((m) => (
              <SelectItem key={m} value={m}>
                {m}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex gap-3 w-full">
        <div className="flex-1 grid gap-2">
          <Label>End Month</Label>
          <Select value={endMonth} onValueChange={setEndMonth}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="End Month" />
            </SelectTrigger>
            <SelectContent>
              {months.map((m) => (
                <SelectItem key={m} value={m}>
                  {m}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Button onClick={handleRefresh} size="icon" className="mt-6">
          <RefreshCcw />
        </Button>
      </div>
    </div>
  );
}
