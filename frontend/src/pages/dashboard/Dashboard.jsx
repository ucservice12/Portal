import { TypographyH1, TypographyH5 } from "@/components/custom/Typography";
import { HeaderStats } from "./HeaderStats";
import { MyTasks } from "./MyTasks";
import { MyGoals } from "./MyGoals";
import { MyCourses } from "./MyCourses";
import { Timesheet } from "./Timesheet";
import { MyLeaves } from "./MyLeaves";
import { Birthdays } from "./Birthdays";
import { TopTeamMembers } from "./TopTeamMembers";
import { LeavesThisWeek } from "./LeavesThisWeek";
import { useAuth } from "@/context/AuthContext";

export default function Dashboard() {
  const { user } = useAuth();

  const allowedRoles = ["admin", "superadmin", "hr"];

  // Handle single role string or array of roles
  const userRoles = Array.isArray(user?.roles) ? user.roles : [user?.role];

  console.log("user", user);

  const canViewTeamSection = userRoles.some((role) =>
    allowedRoles.includes(role)
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <TypographyH1>Dashboard</TypographyH1>
        <div className="text-right">
          <TypographyH5>Last Login Time</TypographyH5>
          <span className="uppercase text-muted-foreground text-sm">
            {user?.lastLogin
              ? new Date(user.lastLogin).toLocaleString("en-IN", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })
              : "Never logged in"}
          </span>
        </div>
      </div>

      <HeaderStats />

      <div className="grid md:grid-cols-2 gap-4 sm:gap-8">
        <MyTasks />
        <MyGoals />
      </div>

      <div className="grid md:grid-cols-3 gap-4 sm:gap-8">
        <MyCourses />
        <Timesheet />
        <MyLeaves />
      </div>

      <div className="grid md:grid-cols-3 gap-4 sm:gap-8">
        <Birthdays />
        {canViewTeamSection && (
          <>
            <TopTeamMembers />
            <LeavesThisWeek />
          </>
        )}
      </div>
    </div>
  );
}
