export const AUTH_ROUTES = {
  login: "/login",
  dashboard: "/dashboard",
  defaultCallback: "/dashboard",
} as const;

export const PROTECTED_ROUTE_PREFIXES = ["/dashboard"] as const;

export const AUTH_PAGE_PREFIXES = ["/login"] as const;
