import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { Pencil, Trash, Printer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { IoPersonSharp } from "react-icons/io5";
import { Link, useLocation } from "react-router-dom";

export function InvoiceTable({ invoices }) {
  const location = useLocation();

  return (
    <div className="border rounded-lg overflow-hidden">
      <Table>
        <TableHeader className="bg-[#FBFCFE]">
          <TableRow>
            <TableHead>Invoice Number</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Issued On</TableHead>
            <TableHead>Due Date</TableHead>
            <TableHead>Amount</TableHead>
            {location.pathname !== "/sales-board" && (
              <TableHead className="text-center">Actions</TableHead>
            )}
          </TableRow>
        </TableHeader>
        <TableBody>
          {invoices.map((invoice, i) => (
            <TableRow key={i}>
              <TableCell>{invoice.number}</TableCell>
              <TableCell className="flex gap-2 border-none">
                <div className="flex gap-2">
                  <div className="flex items-center cursor-pointer justify-center w-8 h-8 rounded-full bg-muted">
                    <IoPersonSharp className="text-gray-600" />
                  </div>
                  <div>
                    <span>{invoice.customer}</span>
                    <p className="text-muted-foreground text-xs">
                      {invoice.CustomerEmail}
                    </p>
                  </div>
                </div>
              </TableCell>
              <TableCell>{invoice.issuedOn}</TableCell>
              <TableCell>{invoice.dueDate}</TableCell>
              <TableCell>₹{invoice.amount.toLocaleString("en-IN")}</TableCell>
              {location.pathname !== "/sales-board" && (
                <TableCell className="flex justify-center border-none">
                  <Link to={`/current-sales/invoices/update/${invoice.id}`}>
                    <Button variant="ghost" size="icon">
                      <Pencil />
                    </Button>
                  </Link>
                  <Button variant="ghost" size="icon">
                    <Trash />
                  </Button>
                  <Link to={`/current-sales/invoices/details/${invoice?.id}`}>
                    <Button variant="ghost" size="icon">
                      <Printer />
                    </Button>
                  </Link>
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
