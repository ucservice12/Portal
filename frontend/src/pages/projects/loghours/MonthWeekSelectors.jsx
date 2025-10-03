import { format, parse } from "date-fns";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export const MonthWeekSelectors = ({
  month,
  setMonth,
  weeks,
  selectedWeekStart,
  setSelectedWeekStart,
}) => {
  return (
    <div className="flex items-center gap-6 md:gap-12 flex-wrap">
      {/* Month Selector */}
      <div className="grid gap-2">
        <Label>Select Month</Label>
        <Input
          type="month"
          value={format(month, "yyyy-MM")}
          onChange={(e) => {
            const date = parse(
              e.target.value + "-01",
              "yyyy-MM-dd",
              new Date()
            );
            setMonth(date);
          }}
        />
      </div>

      {/* Week Selector */}
      <div className="grid gap-2">
        <Label>Select Week</Label>
        <RadioGroup
          className="flex flex-wrap gap-4 pt-1"
          value={
            selectedWeekStart ? format(selectedWeekStart, "yyyy-MM-dd") : ""
          }
          onValueChange={(val) =>
            setSelectedWeekStart(parse(val, "yyyy-MM-dd", new Date()))
          }
        >
          {weeks.map((w, i) => (
            <div key={i} className="flex items-center space-x-2">
              <RadioGroupItem
                value={format(w, "yyyy-MM-dd")}
                id={`week-${i}`}
              />
              <Label htmlFor={`week-${i}`}>{format(w, "dd/MM/yy")}</Label>
            </div>
          ))}
        </RadioGroup>
      </div>
    </div>
  );
};
