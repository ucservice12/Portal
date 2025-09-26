import { IoPersonSharp } from "react-icons/io5";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { EllipsisVertical, Eye, Check, X as XIcon, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { TypographyH5, TypographyMuted } from "@/components/custom/Typography";
import { Link } from "react-router-dom";

export default function EmployeeCard({
  emp,
  setSelectedEmployee,
  setSelectedUserTypes,
  setApproveDialogOpen,
}) {
  return (
    <div className="space-y-2 rounded-xl border py-4 bg-white shadow-sm w-full">
      <div className="flex items-center justify-between px-4">
        <div className="flex gap-2">
          <div className="flex items-center cursor-pointer justify-center w-10 h-10 rounded-full bg-muted ">
            <IoPersonSharp className="text-gray-600" />
          </div>
          <div>
            <TypographyH5>{emp?.name}</TypographyH5>
            <TypographyMuted className="text-xs">{emp?.email}</TypographyMuted>
          </div>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full">
              <EllipsisVertical className="cursor-pointer" color="gray" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <Link to={`/admin/myteam/selected-member/${emp?.name}`}>
              <DropdownMenuItem className="flex items-center gap-2">
                <Eye className="w-4 h-4" /> View
              </DropdownMenuItem>
            </Link>
            <DropdownMenuItem
              className="flex items-center gap-2"
              onClick={() => {
                setSelectedEmployee(emp);
                setSelectedUserTypes(emp?.roles?.map((r) => r.toUpperCase()));
                setApproveDialogOpen(true);
              }}
            >
              <Check className="w-4 h-4" /> Approve
            </DropdownMenuItem>
            <DropdownMenuItem className="flex items-center gap-2 text-red-500">
              <XIcon className="w-4 h-4" /> Reject
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="flex flex-wrap gap-4 items-center text-xs mt-6 px-4 text-gray-600">
        {emp?.roles?.map((role, i) => (
          <div className="flex items-center gap-1" key={i}>
            <User className="w-4 h-4" /> {role}
          </div>
        ))}
      </div>
      <div className="border-t pt-3 mt-2 px-4">
        <Badge variant="success" className="w-fit mt-2">
          {emp.status}
        </Badge>
      </div>
    </div>
  );
}
