"use client";

import { useState, useEffect } from "react";
import { IndianRupee, Pencil, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TypographyH3 } from "@/components/custom/Typography";
import AddBillDialog from "./AddBillDialog";
import AddPaymentDialog from "./AddPaymentDialog";

const mockBills = [
  {
    amount: "1500",
    date: "26/06/2025",
    status: "Paid",
    vendor: "Apple",
    description: "Monthly subscription",
  },
  {
    amount: "900",
    date: "25/06/2025",
    status: "Unpaid",
    vendor: "Banana",
    description: "Hardware purchase",
  },
  {
    amount: "5000",
    date: "24/06/2025",
    status: "Paid",
    vendor: "Grapes",
    description: "Annual license",
  },
];

export default function Bills() {
  const [bills, setBills] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    setBills(mockBills); // Load mock data on mount
  }, []);

  const handleAddBill = (bill) => {
    if (editIndex !== null) {
      const updated = [...bills];
      updated[editIndex] = bill;
      setBills(updated);
      setEditIndex(null);
    } else {
      setBills((prev) => [...prev, bill]);
    }
  };

  const handleDelete = (index) => {
    setBills((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <TypographyH3>Bills</TypographyH3>
        <AddBillDialog
          onAddBill={handleAddBill}
          trigger={
            <Button variant="default">
              <Plus />
              Create Bill
            </Button>
          }
        />
      </div>

      <Table>
        <TableCaption />
        <TableHeader>
          <TableRow>
            <TableHead>Amount</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Vendor</TableHead>
            <TableHead>Action</TableHead>
            <TableHead>Payment</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {bills.map((bill, index) => (
            <TableRow key={index}>
              <TableCell>₹{bill.amount}</TableCell>
              <TableCell>{bill.date}</TableCell>
              <TableCell>{bill.status}</TableCell>
              <TableCell>{bill.vendor}</TableCell>
              <TableCell className="flex gap-2">
                <AddBillDialog
                  trigger={
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setEditIndex(index)}
                    >
                      <Pencil />
                    </Button>
                  }
                  defaultData={bills[index]}
                  onAddBill={handleAddBill}
                />
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleDelete(index)}
                >
                  <Trash2 className="text-red-500" />
                </Button>
              </TableCell>
              <TableCell>
                {bill.status === "Paid" ? (
                  <Button>
                    <IndianRupee />
                    View
                  </Button>
                ) : (
                  <AddPaymentDialog
                    trigger={
                      <Button>
                        <IndianRupee />
                        Record
                      </Button>
                    }
                  />
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
