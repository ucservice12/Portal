// admin
export const organazationTabLinks = [
  { label: "Settings", href: "/admin/settings" },
  { label: "Branding", href: "/admin/settings/branding" },
  { label: "Pages", href: "/admin/settings/pages-control" },
  { label: "Billing", href: "/admin/settings/billing" },
  { label: "Configure Leave Type", href: "/admin/settings/leave-type" },
  { label: "Document List", href: "/admin/settings/document-list" },
  { label: "Policy", href: "/admin/settings/policy" },
  { label: "Holidays", href: "/admin/settings/holidays" },
  { label: "Business days", href: "/admin/settings/business-days" },
  { label: "Document Sequence", href: "/admin/settings/document-sequence" },
  { label: "Skill Sets", href: "/admin/settings/skill-sets" },
  { label: "Leave Management", href: "/admin/settings/leave-management" },
  { label: "Domain", href: "/admin/settings/domain" },
  { label: "Record Face", href: "/admin/settings/record-face" },
  { label: "Email Settings", href: "/admin/settings/email-settings" },
];

export const adminEmployeeManageTabLinks = [
  { label: "Members", href: "/admin/myteam/members" },
  { label: "Permissions", href: "/admin/myteam/permissions" },
  { label: "Invitations", href: "/admin/myteam/invitations" },
];

export const adminSelectEmployeeTabsLinks = [
  {
    label: "Dashboard",
    href: "/admin/myteam/selected-member/:memberId/dashboard",
  },
  { label: "Profile", href: "/admin/myteam/selected-member/:memberId/Profile" },
  { label: "Project", href: "/admin/myteam/selected-member/:memberId/project" },
  { label: "My Task", href: "/admin/myteam/selected-member/:memberId/my-task" },
  { label: "My Goal", href: "/admin/myteam/selected-member/:memberId/my-goal" },
  {
    label: "My Course",
    href: "/admin/myteam/selected-member/:memberId/my-course",
  },
  { label: "My Team", href: "/admin/myteam/selected-member/:memberId/my-team" },
  { label: "Leaves", href: "/admin/myteam/selected-member/:memberId/leaves" },
  {
    label: "C-Off Leaves",
    href: "/admin/myteam/selected-member/:memberId/C-Off-leaves",
  },
  {
    label: "Log Hours",
    href: "/admin/myteam/selected-member/:memberId/log-hours",
  },
  {
    label: "Inventory",
    href: "/admin/myteam/selected-member/:memberId/inventory",
  },
  {
    label: "Documents",
    href: "/admin/myteam/selected-member/:memberId/documents",
  },
  {
    label: "Timesheet",
    href: "/admin/myteam/selected-member/:memberId/timesheet",
  },
  {
    label: "Reimbursements",
    href: "/admin/myteam/selected-member/:memberId/reimbursements",
  },
  { label: "Payroll", href: "/admin/myteam/selected-member/:memberId/payroll" },
  {
    label: "Backup Leave",
    href: "/admin/myteam/selected-member/:memberId/backup-leave",
  },
  {
    label: "Compensation",
    href: "/admin/myteam/selected-member/:memberId/compensation",
  },
];

// project
export const projectTabLinks = [
  { label: "Dashboard", href: "/projects/1/dashboard" },
  { label: "Team Logs", href: "/projects/1/team-logs" },
  { label: "Tasks", href: "/projects/1/tasks" },
  { label: "My Log Hours", href: "/projects/1/my-log-hours" },
  { label: "Details", href: "/projects/1/details" },
  { label: "Timesheet", href: "/projects/1/timesheet" },
  { label: "Timeline", href: "/projects/1/timeline" },
  { label: "Planning", href: "/projects/1/planning" },
  { label: "Releases", href: "/projects/1/releases" },
  { label: "Team", href: "/projects/1/team" },
  { label: "Calendar", href: "/projects/1/calendar" },
];

// employee
export const employeeGoalsTabLinks = [
  { label: "Dashboard", href: "/employee/goals/dashboard" },
  { label: "Goals", href: "/employee/goals/goals-list" },
  { label: "Achievement", href: "/employee/goals/achievement" },
];

export const attendanceTabLinks = [
  { label: "Dashboard", href: "/admin/attendance" },
  { label: "Attendance History", href: "/admin/attendance/history" },
];

export const employeeTablinks = [
  { label: "Profile", href: "/employee/settings/profile" },
  { label: "Inventory", href: "/employee/settings/inventory" },
  { label: "Documents", href: "/employee/settings/documents" },
  { label: "Holiday", href: "/employee/settings/org-holidays" },
  { label: "Employee Handbook", href: "/employee/settings/employee-handbook" },
  { label: "Leaves Policy", href: "/employee/settings/leaves-policy" },
  { label: "Reimbursements", href: "/employee/settings/reimbursements" },
];

export const employeeCalenderTablinks = [
  { label: "Leaves", href: "/employee/calendar/leaves" },
  { label: "C-Offs", href: "/employee/calendar/c-offs" },
];

// finances
export const purchasesTabLinks = [
  { label: "Bills", href: "/finance/purchases" },
  { label: "Reimbursements", href: "/finance/purchases/reimbursements" },
];

export const incomeTabLinks = [
  { label: "Income", href: "/finance/income" },
  { label: "Invoices", href: "/finance/income/invoices" },
];

export const reportsTabLinks = [
  { label: "Profit Loss", href: "/finance/reports/profit-loss" },
  { label: "Cash Flow", href: "/finance/reports/cash-flow" },
  { label: "Balance Sheet", href: "/finance/reports/balance-sheet" },
];

export const financeSettingsTabLinks = [
  { label: "Setting", href: "/finance/settings" },
  { label: "Product & Services", href: "/finance/settings/products&services" },
  { label: "Venders", href: "/finance/settings/vendors" },
];

// sales
export const salesCotactTabLinks = [
  { label: "Contact List", href: "/contacts" },
  { label: "Tags", href: "/contacts/tags" },
  { label: "Companies", href: "/contacts/companies" },
  { label: "Maps", href: "/contacts/maps" },
];

export const salesMyThingsTabLinks = [
  { label: "Tasks", href: "/my-things" },
  { label: "Deals", href: "/my-things/deals" },
  { label: "Meetting Slots", href: "/my-things/freeslots" },
  { label: "Customers", href: "/my-things/customers" },
];

export const currentSalesTabLinks = [
  { label: "Payments", href: "/current-sales" },
  { label: "Statements", href: "/current-sales/statements" },
  { label: "Customers", href: "/current-sales/customers" },
  { label: "Invoices", href: "/current-sales/invoices" },
];

export const futureSalesTabLinks = [
  { label: "Estimates", href: "/future-sales" },
  { label: "Deals", href: "/future-sales/deals" },
  { label: "Proposals", href: "/future-sales/proposals" },
  { label: "Forecasting", href: "/future-sales/forecastings" },
];

export const saleSettingTabLinks = [
  { label: "Product & Service", href: "/sales-settings" },
  { label: "Taxes", href: "/sales-settings/taxes" },
  { label: "Customers", href: "/sales-settings/customers" },
  { label: "Choose Currency", href: "/sales-settings/choose-currency" },
  { label: "Footer", href: "/sales-settings/footer" },
  { label: "Notes & Terms", href: "/sales-settings/notes-and-terms" },
  { label: "Indutries", href: "/sales-settings/industries" },
  { label: "Verify Email", href: "/sales-settings/verify-emails" },
  { label: "Meeting Links", href: "/sales-settings/meeting-links" },
];
