import { ProjectTabs } from "@/components/custom/tabs/Tabs";
import Projects from "@/pages/projects/project/Projects";
import SprintBoard from "@/pages/projects/sprints/SprintBoard";
import TaskDashboardOverview from "@/pages/projects/tasks/TaskDashboardOverview";
import TaskBoard from "@/pages/projects/tasks/Taskboard";
import TeamLogs from "@/pages/projects/teams/TeamLogs";
import TeamMembersBoard from "@/pages/projects/teams/TeamMembersBoard";
import MyTaskLogHour from "@/pages/projects/tasks/MyTaskLogHour";
import ProjectInfo from "@/pages/projects/project/ProjectInfo";
import ReleaseBoard from "@/pages/projects/release/ReleaseBoard";
import Timesheet from "@/pages/projects/time-management/Timesheet";

export const projectRoutes = [
  {
    path: "projects",
    element: <Projects />,
    roles: ["admin", "manager"],
  },
  {
    path: "projects/:id/*",
    element: <ProjectTabs />,
    roles: ["admin", "manager"],
    children: [
      {
        path: "dashboard",
        element: <TaskDashboardOverview />,
        roles: ["admin", "manager"],
      },
      {
        path: "team-logs",
        element: <TeamLogs />,
        roles: ["admin", "manager"],
      },
      {
        path: "tasks",
        element: <TaskBoard />,
        roles: ["admin", "manager"],
      },
      {
        path: "my-log-hours",
        element: <MyTaskLogHour />,
        roles: ["admin", "manager"],
      },
      {
        path: "details",
        element: <ProjectInfo />,
        roles: ["admin", "manager"],
      },
      {
        path: "timesheet",
        element: <Timesheet />,
        roles: ["admin", "manager"],
      },
      {
        path: "timeline",
        element: <h1>Timeline</h1>,
        roles: ["admin", "manager"],
      },
      {
        path: "team",
        element: <TeamMembersBoard />,
        roles: ["admin", "manager"],
      },
      {
        path: "planning",
        element: <SprintBoard />,
        roles: ["admin", "manager"],
      },
      {
        path: "releases",
        element: <ReleaseBoard />,
        roles: ["admin", "manager"],
      },
    ],
  },
];
