export interface RouteConfig {
  path: string;
  isPublic: boolean;
  requiresAuth: boolean;
  allowedRoles?: string[];
  redirectTo?: string;
}

export const appConfig = {
  // Entry paths configuration

  initialRoute: "/login",
  routes: {
    authenticatedEntryPath: "/dashboard",
    unauthenticatedEntryPath: "/login",
    defaultRedirect: "/dashboard",
    fallbackRoute: "/404",
  },

  publicRoutes: [
    "/login",
    "/register",
    "/forgot-password",
    "/reset-password",
    "/404",
    "/500",
  ],

  privateRoutes: ["/dashboard"],

  // Role-based route access
  roleBasedRoutes: {
    admin: ["/users"],
    editor: ["/analytics", "/reports"],
    viewer: ["/analytics"],
  },

  // Location management
  location: {
    enableLocationTracking: true,
    rememberLastRoute: true,
    redirectAfterLogin: true,
    locationStorageKey: "lastVisitedRoute",
  },

  // Authentication settings
  auth: {
    tokenKey: "authToken",
    userKey: "userData",
    sessionTimeout: 24 * 60 * 60 * 1000, // 24 hours
    refreshTokenKey: "refreshToken",
  },

  theme: {
    primaryColor: "#0C323C",
    secondaryColor: "#ff4d4f",
  },

  // User roles
  roles: ["admin", "editor", "viewer", "manager", "supervisor"],

  // API endpoints
  api: {
    baseUrl: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api",
    endpoints: {
      login: "/auth/login",
      logout: "/auth/logout",
      refresh: "/auth/refresh",
      profile: "/user/profile",
    },
  },
};
