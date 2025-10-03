import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { CalendarInput } from "@/components/custom/Calendar";
import { IoPersonSharp } from "react-icons/io5";
import { TypographyH3 } from "@/components/custom/Typography";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

// Sample data
const employees = [
  { name: "John Doe", email: "john@example.com" },
  { name: "Jane Smith", email: "jane@example.com" },
  { name: "Mark Johnson", email: "mark@example.com" },
];

const contacts = [
  "Acme Corp",
  "Globex Inc",
  "Stark Industries",
  "Wayne Enterprises",
];

const statuses = ["Created", "In Progress", "Lost", "On Hold", "Won"];

export default function AddDealDialog({
  open,
  onClose,
  onSave,
  initialData = null,
}) {
  const [form, setForm] = useState({
    title: "",
    content: "",
    dueDate: "",
    completedDate: "",
    assignedTo: { name: "", email: "" },
    contact: "",
    status: "Created",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (open && initialData) {
      setForm(initialData);
    } else if (open) {
      setForm({
        title: "",
        content: "",
        dueDate: "",
        completedDate: "",
        assignedTo: { name: "", email: "" },
        contact: "",
        status: "Created",
      });
      setErrors({});
    }
  }, [open, initialData]);

  const handleChange = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: "" }));
  };

  const validate = () => {
    const newErrors = {};
    if (!form.title.trim()) newErrors.title = "Title is required";
    if (!form.content.trim()) newErrors.content = "Content is required";
    if (!form.assignedTo.name) newErrors.assignedTo = "Assignee is required";
    if (!form.contact) newErrors.contact = "Contact is required";
    if (!form.status) newErrors.status = "Status is required";
    return newErrors;
  };

  const handleSubmit = () => {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    onSave(form);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-5xl">
        <DialogHeader>
          <TypographyH3 className="text-start">Add Deal</TypographyH3>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 overflow-y-auto max-h-[70vh]">
          {/* Left Form */}
          <div className="md:col-span-8 space-y-4">
            <div className="grid gap-2">
              <Label>Title</Label>
              <Input
                className={errors.title ? "border-red-500" : ""}
                value={form.title}
                onChange={(e) => handleChange("title", e.target.value)}
              />
              {errors.title && (
                <p className="text-red-500 text-xs">{errors.title}</p>
              )}
            </div>

            <div className="grid gap-2">
              <Label>Content</Label>
              <Textarea
                className={errors.content ? "border-red-500" : ""}
                value={form.content}
                onChange={(e) => handleChange("content", e.target.value)}
                rows={6}
                placeholder="Enter text or type '/' for commands"
              />
              {errors.content && (
                <p className="text-red-500 text-xs">{errors.content}</p>
              )}
            </div>
          </div>

          {/* Right Form */}
          <div className="md:col-span-4 space-y-4">
            <div className="border p-4 rounded-md space-y-4 bg-muted/10">
              <div className="flex gap-2 items-center border-b pb-3">
                <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">
                  <IoPersonSharp className="text-xl text-muted-foreground" />
                </div>
                <div className="text-xs">
                  <p className="font-medium">{form.assignedTo.name}</p>
                  <p className="text-muted-foreground">
                    {form.assignedTo.email}
                  </p>
                </div>
              </div>

              <div className="grid gap-3 border-b pb-3">
                <CalendarInput
                  label="Due Date"
                  value={form.dueDate}
                  onChange={(val) => handleChange("dueDate", val)}
                  placeholder="DD-MM-YYYY"
                />

                <CalendarInput
                  label="Actual Completion Date"
                  value={form.completedDate}
                  onChange={(val) => handleChange("completedDate", val)}
                  placeholder="DD-MM-YYYY"
                />
              </div>

              <div className="grid gap-2">
                <Label>Assigned To</Label>
                <Select
                  value={form.assignedTo.name}
                  onValueChange={(value) => {
                    const selected = employees.find(
                      (emp) => emp.name === value
                    );
                    setForm((prev) => ({
                      ...prev,
                      assignedTo: selected || { name: value, email: "" },
                    }));
                    setErrors((prev) => ({ ...prev, assignedTo: "" }));
                  }}
                >
                  <SelectTrigger
                    className={`w-full ${
                      errors.assignedTo ? "border-red-500" : ""
                    }`}
                  >
                    <SelectValue placeholder="Select employee" />
                  </SelectTrigger>
                  <SelectContent>
                    {employees.map((emp) => (
                      <SelectItem key={emp.email} value={emp.name}>
                        {emp.name} ({emp.email})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.assignedTo && (
                  <p className="text-red-500 text-xs">{errors.assignedTo}</p>
                )}
              </div>

              <div className="grid gap-2">
                <Label>Contact</Label>
                <Select
                  value={form.contact}
                  onValueChange={(value) => {
                    handleChange("contact", value);
                    setErrors((prev) => ({ ...prev, contact: "" }));
                  }}
                >
                  <SelectTrigger
                    className={`w-full ${
                      errors.contact ? "border-red-500" : ""
                    }`}
                  >
                    <SelectValue placeholder="Select contact" />
                  </SelectTrigger>
                  <SelectContent>
                    {contacts.map((contact) => (
                      <SelectItem key={contact} value={contact}>
                        {contact}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.contact && (
                  <p className="text-red-500 text-xs">{errors.contact}</p>
                )}
              </div>

              <div className="grid gap-2">
                <Label>Status</Label>
                <Select
                  value={form.status}
                  onValueChange={(value) => {
                    handleChange("status", value);
                    setErrors((prev) => ({ ...prev, status: "" }));
                  }}
                >
                  <SelectTrigger
                    className={`w-full ${
                      errors.status ? "border-red-500" : ""
                    }`}
                  >
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    {statuses.map((status) => (
                      <SelectItem key={status} value={status}>
                        {status}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.status && (
                  <p className="text-red-500 text-xs">{errors.status}</p>
                )}
              </div>
            </div>

            <div className="grid gap-2">
              <Button onClick={handleSubmit}>Save Deal</Button>
              <Button variant="destructive" onClick={onClose}>
                Cancel
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
