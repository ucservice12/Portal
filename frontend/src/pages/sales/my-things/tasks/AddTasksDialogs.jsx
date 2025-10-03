import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { CalendarInput } from "@/components/custom/Calendar";
import { IoPersonSharp } from "react-icons/io5";
import {
  TypographyH3,
  TypographyMuted,
  TypographyP,
  TypographyH5,
} from "@/components/custom/Typography";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { Pencil, Send, Trash2 } from "lucide-react";

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

export default function AddTasksDialog({
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
    comments: [],
  });

  const [newComment, setNewComment] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [editText, setEditText] = useState("");
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
        comments: [],
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

  const handleAddComment = () => {
    if (newComment.trim()) {
      setForm((prev) => ({
        ...prev,
        comments: [
          ...prev.comments,
          {
            text: newComment,
            timestamp: new Date().toISOString(),
            user: "me",
          },
        ],
      }));
      setNewComment("");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-5xl">
        <DialogHeader>
          <TypographyH3 className="text-start">
            {initialData ? "Edit Task" : "Add Task"}
          </TypographyH3>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 max-h-[75vh] overflow-y-auto">
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

            {/* Comments Section */}
            <div className="space-y-2 border-t pt-4">
              <TypographyH5>Comments</TypographyH5>

              <div className="max-h-96 overflow-y-auto pr-2 space-y-2">
                {form.comments.length === 0 ? (
                  <TypographyMuted className="italic text-sm">
                    No comments yet
                  </TypographyMuted>
                ) : (
                  form.comments.map((cmt, idx) => (
                    <div
                      key={idx}
                      className={`group flex ${
                        cmt.user === "me" ? "justify-end" : "justify-start"
                      }`}
                    >
                      {editIndex === idx ? (
                        <div className="flex flex-col gap-1 max-w-[70%] w-full">
                          <Textarea
                            rows={2}
                            value={editText}
                            onChange={(e) => setEditText(e.target.value)}
                          />
                          <div className="flex justify-end gap-2">
                            <Button
                              size="sm"
                              onClick={() => {
                                const updated = [...form.comments];
                                updated[idx].text = editText;
                                setForm((prev) => ({
                                  ...prev,
                                  comments: updated,
                                }));
                                setEditIndex(null);
                                setEditText("");
                              }}
                            >
                              Save
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => {
                                setEditIndex(null);
                                setEditText("");
                              }}
                            >
                              Cancel
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <div
                          className={`rounded p-2 sm:px-4 sm:py-2 sm:max-w-[70%] w-[85%] sm:text-sm text-xs shadow relative ${
                            cmt.user === "me"
                              ? "bg-primary text-white"
                              : "bg-gray-200 text-black"
                          }`}
                        >
                          <TypographyP>{cmt.text}</TypographyP>
                          <TypographyMuted className="text-[10px] text-gray-200 text-right mt-1">
                            {new Date(cmt.timestamp).toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </TypographyMuted>

                          {cmt.user === "me" && (
                            <div className="gap-1">
                              <Button
                                size="icon"
                                variant="goast"
                                className="text-xs"
                                onClick={() => {
                                  setEditIndex(idx);
                                  setEditText(cmt.text);
                                }}
                              >
                                <Pencil />
                              </Button>
                              <Button
                                size="sm"
                                variant="goast"
                                className="text-xs"
                                onClick={() => {
                                  const updated = form.comments.filter(
                                    (_, i) => i !== idx
                                  );
                                  setForm((prev) => ({
                                    ...prev,
                                    comments: updated,
                                  }));
                                }}
                              >
                                <Trash2 />
                              </Button>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>

              {/* Add Comment Input */}
              <div className="flex gap-2 mt-2">
                <Textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Type your message..."
                  rows={2}
                />
                <Button
                  size="xs"
                  onClick={handleAddComment}
                  className="self-end"
                >
                  <Send />
                </Button>
              </div>
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
              <Button onClick={handleSubmit}>Save</Button>
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
