import React, { createContext, useContext, useState } from "react";

const OrganizationContext = createContext();

export const OrganizationProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [organizations, setOrganizations] = useState([]);

  // Store full onboarding data
  const [orgName, setOrgName] = useState("");
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [users, setUsers] = useState(1);
  const [paymentData, setPaymentData] = useState({});

  return (
    <OrganizationContext.Provider
      value={{
        loading,
        setLoading,
        error,
        setError,
        organizations,
        setOrganizations,

        // onboarding state
        orgName,
        setOrgName,
        selectedPlan,
        setSelectedPlan,
        users,
        setUsers,
        paymentData,
        setPaymentData,
      }}
    >
      {children}
    </OrganizationContext.Provider>
  );
};

export const useOrganization = () => useContext(OrganizationContext);
