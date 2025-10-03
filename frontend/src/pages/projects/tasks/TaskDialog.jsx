"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { IoPersonSharp } from "react-icons/io5";
import { CalendarInput } from "@/components/custom/Calendar";
import {
  TypographyMuted,
  TypographyH5,
  TypographyH3,
} from "@/components/custom/Typography";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { SprintDialog } from "@/pages/projects/sprints/SprintDialog";
import { Plus } from "lucide-react";

export default function TaskDialog({
  open,
  setOpen,
  onSave,
  initialData = null,
  isEdit = false,
}) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    billable: 0,
    unbillable: 0,
    sprint: "Sprint 1",
    assignee: "John Doe",
    dueDate: "",
    priority: "Medium",
    status: "Created",
    assignedHours: 0,
    billedHours: 0,
    extraHours: 0,
    assigneeName: "",
    assigneeEmail: "",
    progress: 0,
    date: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isEdit && initialData) setFormData(initialData);
    if (!isEdit) {
      setFormData({
        title: "",
        description: "",
        billable: 0,
        unbillable: 0,
        sprint: "Sprint 1",
        assignee: "John Doe",
        dueDate: "",
        priority: "Medium",
        status: "Created",
        assignedHours: 0,
        billedHours: 0,
        extraHours: 0,
        assigneeName: "",
        assigneeEmail: "",
        progress: 0,
        date: "",
      });
    }
    setErrors({});
  }, [isEdit, initialData, open]);

  const handleChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.title.trim()) newErrors.title = "Title is required";
    if (!formData.description.trim())
      newErrors.description = "Description is required";
    if (!formData.assignee) newErrors.assignee = "Assignee is required";
    if (!formData.priority) newErrors.priority = "Priority is required";
    if (!formData.status) newErrors.status = "Status is required";

    if (isNaN(formData.billable) || formData.billable < 0)
      newErrors.billable = "Billable hours must be a valid number";
    if (isNaN(formData.unbillable) || formData.unbillable < 0)
      newErrors.unbillable = "Unbillable hours must be a valid number";

    if (!formData.dueDate) newErrors.dueDate = "Due date is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    onSave(formData);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-4xl">
        <DialogHeader>
          <DialogTitle />
          <TypographyH3 className="text-start">
            {isEdit ? "Edit Task" : "Add Task"}
          </TypographyH3>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-h-[75vh] overflow-y-auto">
          <div className="md:col-span-2 space-y-4">
            <div className="grid gap-1">
              <Label>Title</Label>
              <Input
                name="title"
                placeholder="Title"
                value={formData.title}
                onChange={handleInputChange}
              />
              {errors.title && (
                <p className="text-red-500 text-xs">{errors.title}</p>
              )}
            </div>
            <div className="grid gap-1">
              <Label>Description</Label>
              <Textarea
                name="description"
                placeholder="Enter text or type '/' for commands"
                value={formData.description}
                onChange={handleInputChange}
                rows={6}
              />
              {errors.description && (
                <p className="text-red-500 text-xs">{errors.description}</p>
              )}
            </div>
          </div>

          <div className="space-y-4 sm:mr-3">
            <div className="flex items-center gap-3 border rounded-md py-4 px-1">
              <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                <IoPersonSharp className="text-gray-600" />
              </div>
              <div>
                <TypographyH5>
                  {formData.assigneeName || "anishasachul107"}
                </TypographyH5>
                <TypographyMuted>
                  {formData.assigneeEmail || "anishasachul107@gmail.com"}
                </TypographyMuted>
              </div>
            </div>

            <div className="grid gap-1">
              <Label>Billable Hours</Label>
              <Input
                type="number"
                name="billable"
                value={formData.billable}
                onChange={handleInputChange}
              />
              {errors.billable && (
                <p className="text-red-500 text-xs">{errors.billable}</p>
              )}
            </div>

            <div className="grid gap-1">
              <Label>Unbillable Hours</Label>
              <Input
                type="number"
                name="unbillable"
                value={formData.unbillable}
                onChange={handleInputChange}
              />
              {errors.unbillable && (
                <p className="text-red-500 text-xs">{errors.unbillable}</p>
              )}
            </div>

            <div className="grid gap-1">
              <div className="flex items-center justify-between">
                <Label>Sprint</Label>
                <SprintDialog
                  trigger={
                    <Button variant="ghost" size="xs">
                      <Plus />
                    </Button>
                  }
                />
              </div>
              <Select
                value={formData.sprint}
                onValueChange={(value) => handleChange("sprint", value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Sprint" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Sprint 1">Sprint 1</SelectItem>
                  <SelectItem value="Sprint 2">Sprint 2</SelectItem>
                  <SelectItem value="Sprint 3">Sprint 3</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-1">
              <Label>Assigned To</Label>
              <Select
                value={formData.assignee}
                onValueChange={(value) => handleChange("assignee", value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Assignee" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="John Doe">John Doe</SelectItem>
                  <SelectItem value="Jane Smith">Jane Smith</SelectItem>
                  <SelectItem value="Anisha Sachul">Anisha Sachul</SelectItem>
                  <SelectItem value="Rahul Sharma">Rahul Sharma</SelectItem>
                </SelectContent>
              </Select>
              {errors.assignee && (
                <p className="text-red-500 text-xs">{errors.assignee}</p>
              )}
            </div>

            <CalendarInput
              label="Due Date"
              value={formData.dueDate}
              onChange={(e) => handleInputChange(e)}
              placeholder="MM-DD-YYYY"
            />
            {errors.dueDate && (
              <p className="text-red-500 text-xs">{errors.dueDate}</p>
            )}

            <div className="grid gap-1">
              <Label>Priority</Label>
              <Select
                value={formData.priority}
                onValueChange={(value) => handleChange("priority", value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Low">Low</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="High">High</SelectItem>
                </SelectContent>
              </Select>
              {errors.priority && (
                <p className="text-red-500 text-xs">{errors.priority}</p>
              )}
            </div>

            <div className="grid gap-1">
              <Label>Status</Label>
              <Select
                value={formData.status}
                onValueChange={(value) => handleChange("status", value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Created">Created</SelectItem>
                  <SelectItem value="In Progress">In Progress</SelectItem>
                  <SelectItem value="On Holding">On Holding</SelectItem>
                  <SelectItem value="Testing">Testing</SelectItem>
                  <SelectItem value="Delivered">Delivered</SelectItem>
                  <SelectItem value="Closed">Closed</SelectItem>
                </SelectContent>
              </Select>
              {errors.status && (
                <p className="text-red-500 text-xs">{errors.status}</p>
              )}
            </div>

            <div className="grid gap-2">
              <Button
                variant="default"
                className="w-full"
                onClick={handleSubmit}
              >
                Save
              </Button>
              <Button
                variant="destructive"
                className="w-full"
                onClick={() => setOpen(false)}
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
