import { useState } from "react";
import {
  TypographyH3,
  TypographyH1,
  TypographySmall,
  TypographyMuted,
  TypographyH5,
  TypographyH4,
} from "@/components/custom/Typography";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { CalendarInput } from "@/components/custom/Calendar";
import { ArrowLeft, Pencil, Plus, Trash, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { initialCustomers } from "../CurrentSalesCustomers";
import InvoiceItemDialog from "./InvoiceItemDialog";
import CustomerDialog, {
  getEmptyCustomer,
} from "../../sales-settings/customers/CustomerDialog";
import NotesDialog from "../../sales-settings/notes-terms/NotesDialog";
import AddFooterDialog from "../../sales-settings/footer/AddFooterDialog";

const noteOptions = ["Thank you!", "Payment due in 15 days", "Confidential"];

const defaultFooterOptions = [
  {
    name: "Authorized Signature",
    footerNote: "Authorized Signature",
    footerType: "Invoice",
  },
  { name: "Stamp Only", footerNote: "Stamp Only", footerType: "Invoice" },
];

const InvoiceHeader = () => (
  <div className="flex justify-between sm:flex-row flex-col items-start border-b-2 pb-6">
    <img src="/logo.png" alt="Logo" className="h-20 object-contain" />
    <div className="grid gap-1 sm:w-80">
      <TypographyH1>INVOICE</TypographyH1>
      <TypographyH5>UC Services Pvt Ltd</TypographyH5>
      <TypographyMuted className="tracking-normal leading-7">
        Office no.02, 1st, Zerobrq Chowk, above HDFC Bank, Nehru Nagar, Pimpri
        Colony, Pimpri-Chinchwad, Maharashtra 411018
      </TypographyMuted>
      <TypographyMuted>Contact: +91 7709223831, +91 9270033902</TypographyMuted>
    </div>
  </div>
);

const InvoiceCustomerDetails = ({
  customers,
  selectedCustomer,
  setSelectedCustomer,
  openAddCustomer,
  dueDate,
  setDueDate,
}) => {
  const customer = customers.find((c) => c.companyName === selectedCustomer);

  return (
    <>
      <div className="flex justify-between gap-6">
        <div className="grid gap-2 flex-1">
          <div className="flex justify-between items-center pr-2">
            <Label>Customer</Label>
            <Plus
              className="w-4 h-4 cursor-pointer text-muted-foreground"
              onClick={openAddCustomer}
            />
          </div>
          <Select value={selectedCustomer} onValueChange={setSelectedCustomer}>
            <SelectTrigger className="w-full border-blue-500">
              <div className="flex-1 truncate text-left">
                {selectedCustomer || (
                  <span className="text-muted-foreground">Select customer</span>
                )}
              </div>
              {selectedCustomer && (
                <Button variant="ghost" size="icon" type="button" tabIndex={-1}>
                  <X
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedCustomer("");
                    }}
                  />
                </Button>
              )}
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
        </div>

        <div className="sm:w-sm flex justify-end">
          <CalendarInput
            label="Due Date:"
            value={dueDate}
            onChange={setDueDate}
            placeholder="MM/DD/YYYY"
          />
        </div>
      </div>

      {customer && (
        <div className="max-w-md mt-4 space-y-1">
          <TypographySmall>Bill To,</TypographySmall>
          <br />
          <TypographySmall>
            {customer.firstName} {customer.lastName}
          </TypographySmall>
          <br />
          <TypographyMuted className="tracking-normal leading-6">
            Company: {customer.companyName}
            <br />
            Billing Address: {customer.billingAddress}
            <br />
            Shipping Address: {customer.shippingAddress}
            <br />
            Phone: {customer.phone1}
            {customer.phone2 ? `, ${customer.phone2}` : ""}
            <br />
            Email: {customer.email1}
            {customer.email2 ? `, ${customer.email2}` : ""}
            <br />
          </TypographyMuted>
        </div>
      )}
    </>
  );
};

const InvoiceItemsTable = ({ items, setItems }) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  const handleSaveItem = (newItem) => {
    if (editIndex !== null) {
      const updated = [...items];
      updated[editIndex] = newItem;
      setItems(updated);
    } else {
      setItems([...items, newItem]);
    }
    setDialogOpen(false);
    setEditIndex(null);
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    setDialogOpen(true);
  };

  const handleDelete = (index) => {
    const updated = items.filter((_, i) => i !== index);
    setItems(updated);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <TypographyH4>Invoice Items</TypographyH4>
        <Button
          variant="outline"
          onClick={() => {
            setDialogOpen(true);
            setEditIndex(null);
          }}
        >
          <Plus className="w-4 h-4 mr-2" /> Add Item
        </Button>
      </div>

      <div className="border rounded-md overflow-auto">
        <Table>
          <TableHeader className="bg-gray-100">
            <TableRow>
              <TableHead className="w-10">#</TableHead>
              <TableHead>Item</TableHead>
              <TableHead>Description</TableHead>
              <TableHead className="text-right">Qty</TableHead>
              <TableHead className="text-right">Price</TableHead>
              <TableHead className="text-right">Tax</TableHead>
              <TableHead className="text-right">Total</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.length > 0 ? (
              items.map((item, idx) => (
                <TableRow key={idx}>
                  <TableCell>{idx + 1}</TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.description}</TableCell>
                  <TableCell className="text-right">{item.quantity}</TableCell>
                  <TableCell className="text-right">{item.price}</TableCell>
                  <TableCell className="text-right">{item.tax}</TableCell>
                  <TableCell className="text-right">
                    {(item.quantity * item.price + item.tax).toFixed(2)}
                  </TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleEdit(idx)}
                    >
                      <Pencil className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(idx)}
                    >
                      <Trash className="w-4 h-4 text-red-500" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={8}
                  className="text-center text-muted-foreground"
                >
                  No items added yet
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <InvoiceItemDialog
        open={dialogOpen}
        onClose={() => {
          setDialogOpen(false);
          setEditIndex(null);
        }}
        onSave={handleSaveItem}
        itemToEdit={editIndex !== null ? items[editIndex] : null}
      />
    </div>
  );
};

const NotesAndTerms = ({ selectedNote, setSelectedNote }) => {
  const [noteDialogOpen, setNoteDialogOpen] = useState(false);
  const [customNotes, setCustomNotes] = useState([...noteOptions]);

  const handleAddNote = (newNote) => {
    setCustomNotes([...customNotes, newNote.name]);
    setSelectedNote(newNote.name);
    setNoteDialogOpen(false);
  };

  return (
    <div className="grid gap-2 sm:max-w-md">
      <div className="flex items-center justify-between">
        <TypographyH4>Notes & Terms</TypographyH4>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setNoteDialogOpen(true)}
        >
          <Plus />
        </Button>
      </div>
      <Select value={selectedNote} onValueChange={setSelectedNote}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select Notes and Terms" />
        </SelectTrigger>
        <SelectContent>
          {customNotes.map((note) => (
            <SelectItem key={note} value={note}>
              {note}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <div className="mt-3 ml-2">{selectedNote && selectedNote}</div>

      <NotesDialog
        open={noteDialogOpen}
        onClose={() => setNoteDialogOpen(false)}
        onSave={handleAddNote}
      />
    </div>
  );
};

const InvoiceFooter = ({
  selectedFooter,
  setSelectedFooter,
  footerNote,
  setFooterNote,
}) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [footerOptions, setFooterOptions] = useState(defaultFooterOptions);

  const handleSelectFooter = (name) => {
    setSelectedFooter(name);
    const selected = footerOptions.find((f) => f.name === name);
    if (selected) {
      setFooterNote(selected.footerNote);
    } else {
      setFooterNote("");
    }
  };

  const handleAddFooter = (newFooter) => {
    const newFooterObj = {
      name: newFooter.name,
      footerNote: newFooter.footerNote,
      footerType: newFooter.footerType,
    };

    setFooterOptions([...footerOptions, newFooterObj]);
    setSelectedFooter(newFooterObj.name);
    setFooterNote(newFooterObj.footerNote);
    setDialogOpen(false);
  };

  return (
    <div className="grid gap-2 sm:max-w-md">
      <div className="flex items-center justify-between">
        <TypographyH4>Footer</TypographyH4>
        <Button variant="ghost" size="icon" onClick={() => setDialogOpen(true)}>
          <Plus />
        </Button>
      </div>

      <Select value={selectedFooter} onValueChange={handleSelectFooter}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select Footer Name" />
        </SelectTrigger>
        <SelectContent>
          {footerOptions.map((f) => (
            <SelectItem key={f.name} value={f.name}>
              {f.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Textarea
        className="mt-2 w-full"
        placeholder="Footer note will appear here..."
        value={footerNote}
        readOnly
        disabled
      />

      <AddFooterDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onSave={handleAddFooter}
      />
    </div>
  );
};

const TotalSummary = ({ items }) => (
  <div className="text-right text-sm mt-6">
    <TypographyH5 className="mb-2 text-accent-foreground">
      <span className="text-gray-600"> Subtotal: </span>
      {items.reduce((sum, i) => sum + i.quantity * i.price, 0).toFixed(2)}
    </TypographyH5>

    <TypographyH5 className="mb-2 text-accent-foreground">
      <span className="text-gray-600"> Tax Amount: </span>
      {items.reduce((sum, i) => sum + i.tax, 0).toFixed(2)}
    </TypographyH5>

    <TypographyH5 className="mb-2 text-accent-foreground">
      <span className="text-gray-600"> Total: </span>
      {items
        .reduce((sum, i) => sum + i.quantity * i.price + i.tax, 0)
        .toFixed(2)}
    </TypographyH5>
  </div>
);

export function EditInvoice() {
  const navigate = useNavigate();
  const [customers, setCustomers] = useState(initialCustomers);
  const [selectedCustomer, setSelectedCustomer] = useState("");
  const [selectedNote, setSelectedNote] = useState("");
  const [selectedFooter, setSelectedFooter] = useState("");
  const [dueDate, setDueDate] = useState();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [formData, setFormData] = useState(getEmptyCustomer());
  const [editingIndex, setEditingIndex] = useState(null);
  const [items, setItems] = useState([
    { name: "", description: "", quantity: 1, price: 0, tax: 0 },
  ]);
  const [footerNote, setFooterNote] = useState("");

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

  function handleSaveInvoice() {
    const invoiceData = {
      customer: customers.find((c) => c.companyName === selectedCustomer),
      dueDate,
      items,
      note: selectedNote,
      footer: selectedFooter,
      footerNote,
    };
    alert("Invoice Data:\n" + JSON.stringify(invoiceData, null, 2));
    console.log("Invoice Data:", invoiceData);
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center pb-4 border-b-2">
        <TypographyH3>Edit Invoices</TypographyH3>
        <div className="flex items-center gap-4">
          <Button onClick={() => navigate(-1)} variant="outline">
            <ArrowLeft />
            Back
          </Button>
          <Button onClick={handleSaveInvoice}>Save Invoice</Button>
        </div>
      </div>

      <InvoiceHeader />

      <CustomerDialog
        open={dialogOpen}
        onClose={handleCloseDialog}
        initialData={editingIndex !== null ? customers[editingIndex] : null}
        editingIndex={editingIndex}
        onSubmit={handleSaveCustomer}
      />

      <InvoiceCustomerDetails
        customers={customers}
        selectedCustomer={selectedCustomer}
        setSelectedCustomer={setSelectedCustomer}
        openAddCustomer={openAddCustomer}
        dueDate={dueDate}
        setDueDate={setDueDate}
      />

      <InvoiceItemsTable items={items} setItems={setItems} />

      <NotesAndTerms
        selectedNote={selectedNote}
        setSelectedNote={setSelectedNote}
      />

      <InvoiceFooter
        selectedFooter={selectedFooter}
        setSelectedFooter={setSelectedFooter}
        footerNote={footerNote}
        setFooterNote={setFooterNote}
      />

      <TotalSummary items={items} />
    </div>
  );
}
