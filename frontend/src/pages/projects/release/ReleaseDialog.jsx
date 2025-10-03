import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { CalendarInput } from "@/components/custom/Calendar";
import { TypographyH3 } from "@/components/custom/Typography";

export function ReleaseDialog({ open, setOpen, onSave, initialData = null }) {
  const [data, setData] = useState({
    title: "",
    startDate: new Date().toISOString().split("T")[0],
    endDate: new Date().toISOString().split("T")[0],
  });

  useEffect(() => {
    if (initialData) {
      setData(initialData);
    }
  }, [initialData]);

  const handleChange = (key, value) => {
    setData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = () => {
    if (!data.title || !data.startDate || !data.endDate) return;
    onSave(data);
    setData({ title: "", startDate: "", endDate: "" });
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle />
          <TypographyH3>
            {initialData ? "Edit Sprint" : "Create Sprint"}
          </TypographyH3>
        </DialogHeader>

        <div className="grid gap-4">
          <div className="space-y-1">
            <Label>Title</Label>
            <Input
              value={data.title}
              onChange={(e) => handleChange("title", e.target.value)}
            />
          </div>

          <CalendarInput
            label="Start Date"
            value={data.startDate}
            onChange={(e) => handleChange("startDate", e.target.value)}
          />
          <CalendarInput
            label="End Date"
            value={data.endDate}
            onChange={(e) => handleChange("endDate", e.target.value)}
          />
          <Button onClick={handleSubmit}>Save</Button>
          <Button variant="destructive" onClick={() => setOpen(false)}>
            Cancel
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
