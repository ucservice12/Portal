"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { TypographyH3 } from "@/components/custom/Typography";
import FiscalYearDialog from "./FiscalYearDialog";
import { format } from "date-fns";

export default function FiscalYear() {
  const [fiscalYears, setFiscalYears] = useState([
    {
      year: "2025",
      startDate: "2025-06-27",
      endDate: "2026-06-26",
    },
    {
      year: "2024",
      startDate: "2024-04-01",
      endDate: "2025-03-31",
    },
  ]);

  const [editData, setEditData] = useState(null);

  const handleSave = (newData) => {
    if (editData) {
      // Edit
      setFiscalYears((prev) =>
        prev.map((fy) => (fy.year === editData.year ? newData : fy))
      );
      setEditData(null);
    } else {
      // Add
      setFiscalYears((prev) => [...prev, newData]);
    }
  };

  return (
    <div className="space-y-6">
      <Select>
        <SelectTrigger className="sm:w-[250px] w-full">
          <SelectValue placeholder="Select Currency" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="USD">USD</SelectItem>
            <SelectItem value="INR">INR</SelectItem>
            <SelectItem value="EUR">EUR</SelectItem>
            <SelectItem value="JPY">JPY</SelectItem>
            <SelectItem value="SGD">SGD</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>

      <div className="flex justify-between items-center my-6">
        <TypographyH3>Fiscal Year</TypographyH3>
        <FiscalYearDialog
          trigger={
            <Button>
              <Plus />
              Add Fiscal Year
            </Button>
          }
          onSave={handleSave}
        />
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Year</TableHead>
            <TableHead>Start Date</TableHead>
            <TableHead>End Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {fiscalYears.map((fy, idx) => (
            <TableRow key={idx}>
              <TableCell>{fy.year}</TableCell>
              <TableCell>
                {format(new Date(fy.startDate), "dd-MM-yyyy")}
              </TableCell>
              <TableCell>
                {format(new Date(fy.endDate), "dd-MM-yyyy")}
              </TableCell>
              <TableCell className="space-x-2 text-right">
                <FiscalYearDialog
                  trigger={
                    <Button variant="outline" size="icon">
                      <Pencil />
                    </Button>
                  }
                  initialData={fy}
                  onSave={handleSave}
                />
                <Button
                  variant="outline"
                  className="text-red-600"
                  size="icon"
                  onClick={() =>
                    setFiscalYears((prev) =>
                      prev.filter((item) => item.year !== fy.year)
                    )
                  }
                >
                  <Trash2 />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
