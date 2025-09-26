import React, { useState } from "react";
import { AudioWaveform, Command, GalleryVerticalEnd } from "lucide-react";
import { NavMain } from "@/components/NavMain";
import { TeamSwitcher } from "@/components/TeamSwitcher";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { getRoutesForRoles } from "@/lib/getRoutesForRole";
import { useAuth } from "@/context/AuthContext";

// Helpers
function groupRoutesByModule(routes) {
  const grouped = {};
  routes.forEach((route) => {
    if (!grouped[route.module]) grouped[route.module] = [];
    grouped[route.module].push(route);
  });
  return grouped;
}

function getSectionTitle(module) {
  if (module === "employee") return "My Stuff";
  if (module === "superadmin") return "Super Admin";
  return module.charAt(0).toUpperCase() + module.slice(1);
}

export function AppSidebar(props) {
  const { user } = useAuth();

  const currentUserRole = user?.roles || "employee";
  const sidebarRoutes = getRoutesForRoles(currentUserRole);
  const groupedRoutes = groupRoutesByModule(sidebarRoutes);

  // State to track which section is open
  const [openSection, setOpenSection] = useState(
    Object.keys(groupedRoutes)[0] || ""
  );

  const navMain = Object.entries(groupedRoutes).map(([module, items]) => ({
    title: getSectionTitle(module),
    url: "#",
    isActive: openSection === module,
    onToggle: () => setOpenSection(openSection === module ? "" : module),
    items: items.map((item) => ({
      title: item.name,
      url: item.url,
      icon: item.icon,
      permissions: item.permissions,
    })),
  }));

  const data = {
    user: {
      firstName: user?.firstName,
      lastName: user?.lastName,
      email: user?.email || "m@example.com",
      avatar: "/avatars/shadcn.jpg",
    },
    teams: [
      { name: "Acme Inc", logo: GalleryVerticalEnd, plan: "Enterprise" },
      { name: "Acme Corp.", logo: AudioWaveform, plan: "Startup" },
      { name: "Evil Corp.", logo: Command, plan: "Free" },
    ],
    navMain,
  };

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>

      <SidebarContent className="scrollbar-hide">
        <NavMain items={data.navMain} />
      </SidebarContent>

      {/* <SidebarRail /> */}
    </Sidebar>
  );
}
