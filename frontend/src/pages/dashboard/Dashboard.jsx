import { TypographyH1 } from "@/components/custom/Typography";
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

  console.log(user);

  return (
    <div className="space-y-6">
      <TypographyH1>Dashboard</TypographyH1>
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
        {(user?.role === "admin" ||
          user?.role === "superadmin" ||
          user?.role === "hr") && (
          <>
            <TopTeamMembers />
            <LeavesThisWeek />
          </>
        )}
      </div>
    </div>
  );
}
