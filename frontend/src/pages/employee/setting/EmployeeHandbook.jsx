"use client";

import { TypographyH2 } from "@/components/custom/Typography";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function Handbook() {
  const [iframeUrl] = useState("/dummy.pdf");

  return (
    <div className="flex flex-col">
      <div className="flex justify-between items-center">
        <TypographyH2 className="mb-4">Employee Handbook</TypographyH2>
        <Button>Download</Button>
      </div>

      <Card className="w-full max-w-4xl border">
        <div className="w-full overflow-auto">
          <iframe
            src={iframeUrl}
            className="w-full aspect-[1/1.414] border-0"
            title="Handbook A4"
          />
        </div>
      </Card>
    </div>
  );
}
