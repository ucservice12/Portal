"use client";
import React, { useRef, useState } from "react";
import { TypographyH4, TypographyH2 } from "@/components/custom/Typography";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import AddProductDialog from "../../sales-settings/products/AddProductDialog";
import { ArrowLeft, Plus, X } from "lucide-react";
import { initialCustomers } from "../../current-sales/CurrentSalesCustomers";
import CustomerDialog, {
  getEmptyCustomer,
} from "../../sales-settings/customers/CustomerDialog";
import html2pdf from "html2pdf.js";
import { EMPTY_ITEM } from "../../current-sales/invoice/InvoiceItemDialog";

export default function ProposalDocument() {
  const [item, setItem] = useState(EMPTY_ITEM);
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [customers, setCustomers] = useState(initialCustomers);
  const [selectedCustomer, setSelectedCustomer] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [formData, setFormData] = useState(getEmptyCustomer());
  const [editingIndex, setEditingIndex] = useState(null);

  const [customItems, setCustomItems] = useState([
    { label: "Shop Act", description: "Shop Act Registration", price: 100 },
    { label: "GST Filing", description: "Monthly GST Filing", price: 200 },
    { label: "ITR", description: "Income Tax Return Filing", price: 300 },
  ]);

  const proposalRef = useRef(null);

  const handleItemSelect = (val) => {
    const selected = customItems.find((itm) => itm.label === val);
    if (selected) {
      setItem({
        ...item,
        name: selected.label,
        description: selected.description,
        price: selected.price,
      });
    }
  };

  function openAddCustomer() {
    setFormData(getEmptyCustomer());
    setEditingIndex(null);
    setDialogOpen(true);
  }

  function handleSaveCustomer(customer) {
    const newList = [...customers, customer];
    setCustomers(newList);
    setSelectedCustomer(customer.companyName);
    setDialogOpen(false);
  }

  function handleCloseDialog() {
    setDialogOpen(false);
  }

  const handleAddProduct = (newItem) => {
    setCustomItems((prev) => [...prev, newItem]);
    setItem({
      ...item,
      name: newItem.label,
      description: newItem.description,
      price: newItem.price,
    });
    setShowAddProduct(false);
  };

  const isReadyToDownload = item.name && selectedCustomer;

  const handleDownloadPDF = () => {
    if (proposalRef.current) {
      html2pdf()
        .from(proposalRef.current)
        .set({
          margin: 0.5,
          filename: "proposal.pdf",
          html2canvas: { scale: 2 },
          jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
        })
        .save();
    }
  };

  return (
    <>
      <div className="flex sm:flex-row flex-col justify-between gap-4 sm:items-center">
        <TypographyH2>Create An Proposals</TypographyH2>

        <div className="flex sm:flex-row flex-col sm:items-center gap-3">
          <Button variant="outline">
            <ArrowLeft /> Back
          </Button>
          <Button>Save Proposals</Button>
          <Button
            variant={isReadyToDownload ? "default" : "secondary"}
            disabled={!isReadyToDownload}
            onClick={handleDownloadPDF}
          >
            Download PDF
          </Button>
        </div>
      </div>

      <div className="grid gap-2 sm:max-w-md mt-2">
        <div className="flex items-center justify-between">
          <TypographyH4>Product</TypographyH4>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setShowAddProduct(true)}
          >
            <Plus className="text-muted-foreground" />
          </Button>
        </div>
        <Select value={item.name} onValueChange={handleItemSelect}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select item" />
          </SelectTrigger>
          <SelectContent>
            {customItems.map((itm, idx) => (
              <SelectItem key={idx} value={itm.label}>
                {itm.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <div className="grid gap-2 flex-1">
          <div className="flex justify-between items-center pr-2">
            <TypographyH4>Customer</TypographyH4>
            <Plus
              className="w-4 h-4 cursor-pointer text-muted-foreground"
              onClick={openAddCustomer}
            />
          </div>
          <div className="relative w-full border-blue-500">
            <Select
              value={selectedCustomer}
              onValueChange={setSelectedCustomer}
            >
              <SelectTrigger className="w-full pr-10">
                <SelectValue placeholder="Select customer" />
              </SelectTrigger>
              <SelectContent>
                {customers.map((cust, idx) => (
                  <SelectItem
                    key={cust.companyName + idx}
                    value={cust.companyName}
                  >
                    {cust.companyName}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {selectedCustomer && (
              <button
                type="button"
                onClick={() => setSelectedCustomer("")}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-red-500"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>

      <AddProductDialog
        open={showAddProduct}
        onClose={() => setShowAddProduct(false)}
        onAdd={handleAddProduct}
      />

      <CustomerDialog
        open={dialogOpen}
        onClose={handleCloseDialog}
        initialData={editingIndex !== null ? customers[editingIndex] : null}
        editingIndex={editingIndex}
        onSubmit={handleSaveCustomer}
      />

      {/* Document Visible Only If Both Are Selected */}
      {isReadyToDownload && (
        <div
          ref={proposalRef}
          className="max-w-4xl py-10 text-sm text-gray-900"
        >
          {/* Header */}
          <div className="flex justify-between items-start mb-6">
            <img src="/logo.png" alt="Company Logo" className="sm:w-40 w-32" />
            <div className="text-right">
              <h2 className="text-2xl font-bold">Uc Services Pvt Ltd</h2>
              <p>Office no.02, 15, Zeroboyz Chowk, above HDFC Bank,</p>
              <p>
                Nehru Nagar, Pimpri Colony, Pune, Pimpri-Chinchwad, Maharashtra
                411018
              </p>
              <p>Contact: +91 7709222331, +91 9270033002</p>
              <p>Email: companydemo@gmail.com</p>
            </div>
          </div>

          {/* Title */}
          <h3 className="text-xl font-semibold mb-2">**Income tax 1**</h3>
          <h4 className="text-lg font-semibold mb-4">Development Proposal</h4>

          {/* Prepared Info */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <p>
                <strong>Version:</strong> V1
              </p>
              <p>
                <strong>Document Status:</strong> Released
              </p>
              <p>
                <strong>PREPARED FOR:</strong>
              </p>
              <p>{selectedCustomer}, India</p>
              <p>Phone: ___________</p>
              <p>Email: ___________</p>
            </div>
            <div>
              <p>
                <strong>PREPARED BY:</strong>
              </p>
              <p>Your name</p>
              <p>Your address</p>
              <p>Your email</p>
              <p>Your contact</p>
            </div>
          </div>

          {/* Document History */}
          <div className="mb-6">
            <h4 className="font-semibold mb-2">Document History</h4>
            <table className="w-full table-auto border border-collapse border-gray-400 text-left">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border p-2">Version</th>
                  <th className="border p-2">Description</th>
                  <th className="border p-2">Author</th>
                  <th className="border p-2">Date</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border p-2">1</td>
                  <td className="border p-2"></td>
                  <td className="border p-2"></td>
                  <td className="border p-2"></td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Project Overview */}
          <div className="mb-6">
            <h4 className="font-semibold mb-2">Project Overview:</h4>
            <p>
              <strong>Objective:</strong>
            </p>
            <p>Write objective here...</p>
            <p className="mt-2">
              <strong>Scope of Work:</strong>
            </p>
            <p>Write platform and functionalities here...</p>
            <p className="mt-2">
              <strong>Functionalities:</strong>
            </p>
            <ul className="list-disc list-inside">
              <li>Functionality 1</li>
              <li>Functionality 2</li>
              <li>Functionality 3</li>
            </ul>
            <p className="mt-2">
              <strong>Design:</strong>
            </p>
            <p>Write design here...</p>
          </div>

          {/* Project Timeline */}
          <div className="mb-6">
            <h4 className="font-semibold mb-2">Project Timeline:</h4>
            <table className="w-full table-auto border border-collapse border-gray-400 text-left">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border p-2">S.No</th>
                  <th className="border p-2">Approximate Timeline</th>
                  <th className="border p-2">Duration</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border p-2">1</td>
                  <td className="border p-2">Timeline Description</td>
                  <td className="border p-2">Duration</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Project Team */}
          <div className="mb-6">
            <h4 className="font-semibold mb-2">Project Team:</h4>
            <ul className="list-decimal list-inside">
              <li>Project Manager</li>
              <li>Lead Mobile App Developer</li>
              <li>Mobile App Developer</li>
              <li>UI/UX Developer</li>
            </ul>
          </div>

          {/* Project Budget */}
          <div className="mb-6">
            <h4 className="font-semibold mb-2">Project Budget:</h4>
            <table className="w-full table-auto border border-collapse border-gray-400 text-left">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border p-2">S.No</th>
                  <th className="border p-2">Approximate Budget</th>
                  <th className="border p-2">Budget</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border p-2">1</td>
                  <td className="border p-2">Amount</td>
                  <td className="border p-2">Total</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Proposal Acceptance */}
          <div className="mb-6">
            <h4 className="font-semibold mb-2">Proposal Acceptance:</h4>
            <p>
              By signing below, the client agrees to the terms of this proposal
              and authorizes the commencement of the project.
            </p>
            <p className="mt-2">
              Customer Name: <strong>{selectedCustomer}</strong>
            </p>
            <p>Customer Signature: ______________________</p>
            <p>
              Client Company/Title: <strong>COMPANY/TITLE</strong>
            </p>
            <p className="mt-4">
              We appreciate your consideration and look forward to working with
              you on this innovative project.
            </p>
            <p className="mt-2 font-semibold">Sincerely,</p>
            <p>
              <strong>Your Name</strong>
            </p>
          </div>

          {/* About Company */}
          <div>
            <h4 className="font-semibold mb-2">About the Company:</h4>
            <p>
              <strong>Locations:</strong>
            </p>
            <p>Add locations here...</p>
            <p className="mt-2">
              <strong>Vision:</strong>
            </p>
            <p>Add vision here...</p>
            <p className="mt-2">
              <strong>Customer References:</strong>
            </p>
            <p>Add customer references here...</p>
          </div>
        </div>
      )}
    </>
  );
}
