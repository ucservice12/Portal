"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function AddMOMDialog({ open, onOpenChange, onSave }) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-12 gap-4 p-6">
        <div className="md:col-span-8 space-y-6">
          <h2 className="text-xl font-semibold">Add Minutes Of Meeting</h2>

          {/* Date Picker */}
          <div className="border rounded-md p-4 space-y-2">
            <Label>Select Date</Label>
            <Input type="date" />
          </div>

          {/* Time Picker + Timezone */}
          <div className="border rounded-md p-4 space-y-4">
            <Label>Select Free Time</Label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label>From</Label>
                <Input type="time" />
              </div>
              <div>
                <Label>To</Label>
                <Input type="time" />
              </div>
              <div className="sm:col-span-2">
                <Label>Time zone</Label>
                <select className="w-full border rounded-md p-2 text-sm">
                  <option>Asia/Calcutta</option>
                  <option>UTC</option>
                  <option>Asia/Dubai</option>
                  <option>Europe/London</option>
                </select>
              </div>
            </div>
          </div>

          {/* MOM Textarea */}
          <div className="border rounded-md p-4">
            <Label>Minutes Of Meeting</Label>
            <Textarea
              placeholder="Notes"
              className="mt-1 w-full min-h-[100px]"
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="md:col-span-4 flex flex-col gap-3 justify-end">
          <Button className="w-full" onClick={onSave}>
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
