import React from "react";
import { AuthProvider } from "./AuthContext";
import { OrganizationProvider } from "./OrganizationContext";
import { EmployeeProvider } from "./EmployeeContext";

const providers = [AuthProvider, OrganizationProvider, EmployeeProvider];

export const ContextProviderWrapper = ({ children }) => {
  return providers.reduceRight((kids, Provider) => {
    return <Provider>{kids}</Provider>;
  }, children);
};
