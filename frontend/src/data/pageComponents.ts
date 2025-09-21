// src/data/pageComponents.ts
import Dashboard from "@/pages/dashboard/Dashboard";

// Employee
import Tasks from "@/pages/employee/Tasks";
import Goals from "@/pages/employee/Goals";
import LogHours from "@/pages/employee/LogHours";
import Calendar from "@/pages/employee/Calendar";
import Settings from "@/pages/employee/Settings";
import Attendance from "@/pages/employee/Attendance";

// Projects
import Projects from "@/pages/projects/Projects";

// Learning
import MyCourses from "@/pages/learning/MyCourses";
import ManageCourses from "@/pages/learning/ManageCourses";

// Administration
import Employees from "@/pages/administration/Employees";
import AdminSettings from "@/pages/administration/AdminSettings";
import Attendances from "@/pages/administration/Attendances";
import Inventory from "@/pages/administration/Inventory";

// Hiring
import Jobs from "@/pages/hiring/Jobs";
import Candidates from "@/pages/hiring/Candidates";
import QuestionPapers from "@/pages/hiring/QuestionPapers";

// Finance
import FinanceBoard from "@/pages/finance/FinanceBoard";
import Transactions from "@/pages/finance/Transactions";
import Payrolls from "@/pages/finance/Payrolls";
import Purchases from "@/pages/finance/Purchases";
import Income from "@/pages/finance/Income";
import Reports from "@/pages/finance/Reports";
import Setting from "@/pages/finance/Setting";

// Marketing
import Marketing from "@/pages/marketing/Marketing";
import Subscribers from "@/pages/marketing/Subscribers";
import Campaigns from "@/pages/marketing/Campaigns";
import Scheduling from "@/pages/marketing/Scheduling";
import SocialPosts from "@/pages/marketing/SocialPosts";
import Blogs from "@/pages/marketing/Blogs";

// Sales
import SalesBoard from "@/pages/sales/SalesBoard";
import Contacts from "@/pages/sales/Contacts";
import MyThings from "@/pages/sales/MyThings";
import CurrentSales from "@/pages/sales/CurrentSales";
import FutureSales from "@/pages/sales/FutureSales";
import SalesSettings from "@/pages/sales/SalesSettings";
import WebsiteStuff from "@/pages/sales/WebsiteStuff";

// Service Requests
import Requests from "@/pages/serviceRequest/Requests";

// Superadmin
import Organizations from "@/pages/superadmin/Organizations";
import Forms from "@/pages/superadmin/Forms";

export const pageComponents: Record<string, React.FC> = {
  Dashboard,
  Tasks,
  Goals,
  "Log Hours": LogHours,
  Calendar,
  Settings,
  Attendance,
  Projects,
  "My Courses": MyCourses,
  "Manage Courses": ManageCourses,
  Employees,
  "Admin Settings": AdminSettings,
  Attendances,
  Inventory,
  Jobs,
  Candidates,
  "Question Papers": QuestionPapers,
  "Finance Board": FinanceBoard,
  Transactions,
  Payrolls,
  Purchases,
  Income,
  Reports,
  Setting,
  Marketing,
  Subscribers,
  Campaigns,
  Scheduling,
  "Social Posts": SocialPosts,
  Blogs,
  "Sales Board": SalesBoard,
  Contacts,
  "My Things": MyThings,
  "Current Sales": CurrentSales,
  "Future Sales": FutureSales,
  "Sales Settings": SalesSettings,
  "Website Stuff": WebsiteStuff,
  Requests,
  organizations: Organizations,
  Forms,
};
