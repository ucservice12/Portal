import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  TypographyH3,
  TypographyH5,
  TypographyMuted,
} from "@/components/custom/Typography";
import { IoPersonSharp } from "react-icons/io5";

export function LoghoursDialog({
  open,
  onOpenChange,
  selectedTask,
  selectedDate,
  onAddHours,
  existingLog = null, // Pass `{ value: number, description: string }` if editing
}) {
  const [logHours, setLogHours] = useState("");
  const [description, setDescription] = useState("");

  // Pre-fill values if editing
  useEffect(() => {
    if (existingLog) {
      setLogHours(existingLog.value.toString());
      setDescription(existingLog.description || "");
    } else {
      setLogHours("");
      setDescription("");
    }
  }, [existingLog, open]);

  const handleSubmit = () => {
    const hours = parseFloat(logHours);
    if (!isNaN(hours)) {
      onAddHours(hours, description);
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-3xl max-h-[75vh] overflow-y-auto">
        <DialogHeader className="text-start">
          <DialogTitle />
          <TypographyH3>
            {existingLog ? "Edit Log Hours" : "Add Log Hours"}
          </TypographyH3>
          <DialogDescription>Task: {selectedTask}</DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          <div className="space-y-4 md:col-span-8">
            <div className="space-y-1">
              <Label>Date</Label>
              <Input value={selectedDate} disabled />
            </div>

            <div className="space-y-1">
              <Label>Log hours</Label>
              <Input
                type="number"
                step="0.25"
                value={logHours}
                onChange={(e) => setLogHours(e.target.value)}
                placeholder="Enter hours"
              />
            </div>

            <div className="space-y-1">
              <Label>Description</Label>
              <Textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="What did you work on?"
              />
            </div>
          </div>
          <div className="md:col-span-4 flex justify-between items-center flex-col">
            <Card className="grid gap-2 w-full p-4">
              <Label>Added By</Label>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                  <IoPersonSharp className="text-gray-600" />
                </div>
                <div>
                  <TypographyH5>User</TypographyH5>
                  <TypographyMuted>User@gmail.com</TypographyMuted>
                </div>
              </div>
            </Card>
            <div className="grid gap-2 mt-4 w-full">
              <Button type="button" onClick={handleSubmit}>
                {existingLog ? "Update" : "Add"}
              </Button>
              <Button
                variant="destructive"
                type="button"
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
