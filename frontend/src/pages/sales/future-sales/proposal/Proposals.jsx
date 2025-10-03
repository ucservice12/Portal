import { useMemo, useState } from "react";
import { FilterPanel } from "@/components/FilterPanel";
import { DealsTable } from "../deals/DealsTable";
import { TypographyH2 } from "@/components/custom/Typography";

// Mock data
const dealsData = [
  {
    title: "Deal A",
    assignedTo: { name: "testforai50", email: "testforai50@example.com" },
    content: "Deal descriptions",
    dueDate: "18-06-2025",
    completedDate: "18-06-2025",
    status: "In Progress",
  },
  {
    title: "Deal B",
    assignedTo: { name: "John Doe", email: "john@example.com" },
    content: "Website revamp project",
    dueDate: "22-06-2025",
    completedDate: "22-06-2025",
    status: "Completed",
  },
  {
    title: "Deal C",
    assignedTo: { name: "Jane Doe", email: "jane@example.com" },
    content: "SEO & Marketing campaign",
    dueDate: "30-06-2025",
    completedDate: "—",
    status: "Pending",
  },
];

export default function Proposals() {
  const [searchText, setSearchText] = useState("");
  const [dateRange, setDateRange] = useState("All");
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);

  const handleEdit = (deal) => {
    console.log("Edit clicked:", deal);
  };

  const handleDelete = (deal) => {
    console.log("Delete clicked:", deal);
  };

  const filteredDeals = useMemo(() => {
    let result = [...dealsData];

    if (searchText) {
      const query = searchText.toLowerCase();
      result = result.filter(
        (deal) =>
          deal.title.toLowerCase().includes(query) ||
          deal.assignedTo.name.toLowerCase().includes(query) ||
          deal.assignedTo.email.toLowerCase().includes(query)
      );
    }

    if (dateRange !== "All") {
      const today = new Date();
      let startDate = null;

      if (dateRange === "Last Week") {
        startDate = new Date(today);
        startDate.setDate(today.getDate() - 7);
      } else if (dateRange === "Last Month") {
        startDate = new Date(today);
        startDate.setMonth(today.getMonth() - 1);
      } else if (dateRange === "Last Year") {
        startDate = new Date(today);
        startDate.setFullYear(today.getFullYear() - 1);
      }

      if (startDate) {
        result = result.filter((deal) => {
          const dealDate = new Date(
            deal.dueDate.split("-").reverse().join("-")
          );
          return dealDate >= startDate && dealDate <= today;
        });
      }
    }

    if (fromDate && toDate) {
      const from = new Date(fromDate);
      const to = new Date(toDate);

      result = result.filter((deal) => {
        const dealDate = new Date(deal.dueDate.split("-").reverse().join("-"));
        return dealDate >= from && dealDate <= to;
      });
    }

    return result;
  }, [searchText, dateRange, fromDate, toDate]);

  return (
    <div className="space-y-4">
      <TypographyH2>Proposals</TypographyH2>
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        <div className="md:col-span-3">
          <FilterPanel
            invoiceNumber={searchText}
            setInvoiceNumber={setSearchText}
            placeholder="Search by title or assignee"
            dateRange={dateRange}
            setDateRange={setDateRange}
            fromDate={fromDate}
            setFromDate={setFromDate}
            toDate={toDate}
            setToDate={setToDate}
          />
        </div>
        <div className="md:col-span-9">
          <DealsTable
            deals={filteredDeals}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </div>
      </div>
    </div>
  );
}
