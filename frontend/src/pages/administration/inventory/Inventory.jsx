"use client";

import { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { CalendarInput } from "@/components/custom/Calendar";
import { useDropzone } from "react-dropzone";
import { cn } from "@/lib/utils";
import { Kanban, List, Plus, Search, Upload, X as XIcon } from "lucide-react";
import { IoPersonSharp } from "react-icons/io5";
import {
  TypographyMuted,
  TypographyH1,
  TypographyH3,
  TypographySmall,
  TypographyH4,
} from "@/components/custom/Typography";

const currentUser = {
  name: "amolmahor500",
  email: "amolmahor500@gmail.com",
  avatar: "",
};

const ROLE_TYPES = [
  { value: "admin", label: "Admin" },
  { value: "manager", label: "Manager" },
  { value: "employee", label: "Employee" },
];

const ASSIGN_MEMBERS = [
  { name: "Mohan", email: "m@example.com" },
  { name: "Govind", email: "m@google.com" },
  { name: "Ravi", email: "m@support.com" },
];

export default function Inventory() {
  const [open, setOpen] = useState(false);
  const [inventoryList, setInventoryList] = useState([]);
  const [filters, setFilters] = useState({ searchName: "", searchRoles: [] });

  const [form, setForm] = useState({
    title: "",
    description: "",
    date: new Date(),
    serialNo: "",
    file: null,
    assignedTo: "",
  });

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      "application/pdf": [".pdf"],
      "image/*": [".jpg", ".png", ".jpeg"],
    },
    onDrop: (acceptedFiles) => {
      setForm((prev) => ({ ...prev, file: acceptedFiles[0] }));
    },
  });

  const handleSubmit = () => {
    const newEntry = {
      ...form,
      id: Date.now(),
      date: form.date.toISOString().split("T")[0],
      assignedBy: currentUser,
    };
    setInventoryList((prev) => [...prev, newEntry]);
    setForm({
      title: "",
      description: "",
      date: new Date(),
      serialNo: "",
      file: null,
      assignedTo: "",
    });
    setOpen(false);
  };

  const handleFilterChange = (field, value) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
  };

  const clearFilter = (field) => {
    setFilters((prev) => ({
      ...prev,
      [field]: field === "searchRoles" ? [] : "",
    }));
  };

  const handleRoleSelect = (role) => {
    setFilters((prev) => ({
      ...prev,
      searchRoles: prev.searchRoles.includes(role)
        ? prev.searchRoles.filter((r) => r !== role)
        : [...prev.searchRoles, role],
    }));
  };

  return (
    <div className="space-y-6">
      <TypographyH1>Inventory</TypographyH1>

      {/* Filters */}
      <div className="flex justify-between items-center gap-4">
        <div className="relative flex items-center w-full">
          <Search className="absolute left-2 w-4 h-4 text-gray-400" />
          <Input
            className="w-full pl-8 pr-8"
            placeholder="Search Members By Name"
            value={filters.searchName}
            onChange={(e) => handleFilterChange("searchName", e.target.value)}
          />
          {filters.searchName && (
            <Button
              size="icon"
              variant="ghost"
              className="absolute right-2"
              onClick={() => clearFilter("searchName")}
            >
              <XIcon className="w-4 h-4" />
            </Button>
          )}
        </div>

        <div className="w-full">
          <Select onValueChange={handleRoleSelect}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Search Members By Role" />
            </SelectTrigger>
            <SelectContent>
              {ROLE_TYPES.map((role) => (
                <SelectItem key={role.value} value={role.value}>
                  {role.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <div className="flex flex-wrap gap-1 mt-2">
            {filters.searchRoles.map((role) => (
              <Badge
                key={role}
                variant="secondary"
                className="flex items-center gap-1"
              >
                {ROLE_TYPES.find((r) => r.value === role)?.label || role}
                <button type="button" onClick={() => handleRoleSelect(role)}>
                  <XIcon className="w-3 h-3" />
                </button>
              </Badge>
            ))}
          </div>
        </div>
      </div>

      {/* Top Buttons */}
      <div className="flex justify-between items-center">
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus /> Create
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-5xl overflow-y-auto max-h-[90%]">
            <DialogHeader>
              <TypographyH3 className="text-start">Add Inventory</TypographyH3>
              <DialogTitle></DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="col-span-2 space-y-4">
                <div className="grid gap-2">
                  <Label>Inventory Name</Label>
                  <Input
                    placeholder="Title"
                    value={form.title}
                    onChange={(e) =>
                      setForm({ ...form, title: e.target.value })
                    }
                  />
                </div>
                <div className="grid gap-2">
                  <Label>Description</Label>
                  <Textarea
                    rows={6}
                    placeholder="Enter description"
                    value={form.description}
                    onChange={(e) =>
                      setForm({ ...form, description: e.target.value })
                    }
                  />
                </div>
                <div className="border-dashed border-2 flex justify-center flex-col gap-2 items-center p-4 rounded-md text-center cursor-pointer">
                  <TypographyMuted>Upload file</TypographyMuted>
                  <Upload color="gray" />
                  <div
                    {...getRootProps()}
                    className={cn("", isDragActive && "bg-accent")}
                  >
                    <input {...getInputProps()} />
                    {form.file ? (
                      <p>{form.file.name}</p>
                    ) : (
                      <TypographyMuted>
                        Click or drag file to upload
                      </TypographyMuted>
                    )}
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <Card className="grid gap-0 p-3">
                  <Label>Assigned By</Label>
                  <div className="flex items-center gap-2 mt-2">
                    <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">
                      <IoPersonSharp className="text-gray-600" />
                    </div>
                    <div>
                      <TypographySmall>{currentUser?.name}</TypographySmall>
                      <TypographyMuted>{currentUser.email}</TypographyMuted>
                    </div>
                  </div>
                </Card>
                <div className="grid gap-2">
                  <Label>Assigned To</Label>
                  <Select
                    value={form.assignedTo}
                    onValueChange={(val) =>
                      setForm({ ...form, assignedTo: val })
                    }
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a Assign Member" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {ASSIGN_MEMBERS.map((m) => (
                          <SelectItem key={m.email} value={m.email}>
                            {m.name} ({m.email})
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                <CalendarInput
                  label="Date"
                  value={form.date}
                  onChange={(d) => setForm({ ...form, date: d })}
                />
                <div className="grid gap-2">
                  <Label>Serial No</Label>
                  <Input
                    placeholder="Enter Serial No"
                    value={form.serialNo}
                    onChange={(e) =>
                      setForm({ ...form, serialNo: e.target.value })
                    }
                  />
                </div>
                <div className="grid grid-cols-1 gap-3">
                  <Button onClick={handleSubmit}>Save</Button>
                  <Button variant="destructive" onClick={() => setOpen(false)}>
                    Cancel
                  </Button>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        <div className="flex gap-2">
          <Button variant="secondary">
            <Kanban /> Board
          </Button>
          <Button variant="outline">
            <List /> List
          </Button>
        </div>
      </div>

      {/* Inventory Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {inventoryList.map((item) => (
          <Card key={item.id} className="grid gap-2 py-6 px-4">
            <div className="text-xs text-muted-foreground ml-auto">
              Date: {item.date}
            </div>
            <h3 className="text-lg font-semibold">{item.title}</h3>
            <p className="text-sm">{item.description}</p>
            <TypographySmall>Serial No: {item.serialNo}</TypographySmall>
            {item.file && (
              <TypographyMuted className="text-xs">
                File: {item.file.name}
              </TypographyMuted>
            )}
            <div className="flex items-center gap-2 text-sm pt-2">
              <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">
                <IoPersonSharp className="text-gray-600" />
              </div>
              <div>
                <TypographySmall>{item.assignedBy.name}</TypographySmall>
                <TypographyMuted>{item.assignedBy.email}</TypographyMuted>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
