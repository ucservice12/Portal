"use client";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Upload } from "lucide-react";
import { useState } from "react";
import { CalendarInput } from "@/components/custom/Calendar";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { TypographyH3 } from "@/components/custom/Typography";

export default function AddPaymentDialog({ trigger }) {
  const [form, setForm] = useState({
    amount: "",
    paymentMethod: "",
    transactionId: "",
    memo: "",
    paymentDate: new Date(),
    receipt: null,
  });

  const [errorMessage, setErrorMessage] = useState("");

  const update = (field) => (e) =>
    setForm((prev) => ({ ...prev, [field]: e.target?.value ?? e }));

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) setForm((prev) => ({ ...prev, receipt: file }));
  };

  const validateForm = () => {
    const { amount, paymentMethod, transactionId, paymentDate } = form;
    if (!amount || parseFloat(amount) <= 0)
      return "Amount must be greater than 0";
    if (!paymentMethod) return "Payment Method is required";
    if (!transactionId) return "Transaction ID is required";
    if (!paymentDate) return "Payment Date is required";
    return null;
  };

  const handleSave = () => {
    const error = validateForm();
    if (error) {
      setErrorMessage(error);
      return;
    }

    setErrorMessage("");
    console.log("Payment Data:", {
      ...form,
      paymentDate: form.paymentDate.toLocaleDateString("en-IN"),
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-4xl">
        <DialogHeader>
          <TypographyH3 className="text-start">Add Payment</TypographyH3>
          <DialogTitle />
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 overflow-y-auto max-h-[75vh]">
          {/* Left Form */}
          <div className="md:col-span-8 space-y-4">
            <div className="grid gap-2">
              <Label>Payment Method</Label>
              <Select
                value={form.paymentMethod}
                onValueChange={(val) =>
                  setForm((p) => ({ ...p, paymentMethod: val }))
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select payment method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="UPI">Bank Transfer</SelectItem>
                  <SelectItem value="Card">Cash</SelectItem>
                  <SelectItem value="Netbanking">Cheque</SelectItem>
                  <SelectItem value="Cash">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label>Transaction ID</Label>
              <Input
                placeholder="Enter transaction ID"
                value={form.transactionId}
                onChange={update("transactionId")}
              />
            </div>

            <div className="grid gap-2">
              <Label>Memo</Label>
              <Textarea
                placeholder="Optional note"
                value={form.memo}
                onChange={update("memo")}
              />
            </div>

            <div className="grid gap-2">
              <Label>Receipt</Label>
              <div className="border rounded-md p-4 bg-muted">
                <p className="text-sm font-medium mb-2">Upload file</p>
                <label className="flex items-center justify-center border border-dashed p-6 rounded-md cursor-pointer">
                  <Upload className="w-5 h-5" />
                  <input
                    type="file"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                </label>
                {form.receipt && (
                  <p className="text-sm text-muted-foreground mt-2">
                    {form.receipt.name}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Right Form */}
          <div className="flex flex-col justify-between gap-2 md:col-span-4">
            <div className="space-y-4">
              <div className="grid gap-2">
                <Label>Amount</Label>
                <Input
                  type="number"
                  placeholder="Enter amount"
                  value={form.amount}
                  onChange={update("amount")}
                />
              </div>

              <div className="grid gap-2">
                <CalendarInput
                  label="Payment Date"
                  value={form.paymentDate}
                  onChange={(date) =>
                    setForm((p) => ({ ...p, paymentDate: date }))
                  }
                  placeholder="DD-MM-YYYY"
                />
              </div>
            </div>

            {errorMessage && (
              <p className="text-red-500 text-sm">{errorMessage}</p>
            )}

            <div className="grid gap-3">
              <Button
                onClick={handleSave}
                className="bg-sky-500 text-white hover:bg-sky-600"
              >
                Save
              </Button>
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
