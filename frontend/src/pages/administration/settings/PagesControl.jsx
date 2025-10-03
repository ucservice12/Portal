"use client";

import { useState } from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { getRoutesForRoles } from "@/lib/getRoutesForRole";

// Utility
const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

export default function PagesControl({ role = ["admin", "hr"] }) {
  const routes = getRoutesForRoles(role);

  // Group routes
  const routeGroups = {};
  routes.forEach((route) => {
    if (!routeGroups[route.module]) routeGroups[route.module] = [];
    routeGroups[route.module].push(route);
  });

  // Checkbox state
  const [permissions, setPermissions] = useState(() => {
    const initial = {};
    routes.forEach((route) => {
      initial[route.url] = true;
    });
    return initial;
  });

  const handleToggle = (url) => {
    setPermissions((prev) => ({
      ...prev,
      [url]: !prev[url],
    }));
  };

  const handleSave = () => {
    const selectedRoutes = Object.entries(permissions)
      .filter(([_, checked]) => checked)
      .map(([url]) => url);

    const payload = {
      role,
      permissions: selectedRoutes,
    };

    console.log("Sending to server:", payload);
  };

  return (
    <>
      <Table className="sm:max-w-[400px] w-full">
        <TableHeader className="bg-muted">
          <TableRow>
            <TableHead className="w-[200px]">Module</TableHead>
            <TableHead>Routes</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Object.entries(routeGroups).map(([module, routes]) => (
            <TableRow key={module}>
              <TableCell className="font-medium">
                {capitalize(module)}
              </TableCell>
              <TableCell>
                <div className="grid gap-3">
                  {routes.map((route) => (
                    <label
                      key={route.url}
                      className="flex items-center gap-2 text-sm"
                    >
                      <Checkbox
                        checked={permissions[route.url]}
                        onCheckedChange={() => handleToggle(route.url)}
                      />
                      <span>{route.name}</span>
                    </label>
                  ))}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex gap-4">
        <Button onClick={handleSave}>Save</Button>
        <Button variant="destructive">Delete</Button>
      </div>
    </>
  );
}
