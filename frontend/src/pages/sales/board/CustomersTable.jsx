"use client";

import {
  Table,
  TableCaption,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Pencil, Trash } from "lucide-react";
import { useLocation } from "react-router-dom";

export function CustomersTable({ customers = [], onEdit, onDelete }) {
  const location = useLocation();

  return (
    <div className="sm:w-[1200px] overflow-x-auto">
      <Table className="min-w-full table-auto ">
        <TableCaption />
        <TableHeader className="bg-[#FBFCFE]">
          <TableRow>
            <TableHead className="whitespace-nowrap">Company Name</TableHead>
            <TableHead className="whitespace-nowrap">First Name</TableHead>
            <TableHead className="whitespace-nowrap">Last Name</TableHead>
            <TableHead className="whitespace-nowrap">Phone No 1</TableHead>
            <TableHead className="whitespace-nowrap">Phone No 2</TableHead>
            <TableHead className="whitespace-nowrap">Contact Email 1</TableHead>
            <TableHead className="whitespace-nowrap">Contact Email 2</TableHead>
            <TableHead className="whitespace-nowrap">Website</TableHead>
            <TableHead className="whitespace-nowrap">Notes</TableHead>
            {location.pathname !== "/sales-board" && (
              <TableHead className="text-center whitespace-nowrap">
                Action
              </TableHead>
            )}
          </TableRow>
        </TableHeader>
        <TableBody>
          {customers.length > 0 ? (
            customers.map((customer, index) => (
              <TableRow key={index}>
                <TableCell className="whitespace-normal break-words">
                  {customer?.companyName ?? ""}
                </TableCell>
                <TableCell className="whitespace-normal break-words">
                  {customer?.firstName ?? ""}
                </TableCell>
                <TableCell className="whitespace-normal break-words">
                  {customer?.lastName ?? ""}
                </TableCell>
                <TableCell className="whitespace-normal break-words">
                  {customer?.phone1 ?? ""}
                </TableCell>
                <TableCell className="whitespace-normal break-words">
                  {customer?.phone2 ?? ""}
                </TableCell>
                <TableCell className="whitespace-normal break-words">
                  {customer?.email1 ?? ""}
                </TableCell>
                <TableCell className="whitespace-normal break-words">
                  {customer?.email2 ?? ""}
                </TableCell>
                <TableCell className="whitespace-normal break-words">
                  {customer?.website ?? ""}
                </TableCell>
                <TableCell className="whitespace-normal break-words">
                  {customer?.notes ?? ""}
                </TableCell>
                {location.pathname !== "/sales-board" && (
                  <TableCell className="flex gap-2 justify-center">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => onEdit?.(index)}
                    >
                      <Pencil />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => onDelete?.(index)}
                    >
                      <Trash className=" text-red-500" />
                    </Button>
                  </TableCell>
                )}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={10}
                className="text-center text-muted-foreground py-6"
              >
                No customers found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
