import {
  AdminEmployeeManageTabs,
  AdminSelectedEmployeeTabs,
  OrganazationTabs,
  AttendanceTabs,
} from "@/components/custom/tabs/Tabs";

//
import Inventory from "@/pages/administration/inventory/Inventory";
import Members from "@/pages/administration/employees/members/Members";
import Invitations from "@/pages/administration/employees/Invitations";
import Permissions from "@/pages/administration/employees/Permissions";

// settings
import Branding from "@/pages/administration/settings/Branding";
import PagesControl from "@/pages/administration/settings/PagesControl";
import ConfigureLeaveType from "@/pages/administration/settings/ConfigureLeaveType";
import DocumentList from "@/pages/administration/settings/DocumentList";
import Policy from "@/pages/administration/settings/Policy";
import Holiday from "@/pages/administration/settings/Holiday";
import BussinessDay from "@/pages/administration/settings/BussinessDay";
import DocumentSequence from "@/pages/administration/settings/DocumentSequence";
import SkillSets from "@/pages/administration/settings/SkillSets";
import LeaveManagement from "@/pages/administration/settings/LeaveManagement";
import Domains from "@/pages/administration/settings/Domains";
import { RecordFace } from "@/pages/administration/settings/RecordFace";
import DepartmentEmails from "@/pages/administration/settings/Emails";
import OrganazationDetails from "@/pages/administration/settings/OrganazationDetails";

// attendance
import AttendanceDashboard from "@/pages/administration/attendance/AttendanceDashboard";
import AttendanceHistory from "@/pages/administration/attendance/AttendanceHistory";

// employee settings
import Dashboard from "@/pages/dashboard/Dashboard";
import Profile from "@/pages/employee/setting/Profile";
import GoalsList from "@/pages/employee/goals/GoalsList";
import LeaveOverview from "@/pages/employee/leave-mngt/LeaveOverview";
import LeavesCoff from "@/pages/employee/leave-mngt/LeavesCoff";
import ProjectsTable from "@/pages/projects/project/ProjectsTable";
import TaskBoard from "@/pages/projects/tasks/Taskboard";
import Reimbursements from "@/pages/employee/setting/Reimbursements";
import Documents from "@/pages/employee/setting/Documents";

export const adminRoutes = [
  {
    path: "admin/myteam/*",
    element: <AdminEmployeeManageTabs />,
    roles: ["admin", "hr"], // role-based access
    children: [
      { path: "members", element: <Members />, roles: ["admin", "hr"] },
      { path: "permissions", element: <Permissions />, roles: ["admin"] },
      {
        path: "invitations",
        element: <Invitations />,
        roles: ["admin", "hr"],
      },
    ],
  },
  {
    path: "admin/myteam/selected-member/:id/*",
    element: <AdminSelectedEmployeeTabs />,
    roles: ["admin", "hr"],
    children: [
      {
        path: "dashboard",
        element: <Dashboard />,
        roles: ["admin", "hr"],
      },
      { path: "profile", element: <Profile />, roles: ["admin", "hr"] },
      { path: "project", element: <ProjectsTable />, roles: ["admin", "hr"] },
      { path: "my-task", element: <TaskBoard />, roles: ["admin", "hr"] },
      { path: "my-goal", element: <GoalsList />, roles: ["admin", "hr"] },
      { path: "leaves", element: <LeaveOverview />, roles: ["admin", "hr"] },
      {
        path: "C-Off-leaves",
        element: <LeavesCoff />,
        roles: ["admin", "hr"],
      },
      { path: "inventory", element: <Inventory />, roles: ["admin", "hr"] },
      {
        path: "documents",
        element: <Documents />,
        roles: ["admin", "hr"],
      },
      {
        path: "reimbursements",
        element: <Reimbursements />,
        roles: ["admin", "hr"],
      },
    ],
  },
  {
    path: "admin/attendance/*",
    element: <AttendanceTabs />,
    roles: ["admin", "hr"],
    children: [
      { path: "", element: <AttendanceDashboard />, roles: ["admin", "hr"] },
      {
        path: "history",
        element: <AttendanceHistory />,
        roles: ["admin", "hr"],
      },
    ],
  },
  {
    path: "admin/requests/*",
    element: <h1>Service Request</h1>,
    roles: ["admin"],
  },
  {
    path: "admin/settings/*",
    element: <OrganazationTabs />,
    roles: ["admin"],
    children: [
      { path: "", element: <OrganazationDetails />, roles: ["admin"] },
      { path: "branding", element: <Branding />, roles: ["admin"] },
      {
        path: "pages-control",
        element: <PagesControl />,
        roles: ["admin"],
      },
      { path: "billing", element: <h1>Billing</h1>, roles: ["admin"] },
      {
        path: "leave-type",
        element: <ConfigureLeaveType />,
        roles: ["admin"],
      },
      {
        path: "document-list",
        element: <DocumentList />,
        roles: ["admin"],
      },
      { path: "policy", element: <Policy />, roles: ["admin"] },
      { path: "holidays", element: <Holiday />, roles: ["admin"] },
      {
        path: "business-days",
        element: <BussinessDay />,
        roles: ["admin"],
      },
      {
        path: "document-sequence",
        element: <DocumentSequence />,
        roles: ["admin"],
      },
      { path: "skill-sets", element: <SkillSets />, roles: ["admin"] },
      {
        path: "leave-management",
        element: <LeaveManagement />,
        roles: ["admin"],
      },
      { path: "domain", element: <Domains />, roles: ["admin"] },
      { path: "record-face", element: <RecordFace />, roles: ["admin"] },
      {
        path: "email-settings",
        element: <DepartmentEmails />,
        roles: ["admin"],
      },
    ],
  },
  { path: "admin/inventory", element: <Inventory />, roles: ["admin"] },
];
