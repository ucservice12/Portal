import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { TypographyH4 } from "@/components/custom/Typography";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Link } from "react-router-dom";

// Sample task data
const taskData = [
  { name: "Submit report", date: "2025-07-03", status: "Pending" },
  { name: "Client call", date: "2025-07-04", status: "Completed" },
  { name: "Team meeting", date: "2025-07-05", status: "In Progress" },
  { name: "UI Review", date: "2025-07-06", status: "Pending" },
  { name: "Update Docs", date: "2025-07-07", status: "Completed" },
  { name: "Bug Fixes", date: "2025-07-08", status: "In Progress" },
  { name: "QA Testing", date: "2025-07-09", status: "Pending" },
];

export function MyTasks() {
  return (
    <Card>
      <div className="flex justify-between items-center">
        <TypographyH4>My Tasks</TypographyH4>
        <Link to="/employee/tasks">
          <Button size="sm">View</Button>
        </Link>
      </div>

      <div className="sm:h-64 h-56 scrollbar-hide overflow-auto">
        <Table className="border-none">
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {taskData.length > 0 ? (
              taskData.map((task, index) => (
                <TableRow key={index}>
                  <TableCell className="whitespace-normal break-words">
                    {task.name}
                  </TableCell>
                  <TableCell className="whitespace-normal break-words">
                    {task.date}
                  </TableCell>
                  <TableCell className="whitespace-normal break-words">
                    <StatusBadge status={task.status} />
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={3} className="text-center">
                  No tasks available.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
}
