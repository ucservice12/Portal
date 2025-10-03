"use client";

import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { TypographyH3 } from "@/components/custom/Typography";

export default function TagsDialog({ trigger, defaultValue = "", onSave }) {
  const [tagLabel, setTagLabel] = React.useState(defaultValue);

  const handleSubmit = () => {
    if (tagLabel.trim()) {
      onSave(tagLabel.trim());
      setTagLabel("");
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <TypographyH3 className="text-start">
            {defaultValue ? "Edit Tag" : "Create Tag"}
          </TypographyH3>
          <DialogTitle />
          <DialogDescription />
        </DialogHeader>

        <div className="space-y-3">
          <Label htmlFor="tagLabel">Tag Label</Label>
          <Input
            id="tagLabel"
            value={tagLabel}
            onChange={(e) => setTagLabel(e.target.value)}
            placeholder="e.g. Qualified Lead"
          />
        </div>

        <DialogFooter className="flex justify-end space-x-2">
          <DialogClose asChild>
            <Button variant="destructive">Cancel</Button>
          </DialogClose>
          <DialogClose asChild>
            <Button
              onClick={() => {
                if (tagLabel.trim()) {
                  onSave(tagLabel.trim());
                  setTagLabel("");
                }
              }}
            >
              {defaultValue ? "Update" : "Save"}
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
