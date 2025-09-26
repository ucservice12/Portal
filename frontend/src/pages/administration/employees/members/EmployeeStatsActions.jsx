"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Plus, List, Kanban } from "lucide-react";

export default function EmployeeStatsActions({ setInviteDialogOpen }) {
  return (
    <div className="flex w-full sm:flex-row flex-col sm:justify-between sm:items-center gap-4 mt-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-muted rounded-md px-4 py-2 min-w-[220px]">
          <Label>No Of Confirmed Employees</Label>
          <div className="font-medium">1</div>
        </div>
        <div className="bg-muted rounded-md px-4 py-2 min-w-[220px]">
          <Label>No Of On Probation Employees</Label>
          <div className="font-medium">0</div>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <Button onClick={() => setInviteDialogOpen(true)}>
          <Plus /> Invite
        </Button>
        <Button variant="secondary">
          <Kanban /> Board
        </Button>
        <Button variant="outline">
          <List /> List
        </Button>
      </div>
    </div>
  );
}
