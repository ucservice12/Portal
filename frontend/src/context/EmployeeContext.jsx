import React, { createContext, useContext, useState, useEffect } from "react";

const EmployeeContext = createContext();

export const EmployeeProvider = ({ children }) => {
  const [selectedUserTypes, setSelectedUserTypes] = useState([]);
  const [selectedManager, setSelectedManager] = useState("amolmahor500");

  const [employeeList, setEmployeeList] = useState([]);
  const [managerList, setManagerList] = useState([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  return (
    <EmployeeContext.Provider
      value={{
        selectedUserTypes,
        setSelectedUserTypes,
        selectedManager,
        setSelectedManager,
        employeeList,
        managerList,
        loading,
        error,
      }}
    >
      {children}
    </EmployeeContext.Provider>
  );
};

export const useEmployee = () => useContext(EmployeeContext);
