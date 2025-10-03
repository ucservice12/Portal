import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { TypographyMuted, TypographyH5 } from "@/components/custom/Typography";
import { User } from "lucide-react";
import { IoPersonSharp } from "react-icons/io5";
import { LogHoursBoard } from "@/pages/projects/loghours/LogHoursBoard";

const USER_TYPES = [
  "EMPLOYEE",
  "HR",
  "HRADMIN",
  "MANAGER",
  "MARKETING",
  "SALES",
];

// All employees and their data
const employees = [
  {
    id: "emp1",
    name: "User",
    email: "User@gmail.com",
    status: "Confirmed",
    roles: USER_TYPES,
    tasks: [
      {
        id: 1,
        project: "Project Alpha",
        task: "Task 1",
        assigned: 8.5,
        billed: 9.75,
        extra: 1.25,
        hours: {
          "2025-07-14": { value: 4.0, description: "Initial work" },
          "2025-07-20": { value: 5.75, description: "Continued task" },
        },
      },
    ],
  },
  {
    id: "emp2",
    name: "Employee Two",
    email: "employee2@example.com",
    status: "Pending",
    roles: ["EMPLOYEE", "SALES"],
    tasks: [
      {
        id: 2,
        project: "Project Beta",
        task: "Task 2",
        assigned: 7.0,
        billed: 7.5,
        extra: 0.5,
        hours: {
          "2025-07-15": { value: 3.5, description: "Designing" },
          "2025-07-19": { value: 4.0, description: "Client call" },
        },
      },
    ],
  },
];

const taskOptions = ["Task 1", "Task 2", "Task 3", "Task 4"];
const projectOptions = ["Project Alpha", "Project Beta", "Project Gamma"];
const approver = {
  name: "anishasahu1107",
  email: "anishasahu1107@gmail.com",
  date: "Today",
};

export default function TeamLogs() {
  const [selectedId, setSelectedId] = useState(employees[0].id);
  const selected = employees.find((e) => e.id === selectedId);

  return (
    <>
      <Select value={selectedId} onValueChange={setSelectedId}>
        <SelectTrigger className="sm:max-w-xs w-full">
          <SelectValue placeholder="Select employee" />
        </SelectTrigger>
        <SelectContent>
          {employees.map((emp) => (
            <SelectItem key={emp.id} value={emp.id}>
              {emp.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <div className="space-y-2 rounded-xl border py-4 bg-white shadow-sm max-w-xs">
        <div className="flex items-center gap-2 px-4">
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-muted">
            <IoPersonSharp className="text-gray-600" />
          </div>
          <div>
            <TypographyH5>{selected.name}</TypographyH5>
            <TypographyMuted className="text-xs">
              {selected.email}
            </TypographyMuted>
          </div>
        </div>
        <div className="flex flex-wrap gap-4 text-xs mt-6 px-4 text-gray-600">
          {selected.roles.map((role, i) => (
            <div className="flex items-center gap-1" key={i}>
              <User size={16} /> {role}
            </div>
          ))}
        </div>
        <div className="border-t pt-3 mt-2 px-4">
          <StatusBadge status={selected.status} />
        </div>
      </div>

      <LogHoursBoard
        initialTasks={selected.tasks}
        taskOptions={taskOptions}
        projectOptions={projectOptions}
        approver={approver}
      />
    </>
  );
}
