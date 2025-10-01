import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Pencil, Trash } from "lucide-react";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { TypographyH3 } from "@/components/custom/Typography";
import GoalDialog from "./GoalDialog";

export default function GoalsList() {
  const [goals, setGoals] = useState([
    {
      id: 1,
      title: "Improve UI",
      year: 2022,
      assignedBy: "User",
      dueDate: "2025-07-10",
      status: "Created",
    },
  ]);

  const handleSaveGoal = (goal) => {
    setGoals((prev) => {
      const exists = prev.find((g) => g.id === goal.id);
      return exists
        ? prev.map((g) => (g.id === goal.id ? goal : g))
        : [...prev, goal];
    });
  };

  const handleDelete = (id) => {
    setGoals((prev) => prev.filter((g) => g.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <TypographyH3>Goals</TypographyH3>
        <GoalDialog onSave={handleSaveGoal} />
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Year</TableHead>
            <TableHead>Assigned By</TableHead>
            <TableHead>Due Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {goals.map((goal) => (
            <TableRow key={goal?.id}>
              <TableCell>{goal?.title}</TableCell>
              <TableCell>{goal?.year}</TableCell>
              <TableCell>{goal?.assignedBy}</TableCell>
              <TableCell>{goal?.dueDate}</TableCell>
              <TableCell>
                <StatusBadge status={goal?.status} />
              </TableCell>
              <TableCell className="text-right space-x-2">
                <GoalDialog
                  mode="edit"
                  defaultValues={goal}
                  onSave={handleSaveGoal}
                  trigger={
                    <Button size="sm" variant="outline">
                      <Pencil size={14} />
                    </Button>
                  }
                />
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => handleDelete(goal.id)}
                >
                  <Trash size={14} />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
