import React, { useState } from "react";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { format, addMinutes, endOfMonth } from "date-fns";
import { Ban, Copy, Plus } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TypographyH3 } from "@/components/custom/Typography";

const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const durationOptions = [
  { label: "15 Min", value: 15 },
  { label: "30 Min", value: 30 },
  { label: "45 Min", value: 45 },
  { label: "1 Hour", value: 60 },
  { label: "1.15 Hour", value: 75 },
  { label: "1.30 Hour", value: 90 },
  { label: "2 Hour", value: 120 },
];

const timeOptions = Array.from({ length: 24 * 4 }, (_, i) => {
  const hours = Math.floor(i / 4);
  const minutes = (i % 4) * 15;
  return new Date(0, 0, 0, hours, minutes).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
});

function getToday() {
  return format(new Date(), "yyyy-MM-dd");
}
function getMonthEnd() {
  return format(endOfMonth(new Date()), "yyyy-MM-dd");
}

function expandSlots(slots, duration) {
  const result = [];
  for (const { from, to, isUnavailable } of slots) {
    if (isUnavailable) continue;
    let start = toDate(from);
    const end = toDate(to);
    while (start < end) {
      const next = addMinutes(start, duration);
      if (next > end) break;
      result.push({
        from: formatTime(start),
        to: formatTime(next),
      });
      start = next;
    }
  }
  return result;
}

function toDate(timeStr) {
  const [time, ampm] = timeStr.split(" ");
  let [h, m] = time.split(":").map(Number);
  if (ampm === "PM" && h !== 12) h += 12;
  if (ampm === "AM" && h === 12) h = 0;
  const d = new Date();
  d.setHours(h, m, 0, 0);
  return d;
}

function formatTime(date) {
  return date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
}

export default function AddSlotsDialog() {
  const [startDate, setStartDate] = useState(getToday());
  const [endDate, setEndDate] = useState(getMonthEnd());
  const [duration, setDuration] = useState(15);
  const [repeat, setRepeat] = useState("Repeat Weekly");

  const [slots, setSlots] = useState(
    days.map(() => [
      {
        from: "12:00 AM",
        to: "11:59 PM",
        showActions: false,
        isUnavailable: false,
      },
    ])
  );

  const [customSlots, setCustomSlots] = useState([
    {
      from: "12:00 AM",
      to: "11:59 PM",
      showActions: false,
      isUnavailable: false,
    },
  ]);
  const [customDate, setCustomDate] = useState(getToday());

  const handleSlotChange = (index, field, value, isCustom = false) => {
    const updated = isCustom ? [...customSlots] : [...slots];
    if (isCustom) updated[index][field] = value;
    else updated[index][0][field] = value;
    isCustom ? setCustomSlots(updated) : setSlots(updated);
  };

  const handleAddSlot = (index, isCustom = false) => {
    const updated = isCustom ? [...customSlots] : [...slots];
    const slot = isCustom ? updated[0] : updated[index][0];
    slot.showActions = true;
    isCustom ? setCustomSlots(updated) : setSlots(updated);
  };

  const handleBanClick = (index, isCustom = false) => {
    const updated = isCustom ? [...customSlots] : [...slots];
    const slot = isCustom ? updated[0] : updated[index][0];
    slot.isUnavailable = true;
    isCustom ? setCustomSlots(updated) : setSlots(updated);
  };

  const handleSave = () => {
    if (repeat === "Repeat Weekly") {
      const weekly = slots.map((slotArr, i) => ({
        day: days[i],
        slots: expandSlots(slotArr, duration),
      }));
      console.log("Weekly:", weekly);
    } else {
      const oneTime = expandSlots(customSlots, duration);
      console.log("Custom:", { date: customDate, slots: oneTime });
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default" size="sm">
          <Plus /> Add Free Slots
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-4xl overflow-y-auto h-[75vh] grid grid-cols-1 sm:grid-cols-12 gap-4">
        <div className="col-span-1 sm:col-span-8 w-full">
          <TypographyH3>Add Free Slots</TypographyH3>

          {/* Duration & Repeat */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4 border rounded-md p-4">
            <div>
              <Label>Duration</Label>
              <Select
                value={String(duration)}
                onValueChange={(val) => setDuration(Number(val))}
              >
                <SelectTrigger className="w-full mt-1">
                  <SelectValue>
                    {durationOptions.find((opt) => opt.value === duration)
                      ?.label || "Select duration"}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {durationOptions.map((opt) => (
                    <SelectItem key={opt.value} value={String(opt.value)}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>General Availability</Label>
              <Select value={repeat} onValueChange={setRepeat}>
                <SelectTrigger className="w-full mt-1">
                  <SelectValue>{repeat}</SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Repeat Weekly">Repeat Weekly</SelectItem>
                  <SelectItem value="Does Not Repeat">
                    Does Not Repeat
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Date Range */}
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 mb-4">
            <div className="flex-1">
              <Label>Start Date</Label>
              <Input
                type="date"
                className="mt-1 text-sm"
                value={startDate}
                min={getToday()}
                onChange={(e) => setStartDate(e.target.value)}
                disabled={repeat !== "Repeat Weekly"}
              />
            </div>
            <div className="flex-1">
              <Label>End Date</Label>
              <Input
                type="date"
                className="mt-1 text-sm"
                value={endDate}
                min={startDate}
                onChange={(e) => setEndDate(e.target.value)}
                disabled={repeat !== "Repeat Weekly"}
              />
            </div>
          </div>

          {/* Time Slots */}
          {repeat === "Repeat Weekly" ? (
            <div className="space-y-2">
              {slots.map((slotArr, idx) => {
                const slot = slotArr[0];
                return (
                  <div
                    className="flex flex-col sm:flex-row items-start sm:items-center gap-2"
                    key={idx}
                  >
                    <Label className="w-32 min-w-[80px]">{days[idx]}:</Label>

                    {slot.isUnavailable ? (
                      <div className="text-muted-foreground italic">
                        Unavailable
                      </div>
                    ) : (
                      <div className="flex flex-col sm:flex-row gap-2 w-full">
                        <Select
                          value={slot.from}
                          onValueChange={(val) =>
                            handleSlotChange(idx, "from", val)
                          }
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue>{slot.from || "From"}</SelectValue>
                          </SelectTrigger>
                          <SelectContent>
                            {timeOptions.map((time) => (
                              <SelectItem key={time} value={time}>
                                {time}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <Select
                          value={slot.to}
                          onValueChange={(val) =>
                            handleSlotChange(idx, "to", val)
                          }
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue>{slot.to || "To"}</SelectValue>
                          </SelectTrigger>
                          <SelectContent>
                            {timeOptions.map((time) => (
                              <SelectItem key={time} value={time}>
                                {time}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    )}

                    <div className="flex gap-1">
                      {!slot.showActions ? (
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => handleAddSlot(idx)}
                        >
                          <Plus size={14} />
                        </Button>
                      ) : (
                        <>
                          <Button
                            size="icon"
                            variant="ghost"
                            onClick={() => handleBanClick(idx)}
                          >
                            <Ban />
                          </Button>
                          <Button size="icon" variant="ghost">
                            <Copy />
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="space-y-2 border rounded-md p-4">
              <div>
                <Label>Custom Date</Label>
                <Input
                  type="date"
                  className="mt-1"
                  value={customDate}
                  onChange={(e) => setCustomDate(e.target.value)}
                />
              </div>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
                {customSlots[0].isUnavailable ? (
                  <div className="text-muted-foreground italic">
                    Unavailable
                  </div>
                ) : (
                  <div className="flex flex-col sm:flex-row gap-2 w-full">
                    <Select
                      value={customSlots[0].from}
                      onValueChange={(val) =>
                        handleSlotChange(0, "from", val, true)
                      }
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue>
                          {customSlots[0].from || "From"}
                        </SelectValue>
                      </SelectTrigger>
                      <SelectContent>
                        {timeOptions.map((time) => (
                          <SelectItem key={time} value={time}>
                            {time}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Select
                      value={customSlots[0].to}
                      onValueChange={(val) =>
                        handleSlotChange(0, "to", val, true)
                      }
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue>{customSlots[0].to || "To"}</SelectValue>
                      </SelectTrigger>
                      <SelectContent>
                        {timeOptions.map((time) => (
                          <SelectItem key={time} value={time}>
                            {time}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}
                <div className="flex gap-1">
                  {!customSlots[0].showActions ? (
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => handleAddSlot(0, true)}
                    >
                      <Plus size={14} />
                    </Button>
                  ) : (
                    <>
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => handleBanClick(0, true)}
                      >
                        <Ban />
                      </Button>
                      <Button size="icon" variant="ghost">
                        <Copy />
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Save/Cancel */}
        <div className="col-span-1 sm:col-span-4 flex flex-col gap-3 justify-end w-full">
          <Button className="w-full" onClick={handleSave}>
            Save
          </Button>
          <Button className="w-full" variant="destructive">
            Cancel
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
