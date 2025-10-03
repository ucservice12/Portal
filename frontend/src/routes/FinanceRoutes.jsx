import {
  PurchasesTabs,
  IncomeTabs,
  ReportFinanceTabs,
  FinanceSettingsTabs,
} from "@/components/custom/tabs/Tabs";
import FinanceBoard from "@/pages/finance/FinanceBoard";
import Transactions from "@/pages/finance/transactions/Transactions";

import ProductService from "@/pages/sales/sales-settings/products/ProductService";
import Vendors from "@/pages/finance/settings/vendor/Vendors";
import FiscalYear from "@/pages/finance/settings/fiscalyear/FiscalYear";
import Bills from "@/pages/finance/purchases/bills/Bills";
import Reimbursements from "@/pages/finance/purchases/reimbursements/reimbursements";
import Income from "@/pages/finance/incomes/Income";
import Invoices from "@/pages/finance/incomes/Invoices";
import BalanceSheet from "@/pages/finance/reports/BalanceSheet";
import ProfitLoss from "@/pages/finance/reports/ProfitLoss";
import CashFlow from "@/pages/finance/reports/CashFlow";

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
        path: "",
        element: <Bills />,
        roles: ["finance", "admin", "hr"],
      },
      {
        path: "reimbursements",
        element: <Reimbursements />,
        roles: ["finance", "admin", "hr"],
      },
    ],
  },
  {
    path: "finance/income/*",
    element: <IncomeTabs />,
    roles: ["finance", "admin", "hr"],
    children: [
      {
        path: "",
        element: <Income />,
        roles: ["finance", "admin", "hr"],
      },
      {
        path: "invoices",
        element: <Invoices />,
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
        element: <ProfitLoss />,
        roles: ["finance", "admin", "hr"],
      },
      {
        path: "cash-flow",
        element: <CashFlow />,
        roles: ["finance", "admin", "hr"],
      },
      {
        path: "balance-sheet",
        element: <BalanceSheet />,
        roles: ["finance", "admin", "hr"],
      },
    ],
  },
  {
    path: "finance/settings/*",
    element: <FinanceSettingsTabs />,
    roles: ["finance", "admin", "hr"],
    children: [
      {
        path: "",
        element: <FiscalYear />,
        roles: ["finance", "admin", "hr"],
      },
      {
        path: "products&services",
        element: <ProductService />,
        roles: ["finance", "admin", "hr"],
      },
      {
        path: "vendors",
        element: <Vendors />,
        roles: ["finance", "admin", "hr"],
      },
    ],
  },
];
