"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  TypographyMuted,
  TypographySmall,
  TypographyH3,
  TypographyH5,
} from "@/components/custom/Typography";
import {
  EllipsisVertical,
  Search,
  Eye,
  User,
  Check,
  X as XIcon,
  Plus,
  List,
  Kanban,
} from "lucide-react";
import { IoPersonSharp } from "react-icons/io5";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import EmployeeInvite from "./EmployeeInvite";
import { Link } from "react-router-dom";

const USER_TYPES = [
  "EMPLOYEE",
  "HR",
  "HRADMIN",
  "MANAGER",
  "MARKETING",
  "SALES",
];

const STATUS_TYPES = [
  { value: "confirmed", label: "Confirmed" },
  { value: "probation", label: "On Probation" },
];

const ROLE_TYPES = [
  { value: "employee", label: "Employee" },
  { value: "admin", label: "Admin" },
  { value: "manager", label: "Manager" },
  { value: "marketing", label: "Marketing" },
  { value: "sales", label: "Sales" },
];

export default function Member() {
  const [filters, setFilters] = useState({
    memberType: "",
    searchName: "",
    searchRoles: [],
    status: "",
  });

  const [approveDialogOpen, setApproveDialogOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [selectedUserTypes, setSelectedUserTypes] = useState([]);
  const [selectedManager, setSelectedManager] = useState("amolmahor500");

  const employeeList = [
    {
      name: "amolmahor500",
      email: "amolmahor500@gmail.com",
      roles: ["Employee", "Admin", "Manager", "Marketing", "Sales"],
      status: "Confirmed",
      avatar: null,
    },
  ];

  const managerList = ["amolmahor500", "manager2", "manager3"];

  // Filter handlers
  const handleFilterChange = (field, value) => {
    setFilters((prev) => ({
      ...prev,
      [field]: value,
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

  const clearFilter = (field) => {
    setFilters((prev) => ({
      ...prev,
      [field]: field === "searchRoles" ? [] : "",
    }));
  };

  // Approve dialog handlers
  const toggleUserType = (type) => {
    setSelectedUserTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  // Filtered employees (for demo, just returns all)
  const filteredEmployees = employeeList.filter((emp) => {
    // Name filter
    if (
      filters.searchName &&
      !emp.name.toLowerCase().includes(filters.searchName.toLowerCase())
    )
      return false;
    // Role filter
    if (
      filters.searchRoles.length > 0 &&
      !filters.searchRoles.some((role) =>
        emp.roles.map((r) => r.toLowerCase()).includes(role)
      )
    )
      return false;
    // Status filter
    if (filters.status && emp.status.toLowerCase() !== filters.status)
      return false;
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {/* Member Type */}
        <div className="relative">
          <Select
            value={filters.memberType}
            onValueChange={(v) => handleFilterChange("memberType", v)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Current Member" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="current">Current Member</SelectItem>
              <SelectItem value="former">Past Member</SelectItem>
            </SelectContent>
          </Select>
          {filters.memberType && (
            <Button
              size="icon"
              variant="goast"
              className="absolute right-6 top-0 text-muted-foreground"
              onClick={() => clearFilter("memberType")}
            >
              <XIcon className="w-4 h-4" />
            </Button>
          )}
        </div>
        {/* Name Search */}
        <div className="relative flex">
          <Search className="absolute left-2 top-2.5 w-4 h-4 text-gray-400" />
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
        {/* Role Multi-Select */}
        <div className="relative">
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
          <div className="flex flex-wrap gap-2">
            {filters.searchRoles.map((role) => (
              <Badge
                key={role}
                variant="secondary"
                className="flex items-center gap-1 mt-3"
              >
                {ROLE_TYPES.find((r) => r.value === role)?.label || role}
                <button
                  type="button"
                  className="ml-1"
                  onClick={() => handleRoleSelect(role)}
                >
                  <XIcon className="w-3 h-3" />
                </button>
              </Badge>
            ))}
          </div>
        </div>
        {/* Status */}
        <div className="relative">
          <Select
            value={filters.status}
            onValueChange={(v) => handleFilterChange("status", v)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Employee Status" />
            </SelectTrigger>
            <SelectContent>
              {STATUS_TYPES.map((status) => (
                <SelectItem key={status.value} value={status.value}>
                  {status.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {filters.status && (
            <Badge variant="secondary" className="flex items-center gap-1 mt-2">
              {STATUS_TYPES.find((s) => s.value === filters.status)?.label}
              <button
                type="button"
                className="ml-1"
                onClick={() => clearFilter("status")}
              >
                <XIcon className="w-3 h-3" />
              </button>
            </Badge>
          )}
        </div>
      </div>

      {/* Stats and Actions */}
      <div className="flex w-full sm:flex-row flex-col sm:justify-between sm:items-center gap-4 mt-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-muted rounded-md px-4 py-2 min-w-[220px]">
            <Label>No Of Confirmed Employees</Label>
            <div className="font-medium">1</div>
          </div>
          <div className="bg-muted rounded-md px-4 py-2 min-w-[220px]">
            <Label>No Of On Probation Employees</Label>
            <div className="font-medium">0</div>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <EmployeeInvite />
          <Button variant="secondary">
            <Kanban />
            Board
          </Button>
          <Button variant="outline">
            <List />
            List
          </Button>
        </div>
      </div>

      {/* Employee Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-6 w-full">
        {filteredEmployees.map((emp, index) => (
          <div
            key={index}
            className="space-y-2 rounded-xl border py-4 bg-white shadow-sm w-full"
          >
            <div className="flex items-center justify-between px-4">
              <div className="flex gap-2">
                <div className="flex items-center cursor-pointer justify-center w-10 h-10 rounded-full bg-muted ">
                  <IoPersonSharp className="text-gray-600" />
                </div>
                <div>
                  <TypographyH5>{emp?.name}</TypographyH5>
                  <TypographyMuted className="text-xs">
                    {emp?.email}
                  </TypographyMuted>
                </div>
              </div>
              {/* Dropdown menu */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <EllipsisVertical className="cursor-pointer" color="gray" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <Link to={`/admin/myteam/selected-member/${emp.name}`}>
                    <DropdownMenuItem className="flex items-center gap-2">
                      <Eye className="w-4 h-4" /> View
                    </DropdownMenuItem>
                  </Link>
                  <DropdownMenuItem
                    className="flex items-center gap-2"
                    onClick={() => {
                      setSelectedEmployee(emp);
                      setSelectedUserTypes(
                        emp.roles.map((r) => r.toUpperCase())
                      );
                      setApproveDialogOpen(true);
                    }}
                  >
                    <Check className="w-4 h-4" /> Approve
                  </DropdownMenuItem>
                  <DropdownMenuItem className="flex items-center gap-2 text-red-500">
                    <XIcon className="w-4 h-4" /> Reject
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Roles */}
            <div className="flex flex-wrap gap-4 items-center text-xs mt-6 px-4 text-gray-600">
              {emp.roles.map((role, i) => (
                <div className="flex items-center gap-1" key={i}>
                  <User className="w-4 h-4" /> {role}
                </div>
              ))}
            </div>

            <div className="border-t pt-3 mt-2 px-4">
              <Badge variant="success" className="w-fit mt-2">
                {emp.status}
              </Badge>
            </div>
          </div>
        ))}
      </div>

      {/* Approve Dialog */}
      <Dialog open={approveDialogOpen} onOpenChange={setApproveDialogOpen}>
        <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle></DialogTitle>
          </DialogHeader>
          <div className="flex flex-col md:flex-row gap-8 w-full">
            {/* Left: Form */}
            <div className="flex-1 space-y-4 sm:space-y-6">
              <TypographyH3>Approve Employee</TypographyH3>

              {/* User Types */}
              <div className="grid gap-2">
                <Label>User Types</Label>
                <Select onValueChange={(val) => toggleUserType(val)}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Employee Status" />
                  </SelectTrigger>
                  <SelectContent>
                    {USER_TYPES.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {/* Selected Badges */}
                {selectedUserTypes.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {selectedUserTypes.map((type) => (
                      <Badge
                        key={type}
                        variant="secondary"
                        className="flex items-center gap-1"
                      >
                        {type}
                        <button
                          type="button"
                          className="ml-1"
                          onClick={() => toggleUserType(type)}
                        >
                          <XIcon className="w-3 h-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                )}
              </div>

              {/* Manager */}
              <div className="grid gap-2">
                <Label>Manager</Label>
                <Select
                  value={selectedManager}
                  onValueChange={setSelectedManager}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Manager" />
                  </SelectTrigger>
                  <SelectContent>
                    {managerList.map((m) => (
                      <SelectItem key={m} value={m}>
                        {m}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Right: Info Card */}
            <Card className="flex-1">
              <div>
                <TypographySmall>Approved By</TypographySmall>
                <div className="flex items-center gap-2 my-3">
                  <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                    <IoPersonSharp className="text-gray-600" />
                  </div>
                  <div>
                    <TypographyMuted className="text-xs">
                      {selectedEmployee?.name}
                    </TypographyMuted>
                    <TypographyMuted className="text-xs">
                      {selectedEmployee?.email}
                    </TypographyMuted>
                  </div>
                </div>

                <TypographySmall>Selected Employee</TypographySmall>
                <div className="flex items-center gap-2 mt-2">
                  <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                    <IoPersonSharp className="text-gray-600" />
                  </div>
                  <div>
                    <TypographyMuted className="text-xs">
                      {selectedEmployee?.name}
                    </TypographyMuted>
                    <TypographyMuted className="text-xs">
                      {selectedEmployee?.email}
                    </TypographyMuted>
                  </div>
                </div>

                <Badge variant="success" className="mt-6">
                  {selectedEmployee?.status}
                </Badge>
              </div>
            </Card>
          </div>

          <DialogFooter>
            <Button className="w-full md:w-auto">Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
