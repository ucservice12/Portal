// src/utils/getRoutesForRoles.ts
import {
  roleAccess,
  moduleSubRoutes,
  subRouteMeta,
  userPermissions,
  MODULE_ORDER,
} from "@/data/routesConfig";

type Permission = {
  createAllowed?: boolean;
  updateAllowed?: boolean;
  deleteAllowed?: boolean;
};

type Route = {
  name: string;
  url: string;
  icon: string;
  module: string;
  permissions: Permission | null;
};

/**
 * Get routes for multiple roles.
 * Merges module access and permissions from all roles.
 */
export function getRoutesForRoles(roles: string[]): Route[] {
  const permissions = userPermissions.permissions || {};
  let routes: Route[] = [];

  MODULE_ORDER.forEach((module) => {
    // Check if any role has access to this module
    const hasAccess = roles.some((role) =>
      (roleAccess[role] || []).includes(module)
    );
    if (!hasAccess) return;

    const subRoutes = moduleSubRoutes[module] || [];
    subRoutes.forEach((sub) => {
      if (!subRouteMeta[sub]) return;

      // Merge permissions across roles for this module
      let modulePermission: Permission | null =
        permissions[`${module}_crud`] || null;

      routes.push({
        name: sub,
        url: subRouteMeta[sub].url,
        icon: subRouteMeta[sub].icon,
        module,
        permissions: modulePermission,
      });
    });
  });

  // Remove duplicate routes based on URL
  const seen = new Set();
  return routes.filter((route) => {
    if (seen.has(route.url)) return false;
    seen.add(route.url);
    return true;
  });
}

// console.log(getRoutesForRoles(["hr"]));
