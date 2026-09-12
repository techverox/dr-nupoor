import {
  INITIAL_WORKSPACES,
  INITIAL_METRICS,
  INITIAL_TOP_CLIENTS,
  INITIAL_TASKS_DUE,
  INITIAL_LEADS,
  INITIAL_GBP_ISSUES,
  INITIAL_APPROVALS,
  INITIAL_CLIENT_ACTIVITIES,
} from "./initial-data";
import {
  Workspace,
  MetricStat,
  ClientRevenueItem,
  TaskDueItem,
  LeadKanbanCard,
  GbpIssue,
  ClientApprovalItem,
  ActivityRecord,
} from "../types";

export interface AgencyDatabaseState {
  workspaces: Workspace[];
  activeWorkspaceId: string;
  metrics: MetricStat[];
  topClients: ClientRevenueItem[];
  tasksDue: TaskDueItem[];
  leads: LeadKanbanCard[];
  gbpIssues: GbpIssue[];
  approvals: ClientApprovalItem[];
  activities: ActivityRecord[];
}

export function createAgencyDatabase(): AgencyDatabaseState {
  return {
    workspaces: [...INITIAL_WORKSPACES],
    activeWorkspaceId: "agency-hq",
    metrics: [...INITIAL_METRICS],
    topClients: [...INITIAL_TOP_CLIENTS],
    tasksDue: [...INITIAL_TASKS_DUE],
    leads: [...INITIAL_LEADS],
    gbpIssues: [...INITIAL_GBP_ISSUES],
    approvals: [...INITIAL_APPROVALS],
    activities: [...INITIAL_CLIENT_ACTIVITIES],
  };
}
