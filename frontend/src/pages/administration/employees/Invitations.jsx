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
import { Badge } from "@/components/ui/badge";
import { TypographyMuted, TypographyH5 } from "@/components/custom/Typography";
import {
  EllipsisVertical,
  Search,
  X as XIcon,
  List,
  Kanban,
} from "lucide-react";
import { IoPersonSharp } from "react-icons/io5";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
// import EmployeeInvite from "./EmployeeInvite";

const ROLE_TYPES = ["Employee", "Admin", "Manager", "Marketing", "Sales"];

export default function Invitations() {
  const [filters, setFilters] = useState({ searchName: "", roles: [] });

  const employeeList = [
    {
      name: "amolmahor500",
      email: "amolmahor500@gmail.com",
      roles: ROLE_TYPES,
      status: "No Action",
    },
  ];

  const clearFilter = (field) => {
    setFilters((prev) => ({
      ...prev,
      [field]: field === "searchRoles" ? [] : "",
    }));
  };

  const handleChange = (key, val) => setFilters((p) => ({ ...p, [key]: val }));
  const toggleRole = (role) =>
    handleChange(
      "roles",
      filters.roles.includes(role)
        ? filters.roles.filter((r) => r !== role)
        : [...filters.roles, role]
    );
  const clear = (key) => handleChange(key, key === "roles" ? [] : "");

  const filtered = employeeList.filter((emp) => {
    const nameMatch = emp.name
      .toLowerCase()
      .includes(filters.searchName.toLowerCase());
    const roleMatch =
      !filters.roles.length ||
      filters.roles.some((role) => emp.roles.includes(role));
    return nameMatch && roleMatch;
  });

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* Name Search */}
        <div className="relative flex items-center">
          <Search className="absolute left-2 w-4 h-4 text-gray-400" />
          <Input
            className="w-full pl-8 pr-8"
            placeholder="Search Members By Name"
            value={filters.searchName}
            onChange={(e) => handleChange("searchName", e.target.value)}
          />
          {filters.searchName && (
            <span
              className="absolute right-2"
              onClick={() => clearFilter("searchName")}
            >
              <XIcon className="w-4 h-4" />
            </span>
          )}
        </div>

        {/* Role Multi-Select */}
        <div className="relative">
          <Select value="" onValueChange={toggleRole}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Search Members By Role" />
            </SelectTrigger>
            <SelectContent>
              {ROLE_TYPES.map((role) => (
                <SelectItem key={role} value={role}>
                  {role}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div className="flex flex-wrap gap-1 mt-2">
            {filters.roles.map((role) => (
              <Badge
                key={role}
                variant="secondary"
                className="flex items-center gap-1"
              >
                {ROLE_TYPES.find((r) => r.value === role)?.label || role}
                <button
                  type="button"
                  className="ml-1"
                  onClick={() => toggleRole(role)}
                >
                  <XIcon className="w-3 h-3" />
                </button>
              </Badge>
            ))}
          </div>
        </div>

        <div className="flex items-center sm:flex-row gap-4">
          {/* <EmployeeInvite /> */}
          <div className="flex items-center gap-3">
            <Button variant="secondary">
              <Kanban /> Board
            </Button>
            <Button variant="outline">
              <List /> List
            </Button>
          </div>
        </div>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {filtered.map((emp, idx) => (
          <div key={idx} className="border rounded-xl bg-white p-4 space-y-3">
            <>
              <div className="flex items-center justify-between border-b pb-4">
                <div className="flex items-center gap-2">
                  <div className="w-11 h-11 bg-muted rounded-full flex items-center justify-center">
                    <IoPersonSharp className="text-gray-600" />
                  </div>
                  <div>
                    <TypographyH5>{emp?.name}</TypographyH5>
                    <TypographyMuted className="text-xs">
                      {emp?.email}
                    </TypographyMuted>
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button size="icon" variant="ghost">
                      <EllipsisVertical className="text-accent-foreground" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <XIcon /> Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </>
            <Badge variant="secondary">{emp.status}</Badge>
          </div>
        ))}
      </div>
    </div>
  );
}
