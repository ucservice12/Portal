import { Outlet } from "react-router-dom";
import { TypographyH1 } from "../Typography";
import {
  organazationTabLinks,
  adminSelectEmployeeTabsLinks,
  projectTabLinks,
  employeeTablinks,
  employeeGoalsTabLinks,
  employeeCalenderTablinks,
  adminEmployeeManageTabLinks,
  attendanceTabLinks,
  salesCotactTabLinks,
  currentSalesTabLinks,
  futureSalesTabLinks,
  salesMyThingsTabLinks,
  saleSettingTabLinks,
  purchasesTabLinks,
  incomeTabLinks,
  reportsTabLinks,
  financeSettingsTabLinks,
} from "./TabNavigationLinks";
import SettingsNav from "./SettingsNav";

// admin
export const OrganazationTabs = () => {
  return (
    <>
      <TypographyH1>Settings</TypographyH1>
      <SettingsNav links={organazationTabLinks} />
      <Outlet />
    </>
  );
};

export const AdminSelectedEmployeeTabs = () => {
  return (
    <>
      <TypographyH1>Selected Employee Name</TypographyH1>
      <SettingsNav links={adminSelectEmployeeTabsLinks} />
      <Outlet />
    </>
  );
};

// projects
export const ProjectTabs = () => {
  return (
    <>
      <SettingsNav links={projectTabLinks} />
      <Outlet />
    </>
  );
};

// employee
export const EmployeeGoalsTabs = () => {
  return (
    <>
      <TypographyH1>Goals</TypographyH1>
      <SettingsNav links={employeeGoalsTabLinks} />
      <Outlet />
    </>
  );
};

export const EmployeeTabs = () => {
  return (
    <>
      <TypographyH1>Profile Settings</TypographyH1>
      <SettingsNav links={employeeTablinks} />
      <Outlet />
    </>
  );
};

export const EmployeeCalenderTabs = () => {
  return (
    <>
      <TypographyH1>Leave Management</TypographyH1>
      <SettingsNav links={employeeCalenderTablinks} />
      <Outlet />
    </>
  );
};

export const AdminEmployeeManageTabs = () => {
  return (
    <>
      <TypographyH1>Teams</TypographyH1>
      <SettingsNav links={adminEmployeeManageTabLinks} />
      <Outlet />
    </>
  );
};

export const AttendanceTabs = () => {
  return (
    <>
      <SettingsNav links={attendanceTabLinks} />
      <Outlet />
    </>
  );
};

// finances tabs
export const PurchasesTabs = () => {
  return (
    <>
      <TypographyH1>Purchases</TypographyH1>
      <SettingsNav links={purchasesTabLinks} />
      <Outlet />
    </>
  );
};

export const IncomeTabs = () => {
  return (
    <>
      <SettingsNav links={incomeTabLinks} />
      <Outlet />
    </>
  );
};

export const ReportFinanceTabs = () => {
  return (
    <>
      <SettingsNav links={reportsTabLinks} />
      <Outlet />
    </>
  );
};

export const FinanceSettingsTabs = () => {
  return (
    <>
      <TypographyH1>Finance Settings</TypographyH1>
      <SettingsNav links={financeSettingsTabLinks} />
      <Outlet />
    </>
  );
};

// sales tabs
export const CurrentSalesTabs = () => {
  return (
    <>
      <TypographyH1>Current Sales</TypographyH1>
      <SettingsNav links={currentSalesTabLinks} />
      <Outlet />
    </>
  );
};

export const FutureSalesTabs = () => {
  return (
    <>
      <TypographyH1>Future Sales</TypographyH1>
      <SettingsNav links={futureSalesTabLinks} />
      <Outlet />
    </>
  );
};

export const MyThingsSalesTabs = () => {
  return (
    <>
      <TypographyH1>My Things</TypographyH1>
      <SettingsNav links={salesMyThingsTabLinks} />
      <Outlet />
    </>
  );
};

export const ContactSalesTabs = () => {
  return (
    <>
      <TypographyH1>Sales Contact</TypographyH1>
      <SettingsNav links={salesCotactTabLinks} />
      <Outlet />
    </>
  );
};

export const SellSettingsTabs = () => {
  return (
    <>
      <TypographyH1>Sales Settings</TypographyH1>
      <SettingsNav links={saleSettingTabLinks} />
      <Outlet />
    </>
  );
};
