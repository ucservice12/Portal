"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { TypographyH3 } from "@/components/custom/Typography";
import { useState, useEffect } from "react";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^[0-9]{10,15}$/;
const websiteRegex = /^(https?:\/\/)?([\w-]+\.)+[\w-]{2,}(\/\S*)?$/;

export const getEmptyCustomer = () => ({
  companyName: "",
  firstName: "",
  lastName: "",
  phone1: "",
  phone2: "",
  email1: "",
  email2: "",
  website: "",
  notes: "",
  billingAddress: "",
  shippingAddress: "",
});

export const validateCustomer = (data) => {
  const errors = {};
  if (!data.companyName) errors.companyName = "Company name required";
  if (!data.firstName) errors.firstName = "First name required";
  if (!data.lastName) errors.lastName = "Last name required";
  if (data.email1 && !emailRegex.test(data.email1))
    errors.email1 = "Invalid email";
  if (data.email2 && !emailRegex.test(data.email2))
    errors.email2 = "Invalid email";
  if (data.phone1 && !phoneRegex.test(data.phone1))
    errors.phone1 = "Invalid phone";
  if (data.phone2 && !phoneRegex.test(data.phone2))
    errors.phone2 = "Invalid phone";
  if (data.website && !websiteRegex.test(data.website))
    errors.website = "Invalid website";
  if (!data.billingAddress) errors.billingAddress = "Billing address required";
  return errors;
};

export default function CustomerDialog({
  open,
  onClose,
  onSubmit,
  initialData = null,
  editingIndex = null,
}) {
  const [formData, setFormData] = useState(getEmptyCustomer());
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      setFormData(getEmptyCustomer());
    }
    setErrors({});
  }, [initialData, open]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (
      (name === "phone1" || name === "phone2") &&
      value &&
      !/^\d*$/.test(value)
    )
      return;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    const validationErrors = validateCustomer(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    onSubmit(formData, editingIndex ?? null);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-5xl">
        <DialogHeader>
          <DialogTitle />
          <TypographyH3 className="text-start">
            {editingIndex !== null ? "Edit Customer" : "Add New Customer"}
          </TypographyH3>
        </DialogHeader>

        <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 overflow-y-auto max-h-[70vh]">
          <div className="sm:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-4">
            {["companyName", "firstName", "lastName"].map((field) => (
              <div className="grid gap-2" key={field}>
                <Label htmlFor={field}>
                  {field === "companyName"
                    ? "Company Name"
                    : field === "firstName"
                    ? "First Name"
                    : "Last Name"}
                </Label>
                <Input
                  id={field}
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                />
                {errors[field] && (
                  <span className="text-xs text-red-500">{errors[field]}</span>
                )}
              </div>
            ))}

            <div className="grid gap-2">
              <Label htmlFor="notes">Notes</Label>
              <Textarea
                id="notes"
                name="notes"
                value={formData.notes}
                onChange={handleChange}
              />
            </div>

            <div className="grid gap-2 md:col-span-2">
              <Label htmlFor="billingAddress">Billing Address</Label>
              <Textarea
                id="billingAddress"
                name="billingAddress"
                value={formData.billingAddress}
                onChange={handleChange}
              />
              {errors.billingAddress && (
                <span className="text-xs text-red-500">
                  {errors.billingAddress}
                </span>
              )}
            </div>

            <div className="grid gap-2 md:col-span-2">
              <Label htmlFor="shippingAddress">Shipping Address</Label>
              <Textarea
                id="shippingAddress"
                name="shippingAddress"
                value={formData.shippingAddress}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="sm:col-span-4 sm:border sm:p-4 rounded-md grid gap-4">
            {["phone1", "phone2", "email1", "email2", "website"].map(
              (field) => (
                <div key={field} className="grid gap-2">
                  <Label htmlFor={field}>
                    {field === "phone1"
                      ? "Phone No 1"
                      : field === "phone2"
                      ? "Phone No 2"
                      : field === "email1"
                      ? "Contact Email 1"
                      : field === "email2"
                      ? "Contact Email 2"
                      : "Website"}
                  </Label>
                  <Input
                    id={field}
                    name={field}
                    value={formData[field]}
                    onChange={handleChange}
                  />
                  {errors[field] && (
                    <span className="text-xs text-red-500">
                      {errors[field]}
                    </span>
                  )}
                </div>
              )
            )}

            <div className="grid gap-3">
              <Button className="w-full" onClick={handleSubmit}>
                {editingIndex !== null ? "Update" : "Save"}
              </Button>
              <Button
                className="w-full"
                variant="destructive"
                onClick={onClose}
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
