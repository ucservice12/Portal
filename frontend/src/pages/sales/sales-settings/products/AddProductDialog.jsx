import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { TypographyH3 } from "@/components/custom/Typography";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function AddProductDialog({ open, onClose, onAdd }) {
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: 0,
  });

  const handleChange = (key, value) => {
    setProduct((prev) => ({ ...prev, [key]: value }));
  };

  const handleAdd = () => {
    onAdd(product);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-3xl">
        <DialogHeader>
          <TypographyH3 className="text-start">Add Product</TypographyH3>
          <DialogTitle />
        </DialogHeader>

        <div className="grid md:grid-cols-12 gap-4">
          <div className="space-y-4 md:col-span-8">
            <div className="grid gap-2">
              <Label>Product Name</Label>
              <Input
                value={product.name}
                onChange={(e) => handleChange("name", e.target.value)}
              />
            </div>

            <div className="grid gap-2">
              <Label>Description</Label>
              <Textarea
                value={product.description}
                onChange={(e) => handleChange("description", e.target.value)}
              />
            </div>
          </div>

          <div className="md:col-span-4 space-y-4">
            <div className="grid gap-2">
              <Label>Price</Label>
              <Input
                type="number"
                min={0}
                value={product.price}
                onChange={(e) => handleChange("price", +e.target.value)}
              />
            </div>
            <div className="grid gap-4">
              <Button onClick={handleAdd}>Save</Button>
              <DialogClose asChild>
                <Button variant="destructive">Cancel</Button>
              </DialogClose>
            </div>
          </div>
        </div>
        <DialogFooter />
      </DialogContent>
    </Dialog>
  );
}
