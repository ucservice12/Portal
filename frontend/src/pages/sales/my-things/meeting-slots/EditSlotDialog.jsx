"use client";

import { useEffect, useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TypographyH3 } from "@/components/custom/Typography";
import ct from "countries-and-timezones";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function EditSlotDialog({ open, onOpenChange, onSave }) {
  const [date, setDate] = useState("");
  const [fromTime, setFromTime] = useState("");
  const [toTime, setToTime] = useState("");
  const [timezone, setTimezone] = useState("");
  const [timezones, setTimezones] = useState([]);

  useEffect(() => {
    setDate(new Date().toISOString().split("T")[0]);

    const allZones = Object.values(ct.getAllTimezones()).map((tz) => {
      const countryName = tz.countries?.[0]
        ? ct.getCountry(tz.countries[0])?.name || "Unknown"
        : "Unknown";
      return {
        value: tz.name,
        label: `${countryName} (${tz.name}) ${tz.utcOffsetStr}`,
      };
    });

    setTimezones(allZones);
  }, []);

  const handleSave = () => {
    console.log({ date, fromTime, toTime, timezone });
    onSave?.({ date, fromTime, toTime, timezone });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-3xl h-[75vh] overflow-y-auto w-full grid grid-cols-1 md:grid-cols-12 gap-4 p-6">
        <div className="md:col-span-8 space-y-6">
          <TypographyH3>Add Free Slots</TypographyH3>

          {/* Date Field */}
          <Field label="Select Date">
            <Input
              id="edit-date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </Field>

          {/* Time Fields */}
          <Field label="Select Free Time">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                type="time"
                value={fromTime}
                onChange={(e) => setFromTime(e.target.value)}
                placeholder="From"
              />
              <Input
                type="time"
                value={toTime}
                onChange={(e) => setToTime(e.target.value)}
                placeholder="To"
              />
            </div>
          </Field>

          {/* Timezone Dropdown (ShadCN Select) */}
          <Field label="Select Timezone">
            <Select value={timezone} onValueChange={setTimezone}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a Timezone" />
              </SelectTrigger>
              <SelectContent className="max-h-72 w-64 overflow-y-auto">
                <SelectGroup>
                  <SelectLabel>Timezones</SelectLabel>
                  {timezones.map((tz) => (
                    <SelectItem key={tz.value} value={tz.value}>
                      {tz.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </Field>
        </div>

        {/* Action Buttons */}
        <div className="md:col-span-4 flex flex-col gap-3 justify-end">
          <Button className="w-full" onClick={handleSave}>
            Save
          </Button>
          <Button
            variant="destructive"
            className="w-full"
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function Field({ label, children }) {
  return (
    <div className="border rounded-md p-4 space-y-2">
      <Label className="text-sm font-medium">{label}</Label>
      {children}
    </div>
  );
}
