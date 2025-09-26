import { useNavigate, useLocation } from "react-router-dom";
import React, { createContext, useContext, useState, useEffect } from "react";
import Cookies from "js-cookie";
import { getMe, logoutApi } from "@/api/auth";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [step, setStep] = useState("login");
  const [token, setToken] = useState("");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load user on app start
  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem("cognitoIdentity");
      setToken(token);
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const res = await getMe();
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
          setUser(userData);

          // Navigate if on login page
          if (userData.organization && location.pathname === "/") {
            navigate("/dashboard", { replace: true });
          } else if (!userData.organization) {
            setStep("createOrg");
          }
        } else logout();
      } catch (err) {
        console.error("Auth init failed:", err.response?.data || err);
        logout();
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, [navigate, location.pathname]);

  // Call this after login/register
  const saveAuth = (token, userData) => {
    if (token) localStorage.setItem("cognitoIdentity", token);
    if (userData) setUser(userData);

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
    <AuthContext.Provider
      value={{
        token,
        setToken,
        step,
        setStep,
        user,
        setUser,
        saveAuth,
        loading,
        setLoading,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
