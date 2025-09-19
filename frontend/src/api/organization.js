import { customAxios } from "@/services/customAxios";

// Create new organization
export const createOrganization = (data) => {
    return customAxios.post("/organizations", data);
};

// Get all organizations
export const getOrganizations = () => customAxios.get("/organizations");
