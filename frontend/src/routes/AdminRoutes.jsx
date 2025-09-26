import {
  AdminEmployeeManageTabs,
  AdminSelectedEmployeeTabs,
  OrganazationTabs,
  AttendanceTabs,
} from "@/components/custom/tabs/Tabs";
import AdminSettings from "@/pages/administration/AdminSettings";
import Attendances from "@/pages/administration/Attendances";
import Inventory from "@/pages/administration/Inventory";
import Members from "@/pages/administration/employees/members/Members";
import Invitations from "@/pages/administration/employees/Invitations";
import Permissions from "@/pages/administration/employees/Permissions";

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
      { index: true, element: <h1>Dashboard</h1>, roles: ["admin", "hr"] },
      {
        path: "dashboard",
        element: <h1>Dashboard</h1>,
        roles: ["admin", "hr"],
      },
      { path: "profile", element: <h1>Profile</h1>, roles: ["admin", "hr"] },
      { path: "project", element: <h1>Project</h1>, roles: ["admin", "hr"] },
      { path: "my-goal", element: <h1>My Goal</h1>, roles: ["admin", "hr"] },
      { path: "leaves", element: <h1>Leaves</h1>, roles: ["admin", "hr"] },
      {
        path: "C-Off-leaves",
        element: <h1>C-Off Leaves</h1>,
        roles: ["admin", "hr"],
      },
      { path: "inventory", element: <Inventory />, roles: ["admin", "hr"] },
      {
        path: "documents",
        element: <h1>Documents</h1>,
        roles: ["admin", "hr"],
      },
      {
        path: "reimbursements",
        element: <h1>Reimbursements</h1>,
        roles: ["admin", "hr"],
      },
    ],
  },
  {
    path: "admin/attendance/*",
    element: <AttendanceTabs />,
    roles: ["admin", "hr"],
    children: [
      { index: true, element: <Attendances />, roles: ["admin", "hr"] },
      {
        path: "history",
        element: <h1>Attendance History</h1>,
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
      { index: true, element: <AdminSettings />, roles: ["admin"] },
      { path: "branding", element: <h1>Branding</h1>, roles: ["admin"] },
      {
        path: "pages-control",
        element: <h1>Pages Control</h1>,
        roles: ["admin"],
      },
      { path: "billing", element: <h1>Billing</h1>, roles: ["admin"] },
      {
        path: "leave-type",
        element: <h1>Configure Leave Type</h1>,
        roles: ["admin"],
      },
      {
        path: "document-list",
        element: <h1>Document List</h1>,
        roles: ["admin"],
      },
      { path: "policy", element: <h1>Policy</h1>, roles: ["admin"] },
      { path: "holidays", element: <h1>Holidays</h1>, roles: ["admin"] },
      {
        path: "business-days",
        element: <h1>Business Days</h1>,
        roles: ["admin"],
      },
      {
        path: "document-sequence",
        element: <h1>Document Sequence</h1>,
        roles: ["admin"],
      },
      { path: "skill-sets", element: <h1>Skill Sets</h1>, roles: ["admin"] },
      {
        path: "leave-management",
        element: <h1>Leave Management</h1>,
        roles: ["admin"],
      },
      { path: "domain", element: <h1>Domain</h1>, roles: ["admin"] },
      { path: "record-face", element: <h1>Record Face</h1>, roles: ["admin"] },
      {
        path: "email-settings",
        element: <h1>Email Settings</h1>,
        roles: ["admin"],
      },
    ],
  },
  { path: "admin/inventory", element: <Inventory />, roles: ["admin"] },
];
