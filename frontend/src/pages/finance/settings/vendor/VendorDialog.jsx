import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { TypographyH3 } from "@/components/custom/Typography";
import { useEffect, useState } from "react";

export default function VendorDialog({
  trigger,
  open,
  onOpenChange,
  initialData,
  onSave,
}) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (initialData) {
      setName(initialData.name || "");
      setDescription(initialData.description || "");
    } else {
      setName("");
      setDescription("");
    }
  }, [initialData, open]);

  const handleSave = () => {
    if (onSave) {
      onSave({ ...initialData, name, description });
    }
    onOpenChange(false); // close dialog after save
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
      <DialogContent className="sm:max-w-2xl p-6">
        <DialogHeader>
          <TypographyH3 className="text-start">
            {initialData ? "Edit Vendor" : "Add Vendor"}
          </TypographyH3>
          <DialogTitle />
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          <div className="md:col-span-8 grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="vendor-name">Name</Label>
              <Input
                id="vendor-name"
                placeholder="Vendor name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="vendor-description">Description</Label>
              <Textarea
                id="vendor-description"
                placeholder="Enter vendor description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="min-h-[100px]"
              />
            </div>
          </div>
          <div className="flex flex-col gap-4 justify-end md:col-span-4">
            <Button onClick={handleSave}>Save</Button>
            <DialogClose asChild>
              <Button variant="destructive">Cancel</Button>
            </DialogClose>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
