// src/data/routesConfig.ts

// Icon names correspond to lucide-react
export const subRouteMeta = {
  Dashboard: { icon: "SquareTerminal", url: "/dashboard" },
  organizations: { icon: "Users2", url: "/superadmin/organizations/list" },
  Forms: { icon: "FileText", url: "/forms" },

  // Employee
  Tasks: { icon: "ClipboardList", url: "/employee/tasks" },
  Goals: { icon: "Goal", url: "/employee/goals/dashboard" },
  "Log Hours": { icon: "Clock", url: "/employee/loghours" },
  Calendar: { icon: "Calendar", url: "/employee/calendar/leaves" },
  Settings: { icon: "Settings", url: "/employee/settings/profile" },
  Attendance: { icon: "UserCheck", url: "/employee/attendance" },

  Projects: { icon: "Target", url: "/projects" },

  // Learning
  "My Courses": { icon: "BookOpen", url: "/learning/mycourses" },
  "Manage Courses": { icon: "FileText", url: "/learning/courses" },

  // Admin
  Employees: { icon: "Users2", url: "/admin/myteam/members" },
  "Admin Settings": { icon: "Settings2", url: "/admin/settings" },
  Attendances: { icon: "UserCheck", url: "/admin/attendance" },
  Inventory: { icon: "FileArchive", url: "/admin/inventory" },

  // Hiring
  Jobs: { icon: "Briefcase", url: "/hiring/jobs" },
  Candidates: { icon: "UserPlus", url: "/hiring/candidates" },
  "Question Papers": { icon: "FileQuestion", url: "/hiring/question-papers" },

  // Finance
  "Finance Board": { icon: "HandCoins", url: "/finance/board" },
  Transactions: { icon: "CreditCard", url: "/finance/transactions" },
  Payrolls: { icon: "Wallet", url: "/finance/payrolls" },
  Purchases: { icon: "ShoppingCart", url: "/finance/purchases" },
  Income: { icon: "BadgeIndianRupee", url: "/finance/income" },
  Reports: { icon: "TicketsPlane", url: "/finance/reports/profit-loss" },
  Setting: { icon: "Settings", url: "/finance/settings" },

  // Service Requests
  Requests: { icon: "ListChecks", url: "/admin/requests" },

  // Marketing
  Marketing: { icon: "Globe", url: "/marketing" },
  Subscribers: { icon: "Users2", url: "/subscribers" },
  Campaigns: { icon: "ClipboardList", url: "/campaigns" },
  Scheduling: { icon: "Calendar", url: "/scheduling" },
  "Social Posts": { icon: "MessageCircle", url: "/social-posts" },
  Blogs: { icon: "FileText", url: "/blogs" },

  // Sales
  "Sales Board": { icon: "Kanban", url: "/sales-board" },
  Contacts: { icon: "Users2", url: "/contacts" },
  "My Things": { icon: "Bot", url: "/my-things" },
  "Current Sales": { icon: "CirclePercent", url: "/current-sales" },
  "Future Sales": { icon: "ChartSpline", url: "/future-sales" },
  "Sales Settings": { icon: "Settings2", url: "/sales-settings" },
  "Website Stuff": { icon: "Globe", url: "/website-stuff" },
};

// Map modules → subroutes
export const moduleSubRoutes = {
  employee: [
    "Dashboard",
    "Tasks",
    "Goals",
    "Log Hours",
    "Calendar",
    "Settings",
    "Attendance",
  ],
  projects: ["Projects"],
  learning: ["My Courses", "Manage Courses"],
  administration: ["Employees", "Admin Settings", "Attendances", "Inventory"],
  hiring: ["Jobs", "Candidates", "Question Papers"],
  finance: [
    "Finance Board",
    "Transactions",
    "Payrolls",
    "Purchases",
    "Income",
    "Reports",
    "Setting",
  ],
  marketing: [
    "Marketing",
    "Subscribers",
    "Campaigns",
    "Scheduling",
    "Social Posts",
    "Blogs",
  ],
  sales: [
    "Sales Board",
    "Contacts",
    "My Things",
    "Current Sales",
    "Future Sales",
    "Sales Settings",
    "Website Stuff",
  ],
  serviceRequest: ["Requests"],
  superadmin: ["Dashboard", "organizations", "Forms"],
};

// Roles → allowed modules
export const roleAccess = {
  superadmin: Object.keys(moduleSubRoutes),
  admin: [
    "employee",
    "projects",
    "learning",
    "administration",
    "hiring",
    "finance",
    "marketing",
    "sales",
    "serviceRequest",
  ],
  hrAdmin: [
    "employee",
    "hiring",
    "learning",
    "administration",
    "finance",
    "sales",
  ],
  hr: ["employee", "hiring", "learning"],
  payrollHR: ["employee", "finance"],
  finance: ["finance", "employee"],
  marketing: ["marketing", "employee"],
  sales: ["sales", "employee"],
  teamlead: ["employee", "projects"],
  manager: ["employee", "projects", "finance", "sales"],
  employee: ["employee", "learning"],
};

// Permissions per module
export const userPermissions = {
  permissions: {
    employee_crud: {
      createAllowed: true,
      updateAllowed: true,
      deleteAllowed: true,
    },
    project_crud: {
      createAllowed: true,
      updateAllowed: true,
      deleteAllowed: true,
    },
    finance_crud: {
      createAllowed: true,
      updateAllowed: false,
      deleteAllowed: false,
    },
  },
};

// Module order for sidebar
export const MODULE_ORDER = [
  "employee",
  "projects",
  "learning",
  "administration",
  "hiring",
  "finance",
  "marketing",
  "sales",
  "serviceRequest",
  "superadmin",
];
