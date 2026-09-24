import { getAdminFirestore, FieldValue, type Query } from "@/lib/firebase/admin";
import { COLLECTIONS } from "@/config/firebase";
import {
  AuditLogEntry,
  CreateAuditLogInput,
  AuditAction,
  AuditResourceType,
  AuditActor,
} from "@/types/rbac";

// In-memory cache for fast retrieval and local dev fallback
const auditLogsCache: AuditLogEntry[] = [];
const MAX_CACHE_SIZE = 500;

// Sensitive keys that must be stripped from any metadata payload
const SENSITIVE_KEYS = [
  "password",
  "passwordhash",
  "token",
  "accesstoken",
  "refreshtoken",
  "session",
  "sessioncookie",
  "secret",
  "apikey",
  "privatekey",
  "credential",
  "auth",
  "authorization",
  "cookie",
];

/**
 * Recursively sanitizes metadata to ensure no sensitive tokens, credentials, or private keys are ever stored in audit logs.
 */
export function sanitizeAuditMetadata(
  meta?: Record<string, unknown>
): Record<string, unknown> | undefined {
  if (!meta || typeof meta !== "object" || Array.isArray(meta)) return undefined;

  const sanitized: Record<string, unknown> = {};

  for (const [key, value] of Object.entries(meta)) {
    const lowerKey = key.toLowerCase();
    const isSensitive = SENSITIVE_KEYS.some((s) => lowerKey.includes(s));

    if (isSensitive) {
      sanitized[key] = "[REDACTED]";
    } else if (value && typeof value === "object" && !Array.isArray(value)) {
      sanitized[key] = sanitizeAuditMetadata(value as Record<string, unknown>);
    } else if (typeof value === "string" && value.length > 500) {
      sanitized[key] = `${value.substring(0, 500)}... [truncated]`;
    } else {
      sanitized[key] = value;
    }
  }

  return sanitized;
}

/**
 * Centralized method to record an immutable administrative audit log.
 * Guaranteed not to throw and crash the calling mutation.
 */
export async function recordAuditLog(
  input: CreateAuditLogInput
): Promise<AuditLogEntry> {
  const timestamp = new Date().toISOString();
  const id = `log_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
  const sanitizedMeta = sanitizeAuditMetadata(input.metadata);

  const actor: AuditActor = {
    uid: input.actor.uid || "system",
    email: input.actor.email || "system@drnoopurpatel.com",
    displayName: input.actor.displayName || input.actor.email?.split("@")[0] || "System",
    role: input.actor.role || "super_admin",
    roleName: input.actor.roleName || "Super Admin",
  };
  if (input.actor.ipAddress) actor.ipAddress = input.actor.ipAddress;
  if (input.actor.userAgent) actor.userAgent = input.actor.userAgent;

  const entry: AuditLogEntry = {
    id,
    timestamp,
    actor,
    action: input.action,
    resourceType: input.resourceType,
    summary: input.summary,
    status: input.status || "success",
  };
  if (input.resourceId) entry.resourceId = input.resourceId;
  if (input.resourceTitle) entry.resourceTitle = input.resourceTitle;
  if (input.errorMessage) entry.errorMessage = input.errorMessage;
  if (sanitizedMeta) entry.metadata = sanitizedMeta;

  // Add to in-memory cache
  auditLogsCache.unshift(entry);
  if (auditLogsCache.length > MAX_CACHE_SIZE) {
    auditLogsCache.pop();
  }

  // Persist to Firestore if available
  const adminDb = getAdminFirestore();
  if (adminDb) {
    try {
      const firestoreData: Record<string, unknown> = {
        id: entry.id,
        timestamp: entry.timestamp,
        actor: {
          uid: entry.actor.uid,
          email: entry.actor.email,
          displayName: entry.actor.displayName || "System",
          role: entry.actor.role,
          roleName: entry.actor.roleName || "Super Admin",
          ipAddress: entry.actor.ipAddress || null,
          userAgent: entry.actor.userAgent || null,
        },
        action: entry.action,
        resourceType: entry.resourceType,
        resourceId: entry.resourceId || null,
        resourceTitle: entry.resourceTitle || null,
        summary: entry.summary,
        status: entry.status,
        errorMessage: entry.errorMessage || null,
        metadata: entry.metadata || null,
        createdAt: FieldValue.serverTimestamp(),
      };
      await adminDb.collection(COLLECTIONS.AUDIT_LOGS).doc(id).set(firestoreData);
    } catch (err) {
      console.error("[recordAuditLog] Firestore write error:", err);
    }
  }

  return entry;
}

export interface AuditLogQueryParams {
  actorEmail?: string;
  action?: AuditAction | "all";
  resourceType?: AuditResourceType | "all";
  status?: "success" | "failure" | "all";
  search?: string;
  startDate?: string;
  endDate?: string;
  limit?: number;
  offset?: number;
}

export interface AuditLogQueryResult {
  logs: AuditLogEntry[];
  total: number;
  limit: number;
  offset: number;
}

/**
 * Queries audit logs with filtering, full-text search, and pagination.
 */
export async function queryAuditLogs(
  params: AuditLogQueryParams = {}
): Promise<AuditLogQueryResult> {
  const {
    actorEmail,
    action,
    resourceType,
    status,
    search,
    startDate,
    endDate,
    limit = 50,
    offset = 0,
  } = params;

  let allLogs: AuditLogEntry[] = [];

  const adminDb = getAdminFirestore();
  if (adminDb) {
    try {
      let query: Query = adminDb.collection(COLLECTIONS.AUDIT_LOGS);

      // Order by timestamp descending
      query = query.orderBy("timestamp", "desc").limit(300);

      const snapshot = await query.get();
      if (!snapshot.empty) {
        allLogs = snapshot.docs.map((doc: any) => {
          const data = doc.data();
          return {
            id: doc.id,
            timestamp: data.timestamp || new Date().toISOString(),
            actor: data.actor || { uid: "system", email: "system@drnoopurpatel.com", role: "system" },
            action: data.action,
            resourceType: data.resourceType,
            resourceId: data.resourceId,
            resourceTitle: data.resourceTitle,
            summary: data.summary || "",
            status: data.status || "success",
            errorMessage: data.errorMessage,
            metadata: data.metadata,
          } as AuditLogEntry;
        });
      }
    } catch (err) {
      console.warn("[queryAuditLogs] Firestore query error, falling back to cache:", err);
      allLogs = [...auditLogsCache];
    }
  } else {
    allLogs = [...auditLogsCache];
  }

  // Filter in memory for maximum search responsiveness
  let filtered = allLogs;

  if (actorEmail && actorEmail.trim()) {
    const q = actorEmail.trim().toLowerCase();
    filtered = filtered.filter((l) => l.actor.email.toLowerCase().includes(q));
  }

  if (action && action !== "all") {
    filtered = filtered.filter((l) => l.action === action);
  }

  if (resourceType && resourceType !== "all") {
    filtered = filtered.filter((l) => l.resourceType === resourceType);
  }

  if (status && status !== "all") {
    filtered = filtered.filter((l) => l.status === status);
  }

  if (startDate) {
    const start = new Date(startDate).getTime();
    filtered = filtered.filter((l) => new Date(l.timestamp).getTime() >= start);
  }

  if (endDate) {
    const end = new Date(endDate).getTime();
    filtered = filtered.filter((l) => new Date(l.timestamp).getTime() <= end);
  }

  if (search && search.trim()) {
    const term = search.trim().toLowerCase();
    filtered = filtered.filter(
      (l) =>
        l.summary.toLowerCase().includes(term) ||
        (l.resourceTitle && l.resourceTitle.toLowerCase().includes(term)) ||
        (l.resourceId && l.resourceId.toLowerCase().includes(term)) ||
        l.actor.email.toLowerCase().includes(term)
    );
  }

  const total = filtered.length;
  const paginatedLogs = filtered.slice(offset, offset + limit);

  return {
    logs: paginatedLogs,
    total,
    limit,
    offset,
  };
}

/**
 * Retrieves a single audit log entry by ID.
 */
export async function getAuditLogById(id: string): Promise<AuditLogEntry | null> {
  const adminDb = getAdminFirestore();
  if (adminDb) {
    try {
      const doc = await adminDb.collection(COLLECTIONS.AUDIT_LOGS).doc(id).get();
      if (doc.exists) {
        return { id: doc.id, ...doc.data() } as AuditLogEntry;
      }
    } catch (err) {
      console.warn(`[getAuditLogById:${id}] Error:`, err);
    }
  }

  const cached = auditLogsCache.find((l) => l.id === id);
  return cached || null;
}

export interface AuditLogStats {
  totalCount: number;
  past24HoursCount: number;
  successRate: number;
  topActions: { action: AuditAction; count: number }[];
  topActors: { email: string; count: number }[];
  resourceBreakdown: { resourceType: AuditResourceType; count: number }[];
}

/**
 * Aggregates statistics and metrics across recorded audit logs.
 */
export async function getAuditLogStats(): Promise<AuditLogStats> {
  const { logs, total } = await queryAuditLogs({ limit: 500 });

  const now = Date.now();
  const past24Hours = now - 24 * 60 * 60 * 1000;

  let past24HoursCount = 0;
  let successCount = 0;

  const actionCounts: Record<string, number> = {};
  const actorCounts: Record<string, number> = {};
  const resourceCounts: Record<string, number> = {};

  logs.forEach((log) => {
    const time = new Date(log.timestamp).getTime();
    if (time >= past24Hours) {
      past24HoursCount++;
    }

    if (log.status === "success") {
      successCount++;
    }

    actionCounts[log.action] = (actionCounts[log.action] || 0) + 1;
    actorCounts[log.actor.email] = (actorCounts[log.actor.email] || 0) + 1;
    resourceCounts[log.resourceType] = (resourceCounts[log.resourceType] || 0) + 1;
  });

  const topActions = Object.entries(actionCounts)
    .map(([action, count]) => ({ action: action as AuditAction, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  const topActors = Object.entries(actorCounts)
    .map(([email, count]) => ({ email, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  const resourceBreakdown = Object.entries(resourceCounts)
    .map(([resourceType, count]) => ({ resourceType: resourceType as AuditResourceType, count }))
    .sort((a, b) => b.count - a.count);

  const successRate = total > 0 ? Math.round((successCount / total) * 100) : 100;

  return {
    totalCount: total,
    past24HoursCount,
    successRate,
    topActions,
    topActors,
    resourceBreakdown,
  };
}

/**
 * Formats audit logs into a CSV string for export.
 */
export function formatAuditLogsAsCsv(logs: AuditLogEntry[]): string {
  const headers = [
    "Log ID",
    "Timestamp (ISO)",
    "Actor Email",
    "Actor Role",
    "Action",
    "Resource Type",
    "Resource ID",
    "Resource Title",
    "Summary",
    "Status",
  ];

  const escapeCsv = (val?: string) => {
    if (!val) return '""';
    const str = String(val).replace(/"/g, '""');
    return `"${str}"`;
  };

  const rows = logs.map((l) => [
    escapeCsv(l.id),
    escapeCsv(l.timestamp),
    escapeCsv(l.actor.email),
    escapeCsv(l.actor.role),
    escapeCsv(l.action),
    escapeCsv(l.resourceType),
    escapeCsv(l.resourceId),
    escapeCsv(l.resourceTitle),
    escapeCsv(l.summary),
    escapeCsv(l.status),
  ]);

  return [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
}
