import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LayoutPanelTop, List, Search } from "lucide-react";
import { IoPersonSharp } from "react-icons/io5";
import { TypographyLarge, TypographyP } from "@/components/custom/Typography";

export default function Inventory() {
  return (
    <div className="max-w-5xl mt-4 sm:mt-10">
      <div className="flex justify-between sm:flex-row flex-col gap-3 sm:items-center mb-4">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
          <Input type="search" placeholder="Search" className="pl-10" />
        </div>
        <div className="flex gap-4 items-center">
          <Button>
            <LayoutPanelTop className="h-4 w-4" />
            Board
          </Button>
          <Button variant="outline">
            <List className="h-4 w-4" />
            List
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
        <Card className="grid gap-4">
          <TypographyP className="text-xs text-end">
            Date: 25-06-2013
          </TypographyP>
          <TypographyLarge className="text-accent-foreground cursor-pointer">
            Macbook S456
          </TypographyLarge>
          <div className="flex items-center gap-2">
            <div className="flex items-center cursor-pointer justify-center w-10 h-10 rounded-full bg-muted">
              <IoPersonSharp className="text-gray-600" />
            </div>
            <div>
              <p className="text-muted-foreground text-xs">User</p>
              <p className="text-muted-foreground text-xs">User@gmail.com</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
