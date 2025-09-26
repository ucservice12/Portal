import { Routes, Route } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import AuthLayout from "@/components/authLayout/AuthLayout";
import { ProtectedRoute } from "@/routes/ProtectedRoute";
import { useAuth } from "@/context/AuthContext";
import { appRoutes } from "@/routes/appRoutes";

export default function App() {
  const { loading } = useAuth();

  if (loading)
    return (
      <p className="flex justify-center items-center h-screen">Loading...</p>
    );

  return (
    <Routes>
      {/* Public */}
      <Route path="/" element={<AuthLayout />} />

      {/* Protected */}
      <Route element={<ProtectedRoute />}>
        <Route element={<MainLayout />}>
          {/* Dynamically render all appRoutes */}
          {appRoutes.map(({ path, element, children }) => (
            <Route key={path} path={path} element={element}>
              {/* Render children if nested routes exist */}
              {children &&
                children.map(({ path: childPath, element: childElement }) => (
                  <Route
                    key={childPath}
                    path={childPath}
                    element={childElement}
                  />
                ))}
            </Route>
          ))}

          {/* Catch-all 404 inside MainLayout */}
          <Route
            path="*"
            element={
              <div className="flex justify-center items-center">
                <h1 className="text-3xl font-bold">Comming Soon...</h1>
              </div>
            }
          />
        </Route>
      </Route>

      {/* Global 404 for non-protected paths */}
      <Route
        path="*"
        element={
          <div className="flex justify-center items-center h-screen">
            <h1 className="text-3xl font-bold">404 - Page Not Found</h1>
          </div>
        }
      />
    </Routes>
  );
}
