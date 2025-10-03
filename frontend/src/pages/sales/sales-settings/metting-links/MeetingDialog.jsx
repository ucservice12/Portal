// components/custom/dialog/MeetingDialog.jsx
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { TypographyH3 } from "@/components/custom/Typography";
import { useEffect, useState } from "react";

export default function MeetingDialog({
  open,
  onClose,
  onSave,
  initialData = { name: "", email: "", link: "" },
}) {
  const [form, setForm] = useState(initialData);

  useEffect(() => {
    if (open) {
      setForm(initialData);
    }
  }, [open, initialData]);

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    onSave(form);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            <TypographyH3>Edit Meeting</TypographyH3>
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          <div className="md:col-span-8 grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={form.name}
                disabled
                onChange={(e) => handleChange("name", e.target.value)}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={form.email}
                onChange={(e) => handleChange("email", e.target.value)}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="link">Meeting Link</Label>
              <Input
                id="link"
                type="url"
                value={form.link}
                onChange={(e) => handleChange("link", e.target.value)}
              />
            </div>
          </div>
          <div className="md:col-span-4 flex flex-col gap-2 justify-end">
            <Button onClick={handleSubmit}>Save</Button>
            <Button variant="destructive" onClick={onClose}>
              Cancel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
