import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { AUTH_CONFIG, AdminUserSession } from "./constants";
import { verifyAdminSessionCookie } from "./serverAuth";
import { Permission } from "@/types/rbac";
import { hasPermission, hasAnyPermission } from "./rbacRules";

// Re-export all client-safe definitions and helper functions
export * from "./rbacRules";

export interface PermissionCheckResult {
  authorized: boolean;
  user?: AdminUserSession;
  response?: NextResponse;
}

/**
 * Server-side API guard: Enforces that the current session has the specified permission.
 */
export async function requirePermission(
  _request: NextRequest,
  permission: Permission
): Promise<PermissionCheckResult> {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get(AUTH_CONFIG.SESSION_COOKIE_NAME)?.value;
  const { authenticated, user, error } = await verifyAdminSessionCookie(sessionCookie);

  if (!authenticated || !user) {
    return {
      authorized: false,
      response: NextResponse.json(
        { success: false, error: error || "Unauthorized. Active admin session required." },
        { status: 401 }
      ),
    };
  }

  if (!hasPermission(user, permission)) {
    return {
      authorized: false,
      user,
      response: NextResponse.json(
        {
          success: false,
          error: "Forbidden. Insufficient permissions for this operation.",
          requiredPermission: permission,
        },
        { status: 403 }
      ),
    };
  }

  return { authorized: true, user };
}

/**
 * Server-side API guard: Enforces that the user has at least one of the specified permissions.
 */
export async function requireAnyPermission(
  _request: NextRequest,
  permissions: Permission[]
): Promise<PermissionCheckResult> {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get(AUTH_CONFIG.SESSION_COOKIE_NAME)?.value;
  const { authenticated, user, error } = await verifyAdminSessionCookie(sessionCookie);

  if (!authenticated || !user) {
    return {
      authorized: false,
      response: NextResponse.json(
        { success: false, error: error || "Unauthorized. Active admin session required." },
        { status: 401 }
      ),
    };
  }

  if (!hasAnyPermission(user, permissions)) {
    return {
      authorized: false,
      user,
      response: NextResponse.json(
        {
          success: false,
          error: "Forbidden. Insufficient permissions for this operation.",
          requiredPermissions: permissions,
        },
        { status: 403 }
      ),
    };
  }

  return { authorized: true, user };
}

/**
 * Server-side API guard: Enforces role-based checking directly.
 */
export async function requireRole(
  _request: NextRequest,
  allowedRoles: string[]
): Promise<PermissionCheckResult> {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get(AUTH_CONFIG.SESSION_COOKIE_NAME)?.value;
  const { authenticated, user, error } = await verifyAdminSessionCookie(sessionCookie);

  if (!authenticated || !user) {
    return {
      authorized: false,
      response: NextResponse.json(
        { success: false, error: error || "Unauthorized. Active admin session required." },
        { status: 401 }
      ),
    };
  }

  if (user.role !== "super_admin" && !allowedRoles.includes(user.role)) {
    return {
      authorized: false,
      user,
      response: NextResponse.json(
        { success: false, error: "Forbidden. Insufficient administrative role level." },
        { status: 403 }
      ),
    };
  }

  return { authorized: true, user };
}
