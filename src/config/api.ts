// API Configuration
export const BASE_API_URL =
  process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:5000/api/v1";

// API Endpoints
export const API_ENDPOINTS = {
  // Auth endpoints
  LOGIN: "/user/login",
  LOGOUT: "/user/logout",
  REFRESH_TOKEN: "/user/refresh-token",

  // User endpoints
  USER_PROFILE: "/user/profile",
  UPDATE_PROFILE: "/user/update-profile",

  // Dashboard endpoints
  DASHBOARD_STATS: "/dashboard/stats",

  // Settings endpoints
  MASTER_LIST: "/admin/master",
} as const;

// Helper function to build full API URL
export const buildApiUrl = (endpoint: string): string => {
  return `${BASE_API_URL}${endpoint}`;
};
