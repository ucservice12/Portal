import {
  roleAccess,
  moduleSubRoutes,
  subRouteMeta,
  userPermissions,
  MODULE_ORDER,
} from "@/data/routesConfig";

export function getRoutesForRole(role: string) {
  const modules = roleAccess[role] || [];
  const permissions = userPermissions.permissions || {};

  let routes: any[] = [];

  MODULE_ORDER.forEach((module) => {
    if (!modules.includes(module)) return;
    const subRoutes = moduleSubRoutes[module] || [];
    subRoutes.forEach((sub) => {
      if (subRouteMeta[sub]) {
        routes.push({
          name: sub,
          url: subRouteMeta[sub].url,
          icon: subRouteMeta[sub].icon, // Icon name string
          module,
          permissions: permissions[`${module}_crud`] || null,
        });
      }
    });
  });

  const seen = new Set();
  return routes.filter((route) => {
    if (seen.has(route.url)) return false;
    seen.add(route.url);
    return true;
  });
}
