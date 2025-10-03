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
import { CalendarInput } from "@/components/custom/Calendar";
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Upload } from "lucide-react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { TypographyH3 } from "@/components/custom/Typography";

export default function ReimbursementsRecordPaymentDialog({
  trigger,
  defaultData,
}) {
  const [form, setForm] = useState({
    amount: defaultData.amount || "",
    paymentMethod: "",
    transactionId: "",
    memo: "",
    paymentDate: new Date(),
    receipt: null,
  });

  const [errors, setErrors] = useState({});

  const update = (field) => (e) =>
    setForm((prev) => ({ ...prev, [field]: e.target?.value ?? e }));

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) setForm((prev) => ({ ...prev, receipt: file }));
  };

  const validate = () => {
    const newErrors = {};
    if (!form.amount || parseFloat(form.amount) <= 0)
      newErrors.amount = "Amount must be greater than 0";
    if (!form.paymentMethod)
      newErrors.paymentMethod = "Payment Method is required";
    if (!form.transactionId)
      newErrors.transactionId = "Transaction ID is required";
    return newErrors;
  };

  const handleSave = () => {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    console.log("Recorded Payment:", {
      ...form,
      paymentDate: form.paymentDate.toLocaleDateString("en-IN"),
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-5xl">
        <DialogHeader>
          <TypographyH3 className="text-start">
            Reimbursements Record Payment
          </TypographyH3>
          <DialogTitle />
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 overflow-y-auto max-h-[75vh]">
          {/* Left section */}
          <div className="md:col-span-8 space-y-4">
            {/* Payment Method */}
            <div className="grid gap-1.5">
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
                  <SelectItem value="Cash">Cash</SelectItem>
                  <SelectItem value="Cheque">Cheque</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
              {errors.paymentMethod && (
                <p className="text-sm text-red-500">{errors.paymentMethod}</p>
              )}
            </div>

            {/* Transaction ID */}
            <div className="grid gap-1.5">
              <Label>Transaction ID</Label>
              <Input
                placeholder="Enter transaction ID"
                value={form.transactionId}
                onChange={update("transactionId")}
              />
              {errors.transactionId && (
                <p className="text-sm text-red-500">{errors.transactionId}</p>
              )}
            </div>

            {/* Memo */}
            <div className="grid gap-1.5">
              <Label>Memo</Label>
              <Textarea
                placeholder="Optional note"
                value={form.memo}
                onChange={update("memo")}
              />
            </div>

            {/* Receipt */}
            <div className="grid gap-1.5">
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
                  <p className="text-sm mt-2">{form.receipt.name}</p>
                )}
              </div>
            </div>
          </div>

          {/* Right section */}
          <div className="md:col-span-4 flex flex-col justify-between gap-3">
            <div className="space-y-3">
              <div className="grid gap-1.5">
                <Label>Amount</Label>
                <Input
                  type="number"
                  value={form.amount}
                  onChange={update("amount")}
                />
                {errors.amount && (
                  <p className="text-sm text-red-500">{errors.amount}</p>
                )}
              </div>

              <CalendarInput
                label="Payment Date"
                value={form.paymentDate}
                onChange={(date) =>
                  setForm((p) => ({ ...p, paymentDate: date }))
                }
              />
            </div>

            <div className="grid gap-3">
              <Button onClick={handleSave} className="bg-sky-500 text-white">
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
