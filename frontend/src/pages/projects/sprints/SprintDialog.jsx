"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { TypographyH3 } from "@/components/custom/Typography";
import { Button } from "@/components/ui/button";
import { CalendarInput } from "@/components/custom/Calendar";
import { format } from "date-fns";

export function SprintDialog({
  trigger,
  initialData = null,
  onSave,
  open: controlledOpen,
  setOpen: setControlledOpen,
}) {
  // Use controlled open if provided, else internal state
  const [internalOpen, setInternalOpen] = useState(false);
  const open = controlledOpen !== undefined ? controlledOpen : internalOpen;
  const setOpen =
    setControlledOpen !== undefined ? setControlledOpen : setInternalOpen;

  const isEdit = !!initialData;

  const [form, setForm] = useState({
    title: "",
    status: "Not Started",
    startDate: new Date(),
    endDate: new Date(),
  });

  useEffect(() => {
    if (open) {
      if (initialData) {
        setForm({
          title: initialData.title || "",
          status: initialData.status || "Not Started",
          startDate: new Date(initialData.startDate || new Date()),
          endDate: new Date(initialData.endDate || new Date()),
        });
      } else {
        setForm({
          title: "",
          status: "Not Started",
          startDate: new Date(),
          endDate: new Date(),
        });
      }
    }
  }, [initialData, open]);

  const handleSave = () => {
    const sprintData = { ...form };
    onSave?.(sprintData);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
      <DialogContent className="sm:max-w-3xl max-h-[75vh] overflow-y-auto">
        <DialogHeader className="p-0">
          <DialogTitle />
          <DialogDescription />
        </DialogHeader>
        <TypographyH3 className="text-start">
          {isEdit ? "Edit Sprint" : "Create Sprint"}
        </TypographyH3>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          <div className="space-y-4 md:col-span-8">
            <div className="grid gap-2">
              <Label>Title</Label>
              <Input
                placeholder="Sprint title"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
              />
            </div>

            <div className="grid gap-2">
              <Label>Status</Label>
              <Select
                value={form.status}
                onValueChange={(value) => setForm({ ...form, status: value })}
                disabled={!isEdit}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Not Started">Not Started</SelectItem>
                  <SelectItem value="In Progress">In Progress</SelectItem>
                  <SelectItem value="Completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-4 md:col-span-4">
            <CalendarInput
              label="Start Date"
              value={format(form.startDate, "yyyy-MM-dd")}
              onChange={(e) =>
                setForm({ ...form, startDate: new Date(e.target.value) })
              }
            />
            <CalendarInput
              label="End Date"
              value={format(form.endDate, "yyyy-MM-dd")}
              onChange={(e) =>
                setForm({ ...form, endDate: new Date(e.target.value) })
              }
            />

            <div className="flex flex-col gap-2">
              <Button onClick={handleSave}>
                {isEdit ? "Update" : "Create"}
              </Button>
              <Button variant="destructive" onClick={() => setOpen(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
