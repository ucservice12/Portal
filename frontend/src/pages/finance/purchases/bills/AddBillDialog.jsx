"use client";

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
import { Plus, Upload } from "lucide-react";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";
import { TypographyH3 } from "@/components/custom/Typography";
import { CalendarInput } from "@/components/custom/Calendar";
import VendorDialog from "../../settings/vendor/VendorDialog";

export default function AddBillDialog({
  trigger,
  onAddBill,
  defaultData = null,
}) {
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [vendor, setVendor] = useState("");
  const [status, setStatus] = useState("Unpaid");
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    if (defaultData) {
      setAmount(defaultData.amount || "");
      setDescription(defaultData.description || "");
      setVendor(defaultData.vendor || "");
      setStatus(defaultData.status || "Unpaid");
      setDate(defaultData.date ? new Date(defaultData.date) : new Date());
    } else {
      // Clear when creating new
      setAmount("");
      setDescription("");
      setVendor("");
      setStatus("Unpaid");
      setDate(new Date());
    }
  }, [defaultData]);

  const handleSave = () => {
    if (!amount || !vendor || !status) {
      alert("Please fill all required fields");
      return;
    }

    const newBill = {
      amount,
      description,
      vendor,
      status,
      date: date.toLocaleDateString("en-IN"),
    };

    onAddBill(newBill);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>

      <DialogContent className="sm:max-w-5xl">
        <DialogHeader>
          <TypographyH3 className="text-start">
            {defaultData ? "Edit Bill" : "Add Bill"}
          </TypographyH3>
          <DialogTitle />
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 overflow-y-auto max-h-[70vh]">
          <div className="flex flex-col gap-4 md:col-span-8">
            <div className="grid gap-2">
              <Label>Amount</Label>
              <Input
                type="number"
                placeholder="0"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label>Description</Label>
              <Textarea
                placeholder="Enter description"
                className="min-h-[120px]"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="border rounded-lg p-4 bg-muted">
              <p className="text-sm font-medium mb-2">Upload file</p>
              <div className="flex items-center justify-center border border-dashed rounded-md p-6 cursor-pointer">
                <Upload className="w-5 h-5" />
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4 md:col-span-4">
            <CalendarInput
              label="Date"
              value={date}
              onChange={setDate}
              placeholder="MM-DD-YYYY"
            />

            <div>
              <div className="flex justify-between items-center">
                <Label>Vendor</Label>
                <VendorDialog
                  trigger={
                    <Button size="sm" variant="ghost">
                      <Plus />
                    </Button>
                  }
                />
              </div>
              <Select value={vendor} onValueChange={setVendor}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a Vendor" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Vendors</SelectLabel>
                    <SelectItem value="Apple">Apple</SelectItem>
                    <SelectItem value="Banana">Banana</SelectItem>
                    <SelectItem value="Grapes">Grapes</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Status</Label>
              <Select value={status} onValueChange={setStatus}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Paid">Paid</SelectItem>
                  <SelectItem value="Unpaid">Unpaid</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="mt-4 flex flex-col gap-2">
              <DialogClose asChild>
                <Button onClick={handleSave}>Save</Button>
              </DialogClose>
              <DialogClose asChild>
                <Button variant="destructive">Cancel</Button>
              </DialogClose>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
