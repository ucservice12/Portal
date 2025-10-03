"use client";

import { useState, useMemo } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/ui/StatusBadge";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import {
  TypographyMuted,
  TypographyH5,
  TypographyH3,
} from "@/components/custom/Typography";
import {
  MoreVertical,
  Plus,
  ChevronLeft,
  ChevronRight,
  Search,
  UserCog,
  Briefcase,
  Banknote,
  Users,
  User,
  Megaphone,
  UserCheck,
  UserSquare,
  ChevronDown,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationLink,
} from "@/components/ui/pagination";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { IoPersonSharp } from "react-icons/io5";

const ROLE_ICONS = {
  admin: UserCog,
  finance: Banknote,
  sales: Briefcase,
  employee: User,
  hradmin: Users,
  marketing: Megaphone,
  teamlead: UserCheck,
  manager: UserSquare,
};

const allMembers = Array.from({ length: 10 }).map((_, i) => ({
  id: i + 1,
  name: `anishasahu110${i}`,
  email: `anishasahu110${i}@gmail.com`,
  role: [
    "employee",
    "admin",
    "sales",
    "finance",
    "hradmin",
    "marketing",
    "teamlead",
    "manager",
  ].slice(0, (i % 8) + 1),
  confirmed: true,
}));

export default function TeamMembersBoard() {
  const [members, setMembers] = useState(allMembers);
  const [assigned, setAssigned] = useState([]);
  const [teamLead, setTeamLead] = useState("");
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [popoverOpen, setPopoverOpen] = useState({ types: false });
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [openAssign, setOpenAssign] = useState(false);
  const [openLead, setOpenLead] = useState(false);
  const perPage = 4;

  const handleTypeToggle = (member, setter) => {
    setter((prev) =>
      prev.includes(member)
        ? prev.filter((t) => t !== member)
        : [...prev, member]
    );
  };

  const filteredMembers = useMemo(() => {
    let list = members;
    if (search.trim()) {
      list = list.filter(
        (m) =>
          m.name.toLowerCase().includes(search.toLowerCase()) ||
          m.role.some((r) => r.toLowerCase().includes(search.toLowerCase()))
      );
    }
    if (selectedTypes.length > 0) {
      list = list.filter((m) => selectedTypes.includes(m));
    }
    return list;
  }, [members, search, selectedTypes]);

  const totalPages = Math.max(1, Math.ceil(filteredMembers.length / perPage));
  const currentMembers = filteredMembers.slice(
    (currentPage - 1) * perPage,
    currentPage * perPage
  );

  const handleDelete = (id) => {
    setMembers((prev) => prev.filter((m) => m.id !== id));
  };

  return (
    <div className="space-y-6">
      {/* Top Section */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="grid grid-cols-1 md:grid-cols-2 w-full sm:w-fit gap-4">
          <div className="relative">
            <Input
              placeholder="Search Members"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          </div>

          <Select>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Member Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="current">Current Member</SelectItem>
              <SelectItem value="past">Past Member</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Assign Dialog */}
        <div className="flex flex-col md:flex-row gap-2">
          <Dialog open={openAssign} onOpenChange={setOpenAssign}>
            <DialogTrigger asChild>
              <Button>
                <Plus /> Assign Team Member
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>
                  <TypographyH3>Assign Members To Project</TypographyH3>
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-3">
                <Popover
                  open={popoverOpen.types}
                  onOpenChange={(open) =>
                    setPopoverOpen((o) => ({ ...o, types: open }))
                  }
                >
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="justify-between w-full h-10 text-muted-foreground flex items-center"
                    >
                      <span>Select Members</span>
                      <div className="flex items-center gap-1">
                        {selectedTypes.length > 0 && (
                          <span className="ml-1 bg-primary text-white rounded-full px-2 text-xs">
                            {selectedTypes.length}
                          </span>
                        )}
                        <ChevronDown />
                      </div>
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="sm:max-w-full overflow-y-auto scrollbar-hide">
                    {members.map((type, i) => (
                      <Label
                        key={i}
                        className="flex items-center gap-2 py-2 cursor-pointer"
                      >
                        <Checkbox
                          id={`type-${i}`}
                          checked={selectedTypes.includes(type)}
                          onCheckedChange={() =>
                            handleTypeToggle(type, setSelectedTypes)
                          }
                        />
                        {type.name}
                      </Label>
                    ))}
                  </PopoverContent>
                </Popover>
                <Button
                  onClick={() => {
                    setAssigned(selectedTypes);
                    setOpenAssign(false);
                  }}
                >
                  Assign
                </Button>
              </div>
            </DialogContent>
          </Dialog>

          {/* Update Lead Dialog */}
          <Dialog open={openLead} onOpenChange={setOpenLead}>
            <DialogTrigger asChild>
              <Button>
                <Plus /> Update Project Team Lead
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-lg">
              <DialogHeader>
                <DialogTitle>
                  <TypographyH3>Update Project Team Lead</TypographyH3>
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-3">
                <Select
                  onValueChange={(v) => setTeamLead(v)}
                  defaultValue={teamLead}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Lead" />
                  </SelectTrigger>
                  <SelectContent>
                    {members.map((m) => (
                      <SelectItem key={m.id} value={m.name}>
                        {m.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button onClick={() => setOpenLead(false)}>Update</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {currentMembers.map((member) => (
          <Card key={member.id} className="relative gap-4 p-4">
            <DropdownMenu>
              <DropdownMenuTrigger className="absolute cursor-pointer top-3 right-3 focus:outline-none">
                <MoreVertical className="w-5 h-5 text-muted-foreground" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem
                  onClick={() => handleDelete(member.id)}
                  className="text-red-500"
                >
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                <IoPersonSharp className="text-gray-600 text-xl" />
              </div>
              <div>
                <TypographyH5 className="font-medium">
                  {member.name}
                </TypographyH5>
                <TypographyMuted>{member.email}</TypographyMuted>
              </div>
            </div>

            <div className="text-sm mt-2 flex gap-3 flex-wrap">
              {member.role.map((r, idx) => {
                const Icon = ROLE_ICONS[r.toLowerCase()];
                return (
                  <span
                    key={idx}
                    className="flex items-center gap-1 text-muted-foreground text-xs"
                  >
                    {Icon && <Icon className="w-4 h-4" />}{" "}
                    {r.charAt(0).toUpperCase() + r.slice(1)}
                  </span>
                );
              })}
            </div>

            <div className="mt-4 pt-2 border-t">
              <StatusBadge status="Confirmed" />
            </div>
          </Card>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-center gap-4 mt-4">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                asChild
                onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
              >
                <Button
                  variant="outline"
                  size="sm"
                  disabled={currentPage === 1}
                >
                  <ChevronLeft /> Previous
                </Button>
              </PaginationPrevious>
            </PaginationItem>
            {Array.from({ length: totalPages }).map((_, idx) => (
              <PaginationItem key={idx}>
                <PaginationLink
                  isActive={currentPage === idx + 1}
                  onClick={() => setCurrentPage(idx + 1)}
                >
                  {idx + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext
                asChild
                onClick={() =>
                  setCurrentPage((prev) => Math.min(totalPages, prev + 1))
                }
              >
                <Button
                  variant="outline"
                  size="sm"
                  disabled={currentPage === totalPages}
                >
                  Next <ChevronRight />
                </Button>
              </PaginationNext>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}
