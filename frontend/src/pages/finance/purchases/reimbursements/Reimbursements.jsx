import { IndianRupee, Pencil, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
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
import AddReimbursementDialog from "./AddReimbursementDialog";
import { TypographyH3 } from "@/components/custom/Typography";
import RecordPaymentDialog from "./ReimbursementsRecordPaymentDialog";

export default function Reimbursements() {
  const [reimbursements, setReimbursements] = useState([
    {
      title: "Travel Reimbursement",
      amount: 1200,
      date: "25-06-2025",
      status: "Pending",
    },
    {
      title: "Food Expenses",
      amount: 800,
      date: "20-06-2025",
      status: "Approved",
    },
    {
      title: "Client Meeting",
      amount: 1500,
      date: "18-06-2025",
      status: "Paid",
    },
  ]);

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <TypographyH3>Reimbursements</TypographyH3>
        <AddReimbursementDialog
          trigger={
            <Button>
              <Plus />
              Create
            </Button>
          }
        />
      </div>

      <Table>
        <TableCaption />
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
            <TableHead>Payments</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {reimbursements.map((r, index) => (
            <TableRow key={index}>
              <TableCell>{r.title}</TableCell>
              <TableCell>₹{r.amount}</TableCell>
              <TableCell>{r.date}</TableCell>
              <TableCell>{r.status}</TableCell>
              <TableCell className="flex items-center gap-4">
                <Button variant="outline" size="icon">
                  <Pencil />
                </Button>
                <Button variant="outline" size="icon">
                  <Trash2 className="text-red-500" />
                </Button>
              </TableCell>
              <TableCell>
                {r.status === "Paid" ? (
                  <Button size="xs">
                    <IndianRupee />
                    View
                  </Button>
                ) : (
                  <RecordPaymentDialog
                    defaultData={{
                      amount: r,
                    }}
                    trigger={
                      <Button size="xs">
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
