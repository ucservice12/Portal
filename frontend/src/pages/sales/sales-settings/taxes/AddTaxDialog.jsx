import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { TypographyH3 } from "@/components/custom/Typography";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function AddTaxDialog({ open, onClose, onAdd }) {
  const [tax, setTax] = useState({ title: "", percentage: 0 });

  const handleChange = (key, value) => {
    setTax((prev) => ({ ...prev, [key]: value }));
  };

  const handleAdd = () => {
    onAdd(tax);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle />
          <TypographyH3 className="text-start">Add Tax</TypographyH3>
        </DialogHeader>

        <div className="grid md:grid-cols-12 gap-4">
          <div className="space-y-4 md:col-span-8">
            <div className="grid gap-2">
              <Label>Tax Title</Label>
              <Input
                value={tax.title}
                onChange={(e) => handleChange("title", e.target.value)}
              />
            </div>

            <div className="grid gap-2">
              <Label>Percentage</Label>
              <Input
                type="number"
                min={0}
                value={tax.percentage}
                onChange={(e) => handleChange("percentage", +e.target.value)}
              />
            </div>
          </div>
          <div className="flex flex-col justify-end md:col-span-4 space-y-4">
            <Button onClick={handleAdd}>Save Tax</Button>
            <DialogClose asChild>
              <Button variant="destructive">Cancel</Button>
            </DialogClose>
          </div>
        </div>
        <DialogFooter />
      </DialogContent>
    </Dialog>
  );
}
