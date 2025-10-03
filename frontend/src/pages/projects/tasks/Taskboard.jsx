import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { DndContext, useDraggable, useDroppable } from "@dnd-kit/core";
import { IoPersonSharp } from "react-icons/io5";
import { TypographyH4, TypographyMuted } from "@/components/custom/Typography";
import { GiDiamonds } from "react-icons/gi";
import { Plus } from "lucide-react";
import { CiIndent } from "react-icons/ci";
import { GoListUnordered } from "react-icons/go";
import { TaskTable } from "./TaskTable";
import TaskDialog from "./TaskDialog";
import TaskFilterPanel from "./TaskFilterPanel";

const PRIORITY_COLORS = {
  high: "#EF4444",
  medium: "#F59E0B",
  mid: "#F59E0B",
  low: "#10B981",
  default: "#6B7280",
};

const statuses = ["To do", "In Progress", "Done", "Testing"];

export const mockTasks = [
  {
    id: "1",
    title: "Task 1",
    description:
      "This is a short description for Task 1. It should be clamped to two lines in the card for better readability.",
    status: "In Progress",
    assignee: "anishasahu1107",
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
    description:
      "Task 2 has a longer description that will be clamped. This helps keep the card layout clean and consistent across all tasks.",
    status: "To do",
    assignee: "anishasahu1107",
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
  {
    id: "3",
    title: "Task 3",
    description:
      "Testing task with a medium priority and some extra hours billed.",
    status: "Testing",
    assignee: "anishasahu1107",
    assigneeName: "Anisha Sahu",
    assigneeEmail: "anishasahu1107@gmail.com",
    priority: "medium",
    onTime: false,
    date: "11-07-2025",
    assignedHours: 12,
    billedHours: 12,
    extraHours: 2,
    progress: 100,
  },
  {
    id: "4",
    title: "Task 4",
    description:
      "High priority task that is already done. This description is also clamped.",
    status: "Done",
    assignee: "anishasahu1107",
    assigneeName: "Anisha Sahu",
    assigneeEmail: "anishasahu1107@gmail.com",
    priority: "high",
    onTime: true,
    date: "11-07-2025",
    assignedHours: 6,
    billedHours: 6,
    extraHours: 0,
    progress: 100,
  },
];

export default function TaskBoard() {
  const [tasks, setTasks] = useState(mockTasks);
  const [filteredTasks, setFilteredTasks] = useState(mockTasks);
  const [view, setView] = useState("board");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editTask, setEditTask] = useState(null);

  const [searchValue, setSearchValue] = useState("");
  const [selectedAssignees, setSelectedAssignees] = useState([]);
  const [selectedStatuses, setSelectedStatuses] = useState([]);
  const [selectedPriorities, setSelectedPriorities] = useState([]);
  const [delayedStatus, setDelayedStatus] = useState("");
  const [filterBy, setFilterBy] = useState("Tasks");

  useEffect(() => {
    let result = [...tasks];
    if (searchValue) {
      result = result.filter((t) =>
        t.title.toLowerCase().includes(searchValue.toLowerCase())
      );
    }
    if (selectedAssignees.length) {
      result = result.filter((t) => selectedAssignees.includes(t.assignee));
    }
    if (selectedStatuses.length) {
      result = result.filter((t) => selectedStatuses.includes(t.status));
    }
    if (selectedPriorities.length) {
      result = result.filter((t) => selectedPriorities.includes(t.priority));
    }
    if (delayedStatus === "Delayed") {
      result = result.filter((t) => !t.onTime);
    } else if (delayedStatus === "On Time") {
      result = result.filter((t) => t.onTime);
    }
    setFilteredTasks(result);
  }, [
    tasks,
    searchValue,
    selectedAssignees,
    selectedStatuses,
    selectedPriorities,
    delayedStatus,
  ]);

  const handleToggle = (array, setArray, value) => {
    setArray((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      setTasks((prev) =>
        prev.map((task) =>
          task.id === active.id ? { ...task, status: over.id } : task
        )
      );
    }
  };

  const handleSaveTask = (data) => {
    if (editTask) {
      setTasks((prev) =>
        prev.map((task) =>
          task.id === editTask.id ? { ...task, ...data } : task
        )
      );
    } else {
      setTasks((prev) => [...prev, { ...data, id: String(Date.now()) }]);
    }
    setEditTask(null);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-2 items-end">
        <Button variant="default" onClick={() => setDialogOpen(true)}>
          <Plus /> Add Task
        </Button>
        <TaskFilterPanel
          searchValue={searchValue}
          onSearchChange={setSearchValue}
          assignees={[...new Set(tasks.map((t) => t.assignee))]}
          selectedAssignees={selectedAssignees}
          onToggleAssignee={(val) =>
            handleToggle(selectedAssignees, setSelectedAssignees, val)
          }
          statuses={[...new Set(tasks.map((t) => t.status))]}
          selectedStatuses={selectedStatuses}
          onToggleStatus={(val) =>
            handleToggle(selectedStatuses, setSelectedStatuses, val)
          }
          priorities={[...new Set(tasks.map((t) => t.priority))]}
          selectedPriorities={selectedPriorities}
          onTogglePriority={(val) =>
            handleToggle(selectedPriorities, setSelectedPriorities, val)
          }
          delayedStatus={delayedStatus}
          onChangeDelayedStatus={setDelayedStatus}
          filterBy={filterBy}
          onChangeFilterBy={setFilterBy}
        />
        <div className="flex gap-2">
          <Button
            variant={view === "board" ? "default" : "outline"}
            onClick={() => setView("board")}
          >
            {" "}
            <CiIndent /> Board{" "}
          </Button>
          <Button
            variant={view === "list" ? "default" : "outline"}
            onClick={() => setView("list")}
          >
            {" "}
            <GoListUnordered /> List{" "}
          </Button>
        </div>
      </div>

      <TaskDialog
        open={dialogOpen}
        setOpen={setDialogOpen}
        onSave={handleSaveTask}
        initialData={editTask}
        isEdit={!!editTask}
      />

      {view === "board" ? (
        <DndContext onDragEnd={handleDragEnd}>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {statuses.map((status) => (
              <DroppableColumn
                key={status}
                id={status}
                title={status}
                count={filteredTasks.filter((t) => t.status === status).length}
              >
                {filteredTasks
                  .filter((t) => t.status === status)
                  .map((task) => (
                    <DraggableTask
                      key={task?.id}
                      task={task}
                      onEdit={setEditTask}
                    />
                  ))}
              </DroppableColumn>
            ))}
          </div>
        </DndContext>
      ) : (
        <TaskTable
          tasks={filteredTasks}
          onEdit={setEditTask}
          onDelete={(task) =>
            setTasks((prev) => prev.filter((t) => t.id !== task.id))
          }
        />
      )}
    </div>
  );
}

function DroppableColumn({ id, title, children, count }) {
  const { setNodeRef } = useDroppable({ id });
  return (
    <div ref={setNodeRef}>
      <div className="flex gap-2 items-center mb-2">
        <TypographyH4 className="font-medium">{title}</TypographyH4>
        <span className="text-xs bg-secondary flex justify-center items-center w-7 h-7 rounded-full">
          {count}
        </span>
      </div>
      <div className="space-y-2">{children}</div>
    </div>
  );
}

export function DraggableTask({ task, onEdit }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task?.id,
  });
  const style = transform
    ? { transform: `translate3d(${transform.x}px, ${transform.y}px, 0)` }
    : undefined;

  const priorityKey = (task?.priority || "default").toLowerCase();
  const diamondColor = PRIORITY_COLORS[priorityKey] || PRIORITY_COLORS.default;
  const displayPriority =
    priorityKey.charAt(0).toUpperCase() + priorityKey.slice(1);
  const progressColor =
    task?.progress === 100
      ? "#10B981"
      : task.progress >= 60
      ? "#3B82F6"
      : "#F59E0B";

  return (
    <Card
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className="cursor-move p-4 flex flex-col gap-2"
    >
      <div className="flex justify-between items-center mb-1">
        <StatusBadge status={task?.status} />
        <span className="text-sm flex items-center gap-1 mt-1 sm:mt-0">
          <GiDiamonds size={14} color={diamondColor} />
          <span className="text-xs" style={{ color: diamondColor }}>
            {displayPriority}
          </span>
        </span>
        <TypographyMuted className="text-xs">{task?.date}</TypographyMuted>
      </div>
      <TypographyH4
        className="cursor-pointer line-clamp-1 text-primary text-sm capitalize"
        onClick={() => onEdit(task)}
      >
        {task?.title}
      </TypographyH4>
      <TypographyMuted className="text-xs line-clamp-2">
        {task?.description}
      </TypographyMuted>
      <div className="flex flex-wrap gap-2 mt-1">
        <span className="bg-blue-50 text-blue-700 rounded px-2 py-0.5 text-xs">
          Assigned: {task?.assignedHours}h
        </span>
        <span className="bg-green-50 text-green-700 rounded px-2 py-0..5 text-xs">
          Billed: {task?.billedHours}h
        </span>
        <span className="bg-yellow-50 text-yellow-700 rounded px-2 py-0.5 text-xs">
          Extra: {task?.extraHours}h
        </span>
      </div>
      <div className="w-full h-2 bg-gray-200 rounded mt-1">
        <div
          className="h-2 rounded"
          style={{
            width: `${task?.progress}%`,
            background: progressColor,
            transition: "width 0.3s",
          }}
        />
      </div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-2 text-sm gap-2">
        <div className="flex items-center gap-2">
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center"
            style={{ background: diamondColor + "22" }}
          >
            <IoPersonSharp className="text-gray-600" />
          </div>
          <div>
            <div className="font-medium text-xs text-gray-900">
              {task?.assigneeName}
            </div>
            <TypographyMuted className="text-xs">
              {task?.assigneeEmail}
            </TypographyMuted>
          </div>
        </div>
      </div>
    </Card>
  );
}
