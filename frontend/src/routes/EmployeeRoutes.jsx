import {
  EmployeeTabs,
  EmployeeCalenderTabs,
  EmployeeGoalsTabs,
} from "@/components/custom/tabs/Tabs";
import Tasks from "@/pages/employee/Tasks";
import Goals from "@/pages/employee/Goals";
import LogHours from "@/pages/employee/LogHours";
import Attendance from "@/pages/employee/Attendance";
import Dashboard from "@/pages/dashboard/Dashboard";
import Profile from "@/pages/employee/setting/Profile";
import Inventory from "@/pages/employee/setting/Inventory";
import Holiday from "@/pages/employee/setting/Holiday";
import Documents from "@/pages/employee/setting/Documents";
import EmployeeHandbook from "@/pages/employee/setting/EmployeeHandbook";
import LeavePolicy from "@/pages/employee/setting/LeavePolicy";
import Reimbursements from "@/pages/employee/setting/Reimbursements";

export const employeeRoutes = [
  {
    path: "/dashboard",
    element: <Dashboard />,
    roles: ["employee", "hr", "admin", "superadmin"],
  },
  {
    path: "employee/tasks/*",
    element: <Tasks />,
    roles: ["employee", "hr", "admin"],
  },
  {
    path: "employee/loghours/*",
    element: <LogHours />,
    roles: ["employee", "hr", "admin"],
  },
  {
    path: "employee/goals/*",
    element: <EmployeeGoalsTabs />,
    roles: ["employee", "hr", "admin"],
    children: [
      {
        path: "dashboard",
        element: <Goals />,
        roles: ["employee", "hr", "admin"],
      },
      {
        path: "goals-list",
        element: <h1>Goals List</h1>,
        roles: ["employee", "hr", "admin"],
      },
      {
        path: "achievement",
        element: <h1>Achievement</h1>,
        roles: ["employee", "hr", "admin"],
      },
    ],
  },
  {
    path: "employee/chat",
    element: <h1>Chat Widget</h1>,
    roles: ["employee", "hr", "admin"],
  },
  {
    path: "employee/attendance",
    element: <Attendance />,
    roles: ["employee", "hr", "admin"],
  },
  {
    path: "employee/calendar/*",
    element: <EmployeeCalenderTabs />,
    roles: ["employee", "hr", "admin"],
    children: [
      {
        path: "leaves",
        element: <h1>Leaves Overview</h1>,
        roles: ["employee", "hr", "admin"],
      },
      {
        path: "c-offs",
        element: <h1>C-Off Leaves</h1>,
        roles: ["employee", "hr", "admin"],
      },
    ],
  },
  {
    path: "employee/settings/*",
    element: <EmployeeTabs />,
    roles: ["employee", "hr", "admin"],
    children: [
      {
        path: "profile",
        element: <Profile />,
        roles: ["employee", "hr", "admin"],
      },
      {
        path: "inventory",
        element: <Inventory />,
        roles: ["employee", "hr", "admin"],
      },
      {
        path: "documents",
        element: <Documents />,
        roles: ["employee", "hr", "admin"],
      },
      {
        path: "org-holidays",
        element: <Holiday />,
        roles: ["employee", "hr", "admin"],
      },
      {
        path: "employee-handbook",
        element: <EmployeeHandbook />,
        roles: ["employee", "hr", "admin"],
      },
      {
        path: "leaves-policy",
        element: <LeavePolicy />,
        roles: ["employee", "hr", "admin"],
      },
      {
        path: "reimbursements",
        element: <Reimbursements />,
        roles: ["employee", "hr", "admin"],
      },
    ],
  },
];
