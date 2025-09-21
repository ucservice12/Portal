import { useNavigate } from "react-router-dom";
import React, { createContext, useContext, useState, useEffect } from "react";
import Cookies from "js-cookie";
import { getMe, logoutApi } from "../api/auth";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const navigate = useNavigate();

    const [step, setStep] = useState("login");
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // 🔹 Load user on app start
    useEffect(() => {
        const initAuth = async () => {
            const token = localStorage.getItem("cognitoIdentity");
            if (!token) {
                setLoading(false);
                return;
            }

            try {
                const res = await getMe();

                console.log("Auth init - User data  =>", res.data.data);

                const userData = res.data.data;

                if (
                    userData.status === "inactive" ||
                    userData.organization?.subscription?.isActive === false ||
                    userData.organization?.subscription?.status === "inactive"
                ) {
                    logout();
                    return;
                }

                if (res.data.success) {
                    setUser(res.data.data);

                    if (userData.organization) {
                        navigate("/dashboard", { replace: true });
                    } else {
                        setStep("createOrg");
                    }

                } else {
                    logout();
                }
            } catch (err) {
                console.error("❌ Auth init failed:", err.response?.data || err);
                logout();
            } finally {
                setLoading(false);
            }
        };

        initAuth();
    }, [navigate]);

    const saveAuth = (token, userData) => {
        if (token) localStorage.setItem("cognitoIdentity", token);
        if (userData) setUser(userData);

        // Navigate after login/register
        if (userData?.organization) navigate("/dashboard", { replace: true });
        else setStep("createOrg");
    };

    const logout = async () => {
        try {
            await logoutApi();
        } catch (err) {
            console.error("Logout API failed:", err.response?.data || err);
        } finally {
            localStorage.removeItem("cognitoIdentity");
            Cookies.remove("cognitoIdentity");
            setUser(null);
            setStep("login");
        }
    };

    return (
        <AuthContext.Provider value={{
            step,
            setStep,
            user,
            setUser,
            saveAuth,
            loading,
            setLoading,
            logout
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
