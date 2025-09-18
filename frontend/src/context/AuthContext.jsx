import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [step, setStep] = useState("login"); // login | register | verifyOtp | createOrg | pricing | payment | dashboard
    const [user, setUser] = useState(null);
    const [otpEmail, setOtpEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        try {
            const storedUserEncoded = localStorage.getItem("cognitoIdentity");
            const createOrganizationUserDataToken = localStorage.getItem("cognitoIdentityToken");

            if (storedUserEncoded) {
                // Decode base64 before parsing
                setStep("createOrg");
                const storedUser = JSON.parse(atob(storedUserEncoded));
                setUser(storedUser);
            }

            if (createOrganizationUserDataToken) {
                setUser(JSON.parse(createOrganizationUserDataToken));
            }

        } catch (err) {
            console.error("Failed to parse stored user:", err);
            localStorage.removeItem("cognitoIdentity");
        }
    }, []);

    const logout = () => {
        localStorage.removeItem("cognitoIdentity");
        setUser(null);
        setStep("login");
    };

    return (
        <AuthContext.Provider
            value={{
                step,
                setStep,
                user,
                setUser,
                otpEmail,
                setOtpEmail,
                loading,
                setLoading,
                errors,
                setErrors,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
