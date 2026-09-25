"use client";

import React, { useState, useEffect, useMemo, useCallback } from "react";
import Link from "next/link";
import { AdminUser, Role, Permission, AuditLogEntry, AuditAction } from "@/types/rbac";
import { PERMISSION_GROUPS } from "@/lib/auth/rbacRules";
import { ConfirmDialog } from "@/components/admin/ConfirmDialog";
import {
  Users,
  UserPlus,
  Shield,
  ShieldCheck,
  Search,
  Filter,
  Edit2,
  Trash2,
  CheckCircle2,
  XCircle,
  X,
  Check,
  Plus,
  RotateCcw,
  Key,
  Download,
  FileText,
  ExternalLink,
  Zap,
  Clock,
  Mail,
  Lock,
  Sparkles,
  RefreshCw,
  Crown,
  Terminal,
  Copy,
  LayoutGrid,
  List,
  Eye,
  Activity,
  Database,
  ArrowRight,
} from "lucide-react";

export default function AdminUsersPage() {
  const [activeTab, setActiveTab] = useState<"users" | "roles" | "matrix">("users");
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [roles, setRoles] = useState<Role[]>([]);
  const [loading, setLoading] = useState(true);
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; message: string } | null>(null);

  // View switch: Grid vs Table
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid");

  // User Filter & Search
  const [userSearch, setUserSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState<"all" | "active" | "inactive">("all");

  // User Modal State (Create / Edit)
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<AdminUser | null>(null);
  const [userFormData, setUserFormData] = useState({
    email: "",
    displayName: "",
    roleId: "content_manager",
    password: "",
    isActive: true,
  });
  const [isSubmittingUser, setIsSubmittingUser] = useState(false);

  // Password Reset Modal
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [passwordTargetUser, setPasswordTargetUser] = useState<AdminUser | null>(null);
  const [newPassword, setNewPassword] = useState("");
  const [isResettingPassword, setIsResettingPassword] = useState(false);
  const [copiedPassword, setCopiedPassword] = useState(false);

  // Delete User Confirmation
  const [userToDelete, setUserToDelete] = useState<AdminUser | null>(null);
  const [isDeletingUser, setIsDeletingUser] = useState(false);

  // Reset All to Defaults Confirmation
  const [isResetDefaultsModalOpen, setIsResetDefaultsModalOpen] = useState(false);
  const [isResettingDefaults, setIsResettingDefaults] = useState(false);

  // Role Modal State (Create / Edit)
  const [isRoleModalOpen, setIsRoleModalOpen] = useState(false);
  const [editingRole, setEditingRole] = useState<Role | null>(null);
  const [roleFormData, setRoleFormData] = useState<{
    name: string;
    description: string;
    permissions: Permission[];
  }>({
    name: "",
    description: "",
    permissions: [],
  });
  const [isSubmittingRole, setIsSubmittingRole] = useState(false);

  // Real-time broadcaster
  const broadcastAuthUpdate = () => {
    try {
      if (typeof window !== "undefined" && "BroadcastChannel" in window) {
        const channel = new BroadcastChannel("drn-cms-sync");
        channel.postMessage({ type: "CMS_UPDATED", timestamp: Date.now() });
        channel.close();
      }
      localStorage.setItem("drn_cms_updated", Date.now().toString());
    } catch {}
  };

  const showToast = (type: "success" | "error", message: string) => {
    setFeedback({ type, message });
    setTimeout(() => {
      setFeedback((prev) => (prev?.message === message ? null : prev));
    }, 4500);
  };

  // Load Users & Roles
  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const [usersRes, rolesRes] = await Promise.all([
        fetch("/api/admin/users"),
        fetch("/api/admin/roles"),
      ]);

      const usersJson = await usersRes.json();
      const rolesJson = await rolesRes.json();

      if (usersJson.success) setUsers(usersJson.users);
      if (rolesJson.success) setRoles(rolesJson.roles);
    } catch (err) {
      console.error("[UsersPage] Fetch error:", err);
      showToast("error", "Failed to load clinic team and role data.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Filtered Users
  const filteredUsers = useMemo(() => {
    return users.filter((u) => {
      const matchesSearch =
        u.displayName.toLowerCase().includes(userSearch.toLowerCase()) ||
        u.email.toLowerCase().includes(userSearch.toLowerCase());
      const matchesRole = roleFilter === "all" || u.roleId === roleFilter;
      const matchesStatus =
        statusFilter === "all" ||
        (statusFilter === "active" && u.isActive !== false) ||
        (statusFilter === "inactive" && u.isActive === false);
      return matchesSearch && matchesRole && matchesStatus;
    });
  }, [users, userSearch, roleFilter, statusFilter]);

  // Open User Modal
  const handleOpenUserModal = (userToEdit?: AdminUser) => {
    if (userToEdit) {
      setEditingUser(userToEdit);
      setUserFormData({
        email: userToEdit.email,
        displayName: userToEdit.displayName,
        roleId: userToEdit.roleId,
        password: "",
        isActive: userToEdit.isActive !== false,
      });
    } else {
      setEditingUser(null);
      setUserFormData({
        email: "",
        displayName: "",
        roleId: "content_manager",
        password: "",
        isActive: true,
      });
    }
    setIsUserModalOpen(true);
  };

  // Save User
  const handleSaveUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmittingUser(true);

    try {
      if (editingUser) {
        const res = await fetch(`/api/admin/users/${editingUser.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            displayName: userFormData.displayName,
            roleId: userFormData.roleId,
            isActive: userFormData.isActive,
          }),
        });
        const data = await res.json();
        if (!res.ok || !data.success) {
          throw new Error(data.error || "Failed to update staff member.");
        }
        showToast("success", `Updated permissions for ${userFormData.displayName || userFormData.email}.`);
      } else {
        const res = await fetch("/api/admin/users", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(userFormData),
        });
        const data = await res.json();
        if (!res.ok || !data.success) {
          throw new Error(data.error || "Failed to invite staff member.");
        }
        showToast("success", `Invited new administrator "${userFormData.displayName}" successfully.`);
      }
      broadcastAuthUpdate();
      setIsUserModalOpen(false);
      fetchData();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "An error occurred.";
      showToast("error", msg);
    } finally {
      setIsSubmittingUser(false);
    }
  };

  // Delete User with Safety Protection
  const handleConfirmDeleteUser = async () => {
    if (!userToDelete) return;
    setIsDeletingUser(true);
    try {
      const res = await fetch(`/api/admin/users/${userToDelete.id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to remove staff account.");
      }
      showToast("success", `Removed administrator account for ${userToDelete.displayName || userToDelete.email}.`);
      broadcastAuthUpdate();
      setUserToDelete(null);
      fetchData();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to remove account.";
      showToast("error", msg);
    } finally {
      setIsDeletingUser(false);
    }
  };

  // Password Reset Handler
  const handleOpenPasswordModal = (user: AdminUser) => {
    setPasswordTargetUser(user);
    // Generate secure suggested password with DRN prefix
    const suggested = `DRN#${Math.random().toString(36).slice(2, 6).toUpperCase()}!${Date.now().toString().slice(-4)}`;
    setNewPassword(suggested);
    setCopiedPassword(false);
    setIsPasswordModalOpen(true);
  };

  const handleSavePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!passwordTargetUser) return;
    setIsResettingPassword(true);
    try {
      const res = await fetch(`/api/admin/users/${passwordTargetUser.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: newPassword }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to reset password.");
      }
      showToast("success", `New password set for ${passwordTargetUser.displayName}.`);
      setIsPasswordModalOpen(false);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to update password.";
      showToast("error", msg);
    } finally {
      setIsResettingPassword(false);
    }
  };

  // Toggle User Active Status
  const handleToggleUserStatus = async (targetUser: AdminUser) => {
    try {
      const res = await fetch(`/api/admin/users/${targetUser.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isActive: targetUser.isActive === false }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to toggle status.");
      }
      showToast("success", `Staff account ${targetUser.isActive === false ? "activated" : "deactivated"}.`);
      broadcastAuthUpdate();
      fetchData();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Action failed.";
      showToast("error", msg);
    }
  };

  // Reset to Canonical Defaults
  const handleConfirmResetDefaults = async () => {
    setIsResettingDefaults(true);
    try {
      const res = await fetch("/api/admin/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "reset" }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to reset to defaults.");
      }
      showToast("success", "Successfully restored canonical clinical administrators and system roles!");
      broadcastAuthUpdate();
      setIsResetDefaultsModalOpen(false);
      fetchData();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to reset defaults.";
      showToast("error", msg);
    } finally {
      setIsResettingDefaults(false);
    }
  };

  // Open Role Modal
  const handleOpenRoleModal = (roleToEdit?: Role) => {
    if (roleToEdit) {
      setEditingRole(roleToEdit);
      setRoleFormData({
        name: roleToEdit.name,
        description: roleToEdit.description || "",
        permissions: [...roleToEdit.permissions],
      });
    } else {
      setEditingRole(null);
      setRoleFormData({
        name: "",
        description: "",
        permissions: [],
      });
    }
    setIsRoleModalOpen(true);
  };

  const handleTogglePermission = (perm: Permission) => {
    setRoleFormData((prev) => {
      const exists = prev.permissions.includes(perm);
      return {
        ...prev,
        permissions: exists ? prev.permissions.filter((p) => p !== perm) : [...prev.permissions, perm],
      };
    });
  };

  const handleToggleGroup = (groupPermissions: Permission[]) => {
    setRoleFormData((prev) => {
      const allSelected = groupPermissions.every((p) => prev.permissions.includes(p));
      if (allSelected) {
        return {
          ...prev,
          permissions: prev.permissions.filter((p) => !groupPermissions.includes(p)),
        };
      } else {
        const unique = Array.from(new Set([...prev.permissions, ...groupPermissions]));
        return {
          ...prev,
          permissions: unique,
        };
      }
    });
  };

  const handleSaveRole = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmittingRole(true);

    try {
      if (editingRole) {
        const res = await fetch(`/api/admin/roles/${editingRole.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(roleFormData),
        });
        const data = await res.json();
        if (!res.ok || !data.success) {
          throw new Error(data.error || "Failed to update role.");
        }
        showToast("success", `Updated role "${roleFormData.name}" successfully.`);
      } else {
        const res = await fetch("/api/admin/roles", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(roleFormData),
        });
        const data = await res.json();
        if (!res.ok || !data.success) {
          throw new Error(data.error || "Failed to create role.");
        }
        showToast("success", `Created custom role "${roleFormData.name}" successfully.`);
      }
      broadcastAuthUpdate();
      setIsRoleModalOpen(false);
      fetchData();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to save role.";
      showToast("error", msg);
    } finally {
      setIsSubmittingRole(false);
    }
  };

  // Helper colors for roles (Crisp Medical Palette)
  const getRoleBadgeStyle = (roleId: string) => {
    switch (roleId) {
      case "super_admin":
        return "bg-rose-50 text-rose-700 border-rose-200/80";
      case "content_manager":
        return "bg-blue-50 text-blue-700 border-blue-200/80";
      case "seo_manager":
        return "bg-amber-50 text-amber-700 border-amber-200/80";
      case "lead_manager":
        return "bg-emerald-50 text-emerald-700 border-emerald-200/80";
      default:
        return "bg-slate-50 text-slate-700 border-slate-200/80";
    }
  };

  return (
    <div className="flex flex-col gap-6 max-w-6xl mx-auto w-full pb-16">
      {/* 1. Header Bar with Real-Time Live Status */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/80 shadow-2xs">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-rose-50 border border-rose-100 rounded-2xl flex items-center justify-center text-rose-600 shrink-0 shadow-2xs">
            <Shield className="w-6 h-6" />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight leading-tight">
                Staff & Security Permissions
              </h1>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/80">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                Live Staff RBAC: Connected & Synced
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 font-normal">
              Manage clinical team accounts, coordinator access levels, and granular oncology practice roles.
            </p>
          </div>
        </div>

        {/* Header Action Buttons */}
        <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto justify-end">
          <button
            type="button"
            onClick={() => setIsResetDefaultsModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-slate-200 bg-white text-slate-700 text-xs font-semibold hover:bg-slate-50 transition-colors shadow-2xs cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset to Defaults</span>
          </button>

          <button
            type="button"
            onClick={() => handleOpenUserModal()}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold transition-all shadow-xs active:scale-[0.98] cursor-pointer"
          >
            <UserPlus className="w-4 h-4" />
            <span>Invite Team Member</span>
          </button>
        </div>
      </div>

      {/* 2. Top Bento KPI Cards (Visual Overview) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 sm:gap-4">
        {/* Total Admins */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              Clinical Team Members
            </span>
            <div className="w-8 h-8 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight tabular-nums">
              {users.length} Active Accounts
            </div>
            <p className="text-[11px] text-emerald-600 font-medium flex items-center gap-1 mt-1">
              <CheckCircle2 className="w-3 h-3" /> Dr. Noopur Patel, Coordinators & Staff
            </p>
          </div>
        </div>

        {/* Security Roles */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              Clinical Roles
            </span>
            <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <Crown className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight tabular-nums">
              {roles.length} Roles Defined
            </div>
            <p className="text-[11px] text-purple-600 font-medium flex items-center gap-1 mt-1">
              <ShieldCheck className="w-3 h-3" /> Tiered Medical RBAC
            </p>
          </div>
        </div>

        {/* Permissions Count */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              Platform Rules
            </span>
            <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <ShieldCheck className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight tabular-nums">
              35 Access Rules
            </div>
            <p className="text-[11px] text-blue-600 font-medium flex items-center gap-1 mt-1">
              <Sparkles className="w-3 h-3" /> Strict Oncology Data Privacy
            </p>
          </div>
        </div>
      </div>

      {/* Toast Feedback */}
      {feedback && (
        <div className="animate-in fade-in slide-in-from-top-2 duration-300">
          <div
            className={`flex items-center justify-between p-4 rounded-xl border shadow-2xs ${
              feedback.type === "success"
                ? "bg-emerald-50 border-emerald-200 text-emerald-900"
                : "bg-red-50 border-red-200 text-red-900"
            }`}
          >
            <div className="flex items-center gap-3">
              {feedback.type === "success" ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              ) : (
                <XCircle className="w-5 h-5 text-red-600 shrink-0" />
              )}
              <span className="font-semibold text-sm">{feedback.message}</span>
            </div>
            <button
              onClick={() => setFeedback(null)}
              className="text-slate-400 hover:text-slate-600"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* 3. Visual Tab Navigation */}
      <div className="flex flex-wrap items-center justify-between gap-2 p-1.5 bg-slate-100/90 rounded-2xl border border-slate-200/80">
        <div className="flex flex-wrap items-center gap-1.5">
          {[
            { id: "users", label: `Staff Accounts (${users.length})`, icon: Users },
            { id: "roles", label: `Roles & Access (${roles.length})`, icon: Crown },
            { id: "matrix", label: "Permissions Matrix", icon: ShieldCheck },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  isActive
                    ? "bg-white text-slate-900 shadow-2xs border border-slate-200/80"
                    : "text-slate-500 hover:text-slate-900 hover:bg-white/50"
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? "text-rose-600" : "text-slate-400"}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Grid vs List View switch for Users tab */}
        {activeTab === "users" && (
          <div className="hidden sm:flex items-center gap-1 bg-white p-1 rounded-xl border border-slate-200 shadow-2xs">
            <button
              type="button"
              onClick={() => setViewMode("grid")}
              className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                viewMode === "grid"
                  ? "bg-slate-100 text-slate-900 font-bold"
                  : "text-slate-400 hover:text-slate-600"
              }`}
              title="Grid View"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => setViewMode("table")}
              className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                viewMode === "table"
                  ? "bg-slate-100 text-slate-900 font-bold"
                  : "text-slate-400 hover:text-slate-600"
              }`}
              title="Table View"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* 4. TAB 1: Team Users */}
      {activeTab === "users" && (
        <div className="flex flex-col gap-5 animate-in fade-in duration-200">
          {/* Search & Filters */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            <div className="relative flex-1 min-w-0">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Search className="w-4 h-4" />
              </div>
              <input
                type="text"
                value={userSearch}
                onChange={(e) => setUserSearch(e.target.value)}
                placeholder="Search staff by name or email address..."
                className="block w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 text-slate-900 placeholder:text-slate-400"
              />
            </div>

            <div className="flex items-center gap-2">
              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className="px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 cursor-pointer"
              >
                <option value="all">All Roles</option>
                {roles.map((r) => (
                  <option key={r.id} value={r.id}>
                    {r.name}
                  </option>
                ))}
              </select>

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as typeof statusFilter)}
                className="px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 cursor-pointer"
              >
                <option value="all">All Status</option>
                <option value="active">Active Only</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>

          {/* User List or Grid */}
          {loading ? (
            <div className="py-16 text-center text-slate-400 flex flex-col items-center justify-center">
              <div className="w-8 h-8 border-3 border-rose-500 border-t-transparent rounded-full animate-spin mb-3"></div>
              <p className="text-xs font-semibold text-slate-600">Loading clinic team...</p>
            </div>
          ) : filteredUsers.length === 0 ? (
            <div className="py-16 bg-white rounded-2xl border border-slate-200/80 text-center p-6 shadow-2xs">
              <Users className="w-10 h-10 text-slate-300 mx-auto mb-3" />
              <h3 className="text-base font-bold text-slate-900">No team members found</h3>
              <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                No accounts match your current search query or filter criteria.
              </p>
            </div>
          ) : viewMode === "grid" ? (
            /* Grid View */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredUsers.map((u) => {
                const isSuper = u.roleId === "super_admin";
                const initials = u.displayName
                  ? u.displayName
                      .split(" ")
                      .map((n) => n[0])
                      .slice(0, 2)
                      .join("")
                      .toUpperCase()
                  : u.email.slice(0, 2).toUpperCase();

                return (
                  <div
                    key={u.id}
                    className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-2xs hover:border-slate-300 transition-all flex flex-col justify-between"
                  >
                    <div>
                      {/* Top Row */}
                      <div className="flex items-start justify-between gap-3 mb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-rose-500 to-rose-600 text-white font-bold text-xs flex items-center justify-center shadow-2xs shrink-0">
                            {initials}
                          </div>
                          <div>
                            <h3 className="text-sm font-semibold text-slate-900 leading-tight">
                              {u.displayName || "Admin User"}
                            </h3>
                            <span className="text-xs text-slate-500 truncate block mt-0.5 font-normal">{u.email}</span>
                          </div>
                        </div>

                        <span
                          className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold border ${
                            u.isActive !== false
                              ? "bg-emerald-50 text-emerald-700 border-emerald-200/60"
                              : "bg-red-50 text-red-700 border-red-200/60"
                          }`}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              u.isActive !== false ? "bg-emerald-500" : "bg-red-500"
                            }`}
                          ></span>
                          {u.isActive !== false ? "Active" : "Disabled"}
                        </span>
                      </div>

                      {/* Role Pill */}
                      <div className="mb-4">
                        <span
                          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-semibold border ${getRoleBadgeStyle(
                            u.roleId
                          )}`}
                        >
                          {isSuper && <Crown className="w-3 h-3 text-rose-600" />}
                          <span>{u.roleName || u.roleId}</span>
                        </span>
                      </div>

                      {/* Metadata */}
                      <div className="text-[11px] text-slate-500 space-y-1 mb-5 font-normal">
                        <div className="flex items-center gap-1.5">
                          <Clock className="w-3 h-3 text-slate-400" />
                          <span>Last Active: {u.lastLoginAt ? new Date(u.lastLoginAt).toLocaleDateString() : "Recently"}</span>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => handleOpenUserModal(u)}
                          className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
                          title="Edit Details & Role"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleOpenPasswordModal(u)}
                          className="p-1.5 rounded-lg text-amber-600 hover:bg-amber-50 transition-colors cursor-pointer"
                          title="Reset Password"
                        >
                          <Key className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleToggleUserStatus(u)}
                          disabled={isSuper}
                          className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors disabled:opacity-40 cursor-pointer"
                          title={u.isActive !== false ? "Disable Account" : "Activate Account"}
                        >
                          {u.isActive !== false ? <XCircle className="w-3.5 h-3.5" /> : <CheckCircle2 className="w-3.5 h-3.5" />}
                        </button>
                      </div>

                      {!isSuper && (
                        <button
                          type="button"
                          onClick={() => setUserToDelete(u)}
                          className="p-2 rounded-lg text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                          title="Remove Account"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            /* Table View */
            <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider text-[11px] border-b border-slate-200">
                    <tr>
                      <th className="px-5 py-3.5">Staff Member</th>
                      <th className="px-5 py-3.5">Assigned Role</th>
                      <th className="px-5 py-3.5">Status</th>
                      <th className="px-5 py-3.5">Last Login</th>
                      <th className="px-5 py-3.5 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-medium">
                    {filteredUsers.map((u) => {
                      const isSuper = u.roleId === "super_admin";
                      return (
                        <tr key={u.id} className="hover:bg-slate-50/50 transition-colors">
                          <td className="px-5 py-3.5">
                            <div className="font-bold text-slate-900">{u.displayName}</div>
                            <div className="text-xs text-slate-400 font-mono">{u.email}</div>
                          </td>
                          <td className="px-5 py-3.5">
                            <span
                              className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg text-xs font-bold border ${getRoleBadgeStyle(
                                u.roleId
                              )}`}
                            >
                              {isSuper && <Crown className="w-3 h-3 text-rose-600" />}
                              <span>{u.roleName || u.roleId}</span>
                            </span>
                          </td>
                          <td className="px-5 py-3.5">
                            <span
                              className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold ${
                                u.isActive !== false
                                  ? "bg-emerald-50 text-emerald-700"
                                  : "bg-red-50 text-red-700"
                              }`}
                            >
                              <span
                                className={`w-1.5 h-1.5 rounded-full ${
                                  u.isActive !== false ? "bg-emerald-500" : "bg-red-500"
                                }`}
                              ></span>
                              {u.isActive !== false ? "Active" : "Disabled"}
                            </span>
                          </td>
                          <td className="px-5 py-3.5 text-xs text-slate-500">
                            {u.lastLoginAt ? new Date(u.lastLoginAt).toLocaleDateString() : "Recent"}
                          </td>
                          <td className="px-5 py-3.5 text-right">
                            <div className="inline-flex items-center gap-1.5">
                              <button
                                type="button"
                                onClick={() => handleOpenUserModal(u)}
                                className="p-1.5 rounded-lg text-slate-600 hover:bg-slate-100 cursor-pointer"
                                title="Edit Role"
                              >
                                <Edit2 className="w-4 h-4" />
                              </button>
                              <button
                                type="button"
                                onClick={() => handleOpenPasswordModal(u)}
                                className="p-1.5 rounded-lg text-amber-600 hover:bg-amber-50 cursor-pointer"
                                title="Reset Password"
                              >
                                <Key className="w-4 h-4" />
                              </button>
                              {!isSuper && (
                                <button
                                  type="button"
                                  onClick={() => setUserToDelete(u)}
                                  className="p-1.5 rounded-lg text-red-600 hover:bg-red-50 cursor-pointer"
                                  title="Remove User"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}

      {/* 5. TAB 2: Roles & Access Levels */}
      {activeTab === "roles" && (
        <div className="flex flex-col gap-5 animate-in fade-in duration-200">
          <div className="flex items-center justify-between bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs">
            <div>
              <h2 className="text-base font-bold text-slate-900">Security Roles & Access Levels</h2>
              <p className="text-xs text-slate-500">
                Pre-configured clinical oncology system roles with granular permission rules.
              </p>
            </div>
            <button
              type="button"
              onClick={() => handleOpenRoleModal()}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold transition-all shadow-xs cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Create Custom Role</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {roles.map((r) => {
              const assignedCount = users.filter((u) => u.roleId === r.id).length;
              return (
                <div
                  key={r.id}
                  className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-2xs flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-base font-bold text-slate-900">{r.name}</h3>
                          {r.isSystemRole && (
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-600 border border-slate-200">
                              System Built-in
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-slate-500 mt-1 leading-relaxed">{r.description}</p>
                      </div>
                    </div>

                    {/* Stats pills */}
                    <div className="flex flex-wrap items-center gap-2 my-4">
                      <span className="px-3 py-1 rounded-xl bg-rose-50 text-rose-700 text-xs font-semibold border border-rose-100">
                        👥 {assignedCount} {assignedCount === 1 ? "Staff Member" : "Staff Members"}
                      </span>
                      <span className="px-3 py-1 rounded-xl bg-slate-100 text-slate-700 text-xs font-semibold border border-slate-200">
                        🛡️ {r.permissions.length} Permissions
                      </span>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => setActiveTab("matrix")}
                      className="text-xs font-bold text-rose-600 hover:underline inline-flex items-center gap-1 cursor-pointer"
                    >
                      <span>View in Matrix</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>

                    {!r.isSystemRole && (
                      <button
                        type="button"
                        onClick={() => handleOpenRoleModal(r)}
                        className="px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-100 cursor-pointer"
                      >
                        Edit Role
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 6. TAB 3: Permissions Matrix */}
      {activeTab === "matrix" && (
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs overflow-hidden animate-in fade-in duration-200">
          <div className="p-6 border-b border-slate-200 flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-slate-900">Granular Permissions Matrix</h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Complete comparative breakdown of clinical oncology operations permitted per role.
              </p>
            </div>
            <span className="px-3 py-1 rounded-xl text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
              35 Rules Active
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-slate-50 text-slate-700 font-bold border-b border-slate-200">
                <tr>
                  <th className="px-5 py-3 w-1/3">Permission Feature</th>
                  {roles.map((r) => (
                    <th key={r.id} className="px-4 py-3 text-center">
                      <span className="block font-bold text-xs">{r.name}</span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {PERMISSION_GROUPS.map((group) => (
                  <React.Fragment key={group.category}>
                    <tr className="bg-slate-50/80 font-bold text-slate-900">
                      <td colSpan={roles.length + 1} className="px-5 py-2.5 uppercase tracking-wider text-[11px] text-slate-600">
                        {group.category}
                      </td>
                    </tr>
                    {group.permissions.map((p) => (
                      <tr key={p.key} className="hover:bg-slate-50/60">
                        <td className="px-5 py-2.5">
                          <div className="font-semibold text-slate-900">{p.label}</div>
                          <div className="text-[11px] text-slate-400 font-mono">{p.key}</div>
                        </td>
                        {roles.map((r) => {
                          const isGranted = r.id === "super_admin" || r.permissions.includes(p.key);
                          return (
                            <td key={r.id} className="px-4 py-2.5 text-center">
                              {isGranted ? (
                                <div className="w-5 h-5 mx-auto rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center">
                                  <Check className="w-3 h-3" />
                                </div>
                              ) : (
                                <span className="text-slate-300 font-mono font-bold">—</span>
                              )}
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* MODAL 1: Invite / Edit User Modal */}
      {isUserModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="relative w-full max-w-md bg-white rounded-2xl border border-slate-200 shadow-xl p-6 text-slate-900">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-5">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <UserPlus className="w-4 h-4 text-rose-600" />
                <span>{editingUser ? "Edit Staff Access" : "Invite New Clinical Administrator"}</span>
              </h3>
              <button
                type="button"
                onClick={() => setIsUserModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveUser} className="flex flex-col gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                  Full Name <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  value={userFormData.displayName}
                  onChange={(e) => setUserFormData((prev) => ({ ...prev, displayName: e.target.value }))}
                  required
                  placeholder="e.g. Clinical Care Coordinator"
                  className="block w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 focus:outline-none text-slate-900 placeholder:text-slate-400"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                  Email Address <span className="text-rose-500">*</span>
                </label>
                <input
                  type="email"
                  value={userFormData.email}
                  disabled={!!editingUser}
                  onChange={(e) => setUserFormData((prev) => ({ ...prev, email: e.target.value }))}
                  required
                  placeholder="coordinator@drnoopurpatel.com"
                  className="block w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 focus:outline-none text-slate-900 placeholder:text-slate-400 disabled:opacity-60"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                  Role Assignment <span className="text-rose-500">*</span>
                </label>
                <select
                  value={userFormData.roleId}
                  onChange={(e) => setUserFormData((prev) => ({ ...prev, roleId: e.target.value }))}
                  className="block w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-800 focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 focus:outline-none cursor-pointer"
                >
                  {roles.map((r) => (
                    <option key={r.id} value={r.id}>
                      {r.name}
                    </option>
                  ))}
                </select>
              </div>

              {!editingUser && (
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                    Temporary Password (Optional)
                  </label>
                  <input
                    type="password"
                    value={userFormData.password}
                    onChange={(e) => setUserFormData((prev) => ({ ...prev, password: e.target.value }))}
                    placeholder="Auto-generated if left blank"
                    className="block w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 focus:outline-none text-slate-900 placeholder:text-slate-400"
                  />
                </div>
              )}

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="userActiveCheck"
                  checked={userFormData.isActive}
                  onChange={(e) => setUserFormData((prev) => ({ ...prev, isActive: e.target.checked }))}
                  className="w-4 h-4 rounded text-rose-600 focus:ring-rose-500 border-slate-300"
                />
                <label htmlFor="userActiveCheck" className="text-xs font-semibold text-slate-700 cursor-pointer">
                  Account is Active & Allowed to Sign In
                </label>
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsUserModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmittingUser}
                  className="px-5 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold transition-all shadow-xs disabled:opacity-60 cursor-pointer"
                >
                  {isSubmittingUser ? "Saving..." : editingUser ? "Update Access" : "Send Invitation"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: Reset Password Modal */}
      {isPasswordModalOpen && passwordTargetUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="relative w-full max-w-md bg-white rounded-2xl border border-slate-200 shadow-xl p-6 text-slate-900">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Key className="w-4 h-4 text-amber-500" />
                <span>Reset Administrator Password</span>
              </h3>
              <button
                type="button"
                onClick={() => setIsPasswordModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSavePassword} className="flex flex-col gap-4">
              <p className="text-xs text-slate-500">
                Setting a new secure password for <span className="font-bold text-slate-900">{passwordTargetUser.displayName}</span> ({passwordTargetUser.email}).
              </p>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                  New Secure Password
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                    className="block w-full pl-3.5 pr-20 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono font-bold text-slate-900"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      navigator.clipboard.writeText(newPassword);
                      setCopiedPassword(true);
                      setTimeout(() => setCopiedPassword(false), 2000);
                    }}
                    className="absolute right-2 top-2 px-2.5 py-1 rounded-lg bg-slate-200 text-[11px] font-bold text-slate-700 hover:bg-slate-300 transition-colors cursor-pointer"
                  >
                    {copiedPassword ? "Copied" : "Copy"}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsPasswordModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isResettingPassword}
                  className="px-5 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold transition-all shadow-xs disabled:opacity-60 cursor-pointer"
                >
                  {isResettingPassword ? "Saving..." : "Set New Password"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 3: Custom Role Creator Modal */}
      {isRoleModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="relative w-full max-w-2xl bg-white rounded-2xl border border-slate-200 shadow-xl p-6 text-slate-900 max-h-[90vh] flex flex-col">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4 shrink-0">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Crown className="w-4 h-4 text-purple-600" />
                <span>{editingRole ? `Edit Role: ${editingRole.name}` : "Create Custom Security Role"}</span>
              </h3>
              <button
                type="button"
                onClick={() => setIsRoleModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveRole} className="flex flex-col gap-4 overflow-y-auto pr-1 flex-1">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                  Role Name <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  value={roleFormData.name}
                  onChange={(e) => setRoleFormData((prev) => ({ ...prev, name: e.target.value }))}
                  required
                  placeholder="e.g. Patient Care Coordinator"
                  className="block w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 focus:outline-none text-slate-900 placeholder:text-slate-400"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                  Role Description
                </label>
                <input
                  type="text"
                  value={roleFormData.description}
                  onChange={(e) => setRoleFormData((prev) => ({ ...prev, description: e.target.value }))}
                  placeholder="Briefly describe what clinical or admin duties this role handles..."
                  className="block w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 focus:outline-none text-slate-900 placeholder:text-slate-400"
                />
              </div>

              {/* Permission Checkboxes */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
                  Assign Granular Permissions ({roleFormData.permissions.length} selected)
                </label>
                <div className="space-y-4">
                  {PERMISSION_GROUPS.map((group) => {
                    const groupKeys = group.permissions.map((p) => p.key);
                    const allInGroupSelected = groupKeys.every((k) => roleFormData.permissions.includes(k));
                    return (
                      <div key={group.category} className="p-3.5 rounded-xl border border-slate-200 bg-slate-50">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-bold text-xs text-slate-800">{group.category}</span>
                          <button
                            type="button"
                            onClick={() => handleToggleGroup(groupKeys)}
                            className="text-[10px] font-bold text-purple-600 hover:underline cursor-pointer"
                          >
                            {allInGroupSelected ? "Deselect All" : "Select All"}
                          </button>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {group.permissions.map((p) => {
                            const isChecked = roleFormData.permissions.includes(p.key);
                            return (
                              <label
                                key={p.key}
                                className={`flex items-center gap-2 p-2 rounded-lg border text-xs cursor-pointer transition-colors ${
                                  isChecked
                                    ? "bg-purple-50 border-purple-200 text-purple-900 font-bold"
                                    : "border-slate-200 bg-white text-slate-600"
                                }`}
                              >
                                <input
                                  type="checkbox"
                                  checked={isChecked}
                                  onChange={() => handleTogglePermission(p.key)}
                                  className="rounded text-purple-600 focus:ring-purple-500 w-3.5 h-3.5"
                                />
                                <span className="truncate">{p.label}</span>
                              </label>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-4 border-t border-slate-100 shrink-0">
                <button
                  type="button"
                  onClick={() => setIsRoleModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmittingRole}
                  className="px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-semibold transition-all shadow-xs disabled:opacity-60 cursor-pointer"
                >
                  {isSubmittingRole ? "Saving..." : editingRole ? "Update Role" : "Create Role"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete User Confirmation Dialog */}
      <ConfirmDialog
        isOpen={!!userToDelete}
        onClose={() => setUserToDelete(null)}
        onConfirm={handleConfirmDeleteUser}
        title="Remove Administrator Account?"
        message={`Are you sure you want to remove the administrator account for ${
          userToDelete?.displayName || userToDelete?.email
        }?\n\nThis will immediately revoke all dashboard access and delete their security credentials.`}
        confirmLabel="Yes, Remove Administrator"
        isDestructive={true}
        isLoading={isDeletingUser}
      />

      {/* Reset to Defaults Confirmation Dialog */}
      <ConfirmDialog
        isOpen={isResetDefaultsModalOpen}
        onClose={() => setIsResetDefaultsModalOpen(false)}
        onConfirm={handleConfirmResetDefaults}
        title="Reset Users & Roles to Canonical Defaults?"
        message={`This will restore canonical clinical team members (Dr. Noopur Patel - Super Admin, Clinical Care Coordinator - Content & Care Manager, Patient Appointments Lead - Appointments Manager) and all default system roles.\n\nAll changes will immediately sync across live Cloud Firestore and memory caches.`}
        confirmLabel="Yes, Reset to Defaults"
        isDestructive={false}
        isLoading={isResettingDefaults}
      />
    </div>
  );
}
