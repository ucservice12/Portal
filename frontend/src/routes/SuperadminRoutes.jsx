import {
  SuperAdminTabs,
  SuperAdminFormTabs,
} from "@/components/custom/tabs/Tabs";
import Organizations from "@/pages/superadmin/Organizations";
import Forms from "@/pages/superadmin/Forms";

export const superadminRoutes = [
  {
    path: "superadmin/*",
    element: <SuperAdminTabs />,
    roles: ["superadmin"],
    children: [
      { index: true, element: <Organizations />, roles: ["superadmin"] },
      {
        path: "organizations",
        element: <Organizations />,
        roles: ["superadmin"],
      },
      {
        path: "forms/*",
        element: <SuperAdminFormTabs />,
        roles: ["superadmin"],
        children: [
          { index: true, element: <Forms />, roles: ["superadmin"] },
          {
            path: "create",
            element: <h1>Create Form</h1>,
            roles: ["superadmin"],
          },
          {
            path: "edit/:id",
            element: <h1>Edit Form</h1>,
            roles: ["superadmin"],
          },
        ],
      },
      {
        path: "settings",
        element: <h1>Superadmin Settings</h1>,
        roles: ["superadmin"],
      },
    ],
  },
];
