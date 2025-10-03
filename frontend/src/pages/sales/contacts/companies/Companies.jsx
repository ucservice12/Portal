import { useState } from "react";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import CompanyDialog from "./CompanyDialog";
import { TypographyH3 } from "@/components/custom/Typography";

export default function Companies() {
  const [companies, setCompanies] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState(null);

  const handleSave = (company) => {
    if (selectedCompany?.index !== undefined) {
      const updated = [...companies];
      updated[selectedCompany.index] = company;
      setCompanies(updated);
    } else {
      setCompanies([...companies, company]);
    }
    setSelectedCompany(null);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <TypographyH3>Companies Details</TypographyH3>

        {/* Create Company */}
        <CompanyDialog
          trigger={
            <Button>
              <Plus /> Create
            </Button>
          }
          onSave={handleSave}
          defaultData={null}
        />
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Company Name</TableHead>
            <TableHead>Address</TableHead>
            <TableHead>Domain</TableHead>
            <TableHead>Latitude</TableHead>
            <TableHead>Longitude</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {companies.map((company, i) => (
            <TableRow key={i}>
              <TableCell>{company.name}</TableCell>
              <TableCell>{company.address}</TableCell>
              <TableCell>{company.domain}</TableCell>
              <TableCell>{company.latitude}</TableCell>
              <TableCell>{company.longitude}</TableCell>
              <TableCell className="text-right space-x-2">
                {/* Edit Company */}
                <CompanyDialog
                  trigger={
                    <Button variant="ghost" size="icon">
                      <Pencil className="w-4 h-4" />
                    </Button>
                  }
                  onSave={(updated) => {
                    const list = [...companies];
                    list[i] = updated;
                    setCompanies(list);
                  }}
                  defaultData={company}
                />

                {/* Delete */}
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() =>
                    setCompanies(companies.filter((_, idx) => idx !== i))
                  }
                >
                  <Trash2 className="w-4 h-4 text-red-500" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
