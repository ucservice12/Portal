"use client";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { CalendarInput } from "@/components/custom/Calendar";
import { IoPersonSharp } from "react-icons/io5";
import { TypographyMuted, TypographyH3 } from "@/components/custom/Typography";

export default function GoalDialog({
  mode = "add",
  defaultValues,
  onSave,
  trigger,
}) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({});

  useEffect(() => {
    if (defaultValues) setForm(defaultValues);
  }, [defaultValues]);

  const handleSave = () => {
    if (!form.title || !form.year || !form.dueDate || !form.status) return;

    const newGoal = {
      ...form,
      id: form.id ?? Date.now(),
      assignedBy: "User",
    };

    onSave(newGoal);
    setForm({});
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button>
            <Plus />
            Create
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-4xl h-[75vh] overflow-y-auto grid grid-cols-1 md:grid-cols-12 gap-6">
        <div className="space-y-4 md:col-span-8">
          <TypographyH3>{mode === "edit" ? "Edit" : "Add"} Goal</TypographyH3>

          <div className="space-y-2">
            <Label>Title</Label>
            <Input
              placeholder="Enter title"
              value={form.title || ""}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label>Description</Label>
            <Textarea
              placeholder="Enter description"
              value={form.description || ""}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
            />
          </div>
        </div>

        <div className="md:col-span-4 space-y-4">
          <div className="space-y-2">
            <Label>Assigned By</Label>
            <div className="flex items-center gap-3 border-b pb-4">
              <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">
                <IoPersonSharp className="text-gray-600" />
              </div>
              <div>
                <TypographyMuted className="text-xs">User</TypographyMuted>
                <TypographyMuted className="text-xs">
                  User@gmail.com
                </TypographyMuted>
              </div>
            </div>
          </div>

          <CalendarInput
            label="Due Date"
            value={form.dueDate || ""}
            onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
          />

          <div className="space-y-2">
            <Label>Year</Label>
            <Input
              value={form.year || ""}
              onChange={(e) => setForm({ ...form, year: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label>Status</Label>
            <Select
              value={form.status}
              onValueChange={(value) => setForm({ ...form, status: value })}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Created">Created</SelectItem>
                <SelectItem value="In Progress">In Progress</SelectItem>
                <SelectItem value="Completed">Completed</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2 pt-2">
            <Button onClick={handleSave}>Save</Button>
            <Button variant="destructive" onClick={() => setOpen(false)}>
              Cancel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
