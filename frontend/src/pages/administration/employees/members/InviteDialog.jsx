import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { TypographyH5 } from "@/components/custom/Typography";

export default function InviteDialog({
  open,
  setOpen,
  inviteForm,
  handleInviteChange,
  handleConfirmInvite,
}) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="">
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
              value={inviteForm.fromEmail}
              onChange={handleInviteChange}
              placeholder="your@email.com"
              className="w-full"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="memberName">Member Name</Label>
            <Input
              id="memberName"
              name="memberName"
              value={inviteForm.memberName}
              onChange={handleInviteChange}
              placeholder="Member Name"
              className="w-full"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              name="email"
              value={inviteForm.email}
              onChange={handleInviteChange}
              placeholder="member@email.com"
              className="w-full"
            />
          </div>
        </div>
        <DialogFooter className="flex flex-col gap-2 sm:flex-row sm:justify-end">
          <Button className="w-full sm:w-auto" onClick={handleConfirmInvite}>
            Confirm Set Email
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
