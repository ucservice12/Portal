"use client";

import { useState } from "react";
import VendorDialog from "./VendorDialog";
import { Button } from "@/components/ui/button";
import { Pencil, Plus, Trash2 } from "lucide-react";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { TypographyH3 } from "@/components/custom/Typography";

export default function Vendors() {
  const [vendors, setVendors] = useState([
    { id: 1, name: "Vendor A", description: "Groceries & Supplies" },
    { id: 2, name: "Vendor B", description: "Office Rentals" },
  ]);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingVendor, setEditingVendor] = useState(null);

  const handleAddVendor = (vendor) => {
    const newVendor = { ...vendor, id: Date.now() };
    setVendors((prev) => [...prev, newVendor]);
  };

  const handleUpdateVendor = (updatedVendor) => {
    setVendors((prev) =>
      prev.map((v) =>
        v.id === updatedVendor.id ? { ...v, ...updatedVendor } : v
      )
    );
  };

  const handleEdit = (vendor) => {
    setEditingVendor(vendor);
    setDialogOpen(true);
  };

  const handleDelete = (id) => {
    setVendors((prev) => prev.filter((v) => v.id !== id));
  };

  const handleSave = (vendor) => {
    if (editingVendor) {
      handleUpdateVendor(vendor);
    } else {
      handleAddVendor(vendor);
    }
    setDialogOpen(false);
    setEditingVendor(null);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <TypographyH3>Vendors</TypographyH3>
        <VendorDialog
          trigger={
            <Button>
              <Plus />
              Create
            </Button>
          }
          open={false}
          onOpenChange={(v) => {
            if (v) {
              setEditingVendor(null);
              setDialogOpen(true);
            }
          }}
          onSave={handleSave}
        />
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Description</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {vendors.map((vendor) => (
            <TableRow key={vendor.id}>
              <TableCell>{vendor.name}</TableCell>
              <TableCell>{vendor.description}</TableCell>
              <TableCell className="space-x-2 text-right">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleEdit(vendor)}
                >
                  <Pencil />
                </Button>
                <Button
                  variant="outline"
                  className="text-red-600"
                  size="icon"
                  onClick={() => handleDelete(vendor.id)}
                >
                  <Trash2 />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Edit Dialog (controlled) */}
      <VendorDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        initialData={editingVendor}
        onSave={handleSave}
      />
    </div>
  );
}
