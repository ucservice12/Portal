import { ProjectTabs } from "@/components/custom/tabs/Tabs";
import Projects from "@/pages/projects/Projects";

export const projectRoutes = [
  {
    path: "project",
    element: <Projects />,
    roles: ["admin", "manager"],
  },
  {
    path: "project/:id/*",
    element: <ProjectTabs />,
    roles: ["admin", "manager"],
    children: [
      {
        path: "dashboard",
        element: <h1>Task Dashboard</h1>,
        roles: ["admin", "manager"],
      },
      {
        path: "team-logs",
        element: <h1>Team Logs</h1>,
        roles: ["admin", "manager"],
      },
      {
        path: "tasks",
        element: <h1>Task Board</h1>,
        roles: ["admin", "manager"],
      },
      {
        path: "my-log-hours",
        element: <h1>My Task Log Hours</h1>,
        roles: ["admin", "manager"],
      },
      {
        path: "details",
        element: <h1>Project Info</h1>,
        roles: ["admin", "manager"],
      },
      {
        path: "timesheet",
        element: <h1>Timesheet</h1>,
        roles: ["admin", "manager"],
      },
      {
        path: "timeline",
        element: <h1>Timeline</h1>,
        roles: ["admin", "manager"],
      },
      {
        path: "team",
        element: <h1>Team Members</h1>,
        roles: ["admin", "manager"],
      },
      {
        path: "planning",
        element: <h1>Sprint Board</h1>,
        roles: ["admin", "manager"],
      },
      {
        path: "releases",
        element: <h1>Release Board</h1>,
        roles: ["admin", "manager"],
      },
    ],
  },
];
