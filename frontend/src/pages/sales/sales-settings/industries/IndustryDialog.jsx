"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { TypographyH3 } from "@/components/custom/Typography";
import { useEffect, useState } from "react";

export default function IndustryDialog({ trigger, onSave, initialValue = "" }) {
  const [industry, setIndustry] = useState("");

  useEffect(() => {
    setIndustry(initialValue || "");
  }, [initialValue]);

  const handleSave = () => {
    if (industry.trim()) {
      onSave(industry.trim());
      setIndustry("");
      document.getElementById("industry-dialog-close")?.click();
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <TypographyH3 className="text-start">
            {initialValue ? "Edit Industry" : "Add Industry"}
          </TypographyH3>
          <DialogTitle />
        </DialogHeader>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          <div className="md:col-span-8">
            <div className="grid gap-2">
              <Label htmlFor="industry">Industry Name</Label>
              <Input
                id="industry"
                placeholder="e.g. Healthcare"
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
              />
            </div>
          </div>
          <div className="md:col-span-4 grid gap-2">
            <DialogClose asChild>
              <Button variant="destructive" id="industry-dialog-close">
                Cancel
              </Button>
            </DialogClose>
            <Button onClick={handleSave}>Save</Button>
          </div>
        </div>
        <DialogFooter />
      </DialogContent>
    </Dialog>
  );
}
