"use client";

import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function CurrentSalesPayment() {
  const payments = [
    {
      amount: 3090,
      date: "21-06-2025",
      method: "Bank Transfer",
      transactionId: "Gsus",
      cashFlow: "Income",
      type: "Client",
    },
  ];

  return (
    <div className="rounded-md border overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow className="bg-[#FBFCFE]">
            <TableHead>Amount</TableHead>
            <TableHead>Payment Date</TableHead>
            <TableHead>Payment Method</TableHead>
            <TableHead>Transaction ID</TableHead>
            <TableHead>Cash Flow</TableHead>
            <TableHead>To/From</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {payments.map((payment, index) => (
            <TableRow key={index}>
              <TableCell>{payment.amount}</TableCell>
              <TableCell>{payment.date}</TableCell>
              <TableCell>
                <Badge
                  variant="outline"
                  className="bg-green-100 text-green-800"
                >
                  {payment.method}
                </Badge>
              </TableCell>
              <TableCell>{payment.transactionId}</TableCell>
              <TableCell>
                <Badge
                  variant="outline"
                  className="bg-green-100 text-green-800"
                >
                  {payment.cashFlow}
                </Badge>
              </TableCell>
              <TableCell>
                <Badge
                  variant="outline"
                  className="bg-green-100 text-green-800"
                >
                  {payment.type}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
