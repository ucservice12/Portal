import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { Pencil, Trash2 } from "lucide-react";
import { IoPersonSharp } from "react-icons/io5";
import { TypographyMuted } from "@/components/custom/Typography";

export function TaskTable({ tasks, onEdit, onDelete }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableCell>
            <Checkbox />
          </TableCell>
          <TableCell>Task Name</TableCell>
          <TableCell>Status</TableCell>
          <TableCell className=" max-w-xs whitespace-normal break-words">
            Assigned Hour
          </TableCell>
          <TableCell className=" max-w-xs whitespace-normal break-words">
            Billed Hour
          </TableCell>
          <TableCell className=" max-w-xs whitespace-normal break-words">
            Extra Hour
          </TableCell>
          <TableCell className=" max-w-xs whitespace-normal break-words">
            Assignee To
          </TableCell>
          <TableCell>Start Date</TableCell>
          <TableCell>Completion</TableCell>
          <TableCell>Priority</TableCell>
          <TableCell>Progress</TableCell>
          <TableCell>Description</TableCell>
          <TableCell>Actions</TableCell>
        </TableRow>
      </TableHeader>
      <TableBody>
        {tasks.map((task) => (
          <TableRow key={task.id}>
            <TableCell>
              <Checkbox />
            </TableCell>
            <TableCell>
              <div className="whitespace-normal break-words max-w-xs">
                {task.title}
              </div>
            </TableCell>
            <TableCell>
              <StatusBadge status={task.status} />
            </TableCell>
            <TableCell>{task.assignedHours}</TableCell>
            <TableCell>{task.billedHours}</TableCell>
            <TableCell>{task.extraHours}</TableCell>
            <TableCell>
              <div className="flex items-center gap-2 whitespace-normal break-words max-w-xs">
                <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                  <IoPersonSharp className="text-gray-600" />
                </div>
                <div>
                  <div className="font-medium text-xs text-gray-900">
                    {task.assigneeName}
                  </div>
                  <TypographyMuted className="text-xs">
                    {task.assigneeEmail}
                  </TypographyMuted>
                </div>
              </div>
            </TableCell>
            <TableCell>{task.date}</TableCell>
            <TableCell>
              <span className="text-xs">{task.progress}%</span>
            </TableCell>
            <TableCell>{task.priority}</TableCell>
            <TableCell>
              <div className="w-24 h-2 bg-gray-200 rounded">
                <div
                  className="h-2 rounded"
                  style={{
                    width: `${task.progress}%`,
                    background:
                      task.progress === 100
                        ? "#10B981"
                        : task.progress >= 60
                        ? "#3B82F6"
                        : "#F59E0B",
                    transition: "width 0.3s",
                  }}
                />
              </div>
              <span className="text-xs ml-2">{task.progress}%</span>
            </TableCell>
            <TableCell>
              <div className="line-clamp-2 text-xs text-muted-foreground max-w-xs whitespace-normal break-words">
                {task.description}
              </div>
            </TableCell>
            <TableCell className="flex gap-2">
              <Button
                variant="secondary"
                onClick={() => onEdit && onEdit(task)}
              >
                <Pencil size={16} />
              </Button>
              <Button
                variant="destructive"
                onClick={() => onDelete && onDelete(task)}
              >
                <Trash2 size={16} />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
