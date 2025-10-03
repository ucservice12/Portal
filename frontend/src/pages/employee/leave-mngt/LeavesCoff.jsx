"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Pencil, Trash, MessageSquare } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { AddLeaveDialog, AddLeaveCOffDialog } from "./AddLeaveDialog";
import { CommentDialog } from "./CommentDialog";
import { TypographyH3, TypographyMuted } from "@/components/custom/Typography";
import LeaveManageTable from "./LeaveManageTable";

export default function LeavesCoff() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [formData, setFormData] = useState({});
  const [isEdit, setIsEdit] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [commentsDialogOpen, setCommentsDialogOpen] = useState(false);
  const [commentInput, setCommentInput] = useState("");
  const [editingCommentIndex, setEditingCommentIndex] = useState(null);

  const currentUser = { name: "Amol", email: "amol@example.com" };

  const [leaveRecords, setLeaveRecords] = useState([
    {
      id: 1,
      title: "Test",
      details: "Need a day off for personal work",
      type: "Annual",
      date: "2025-07-03",
      quantity: 1,
      status: "Submitted",
    },
    {
      id: 2,
      title: "Doctor Visit",
      details: "Medical appointment",
      type: "Medical",
      date: "2025-07-04",
      quantity: 1,
      status: "Submitted",
    },
    {
      id: 3,
      title: "Family Event",
      details: "Attending cousin's wedding",
      type: "Annual",
      date: "2025-07-05",
      quantity: 1,
      status: "Submitted",
    },
  ]);

  const [commentsMap, setCommentsMap] = useState({});
  const [selectedLeaveIds, setSelectedLeaveIds] = useState([]);
  const [startDateFilter, setStartDateFilter] = useState("2025-07-01");
  const [endDateFilter, setEndDateFilter] = useState("2025-07-31");

  const handleEdit = (idx) => {
    setIsEdit(true);
    setFormData({ ...leaveRecords[idx], isEdit: true });
    setSelectedIndex(idx);
    setDialogOpen(true);
  };

  const handleSave = () => {
    const updated = [...leaveRecords];
    if (isEdit && selectedIndex !== null) {
      updated[selectedIndex] = { ...formData, status: "Submitted" };
    } else {
      updated.push({ ...formData, status: "Submitted" });
    }
    setLeaveRecords(updated);
    setDialogOpen(false);
    setFormData({});
    setIsEdit(false);
  };

  const handleApprove = () => {
    const updated = [...leaveRecords];
    selectedLeaveIds.forEach((idx) => {
      if (updated[idx].status === "Submitted") {
        updated[idx].status = "Approved";
      }
    });
    setLeaveRecords(updated);
    setSelectedLeaveIds([]);
  };

  const handleReject = () => {
    const updated = [...leaveRecords];
    selectedLeaveIds.forEach((idx) => {
      if (updated[idx].status === "Submitted") {
        updated[idx].status = "Rejected";
      }
    });
    setLeaveRecords(updated);
    setSelectedLeaveIds([]);
  };

  const handleOpenComments = (idx) => {
    setSelectedIndex(idx);
    setCommentsDialogOpen(true);
  };

  const handleAddComment = (text) => {
    const updated = { ...commentsMap };
    if (!updated[selectedIndex]) updated[selectedIndex] = [];

    if (editingCommentIndex !== null) {
      updated[selectedIndex][editingCommentIndex].text = text;
      setEditingCommentIndex(null);
    } else {
      updated[selectedIndex].push({
        text,
        user: currentUser,
        isMe: true,
        createdAt: new Date().toISOString(),
      });
    }
    setCommentsMap(updated);
    setCommentInput("");
  };

  const handleEditComment = (idx, text) => {
    setEditingCommentIndex(idx);
    setCommentInput(text);
  };

  const handleDeleteComment = (idx) => {
    const updated = { ...commentsMap };
    if (updated[selectedIndex]) {
      updated[selectedIndex].splice(idx, 1);
      setCommentsMap(updated);
    }
  };

  const handleSelectAllLeaves = () => {
    if (selectedLeaveIds.length === leaveRecords.length) {
      setSelectedLeaveIds([]);
    } else {
      setSelectedLeaveIds(leaveRecords.map((_, idx) => idx));
    }
  };

  const handleSelectLeave = (idx) => {
    setSelectedLeaveIds((prev) =>
      prev.includes(idx) ? prev.filter((id) => id !== idx) : [...prev, idx]
    );
  };

  const filteredLeaves = leaveRecords.filter((record) => {
    const recordDate = new Date(record.date);
    const start = new Date(startDateFilter);
    const end = new Date(endDateFilter);
    return recordDate >= start && recordDate <= end;
  });

  return (
    <div className="space-y-6">
      <div className="flex md:flex-row flex-col gap-4 sm:items-center justify-between">
        <div>
          <TypographyH3>C Off Overview</TypographyH3>
          <TypographyMuted>
            A detailed overview of your leave balance and status.
          </TypographyMuted>
        </div>
        <div className="flex gap-2">
          <Button
            onClick={() => {
              setFormData({ type: "C-OFF" });
              setIsEdit(false);
              setDialogOpen(true);
            }}
          >
            Request COff
          </Button>
        </div>
      </div>

      <LeaveManageTable />

      <div className="flex justify-between flex-wrap gap-4 items-end">
        <div className="flex flex-wrap items-center gap-4">
          <div className="space-y-1">
            <Label className="text-sm font-medium">Start Date *</Label>
            <Input
              type="date"
              value={startDateFilter}
              onChange={(e) => setStartDateFilter(e.target.value)}
            />
          </div>
          <div className="space-y-1">
            <Label className="text-sm font-medium">End Date *</Label>
            <Input
              type="date"
              value={endDateFilter}
              onChange={(e) => setEndDateFilter(e.target.value)}
            />
          </div>
        </div>

        <div className="flex justify-end gap-4 sm:mt-0 mt-4">
          <Button
            size="sm"
            onClick={handleApprove}
            disabled={selectedLeaveIds.length === 0}
          >
            Approve
          </Button>
          <Button
            size="sm"
            onClick={handleReject}
            disabled={selectedLeaveIds.length === 0}
            variant="destructive"
          >
            Reject
          </Button>
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>
              <Checkbox
                checked={selectedLeaveIds.length === leaveRecords.length}
                indeterminate={
                  selectedLeaveIds.length > 0 &&
                  selectedLeaveIds.length < leaveRecords.length
                }
                onCheckedChange={handleSelectAllLeaves}
              />
            </TableHead>
            <TableHead>Details</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredLeaves.map((record, idx) => (
            <TableRow key={idx}>
              <TableCell>
                <Checkbox
                  checked={selectedLeaveIds.includes(idx)}
                  onCheckedChange={() => handleSelectLeave(idx)}
                />
              </TableCell>
              <TableCell className="truncate max-w-[240px]">
                {record.details}
              </TableCell>
              <TableCell>{record.date}</TableCell>
              <TableCell>{record.quantity}</TableCell>
              <TableCell>
                <StatusBadge status={record.status} />
              </TableCell>
              <TableCell className="text-right flex gap-2 justify-end">
                <Button
                  size="icon"
                  variant="secondary"
                  onClick={() => handleEdit(idx)}
                >
                  <Pencil />
                </Button>
                <Button
                  size="icon"
                  variant="secondary"
                  className="text-red-600"
                >
                  <Trash />
                </Button>
                <Button
                  size="icon"
                  variant="secondary"
                  onClick={() => handleOpenComments(idx)}
                >
                  <MessageSquare />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Conditionally Render Dialog */}
      {formData.type === "C-OFF" ? (
        <AddLeaveCOffDialog
          open={dialogOpen}
          onOpenChange={setDialogOpen}
          data={formData}
          onChange={setFormData}
          onSave={handleSave}
        />
      ) : (
        <AddLeaveDialog
          open={dialogOpen}
          onOpenChange={setDialogOpen}
          data={formData}
          onChange={setFormData}
          onSave={handleSave}
        />
      )}

      <CommentDialog
        open={commentsDialogOpen}
        onOpenChange={setCommentsDialogOpen}
        comments={commentsMap[selectedIndex] || []}
        commentInput={commentInput}
        setCommentInput={setCommentInput}
        onAddComment={handleAddComment}
        onEditComment={handleEditComment}
        onDeleteComment={handleDeleteComment}
      />
    </div>
  );
}
