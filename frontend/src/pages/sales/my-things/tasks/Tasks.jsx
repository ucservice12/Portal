"use client";

import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Pencil, Trash, Plus, Search } from "lucide-react";
import { StatusBadge } from "@/components/ui/StatusBadge";
import AddTasksDialog from "./AddTasksDialogs";

const initialTasks = [
  {
    title: "Task A",
    content: "Task A content",
    dueDate: "2025-06-18",
    completedDate: "2025-06-18",
    assignedTo: { name: "testforai50", email: "testforai50@gmail.com" },
    contact: "User",
    status: "Created",
    comments: [],
  },
  {
    title: "Task B",
    content: "Build marketing page",
    dueDate: "2025-06-20",
    completedDate: "2025-06-20",
    assignedTo: { name: "John Doe", email: "john@example.com" },
    contact: "Globex Inc",
    status: "In Progress",
    comments: [],
  },
];

function isSameDate(date1, date2) {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
}

export default function Tasks() {
  const [tasks, setTasks] = useState(initialTasks);
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("All");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const filteredTasks = useMemo(() => {
    const today = new Date();

    return tasks.filter((task) => {
      const due = new Date(task.dueDate);

      // Filter by title search
      const matchesSearch = task.title
        .toLowerCase()
        .includes(search.toLowerCase());

      // Filter by date
      let matchesDate = true;
      if (filterType === "Today") {
        matchesDate = isSameDate(due, today);
      } else if (filterType === "Future") {
        matchesDate = due > today && !isSameDate(due, today);
      } else if (filterType === "Past") {
        matchesDate = due < today && !isSameDate(due, today);
      }

      return matchesSearch && matchesDate;
    });
  }, [search, tasks, filterType]);

  const handleSave = (newTask) => {
    if (selectedTask) {
      setTasks((prev) =>
        prev.map((t) => (t.title === selectedTask.title ? { ...newTask } : t))
      );
    } else {
      setTasks((prev) => [...prev, newTask]);
    }
    setSelectedTask(null);
  };

  const handleEdit = (task) => {
    setSelectedTask(task);
    setDialogOpen(true);
  };

  const handleDelete = (task) => {
    setTasks((prev) => prev.filter((t) => t !== task));
  };

  return (
    <>
      <div className="flex justify-between flex-col gap-4 sm:flex-row sm:items-center mb-4">
        <div className="flex flex-col sm:flex-row gap-2">
          <div className="relative">
            <Search className="text-muted-foreground w-4 absolute left-2 top-1.5" />
            <Input
              placeholder="Search Task..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="max-w-sm pl-8"
            />
          </div>

          {/* Filter Select */}
          <Select
            value={filterType}
            onValueChange={(value) => setFilterType(value)}
          >
            <SelectTrigger className="sm:w-[250px] w-full">
              <SelectValue placeholder="Select a filter" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Due Date Filter</SelectLabel>
                <SelectItem value="All">All</SelectItem>
                <SelectItem value="Today">Today</SelectItem>
                <SelectItem value="Future">Future</SelectItem>
                <SelectItem value="Past">Past</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <Button
          onClick={() => {
            setSelectedTask(null);
            setDialogOpen(true);
          }}
        >
          <Plus className="mr-1" /> Add Task
        </Button>
      </div>

      <Table>
        <TableHeader className="bg-gray-100">
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Assigned Email</TableHead>
            <TableHead>Assigned Name</TableHead>
            <TableHead>Contact</TableHead>
            <TableHead>Due Date</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredTasks.map((task, index) => (
            <TableRow key={index}>
              <TableCell>{task.title}</TableCell>
              <TableCell>
                <StatusBadge status={task.status} />
              </TableCell>
              <TableCell>{task.assignedTo.email}</TableCell>
              <TableCell>{task.assignedTo.name}</TableCell>
              <TableCell>{task.contact}</TableCell>
              <TableCell>
                {new Date(task.dueDate).toLocaleDateString()}
              </TableCell>
              <TableCell className="flex justify-end gap-2 border-none">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleEdit(task)}
                >
                  <Pencil className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-red-500"
                  onClick={() => handleDelete(task)}
                >
                  <Trash className="w-4 h-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Task Dialog */}
      <AddTasksDialog
        open={dialogOpen}
        onClose={() => {
          setDialogOpen(false);
          setSelectedTask(null);
        }}
        onSave={handleSave}
        initialData={selectedTask}
      />
    </>
  );
}
