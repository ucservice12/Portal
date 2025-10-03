import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { appRoutes } from "@/routes/appRoutes";

export function ProtectedRoute() {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading)
    return (
      <p className="flex justify-center items-center h-screen">Loading...</p>
    );

  //  Check if logged in
  if (!user || !user.organization) return <Navigate to="/" replace />;

  //  Find matching route by pathname
  const currentRoute = findRouteByPath(appRoutes, location.pathname);

  //  If route exists but role is not allowed
  // if (
  //   currentRoute?.roles &&
  //   !user.roles?.some((role) => currentRoute.roles.includes(role))
  // ) {
  //   return (
  //     <div className="flex justify-center items-center h-screen">
  //       <h1 className="text-2xl font-bold text-red-600">
  //         🚫 You do not have access for this route
  //       </h1>
  //     </div>
  //   );
  // }
  //  Otherwise allow
  return <Outlet />;
}

//  Helper to recursively search routes (supports nested children)
function findRouteByPath(routes, pathname) {
  for (const route of routes) {
    if (
      route.path &&
      pathname.startsWith("/" + route.path.replace(/^\//, ""))
    ) {
      return route;
    }
    if (route.children) {
      const found = findRouteByPath(route.children, pathname);
      if (found) return found;
    }
  }
  return null;
}
