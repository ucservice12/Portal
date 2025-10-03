// ProjectDialog.tsx
"use client";

import { useEffect, useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus } from "lucide-react";
import { TypographyH3, TypographyMuted } from "@/components/custom/Typography";
import { CalendarInput } from "@/components/custom/Calendar";
import { IoPersonSharp } from "react-icons/io5";
// import CustomerDialog from "./CustomerDialog";
// import DomainDialog from "./DomainDialog";

const INVOICE_STATUSES = [
  "Planned",
  "Created",
  "In Progress",
  "Review",
  "On Hold",
  "Closed",
  "Delivered",
];

export default function ProjectDialog({ open, setOpen, editData }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    invoiceStatus: "",
    poStatus: "Not Received",
    assignees: "",
    remark: "",
    startDate: new Date(),
    completionDate: new Date(),
    projectLead: "",
    customer: "",
    teamSize: "0",
    status: "",
    domain: "",
  });

  const [isCustomerDialogOpen, setCustomerDialogOpen] = useState(false);
  const [isDomainDialogOpen, setDomainDialogOpen] = useState(false);

  useEffect(() => {
    if (editData) setFormData(editData);
  }, [editData]);

  const handleChange = (key, value) =>
    setFormData((prev) => ({ ...prev, [key]: value }));

  const InputField = ({ label, name, ...props }) => (
    <div className="grid gap-1">
      <Label>{label}</Label>
      <Input
        value={formData[name]}
        onChange={(e) => handleChange(name, e.target.value)}
        {...props}
      />
    </div>
  );

  const SelectField = ({ label, name, options }) => (
    <div className="grid gap-1">
      <Label>{label}</Label>
      <Select
        value={formData[name]}
        onValueChange={(val) => handleChange(name, val)}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select" />
        </SelectTrigger>
        <SelectContent>
          {options.map((opt) => (
            <SelectItem key={opt} value={opt}>
              {opt}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-5xl max-h-[90vh] overflow-y-auto">
          <TypographyH3>
            {editData ? "Edit Project" : "Add Project"}
          </TypographyH3>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-3 space-y-4">
              <InputField
                label="Title"
                name="title"
                placeholder="Project title"
              />
              <div className="grid gap-1">
                <Label>Description</Label>
                <Textarea
                  placeholder="Enter text or type '/' for commands"
                  value={formData.description}
                  onChange={(e) => handleChange("description", e.target.value)}
                />
              </div>
              <SelectField
                label="Invoice Status"
                name="invoiceStatus"
                options={INVOICE_STATUSES}
              />
              <SelectField
                label="PO Status"
                name="poStatus"
                options={["Not Received", "Received"]}
              />
              <SelectField
                label="Assignees"
                name="assignees"
                options={["abhijeet", "amol", "vivek", "sneha"]}
              />
              <div className="grid gap-2">
                <Label>Remark</Label>
                <Textarea
                  value={formData.remark}
                  onChange={(e) => handleChange("remark", e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-4">
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
                label="Start Date"
                value={formData.startDate}
                onChange={(val) => handleChange("startDate", val)}
              />
              <CalendarInput
                label="Completion Date"
                value={formData.completionDate}
                onChange={(val) => handleChange("completionDate", val)}
              />
              <SelectField
                label="Project Lead"
                name="projectLead"
                options={["abhijeet"]}
              />

              <div className="grid gap-1">
                <div className="flex justify-between items-center">
                  <Label>Customer</Label>
                  <Button
                    size="xs"
                    variant="ghost"
                    onClick={() => setCustomerDialogOpen(true)}
                  >
                    <Plus size={10} />
                  </Button>
                </div>
                <SelectField name="customer" options={["company name"]} />
              </div>

              <InputField label="Team Size" name="teamSize" type="number" />
              <SelectField
                label="Status"
                name="status"
                options={["Open", "Closed", "Planned", "Delivered"]}
              />

              <div className="grid gap-1">
                <div className="flex justify-between items-center">
                  <Label>Domain</Label>
                  <Button
                    size="xs"
                    variant="ghost"
                    onClick={() => setDomainDialogOpen(true)}
                  >
                    <Plus size={10} />
                  </Button>
                </div>
                <SelectField name="domain" options={["Tech"]} />
              </div>
              <div className="grid gap-2">
                <Button onClick={() => setOpen(false)} className="w-full">
                  Save
                </Button>
                <Button variant="destructive" className="w-full">
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* <CustomerDialog
        open={isCustomerDialogOpen}
        onClose={() => setCustomerDialogOpen(false)}
      /> */}

      {/* <DomainDialog
        open={isDomainDialogOpen}
        onClose={() => setDomainDialogOpen(false)}
      /> */}
    </>
  );
}
