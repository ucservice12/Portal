"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CalendarInput } from "@/components/custom/Calendar";
import { Button } from "@/components/ui/button";
import { TypographyH4, TypographyH3 } from "@/components/custom/Typography";
import { Plus, Trash, Pencil } from "lucide-react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useDropzone } from "react-dropzone";

let nextId = 1;

export default function Reimbursements() {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({
    title: "",
    description: "",
    amount: "",
    date: "",
    dueDate: "",
    file: null,
  });
  const [errors, setErrors] = useState({});

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      "application/pdf": [".pdf"],
      "image/*": [".jpg", ".png", ".jpeg"],
    },
    onDrop: (acceptedFiles) => {
      setForm((prev) => ({ ...prev, file: acceptedFiles[0] }));
    },
  });

  const validateForm = () => {
    const newErrors = {};
    if (!form.title.trim()) newErrors.title = "Title is required";
    if (!form.description.trim())
      newErrors.description = "Description is required";
    if (!form.amount || isNaN(form.amount) || Number(form.amount) <= 0)
      newErrors.amount = "Valid amount is required";
    if (!form.date) newErrors.date = "Date is required";
    if (!form.dueDate) newErrors.dueDate = "Due Date is required";
    if (!form.file) newErrors.file = "Receipt file is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;

    if (editingId) {
      setData((prev) =>
        prev.map((entry) =>
          entry.id === editingId
            ? {
                ...entry,
                ...form,
                date: format(new Date(form.date), "yyyy-MM-dd"),
                dueDate: format(new Date(form.dueDate), "yyyy-MM-dd"),
              }
            : entry
        )
      );
    } else {
      setData((prev) => [
        ...prev,
        {
          id: nextId++,
          ...form,
          date: format(new Date(form.date), "yyyy-MM-dd"),
          dueDate: format(new Date(form.dueDate), "yyyy-MM-dd"),
        },
      ]);
    }

    setForm({
      title: "",
      description: "",
      amount: "",
      date: "",
      dueDate: "",
      file: null,
    });
    setErrors({});
    setEditingId(null);
    setOpen(false);
  };

  const handleDelete = (id) => {
    setData((prev) => prev.filter((entry) => entry.id !== id));
  };

  const handleEdit = (entry) => {
    setForm({ ...entry, file: entry.file });
    setEditingId(entry.id);
    setOpen(true);
  };

  return (
    <>
      <div className="flex justify-between items-center">
        <TypographyH4>Reimbursements</TypographyH4>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus /> Create
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <TypographyH3 className="text-start">
                {editingId ? "Edit Reimbursement" : "Add Reimbursement"}
              </TypographyH3>
              <DialogTitle></DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4">
              <div className="grid gap-2 order-1">
                <Label>Title</Label>
                <Input
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  placeholder="Enter reimbursement title"
                />
                {errors.title && (
                  <p className="text-red-500 text-xs">{errors.title}</p>
                )}
              </div>

              <CalendarInput
                label="Date"
                value={form.date}
                onChange={(d) => setForm({ ...form, date: d })}
                className="order-4"
              />
              {errors.date && (
                <p className="text-red-500 text-xs">{errors.date}</p>
              )}

              <div className="grid gap-2 order-3 sm:order-2">
                <Label>Amount</Label>
                <Input
                  type="number"
                  value={form.amount}
                  onChange={(e) => setForm({ ...form, amount: e.target.value })}
                  placeholder="Enter amount"
                />
                {errors.amount && (
                  <p className="text-red-500 text-xs">{errors.amount}</p>
                )}
              </div>

              <CalendarInput
                label="Due Date"
                value={form.dueDate}
                onChange={(d) => setForm({ ...form, dueDate: d })}
                className="order-5"
              />
              {errors.dueDate && (
                <p className="text-red-500 text-xs">{errors.dueDate}</p>
              )}

              <div className="grid gap-2 sm:col-span-2 order-2 sm:order-5">
                <Label>Description</Label>
                <Textarea
                  value={form.description}
                  onChange={(e) =>
                    setForm({ ...form, description: e.target.value })
                  }
                  placeholder="Enter detailed description"
                />
                {errors.description && (
                  <p className="text-red-500 text-xs">{errors.description}</p>
                )}
              </div>

              <div className="grid gap-2 sm:col-span-2 order-6">
                <Label>Receipt Upload</Label>
                <div
                  {...getRootProps()}
                  className={cn(
                    "border-dashed border-2 p-4 rounded-md cursor-pointer text-center",
                    isDragActive ? "bg-muted" : ""
                  )}
                >
                  ...
                  <input {...getInputProps()} />
                  {form.file ? (
                    <p>{form.file.name}</p>
                  ) : (
                    <p>Drag & drop or click to upload file</p>
                  )}
                </div>
                {errors.file && (
                  <p className="text-red-500 text-xs">{errors.file}</p>
                )}
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleSubmit}>
                {editingId ? "Update" : "Submit"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Table>
        <TableHeader className="bg-[#FBFCFE]">
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Due Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Receipt</TableHead>
            <TableHead>Actions</TableHead>
            <TableHead>Payments</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((entry) => (
            <TableRow key={entry.id}>
              <TableCell>{entry.title}</TableCell>
              <TableCell>{entry.amount}</TableCell>
              <TableCell>{entry.date}</TableCell>
              <TableCell>{entry.dueDate}</TableCell>
              <TableCell>Pending</TableCell>
              <TableCell>
                {entry.file ? (
                  <a
                    href={URL.createObjectURL(entry.file)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline"
                  >
                    View
                  </a>
                ) : (
                  "No File"
                )}
              </TableCell>
              <TableCell className="flex gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleEdit(entry)}
                >
                  <Pencil className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleDelete(entry.id)}
                >
                  <Trash className="w-4 h-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
