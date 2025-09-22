import { Badge } from "@/components/ui/badge";
import clsx from "clsx";

export function StatusBadge({ status, className = "" }) {
  const normalizedStatus = status.trim().toLowerCase();

  const statusColorMap = {
    // Standard statuses
    "in progress": "bg-blue-200 text-blue-800",
    completed: "bg-green-200 text-green-800",
    confirmed: "bg-green-200 text-green-800",
    paid: "bg-green-200 text-green-800",
    yes: "bg-green-200 text-green-800",
    unpaid: "bg-orange-200 text-orange-800",
    pending: "bg-yellow-200 text-yellow-800",
    cancelled: "bg-red-200 text-red-800",
    overdue: "bg-orange-200 text-orange-800",
    no: "bg-red-300 text-red-800",
    draft: "bg-gray-200 text-gray-800",

    // CRM/contact types
    "contact parked": "bg-gray-100 text-gray-700",
    customer: "bg-sky-100 text-sky-800",
    lead: "bg-orange-100 text-orange-800",
    opportunity: "bg-purple-100 text-purple-800",
    "qualified lead": "bg-green-100 text-green-800",
    "repeat customer": "bg-indigo-100 text-indigo-800",
    subscriber: "bg-yellow-100 text-yellow-800",

    // Added for leaves
    approved: "bg-green-200 text-green-800",
    "not approved": "bg-red-200 text-red-800",
    rejected: "bg-red-200 text-red-800",
  };

  const colorClass =
    statusColorMap[normalizedStatus] || "bg-gray-300 text-black";

  return (
    <Badge
      className={clsx(
        "text-xs px-2 py-1 rounded-full capitalize",
        colorClass,
        className
      )}
    >
      {status}
    </Badge>
  );
}
