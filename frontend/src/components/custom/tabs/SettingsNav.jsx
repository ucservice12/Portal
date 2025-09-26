import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";

const MAIN_LINKS_COUNT = 6;

export default function SettingsNav({ links }) {
  const location = useLocation();
  const mainLinks = links.slice(0, MAIN_LINKS_COUNT);
  const moreLinks = links.slice(MAIN_LINKS_COUNT);

  return (
    <div className="my-2 w-full sm:w-fit min-w-0">
      <div className="flex gap-4 bg-[#fbfcfe] w-full overflow-x-auto whitespace-nowrap p-2">
        {mainLinks.map((link) => {
          const isActive = location.pathname === link.href;
          return (
            <Link to={link.href} key={link.href}>
              <Button
                size="sm"
                variant={isActive ? "outline" : "outline"}
                className={`px-5 hover:bg-primary hover:text-white text-sm font-normal transition-none
                                    ${
                                      isActive
                                        ? "bg-primary text-white shadow-none"
                                        : "bg-transparent shadow-none"
                                    }
                                `}
              >
                {link.label}
              </Button>
            </Link>
          );
        })}

        {moreLinks.length > 0 && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                size="sm"
                variant="ghost"
                className="font-light text-sm flex items-center gap-1 bg-transparent shadow-none"
              >
                More
                <MoreHorizontal className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {moreLinks.map((link) => (
                <DropdownMenuItem asChild key={link.href}>
                  <Link to={link.href}>{link.label}</Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </div>
  );
}
