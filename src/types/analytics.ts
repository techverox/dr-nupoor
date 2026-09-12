export type AnalyticsTimeframe =
  | "today"
  | "yesterday"
  | "7d"
  | "30d"
  | "90d"
  | "this_month"
  | "previous_month"
  | "custom"
  | "all";

export type AnalyticsEventType =
  | "page_view"
  | "cta_click"
  | "form_interaction"
  | "form_submission"
  | "lead_created"
  | "newsletter_subscription"
  | "whatsapp_click";

export interface AnalyticsEvent {
  id: string;
  eventName: string;
  eventType: AnalyticsEventType;
  path: string;
  pageTitle?: string;
  timestamp: string;
  sessionId: string;
  visitorId: string;
  referrer?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmContent?: string;
  utmTerm?: string;
  landingPageSlug?: string;
  formId?: string;
  leadId?: string;
  metadata?: Record<string, string | number | boolean>;
}

export interface MetricComparison {
  current: number;
  previous: number;
  difference: number;
  percentageChange: number | null;
  trend: "up" | "down" | "neutral";
  isPositive: boolean;
  formattedChange: string;
}

export interface LeadMetrics {
  totalLeads: number;
  newLeads: number;
  contactedLeads: number;
  qualifiedLeads: number;
  proposalSentLeads: number;
  convertedLeads: number;
  closedLostLeads: number;
  conversionRate: number; // percentage (0 - 100)
}

export interface ContentMetrics {
  totalServices: number;
  publishedServices: number;
  totalPortfolio: number;
  publishedPortfolio: number;
  totalBlogs: number;
  publishedBlogs: number;
  totalMedia: number;
}

export interface SubscriberMetrics {
  totalSubscribers: number;
  activeSubscribers: number;
  unsubscribedCount: number;
}

export interface ChannelLeadSource {
  source: string;
  count: number;
  percentage: number;
}

export interface TimelineDataPoint {
  date: string;
  leads: number;
  subscribers: number;
  pageViews?: number;
  visitors?: number;
  submissions?: number;
}

export interface TopPageRow {
  path: string;
  pageTitle?: string;
  views: number;
  uniqueVisitors: number;
}

export interface PagePerformanceRow {
  path: string;
  pageTitle?: string;
  views: number;
  uniqueVisitors: number;
  sessions: number;
  leadsAttributed: number;
  conversionRate: number;
  isHighTrafficLowConversion?: boolean;
}

export interface TrafficSourceRow {
  source: string;
  medium?: string;
  count: number;
  percentage: number;
  leads?: number;
  conversionRate?: number;
}

export interface CampaignPerformanceRow {
  campaign: string;
  source: string;
  medium: string;
  clicksOrViews: number;
  visitors: number;
  conversions: number;
  newsletterSignups?: number;
  conversionRate: number;
}

export interface FormPerformanceRow {
  formId: string;
  formName: string;
  submissions: number;
  leadsGenerated: number;
  conversionRate: number;
}

export interface FunnelStage {
  id: string;
  name: string;
  label: string;
  count: number;
  percentOfTotal: number;
  conversionFromPrevious: number;
}

export interface ExecutiveSummaryInsight {
  id: string;
  type: "traffic" | "leads" | "campaign" | "page" | "conversion";
  text: string;
  sentiment: "positive" | "negative" | "neutral" | "info";
}

export interface FirstPartyTrafficSummary {
  totalPageViews: number;
  uniqueVisitors: number;
  totalSessions: number;
  overallConversionRate: number; // (totalLeads / uniqueVisitors) * 100
  topPages: TopPageRow[];
  trafficSources: TrafficSourceRow[];
  campaigns: CampaignPerformanceRow[];
}

export interface TrafficMetrics {
  isConfigured: boolean;
  provider: "Google Analytics 4" | "None" | "First-Party Engine";
  measurementId?: string;
  pageViews?: number;
  sessions?: number;
  activeUsers?: number;
  topPages?: Array<{ path: string; views: number }>;
}

export interface AnalyticsDashboardData {
  timeframe: AnalyticsTimeframe;
  leadMetrics: LeadMetrics;
  contentMetrics: ContentMetrics;
  subscriberMetrics: SubscriberMetrics;
  trafficMetrics: TrafficMetrics;
  firstPartyTraffic: FirstPartyTrafficSummary;
  channelSources: ChannelLeadSource[];
  timeline: TimelineDataPoint[];
}

export interface AdvancedKpis {
  pageViews: MetricComparison;
  uniqueVisitors: MetricComparison;
  sessions: MetricComparison;
  leads: MetricComparison;
  formSubmissions: MetricComparison;
  subscribers: MetricComparison;
  whatsappClicks: MetricComparison;
  ctaClicks: MetricComparison;
  overallConversionRate: MetricComparison;
}

export interface AdvancedAnalyticsFilter {
  timeframe?: AnalyticsTimeframe;
  startDate?: string;
  endDate?: string;
  compare?: boolean;
}

export interface AdvancedAnalyticsReport {
  filter: {
    timeframe: AnalyticsTimeframe;
    startDate: string;
    endDate: string;
    label: string;
    comparisonStartDate: string;
    comparisonEndDate: string;
    comparisonLabel: string;
    hasComparison: boolean;
  };
  kpis: AdvancedKpis;
  timeline: TimelineDataPoint[];
  funnel: FunnelStage[];
  topPages: PagePerformanceRow[];
  trafficSources: TrafficSourceRow[];
  campaigns: CampaignPerformanceRow[];
  formPerformance: FormPerformanceRow[];
  leadDistribution: Record<string, number>;
  subscriberSummary: {
    totalActive: number;
    totalUnsubscribed: number;
    newInPeriod: number;
  };
  insights: ExecutiveSummaryInsight[];
}
