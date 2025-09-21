import { SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Bell, HelpCircle } from "lucide-react";
import { IoPersonSharp } from "react-icons/io5";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="fixed sm:w-[calc(100%-18rem)] w-full top-0 sm:right-0 z-40 h-17 bg-card dark:bg-[#0B0D0E] shadow-md px-4 sm:px-8 flex items-center gap-2 justify-end transition-all">
      {/* Sidebar trigger for small screens */}
      <div className="sm:hidden">
        <SidebarTrigger />
      </div>

      {/* Right-side navbar content */}
      <div className="flex items-center gap-6 ml-auto">
        <Link to="#">
          <Button size="sm" className="gap-1">
            <HelpCircle className="w-4 h-4" />
            Help
          </Button>
        </Link>

        <ThemeToggle />

        <div className="relative cursor-pointer">
          <Bell size={22} className="text-gray-600" />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-600 rounded-full border border-white" />
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center relative cursor-pointer">
              <IoPersonSharp className="text-gray-600" />
              <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-600 rounded-full border-2 border-white" />
            </div>
          </DropdownMenuTrigger>

          <DropdownMenuContent className="w-[280px] mr-4 p-4" align="end">
            <DropdownMenuGroup>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">
                  <IoPersonSharp className="text-gray-600" />
                </div>
                <div>
                  <div className="font-semibold text-base">User</div>
                  <div className="text-sm text-muted-foreground">
                    User@gmail.com
                  </div>
                </div>
              </div>

              <Link to="/employee/settings/profile">
                <DropdownMenuItem className="cursor-pointer gap-2">
                  {/* Profile Icon */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="20"
                    viewBox="0 -960 960 960"
                    width="20"
                    fill="currentColor"
                  >
                    <path d="M480-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM160-160v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v112H160Zm80-80h480v-32q0-11-5.5-20T700-306q-54-27-109-40.5T480-360q-56 0-111 13.5T260-306q-9 5-14.5 14t-5.5 20v32Z" />
                  </svg>
                  Profile
                </DropdownMenuItem>
              </Link>

              <DropdownMenuItem className="cursor-pointer gap-2 text-red-600 hover:text-red-700">
                {/* Sign Out Icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="20"
                  viewBox="0 -960 960 960"
                  width="20"
                  fill="currentColor"
                >
                  <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h280v80H200Zm440-160-55-58 102-102H360v-80h327L585-622l55-58 200 200-200 200Z" />
                </svg>
                Sign Out
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
