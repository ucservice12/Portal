import React, { useEffect, useState } from "react";
import EmployeeFilters from "./EmployeeFilters";
import EmployeeStatsActions from "./EmployeeStatsActions";
import EmployeeCard from "./EmployeeCard";
import ApproveDialog from "./ApproveDialog";
import InviteDialog from "./InviteDialog";
import { useAuth } from "@/context/AuthContext";
import { useEmployee } from "@/context/EmployeeContext";

import { USER_TYPES, ROLE_TYPES, STATUS_TYPES } from "./constants";

export default function Members() {
  const { user } = useAuth();
  const { employeeList } = useEmployee();

  const [filters, setFilters] = useState({
    memberType: "",
    searchName: "",
    searchRoles: [],
    status: "",
  });
  const [approveDialogOpen, setApproveDialogOpen] = useState(false);
  const [inviteDialogOpen, setInviteDialogOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [selectedUserTypes, setSelectedUserTypes] = useState([]);
  const [selectedManager, setSelectedManager] = useState("amolmahor500");
  const [inviteForm, setInviteForm] = useState({
    fromEmail: "noreply@ucservices.biz",
    memberName: "",
    email: "",
  });

  const managerList = ["amolmahor500", "manager2", "manager3"];

  const toggleUserType = (type) => {
    setSelectedUserTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const handleInviteChange = (e) =>
    setInviteForm({ ...inviteForm, [e.target.name]: e.target.value });
  const handleConfirmInvite = () => {
    setInviteDialogOpen(false);
    alert("Email confirmed!");
  };

  const filteredEmployees = employeeList.filter((emp) => {
    if (
      filters.searchName &&
      !emp.name.toLowerCase().includes(filters.searchName.toLowerCase())
    )
      return false;
    if (
      filters.searchRoles.length > 0 &&
      !filters.searchRoles.some((role) =>
        emp.roles.map((r) => r.toLowerCase()).includes(role)
      )
    )
      return false;
    if (filters.status && emp.status.toLowerCase() !== filters.status)
      return false;
    return true;
  });

  return (
    <div className="space-y-6">
      <EmployeeFilters
        filters={filters}
        setFilters={setFilters}
        ROLE_TYPES={ROLE_TYPES}
        STATUS_TYPES={STATUS_TYPES}
      />
      <EmployeeStatsActions setInviteDialogOpen={setInviteDialogOpen} />
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-6 w-full">
        {filteredEmployees.map((emp, index) => (
          <EmployeeCard
            key={index}
            emp={emp}
            setSelectedEmployee={setSelectedEmployee}
            setSelectedUserTypes={setSelectedUserTypes}
            setApproveDialogOpen={setApproveDialogOpen}
          />
        ))}
      </div>
      <ApproveDialog
        open={approveDialogOpen}
        setOpen={setApproveDialogOpen}
        selectedEmployee={selectedEmployee}
        selectedUserTypes={selectedUserTypes}
        toggleUserType={toggleUserType}
        USER_TYPES={USER_TYPES}
        selectedManager={selectedManager}
        setSelectedManager={setSelectedManager}
        managerList={managerList}
      />
      <InviteDialog
        open={inviteDialogOpen}
        setOpen={setInviteDialogOpen}
        inviteForm={inviteForm}
        handleInviteChange={handleInviteChange}
        handleConfirmInvite={handleConfirmInvite}
      />
    </div>
  );
}
