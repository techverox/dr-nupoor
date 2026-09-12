export type WorkspaceType = "agency" | "client";

export type Currency = "INR" | "USD" | "AED" | "EUR";

export interface Workspace {
  id: string;
  name: string;
  type: WorkspaceType;
  clientName?: string;
  avatarUrl?: string;
  initials: string;
  healthScore?: number;
  activeProjectsCount: number;
  mrr?: string;
  rawMrr?: number;
}

export interface MetricStat {
  id: string;
  label: string;
  value: string;
  change: string;
  isPositive: boolean;
  color: string;
  bgColor: string;
  iconName: "users" | "folder" | "trending" | "check" | "calendar" | "clock";
  sparklineData?: number[];
  absoluteDelta?: string;
  rawNumericValue?: number;
  isCurrency?: boolean;
}

export interface ClientRevenueItem {
  id: string;
  rank: number;
  name: string;
  revenue: string;
  growth: string;
  status: "active" | "scaling" | "retained";
  mrrSharePercent?: number;
  category?: string;
  tier?: string;
  activeServices?: string[];
  isVerified?: boolean;
  rawRevenueValue?: number;
}

export interface TaskDueItem {
  id: string;
  title: string;
  client: string;
  dueDate: string;
  priority: "critical" | "high" | "medium";
  priorityLevel?: "P1" | "P2" | "P3";
  urgency?: string;
  assignee?: {
    name: string;
    avatar: string;
  };
}

export interface DailyPerformancePoint {
  date: string;
  dayLabel: string;
  traffic: number;
  trafficFormatted: string;
  leads: number;
  leadsFormatted: string;
  revenue: number;
  revenueFormatted: string;
  trafficChange: string;
  leadsChange: string;
  revenueChange: string;
}

export interface NotificationItem {
  id: string;
  category: "approvals" | "payments" | "leads" | "system";
  title: string;
  description: string;
  time: string;
  unread: boolean;
  actionLabel?: string;
}

export interface LeadKanbanCard {
  id: string;
  title: string;
  location: string;
  stage: "new" | "contacted" | "proposal" | "won";
  value?: string;
  tags: string[];
  lastActivity: string;
}

export interface SocialScheduledPost {
  id: string;
  platform: "instagram" | "facebook" | "linkedin" | "tiktok";
  day: number;
  time: string;
  content: string;
  status: "scheduled" | "draft" | "pending_approval";
}

export interface GbpIssue {
  id: string;
  title: string;
  description: string;
  severity: "critical" | "warning" | "suggestion";
  fixed?: boolean;
}

export interface ClientApprovalItem {
  id: string;
  platform: string;
  title: string;
  caption: string;
  imageUrl: string;
  scheduledTime: string;
  status: "pending" | "approved" | "changes_requested" | "rejected";
  comments: {
    id: string;
    author: string;
    text: string;
    timestamp: string;
  }[];
}

export interface ActivityRecord {
  id: string;
  text: string;
  time: string;
  type: "review" | "social" | "seo" | "lead";
}

export interface NavItem {
  id: string;
  label: string;
  icon: React.ElementType;
  badge?: string;
  badgeColor?: string;
  isNew?: boolean;
}

export interface NavSection {
  groupTitle: string;
  items: NavItem[];
}

export interface LayoutConfig {
  showOverviewGraph: boolean;
  showSocialCalendar: boolean;
  showGbpAudit: boolean;
  showCrmKanban: boolean;
  showApprovals: boolean;
  showUserFlow: boolean;
  compactKpiCards: boolean;
}

export interface KpiDrilldownData {
  metricId: string;
  title: string;
  value: string;
  change: string;
  absoluteDelta?: string;
  description: string;
  breakdown: { label: string; value: string; share: number; color?: string }[];
  recentLogs: { id: string; title: string; time: string; status: string; client?: string }[];
}
