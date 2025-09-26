import { employeeRoutes } from "./EmployeeRoutes";
import { salesRoutes } from "./SalesRoutes";
import { projectRoutes } from "./ProjectRoutes";
import { adminRoutes } from "./AdminRoutes";
import { financeRoutes } from "./FinanceRoutes";
// import { marketingRoutes } from "./MarketingRoutes";
// import { superadminRoutes } from "./SuperadminRoutes";
// import { hiringRoutes } from "./HiringRoutes";
// import { serviceRoutes } from "./ServiceRoutes";

export const appRoutes = [
  ...employeeRoutes,
  ...salesRoutes,
  ...projectRoutes,
  ...adminRoutes,
  ...financeRoutes,
  // ...marketingRoutes,
  // ...hiringRoutes,
  // ...superadminRoutes,
  // ...serviceRoutes,
];
