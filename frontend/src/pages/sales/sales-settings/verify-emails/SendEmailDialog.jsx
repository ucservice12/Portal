// components/custom/dialog/SendEmailDialog.tsx
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  TypographyH3,
  TypographySmall,
  TypographyP,
} from "@/components/custom/Typography";
import { Loader2, CheckCircle } from "lucide-react";
import { useEffect, useState } from "react";

export default function SendEmailDialog({
  open,
  email,
  onClose,
  onSuccess,
  title = "Verify Email",
  delayMs = 2000,
}) {
  const [status, setStatus] = useState("sending");

  useEffect(() => {
    if (open) {
      setStatus("sending");
      const timer = setTimeout(() => {
        setStatus("success");
        if (onSuccess) onSuccess();
      }, delayMs);

      return () => clearTimeout(timer);
    }
  }, [open, delayMs, onSuccess]);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md text-center">
        <DialogHeader>
          <DialogTitle>
            <TypographyH3 className="text-start border-b pb-2">
              {title}
            </TypographyH3>
          </DialogTitle>
        </DialogHeader>

        <div className="py-6">
          {status === "sending" ? (
            <div className="flex flex-col items-center gap-3">
              <Loader2 className="h-12 w-12 animate-spin text-primary" />
              <TypographyP>
                Sending verification link to <br />
                <TypographySmall>{email}</TypographySmall>
              </TypographyP>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-3 text-sm">
              <CheckCircle className="h-12 w-12 text-green-600" />
              <TypographyP>
                Email sent successfully to
                <br />
                <TypographySmall>{email}</TypographySmall>
              </TypographyP>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
