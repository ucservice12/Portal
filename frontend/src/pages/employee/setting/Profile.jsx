import { useState, useEffect } from "react";
import { TypographyH4, TypographyMuted } from "@/components/custom/Typography";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { CalendarInput } from "@/components/custom/Calendar";
import { IoPersonSharp } from "react-icons/io5";
import { useAuth } from "@/context/AuthContext";

export default function Profile() {
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    firstName: user?.firstName || "",
    middleName: user?.middleName || "",
    lastName: user?.lastName || "",
    reporting: user?.reporting || user?.email,
    email: user?.email || "",
    personalEmail: user?.personalEmail, // auto-generated office email
    designation: user?.designation,
    employeeStatus: user?.status,
    employeeId: user?.employeeId,
    pan: "",
    dob: "",
    dateOfHire: "",
    workLocation: "",
    currentAddress: "",
    permanentAddress: "",
  });

  // Generate office email based on firstName and lastName
  useEffect(() => {
    if (formData.firstName && formData.lastName) {
      setFormData((prev) => ({
        ...prev,
        personalEmail: `${prev.firstName
          .toLowerCase()
          .replace(/\s/g, ".")}.${prev.lastName
          .toLowerCase()
          .replace(/\s/g, ".")}@company.com`,
      }));
    }
  }, [formData.firstName, formData.lastName]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDateChange = (date) => {
    setFormData((prev) => ({
      ...prev,
      dob: date,
    }));
  };

  const handleSave = () => {
    console.log("Saving Employee Data:", formData);
    // TODO: send formData to backend API
  };

  return (
    <>
      {/* Profile Picture */}
      <div className="flex items-center gap-2 mt-4 mb-6">
        <div className="flex items-center cursor-pointer justify-center w-24 h-24 rounded-full bg-muted">
          <IoPersonSharp className="text-gray-600 w-10 h-10" />
        </div>
        <div className="flex flex-col">
          <TypographyH4>Profile Picture</TypographyH4>
          <div className="border-b border-gray-200 mb-2" />
          <TypographyMuted>Supports PNGs, JPEGs under 3MB</TypographyMuted>
        </div>
      </div>

      {/* Roles */}
      <TypographyH4>Role</TypographyH4>
      <div className="border-b border-gray-200 mb-2" />
      <div className="flex items-center gap-4">
        {user?.roles?.map((role, index) => (
          <Badge key={index} variant="secondary" className="capitalize">
            {role}
          </Badge>
        ))}
      </div>

      {/* Basic Details */}
      <TypographyH4 className="mt-4">Basic details</TypographyH4>
      <div className="border-b border-gray-200 mb-2" />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8 max-w-5xl">
        <div className="grid gap-1.5">
          <Label className="ml-1">First Name</Label>
          <Input
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="First Name"
          />
        </div>
        <div className="grid gap-1.5">
          <Label className="ml-1">Middle Name</Label>
          <Input
            name="middleName"
            value={formData.middleName}
            onChange={handleChange}
            placeholder="Middle Name"
          />
        </div>
        <div className="grid gap-1.5">
          <Label className="ml-1">Last Name</Label>
          <Input
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Last Name"
          />
        </div>
        <div className="grid gap-1.5">
          <Label className="ml-1">Reporting</Label>
          <Input
            name="reporting"
            value={formData.reporting}
            onChange={handleChange}
            disabled
            placeholder="Reporting"
          />
        </div>
        <div className="grid gap-1.5">
          <Label className="ml-1">Office Email</Label>
          <Input
            name="email"
            disabled
            value={formData.email}
            onChange={handleChange}
            placeholder="Personal Email"
          />
        </div>
        <div className="grid gap-1.5">
          <Label className="ml-1">Designation</Label>
          <Input
            name="designation"
            value={formData.designation}
            onChange={handleChange}
            placeholder="Designation"
          />
        </div>
        <div className="grid gap-1.5">
          <Label className="ml-1">Employee Status</Label>
          <Badge variant="success" disabled className="capitalize bg-green-300">
            {formData?.employeeStatus || "Confirm"}
          </Badge>
        </div>
        <div className="grid gap-1.5">
          <Label className="ml-1">Employee ID</Label>
          <Input
            name="employeeId"
            value={formData.employeeId}
            onChange={handleChange}
            placeholder="Employee ID"
          />
        </div>
      </div>

      {/* Personal Details */}
      <TypographyH4 className="mt-4">Personal Details</TypographyH4>
      <div className="border-b border-gray-200 mb-2" />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8 max-w-5xl">
        <div className="grid gap-1.5">
          <Label className="ml-1">Personal Email</Label>
          <Input
            name="personalEmail"
            value={formData.personalEmail}
            placeholder="Office Email"
          />
        </div>
        <div className="grid gap-1.5">
          <Label className="ml-1">PAN</Label>
          <Input
            name="pan"
            value={formData.pan}
            onChange={handleChange}
            placeholder="PAN"
          />
        </div>
        <CalendarInput
          label="Date of Birth"
          value={formData.dob}
          onChange={handleDateChange}
          placeholder="MM/DD/YYYY"
        />
        <div className="grid gap-1.5">
          <Label className="ml-1">Date Of Hire</Label>
          <Input
            name="dateOfHire"
            value={formData.dateOfHire}
            onChange={handleChange}
            placeholder="Date Of Hire"
          />
        </div>
      </div>

      {/* Location */}
      <TypographyH4 className="mt-4">Location</TypographyH4>
      <div className="border-b border-gray-200 mb-2" />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8 max-w-5xl">
        <div className="grid gap-1.5">
          <Label className="ml-1">Work Location</Label>
          <Input
            name="workLocation"
            value={formData.workLocation}
            onChange={handleChange}
            placeholder="Work Location"
          />
        </div>
        <div className="grid gap-1.5">
          <Label className="ml-1">Current Address</Label>
          <Textarea
            name="currentAddress"
            value={formData.currentAddress}
            onChange={handleChange}
            placeholder="Current Address"
          />
        </div>
        <div className="grid gap-1.5">
          <Label className="ml-1">Permanent Address</Label>
          <Textarea
            name="permanentAddress"
            value={formData.permanentAddress}
            onChange={handleChange}
            placeholder="Permanent Address"
          />
        </div>
      </div>

      {/* Save / Discard */}
      <div className="flex items-center gap-4 justify-end mt-4 mb-6">
        <Button size="sm" variant="outline">
          Discard
        </Button>
        <Button size="sm" onClick={handleSave}>
          Save Changes
        </Button>
      </div>
    </>
  );
}
