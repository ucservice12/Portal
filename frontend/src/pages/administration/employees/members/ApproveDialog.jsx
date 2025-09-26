import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  TypographyH3,
  TypographySmall,
  TypographyMuted,
} from "@/components/custom/Typography";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { IoPersonSharp } from "react-icons/io5";
import { X as XIcon } from "lucide-react";

export default function ApproveDialog({
  open,
  setOpen,
  selectedEmployee,
  selectedUserTypes,
  toggleUserType,
  USER_TYPES,
  selectedManager,
  setSelectedManager,
  managerList,
}) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle></DialogTitle>
        </DialogHeader>
        <div className="flex flex-col md:flex-row gap-8 w-full">
          <div className="flex-1 space-y-4 sm:space-y-6">
            <TypographyH3>Approve Employee</TypographyH3>
            <div className="grid gap-2">
              <Label>User Types</Label>
              <Select onValueChange={(val) => toggleUserType(val)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Employee Status" />
                </SelectTrigger>
                <SelectContent>
                  {USER_TYPES.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {selectedUserTypes.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {selectedUserTypes.map((type) => (
                    <Badge
                      key={type}
                      variant="secondary"
                      className="flex items-center gap-1"
                    >
                      {type}
                      <button
                        type="button"
                        className="ml-1"
                        onClick={() => toggleUserType(type)}
                      >
                        <XIcon className="w-3 h-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              )}
            </div>
            <div className="grid gap-2">
              <Label>Manager</Label>
              <Select
                value={selectedManager}
                onValueChange={setSelectedManager}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Manager" />
                </SelectTrigger>
                <SelectContent>
                  {managerList.map((m) => (
                    <SelectItem key={m} value={m}>
                      {m}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex-1">
            <TypographySmall>Approved By</TypographySmall>
            <div className="flex items-center gap-2 my-3">
              <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                <IoPersonSharp className="text-gray-600" />
              </div>
              <div>
                <TypographyMuted className="text-xs">
                  {selectedEmployee?.name}
                </TypographyMuted>
                <TypographyMuted className="text-xs">
                  {selectedEmployee?.email}
                </TypographyMuted>
              </div>
            </div>
            <TypographySmall>Selected Employee</TypographySmall>
            <div className="flex items-center gap-2 mt-2">
              <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                <IoPersonSharp className="text-gray-600" />
              </div>
              <div>
                <TypographyMuted className="text-xs">
                  {selectedEmployee?.name}
                </TypographyMuted>
                <TypographyMuted className="text-xs">
                  {selectedEmployee?.email}
                </TypographyMuted>
              </div>
            </div>
            <Badge variant="success" className="mt-6">
              {selectedEmployee?.status}
            </Badge>
          </div>
        </div>
        <DialogFooter>
          <Button className="w-full md:w-auto">Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
