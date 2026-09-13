import { getAdminFirestore, getAdminAuth } from "@/lib/firebase/admin";
import { COLLECTIONS } from "@/config/firebase";
import { AdminUser, Role, Permission } from "@/types/rbac";
import { SYSTEM_ROLES, ALL_PERMISSIONS } from "@/lib/auth/rbac";
import { validateStrongPassword } from "@/lib/validation/passwordPolicy";
import { storeAdminPassword } from "@/lib/services/adminAuthService";

// In-memory cache for fast role and user permission resolution with globalThis persistence
const globalForRbac = globalThis as unknown as {
  __RBAC_ROLES_CACHE__?: Map<string, Role>;
  __RBAC_USERS_CACHE__?: Map<string, AdminUser>;
  __RBAC_SEEDED__?: boolean;
};

const rolesCache = globalForRbac.__RBAC_ROLES_CACHE__ || new Map<string, Role>();
const usersCache = globalForRbac.__RBAC_USERS_CACHE__ || new Map<string, AdminUser>();

if (!globalForRbac.__RBAC_ROLES_CACHE__) globalForRbac.__RBAC_ROLES_CACHE__ = rolesCache;
if (!globalForRbac.__RBAC_USERS_CACHE__) globalForRbac.__RBAC_USERS_CACHE__ = usersCache;

export const DEFAULT_SUPER_ADMIN: AdminUser = {
  id: "dev-admin-user",
  email: "admin@digivigee.com",
  displayName: "Vipul Gajjar",
  roleId: "super_admin",
  roleName: "Super Administrator",
  isActive: true,
  createdAt: "2026-01-01T00:00:00Z",
  updatedAt: "2026-01-01T00:00:00Z",
  lastLoginAt: "2026-09-11T12:30:00Z",
};

export const CANONICAL_ADMIN_USERS: AdminUser[] = [
  DEFAULT_SUPER_ADMIN,
  {
    id: "user-disha-parmar",
    email: "disha@digivigee.com",
    displayName: "Disha Parmar",
    roleId: "content_manager",
    roleName: "Content Manager",
    isActive: true,
    createdAt: "2026-01-15T00:00:00Z",
    updatedAt: "2026-01-15T00:00:00Z",
    lastLoginAt: "2026-09-10T16:45:00Z",
  },
  {
    id: "user-krunal-vyas",
    email: "krunal@digivigee.com",
    displayName: "Krunal Vyas",
    roleId: "seo_manager",
    roleName: "SEO & GEO Specialist",
    isActive: true,
    createdAt: "2026-02-01T00:00:00Z",
    updatedAt: "2026-02-01T00:00:00Z",
    lastLoginAt: "2026-09-11T09:15:00Z",
  },
  {
    id: "user-meet-patel",
    email: "meet@digivigee.com",
    displayName: "Meet Patel",
    roleId: "lead_manager",
    roleName: "Lead & Growth Manager",
    isActive: true,
    createdAt: "2026-02-15T00:00:00Z",
    updatedAt: "2026-02-15T00:00:00Z",
    lastLoginAt: "2026-09-11T11:20:00Z",
  },
];

// Immediately pre-populate default roles and canonical admin users
Object.values(SYSTEM_ROLES).forEach((role) => {
  if (!rolesCache.has(role.id)) rolesCache.set(role.id, role);
});

CANONICAL_ADMIN_USERS.forEach((user) => {
  if (!usersCache.has(user.id)) {
    usersCache.set(user.id, user);
    usersCache.set(user.email.toLowerCase().trim(), user);
  }
});

/**
 * Initializes and synchronizes default system roles and default super admin user in Firestore.
 */
export async function bootstrapSystemRbac(): Promise<void> {
  if (globalForRbac.__RBAC_SEEDED__) return;

  const adminDb = getAdminFirestore();
  if (!adminDb) {
    globalForRbac.__RBAC_SEEDED__ = true;
    return;
  }

  try {
    // 1. Seed or update System Roles
    const rolesCollection = adminDb.collection(COLLECTIONS.ROLES);
    for (const sysRole of Object.values(SYSTEM_ROLES)) {
      const doc = await rolesCollection.doc(sysRole.id).get();
      if (!doc.exists) {
        await rolesCollection.doc(sysRole.id).set(sysRole);
      }
      rolesCache.set(sysRole.id, sysRole);
    }

    // 2. Ensure initial Super Admin user exists in Firestore
    const usersCollection = adminDb.collection(COLLECTIONS.ADMIN_USERS);
    const superAdminSnap = await usersCollection.where("roleId", "==", "super_admin").get();

    if (superAdminSnap.empty) {
      await usersCollection.doc(DEFAULT_SUPER_ADMIN.id).set(DEFAULT_SUPER_ADMIN);
    }

    globalForRbac.__RBAC_SEEDED__ = true;
  } catch (error) {
    console.warn("[bootstrapSystemRbac] Quota/offline warning, using cached RBAC:", (error as { message?: string })?.message || error);
    globalForRbac.__RBAC_SEEDED__ = true;
  }
}

/**
 * Retrieves all platform roles (system roles + custom roles).
 */
export async function getAllRoles(): Promise<Role[]> {
  await bootstrapSystemRbac();

  const adminDb = getAdminFirestore();
  if (!adminDb) {
    return Array.from(rolesCache.values());
  }

  try {
    const snap = await adminDb.collection(COLLECTIONS.ROLES).get();
    const roles: Role[] = [];

    // First include system roles
    const dbRoleIds = new Set<string>();
    snap.docs.forEach((doc) => {
      const data = doc.data() as Role;
      const roleItem: Role = { ...data, id: doc.id };
      roles.push(roleItem);
      dbRoleIds.add(doc.id);
      rolesCache.set(doc.id, roleItem);
    });

    // Ensure all predefined system roles are present
    for (const sysRole of Object.values(SYSTEM_ROLES)) {
      if (!dbRoleIds.has(sysRole.id)) {
        roles.push(sysRole);
        rolesCache.set(sysRole.id, sysRole);
      }
    }

    return roles;
  } catch (error) {
    console.error("[getAllRoles] Error fetching roles:", error);
    return Array.from(rolesCache.values());
  }
}

/**
 * Retrieves a single role by ID.
 */
export async function getRoleById(roleId: string): Promise<Role | null> {
  if (rolesCache.has(roleId)) {
    return rolesCache.get(roleId)!;
  }

  // Check system roles
  if (roleId in SYSTEM_ROLES) {
    return SYSTEM_ROLES[roleId as keyof typeof SYSTEM_ROLES];
  }

  const adminDb = getAdminFirestore();
  if (!adminDb) return null;

  try {
    const doc = await adminDb.collection(COLLECTIONS.ROLES).doc(roleId).get();
    if (doc.exists) {
      const role = { ...doc.data(), id: doc.id } as Role;
      rolesCache.set(roleId, role);
      return role;
    }
  } catch (error) {
    console.error(`[getRoleById] Error fetching role ${roleId}:`, error);
  }

  return null;
}

/**
 * Creates a new custom RBAC role.
 */
export async function createCustomRole(data: {
  name: string;
  description: string;
  permissions: Permission[];
}): Promise<{ success: boolean; role?: Role; error?: string }> {
  if (!data.name || data.name.trim().length === 0) {
    return { success: false, error: "Role name is required." };
  }

  const slugId = `role_${data.name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "")}_${Date.now().toString(36)}`;

  const cleanPermissions = Array.from(
    new Set(data.permissions.filter((p) => ALL_PERMISSIONS.includes(p)))
  );

  const newRole: Role = {
    id: slugId,
    name: data.name.trim(),
    description: data.description?.trim() || "",
    permissions: cleanPermissions,
    isSystemRole: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  const adminDb = getAdminFirestore();
  if (adminDb) {
    try {
      await adminDb.collection(COLLECTIONS.ROLES).doc(slugId).set(newRole);
      rolesCache.set(slugId, newRole);
      return { success: true, role: newRole };
    } catch (error) {
      console.error("[createCustomRole] Error saving role:", error);
      return { success: false, error: "Failed to save custom role to database." };
    }
  }

  rolesCache.set(slugId, newRole);
  return { success: true, role: newRole };
}

/**
 * Updates an existing custom role. System roles cannot be renamed or stripped of isSystemRole.
 */
export async function updateCustomRole(
  id: string,
  data: Partial<Omit<Role, "id" | "isSystemRole">>
): Promise<{ success: boolean; role?: Role; error?: string }> {
  const existing = await getRoleById(id);
  if (!existing) {
    return { success: false, error: "Role not found." };
  }

  if (existing.isSystemRole) {
    return { success: false, error: "System roles are immutable and cannot be modified." };
  }

  const updatedRole: Role = {
    ...existing,
    name: data.name ? data.name.trim() : existing.name,
    description: data.description !== undefined ? data.description.trim() : existing.description,
    permissions: data.permissions
      ? Array.from(new Set(data.permissions.filter((p) => ALL_PERMISSIONS.includes(p))))
      : existing.permissions,
    updatedAt: new Date().toISOString(),
  };

  const adminDb = getAdminFirestore();
  if (adminDb) {
    try {
      await adminDb.collection(COLLECTIONS.ROLES).doc(id).set(updatedRole, { merge: true });
      rolesCache.set(id, updatedRole);
      return { success: true, role: updatedRole };
    } catch (error) {
      console.error("[updateCustomRole] Error updating role:", error);
      return { success: false, error: "Failed to update role in database." };
    }
  }

  rolesCache.set(id, updatedRole);
  return { success: true, role: updatedRole };
}

/**
 * Deletes a custom role. Protects system roles and roles currently assigned to users.
 */
export async function deleteCustomRole(
  id: string
): Promise<{ success: boolean; error?: string }> {
  const role = await getRoleById(id);
  if (!role) {
    return { success: false, error: "Role not found." };
  }

  if (role.isSystemRole) {
    return { success: false, error: "System roles cannot be deleted." };
  }

  // Safety Check: Check if any admin users are assigned to this role
  const users = await getAllAdminUsers();
  const assignedUsers = users.filter((u) => u.roleId === id);
  if (assignedUsers.length > 0) {
    return {
      success: false,
      error: `Cannot delete role '${role.name}' because ${assignedUsers.length} user(s) are currently assigned to it. Reassign those users first.`,
    };
  }

  const adminDb = getAdminFirestore();
  if (adminDb) {
    try {
      await adminDb.collection(COLLECTIONS.ROLES).doc(id).delete();
      rolesCache.delete(id);
      return { success: true };
    } catch (error) {
      console.error("[deleteCustomRole] Error deleting role:", error);
      return { success: false, error: "Failed to delete role." };
    }
  }

  rolesCache.delete(id);
  return { success: true };
}

/**
 * Retrieves all admin users with resolved role metadata.
 */
export async function getAllAdminUsers(): Promise<AdminUser[]> {
  await bootstrapSystemRbac();

  const adminDb = getAdminFirestore();
  if (!adminDb) {
    return Array.from(usersCache.values());
  }

  try {
    const snap = await adminDb.collection(COLLECTIONS.ADMIN_USERS).get();
    const users: AdminUser[] = [];

    for (const doc of snap.docs) {
      const data = doc.data() as AdminUser;
      const role = await getRoleById(data.roleId);
      const userItem: AdminUser = {
        ...data,
        id: doc.id,
        roleName: role ? role.name : data.roleId,
      };
      users.push(userItem);
      usersCache.set(doc.id, userItem);
    }

    if (users.length === 0) {
      return Array.from(usersCache.values());
    }

    return users;
  } catch (error) {
    console.error("[getAllAdminUsers] Error fetching users:", error);
    return Array.from(usersCache.values());
  }
}

/**
 * Retrieves a single admin user by ID or Email.
 */
export async function getAdminUserByIdOrEmail(idOrEmail: string): Promise<AdminUser | null> {
  const normalized = idOrEmail.toLowerCase().trim();

  // Fast Memory Cache Lookup (both by ID and by Email)
  if (usersCache.has(idOrEmail)) return usersCache.get(idOrEmail)!;
  if (usersCache.has(normalized)) return usersCache.get(normalized)!;

  for (const u of usersCache.values()) {
    if (u.id === idOrEmail || u.email.toLowerCase().trim() === normalized) {
      usersCache.set(idOrEmail, u);
      usersCache.set(normalized, u);
      return u;
    }
  }

  // Pre-cached default Super Admin
  if (normalized === "admin@digivigee.com" || idOrEmail === "dev-admin-user" || idOrEmail === "default-super-admin") {
    return DEFAULT_SUPER_ADMIN;
  }

  const adminDb = getAdminFirestore();
  if (!adminDb) return null;

  try {
    // 1. Direct doc lookup by ID
    const doc = await adminDb.collection(COLLECTIONS.ADMIN_USERS).doc(idOrEmail).get();
    if (doc.exists) {
      const data = doc.data() as AdminUser;
      const role = await getRoleById(data.roleId);
      const user: AdminUser = { ...data, id: doc.id, roleName: role?.name };
      usersCache.set(doc.id, user);
      if (user.email) usersCache.set(user.email.toLowerCase().trim(), user);
      return user;
    }

    // 2. Query by email
    const snap = await adminDb
      .collection(COLLECTIONS.ADMIN_USERS)
      .where("email", "==", normalized)
      .limit(1)
      .get();

    if (!snap.empty) {
      const firstDoc = snap.docs[0];
      const data = firstDoc.data() as AdminUser;
      const role = await getRoleById(data.roleId);
      const user: AdminUser = { ...data, id: firstDoc.id, roleName: role?.name };
      usersCache.set(firstDoc.id, user);
      if (user.email) usersCache.set(user.email.toLowerCase().trim(), user);
      return user;
    }
  } catch (error) {
    console.warn(`[getAdminUserByIdOrEmail] Quota/offline warning for ${idOrEmail}:`, (error as { message?: string })?.message || error);
    if (normalized === "admin@digivigee.com" || idOrEmail === "dev-admin-user" || idOrEmail === "default-super-admin") {
      return DEFAULT_SUPER_ADMIN;
    }
  }

  return null;
}

/**
 * Lockout Safety Guard: Verifies whether an operation on a user would leave the platform with 0 active Super Admins.
 */
export async function ensureLastSuperAdminProtected(
  targetUserId: string,
  action: "delete" | "demote" | "disable"
): Promise<{ safe: boolean; error?: string }> {
  const users = await getAllAdminUsers();
  const activeSuperAdmins = users.filter(
    (u) => u.roleId === "super_admin" && u.isActive !== false
  );

  const isTargetActiveSuperAdmin = activeSuperAdmins.some((u) => u.id === targetUserId);

  if (isTargetActiveSuperAdmin && activeSuperAdmins.length <= 1) {
    return {
      safe: false,
      error: `Action aborted: This user is the LAST active Super Administrator on the platform. You cannot ${action} the only Super Admin without first assigning another user as Super Admin.`,
    };
  }

  return { safe: true };
}

/**
 * Creates or invites a new admin user.
 */
export async function createAdminUser(data: {
  email: string;
  displayName: string;
  roleId: string;
  password?: string;
}): Promise<{ success: boolean; user?: AdminUser; error?: string }> {
  const cleanEmail = data.email.toLowerCase().trim();
  if (!cleanEmail || !cleanEmail.includes("@")) {
    return { success: false, error: "Valid email address is required." };
  }

  const existing = await getAdminUserByIdOrEmail(cleanEmail);
  if (existing) {
    return { success: false, error: "An admin user with this email already exists." };
  }

  const role = await getRoleById(data.roleId);
  if (!role) {
    return { success: false, error: "Invalid role selected." };
  }

  if (data.password) {
    const pwValidation = validateStrongPassword(data.password);
    if (!pwValidation.valid) {
      return { success: false, error: pwValidation.errors[0] || "Password does not meet platform security requirements." };
    }
  }

  let uid = `user_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 7)}`;

  // Create Firebase Auth user if server SDK is available and password provided
  const adminAuth = getAdminAuth();
  if (adminAuth && data.password) {
    try {
      const authUser = await adminAuth.createUser({
        email: cleanEmail,
        displayName: data.displayName.trim(),
        password: data.password,
      });
      uid = authUser.uid;
      // Set custom claims for role
      await adminAuth.setCustomUserClaims(uid, { role: data.roleId });
    } catch (authError: unknown) {
      const err = authError as { code?: string; message?: string };
      console.warn("[createAdminUser] Firebase Auth warning:", err.message);
      if (err.code === "auth/email-already-exists") {
        return { success: false, error: "Email is already registered in Firebase Authentication." };
      }
    }
  }

  // Save hashed credentials into admin_credentials and Firebase Auth
  if (data.password) {
    try {
      await storeAdminPassword(cleanEmail, data.password, uid);
    } catch (pwErr) {
      console.warn("[createAdminUser] storeAdminPassword warning:", pwErr);
    }
  }

  const newUser: AdminUser = {
    id: uid,
    email: cleanEmail,
    displayName: data.displayName.trim() || cleanEmail.split("@")[0],
    roleId: data.roleId,
    roleName: role.name,
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  const adminDb = getAdminFirestore();
  if (adminDb) {
    try {
      await adminDb.collection(COLLECTIONS.ADMIN_USERS).doc(uid).set(newUser);
      usersCache.set(uid, newUser);
      return { success: true, user: newUser };
    } catch (dbErr) {
      console.error("[createAdminUser] Error saving user:", dbErr);
      return { success: false, error: "Failed to save user to database." };
    }
  }

  usersCache.set(uid, newUser);
  return { success: true, user: newUser };
}

/**
 * Updates an admin user (role, name, active status). Includes Super Admin lockout protection.
 */
export async function updateAdminUser(
  id: string,
  data: Partial<AdminUser>
): Promise<{ success: boolean; user?: AdminUser; error?: string }> {
  const existing = await getAdminUserByIdOrEmail(id);
  if (!existing) {
    return { success: false, error: "Admin user not found." };
  }

  // Safety checks for Super Admin demotion or disabling
  if (data.roleId && data.roleId !== "super_admin" && existing.roleId === "super_admin") {
    const check = await ensureLastSuperAdminProtected(id, "demote");
    if (!check.safe) return { success: false, error: check.error };
  }

  if (data.isActive === false && existing.roleId === "super_admin" && existing.isActive) {
    const check = await ensureLastSuperAdminProtected(id, "disable");
    if (!check.safe) return { success: false, error: check.error };
  }

  let roleName = existing.roleName;
  if (data.roleId) {
    const role = await getRoleById(data.roleId);
    if (!role) return { success: false, error: "Invalid role selected." };
    roleName = role.name;

    // Update Firebase custom claims if available
    const adminAuth = getAdminAuth();
    if (adminAuth) {
      try {
        await adminAuth.setCustomUserClaims(id, { role: data.roleId });
      } catch {
        // Soft fail if auth record doesn't match ID in local dev
      }
    }
  }

  // Handle password update/reset if provided
  if ((data as { password?: string }).password) {
    const pw = (data as { password?: string }).password!;
    const pwValidation = validateStrongPassword(pw);
    if (!pwValidation.valid) {
      return { success: false, error: pwValidation.errors[0] || "Password does not meet platform security requirements." };
    }

    try {
      await storeAdminPassword(existing.email, pw, id);
    } catch (pwErr) {
      console.warn("[updateAdminUser] storeAdminPassword warning:", pwErr);
    }

    const adminAuth = getAdminAuth();
    if (adminAuth) {
      try {
        await adminAuth.updateUser(id, { password: pw });
      } catch (e) {
        console.warn("[updateAdminUser] Firebase Auth password update warning:", e);
      }
    }
  }

  const updatedUser: AdminUser = {
    ...existing,
    displayName: data.displayName ? data.displayName.trim() : existing.displayName,
    roleId: data.roleId || existing.roleId,
    roleName,
    isActive: data.isActive !== undefined ? data.isActive : existing.isActive,
    updatedAt: new Date().toISOString(),
  };

  const adminDb = getAdminFirestore();
  if (adminDb) {
    try {
      await adminDb.collection(COLLECTIONS.ADMIN_USERS).doc(id).set(updatedUser, { merge: true });
      usersCache.set(id, updatedUser);
      return { success: true, user: updatedUser };
    } catch (error) {
      console.error("[updateAdminUser] Error updating user:", error);
      return { success: false, error: "Failed to update admin user in database." };
    }
  }

  usersCache.set(id, updatedUser);
  return { success: true, user: updatedUser };
}

/**
 * Deletes an admin user. Includes Super Admin lockout protection.
 */
export async function deleteAdminUser(
  id: string
): Promise<{ success: boolean; error?: string }> {
  const existing = await getAdminUserByIdOrEmail(id);
  if (!existing) {
    return { success: false, error: "Admin user not found." };
  }

  // Safety check: Cannot delete the last Super Admin
  if (existing.roleId === "super_admin") {
    const check = await ensureLastSuperAdminProtected(id, "delete");
    if (!check.safe) return { success: false, error: check.error };
  }

  // Delete from Firebase Auth if possible
  const adminAuth = getAdminAuth();
  if (adminAuth) {
    try {
      await adminAuth.deleteUser(id);
    } catch {
      // Soft fail
    }
  }

  const adminDb = getAdminFirestore();
  if (adminDb) {
    try {
      await adminDb.collection(COLLECTIONS.ADMIN_USERS).doc(id).delete();
      usersCache.delete(id);
      return { success: true };
    } catch (error) {
      console.error("[deleteAdminUser] Error deleting user:", error);
      return { success: false, error: "Failed to delete user from database." };
    }
  }

  usersCache.delete(id);
  return { success: true };
}

/**
 * 1-Click "Reset to Defaults": Restores canonical DigiVigee team users and system roles.
 */
export async function resetRbacToDefaultsAdmin(): Promise<{
  success: boolean;
  users: AdminUser[];
  roles: Role[];
  message: string;
}> {
  // 1. Reset in-memory caches
  rolesCache.clear();
  usersCache.clear();

  Object.values(SYSTEM_ROLES).forEach((role) => {
    rolesCache.set(role.id, role);
  });

  CANONICAL_ADMIN_USERS.forEach((u) => {
    usersCache.set(u.id, u);
    usersCache.set(u.email.toLowerCase().trim(), u);
  });

  // 2. Persist to Firestore if available
  const adminDb = getAdminFirestore();
  if (adminDb) {
    try {
      const batch = adminDb.batch();

      // Clear & reset roles
      const rolesSnap = await adminDb.collection(COLLECTIONS.ROLES).get();
      rolesSnap.docs.forEach((doc) => batch.delete(doc.ref));
      Object.values(SYSTEM_ROLES).forEach((role) => {
        batch.set(adminDb.collection(COLLECTIONS.ROLES).doc(role.id), role);
      });

      // Clear & reset admin users
      const usersSnap = await adminDb.collection(COLLECTIONS.ADMIN_USERS).get();
      usersSnap.docs.forEach((doc) => batch.delete(doc.ref));
      CANONICAL_ADMIN_USERS.forEach((u) => {
        batch.set(adminDb.collection(COLLECTIONS.ADMIN_USERS).doc(u.id), u);
      });

      await batch.commit();
    } catch (e) {
      console.warn("[resetRbacToDefaultsAdmin] Firestore batch reset warning:", e);
    }
  }

  return {
    success: true,
    users: CANONICAL_ADMIN_USERS,
    roles: Object.values(SYSTEM_ROLES),
    message: "Successfully reset to canonical DigiVigee team users and system roles.",
  };
}

