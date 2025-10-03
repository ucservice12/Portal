import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, ChevronDown, X } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  TypographyH3,
  TypographyH4,
  TypographyH5,
} from "@/components/custom/Typography";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import TagsDialog from "../tags/TagsDialog";
import CompanyDialog from "../companies/CompanyDialog";
import IndustryDialog from "../../sales-settings/industries/IndustryDialog";

const OPTIONS = {
  industries: [
    { value: "tech", label: "Tech" },
    { value: "finance", label: "Finance" },
    { value: "health", label: "Healthcare" },
  ],
  contactTypes: [
    { value: "lead", label: "Lead" },
    { value: "customer", label: "Customer" },
    { value: "partner", label: "Partner" },
  ],
  assignTo: [
    { value: "amol", label: "User" },
    { value: "john", label: "John Doe" },
    { value: "jane", label: "Jane Smith" },
  ],
  companies: [
    { value: "Google", label: "Google" },
    { value: "Microsoft", label: "Microsoft" },
    { value: "Apple", label: "Apple" },
  ],
};

const initialFields = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  company: "",
  companyWebsite: "",
  designation: "",
  assignTo: "",
  country: "",
  industry: "",
  contactType: "",
  tags: [],
};

export function ContactDrawer({ open, onClose }) {
  const [fields, setFields] = useState(initialFields);
  const [showMore, setShowMore] = useState(false);
  const [showAdditional, setShowAdditional] = useState(false);
  const [newTag, setNewTag] = useState("");
  const [openCompanyDialog, setOpenCompanyDialog] = useState(false);
  const [openIndustryDialog, setOpenIndustryDialog] = useState(false);
  const [openTagsDialog, setOpenTagsDialog] = useState(false);

  const handleChange = (key, value) =>
    setFields((prev) => ({ ...prev, [key]: value }));

  // Inline tag entry
  const handleAddTag = () => {
    const tag = newTag.trim();
    if (tag && !fields.tags.includes(tag)) {
      handleChange("tags", [...fields.tags, tag]);
      setNewTag("");
    }
  };

  const handleRemoveTag = (tag) => {
    handleChange(
      "tags",
      fields.tags.filter((t) => t !== tag)
    );
  };

  // Dialog save - add single tag
  const handleTagsDialogSave = (tag) => {
    if (tag && !fields.tags.includes(tag)) {
      handleChange("tags", [...fields.tags, tag]);
    }
    setOpenTagsDialog(false);
  };

  const handleSave = () => {
    // Save logic
    onClose();
  };

  return (
    <div
      className={cn(
        "fixed top-0 right-0 h-screen w-full max-w-[400px] scrollbar-hide bg-white dark:bg-[#0B0D0E] shadow-xl border-l z-50 transform transition-transform duration-300 ease-in-out",
        open ? "translate-x-0" : "translate-x-full"
      )}
    >
      {/* Header */}
      <div className="p-4 flex justify-between items-center border-b">
        <TypographyH3>Add Contact</TypographyH3>
        <Button size="icon" variant="ghost" onClick={onClose}>
          <X className="w-5 h-5" />
        </Button>
      </div>

      {/* Body */}
      <div className="p-4 space-y-4 overflow-y-auto max-h-[calc(100vh-10rem)] scrollbar-hide">
        {/* Contact Info */}
        <div>
          <TypographyH4>Contact Information</TypographyH4>
          <div className="space-y-3 mt-4">
            {["firstName", "lastName", "email", "phone"].map((key) => (
              <div className="grid gap-2" key={key}>
                <Label>{key.replace(/([A-Z])/g, " $1")}</Label>
                <Input
                  type={
                    key === "email" ? "email" : key === "phone" ? "tel" : "text"
                  }
                  placeholder={`Enter ${key}`}
                  value={fields[key]}
                  onChange={(e) => handleChange(key, e.target.value)}
                />
              </div>
            ))}

            {/* Tags */}
            <div className="grid gap-2">
              <div className="flex justify-between items-center">
                <Label>Tags</Label>
                <TagsDialog
                  onSave={handleTagsDialogSave}
                  defaultValue=""
                  trigger={
                    <Button variant="ghost" size="sm">
                      <Plus size={18} />
                    </Button>
                  }
                />
              </div>
              <Input
                placeholder="Add a tag and press Enter"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleAddTag()}
              />
              <div className="flex flex-wrap gap-2 mt-2">
                {fields.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="bg-gray-200 px-2 py-1 rounded text-sm flex items-center gap-1"
                  >
                    {tag}
                    <button
                      type="button"
                      className="text-xs text-red-500"
                      onClick={() => handleRemoveTag(tag)}
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* More Info */}
        <div>
          <div
            className="flex justify-between items-center cursor-pointer"
            onClick={() => setShowMore((p) => !p)}
          >
            <TypographyH5>More</TypographyH5>
            <ChevronDown
              className={cn("transition", showMore && "rotate-180")}
            />
          </div>
          {showMore && (
            <div className="mt-4 space-y-3">
              <div className="grid gap-2">
                <div className="flex justify-between items-center">
                  <Label>Company</Label>
                  {/* Create Company */}
                  <CompanyDialog
                    trigger={
                      <Button variant="ghost" size="sm">
                        <Plus size={18} />
                      </Button>
                    }
                    onSave={(company) => handleChange("company", company.name)}
                    defaultData={null}
                  />
                </div>
                <Select
                  value={fields.company}
                  onValueChange={(v) => handleChange("company", v)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select company" />
                  </SelectTrigger>
                  <SelectContent>
                    {OPTIONS.companies.map((opt) => (
                      <SelectItem key={opt.value} value={opt.value}>
                        {opt.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label>Company Website</Label>
                <Input
                  value={fields.companyWebsite}
                  onChange={(e) =>
                    handleChange("companyWebsite", e.target.value)
                  }
                  placeholder="https://example.com"
                />
              </div>

              <div className="grid gap-2">
                <Label>Designation</Label>
                <Input
                  value={fields.designation}
                  onChange={(e) => handleChange("designation", e.target.value)}
                  placeholder="Enter designation"
                />
              </div>
            </div>
          )}
        </div>

        {/* Additional Info */}
        <div>
          <div
            className="flex justify-between items-center cursor-pointer"
            onClick={() => setShowAdditional((p) => !p)}
          >
            <TypographyH5>Additional Information</TypographyH5>
            <ChevronDown
              className={cn("transition", showAdditional && "rotate-180")}
            />
          </div>
          {showAdditional && (
            <div className="mt-4 space-y-3">
              {[
                {
                  label: "Assign To",
                  key: "assignTo",
                  options: OPTIONS.assignTo,
                },
                {
                  label: "Industry",
                  key: "industry",
                  options: OPTIONS.industries,
                  hasDialog: true,
                },
                {
                  label: "Contact Type",
                  key: "contactType",
                  options: OPTIONS.contactTypes,
                },
              ].map(({ label, key, options, hasDialog }) => (
                <div className="grid gap-2" key={key}>
                  <div className="flex justify-between items-center">
                    <Label>{label}</Label>
                    {hasDialog && (
                      <IndustryDialog
                        trigger={
                          <Button variant="ghost" size="sm">
                            <Plus size={18} />
                          </Button>
                        }
                        onSave={(industry) =>
                          handleChange("industry", industry)
                        }
                        initialValue=""
                      />
                    )}
                  </div>
                  <Select
                    value={fields[key]}
                    onValueChange={(v) => handleChange(key, v)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue
                        placeholder={`Select ${label.toLowerCase()}`}
                      />
                    </SelectTrigger>
                    <SelectContent>
                      {options.map((opt) => (
                        <SelectItem key={opt.value} value={opt.value}>
                          {opt.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              ))}
              <div className="grid gap-2">
                <Label>Country</Label>
                <Input
                  value={fields.country}
                  onChange={(e) => handleChange("country", e.target.value)}
                  placeholder="Enter country"
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="p-4 border-t flex justify-between">
        <Button variant="destructive" onClick={onClose}>
          Cancel
        </Button>
        <Button onClick={handleSave}>Save Contact</Button>
      </div>
    </div>
  );
}
