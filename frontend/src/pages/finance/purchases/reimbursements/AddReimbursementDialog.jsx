"use client";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Upload } from "lucide-react";
import { useState } from "react";
import { CalendarInput } from "@/components/custom/Calendar";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { TypographyH3 } from "@/components/custom/Typography";

export default function AddReimbursementDialog({ trigger }) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    amount: "",
    employee: "",
    date: new Date(),
    dueDate: new Date(),
    receipt: null,
  });

  const [errors, setErrors] = useState({});

  const update = (field) => (e) =>
    setForm((prev) => ({ ...prev, [field]: e.target?.value ?? e }));

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) setForm((prev) => ({ ...prev, receipt: file }));
  };

  const validate = () => {
    const err = {};
    if (!form.title.trim()) err.title = "Title is required";
    if (!form.amount || parseFloat(form.amount) <= 0)
      err.amount = "Amount must be greater than 0";
    if (!form.employee) err.employee = "Employee is required";
    if (!form.date) err.date = "Date is required";
    if (!form.dueDate) err.dueDate = "Due Date is required";
    return err;
  };

  const handleSave = () => {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    console.log("Reimbursement Data:", {
      ...form,
      date: form.date.toLocaleDateString("en-IN"),
      dueDate: form.dueDate.toLocaleDateString("en-IN"),
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-5xl">
        <DialogHeader>
          <TypographyH3 className="text-start">Add Reimbursement</TypographyH3>
          <DialogTitle />
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 overflow-y-auto max-h-[75vh]">
          {/* Left Section */}
          <div className="md:col-span-8 space-y-4">
            <div className="grid gap-2">
              <Label>Title</Label>
              <Input
                placeholder="Title"
                value={form.title}
                onChange={update("title")}
              />
              {errors.title && (
                <p className="text-sm text-red-500">{errors.title}</p>
              )}
            </div>

            <div className="grid gap-2">
              <Label>Description</Label>
              <Textarea
                placeholder="Description"
                value={form.description}
                onChange={update("description")}
              />
            </div>

            <div className="grid gap-2">
              <Label>Amount</Label>
              <Input
                type="number"
                placeholder="0"
                value={form.amount}
                onChange={update("amount")}
              />
              {errors.amount && (
                <p className="text-sm text-red-500">{errors.amount}</p>
              )}
            </div>

            <div className="grid gap-2">
              <Label>Receipt</Label>
              <div className="border rounded-md p-4 bg-muted">
                <p className="text-sm font-medium mb-2">Upload file</p>
                <label className="flex items-center justify-center border border-dashed p-6 rounded-md cursor-pointer">
                  <Upload className="w-5 h-5" />
                  <input
                    type="file"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                </label>
                {form.receipt && (
                  <p className="text-sm text-muted-foreground mt-2">
                    {form.receipt.name}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Right Section */}
          <div className="md:col-span-4 flex justify-between flex-col gap-3">
            <div className="space-y-3">
              <div className="grid gap-2">
                <Label>Employee</Label>
                <Select
                  value={form.employee}
                  onValueChange={(val) =>
                    setForm((prev) => ({ ...prev, employee: val }))
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select employee" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Alice">Alice</SelectItem>
                    <SelectItem value="Bob">Bob</SelectItem>
                    <SelectItem value="Charlie">Charlie</SelectItem>
                  </SelectContent>
                </Select>
                {errors.employee && (
                  <p className="text-sm text-red-500">{errors.employee}</p>
                )}
              </div>

              <div>
                <CalendarInput
                  label="Date"
                  value={form.date}
                  onChange={(date) => setForm((p) => ({ ...p, date }))}
                  placeholder="DD-MM-YYYY"
                />
                {errors.date && (
                  <p className="text-sm text-red-500">{errors.date}</p>
                )}
              </div>

              <div>
                <CalendarInput
                  label="Due date"
                  value={form.dueDate}
                  onChange={(date) => setForm((p) => ({ ...p, dueDate: date }))}
                  placeholder="DD-MM-YYYY"
                />
                {errors.dueDate && (
                  <p className="text-sm text-red-500">{errors.dueDate}</p>
                )}
              </div>
            </div>

            <div className="grid gap-3">
              <Button onClick={handleSave}>Save</Button>
              <DialogClose asChild>
                <Button variant="destructive">Cancel</Button>
              </DialogClose>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
