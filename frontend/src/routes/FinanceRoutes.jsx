import {
  PurchasesTabs,
  IncomeTabs,
  ReportFinanceTabs,
  FinanceSettingsTabs,
} from "@/components/custom/tabs/Tabs";
import FinanceBoard from "@/pages/finance/FinanceBoard";
import Transactions from "@/pages/finance/Transactions";
import Purchases from "@/pages/finance/Purchases";
import Income from "@/pages/finance/Income";
import Reports from "@/pages/finance/Reports";
import Setting from "@/pages/finance/Setting";

export const financeRoutes = [
  {
    path: "finance/transactions",
    element: <Transactions />,
    roles: ["finance", "admin", "hr"],
  },
  {
    path: "finance/board",
    element: <FinanceBoard />,
    roles: ["finance", "admin", "hr"],
  },
  {
    path: "finance/purchases/*",
    element: <PurchasesTabs />,
    roles: ["finance", "admin", "hr"],
    children: [
      {
        index: true,
        element: <Purchases />,
        roles: ["finance", "admin", "hr"],
      },
      {
        path: "bills",
        element: <h1>Bills</h1>,
        roles: ["finance", "admin", "hr"],
      },
      {
        path: "reimbursements",
        element: <h1>Reimbursements</h1>,
        roles: ["finance", "admin", "hr"],
      },
    ],
  },
  {
    path: "finance/income/*",
    element: <IncomeTabs />,
    roles: ["finance", "admin", "hr"],
    children: [
      { index: true, element: <Income />, roles: ["finance", "admin", "hr"] },
      {
        path: "invoices",
        element: <h1>Invoices</h1>,
        roles: ["finance", "admin", "hr"],
      },
    ],
  },
  {
    path: "finance/reports/*",
    element: <ReportFinanceTabs />,
    roles: ["finance", "admin", "hr"],
    children: [
      {
        path: "profit-loss",
        element: <Reports />,
        roles: ["finance", "admin", "hr"],
      },
      {
        path: "cash-flow",
        element: <h1>Cash Flow</h1>,
        roles: ["finance", "admin", "hr"],
      },
      {
        path: "balance-sheet",
        element: <h1>Balance Sheet</h1>,
        roles: ["finance", "admin", "hr"],
      },
    ],
  },
  {
    path: "finance/settings/*",
    element: <FinanceSettingsTabs />,
    roles: ["finance", "admin", "hr"],
    children: [
      { index: true, element: <Setting />, roles: ["finance", "admin", "hr"] },
      {
        path: "products&services",
        element: <h1>Products & Services</h1>,
        roles: ["finance", "admin", "hr"],
      },
      {
        path: "vendors",
        element: <h1>Vendors</h1>,
        roles: ["finance", "admin", "hr"],
      },
    ],
  },
];
