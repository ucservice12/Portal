import { useState, useEffect } from "react";
import { format, startOfMonth, addDays, startOfWeek, parse } from "date-fns";
import { LoghoursDialog } from "./LoghoursDialog";
import { LogHourApproveRejectDialog } from "./LogHourApproveRejectDialog";
import { LogHoursTable } from "./LogHoursTable";
import { MonthWeekSelectors } from "./MonthWeekSelectors";

export function LogHoursBoard({
  initialTasks,
  taskOptions,
  projectOptions,
  approver,
}) {
  const [month, setMonth] = useState(new Date());
  const [selectedWeekStart, setSelectedWeekStart] = useState(null);
  const [tasks, setTasks] = useState(initialTasks);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [approveOpen, setApproveOpen] = useState(false);
  const [selectedDialogTask, setSelectedDialogTask] = useState("");
  const [selectedDialogDate, setSelectedDialogDate] = useState("");
  const [dialogTaskIndex, setDialogTaskIndex] = useState(null);
  const [approveTaskIndex, setApproveTaskIndex] = useState(null);
  const [approveDate, setApproveDate] = useState(null);

  const firstOfMonth = startOfMonth(month);
  const weeks = [];
  for (let i = 0; i < 6; i++) {
    const start = startOfWeek(addDays(firstOfMonth, i * 7), {
      weekStartsOn: 1,
    });
    if (
      start.getMonth() === month.getMonth() ||
      addDays(start, 6).getMonth() === month.getMonth()
    ) {
      weeks.push(start);
    }
  }

  useEffect(() => {
    if (weeks.length > 0) {
      setSelectedWeekStart(weeks[0]);
    }
  }, [month]);

  const weekDates = selectedWeekStart
    ? Array.from({ length: 7 }, (_, i) => {
        const d = addDays(selectedWeekStart, i);
        return {
          label: format(d, "EEE dd/MM"),
          raw: format(d, "yyyy-MM-dd"),
        };
      })
    : [];

  const handleTaskChange = (index, value) => {
    const updated = [...tasks];
    updated[index].task = value;
    setTasks(updated);
  };

  const handleProjectChange = (index, value) => {
    const updated = [...tasks];
    updated[index].project = value;
    setTasks(updated);
  };

  const addHours = (index, dateStr, hours, description = "") => {
    const updated = [...tasks];
    updated[index].hours[dateStr] = { value: hours, description };
    setTasks(updated);
  };

  const handleEditLog = (taskIdx, dateStr) => {
    setSelectedDialogTask(tasks[taskIdx].task);
    setSelectedDialogDate(dateStr);
    setDialogTaskIndex(taskIdx);
    setDialogOpen(true);
  };

  const handleAddLog = (taskIdx, dateStr) => {
    setSelectedDialogTask(tasks[taskIdx].task);
    setSelectedDialogDate(dateStr);
    setDialogTaskIndex(taskIdx);
    setDialogOpen(true);
  };

  const handleTakeAction = (taskIdx, dateStr) => {
    setApproveTaskIndex(taskIdx);
    setApproveDate(dateStr);
    setApproveOpen(true);
  };

  const handleApprove = (taskIdx) => {
    setApproveTaskIndex(taskIdx);
    setApproveDate(null);
    setApproveOpen(true);
  };

  return (
    <div className="space-y-6 mt-4 sm:mt-8">
      <MonthWeekSelectors
        month={month}
        setMonth={setMonth}
        weeks={weeks}
        selectedWeekStart={selectedWeekStart}
        setSelectedWeekStart={setSelectedWeekStart}
      />

      <LogHoursTable
        tasks={tasks}
        weekDates={weekDates}
        projectOptions={projectOptions}
        taskOptions={taskOptions}
        onProjectChange={handleProjectChange}
        onTaskChange={handleTaskChange}
        onEditLog={handleEditLog}
        onAddLog={handleAddLog}
        onTakeAction={handleTakeAction}
        onApprove={handleApprove}
      />

      <LoghoursDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        selectedTask={selectedDialogTask}
        selectedDate={selectedDialogDate}
        onAddHours={(hrs, desc) => {
          if (dialogTaskIndex !== null && selectedDialogDate) {
            addHours(dialogTaskIndex, selectedDialogDate, hrs, desc);
          }
        }}
        existingLog={
          dialogTaskIndex !== null
            ? tasks[dialogTaskIndex]?.hours?.[selectedDialogDate]
            : null
        }
      />

      <LogHourApproveRejectDialog
        open={approveOpen}
        onOpenChange={setApproveOpen}
        logData={
          approveTaskIndex !== null
            ? approveDate
              ? [
                  {
                    date: approveDate,
                    description:
                      tasks[approveTaskIndex]?.hours?.[approveDate]
                        ?.description,
                    hours: tasks[approveTaskIndex]?.hours?.[approveDate]?.value,
                  },
                ]
              : Object.entries(tasks[approveTaskIndex]?.hours || {}).map(
                  ([date, data]) => ({
                    date,
                    description: data.description,
                    hours: data.value,
                  })
                )
            : []
        }
        approver={approver}
        onApprove={() => setApproveOpen(false)}
        onReject={() => setApproveOpen(false)}
      />
    </div>
  );
}
