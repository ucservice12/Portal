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

export function EstimateTable({ estimates }) {
  const location = useLocation();

  return (
    <div className="rounded-lg overflow-hidden">
      <Table>
        <TableHeader className="bg-[#FBFCFE]">
          <TableRow>
            <TableHead>Estimate Number</TableHead>
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
          {estimates.map((estimate, i) => (
            <TableRow key={i}>
              <TableCell>{estimate.number}</TableCell>
              <TableCell className="flex gap-2 border-none">
                <div className="flex gap-2">
                  <div className="flex items-center cursor-pointer justify-center w-8 h-8 rounded-full bg-muted">
                    <IoPersonSharp className="text-gray-600" />
                  </div>
                  <div>
                    <span className="text-xs">{estimate.customer}</span>
                    <p className="text-muted-foreground text-xs">
                      {estimate.CustomerEmail}
                    </p>
                  </div>
                </div>
              </TableCell>
              <TableCell>{estimate.issuedOn}</TableCell>
              <TableCell>{estimate.dueDate}</TableCell>
              <TableCell>₹{estimate.amount.toLocaleString("en-IN")}</TableCell>
              {location.pathname !== "/sales-board" && (
                <TableCell className="flex justify-center border-none">
                  <Link to={`/future-sales/estimates/update/${estimate.id}`}>
                    <Button variant="ghost" size="icon">
                      <Pencil />
                    </Button>
                  </Link>
                  <Button variant="ghost" size="icon">
                    <Trash />
                  </Button>
                  <Link to={`/future-sales/estimates/details/${estimate?.id}`}>
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
