"use client";

import { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { StatusBadge } from "@/components/ui/StatusBadge";
import {
  MoreVertical,
  Send,
  Eye,
  Trash2,
  Search,
  ArrowRight,
  ArrowLeft,
  Plus,
  AlignRight,
  UploadCloud,
  Users,
  ChevronDown,
  CheckCircle,
} from "lucide-react";
import { RiWhatsappLine } from "react-icons/ri";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { IoPersonSharp } from "react-icons/io5";
import { TypographyMuted } from "@/components/custom/Typography";
import { Link } from "react-router-dom";
import { ContactDrawer } from "./ContactDrawer";

// Data
const contactTypes = [
  "Contact Parked",
  "Customer",
  "Lead",
  "Opportunity",
  "Qualified Lead",
  "Repeat Customer",
  "Subscriber",
];

const tags = ["Tag 1", "Tag 2", "Tag 3", "Tag 4", "Tag 5"];

const industries = [
  { id: 1, name: "Information Technology" },
  { id: 2, name: "Healthcare" },
  { id: 3, name: "Education" },
  { id: 4, name: "Finance" },
  { id: 5, name: "Retail" },
  { id: 6, name: "Real Estate" },
  { id: 7, name: "Manufacturing" },
  { id: 8, name: "Transportation" },
  { id: 9, name: "Hospitality" },
  { id: 10, name: "Telecommunications" },
  { id: 11, name: "Automotive" },
  { id: 12, name: "Energy" },
  { id: 13, name: "Legal Services" },
  { id: 14, name: "Marketing & Advertising" },
  { id: 15, name: "Non-Profit" },
];

const allContacts = [
  {
    name: "test Smith",
    company: "Uc services Pvt Ltd",
    website: "jhdh",
    email: "testforai500@gmail.com",
    contact: "9673170912",
    date: "21-06-25 12–17 PM",
    tags: ["Tag 1"],
    type: "Customer",
    industry: "Retail",
  },
  {
    name: "User",
    company: "Uc services Pvt Ltd",
    website: "https://connect.delight360.biz/contacts",
    email: "User@gmail.com",
    contact: "965654545454545",
    date: "17-06-25 10–40 AM",
    tags: ["Tag 2"],
    type: "Lead",
    industry: "Information Technology",
  },
  ...Array.from({ length: 10 }, (_, i) => ({
    name: `User ${i + 1}`,
    company: "Example Pvt Ltd",
    website: "https://example.com",
    email: `user${i + 1}@example.com`,
    contact: `900000000${i}`,
    date: "21-06-25 01:00 PM",
    tags: ["Tag 3"],
    type: contactTypes[i % contactTypes.length],
    industry: industries[i % industries.length].name,
  })),
];

// CSV Export Helper
function exportToCSV(contacts) {
  const headers = [
    "Name",
    "Company",
    "Website",
    "Email",
    "Contact",
    "Date",
    "Tags",
    "Type",
    "Industry",
  ];
  const rows = contacts.map((c) => [
    c.name,
    c.company,
    c.website,
    c.email,
    c.contact,
    c.date,
    c.tags.join(";"),
    c.type,
    c.industry,
  ]);
  const csv = [headers, ...rows]
    .map((row) =>
      row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(",")
    )
    .join("\r\n");
  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "contacts.csv";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// Filtering logic
function getFilteredContacts(
  allContacts,
  search,
  selectedTags,
  selectedTypes,
  selectedIndustries
) {
  return allContacts.filter((c) => {
    // Text search
    const nameMatch = c.name.toLowerCase().includes(search.Name.toLowerCase());
    const companyMatch = c.company
      .toLowerCase()
      .includes(search.Company.toLowerCase());
    const emailMatch = c.email
      .toLowerCase()
      .includes(search.Email.toLowerCase());
    // Tags
    const tagsMatch =
      selectedTags.length === 0 ||
      selectedTags.every((tag) => c.tags.includes(tag));
    // Type
    const typeMatch =
      selectedTypes.length === 0 || selectedTypes.includes(c.type);
    // Industry
    const industryMatch =
      selectedIndustries.length === 0 ||
      selectedIndustries.includes(c.industry);
    return (
      nameMatch &&
      companyMatch &&
      emailMatch &&
      tagsMatch &&
      typeMatch &&
      industryMatch
    );
  });
}

// Pagination logic
function getPaginatedContacts(filteredContacts, page, pageSize) {
  return filteredContacts.slice((page - 1) * pageSize, page * pageSize);
}

function getTotalPages(filteredContacts, pageSize) {
  return Math.max(1, Math.ceil(filteredContacts.length / pageSize));
}

// Selection helpers
function isAllSelected(paginatedContacts, selected) {
  return (
    paginatedContacts.length > 0 &&
    paginatedContacts.every((c) => selected.includes(c.email))
  );
}

function isAnySelected(selected) {
  return selected.length > 0;
}

// Handlers
function handleTagToggle(tag, setSelectedTags) {
  setSelectedTags((prev) =>
    prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
  );
}

function handleTypeToggle(type, setSelectedTypes) {
  setSelectedTypes((prev) =>
    prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
  );
}

function handleIndustryToggle(industry, setSelectedIndustries) {
  setSelectedIndustries((prev) =>
    prev.includes(industry)
      ? prev.filter((t) => t !== industry)
      : [...prev, industry]
  );
}

function handleSelectAll(paginatedContacts, setSelected, setPopoverOpen) {
  setSelected(paginatedContacts.map((c) => c.email));
  setPopoverOpen((o) => ({ ...o, more: false }));
}

function handleDeselectAll(setSelected, setPopoverOpen) {
  setSelected([]);
  setPopoverOpen((o) => ({ ...o, more: false }));
}

function handleCardSelect(email, setSelected) {
  setSelected((prev) =>
    prev.includes(email) ? prev.filter((e) => e !== email) : [...prev, email]
  );
}

function handleExport(allContacts, selected, filteredContacts, setPopoverOpen) {
  const contactsToExport = allContacts.filter((c) =>
    selected.includes(c.email)
  );
  exportToCSV(contactsToExport.length ? contactsToExport : filteredContacts);
  setPopoverOpen((o) => ({ ...o, actions: false }));
}

function handleMultiSelect(setMultiSelect, setPopoverOpen) {
  setMultiSelect((v) => !v);
  setPopoverOpen((o) => ({ ...o, actions: false }));
}

export default function ContactsList() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  // Filters
  const [search, setSearch] = useState({ Name: "", Company: "", Email: "" });
  const [selectedTags, setSelectedTags] = useState([]);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [selectedIndustries, setSelectedIndustries] = useState([]);
  // Selection
  const [multiSelect, setMultiSelect] = useState(false);
  const [selected, setSelected] = useState([]);
  // Pagination
  const [page, setPage] = useState(1);
  const pageSize = 8;

  // Popover state for closing on action
  const [popoverOpen, setPopoverOpen] = useState({
    tags: false,
    types: false,
    industries: false,
    actions: false,
    more: false,
  });

  // Filtering logic
  const filteredContacts = useMemo(
    () =>
      getFilteredContacts(
        allContacts,
        search,
        selectedTags,
        selectedTypes,
        selectedIndustries
      ),
    [search, selectedTags, selectedTypes, selectedIndustries]
  );

  // Pagination
  const paginatedContacts = getPaginatedContacts(
    filteredContacts,
    page,
    pageSize
  );
  const totalPages = getTotalPages(filteredContacts, pageSize);

  // Selection helpers
  const allSelected = isAllSelected(paginatedContacts, selected);
  const anySelected = isAnySelected(selected);

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
        {["Name", "Company", "Email"].map((label, index) => (
          <div key={index} className="relative">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder={`Search by ${label}`}
              className="pl-9 w-full"
              value={search[label]}
              onChange={(e) =>
                setSearch((prev) => ({ ...prev, [label]: e.target.value }))
              }
            />
          </div>
        ))}

        {/* Tags */}
        <Popover
          open={popoverOpen.tags}
          onOpenChange={(open) => setPopoverOpen((o) => ({ ...o, tags: open }))}
        >
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="justify-between w-full h-10 text-muted-foreground flex items-center"
            >
              <span>Tags Select</span>
              <div className="flex items-center gap-1">
                {selectedTags.length > 0 && (
                  <span className="ml-1 bg-primary text-white rounded-full px-2 text-xs">
                    {selectedTags.length}
                  </span>
                )}
                <ChevronDown className="w-4 h-4 ml-1" />
              </div>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-54 h-64 overflow-y-auto scrollbar-hide">
            {tags.map((type, i) => (
              <Label
                key={i}
                className="flex items-center gap-2 py-2 cursor-pointer"
              >
                <Checkbox
                  id={`tag-${i}`}
                  checked={selectedTags.includes(type)}
                  onCheckedChange={() => handleTagToggle(type, setSelectedTags)}
                />
                {type}
              </Label>
            ))}
          </PopoverContent>
        </Popover>

        {/* Contact Type */}
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
              <span>Contact Type</span>
              <div className="flex items-center gap-1">
                {selectedTypes.length > 0 && (
                  <span className="ml-1 bg-primary text-white rounded-full px-2 text-xs">
                    {selectedTypes.length}
                  </span>
                )}
                <ChevronDown className="w-4 h-4 ml-1" />
              </div>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-54 h-64 overflow-y-auto scrollbar-hide">
            {contactTypes.map((type, i) => (
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
                {type}
              </Label>
            ))}
          </PopoverContent>
        </Popover>

        {/* Industries */}
        <Popover
          open={popoverOpen.industries}
          onOpenChange={(open) =>
            setPopoverOpen((o) => ({ ...o, industries: open }))
          }
        >
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="justify-between w-full h-10 text-muted-foreground flex items-center"
            >
              <span>Industries</span>
              <div className="flex items-center gap-1">
                {selectedIndustries.length > 0 && (
                  <span className="ml-1 bg-primary text-white rounded-full px-2 text-xs">
                    {selectedIndustries.length}
                  </span>
                )}
                <ChevronDown className="w-4 h-4 ml-1" />
              </div>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-54 h-64 overflow-y-auto scrollbar-hide">
            {industries.map((type, i) => (
              <Label
                key={i}
                className="flex items-center gap-2 py-2 cursor-pointer"
              >
                <Checkbox
                  id={`industry-${i}`}
                  checked={selectedIndustries.includes(type.name)}
                  onCheckedChange={() =>
                    handleIndustryToggle(type.name, setSelectedIndustries)
                  }
                />
                {type.name}
              </Label>
            ))}
          </PopoverContent>
        </Popover>
      </div>

      {/* Actions */}
      <div className="flex justify-end items-center gap-6">
        <Popover
          open={popoverOpen.actions}
          onOpenChange={(open) =>
            setPopoverOpen((o) => ({ ...o, actions: open }))
          }
        >
          <PopoverTrigger asChild>
            <Button size="icon" variant="secondary">
              <AlignRight />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-64 text-start p-1.5 space-y-2 sm:mr-24 mr-10">
            {/* Deselect All (only show if any selected) */}
            {anySelected ? (
              <Button
                variant="secondary"
                className="w-full justify-start gap-2 text-xs font-normal"
                onClick={() => handleDeselectAll(setSelected, setPopoverOpen)}
              >
                <Trash2 />
                Deselect All
              </Button>
            ) : (
              <Button
                variant="secondary"
                className="w-full justify-start gap-2 text-xs font-normal"
                onClick={() =>
                  handleSelectAll(
                    paginatedContacts,
                    setSelected,
                    setPopoverOpen
                  )
                }
              >
                <CheckCircle />
                Select All
              </Button>
            )}
            <Button
              variant="secondary"
              className="w-full justify-start gap-2 text-xs font-normal"
              onClick={() => setPopoverOpen((o) => ({ ...o, actions: false }))}
            >
              <Send />
              Send Bulk
            </Button>
            <Button
              variant="secondary"
              className="w-full justify-start gap-2 text-xs font-normal"
              onClick={() =>
                handleExport(
                  allContacts,
                  selected,
                  filteredContacts,
                  setPopoverOpen
                )
              }
            >
              <RiWhatsappLine />
              Export Contact Number:{" "}
              {selected.length || filteredContacts.length}
            </Button>
            <Button
              variant="secondary"
              className="w-full justify-start gap-2 text-xs font-normal"
              onClick={() => setPopoverOpen((o) => ({ ...o, actions: false }))}
            >
              <UploadCloud />
              Import Contacts
            </Button>
            <Button
              variant="secondary"
              className="w-full justify-start gap-2 text-xs font-normal"
              onClick={() => handleMultiSelect(setMultiSelect, setPopoverOpen)}
            >
              <Users />
              {multiSelect ? "Disable" : "Enable"} Multi-Select in Board View
            </Button>
          </PopoverContent>
        </Popover>
        <Button size="sm" onClick={() => setDrawerOpen(true)}>
          <Plus /> Add Contact
        </Button>
      </div>

      <ContactDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {paginatedContacts.map((contact, idx) => (
          <Card key={contact.email} className="rounded-lg p-0 border-2">
            <CardContent className="p-0">
              <div className="p-4 border-b pb-2 flex justify-between items-center">
                <div className=" space-y-3">
                  <div className="flex relative items-center cursor-pointer justify-center w-10 h-10 rounded-full bg-muted">
                    <IoPersonSharp className="text-gray-600" />
                    <span className="absolute -bottom-0 right-0 w-3 h-3 bg-green-700 rounded-full border-2 border-white" />
                  </div>
                  <Link
                    to=""
                    className="text-base font-semibold tracking-normal hover:underline hover:text-primary cursor-pointer"
                  >
                    {contact.name}
                  </Link>
                </div>
                <div className="flex items-center gap-2">
                  {(multiSelect || anySelected) && (
                    <Checkbox
                      checked={selected.includes(contact.email)}
                      onCheckedChange={() =>
                        handleCardSelect(contact.email, setSelected)
                      }
                    />
                  )}
                  <Popover
                    open={popoverOpen.more === contact.email}
                    onOpenChange={(open) =>
                      setPopoverOpen((o) => ({
                        ...o,
                        more: open ? contact.email : false,
                      }))
                    }
                  >
                    <PopoverTrigger asChild>
                      <Button size="icon" variant="ghost">
                        <MoreVertical />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-56 text-start p-1.5 space-y-2 sm:mr-48 mr-10">
                      <Button
                        variant="secondary"
                        className="w-full justify-start gap-2 text-xs font-normal"
                        onClick={() =>
                          setPopoverOpen((o) => ({ ...o, more: false }))
                        }
                      >
                        <Send />
                        Send Email
                      </Button>
                      <Button
                        variant="secondary"
                        className="w-full justify-start gap-2 text-xs font-normal"
                        onClick={() =>
                          setPopoverOpen((o) => ({ ...o, more: false }))
                        }
                      >
                        <RiWhatsappLine />
                        Send WhatsApp Message
                      </Button>
                      <Button
                        variant="secondary"
                        className="w-full justify-start gap-2 text-xs font-normal"
                        onClick={() =>
                          setPopoverOpen((o) => ({ ...o, more: false }))
                        }
                      >
                        <Eye />
                        View
                      </Button>
                      <Button
                        variant="secondary"
                        className="w-full justify-start gap-2 text-xs font-normal text-red-600 hover:text-red-700"
                        onClick={() =>
                          setPopoverOpen((o) => ({ ...o, more: false }))
                        }
                      >
                        <Trash2 />
                        Delete
                      </Button>
                      <div className="border-t my-1" />
                      <Button
                        variant="secondary"
                        className="w-full justify-start gap-2 text-xs font-normal"
                        onClick={() =>
                          handleSelectAll(
                            paginatedContacts,
                            setSelected,
                            setPopoverOpen
                          )
                        }
                      >
                        <Checkbox checked={allSelected} readOnly />
                        Select All
                      </Button>
                      <Button
                        variant="secondary"
                        className="w-full justify-start gap-2 text-xs font-normal"
                        onClick={() =>
                          handleDeselectAll(setSelected, setPopoverOpen)
                        }
                      >
                        <Checkbox checked={false} readOnly />
                        Deselect All
                      </Button>
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              <div className="p-4 space-y-3">
                <TypographyMuted className="text-xs">
                  Company Name: {contact.company}
                </TypographyMuted>
                <TypographyMuted className="text-xs">
                  Website:{" "}
                  <Link
                    to={contact.website}
                    className="underline break-all text-primary"
                    target="_blank"
                    rel="noreferrer"
                  >
                    {contact.website}
                  </Link>
                </TypographyMuted>
                <TypographyMuted className="text-xs">
                  Email: {contact.email}
                </TypographyMuted>
                <TypographyMuted className="text-xs">
                  Contact: {contact.contact}
                </TypographyMuted>
                <TypographyMuted className="text-xs">
                  Date: {contact.date}
                </TypographyMuted>
                <TypographyMuted className="text-xs">
                  Tags:{" "}
                  {contact.tags.map((tag, i) => (
                    <StatusBadge
                      key={i}
                      status={tag}
                      className="text-xs p-0 px-1"
                    />
                  ))}
                </TypographyMuted>
                <TypographyMuted className="text-xs">
                  Type:{" "}
                  <StatusBadge
                    status={contact.type}
                    className="text-xs p-0 px-1"
                  />
                </TypographyMuted>
                <TypographyMuted className="text-xs">
                  Industries:{" "}
                  <StatusBadge
                    status={contact.industry}
                    className="text-xs p-0 px-1"
                  />
                </TypographyMuted>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-2 pt-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          disabled={page === 1}
        >
          <ArrowLeft className="w-4 h-4 mr-1" /> Previous
        </Button>
        <Button variant="outline" size="sm" disabled>
          {page}
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
          disabled={page >= totalPages}
        >
          Next <ArrowRight className="w-4 h-4 ml-1" />
        </Button>
      </div>
    </div>
  );
}
