import { useState, useMemo } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { IoPersonSharp } from "react-icons/io5";
import { CheckCircle2, XCircle, FileDown } from "lucide-react";
import { Pagination } from "@/components/custom/Pagination";

// Replace with your actual data
const mockData = [
  {
    date: "20-07-2025",
    project: "Tech Infra Upgrade",
    task: "System Architecture Review",
    description:
      "Reviewed and documented the entire backend infrastructure including Redis caching, API Gateway, and microservice health monitors.",
    hours: 5,
    status: "Not Approved",
    user: {
      name: "anishasahu1107",
      email: "anishasahu1107@gmail.com",
    },
  },
  {
    date: "14-07-2025",
    project: "Website Redesign",
    task: "UI Update",
    description:
      "Implemented pixel-perfect designs for the new dashboard UI using TailwindCSS and Framer Motion animations.",
    hours: 4,
    status: "Not Approved",
    user: {
      name: "anishasahu1107",
      email: "anishasahu1107@gmail.com",
    },
  },
  {
    date: "01-07-2025",
    project: "Mobile App Dev",
    task: "Bug Fixes",
    description:
      "Fixed crash issues on Android 14 related to file permissions and upgraded Expo SDK.",
    hours: 4,
    status: "Approved",
    user: {
      name: "anishasahu1107",
      email: "anishasahu1107@gmail.com",
    },
  },
  {
    date: "22-07-2025",
    project: "Project Gamma",
    task: "Research and Development",
    description:
      "This is a long description that should wrap to the next line if it exceeds the cell width. It also includes technical deep dives into experimental AI-driven data clustering models.",
    hours: 7,
    status: "Not Approved",
    user: {
      name: "other",
      email: "other@example.com",
    },
  },
  {
    date: "25-07-2025",
    project: "Analytics Dashboard",
    task: "KPI Definition",
    description:
      "Worked with stakeholders to define business KPIs and configure real-time analytics dashboards using Chart.js and D3.",
    hours: 6,
    status: "Approved",
    user: {
      name: "divyasharma_super_admin",
      email: "divya@analyticspro.com",
    },
  },
  {
    date: "26-07-2025",
    project: "API Gateway",
    task: "Rate Limiting Implementation",
    description:
      "Added dynamic rate limiting logic using Redis tokens and handled burst traffic scenarios gracefully.",
    hours: 5,
    status: "Approved",
    user: {
      name: "john_doe_enterprise",
      email: "john.doe@enterprise.io",
    },
  },
  {
    date: "28-07-2025",
    project: "Onboarding Automation",
    task: "Script Writing",
    description:
      "Automated the user onboarding flow with custom bash scripts and Ansible playbooks for seamless provisioning.",
    hours: 3,
    status: "Not Approved",
    user: {
      name: "onboarding_ops_team",
      email: "ops@company.com",
    },
  },
  {
    date: "29-07-2025",
    project: "Database Optimization",
    task: "Query Tuning",
    description:
      "Refactored over 15+ queries to reduce response times by 60% using EXPLAIN plans and indexes.",
    hours: 6,
    status: "Approved",
    user: {
      name: "anishasahu1107",
      email: "anishasahu1107@gmail.com",
    },
  },
  {
    date: "30-07-2025",
    project: "Content Management System",
    task: "Permission Matrix",
    description:
      "Created a robust and scalable permission matrix for multi-role CMS including nested access logic.",
    hours: 4,
    status: "Pending",
    user: {
      name: "cms_admin_user",
      email: "admin@cmsworld.com",
    },
  },
  {
    date: "31-07-2025",
    project: "Client Deployment",
    task: "Production Release",
    description:
      "Coordinated release of v3.2.1 to the client environment and performed sanity checks post-deployment.",
    hours: 8,
    status: "Approved",
    user: {
      name: "deploy_bot_prod",
      email: "deploy@ci-cd.com",
    },
  },
];

const DURATIONS = [
  "All Time",
  "This Week",
  "Last Week",
  "This Month",
  "Last Month",
];
const TEAM_MEMBERS = [
  "__all",
  ...Array.from(new Set(mockData.map((d) => d.user.name))),
];
const PAGE_SIZE = 5;

export default function Timesheet() {
  const [duration, setDuration] = useState("All Time");
  const [teamMember, setTeamMember] = useState("__all");
  const [checkedRows, setCheckedRows] = useState([]);
  const [page, setPage] = useState(1);

  const filteredData = useMemo(() => {
    let data = [...mockData];
    if (teamMember !== "__all") {
      data = data.filter((d) => d.user.name === teamMember);
    }
    return data;
  }, [teamMember]);

  const pageCount = Math.ceil(filteredData.length / PAGE_SIZE);
  const paginatedData = filteredData.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE
  );

  const handleCheck = (index) => {
    setCheckedRows((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const handleCheckAll = (checked) => {
    if (checked) {
      setCheckedRows(paginatedData.map((_, idx) => idx));
    } else {
      setCheckedRows([]);
    }
  };

  const isAnyChecked = checkedRows.length > 0;

  const handlePageChange = (newPage) => {
    setPage(newPage);
    setCheckedRows([]);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-4 items-end">
        <div className="grid gap-1">
          <Label>Duration Type</Label>
          <Select value={duration} onValueChange={setDuration}>
            <SelectTrigger className="min-w-xs">
              <SelectValue placeholder="Select duration" />
            </SelectTrigger>
            <SelectContent>
              {DURATIONS.map((d) => (
                <SelectItem key={d} value={d}>
                  {d}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="grid gap-1">
          <Label>Team Member</Label>
          <Select value={teamMember} onValueChange={setTeamMember}>
            <SelectTrigger className="min-w-xs">
              <SelectValue placeholder="Team Member" />
            </SelectTrigger>
            <SelectContent>
              {TEAM_MEMBERS.map((name) => (
                <SelectItem key={name} value={name}>
                  {name === "__all" ? "All" : name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex gap-2">
          <Button size="sm" variant="success" disabled={!isAnyChecked}>
            <CheckCircle2 /> Approve
          </Button>
          <Button size="sm" variant="destructive" disabled={!isAnyChecked}>
            <XCircle /> Reject
          </Button>
          <Button size="sm" variant="outline" disabled={!isAnyChecked}>
            <FileDown /> Export
          </Button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <Table className="mt-4">
          <TableHeader>
            <TableRow>
              <TableHead className="w-10">
                <Checkbox
                  checked={
                    checkedRows.length === paginatedData.length &&
                    paginatedData.length > 0
                  }
                  indeterminate={
                    checkedRows.length > 0 &&
                    checkedRows.length < paginatedData.length
                      ? true
                      : undefined
                  }
                  onCheckedChange={handleCheckAll}
                />
              </TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Project</TableHead>
              <TableHead>Task</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Hours</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Logged By</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedData.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center">
                  No data found.
                </TableCell>
              </TableRow>
            ) : (
              paginatedData.map((entry, index) => (
                <TableRow key={index}>
                  <TableCell className="w-10">
                    <Checkbox
                      checked={checkedRows.includes(index)}
                      onCheckedChange={() => handleCheck(index)}
                    />
                  </TableCell>
                  <TableCell>{entry.date}</TableCell>
                  <TableCell className="whitespace-normal break-words max-w-[200px]">
                    {entry.project}
                  </TableCell>
                  <TableCell className="whitespace-normal break-words max-w-[200px]">
                    {entry.task}
                  </TableCell>
                  <TableCell className="whitespace-normal break-words min-w-[300px]">
                    {entry.description}
                  </TableCell>
                  <TableCell>{parseFloat(entry.hours).toFixed(2)}</TableCell>
                  <TableCell>
                    <StatusBadge status={entry.status} />
                  </TableCell>
                  <TableCell className="flex gap-2">
                    <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                      <IoPersonSharp className="text-gray-600" />
                    </div>
                    <div className="grid gap-1">
                      <div>{entry.user.name}</div>
                      <div className="text-xs text-muted-foreground">
                        {entry.user.email}
                      </div>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Reusable Pagination */}
      <Pagination
        currentPage={page}
        totalPages={pageCount}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
