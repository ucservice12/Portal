"use client";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Pencil, Plus, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { TypographyH3 } from "@/components/custom/Typography";
import AddFooterDialog from "./AddFooterDialog";

export default function Footer() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [footerOptions, setFooterOptions] = useState([]);
  const [editingFooterIndex, setEditingFooterIndex] = useState(null);
  const [selectedFooter, setSelectedFooter] = useState(null);
  const [footerNote, setFooterNote] = useState("");

  const handleAddOrUpdateFooter = (newFooter) => {
    const newFooterObj = {
      name: newFooter.name,
      footerNote: newFooter.footerNote,
      footerType: newFooter.footerType,
    };

    if (editingFooterIndex !== null) {
      // Edit existing footer
      setFooterOptions((prev) =>
        prev.map((footer, idx) =>
          idx === editingFooterIndex ? newFooterObj : footer
        )
      );
    } else {
      // Add new footer
      setFooterOptions((prev) => [...prev, newFooterObj]);
    }

    setSelectedFooter(newFooterObj.name);
    setFooterNote(newFooterObj.footerNote);
    setEditingFooterIndex(null);
    setDialogOpen(false);
  };

  const handleEdit = (index) => {
    setEditingFooterIndex(index);
    setDialogOpen(true);
  };

  const handleDelete = (index) => {
    setFooterOptions((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div>
      <div className="mb-4 flex justify-between items-center">
        <TypographyH3>Footer Details</TypographyH3>
        <Button
          onClick={() => {
            setEditingFooterIndex(null);
            setDialogOpen(true);
          }}
        >
          <Plus />
          Create Footer
        </Button>
      </div>

      <div className="overflow-x-auto">
        <Table>
          <TableCaption />
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Footer</TableHead>
              <TableHead>Footer Type</TableHead>
              <TableHead className="text-center">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {footerOptions.length > 0 ? (
              footerOptions.map((footer, index) => (
                <TableRow key={index}>
                  <TableCell>{footer.name}</TableCell>
                  <TableCell>{footer.footerNote}</TableCell>
                  <TableCell>{footer.footerType}</TableCell>
                  <TableCell className="text-center space-x-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleEdit(index)}
                    >
                      <Pencil />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-red-600"
                      onClick={() => handleDelete(index)}
                    >
                      <Trash />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={4}
                  className="text-center text-muted-foreground py-6"
                >
                  No footers created yet.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <AddFooterDialog
        open={dialogOpen}
        onClose={() => {
          setEditingFooterIndex(null);
          setDialogOpen(false);
        }}
        onSave={handleAddOrUpdateFooter}
        defaultValue={
          editingFooterIndex !== null ? footerOptions[editingFooterIndex] : null
        }
        isEdit={editingFooterIndex !== null}
      />
    </div>
  );
}
