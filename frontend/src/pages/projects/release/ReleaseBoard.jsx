"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter } from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import {
  MoreVertical,
  Clock,
  Maximize2,
  Plus,
  Pencil,
  Trash,
} from "lucide-react";
import { TypographyH5, TypographyH3 } from "@/components/custom/Typography";
import { DndContext, useDroppable } from "@dnd-kit/core";
import { ReleaseDialog } from "./ReleaseDialog";
import { DraggableTask } from "../tasks/Taskboard";

const initialRelease = {
  title: "Release 1",
  status: "Not Started",
  startDate: new Date(),
  endDate: new Date(),
};

const initialTasks = [
  {
    id: "1",
    title: "Task 1",
    description: "This is a short description for Task 1.",
    status: "To do",
    assigneeName: "Anisha Sahu",
    assigneeEmail: "anishasahu1107@gmail.com",
    priority: "mid",
    onTime: true,
    date: "11-07-2025",
    assignedHours: 10,
    billedHours: 5,
    extraHours: 1,
    progress: 60,
  },
  {
    id: "2",
    title: "Task 2",
    description: "This is a short description for Task 2.",
    status: "To do",
    assigneeName: "Anisha Sahu",
    assigneeEmail: "anishasahu1107@gmail.com",
    priority: "low",
    onTime: true,
    date: "11-07-2025",
    assignedHours: 8,
    billedHours: 4,
    extraHours: 0,
    progress: 30,
  },
];

export default function ReleaseBoard() {
  const [release, setRelease] = useState("");
  const [openReleases, setOpenReleases] = useState(["release"]);
  const [releaseTasks, setReleaseTasks] = useState([initialTasks[0]]);
  const [backlogTasks, setBacklogTasks] = useState([initialTasks[1]]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [releaseStarted, setReleaseStarted] = useState(false);

  const [releaseDialogOpen, setReleaseDialogOpen] = useState(false);
  const [editReleaseData, setEditReleaseData] = useState(null);
  const [currentRelease, setCurrentRelease] = useState(initialRelease);

  const toggleRelease = (id) => {
    setOpenReleases((prev) =>
      prev.includes(id) ? prev.filter((r) => r !== id) : [...prev, id]
    );
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over || !active) return;

    const taskId = active.id;
    const target = over.id;

    if (releaseTasks.find((t) => t.id === taskId) && target !== "backlog")
      return;
    if (backlogTasks.find((t) => t.id === taskId) && target !== "release")
      return;

    let task;
    if (releaseTasks.find((t) => t.id === taskId)) {
      task = releaseTasks.find((t) => t.id === taskId);
      setReleaseTasks((prev) => prev.filter((t) => t.id !== taskId));
    } else {
      task = backlogTasks.find((t) => t.id === taskId);
      setBacklogTasks((prev) => prev.filter((t) => t.id !== taskId));
    }

    if (task) {
      if (target === "release") {
        setReleaseTasks((prev) => [...prev, task]);
      } else if (target === "backlog") {
        setBacklogTasks((prev) => [...prev, task]);
      }
    }
  };

  const handleReleaseSave = (data) => {
    setCurrentRelease(data);
    setEditReleaseData(null);
    setReleaseDialogOpen(false);
  };

  const ReleaseSection = ({ id, title, timeLeft, stats, tasks, isRelease }) => {
    const { setNodeRef } = useDroppable({ id });
    return (
      <div className="bg-muted p-2 rounded-md shadow-sm">
        <div className="flex md:flex-row flex-col sm:items-center sm:justify-between">
          <div className="flex items-center gap-2">
            <TypographyH5>{title}</TypographyH5>
          </div>

          <div className="flex items-center gap-2">
            {releaseStarted && isRelease ? (
              <span className="bg-green-500 text-white px-2 py-0.5 rounded-full text-xs">
                Active Release
              </span>
            ) : (
              timeLeft && (
                <div className="flex items-center text-sm text-muted-foreground gap-1">
                  <Clock size={18} />
                  {timeLeft}
                </div>
              )
            )}

            {stats && (
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 bg-gray-400 rounded-full text-white text-xs flex items-center justify-center">
                  {stats.todo}
                </span>
                <span className="w-6 h-6 bg-blue-500 rounded-full text-white text-xs flex items-center justify-center">
                  {stats.inProgress}
                </span>
                <span className="w-6 h-6 bg-green-500 rounded-full text-white text-xs flex items-center justify-center">
                  {stats.done}
                </span>
              </div>
            )}

            {isRelease && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreVertical />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem
                    onClick={() => {
                      setEditReleaseData(currentRelease);
                      setReleaseDialogOpen(true);
                    }}
                  >
                    <Pencil />
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Trash />
                    Delete
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setDialogOpen(true)}>
                    Start Release
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}

            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => toggleRelease(id)}
            >
              <Maximize2 />
            </Button>
          </div>
        </div>

        {openReleases.includes(id) && (
          <div
            ref={setNodeRef}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-4"
          >
            {tasks.map((task) => (
              <DraggableTask key={task.id} task={task} onEdit={() => {}} />
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <Select onValueChange={(val) => setRelease(val)}>
          <SelectTrigger className="sm:w-[200px] w-full">
            <SelectValue placeholder="Select Release" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="active">Active Release</SelectItem>
            <SelectItem value="all">All Releases</SelectItem>
            <SelectItem value="future">Future Release</SelectItem>
            <SelectItem value="release">Release</SelectItem>
          </SelectContent>
        </Select>

        <Button
          className="w-full sm:w-fit"
          onClick={() => setReleaseDialogOpen(true)}
        >
          <Plus /> Create Release
        </Button>
      </div>

      <ReleaseDialog
        open={releaseDialogOpen}
        setOpen={setReleaseDialogOpen}
        initialData={editReleaseData}
        onSave={handleReleaseSave}
      />

      <DndContext onDragEnd={handleDragEnd}>
        <ReleaseSection
          id="release"
          title={currentRelease.title}
          isRelease
          timeLeft="-1 days remaining"
          stats={{ todo: 1, inProgress: 1, done: 1 }}
          tasks={releaseTasks}
        />
        <ReleaseSection
          id="backlog"
          title="Backlog Tasks"
          stats={{ todo: 1, inProgress: 0, done: 0 }}
          tasks={backlogTasks}
        />
      </DndContext>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <TypographyH3>Start Release?</TypographyH3>
          <p className="text-sm text-muted-foreground">
            Are you sure you want to start this release?
          </p>
          <DialogFooter>
            <Button variant="destructive" onClick={() => setDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={() => {
                setReleaseStarted(true);
                setDialogOpen(false);
              }}
            >
              Start
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
