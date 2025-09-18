import React from "react";
import { AuthProvider } from "./AuthContext";
import { OrganizationProvider } from "./OrganizationContext";

const providers = [
    AuthProvider,
    OrganizationProvider,
];

export const ContextProviderWrapper = ({ children }) => {
    return providers.reduceRight((kids, Provider) => {
        return <Provider>{kids}</Provider>;
    }, children);
};
