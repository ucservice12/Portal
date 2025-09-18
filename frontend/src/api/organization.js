import { customAxios } from "@/services/customAxios";

// Create new organization
export const createOrganization = (organizationName, userData) => {
    return customAxios.post("/organizations", { organizationName, userData });
};

// Get all organizations
export const getOrganizations = () => customAxios.get("/organizations");
