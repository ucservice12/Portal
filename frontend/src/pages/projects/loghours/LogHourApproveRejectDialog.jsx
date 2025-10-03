"use client";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { CalendarIcon } from "lucide-react";
import { IoPersonSharp } from "react-icons/io5";
import {
  TypographyH3,
  TypographyH5,
  TypographyMuted,
} from "@/components/custom/Typography";

export function LogHourApproveRejectDialog({
  open,
  onOpenChange,
  logData,
  approver,
  onApprove,
  onReject,
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-5xl max-h-[75vh] overflow-y-auto">
        <DialogHeader className="text-start">
          <DialogTitle />
          <TypographyH3>Approve or Reject Loghours</TypographyH3>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Left: Table Section */}
          <div className="md:col-span-8 w-full overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-8"></TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Hours</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {logData.map((log, idx) => (
                  <TableRow key={idx}>
                    <TableCell>
                      <input type="checkbox" className="accent-black" />
                    </TableCell>
                    <TableCell>{log.date}</TableCell>
                    <TableCell>{log.description}</TableCell>
                    <TableCell>{log.hours}</TableCell>
                    <TableCell>
                      <StatusBadge status={log.status || "Not Approved"} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Right: Approver Info */}
          <div className="md:col-span-4 space-y-4">
            <Card className="p-4 space-y-4">
              <div>
                <Label>Approved By</Label>
                <div className="flex items-center gap-3 mt-2">
                  <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                    <IoPersonSharp className="text-gray-600 text-xl" />
                  </div>
                  <div>
                    <TypographyH5>{approver?.name}</TypographyH5>
                    <TypographyMuted>{approver?.email}</TypographyMuted>
                  </div>
                </div>
              </div>

              <div className="space-y-1">
                <Label>Date</Label>
                <TypographyMuted className="flex gap-2 items-center">
                  <CalendarIcon className="w-4 h-4" />
                  {approver?.date}
                </TypographyMuted>
              </div>
            </Card>

            <div className="grid gap-4 mt-2">
              <Button
                className="bg-green-100 text-green-700 hover:bg-green-200"
                onClick={onApprove}
              >
                Approve
              </Button>
              <Button
                className="bg-red-100 text-red-700 hover:bg-red-200"
                onClick={onReject}
              >
                Reject
              </Button>
            </div>
          </div>
        </div>

        <DialogFooter />
      </DialogContent>
    </Dialog>
  );
}
