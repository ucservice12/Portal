import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Pencil, Plus, Trash } from "lucide-react";
import { IoPerson } from "react-icons/io5";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { Link } from "react-router-dom";

export function DealsTable({ deals, onEdit, onDelete }) {
  return (
    <>
      <Table>
        <TableHeader className="bg-[#f8f8f8]">
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Assigned To</TableHead>
            <TableHead>Content</TableHead>
            <TableHead>Due Date</TableHead>
            <TableHead>Actual Completion</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-center">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {deals.map((deal, index) => (
            <TableRow key={index}>
              <TableCell>{deal.title}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-muted">
                    <IoPerson className="text-gray-600" />
                  </div>
                  <div>
                    <p>{deal.assignedTo.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {deal.assignedTo.email}
                    </p>
                  </div>
                </div>
              </TableCell>
              <TableCell>{deal.content}</TableCell>
              <TableCell>{deal.dueDate}</TableCell>
              <TableCell>{deal.completedDate}</TableCell>
              <TableCell>
                <StatusBadge status={deal.status} />
              </TableCell>
              <TableCell className="text-center space-x-2">
                <Link to={`/future-sales/proposals/create/${deal?.title}`}>
                  <Button>
                    <Plus />
                    Create
                  </Button>
                </Link>

                {/* <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => onEdit?.(deal)}
                                >
                                    <Pencil className="w-4 h-4" />
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => onDelete?.(deal)}
                                >
                                    <Trash className="w-4 h-4 text-red-500" />
                                </Button> */}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
