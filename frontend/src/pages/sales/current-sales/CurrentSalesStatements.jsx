import { Combobox } from "@/components/custom/ComboBox";
import { useState } from "react";
import CurrentSalesInvoices from "./invoice/CurrentSalesInvoices";
import { FutureSalesEstimate } from "../future-sales/estimate/FutureSalesEstimate";

const customers = [
  { value: "cust1", label: "Amit Sharma" },
  { value: "cust2", label: "Neha Verma" },
  { value: "cust3", label: "Ravi Patel" },
  { value: "cust4", label: "Pooja Mehra" },
  { value: "cust5", label: "Karan Kapoor" },
];

export function CurrentSalesStatements() {
  const [selectedCustomer, setSelectedCustomer] = useState("");

  return (
    <div className="space-y-6 mb-6">
      <div className="border-b pb-6">
        <Combobox
          headline="Select an customer"
          options={customers}
          value={selectedCustomer}
          onChange={setSelectedCustomer}
          placeholder="Select a Customer"
        />
      </div>
      <CurrentSalesInvoices />
      <div className="border-b " />
      <FutureSalesEstimate />
    </div>
  );
}
