import {
  CurrentSalesTabs,
  FutureSalesTabs,
  SellSettingsTabs,
  ContactSalesTabs,
  MyThingsSalesTabs,
} from "@/components/custom/tabs/Tabs";
import SalesBoard from "@/pages/sales/SalesBoard";
import Contacts from "@/pages/sales/Contacts";
import MyThings from "@/pages/sales/MyThings";
import CurrentSales from "@/pages/sales/CurrentSales";
import FutureSales from "@/pages/sales/FutureSales";
import SalesSettings from "@/pages/sales/SalesSettings";

export const salesRoutes = [
  {
    path: "sales-board",
    element: <SalesBoard />,
    roles: ["sales", "hr", "admin"],
  },
  {
    path: "contacts/*",
    element: <ContactSalesTabs />,
    roles: ["sales", "hr", "admin"],
    children: [
      { index: true, element: <Contacts />, roles: ["sales", "hr", "admin"] },
      { path: "tags", element: <h1>Tags</h1>, roles: ["sales", "hr", "admin"] },
      {
        path: "companies",
        element: <h1>Companies</h1>,
        roles: ["sales", "hr", "admin"],
      },
      { path: "maps", element: <h1>Maps</h1>, roles: ["sales", "hr", "admin"] },
    ],
  },
  {
    path: "my-things/*",
    element: <MyThingsSalesTabs />,
    roles: ["sales", "hr", "admin"],
    children: [
      { index: true, element: <MyThings />, roles: ["sales", "hr", "admin"] },
      {
        path: "deals",
        element: <h1>Deals</h1>,
        roles: ["sales", "hr", "admin"],
      },
      {
        path: "freeslots",
        element: <h1>Meeting Slots</h1>,
        roles: ["sales", "hr", "admin"],
      },
      {
        path: "customers",
        element: <h1>Customers</h1>,
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
        index: true,
        element: <CurrentSales />,
        roles: ["sales", "hr", "admin"],
      },
      {
        path: "statements",
        element: <h1>Statements</h1>,
        roles: ["sales", "hr", "admin"],
      },
      {
        path: "customers",
        element: <h1>Customers</h1>,
        roles: ["sales", "hr", "admin"],
      },
      {
        path: "invoices",
        element: <h1>Invoices</h1>,
        roles: ["sales", "hr", "admin"],
      },
      {
        path: "invoices/create",
        element: <h1>Create Invoice</h1>,
        roles: ["sales", "hr", "admin"],
      },
      {
        path: "invoices/update/:id",
        element: <h1>Edit Invoice</h1>,
        roles: ["sales", "hr", "admin"],
      },
      {
        path: "invoices/details/:id",
        element: <h1>Invoice Details</h1>,
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
        index: true,
        element: <FutureSales />,
        roles: ["sales", "hr", "admin"],
      },
      {
        path: "deals",
        element: <h1>Deals</h1>,
        roles: ["sales", "hr", "admin"],
      },
      {
        path: "proposals",
        element: <h1>Proposals</h1>,
        roles: ["sales", "hr", "admin"],
      },
      {
        path: "proposals/create/:id",
        element: <h1>Proposal Document</h1>,
        roles: ["sales", "hr", "admin"],
      },
      {
        path: "estimates/create",
        element: <h1>Create Estimate</h1>,
        roles: ["sales", "hr", "admin"],
      },
      {
        path: "estimates/update/:id",
        element: <h1>Edit Estimate</h1>,
        roles: ["sales", "hr", "admin"],
      },
      {
        path: "estimates/details/:id",
        element: <h1>Estimate Details</h1>,
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
        index: true,
        element: <SalesSettings />,
        roles: ["sales", "hr", "admin"],
      },
      {
        path: "taxes",
        element: <h1>Taxes</h1>,
        roles: ["sales", "hr", "admin"],
      },
      {
        path: "customers",
        element: <h1>Customers</h1>,
        roles: ["sales", "hr", "admin"],
      },
      {
        path: "choose-currency",
        element: <h1>Choose Currency</h1>,
        roles: ["sales", "hr", "admin"],
      },
      {
        path: "footer",
        element: <h1>Footer</h1>,
        roles: ["sales", "hr", "admin"],
      },
      {
        path: "notes-and-terms",
        element: <h1>Notes & Terms</h1>,
        roles: ["sales", "hr", "admin"],
      },
      {
        path: "industries",
        element: <h1>Industries</h1>,
        roles: ["sales", "hr", "admin"],
      },
      {
        path: "verify-emails",
        element: <h1>Verify Emails</h1>,
        roles: ["sales", "hr", "admin"],
      },
      {
        path: "meeting-links",
        element: <h1>Meeting Links</h1>,
        roles: ["sales", "hr", "admin"],
      },
    ],
  },
];
