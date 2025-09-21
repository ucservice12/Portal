import { Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import AuthLayout from "@/components/authLayout/AuthLayout";
import { useAuth } from "@/context/AuthContext";
import { getRoutesForRole } from "@/lib/getRoutesForRole";
import { pageComponents } from "@/data/pageComponents";

export default function App() {
  const { user, loading } = useAuth();

  if (loading)
    return (
      <p className="flex justify-center items-center h-screen">Loading...</p>
    );

  const currentUserRole = user?.role;
  const routes = getRoutesForRole(currentUserRole);

  return (
    <Routes>
      {/* Public route */}
      <Route path="/" element={<AuthLayout />} />

      {/* Protected routes */}
      <Route
        element={
          user && user.organization ? (
            <MainLayout />
          ) : (
            <Navigate to="/" replace />
          )
        }
      >
        {routes.map((route) => {
          const Component = pageComponents[route.name];
          if (!Component) return null;
          return (
            <Route
              key={route.url}
              path={route.url.slice(1)}
              element={<Component />}
            />
          );
        })}
      </Route>

      {/* Catch-all 404 */}
      <Route path="*" element={<h1>404 - Page Not Found</h1>} />
    </Routes>
  );
}
