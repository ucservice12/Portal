"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { TypographyH5 } from "@/components/custom/Typography";

export default function InviteEmailPreviewDialog({
  previewDialogOpen,
  setPreviewDialogOpen,
  form,
  handleBackToInvite,
  handleConfirm,
  orgName,
  inviteUrl,
}) {
  return (
    <Dialog open={previewDialogOpen} onOpenChange={setPreviewDialogOpen}>
      <DialogContent className="sm:max-w-lg w-full">
        <DialogHeader>
          <TypographyH5>Email Preview</TypographyH5>
          <DialogTitle></DialogTitle>
        </DialogHeader>
        <div className="bg-muted rounded-md p-4 text-sm space-y-4">
          <div>
            <div className="font-semibold">From:</div>
            <div>{form.fromEmail}</div>
          </div>
          <div>
            <div className="font-semibold">To:</div>
            <div>{form.memberName}</div>
          </div>
          <div className="border rounded-md p-4 bg-background">
            <div className="font-bold text-lg mb-2">ucservices</div>
            <div className="mb-2 text-primary font-semibold">
              ucservices.biz : all in one app for your business!
            </div>
            <div>
              Hello <span className="font-semibold">{orgName}</span>,
            </div>
            <div className="mt-2">
              You have been invited to join{" "}
              <span className="font-semibold">{orgName}</span>, with email{" "}
              <span className="font-mono">{form.email}</span>
            </div>
            <div className="mt-2">
              Proceed with invite URL:
              <br />
              <a
                href={inviteUrl}
                className="text-blue-600 underline break-all"
                target="_blank"
                rel="noopener noreferrer"
              >
                {inviteUrl}
              </a>
            </div>
            <div className="mt-4 flex flex-wrap gap-4 text-xs text-gray-500">
              <a
                href="https://ucservices.biz/blog"
                className="underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Our Blog
              </a>
              |
              <a
                href="https://ucservices.biz/policies"
                className="underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Policies
              </a>
              |
              <a
                href="https://ucservices.biz/help"
                className="underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Help Center
              </a>
            </div>
            <div className="mt-4 text-xs text-gray-400">
              ©2024 Address: Office no.02,15, Zeroboyz Chowk, above HDFC Bank,
              Nehru Nagar, Pimpri Colony, Pune, Pimpri-Chinchwad, Maharashtra
              411018
            </div>
          </div>
        </div>
        <DialogFooter className="flex flex-col gap-2 sm:flex-row sm:justify-end">
          <Button
            variant="outline"
            className="w-full sm:w-auto"
            onClick={handleBackToInvite}
          >
            Back
          </Button>
          <Button className="w-full sm:w-auto" onClick={handleConfirm}>
            Confirm Set Email
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
