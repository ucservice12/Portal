"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TypographyH3 } from "@/components/custom/Typography";
import { CustomersTable } from "../sales-settings/customers/CustomersTable";
import CustomerDialog, {
  getEmptyCustomer,
} from "../sales-settings/customers/CustomerDialog";

export const initialCustomers = [
  {
    companyName: "ABC Pvt Ltd",
    firstName: "Amol",
    lastName: "Mahor",
    phone1: "9876543210",
    phone2: "1234567890",
    email1: "amol@example.com",
    email2: "contact@abc.com",
    website: "https://abc.com",
    notes: "Important client",
    billingAddress: "123 Main St, Pune",
    shippingAddress: "456 Service Ln, Mumbai",
  },
];

export function CurrentSalesCustomers() {
  const [customers, setCustomers] = useState(initialCustomers);
  const [editingIndex, setEditingIndex] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleEdit = (index) => {
    setEditingIndex(index);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setEditingIndex(null);
  };

  const handleSaveCustomer = (data, index) => {
    if (index !== null) {
      const updated = [...customers];
      updated[index] = data;
      setCustomers(updated);
    } else {
      setCustomers((prev) => [...prev, data]);
    }
    handleCloseDialog(); // close after saving
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <TypographyH3>Customer Details</TypographyH3>
        <Button
          className="gap-2"
          onClick={() => {
            setEditingIndex(null); // creating new customer
            setDialogOpen(true);
          }}
        >
          <Plus />
          Create
        </Button>
      </div>

      <CustomerDialog
        open={dialogOpen}
        onClose={handleCloseDialog}
        initialData={editingIndex !== null ? customers[editingIndex] : null}
        editingIndex={editingIndex}
        onSubmit={handleSaveCustomer}
      />

      <CustomersTable customers={customers} onEdit={handleEdit} />
    </div>
  );
}
