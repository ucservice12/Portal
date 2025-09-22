import { Outlet } from "react-router-dom";
import { AppSidebar } from "@/components/AppSidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { BreadcrumbData } from "@/components/custom/Breadcrumb";
import Navbar from "@/components/layout/Navbar";

export default function MainLayout() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <Navbar />
        <div className="flex flex-1 flex-col gap-4 p-4 sm:px-8 pt-22">
          <BreadcrumbData />
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
