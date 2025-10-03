import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { TypographyH3 } from "@/components/custom/Typography";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import AddProductDialog from "../../sales-settings/products/AddProductDialog";
import AddTaxDialog from "../../sales-settings/taxes/AddTaxDialog";

export const EMPTY_ITEM = {
  name: "",
  description: "",
  quantity: 1,
  price: 0,
  taxLabel: "",
  taxRate: 0,
};

export default function InvoiceItemDialog({
  open,
  onClose,
  onSave,
  itemToEdit = null,
}) {
  const [item, setItem] = useState(EMPTY_ITEM);
  const [taxAmount, setTaxAmount] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);

  const [customItems, setCustomItems] = useState([
    { label: "Shop Act", description: "Shop Act Registration", price: 100 },
    { label: "GST Filing", description: "Monthly GST Filing", price: 200 },
    { label: "ITR", description: "Income Tax Return Filing", price: 300 },
  ]);

  const [customTaxes, setCustomTaxes] = useState([
    { label: "Government tax", rate: 3 },
    { label: "Service tax", rate: 5 },
    { label: "Local tax", rate: 10 },
  ]);

  const [showAddProduct, setShowAddProduct] = useState(false);
  const [showAddTax, setShowAddTax] = useState(false);

  useEffect(() => {
    const baseAmount = item.quantity * item.price;
    const calculatedTax = (baseAmount * item.taxRate) / 100;
    setTaxAmount(calculatedTax);
    setTotalAmount(baseAmount + calculatedTax);
  }, [item.quantity, item.price, item.taxRate]);

  useEffect(() => {
    if (open) {
      if (itemToEdit) {
        setItem(itemToEdit);
      } else {
        setItem(EMPTY_ITEM);
      }
    }
  }, [open, itemToEdit]);

  const handleChange = (key, value) => {
    setItem((prev) => ({ ...prev, [key]: value }));
  };

  const handleItemSelect = (val) => {
    const selected = customItems.find((itm) => itm.label === val);
    if (selected) {
      setItem((prev) => ({
        ...prev,
        name: selected.label,
        description: selected.description,
        price: selected.price,
      }));
    }
  };

  const handleTaxSelect = (val) => {
    const [label, rateStr] = val.split("||");
    handleChange("taxLabel", label);
    handleChange("taxRate", +rateStr);
  };

  const handleSave = () => {
    const finalItem = {
      ...item,
      tax: +taxAmount.toFixed(2),
    };
    onSave(finalItem);
    handleClose();
  };

  const handleClose = () => {
    setItem(EMPTY_ITEM);
    onClose();
  };

  const handleAddProduct = (newItem) => {
    setCustomItems((prev) => [...prev, newItem]);
    setItem((prev) => ({
      ...prev,
      name: newItem.label,
      description: newItem.description,
      price: newItem.price,
    }));
    setShowAddProduct(false);
  };

  const handleAddTax = (tax) => {
    setCustomTaxes((prev) => [...prev, tax]);
    setItem((prev) => ({
      ...prev,
      taxLabel: tax.label,
      taxRate: tax.rate,
    }));
    setShowAddTax(false);
  };

  return (
    <>
      <Dialog open={open} onOpenChange={handleClose}>
        <DialogContent className="sm:max-w-5xl">
          <DialogHeader>
            <DialogTitle />
            <TypographyH3 className="text-start">
              {itemToEdit ? "Edit Invoice Item" : "Add Invoice Item"}
            </TypographyH3>
          </DialogHeader>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-6 overflow-y-auto max-h-[70vh]">
            {/* Left */}
            <div className="space-y-3 md:col-span-8">
              <div className="grid gap-2 w-full">
                <div className="flex items-center justify-between">
                  <Label>Select Item</Label>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setShowAddProduct(true)}
                  >
                    <Plus className="text-muted-foreground" />
                  </Button>
                </div>
                <Select value={item.name} onValueChange={handleItemSelect}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select item" />
                  </SelectTrigger>
                  <SelectContent>
                    {customItems.map((itm, idx) => (
                      <SelectItem key={idx} value={itm.label}>
                        {itm.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label>Description</Label>
                <Input
                  value={item.description}
                  onChange={(e) => handleChange("description", e.target.value)}
                />
              </div>

              <div className="grid gap-2">
                <Label>Quantity</Label>
                <Input
                  type="number"
                  min={1}
                  value={item.quantity}
                  onChange={(e) => handleChange("quantity", +e.target.value)}
                />
              </div>

              <div className="grid gap-2 w-full">
                <div className="flex items-center justify-between">
                  <Label>Select Tax</Label>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setShowAddTax(true)}
                  >
                    <Plus className="text-muted-foreground" />
                  </Button>
                </div>
                <Select
                  value={`${item.taxLabel}||${item.taxRate}`}
                  onValueChange={handleTaxSelect}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Tax" />
                  </SelectTrigger>
                  <SelectContent>
                    {customTaxes.map((tax, idx) => (
                      <SelectItem key={idx} value={`${tax.label}||${tax.rate}`}>
                        {tax.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label>Tax Details</Label>
                <Textarea
                  readOnly
                  value={`${item.taxLabel} : ${item.taxRate}%`}
                />
              </div>

              <div className="grid gap-2">
                <Label>Tax Amount</Label>
                <Textarea readOnly value={`₹${taxAmount.toFixed(2)}`} />
              </div>
            </div>

            {/* Right */}
            <div className="md:col-span-4">
              <div className="space-y-4 border p-4 rounded-md">
                <div className="grid gap-2">
                  <Label>Price</Label>
                  <Input
                    type="number"
                    min={0}
                    value={item.price}
                    onChange={(e) => handleChange("price", +e.target.value)}
                  />
                </div>

                <div className="grid gap-2">
                  <Label>Total Amount</Label>
                  <Input disabled value={totalAmount.toFixed(2)} />
                </div>
              </div>

              <div className="grid gap-4 sm:mt-6 mt-4">
                <Button onClick={handleSave}>Save</Button>
                <DialogClose asChild>
                  <Button variant="destructive" onClick={handleClose}>
                    Cancel
                  </Button>
                </DialogClose>
              </div>
            </div>
          </div>

          <DialogFooter />
        </DialogContent>
      </Dialog>

      <AddProductDialog
        open={showAddProduct}
        onClose={() => setShowAddProduct(false)}
        onAdd={handleAddProduct}
      />

      <AddTaxDialog
        open={showAddTax}
        onClose={() => setShowAddTax(false)}
        onAdd={handleAddTax}
      />
    </>
  );
}
