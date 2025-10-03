// components/pages/MeetingTable.jsx
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import { useState } from "react";
import { TypographyH3 } from "@/components/custom/Typography";
import MeetingDialog from "./MeetingDialog";

const mockMeetings = [
  {
    name: "Alice Johnson",
    email: "alice@example.com",
    link: "https://zoom.us/j/1234567890",
  },
  {
    name: "Bob Smith",
    email: "bob@example.com",
    link: "https://meet.google.com/xyz-abc-def",
  },
];

export default function MeetingLinks() {
  const [meetings, setMeetings] = useState(mockMeetings);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);

  const handleSave = (data) => {
    const updated = [...meetings];
    updated[editingIndex] = data;
    setMeetings(updated);
    setOpenDialog(false);
  };

  return (
    <>
      <TypographyH3>Meeting Links</TypographyH3>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Meeting Link</TableHead>
            <TableHead className="text-center">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {meetings.map((m, i) => (
            <TableRow key={i}>
              <TableCell>{m.name}</TableCell>
              <TableCell>{m.email}</TableCell>
              <TableCell>
                <a
                  href={m.link}
                  className="text-primary underline"
                  target="_blank"
                  rel="noreferrer"
                >
                  {m.link}
                </a>
              </TableCell>
              <TableCell className="text-center">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    setEditingIndex(i);
                    setOpenDialog(true);
                  }}
                >
                  <Pencil />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <MeetingDialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        onSave={handleSave}
        initialData={
          editingIndex !== null
            ? meetings[editingIndex]
            : { name: "", email: "", link: "" }
        }
      />
    </>
  );
}
