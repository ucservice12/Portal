import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { TypographyH3 } from "@/components/custom/Typography";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const footerTypes = ["Invoice", "Estimation", "Email"];

const AddFooterDialog = ({ open, onClose, onSave }) => {
  const [name, setName] = useState("");
  const [footerNote, setFooterNote] = useState("");
  const [footerType, setFooterType] = useState("");

  useEffect(() => {
    if (!open) {
      setName("");
      setFooterNote("");
      setFooterType("");
    }
  }, [open]);

  const handleSubmit = () => {
    onSave({ name, footerNote, footerType });
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <TypographyH3 className="text-start">Add Footer</TypographyH3>
          <DialogTitle />
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          <div className="space-y-4 md:col-span-8">
            <div className="grid gap-2">
              <Label>Name</Label>
              <Input value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="grid gap-2">
              <Label>Footer</Label>
              <Textarea
                value={footerNote}
                onChange={(e) => setFooterNote(e.target.value)}
                rows={4}
              />
            </div>
          </div>
          <div className="space-y-4 md:col-span-4">
            <div className="grid gap-2">
              <Label>Footer Type</Label>
              <Select value={footerType} onValueChange={setFooterType}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Footer Type" />
                </SelectTrigger>
                <SelectContent>
                  {footerTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2 mt-3">
              <Button onClick={handleSubmit}>Save</Button>
              <Button variant="destructive" onClick={onClose}>
                Cancel
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddFooterDialog;
