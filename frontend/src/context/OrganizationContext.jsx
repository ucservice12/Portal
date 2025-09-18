import React, { createContext, useContext, useState } from "react";

const OrganizationContext = createContext();

export const OrganizationProvider = ({ children }) => {
    // Loading and error state
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [organizations, setOrganizations] = useState([]); // store created orgs


    return (
        <OrganizationContext.Provider
            value={{
                loading,
                setLoading,
                error,
                setError,
                organizations,
                setOrganizations
            }}
        >
            {children}
        </OrganizationContext.Provider>
    );
};

export const useOrganization = () => useContext(OrganizationContext);
