"use client";

import { useRef, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { TypographyH2 } from "@/components/custom/Typography";
import {
  EllipsisVertical,
  Download,
  Upload,
  X,
  CheckCircle2,
} from "lucide-react";

const initialDocs = [
  { id: 1, name: "Adhar Card", status: "Not Uploaded", fileUrl: "" },
  { id: 2, name: "Pan Card", status: "Uploaded", fileUrl: "" },
  { id: 3, name: "Bank Passbook", status: "Rejected", fileUrl: "" },
  { id: 4, name: "Adhar Card", status: "Approved", fileUrl: "" },
];

export default function Documents() {
  const [documents, setDocuments] = useState(initialDocs);
  const fileInputRefs = useRef({});
  const [openPopovers, setOpenPopovers] = useState({});
  const [openAccordions, setOpenAccordions] = useState([]);

  const handleFileSelect = (id, file) => {
    const url = URL.createObjectURL(file);
    const updatedDocs = documents.map((doc) =>
      doc.id === id ? { ...doc, status: "Uploaded", fileUrl: url } : doc
    );
    setDocuments(updatedDocs);

    // Open accordion after upload
    setOpenAccordions((prev) => [...new Set([...prev, `item-${id}`])]);
  };

  const triggerFileInput = (id) => {
    fileInputRefs.current[id]?.click();
  };

  const togglePopover = (id, value) => {
    setOpenPopovers((prev) => ({ ...prev, [id]: value }));
  };

  const isAccordionOpen = (id) => openAccordions.includes(`item-${id}`);

  const toggleAccordion = (id) => {
    if (isAccordionOpen(id)) {
      setOpenAccordions((prev) => prev.filter((val) => val !== `item-${id}`));
    } else {
      setOpenAccordions((prev) => [...prev, `item-${id}`]);
    }
  };

  return (
    <div className="space-y-4">
      <TypographyH2>Documents List</TypographyH2>

      {documents.map((doc) => (
        <div
          key={doc.id}
          className="flex flex-wrap gap-2 rounded-md border p-2 sm:flex-nowrap items-start"
        >
          {/* Hidden file input */}
          <input
            type="file"
            accept="application/pdf"
            ref={(el) => (fileInputRefs.current[doc.id] = el)}
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleFileSelect(doc.id, file);
            }}
            className="hidden"
          />

          {/* Popover for Actions */}
          <Popover
            open={openPopovers[doc.id]}
            onOpenChange={(v) => togglePopover(doc.id, v)}
          >
            <PopoverTrigger asChild>
              <Button variant="ghost" size="icon">
                <EllipsisVertical className="h-5 w-5 text-muted-foreground" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-fit">
              {doc.status === "Not Uploaded" ? (
                <Button
                  variant="outline"
                  onClick={() => {
                    triggerFileInput(doc.id);
                  }}
                >
                  <Upload className="w-4 h-4 mr-2" /> Upload
                </Button>
              ) : (
                <div className="grid gap-2 text-start">
                  {doc.fileUrl && (
                    <a href={doc.fileUrl} download>
                      <Button variant="ghost">
                        <Download className="w-4 h-4 mr-2" /> Download
                      </Button>
                    </a>
                  )}
                  <Button
                    variant="ghost"
                    onClick={() => {
                      triggerFileInput(doc.id);
                    }}
                  >
                    <Upload className="w-4 h-4 mr-2" /> Re-upload
                  </Button>
                  <Button variant="ghost">
                    <X className="w-4 h-4 mr-2" /> Reject
                  </Button>
                  <Button variant="ghost">
                    <CheckCircle2 className="w-4 h-4 mr-2" /> Approve
                  </Button>
                </div>
              )}
            </PopoverContent>
          </Popover>

          {/* Accordion */}
          <Accordion
            type="multiple"
            value={openAccordions}
            onValueChange={setOpenAccordions}
            className="w-full"
          >
            <AccordionItem value={`item-${doc.id}`} className="border-none">
              <div className="flex items-center justify-between">
                <AccordionTrigger
                  onClick={() => toggleAccordion(doc.id)}
                  className="text-md font-medium"
                >
                  {doc.name}
                </AccordionTrigger>
                <Badge
                  variant="outline"
                  className="text-muted-foreground bg-muted"
                >
                  {doc.status}
                </Badge>
              </div>
              <AccordionContent className="text-sm text-muted-foreground">
                {doc.fileUrl ? (
                  <iframe
                    src={doc.fileUrl}
                    title={doc.name}
                    className="w-full aspect-[1/1.414] border rounded-md"
                  />
                ) : (
                  <p className="text-sm text-gray-500">
                    No document uploaded yet.
                  </p>
                )}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      ))}
    </div>
  );
}
