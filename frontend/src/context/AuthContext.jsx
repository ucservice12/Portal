import React, { createContext, useContext, useState, useEffect } from "react";
import api, { setAuthToken } from "@/services/api";

const AuthContext = createContext();

const safeParseJSON = (item) => {
    try {
        return item ? JSON.parse(item) : null;
    } catch {
        return null;
    }
};

export const AuthProvider = ({ children }) => {
    const tokenFromStorage = localStorage.getItem("token") || null;
    const userFromStorage = safeParseJSON(localStorage.getItem("user"));

    const [user, setUser] = useState(userFromStorage);
    const [token, setToken] = useState(tokenFromStorage);
    const [isAuthenticated, setIsAuthenticated] = useState(
        !!tokenFromStorage && !!userFromStorage
    );
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [step, setStep] = useState("login");
    const [otpEmail, setOtpEmail] = useState(null);

    useEffect(() => {
        if (token) setAuthToken(token);
    }, [token]);

    const saveUserAndToken = (userData, tokenData) => {
        setUser(userData);
        setToken(tokenData);
        setIsAuthenticated(true);

        localStorage.setItem("user", JSON.stringify(userData));
        localStorage.setItem("token", tokenData);

        setAuthToken(tokenData);
    };

    const clearAuth = () => {
        setUser(null);
        setToken(null);
        setIsAuthenticated(false);
        setStep("login");
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        setAuthToken(null);
    };

    // --- Actions ---
    const loginUser = async (data) => {
        setLoading(true);
        setError(null);
        try {
            const res = await api.post("/auth/login", data);
            saveUserAndToken(res.data.user, res.data.token);
            setStep("dashboard");
            setLoading(false);
            return res.data;
        } catch (err) {
            setLoading(false);
            setError(err.response?.data?.message || err.message);
            throw err;
        }
    };

    const registerUser = async (data) => {
        setLoading(true);
        setError(null);
        try {
            const res = await api.post("/auth/register", data);
            if (res.data.user && res.data.token) {
                saveUserAndToken(res.data.user, res.data.token);
                setStep("createOrg");
            } else {
                setOtpEmail(data.email);
                setStep("verifyOtp");
            }
            setLoading(false);
            return res.data;
        } catch (err) {
            setLoading(false);
            setError(err.response?.data?.message || err.message);
            throw err;
        }
    };

    const verifyOtp = async ({ email, otp }) => {
        setLoading(true);
        setError(null);
        try {
            const res = await api.post("/auth/verify-otp", { email, otp });
            saveUserAndToken(res.data.user, res.data.token);
            setStep("createOrg");
            setLoading(false);
            return res.data;
        } catch (err) {
            setLoading(false);
            setError(err.response?.data?.message || "OTP verification failed");
            throw err;
        }
    };

    const createOrganization = async (data) => {
        setLoading(true);
        setError(null);
        try {
            const res = await api.post("/organization/create", data);
            setStep("pricing");
            setLoading(false);
            return res.data;
        } catch (err) {
            setLoading(false);
            setError(err.response?.data?.message || err.message);
            throw err;
        }
    };

    const logout = () => clearAuth();

    return (
        <AuthContext.Provider
            value={{
                user,
                token,
                isAuthenticated,
                loading,
                error,
                step,
                setStep,
                otpEmail,
                setOtpEmail,
                loginUser,
                registerUser,
                verifyOtp,
                createOrganization,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
