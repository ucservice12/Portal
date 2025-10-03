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
import { MoreVertical, Clock, Maximize2, Plus } from "lucide-react";
import { TypographyH5, TypographyH3 } from "@/components/custom/Typography";

import { DndContext, useDroppable } from "@dnd-kit/core";
import { SprintDialog } from "@/pages/projects/sprints/SprintDialog";
import { DraggableTask } from "@/pages/projects/tasks/TaskBoard";

const initialSprint = {
  title: "Sprint 1",
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

export default function SprintBoard() {
  const [taskStatus, setTaskStatus] = useState("");
  const [sprint, setSprint] = useState("");
  const [openSprints, setOpenSprints] = useState(["sprint"]);
  const [sprintTasks, setSprintTasks] = useState([initialTasks[0]]);
  const [backlogTasks, setBacklogTasks] = useState([initialTasks[1]]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [sprintStarted, setSprintStarted] = useState(false);

  // Sprint dialog state for create/edit
  const [sprintDialogOpen, setSprintDialogOpen] = useState(false);
  const [editSprintData, setEditSprintData] = useState(null);

  // Example: only one sprint for demo
  const [currentSprint, setCurrentSprint] = useState(initialSprint);

  const toggleSprint = (id) => {
    setOpenSprints((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over || !active) return;

    const taskId = active.id;
    const target = over.id;

    // Prevent dragging between sprints
    if (sprintTasks.find((t) => t.id === taskId) && target !== "backlog")
      return;
    if (backlogTasks.find((t) => t.id === taskId) && target !== "sprint")
      return;

    let task;
    if (sprintTasks.find((t) => t.id === taskId)) {
      task = sprintTasks.find((t) => t.id === taskId);
      setSprintTasks((prev) => prev.filter((t) => t.id !== taskId));
    } else {
      task = backlogTasks.find((t) => t.id === taskId);
      setBacklogTasks((prev) => prev.filter((t) => t.id !== taskId));
    }

    if (task) {
      if (target === "sprint") {
        setSprintTasks((prev) => [...prev, task]);
      } else if (target === "backlog") {
        setBacklogTasks((prev) => [...prev, task]);
      }
    }
  };

  // Handle save from SprintDialog (edit or create)
  const handleSprintSave = (data) => {
    setCurrentSprint(data);
    setEditSprintData(null);
    setSprintDialogOpen(false);
  };

  // Sprint section
  const SprintSection = ({ id, title, timeLeft, stats, tasks, isSprint }) => {
    const { setNodeRef } = useDroppable({ id });
    return (
      <div className="bg-muted p-2 rounded-md shadow-sm">
        <div className="flex md:flex-row flex-col sm:items-center sm:justify-between">
          <div className="flex items-center gap-2">
            <TypographyH5>{title}</TypographyH5>
          </div>

          <div className="flex items-center gap-2">
            {sprintStarted && isSprint ? (
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

            {isSprint && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreVertical />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem
                    onClick={() => {
                      setEditSprintData(currentSprint);
                      setSprintDialogOpen(true);
                    }}
                  >
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem>Delete</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setDialogOpen(true)}>
                    Start Sprint
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}

            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => toggleSprint(id)}
            >
              <Maximize2 />
            </Button>
          </div>
        </div>

        {openSprints.includes(id) && (
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
        <div className="flex sm:flex-row flex-col gap-4 w-full sm:w-auto">
          <Select onValueChange={(val) => setTaskStatus(val)}>
            <SelectTrigger className="sm:w-[200px] w-full">
              <SelectValue placeholder="Select Task Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="closed">Closed</SelectItem>
              <SelectItem value="delivered">Delivered</SelectItem>
              <SelectItem value="inprogress">In Progress</SelectItem>
              <SelectItem value="created">Created</SelectItem>
              <SelectItem value="onhold">On Hold</SelectItem>
            </SelectContent>
          </Select>

          <Select onValueChange={(val) => setSprint(val)}>
            <SelectTrigger className="sm:w-[200px] w-full">
              <SelectValue placeholder="Select Sprint" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="active">Active Sprint</SelectItem>
              <SelectItem value="all">All Sprints</SelectItem>
              <SelectItem value="future">Future Sprint</SelectItem>
              <SelectItem value="sprint">Sprint</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <SprintDialog
          trigger={
            <Button className="w-full sm:w-fit">
              <Plus /> Create
            </Button>
          }
          onSave={handleSprintSave}
        />
      </div>

      {/* Sprint Edit Dialog */}
      <SprintDialog
        trigger={""}
        open={sprintDialogOpen}
        setOpen={setSprintDialogOpen}
        initialData={editSprintData}
        onSave={handleSprintSave}
      />

      <DndContext onDragEnd={handleDragEnd}>
        <SprintSection
          id="sprint"
          title={currentSprint.title}
          isSprint
          timeLeft="-1 days remaining"
          stats={{ todo: 1, inProgress: 1, done: 1 }}
          tasks={sprintTasks}
        />
        <SprintSection
          id="backlog"
          title="Backlog Tasks"
          stats={{ todo: 1, inProgress: 0, done: 0 }}
          tasks={backlogTasks}
        />
      </DndContext>

      {/* Confirmation Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <TypographyH3>Start Sprint?</TypographyH3>
          <p className="text-sm text-muted-foreground">
            Are you sure you want to start this sprint?
          </p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={() => {
                setSprintStarted(true);
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
