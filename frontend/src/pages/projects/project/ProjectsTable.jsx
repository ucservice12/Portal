"use client";

import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/ui/StatusBadge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Pencil, Trash, Plus } from "lucide-react";
import { IconFileExport } from "@tabler/icons-react";
import ProjectDialog from "./ProjectDialog";

const mockProjects = [
  {
    id: 1,
    name: "Project",
    status: "Open",
    customer: "company name",
    lead: "abhijeet",
    assigned: 0,
    billed: 0,
    balance: 0,
    extra: 0,
    startDate: "02-07-2025",
    completionDate: "02-07-2025",
    poStatus: "Not Received",
    invoiceStatus: "Pending",
  },
];

export default function ProjectsTable() {
  const [open, setOpen] = useState(false);
  const [projectToEdit, setProjectToEdit] = useState(null);

  const handleEdit = (project) => {
    setProjectToEdit(project);
    setOpen(true);
  };

  const handleCreate = () => {
    setProjectToEdit(null);
    setOpen(true);
  };

  return (
    <div className="space-y-4 scrollbar-hide">
      {/* Filters and Actions */}
      <div className="flex flex-wrap justify-between gap-2">
        <div className="flex flex-wrap gap-2">
          <Input placeholder="Search Project By Title" className="w-[220px]" />
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter Customer" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="company-name">Company Name</SelectItem>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Open">Open</SelectItem>
              <SelectItem value="Closed">Closed</SelectItem>
              <SelectItem value="Planned">Planned</SelectItem>
              <SelectItem value="Delivered">Delivered</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex gap-4">
          <Button variant="outline">
            <IconFileExport />
            Export
          </Button>
          <Button onClick={handleCreate}>
            <Plus />
            Create
          </Button>
        </div>
      </div>

      {/* Table */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>
              <Checkbox />
            </TableHead>
            <TableHead className="whitespace-normal break-words max-w-xs">
              Project Name
            </TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="whitespace-normal break-words max-w-xs">
              Customer Name
            </TableHead>
            <TableHead>Lead Name</TableHead>
            <TableHead className="text-right whitespace-normal break-words max-w-xs">
              Assigned Hours
            </TableHead>
            <TableHead className="text-right whitespace-normal break-words max-w-xs">
              Billed Hours
            </TableHead>
            <TableHead className="text-right whitespace-normal break-words max-w-xs">
              Balance Hours
            </TableHead>
            <TableHead className="text-right whitespace-normal break-words max-w-xs">
              Extra Hours
            </TableHead>
            <TableHead className="whitespace-normal break-words max-w-xs">
              Start Date
            </TableHead>
            <TableHead className="whitespace-normal break-words max-w-xs">
              Completion Date
            </TableHead>
            <TableHead className="whitespace-normal break-words max-w-xs">
              PO Status
            </TableHead>
            <TableHead className="whitespace-normal break-words max-w-xs">
              Invoice Status
            </TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {mockProjects.map((project) => (
            <TableRow key={project.id}>
              <TableCell>
                <Checkbox />
              </TableCell>
              <TableCell>
                <Link
                  to={`/projects/${project.id}/dashboard`}
                  className="text-blue-600 hover:underline"
                >
                  {project.name}
                </Link>
              </TableCell>
              <TableCell>
                <StatusBadge status={project.status} />
              </TableCell>
              <TableCell className="whitespace-normal break-words max-w-xs">
                {project.customer}
              </TableCell>
              <TableCell className="whitespace-normal break-words max-w-xs">
                {project.lead}
              </TableCell>
              <TableCell className="text-right whitespace-normal break-words max-w-xs">
                {project.assigned}
              </TableCell>
              <TableCell className="text-right">{project.billed}</TableCell>
              <TableCell className="text-right">{project.balance}</TableCell>
              <TableCell className="text-right">{project.extra}</TableCell>
              <TableCell>{project.startDate}</TableCell>
              <TableCell>{project.completionDate}</TableCell>
              <TableCell>{project.poStatus}</TableCell>
              <TableCell>
                <StatusBadge status={project.invoiceStatus} />
              </TableCell>
              <TableCell className="text-right space-x-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleEdit(project)}
                >
                  <Pencil size={14} />
                </Button>
                <Button variant="outline" className="text-red-600" size="icon">
                  <Trash size={14} />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Project Dialog */}
      <ProjectDialog open={open} setOpen={setOpen} editData={projectToEdit} />
    </div>
  );
}
