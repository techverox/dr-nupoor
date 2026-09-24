/**
 * Dr. Noopur Patel Platform — Authentication & Session Constants
 */

export const AUTH_CONFIG = {
  SESSION_COOKIE_NAME: "drn_admin_session",
  LEGACY_SESSION_COOKIE_NAME: "digivigee_admin_session",
  // 5 days in milliseconds
  SESSION_EXPIRATION_MS: 5 * 24 * 60 * 60 * 1000,
  // 5 days in seconds for cookie max-age
  SESSION_MAX_AGE_SECONDS: 5 * 24 * 60 * 60,
  LOGIN_ROUTE: "/admin/login",
  DASHBOARD_ROUTE: "/admin",
} as const;

import { Permission } from "@/types/rbac";

export interface AdminUserSession {
  uid: string;
  email: string;
  displayName?: string;
  role: string;
  roleName?: string;
  permissions: Permission[];
  createdAt: number;
}

