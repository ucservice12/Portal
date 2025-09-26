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
import { Search, X as XIcon } from "lucide-react";

export default function EmployeeFilters({
  filters,
  setFilters,
  ROLE_TYPES,
  STATUS_TYPES,
}) {
  const handleFilterChange = (field, value) =>
    setFilters((prev) => ({ ...prev, [field]: value }));

  const handleRoleSelect = (role) => {
    setFilters((prev) => ({
      ...prev,
      searchRoles: prev.searchRoles.includes(role)
        ? prev.searchRoles.filter((r) => r !== role)
        : [...prev.searchRoles, role],
    }));
  };

  const clearFilter = (field) =>
    setFilters((prev) => ({
      ...prev,
      [field]: field === "searchRoles" ? [] : "",
    }));

  return (
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
  );
}
