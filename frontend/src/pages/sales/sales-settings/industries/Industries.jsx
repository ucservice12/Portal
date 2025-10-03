"use client";

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
import { useState } from "react";
import { TypographyH3 } from "@/components/custom/Typography";
import IndustryDialog from "./IndustryDialog";

export default function Industries() {
  const [industries, setIndustries] = useState([]);

  const handleSave = (name, index = null) => {
    if (index !== null) {
      const updated = [...industries];
      updated[index] = name;
      setIndustries(updated);
    } else {
      setIndustries([...industries, name]);
    }
  };

  return (
    <div>
      <div className="flex justify-between mb-4">
        <TypographyH3>Industries</TypographyH3>

        {/* Create Industry */}
        <IndustryDialog
          trigger={
            <Button>
              <Plus />
              Create
            </Button>
          }
          onSave={(name) => handleSave(name)}
          initialValue=""
        />
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-center">Industry</TableHead>
            <TableHead className="text-center">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {industries.map((industry, index) => (
            <TableRow key={index}>
              <TableCell className="text-center">{industry}</TableCell>
              <TableCell className="text-center space-x-2">
                {/* Edit Button with Dialog */}
                <IndustryDialog
                  trigger={
                    <Button variant="ghost" size="icon">
                      <Pencil className="w-4 h-4" />
                    </Button>
                  }
                  onSave={(name) => handleSave(name, index)}
                  initialValue={industry}
                />

                {/* Delete Button */}
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-red-600"
                  onClick={() =>
                    setIndustries((prev) => prev.filter((_, i) => i !== index))
                  }
                >
                  <Trash className="w-4 h-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
