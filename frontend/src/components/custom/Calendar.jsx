import { CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";

function formatDate(date) {
  if (!date) return "";
  return date.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

function isValidDate(date) {
  return date instanceof Date && !isNaN(date.getTime());
}

export function CalendarInput({
  label = "Select Date",
  value,
  onChange,
  defaultValue,
  className,
  ...props
}) {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(
    defaultValue ? new Date(defaultValue) : null
  );
  const [month, setMonth] = useState(date || new Date());
  const [inputValue, setInputValue] = useState(formatDate(date));

  // Sync with controlled value
  useEffect(() => {
    if (value) {
      const d = new Date(value);
      setDate(d);
      setMonth(d);
      setInputValue(formatDate(d));
    }
  }, [value]);

  // Handle input change
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    const d = new Date(e.target.value);
    if (isValidDate(d)) {
      setDate(d);
      setMonth(d);
      if (onChange) onChange(d);
    }
  };

  // Handle calendar select
  const handleSelect = (d) => {
    setDate(d);
    setInputValue(formatDate(d));
    setOpen(false);
    if (onChange) onChange(d);
  };

  return (
    <div className={cn("flex flex-col gap-3", className)}>
      <Label htmlFor="date" className="px-1">
        {label}
      </Label>
      <div className="relative flex gap-2">
        <Input
          id="date"
          value={inputValue}
          placeholder="Select Date"
          className="bg-background pr-10 placeholder:text-xs"
          onChange={handleInputChange}
          onKeyDown={(e) => {
            if (e.key === "ArrowDown") {
              e.preventDefault();
              setOpen(true);
            }
          }}
          {...props}
        />
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              id="date-picker"
              variant="ghost"
              className="absolute top-1/2 right-2 size-6 -translate-y-1/2"
              tabIndex={-1}
            >
              <CalendarIcon className="size-3.5" />
              <span className="sr-only">Select date</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent
            className="w-auto overflow-hidden p-0"
            align="end"
            alignOffset={-8}
            sideOffset={10}
          >
            <Calendar
              mode="single"
              selected={date}
              captionLayout="dropdown"
              month={month}
              onMonthChange={setMonth}
              onSelect={handleSelect}
            />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}
