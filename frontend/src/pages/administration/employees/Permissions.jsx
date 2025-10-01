"use client";

import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

const roles = [
  "Administration",
  "Employee",
  "Manager",
  "HR",
  "Sales",
  "Finance",
];

const permissions = [
  {
    section: "Project Management",
    actions: [
      "Can view Project",
      "Can create project",
      "Can update project",
      "Can delete project",
    ],
  },
  {
    section: "Hiring",
    actions: [
      "Can view job",
      "Can create job",
      "Can update job",
      "Can delete project",
      "Can view quesiton papers",
      "Can create quesiton papers",
      "Can update quesiton papers",
      "Can delete quesiton papers",
      "Can view quesitons",
      "Can create quesitons",
      "Can update quesitons",
      "Can delete quesitons",
    ],
  },
];

export default function Permissions() {
  const [permissionMatrix, setPermissionMatrix] = useState(() => {
    const initial = {};
    permissions.forEach((group) => {
      group.actions.forEach((action) => {
        initial[action] = {};
        roles.forEach((role) => {
          initial[action][role] = false;
        });
      });
    });
    return initial;
  });

  const togglePermission = (action, role) => {
    setPermissionMatrix((prev) => ({
      ...prev,
      [action]: {
        ...prev[action],
        [role]: !prev[action][role],
      },
    }));
  };

  return (
    <>
      <Table>
        <TableHeader className="bg-[#FBFCFE]">
          <TableRow>
            <TableHead className="w-64">Actions</TableHead>
            {roles.map((role) => (
              <TableHead key={role} className="text-center">
                {role}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {permissions.map((group) => (
            <>
              <TableRow key={group.section} className="bg-muted">
                <TableCell colSpan={roles.length + 1} className="font-semibold">
                  {group.section}
                </TableCell>
              </TableRow>
              {group.actions.map((action) => (
                <TableRow key={action}>
                  <TableCell>{action}</TableCell>
                  {roles.map((role) => (
                    <TableCell key={role} className="text-center">
                      <Checkbox
                        checked={permissionMatrix[action][role]}
                        onCheckedChange={() => togglePermission(action, role)}
                      />
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </>
          ))}
        </TableBody>
      </Table>

      <div className="flex justify-end  w-full">
        <Button>Save Changes</Button>
      </div>
    </>
  );
}
