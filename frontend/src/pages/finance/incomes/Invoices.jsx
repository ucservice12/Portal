import { TypographyH2 } from "@/components/custom/Typography";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { IndianRupee } from "lucide-react";
import { IoPersonSharp } from "react-icons/io5";
import RecordPaymentDialog from "../purchases/reimbursements/ReimbursementsRecordPaymentDialog";

export default function Invoices() {
  const invoices = [
    {
      number: "INV-001",
      customer: "John Doe",
      CustomerEmail: "john@example.com",
      issuedOn: "2025-06-01",
      dueDate: "2025-06-10",
      amount: 12500,
      status: "Unpaid",
      description: "Travel reimbursement",
    },
    {
      number: "INV-002",
      customer: "Jane Smith",
      CustomerEmail: "jane@example.com",
      issuedOn: "2025-06-05",
      dueDate: "2025-06-15",
      amount: 8900,
      status: "Paid",
      description: "Consulting charges",
    },
  ];

  return (
    <div>
      <TypographyH2 className="mb-4">Invoices Details</TypographyH2>

      <Table>
        <TableHeader className="bg-[#FBFCFE]">
          <TableRow>
            <TableHead>Invoice Number</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Issued On</TableHead>
            <TableHead>Due Date</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Payments</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {invoices.map((invoice, i) => (
            <TableRow key={i}>
              <TableCell>{invoice.number}</TableCell>
              <TableCell className="flex gap-2 border-none">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-muted">
                  <IoPersonSharp className="text-gray-600" />
                </div>
                <div>
                  <span>{invoice.customer}</span>
                  <p className="text-muted-foreground text-xs">
                    {invoice.CustomerEmail}
                  </p>
                </div>
              </TableCell>
              <TableCell>{invoice.issuedOn}</TableCell>
              <TableCell>{invoice.dueDate}</TableCell>
              <TableCell>₹{invoice.amount.toLocaleString("en-IN")}</TableCell>
              <TableCell>{invoice.description}</TableCell>
              <TableCell className="space-x-2">
                {invoice.status === "Unpaid" ? (
                  <RecordPaymentDialog
                    defaultData={""}
                    trigger={
                      <Button size="xs">
                        <IndianRupee />
                        Record
                      </Button>
                    }
                  />
                ) : (
                  <Button size="xs">
                    <IndianRupee /> View
                  </Button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
