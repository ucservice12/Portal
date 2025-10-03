import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Pencil, Plus, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TypographyH3 } from "@/components/custom/Typography";
import NotesDialog from "./NotesDialog";
import { useState } from "react";

export default function NotesAndTerms() {
  const [openDialog, setOpenDialog] = useState(false);
  const [notes, setNotes] = useState([]);

  const handleSaveNote = (newNote) => {
    setNotes((prev) => [...prev, newNote]);
    setOpenDialog(false);
  };

  const handleDelete = (indexToDelete) => {
    setNotes((prev) => prev.filter((_, i) => i !== indexToDelete));
  };

  return (
    <div>
      {/* Create Button */}
      <div className="flex justify-between items-center mb-4">
        <TypographyH3>Notes and Terms</TypographyH3>
        <Button onClick={() => setOpenDialog(true)}>
          <Plus />
          Create
        </Button>
      </div>

      {/* Notes Table */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Notes And Terms</TableHead>
            <TableHead className="text-center">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {notes.map((note, index) => (
            <TableRow key={index}>
              <TableCell>{note.name}</TableCell>
              <TableCell>{note.note}</TableCell>
              <TableCell className="text-center space-x-2">
                <Button variant="ghost" size="icon">
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
          ))}
        </TableBody>
      </Table>

      {/* Dialog for Creating Notes */}
      <NotesDialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        onSave={handleSaveNote}
      />
    </div>
  );
}
