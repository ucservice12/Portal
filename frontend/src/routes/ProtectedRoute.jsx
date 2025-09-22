import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

export function ProtectedRoute() {
  const { user, loading } = useAuth();

  if (loading)
    return (
      <p className="flex justify-center items-center h-screen">Loading...</p>
    );

  if (!user || !user.organization) return <Navigate to="/" replace />;

  return <Outlet />;
}
