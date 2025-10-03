"use client";

import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { CalendarInput } from "@/components/custom/Calendar";
import { Search } from "lucide-react";
import {
  TypographyMuted,
  TypographySmall,
} from "@/components/custom/Typography";

export function FilterPanel({
  invoiceNumber,
  setInvoiceNumber,
  dateRange,
  setDateRange,
  fromDate,
  setFromDate,
  toDate,
  placeholder,
  setToDate,
}) {
  return (
    <Card>
      <div className="flex items-center gap-1">
        <TypographySmall>Filters</TypographySmall>
        <TypographyMuted className="text-xs">
          (Choose Date Range filter or Date filter)
        </TypographyMuted>
      </div>

      <div className="space-y-2">
        <Label htmlFor="invoice">{placeholder}</Label>
        <div className="relative flex items-center">
          <Input
            id="invoice"
            placeholder={placeholder}
            value={invoiceNumber}
            className="pl-8"
            onChange={(e) => setInvoiceNumber(e.target.value)}
          />
          <Search
            size="16"
            className="text-muted-foreground absolute top-2.5 left-2"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label>Date Range (Due Date)</Label>
        <RadioGroup
          value={dateRange}
          onValueChange={setDateRange}
          className="space-y-1"
        >
          {["Last Week", "Last Month", "Last Year", "All"].map((label) => (
            <div className="flex items-center space-x-2" key={label}>
              <RadioGroupItem value={label} id={label} />
              <Label htmlFor={label}>{label}</Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      <CalendarInput
        label="From (Due Date)"
        value={fromDate}
        onChange={setFromDate}
        placeholder="MM-DD-YYYY"
      />

      <CalendarInput
        label="To"
        value={toDate}
        onChange={setToDate}
        placeholder="MM-DD-YYYY"
      />
    </Card>
  );
}
