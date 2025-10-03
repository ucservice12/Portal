import { LogHoursBoard } from "../loghours/Loghoursboard";

export default function MyTaskLogHour() {
  const initialTasks = [
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
  ];

  const taskOptions = ["Task 1", "Task 2", "Task 3", "Task 4"];
  const projectOptions = ["Project Alpha", "Project Beta", "Project Gamma"];

  const approver = {
    name: "anishasahu1107",
    email: "anishasahu1107@gmail.com",
    date: "Today",
  };

  return (
    <LogHoursBoard
      initialTasks={initialTasks}
      taskOptions={taskOptions}
      projectOptions={projectOptions}
      approver={approver}
    />
  );
}
