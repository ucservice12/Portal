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
import { useState } from "react";

export default function NotesDialog({ open, onClose, onSave }) {
  const [name, setName] = useState("");
  const [note, setNote] = useState("");

  const handleSave = () => {
    if (name && note) {
      onSave({ name, note });
      setName("");
      setNote("");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl ">
        <DialogHeader>
          <TypographyH3 className="text-start">
            Add Notes And Terms
          </TypographyH3>
          <DialogTitle />
        </DialogHeader>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          <div className="md:col-span-8 grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="note-name">Name</Label>
              <Input
                id="note-name"
                placeholder="e.g. Payment terms"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="note-text">Notes And Terms</Label>
              <Textarea
                id="note-text"
                rows={4}
                placeholder="Enter notes and terms..."
                value={note}
                onChange={(e) => setNote(e.target.value)}
              />
            </div>
          </div>
          <div className="md:col-span-4 flex flex-col gap-2 justify-end">
            <Button onClick={handleSave}>Save</Button>
            <Button variant="destructive" onClick={() => onClose(false)}>
              Cancel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
