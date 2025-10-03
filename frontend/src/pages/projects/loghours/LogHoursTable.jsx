"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ArrowDownRight, EllipsisVertical, Pencil, Plus } from "lucide-react";
import { TypographyH6 } from "@/components/custom/Typography";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectValue,
  SelectItem,
} from "@/components/ui/select";
import { useLocation } from "react-router-dom";

export function LogHoursTable({
  tasks,
  weekDates,
  projectOptions,
  taskOptions,
  onProjectChange,
  onTaskChange,
  onEditLog,
  onAddLog,
  onTakeAction,
  onApprove,
}) {
  const location = useLocation();
  const pathname = location.pathname;
  const hideProject =
    pathname.endsWith("my-log-hours") || pathname.endsWith("team-logs");

  return (
    <Table>
      <TableHeader>
        <TableRow>
          {!hideProject && (
            <TableHead className="whitespace-normal break-words max-w-[180px]">
              Project Name
            </TableHead>
          )}
          <TableHead className="whitespace-normal break-words max-w-[180px]">
            Task Name
          </TableHead>
          <TableHead className="whitespace-normal break-words text-center">
            Assigned Hours
          </TableHead>
          <TableHead className="whitespace-normal break-words text-center">
            Billed Hours
          </TableHead>
          <TableHead className="whitespace-normal break-words text-center">
            Extra Hours
          </TableHead>
          {weekDates.map((d, idx) => (
            <TableHead
              key={idx}
              className="whitespace-normal break-words text-center"
            >
              {d.label}
            </TableHead>
          ))}
          <TableHead className="whitespace-normal break-words text-center">
            Actions
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {tasks?.map((t, taskIdx) => (
          <TableRow key={taskIdx}>
            {/* Project Name */}
            {!hideProject && (
              <TableCell className="break-words whitespace-normal max-w-[180px]">
                <Select
                  value={t.project}
                  onValueChange={(val) => onProjectChange(taskIdx, val)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {projectOptions.map((proj, idx) => (
                      <SelectItem key={idx} value={proj}>
                        {proj}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </TableCell>
            )}
            {/* Task Name */}
            <TableCell className="break-words whitespace-normal max-w-[180px]">
              <Select
                value={t.task}
                onValueChange={(val) => onTaskChange(taskIdx, val)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {taskOptions.map((task, idx) => (
                    <SelectItem key={idx} value={task}>
                      {task}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </TableCell>
            <TableCell className="text-center">
              {t.assigned.toFixed(2)}
            </TableCell>
            <TableCell className="text-center">{t.billed.toFixed(2)}</TableCell>
            <TableCell className="text-center">{t.extra.toFixed(2)}</TableCell>
            {weekDates.map((d, idx) => {
              const key = d.raw;
              const entry = t.hours[key];
              const hasEntry = !!entry;
              return (
                <TableCell key={idx} className="text-center">
                  <div className="flex items-center justify-center gap-1 bg-red-100 p-1 rounded text-sm">
                    <TypographyH6 className="text-center break-words">
                      {entry?.value?.toFixed(2) || "0.00"}
                    </TypographyH6>
                    {hasEntry ? (
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            size="xs"
                            variant="ghost"
                            onClick={() => onEditLog(taskIdx, key)}
                          >
                            <EllipsisVertical />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem
                            onClick={() => onEditLog(taskIdx, key)}
                          >
                            <Pencil /> Edit Log
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            onClick={() => onTakeAction(taskIdx, key)}
                          >
                            <ArrowDownRight /> Take Action
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    ) : (
                      <Button
                        size="xs"
                        variant="ghost"
                        onClick={() => onAddLog(taskIdx, key)}
                      >
                        <Plus />
                      </Button>
                    )}
                  </div>
                </TableCell>
              );
            })}
            <TableCell className="text-center">
              <Button size="xs" onClick={() => onApprove(taskIdx)}>
                Approve
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
