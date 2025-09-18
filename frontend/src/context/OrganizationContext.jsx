// context/OrganizationContext.jsx
import React, { createContext, useContext, useState } from "react";
import api from "@/services/api"; // Axios instance

const OrganizationContext = createContext();

export const OrganizationProvider = ({ children }) => {
    const [organizations, setOrganizations] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // --- Create new organization ---
    const createOrganization = async ({ organizationName, userData }) => {
        setLoading(true);
        setError(null);
        try {
            const res = await api.post("/organizations", { organizationName, userData });
            // Add the newly created organization to state
            setOrganizations((prev) => [...prev, res.data]);
            setLoading(false);
            return res.data;
        } catch (err) {
            setError(err.response?.data?.error || err.message);
            setLoading(false);
            throw err;
        }
    };

    // --- Fetch all organizations ---
    const fetchOrganizations = async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await api.get("/organizations");
            setOrganizations(res.data.data);
            setLoading(false);
            return res.data.data;
        } catch (err) {
            setError(err.response?.data?.error || err.message);
            setLoading(false);
            throw err;
        }
    };

    // --- Fetch single organization ---
    const fetchOrganization = async (id) => {
        setLoading(true);
        setError(null);
        try {
            const res = await api.get(`/organizations/${id}`);
            setLoading(false);
            return res.data.data;
        } catch (err) {
            setError(err.response?.data?.error || err.message);
            setLoading(false);
            throw err;
        }
    };

    // --- Update organization ---
    const updateOrganization = async (id, updateData) => {
        setLoading(true);
        setError(null);
        try {
            const res = await api.put(`/organizations/${id}`, updateData);
            // Update local state
            setOrganizations((prev) =>
                prev.map((org) => (org._id === id ? res.data.data : org))
            );
            setLoading(false);
            return res.data.data;
        } catch (err) {
            setError(err.response?.data?.error || err.message);
            setLoading(false);
            throw err;
        }
    };

    // --- Delete organization ---
    const deleteOrganization = async (id) => {
        setLoading(true);
        setError(null);
        try {
            await api.delete(`/organizations/${id}`);
            // Remove from local state
            setOrganizations((prev) => prev.filter((org) => org._id !== id));
            setLoading(false);
            return true;
        } catch (err) {
            setError(err.response?.data?.error || err.message);
            setLoading(false);
            throw err;
        }
    };

    // --- Update subscription ---
    const updateSubscription = async (id, subscriptionPlan) => {
        setLoading(true);
        setError(null);
        try {
            const res = await api.put(`/organizations/${id}/subscription`, { subscriptionPlan });
            // Update local state
            setOrganizations((prev) =>
                prev.map((org) => (org._id === id ? res.data.data : org))
            );
            setLoading(false);
            return res.data.data;
        } catch (err) {
            setError(err.response?.data?.error || err.message);
            setLoading(false);
            throw err;
        }
    };

    return (
        <OrganizationContext.Provider
            value={{
                organizations,
                loading,
                error,
                createOrganization,
                fetchOrganizations,
                fetchOrganization,
                updateOrganization,
                deleteOrganization,
                updateSubscription,
            }}
        >
            {children}
        </OrganizationContext.Provider>
    );
};

// --- Custom hook ---
export const useOrganization = () => useContext(OrganizationContext);
