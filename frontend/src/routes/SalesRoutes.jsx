import {
  CurrentSalesTabs,
  FutureSalesTabs,
  SellSettingsTabs,
  ContactSalesTabs,
  MyThingsSalesTabs,
} from "@/components/custom/tabs/Tabs";

import SalesDashboard from "@/pages/sales/board/SalesDashboard";

import ContactList from "@/pages/sales/contacts/contacts-list/ContactList";
import Tags from "@/pages/sales/contacts/tags/Tags";
import Companies from "@/pages/sales/contacts/companies/Companies";
import Maps from "@/pages/sales/contacts/maps/Maps";
import Tasks from "@/pages/sales/my-things/tasks/Tasks";
import MeetingSlotes from "@/pages/sales/my-things/meeting-slots/MeetingSlotes";

// current sales
import CurrentSalesPayment from "@/pages/sales/current-sales/CurrentSalesPayment";
import { CurrentSalesStatements } from "@/pages/sales/current-sales/CurrentSalesStatements";
import CurrentSalesInvoices from "@/pages/sales/current-sales/invoice/CurrentSalesInvoices";
import { CreateInvoice } from "@/pages/sales/current-sales/invoice/CreateInvoice";
import { EditInvoice } from "@/pages/sales/current-sales/invoice/EditInvoice";
import InvoiceDetails from "@/pages/sales/current-sales/invoice/Invoicedetails";
import { CurrentSalesCustomers } from "@/pages/sales/current-sales/CurrentSalesCustomers";

// future sales
import Deals from "@/pages/sales/future-sales/deals/Deals";
import { FutureSalesEstimate } from "@/pages/sales/future-sales/estimate/FutureSalesEstimate";
import Proposals from "@/pages/sales/future-sales/proposal/Proposals";
import ProposalDocument from "@/pages/sales/future-sales/proposal/ProposalDocument";
import { CreateEstimate } from "@/pages/sales/future-sales/estimate/CreateEstimate";
import Estimatesdetails from "@/pages/sales/future-sales/estimate/Estimatesdetails";
import { EditEstimate } from "@/pages/sales/future-sales/estimate/EditEstimate";

// settings
import ProductService from "@/pages/sales/sales-settings/products/ProductService";
import Taxes from "@/pages/sales/sales-settings/taxes/Taxes";
import ChooseCurrency from "@/pages/sales/sales-settings/ChooseCurrency";
import Customers from "@/pages/sales/sales-settings/customers/Customers";
import Footer from "@/pages/sales/sales-settings/footer/Footer";
import NotesAndTerms from "@/pages/sales/sales-settings/notes-terms/NotesAndTerms";
import Industries from "@/pages/sales/sales-settings/industries/Industries";
import VerifyEmails from "@/pages/sales/sales-settings/verify-emails/VerifyEmails";
import MeetingLinks from "@/pages/sales/sales-settings/metting-links/MeetingLinks";

// sales-settings

export const salesRoutes = [
  {
    path: "sales-board",
    element: <SalesDashboard />,
    roles: ["sales", "hr", "admin"],
  },
  {
    path: "contacts/*",
    element: <ContactSalesTabs />,
    roles: ["sales", "hr", "admin"],
    children: [
      {
        path: "",
        element: <ContactList />,
        roles: ["sales", "hr", "admin"],
      },
      { path: "tags", element: <Tags />, roles: ["sales", "hr", "admin"] },
      {
        path: "companies",
        element: <Companies />,
        roles: ["sales", "hr", "admin"],
      },
      { path: "maps", element: <Maps />, roles: ["sales", "hr", "admin"] },
    ],
  },
  {
    path: "my-things/*",
    element: <MyThingsSalesTabs />,
    roles: ["sales", "hr", "admin"],
    children: [
      { path: "", element: <Tasks />, roles: ["sales", "hr", "admin"] },
      {
        path: "deals",
        element: <Deals />,
        roles: ["sales", "hr", "admin"],
      },
      {
        path: "freeslots",
        element: <MeetingSlotes />,
        roles: ["sales", "hr", "admin"],
      },
      {
        path: "customers",
        element: <CurrentSalesCustomers />,
        roles: ["sales", "hr", "admin"],
      },
    ],
  },
  {
    path: "current-sales/*",
    element: <CurrentSalesTabs />,
    roles: ["sales", "hr", "admin"],
    children: [
      {
        path: "",
        element: <CurrentSalesPayment />,
        roles: ["sales", "hr", "admin"],
      },
      {
        path: "statements",
        element: <CurrentSalesStatements />,
        roles: ["sales", "hr", "admin"],
      },
      {
        path: "customers",
        element: <CurrentSalesCustomers />,
        roles: ["sales", "hr", "admin"],
      },
      {
        path: "invoices",
        element: <CurrentSalesInvoices />,
        roles: ["sales", "hr", "admin"],
      },
      {
        path: "invoices/create",
        element: <CreateInvoice />,
        roles: ["sales", "hr", "admin"],
      },
      {
        path: "invoices/update/:id",
        element: <EditInvoice />,
        roles: ["sales", "hr", "admin"],
      },
      {
        path: "invoices/details/:id",
        element: <InvoiceDetails />,
        roles: ["sales", "hr", "admin"],
      },
    ],
  },
  {
    path: "future-sales/*",
    element: <FutureSalesTabs />,
    roles: ["sales", "hr", "admin"],
    children: [
      {
        path: "",
        element: <FutureSalesEstimate />,
        roles: ["sales", "hr", "admin"],
      },
      {
        path: "deals",
        element: <Deals />,
        roles: ["sales", "hr", "admin"],
      },
      {
        path: "proposals",
        element: <Proposals />,
        roles: ["sales", "hr", "admin"],
      },
      {
        path: "proposals/create/:id",
        element: <ProposalDocument />,
        roles: ["sales", "hr", "admin"],
      },
      {
        path: "estimates/create",
        element: <CreateEstimate />,
        roles: ["sales", "hr", "admin"],
      },
      {
        path: "estimates/update/:id",
        element: <EditEstimate />,
        roles: ["sales", "hr", "admin"],
      },
      {
        path: "estimates/details/:id",
        element: <Estimatesdetails />,
        roles: ["sales", "hr", "admin"],
      },
    ],
  },
  {
    path: "sales-settings/*",
    element: <SellSettingsTabs />,
    roles: ["sales", "hr", "admin"],
    children: [
      {
        path: "",
        element: <ProductService />,
        roles: ["sales", "hr", "admin"],
      },
      {
        path: "taxes",
        element: <Taxes />,
        roles: ["sales", "hr", "admin"],
      },
      {
        path: "customers",
        element: <Customers />,
        roles: ["sales", "hr", "admin"],
      },
      {
        path: "choose-currency",
        element: <ChooseCurrency />,
        roles: ["sales", "hr", "admin"],
      },
      {
        path: "footer",
        element: <Footer />,
        roles: ["sales", "hr", "admin"],
      },
      {
        path: "notes-and-terms",
        element: <NotesAndTerms />,
        roles: ["sales", "hr", "admin"],
      },
      {
        path: "industries",
        element: <Industries />,
        roles: ["sales", "hr", "admin"],
      },
      {
        path: "verify-emails",
        element: <VerifyEmails />,
        roles: ["sales", "hr", "admin"],
      },
      {
        path: "meeting-links",
        element: <MeetingLinks />,
        roles: ["sales", "hr", "admin"],
      },
    ],
  },
];
