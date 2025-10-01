"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { TypographyH3 } from "@/components/custom/Typography";

const achievements = [
  {
    id: 1,
    title: "Completed 100 Tasks",
    description: "Achieved by finishing 100 assigned tasks in a year.",
    status: "Completed",
  },
  {
    id: 2,
    title: "Team Player Award",
    description: "Awarded for exceptional team collaboration.",
    status: "Awarded",
  },
  {
    id: 3,
    title: "UI Redesign Initiative",
    description: "Led the redesign of the dashboard UI.",
    status: "In Progress",
  },
  {
    id: 4,
    title: "Mentorship",
    description: "Guided 3 new joiners over 6 months.",
    status: "Completed",
  },
];

const statusColor = {
  Completed: "success",
  "In Progress": "warning",
  Awarded: "default",
};

export default function Achievement() {
  return (
    <div className="space-y-6">
      <TypographyH3>Achievements</TypographyH3>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {achievements?.map((item) => (
            <TableRow key={item?.id}>
              <TableCell>{item?.title}</TableCell>
              <TableCell className="whitespace-normal break-words max-w-xs">
                {item?.description}
              </TableCell>
              <TableCell>
                <Badge variant={statusColor[item?.status] || "outline"}>
                  {item?.status}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
