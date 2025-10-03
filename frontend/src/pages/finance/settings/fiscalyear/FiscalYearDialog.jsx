"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CalendarInput } from "@/components/custom/Calendar";
import { Label } from "@/components/ui/label";
import { TypographyH3 } from "@/components/custom/Typography";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

export default function FiscalYearDialog({
  trigger,
  initialData = null,
  onSave,
}) {
  const [year, setYear] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  useEffect(() => {
    if (initialData) {
      setYear(initialData.year.toString());
      setStartDate(new Date(initialData.startDate));
      setEndDate(new Date(initialData.endDate));
    } else {
      setYear("");
      setStartDate(new Date());
      setEndDate(new Date());
    }
  }, [initialData]);

  const handleSave = () => {
    if (!year) return;
    onSave({ year, startDate, endDate });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-3xl p-6">
        <DialogHeader>
          <TypographyH3 className="text-start">
            {initialData ? "Edit Fiscal Year" : "Add Fiscal Year"}
          </TypographyH3>
          <DialogTitle />
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Year Select */}
          <div className="md:col-span-8 grid gap-4">
            <div className="grid gap-2">
              <Label>Year</Label>
              <Select value={year} onValueChange={setYear}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select year" />
                </SelectTrigger>
                <SelectContent>
                  {[2023, 2024, 2025, 2026].map((y) => (
                    <SelectItem key={y} value={y.toString()}>
                      {y}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Start and End Date Pickers */}
            <CalendarInput
              label="Start Date"
              value={startDate}
              onChange={setStartDate}
            />
            <CalendarInput
              label="End Date"
              value={endDate}
              onChange={setEndDate}
            />
          </div>

          {/* Action Buttons */}
          <div className="md:col-span-4 flex flex-col justify-end gap-4">
            <Button onClick={handleSave}>Save</Button>
            <DialogClose asChild>
              <Button variant="destructive">Cancel</Button>
            </DialogClose>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
