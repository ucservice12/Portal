"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { CalendarInput } from "@/components/custom/Calendar";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { TypographyMuted, TypographyH5 } from "@/components/custom/Typography";
import { IoPersonSharp } from "react-icons/io5";
import { Plus } from "lucide-react";
// import CustomerDialog from "@/components/custom/dialog/CustomerDialog";

export default function ProjectInfo() {
  const [isCustomerDialogOpen, setCustomerDialogOpen] = useState(false);
  const [form, setForm] = useState({
    title: "",
    description: "",
    startDate: "",
    endDate: "",
    actualEndDate: "",
    customer: "",
    invoiceStatus: "Pending",
    poStatus: "Not Received",
    status: "Open",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSelect = (name, value) => {
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = () => {
    console.log("Project Data:", form);
  };

  return (
    <Card>
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Left section */}
        <div className="md:col-span-8 space-y-4">
          <div className="grid gap-1">
            <Label>Project Title</Label>
            <Input
              placeholder="Project Title"
              name="title"
              value={form.title}
              onChange={handleChange}
            />
          </div>
          <div className="grid gap-1">
            <Label>Project Description</Label>
            <Textarea
              rows={8}
              placeholder="Project Description"
              name="description"
              value={form.description}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Right section */}
        <div className="space-y-4 md:col-span-4">
          <div className="flex items-center gap-3 border p-4 rounded-lg">
            <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
              <IoPersonSharp className="text-gray-600" />
            </div>
            <div className="grid gap-1">
              <TypographyH5>anishasachul1107</TypographyH5>
              <TypographyMuted>anishasachul1107@gmail.com</TypographyMuted>
            </div>
          </div>

          <CalendarInput
            label="Start Date"
            value={form.startDate}
            onChange={(e) => handleSelect("startDate", e.target.value)}
            placeholder="MM-DD-YYYY"
          />

          <CalendarInput
            label="Completion Date"
            value={form.endDate}
            onChange={(e) => handleSelect("endDate", e.target.value)}
            placeholder="MM-DD-YYYY"
          />

          <CalendarInput
            label="Actual Completion Date"
            value={form.actualEndDate}
            onChange={(e) => handleSelect("actualEndDate", e.target.value)}
            placeholder="MM-DD-YYYY"
          />

          <div className="grid gap-1">
            <div className="flex items-center justify-between">
              <Label>Customer Name</Label>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setCustomerDialogOpen(true)}
              >
                <Plus size={16} />
              </Button>
            </div>
            <Select
              value={form.customer}
              onValueChange={(v) => handleSelect("customer", v)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select customer" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Customer 1">Customer 1</SelectItem>
                <SelectItem value="Customer 2">Customer 2</SelectItem>
                <SelectItem value="Customer 3">Customer 3</SelectItem>
                <SelectItem value="Customer 4">Customer 4</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-1">
            <Label>Invoice Status</Label>
            <Select
              value={form.invoiceStatus}
              onValueChange={(v) => handleSelect("invoiceStatus", v)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select invoice status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="Completed">Completed</SelectItem>
                <SelectItem value="Done">Done</SelectItem>
                <SelectItem value="Failed">Failed</SelectItem>
                <SelectItem value="On Hold">On Hold</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-1">
            <Label>PO Status</Label>
            <Select
              value={form.poStatus}
              onValueChange={(v) => handleSelect("poStatus", v)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select PO status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Not Received">Not Received</SelectItem>
                <SelectItem value="Received">Received</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-1">
            <Label>Status</Label>
            <Select
              value={form.status}
              onValueChange={(v) => handleSelect("status", v)}
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
          </div>

          <Button className="w-full" onClick={handleSubmit}>
            Save
          </Button>
        </div>
      </div>
      {/* <CustomerDialog
        open={isCustomerDialogOpen}
        onClose={() => setCustomerDialogOpen(false)}
      /> */}
    </Card>
  );
}
