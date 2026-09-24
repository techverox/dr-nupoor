/**
 * Dr. Noopur Patel Practice Platform — Role-Based Access Control (RBAC) Types
 * Standardized permission identifiers, roles, and administrative user models.
 */

export type Permission =
  // Dashboard
  | "dashboard.view"
  // Website Pages CMS
  | "pages.view"
  | "pages.create"
  | "pages.edit"
  | "pages.delete"
  // Services CMS
  | "services.view"
  | "services.create"
  | "services.edit"
  | "services.delete"
  // Portfolio CMS
  | "portfolio.view"
  | "portfolio.create"
  | "portfolio.edit"
  | "portfolio.delete"
  // Blog CMS
  | "blogs.view"
  | "blogs.create"
  | "blogs.edit"
  | "blogs.delete"
  | "blogs.publish"
  // Testimonials CMS
  | "testimonials.view"
  | "testimonials.create"
  | "testimonials.edit"
  | "testimonials.delete"
  // FAQs CMS
  | "faqs.view"
  | "faqs.create"
  | "faqs.edit"
  | "faqs.delete"
  // Team CMS
  | "team.view"
  | "team.create"
  | "team.edit"
  | "team.delete"
  // Landing Pages & Builder
  | "landing_pages.view"
  | "landing_pages.create"
  | "landing_pages.edit"
  | "landing_pages.delete"
  | "landing_pages.publish"
  // Forms & Builder
  | "forms.view"
  | "forms.create"
  | "forms.edit"
  | "forms.delete"
  | "forms.submissions.view"
  | "forms.submissions.export"
  // Leads & Inquiries
  | "leads.view"
  | "leads.create"
  | "leads.edit"
  | "leads.delete"
  | "leads.export"
  // Newsletter Subscribers
  | "subscribers.view"
  | "subscribers.delete"
  | "subscribers.export"
  // Media Library
  | "media.view"
  | "media.upload"
  | "media.delete"
  // SEO & Meta Management
  | "seo.view"
  | "seo.edit"
  // URL Redirects
  | "redirects.view"
  | "redirects.create"
  | "redirects.edit"
  | "redirects.delete"
  // Offers & Marketing Controls
  | "offers.view"
  | "offers.create"
  | "offers.edit"
  | "offers.delete"
  // Analytics & Reporting
  | "analytics.view"
  | "analytics.export"
  // Global Settings
  | "settings.view"
  | "settings.edit"
  // Admin Users & Team Management
  | "users.view"
  | "users.create"
  | "users.edit"
  | "users.delete"
  // Custom Roles & Permissions Management
  | "roles.view"
  | "roles.create"
  | "roles.edit"
  | "roles.delete"
  // Activity & Audit Logs (Phase 4 Step 19)
  | "audit_logs.view"
  | "audit_logs.export"
  // Content Revisions (Phase 4 Step 19)
  | "revisions.view"
  | "revisions.restore"
  // Backup & Data Export (Phase 4 Step 19)
  | "backup.view"
  | "backup.export";

export interface PermissionGroupDef {
  category: string;
  description?: string;
  permissions: {
    key: Permission;
    label: string;
    description?: string;
  }[];
}

export interface Role {
  id: string; // e.g. "super_admin", "content_manager", "lead_manager", "seo_manager", or custom slug
  name: string;
  description: string;
  permissions: Permission[];
  isSystemRole: boolean; // System roles cannot be deleted or renamed
  createdAt: string;
  updatedAt: string;
}

export interface AdminUser {
  id: string; // Firebase Auth UID or doc ID
  email: string;
  displayName: string;
  roleId: string;
  roleName?: string;
  isActive: boolean;
  twoFactorEnabled?: boolean;
  twoFactorSecret?: string;
  twoFactorBackupCodes?: string[];
  createdAt: string;
  updatedAt: string;
  lastLoginAt?: string;
}

export type SystemRoleId = "super_admin" | "content_manager" | "lead_manager" | "seo_manager";

// ==========================================
// PHASE 4 STEP 19: AUDIT LOGS & REVISIONS
// ==========================================

export type AuditAction =
  | "CREATE"
  | "UPDATE"
  | "DELETE"
  | "PUBLISH"
  | "UNPUBLISH"
  | "RESTORE"
  | "LOGIN"
  | "LOGOUT"
  | "LOGIN_FAILED"
  | "ROLE_CHANGE"
  | "PERMISSION_CHANGE"
  | "SEO_UPDATE"
  | "REDIRECT_CREATE"
  | "REDIRECT_UPDATE"
  | "REDIRECT_DELETE"
  | "OFFER_CREATE"
  | "OFFER_UPDATE"
  | "OFFER_DISABLE"
  | "FORM_CREATE"
  | "FORM_UPDATE"
  | "FORM_DELETE"
  | "LEAD_STATUS_CHANGE"
  | "LEAD_DELETE"
  | "SUBSCRIBER_DELETE"
  | "MEDIA_UPLOAD"
  | "MEDIA_DELETE"
  | "SETTINGS_UPDATE"
  | "BACKUP_EXPORT"
  | "USER_INVITE"
  | "USER_UPDATE"
  | "USER_DELETE"
  | "PASSWORD_CHANGE"
  | "ROLE_CREATE"
  | "ROLE_UPDATE"
  | "ROLE_DELETE";

export type AuditResourceType =
  | "blog"
  | "page"
  | "service"
  | "portfolio"
  | "testimonial"
  | "faq"
  | "team"
  | "landing_page"
  | "component"
  | "template"
  | "form"
  | "lead"
  | "subscriber"
  | "media"
  | "seo"
  | "redirect"
  | "offer"
  | "settings"
  | "user"
  | "role"
  | "auth"
  | "backup"
  | "revision";

export interface AuditActor {
  uid: string;
  email: string;
  displayName?: string;
  role: string;
  roleName?: string;
  ipAddress?: string;
  userAgent?: string;
}

export interface AuditLogEntry {
  id: string;
  timestamp: string; // ISO 8601 string
  actor: AuditActor;
  action: AuditAction;
  resourceType: AuditResourceType;
  resourceId?: string;
  resourceTitle?: string;
  summary: string;
  status: "success" | "failure";
  errorMessage?: string;
  metadata?: Record<string, unknown>;
}

export interface CreateAuditLogInput {
  actor: AuditActor;
  action: AuditAction;
  resourceType: AuditResourceType;
  resourceId?: string;
  resourceTitle?: string;
  summary: string;
  status?: "success" | "failure";
  errorMessage?: string;
  metadata?: Record<string, unknown>;
}

export interface ContentRevision {
  id: string;
  resourceType: AuditResourceType;
  resourceId: string;
  resourceTitle?: string;
  version: number;
  snapshot: Record<string, unknown>;
  changeSummary?: string;
  createdBy: AuditActor;
  createdAt: string;
  restoredFromVersion?: number;
}

export interface CreateRevisionInput {
  resourceType: AuditResourceType;
  resourceId: string;
  resourceTitle?: string;
  snapshot: Record<string, unknown>;
  changeSummary?: string;
  actor: AuditActor;
}

export interface BackupManifest {
  version: string;
  timestamp: string;
  exportedBy: AuditActor;
  totalCollections: number;
  totalDocuments: number;
  collections: {
    name: string;
    documentCount: number;
  }[];
  checksumSummary?: string;
}

