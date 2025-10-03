import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Pencil, Trash, Plus } from "lucide-react";
import { StatusBadge } from "@/components/ui/StatusBadge";
import AddDealDialog from "./AddDealDialog";

const initialDeals = [
  {
    title: "Deal A",
    content: "Deal A content",
    dueDate: "18-06-2025",
    completedDate: "18-06-2025",
    assignedTo: { name: "testforai50", email: "testforai50@example.com" },
    contact: "1234567890",
    status: "In Progress",
  },
  {
    title: "Deal B",
    content: "Website revamp project",
    dueDate: "22-06-2025",
    completedDate: "22-06-2025",
    assignedTo: { name: "John Doe", email: "john@example.com" },
    contact: "9876543210",
    status: "Completed",
  },
];

export default function Deals() {
  const [deals, setDeals] = useState(initialDeals);
  const [search, setSearch] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedDeal, setSelectedDeal] = useState(null);

  const filteredDeals = useMemo(() => {
    return deals.filter((deal) =>
      deal.title.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, deals]);

  const handleSave = (newDeal) => {
    if (selectedDeal) {
      setDeals((prev) =>
        prev.map((d) => (d.title === selectedDeal.title ? { ...newDeal } : d))
      );
    } else {
      setDeals((prev) => [...prev, newDeal]);
    }
    setSelectedDeal(null);
  };

  const handleEdit = (deal) => {
    setSelectedDeal(deal);
    setDialogOpen(true);
  };

  const handleDelete = (deal) => {
    setDeals((prev) => prev.filter((d) => d !== deal));
  };

  return (
    <div className="w-full space-y-4">
      {/* Header */}
      <div className="flex justify-between items-center">
        <Input
          placeholder="Search title..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-sm"
        />
        <Button
          onClick={() => {
            setSelectedDeal(null);
            setDialogOpen(true);
          }}
        >
          <Plus /> Create
        </Button>
      </div>

      {/* Table */}
      <div className="rounded-md overflow-x-auto">
        <Table>
          <TableHeader className="bg-gray-100">
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Due Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredDeals.map((deal, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{deal.title}</TableCell>
                <TableCell>
                  <StatusBadge status={deal.status} />
                </TableCell>
                <TableCell>{deal.dueDate}</TableCell>
                <TableCell className="flex justify-end gap-2 border-none">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleEdit(deal)}
                  >
                    <Pencil className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-red-500"
                    onClick={() => handleDelete(deal)}
                  >
                    <Trash className="w-4 h-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Add/Edit Deal Dialog */}
      <AddDealDialog
        open={dialogOpen}
        onClose={() => {
          setDialogOpen(false);
          setSelectedDeal(null);
        }}
        onSave={handleSave}
        initialData={selectedDeal}
      />
    </div>
  );
}
