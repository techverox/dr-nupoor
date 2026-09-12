import { AdminUserSession } from "./constants";
import { Permission, PermissionGroupDef, Role, SystemRoleId } from "@/types/rbac";

/**
 * Complete list of all system permissions.
 */
export const ALL_PERMISSIONS: Permission[] = [
  "dashboard.view",
  "pages.view",
  "pages.create",
  "pages.edit",
  "pages.delete",
  "services.view",
  "services.create",
  "services.edit",
  "services.delete",
  "portfolio.view",
  "portfolio.create",
  "portfolio.edit",
  "portfolio.delete",
  "blogs.view",
  "blogs.create",
  "blogs.edit",
  "blogs.delete",
  "blogs.publish",
  "testimonials.view",
  "testimonials.create",
  "testimonials.edit",
  "testimonials.delete",
  "faqs.view",
  "faqs.create",
  "faqs.edit",
  "faqs.delete",
  "team.view",
  "team.create",
  "team.edit",
  "team.delete",
  "landing_pages.view",
  "landing_pages.create",
  "landing_pages.edit",
  "landing_pages.delete",
  "landing_pages.publish",
  "forms.view",
  "forms.create",
  "forms.edit",
  "forms.delete",
  "forms.submissions.view",
  "forms.submissions.export",
  "leads.view",
  "leads.create",
  "leads.edit",
  "leads.delete",
  "leads.export",
  "subscribers.view",
  "subscribers.delete",
  "subscribers.export",
  "media.view",
  "media.upload",
  "media.delete",
  "seo.view",
  "seo.edit",
  "redirects.view",
  "redirects.create",
  "redirects.edit",
  "redirects.delete",
  "offers.view",
  "offers.create",
  "offers.edit",
  "offers.delete",
  "analytics.view",
  "analytics.export",
  "settings.view",
  "settings.edit",
  "users.view",
  "users.create",
  "users.edit",
  "users.delete",
  "roles.view",
  "roles.create",
  "roles.edit",
  "roles.delete",
  // Activity & Audit Logs (Phase 4 Step 19)
  "audit_logs.view",
  "audit_logs.export",
  // Content Revisions (Phase 4 Step 19)
  "revisions.view",
  "revisions.restore",
  // Backup & Data Export (Phase 4 Step 19)
  "backup.view",
  "backup.export",
];

/**
 * Standard Built-in System Roles
 */
export const SYSTEM_ROLES: Record<SystemRoleId, Role> = {
  super_admin: {
    id: "super_admin",
    name: "Super Administrator",
    description: "Unrestricted access to all modules, settings, users, and security configurations.",
    isSystemRole: true,
    permissions: ALL_PERMISSIONS,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  content_manager: {
    id: "content_manager",
    name: "Content Manager",
    description: "Create, edit, publish, and manage website pages, services, portfolio, blogs, testimonials, FAQs, team members, landing pages, and media assets.",
    isSystemRole: true,
    permissions: [
      "dashboard.view",
      "pages.view",
      "pages.create",
      "pages.edit",
      "pages.delete",
      "services.view",
      "services.create",
      "services.edit",
      "services.delete",
      "portfolio.view",
      "portfolio.create",
      "portfolio.edit",
      "portfolio.delete",
      "blogs.view",
      "blogs.create",
      "blogs.edit",
      "blogs.delete",
      "blogs.publish",
      "testimonials.view",
      "testimonials.create",
      "testimonials.edit",
      "testimonials.delete",
      "faqs.view",
      "faqs.create",
      "faqs.edit",
      "faqs.delete",
      "team.view",
      "team.create",
      "team.edit",
      "team.delete",
      "landing_pages.view",
      "landing_pages.create",
      "landing_pages.edit",
      "landing_pages.delete",
      "landing_pages.publish",
      "media.view",
      "media.upload",
      "media.delete",
      "revisions.view",
      "revisions.restore",
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  lead_manager: {
    id: "lead_manager",
    name: "Lead & Growth Manager",
    description: "Manage inbound leads, form builder configurations, user submissions, subscriber lists, and popup marketing campaigns.",
    isSystemRole: true,
    permissions: [
      "dashboard.view",
      "forms.view",
      "forms.create",
      "forms.edit",
      "forms.delete",
      "forms.submissions.view",
      "forms.submissions.export",
      "leads.view",
      "leads.create",
      "leads.edit",
      "leads.delete",
      "leads.export",
      "subscribers.view",
      "subscribers.delete",
      "subscribers.export",
      "offers.view",
      "offers.create",
      "offers.edit",
      "offers.delete",
      "analytics.view",
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  seo_manager: {
    id: "seo_manager",
    name: "SEO & Optimization Manager",
    description: "Manage search engine optimization parameters, global meta tags, robots configuration, and 301 URL redirect rules.",
    isSystemRole: true,
    permissions: [
      "dashboard.view",
      "seo.view",
      "seo.edit",
      "redirects.view",
      "redirects.create",
      "redirects.edit",
      "redirects.delete",
      "analytics.view",
      "pages.view",
      "blogs.view",
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
};

/**
 * UI-Friendly Categorized Permission Groups for Role Editing and Matrix Auditing
 */
export const PERMISSION_GROUPS: PermissionGroupDef[] = [
  {
    category: "Main & Overview",
    permissions: [
      { key: "dashboard.view", label: "View Executive Dashboard" },
    ],
  },
  {
    category: "Website Pages CMS",
    permissions: [
      { key: "pages.view", label: "View Page Content" },
      { key: "pages.create", label: "Create New Pages" },
      { key: "pages.edit", label: "Edit Page Content & SEO" },
      { key: "pages.delete", label: "Delete Pages" },
    ],
  },
  {
    category: "Services CMS",
    permissions: [
      { key: "services.view", label: "View Services" },
      { key: "services.create", label: "Create Services" },
      { key: "services.edit", label: "Edit Services" },
      { key: "services.delete", label: "Delete Services" },
    ],
  },
  {
    category: "Portfolio CMS",
    permissions: [
      { key: "portfolio.view", label: "View Portfolio Projects" },
      { key: "portfolio.create", label: "Create Projects" },
      { key: "portfolio.edit", label: "Edit Projects" },
      { key: "portfolio.delete", label: "Delete Projects" },
    ],
  },
  {
    category: "Blog CMS",
    permissions: [
      { key: "blogs.view", label: "View Blog Posts" },
      { key: "blogs.create", label: "Create Blog Posts" },
      { key: "blogs.edit", label: "Edit Blog Posts" },
      { key: "blogs.delete", label: "Delete Blog Posts" },
      { key: "blogs.publish", label: "Publish / Unpublish Posts" },
    ],
  },
  {
    category: "Testimonials & FAQs",
    permissions: [
      { key: "testimonials.view", label: "View Testimonials" },
      { key: "testimonials.create", label: "Add Testimonials" },
      { key: "testimonials.edit", label: "Edit Testimonials" },
      { key: "testimonials.delete", label: "Delete Testimonials" },
      { key: "faqs.view", label: "View FAQs" },
      { key: "faqs.create", label: "Create FAQs" },
      { key: "faqs.edit", label: "Edit FAQs" },
      { key: "faqs.delete", label: "Delete FAQs" },
    ],
  },
  {
    category: "Team Members",
    permissions: [
      { key: "team.view", label: "View Team Members" },
      { key: "team.create", label: "Add Team Members" },
      { key: "team.edit", label: "Edit Team Members" },
      { key: "team.delete", label: "Delete Team Members" },
    ],
  },
  {
    category: "Landing Pages & Builder",
    permissions: [
      { key: "landing_pages.view", label: "View Landing Pages" },
      { key: "landing_pages.create", label: "Create / Duplicate Pages" },
      { key: "landing_pages.edit", label: "Edit Landing Pages" },
      { key: "landing_pages.delete", label: "Delete Landing Pages" },
      { key: "landing_pages.publish", label: "Publish Landing Pages" },
    ],
  },
  {
    category: "Forms & Submissions",
    permissions: [
      { key: "forms.view", label: "View Form Definitions" },
      { key: "forms.create", label: "Create Custom Forms" },
      { key: "forms.edit", label: "Edit Forms" },
      { key: "forms.delete", label: "Delete Forms" },
      { key: "forms.submissions.view", label: "View Form Submissions" },
      { key: "forms.submissions.export", label: "Export Form Submissions CSV" },
    ],
  },
  {
    category: "Leads & Subscribers",
    permissions: [
      { key: "leads.view", label: "View CRM Leads" },
      { key: "leads.create", label: "Create Manual Leads" },
      { key: "leads.edit", label: "Edit / Update Lead Status" },
      { key: "leads.delete", label: "Delete Leads" },
      { key: "leads.export", label: "Export Leads CSV" },
      { key: "subscribers.view", label: "View Subscribers" },
      { key: "subscribers.delete", label: "Remove Subscribers" },
      { key: "subscribers.export", label: "Export Subscribers CSV" },
    ],
  },
  {
    category: "Media Library",
    permissions: [
      { key: "media.view", label: "View Media Assets" },
      { key: "media.upload", label: "Upload Images / Files" },
      { key: "media.delete", label: "Delete Media Assets" },
    ],
  },
  {
    category: "SEO & Redirects",
    permissions: [
      { key: "seo.view", label: "View SEO Settings" },
      { key: "seo.edit", label: "Modify SEO & Robots" },
      { key: "redirects.view", label: "View 301 Redirects" },
      { key: "redirects.create", label: "Create Redirect Rules" },
      { key: "redirects.edit", label: "Edit Redirect Rules" },
      { key: "redirects.delete", label: "Delete Redirect Rules" },
    ],
  },
  {
    category: "Marketing & Offers",
    permissions: [
      { key: "offers.view", label: "View Popups & Offers" },
      { key: "offers.create", label: "Create Promotional Popups" },
      { key: "offers.edit", label: "Edit Offers & Triggers" },
      { key: "offers.delete", label: "Delete Offers" },
    ],
  },
  {
    category: "Analytics & Reports",
    permissions: [
      { key: "analytics.view", label: "View Traffic & Conversion Analytics" },
      { key: "analytics.export", label: "Export Analytics Data" },
    ],
  },
  {
    category: "Global Settings",
    permissions: [
      { key: "settings.view", label: "View Brand / Global Settings" },
      { key: "settings.edit", label: "Update Global Settings" },
    ],
  },
  {
    category: "User & Role Administration",
    permissions: [
      { key: "users.view", label: "View Team Users" },
      { key: "users.create", label: "Invite / Add Users" },
      { key: "users.edit", label: "Edit User Roles & Status" },
      { key: "users.delete", label: "Delete Users" },
      { key: "roles.view", label: "View Roles & Permissions" },
      { key: "roles.create", label: "Create Custom Roles" },
      { key: "roles.edit", label: "Edit Custom Roles" },
      { key: "roles.delete", label: "Delete Custom Roles" },
    ],
  },
  {
    category: "Activity & Audit Logs",
    permissions: [
      { key: "audit_logs.view", label: "View Operational & Security Logs" },
      { key: "audit_logs.export", label: "Export Audit Log Reports" },
    ],
  },
  {
    category: "Content Revisions & Snapshots",
    permissions: [
      { key: "revisions.view", label: "View Version History & Diffs" },
      { key: "revisions.restore", label: "Restore Historical Content Versions" },
    ],
  },
  {
    category: "Backup & Data Safeguards",
    permissions: [
      { key: "backup.view", label: "View System Backup & Storage Health" },
      { key: "backup.export", label: "Export Structured Database Bundles" },
    ],
  },
];

/**
 * Checks whether a user session has a specific permission.
 */
export function hasPermission(
  user: AdminUserSession | null | undefined,
  permission: Permission
): boolean {
  if (!user) return false;
  if (user.role === "super_admin") return true;
  if (!user.permissions || !Array.isArray(user.permissions)) return false;
  return user.permissions.includes(permission);
}

/**
 * Checks whether a user session has at least one of the provided permissions.
 */
export function hasAnyPermission(
  user: AdminUserSession | null | undefined,
  permissions: Permission[]
): boolean {
  if (!user) return false;
  if (user.role === "super_admin") return true;
  if (!user.permissions || !Array.isArray(user.permissions)) return false;
  return permissions.some((p) => user.permissions.includes(p));
}

/**
 * Checks whether a user session has all of the provided permissions.
 */
export function hasAllPermissions(
  user: AdminUserSession | null | undefined,
  permissions: Permission[]
): boolean {
  if (!user) return false;
  if (user.role === "super_admin") return true;
  if (!user.permissions || !Array.isArray(user.permissions)) return false;
  return permissions.every((p) => user.permissions.includes(p));
}
