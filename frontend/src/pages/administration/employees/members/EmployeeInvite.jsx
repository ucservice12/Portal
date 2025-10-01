"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TypographyH5 } from "@/components/custom/Typography";
import InviteEmailPreviewDialog from "./InviteEmailPreviewDialog";
import { Plus } from "lucide-react";

export default function EmployeeInvite() {
  const [inviteDialogOpen, setInviteDialogOpen] = useState(false);
  const [previewDialogOpen, setPreviewDialogOpen] = useState(false);
  const [form, setForm] = useState({
    fromEmail: "noreply@ucservices.biz",
    memberName: "",
    email: "",
  });

  // For demo, previous email is just a string
  const orgName = "UC Services PVT LTD";
  const inviteUrl =
    "https://connect.ucservices.biz/invite?org=3f22d212-1752-4594-aed9-5d0a4d816308";

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePreview = () => {
    setInviteDialogOpen(false);
    setTimeout(() => setPreviewDialogOpen(true), 200);
  };

  const handleBackToInvite = () => {
    setPreviewDialogOpen(false);
    setTimeout(() => setInviteDialogOpen(true), 200);
  };

  const handleConfirm = () => {
    setInviteDialogOpen(false);
    setPreviewDialogOpen(false);
    // handle confirm logic here
    alert("Email confirmed!");
  };

  return (
    <div>
      {/* Employee Card */}
      <Button onClick={() => setInviteDialogOpen(true)} className="w-full">
        <Plus />
        Invite
      </Button>

      {/* Invite Dialog */}
      <Dialog open={inviteDialogOpen} onOpenChange={setInviteDialogOpen}>
        <DialogContent className="sm:max-w-md w-full">
          <DialogHeader>
            <TypographyH5>Invite Member</TypographyH5>
            <DialogTitle></DialogTitle>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="fromEmail">From Address Email</Label>
              <Input
                id="fromEmail"
                name="fromEmail"
                value={form.fromEmail}
                onChange={handleChange}
                placeholder="your@email.com"
                className="w-full"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="memberName">Member Name</Label>
              <Input
                id="memberName"
                name="memberName"
                value={form.memberName}
                onChange={handleChange}
                placeholder="Member Name"
                className="w-full"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="member@email.com"
                className="w-full"
              />
            </div>
          </div>
          <DialogFooter className="flex flex-col gap-2 sm:flex-row sm:justify-end">
            <Button
              variant="outline"
              className="w-full sm:w-auto"
              onClick={handlePreview}
            >
              Preview Email
            </Button>
            <Button className="w-full sm:w-auto" onClick={handleConfirm}>
              Confirm Set Email
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Preview Email Dialog */}
      <InviteEmailPreviewDialog
        previewDialogOpen={previewDialogOpen}
        setPreviewDialogOpen={setPreviewDialogOpen}
        form={form}
        handleBackToInvite={handleBackToInvite}
        handleConfirm={handleConfirm}
        orgName={orgName}
        inviteUrl={inviteUrl}
      />
    </div>
  );
}
