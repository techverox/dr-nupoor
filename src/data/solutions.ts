export interface SolutionPackage {
  id: string;
  name: string;
  price: string;
  billingPeriod: string;
  description: string;
  features: string[];
  isPopular?: boolean;
  ctaText?: string;
  ctaLink?: string;
}

export interface SolutionCapability {
  title: string;
  description: string;
}

export interface SolutionTransformationItem {
  before: string;
  after: string;
}

export interface SolutionWorkflowStep {
  step: string;
  title: string;
  description: string;
}

export interface SolutionMetric {
  value: string;
  label: string;
}

export interface SolutionItem {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  badge: string;
  badgeSla: string;
  heroDescription: string;
  accentColor: string;
  metrics: SolutionMetric[];
  capabilities: SolutionCapability[];
  transformation: SolutionTransformationItem[];
  workflowSteps: SolutionWorkflowStep[];
  packages: SolutionPackage[];
  relatedSolutionSlugs: string[];
  seo: {
    title: string;
    description: string;
    keywords: string[];
  };
}

export const SOLUTIONS_DATA: Record<string, SolutionItem> = {
  "performance-agencies": {
    id: "solution-performance",
    slug: "performance-agencies",
    title: "For Performance Agencies",
    subtitle: "Scale retained ROAS, ad ops & automated reporting",
    badge: "Performance Ad Ops Terminal",
    badgeSla: "⚡ Real-Time CAPI Telemetry",
    heroDescription:
      "Consolidate multi-account ad spend across Meta, Google, and TikTok. Automate daily budget pacing, eliminate accidental overspends, and replace manual Looker Studio slide decks with live white-label client ROAS portals.",
    accentColor: "emerald",
    metrics: [
      { value: "4.8x", label: "Avg Blended ROAS" },
      { value: "$84.2M+", label: "Verified Ad Spend Managed" },
      { value: "65+ Hrs", label: "Monthly Reporting Saved" },
      { value: "0%", label: "Ad Spend Overrun Tolerance" },
    ],
    capabilities: [
      {
        title: "Cross-Channel Budget Pacing",
        description: "Automated daily spend tracking across Meta, Google, and TikTok with threshold overspend alerts.",
      },
      {
        title: "Blended ROAS & MER Telemetry",
        description: "Unified cross-platform metrics combining platform-reported ROAS with Shopify/Stripe real revenue.",
      },
      {
        title: "1-Click Live Client Dashboards",
        description: "Always-live white-label client links showing verified campaign KPIs without manual deck preparation.",
      },
      {
        title: "Creative Fatigue & Anomaly Detection",
        description: "Algorithmic alerts when CPA spikes or CTR drops below historical target thresholds.",
      },
      {
        title: "Server-Side CAPI Signal Health",
        description: "Continuous telemetry on Conversion API signal quality and Event Match Quality scores.",
      },
      {
        title: "Executive Retainer Attribution",
        description: "Multi-touch attribution models demonstrating the true commercial return of agency media spend.",
      },
    ],
    transformation: [
      {
        before: "Media buyers logging into 40 separate ad accounts daily to check budgets manually in spreadsheets.",
        after: "Unified central command terminal tracking total portfolio pacing with automated overspend caps.",
      },
      {
        before: "Accidental weekend budget overspends resulting in painful agency refunds and angry clients.",
        after: "Automated rule guardrails pause campaigns or notify Slack before spend exceeds approved monthly budgets.",
      },
      {
        before: "Spending 15+ hours per client every month assembling manual Google Slides and Looker Studio decks.",
        after: "Always-live white-label client portal displaying real-time ROAS, CAPI health, and attribution data.",
      },
    ],
    workflowSteps: [
      {
        step: "01",
        title: "Connect Ad Accounts",
        description: "Instant 1-click OAuth integration with Meta Ads, Google Ads, TikTok, Shopify, and Stripe.",
      },
      {
        step: "02",
        title: "Configure Pacing Guardrails",
        description: "Set monthly client budget limits, daily pacing curves, and automated Slack alert thresholds.",
      },
      {
        step: "03",
        title: "Deliver Live White-Label Dashboards",
        description: "Provide clients with custom-branded URL portals that display real-time ROAS without manual decks.",
      },
    ],
    packages: [
      {
        id: "perf-starter",
        name: "Ad Ops Starter Pod",
        price: "$699",
        billingPeriod: "monthly",
        description: "Essential pacing and reporting for performance agencies managing up to $100k/mo ad spend.",
        features: [
          "Up to 15 Connected Ad Accounts",
          "Automated Daily Budget Pacing",
          "Live Client Reporting Dashboards",
          "Overspend Alert Notifications",
          "Meta & Google Direct Connectors",
        ],
        isPopular: false,
        ctaText: "Deploy Ad Ops Pod",
        ctaLink: "/contact?solution=performance-agencies&package=starter-pod",
      },
      {
        id: "perf-scale",
        name: "Scale Media Buyer Hub",
        price: "$1,299",
        billingPeriod: "monthly",
        description: "Complete performance operations engine for agencies managing up to $500k/mo ad spend.",
        features: [
          "Up to 45 Connected Ad Accounts",
          "Blended ROAS & MER Telemetry",
          "100% White-Label Custom Client Portals",
          "Creative Fatigue & CPA Spike Alerts",
          "Shopify & Stripe Revenue Reconciliation",
          "Automated Weekly Client Email Summaries",
        ],
        isPopular: true,
        ctaText: "Deploy Scale Hub",
        ctaLink: "/contact?solution=performance-agencies&package=scale-hub",
      },
      {
        id: "perf-enterprise",
        name: "Enterprise Media Cluster",
        price: "$2,499",
        billingPeriod: "monthly",
        description: "High-throughput media ops architecture for enterprise agencies managing $1M+/mo ad spend.",
        features: [
          "Unlimited Connected Ad Accounts",
          "Automated CAPI & Server-Side Event Monitoring",
          "Dedicated Data Engineer & Media Ops SLA",
          "Custom Predictive ROAS Modeling",
          "Enterprise Direct Slack Connect Bridge",
          "Sub-15m Critical Incident Support",
        ],
        isPopular: false,
        ctaText: "Deploy Media Cluster",
        ctaLink: "/contact?solution=performance-agencies&package=enterprise-cluster",
      },
    ],
    relatedSolutionSlugs: ["social-media-agencies", "scaling-agencies", "local-seo-agencies"],
    seo: {
      title: "For Performance Agencies | Scale Retained ROAS & Automated Ad Ops | DigiVigee",
      description:
        "The all-in-one ad ops terminal for performance marketing agencies. Consolidate Meta & Google ad spend, automate client ROAS reporting, and protect retainers.",
      keywords: ["performance agencies", "ad ops", "ROAS tracking", "Meta ad budget pacing", "agency reporting"],
    },
  },

  "social-media-agencies": {
    id: "solution-social",
    slug: "social-media-agencies",
    title: "For Social Media Agencies",
    subtitle: "Content pipelines, visual post calendars & client approvals",
    badge: "Social Delivery OS",
    badgeSla: "⚡ 1-Click Client Proofing",
    heroDescription:
      "The purpose-built operating system for social media and content agencies. Plan visual multi-channel calendars, preview vertical Reels and Carousels with pixel perfection, and collect 1-click client sign-offs with zero email friction.",
    accentColor: "pink",
    metrics: [
      { value: "78%", label: "Faster Client Sign-offs" },
      { value: "30 Days", label: "Content Batched in Hours" },
      { value: "15+", label: "Retainers Managed per Strategist" },
      { value: "99.8%", label: "On-Time Publishing SLA" },
    ],
    capabilities: [
      {
        title: "Visual Multi-Channel Calendar",
        description: "Color-coded master schedule across all client accounts with drag-and-drop rescheduling.",
      },
      {
        title: "1-Click Client Approval Portal",
        description: "Passwordless client review links where clients approve or annotate changes in under 5 seconds.",
      },
      {
        title: "Script-to-Screen Reel Pipelines",
        description: "Standardized vertical video workflows from raw hook ideation to edited master with version tracking.",
      },
      {
        title: "Frame-by-Frame Video Proofing",
        description: "Clients click directly on video frames to leave time-coded visual feedback without email threads.",
      },
      {
        title: "Direct Algorithmic Auto-Publishing",
        description: "Direct official API posting to Instagram, TikTok, Facebook, LinkedIn, and YouTube Shorts.",
      },
      {
        title: "White-Label Executive Scorecards",
        description: "Automated monthly engagement and audience growth reports branded with your agency identity.",
      },
    ],
    transformation: [
      {
        before: "Clients taking 2 weeks to reply to messy email threads with conflicting, vague feedback.",
        after: "1-Click passwordless review links with point-and-click annotations on images and video frames.",
      },
      {
        before: "Juggling 4 separate schedulers (Buffer, Later, Hootsuite) with broken auto-publishing.",
        after: "Single unified visual calendar with direct API publishing to 8 social networks simultaneously.",
      },
      {
        before: "Designers, video editors, and copywriters working in disconnected Google Drive folders.",
        after: "Centralized client brand vault with instant asset drag-and-drop into scheduled calendar slots.",
      },
    ],
    workflowSteps: [
      {
        step: "01",
        title: "Batch Social Sprints",
        description: "Draft 30 days of vertical reels, carousels, and captions in standardized client workspace queues.",
      },
      {
        step: "02",
        title: "Send 1-Click Magic Link",
        description: "Clients review scheduled posts on mobile or desktop and approve with a single click—no login required.",
      },
      {
        step: "03",
        title: "Automated API Publishing",
        description: "Approved assets publish directly to Instagram, TikTok, LinkedIn, and YouTube via official APIs.",
      },
    ],
    packages: [
      {
        id: "smm-starter",
        name: "Starter Pod Workflow",
        price: "$499",
        billingPeriod: "monthly",
        description: "Core social delivery engine for boutique agencies managing up to 10 client retainers.",
        features: [
          "Up to 10 Client Workspaces",
          "Multi-Platform Visual Calendar",
          "1-Click Client Approval Portals",
          "Direct Social Buffer Publishing",
          "Standardized Retainer SOPs",
        ],
        isPopular: false,
        ctaText: "Deploy Social Pod",
        ctaLink: "/contact?solution=social-media-agencies&package=starter-pod",
      },
      {
        id: "smm-growth",
        name: "Growth Agency Engine",
        price: "$999",
        billingPeriod: "monthly",
        description: "Advanced social workflows for scaling agencies managing up to 35 client retainers.",
        features: [
          "Up to 35 Client Workspaces",
          "Unlimited Multi-Client Calendars",
          "White-Label Custom Client Domain",
          "Automated Monthly Executive Scorecards",
          "Reels & Vertical Video Proofing Canvas",
          "Priority Agency Support SLA",
        ],
        isPopular: true,
        ctaText: "Deploy Growth Engine",
        ctaLink: "/contact?solution=social-media-agencies&package=growth-engine",
      },
      {
        id: "smm-advanced",
        name: "Enterprise Agency Cluster",
        price: "$1,899",
        billingPeriod: "monthly",
        description: "High-volume delivery architecture for enterprise agencies managing 50+ retainers.",
        features: [
          "Unlimited Client Workspaces",
          "Custom Multi-Tier Permissions",
          "Dedicated SLA & Account Architect",
          "Full White-Label Client Portals",
          "Custom API & Webhook Integrations",
          "Sub-15m Priority SLA Support",
        ],
        isPopular: false,
        ctaText: "Deploy Social Cluster",
        ctaLink: "/contact?solution=social-media-agencies&package=enterprise-cluster",
      },
    ],
    relatedSolutionSlugs: ["performance-agencies", "scaling-agencies", "local-seo-agencies"],
    seo: {
      title: "For Social Media Agencies | Content Pipelines & 1-Click Approvals | DigiVigee",
      description:
        "The all-in-one OS for social media agencies. Batch 30 days of content, preview vertical video reels, and collect client approvals in seconds.",
      keywords: ["social media agencies", "content calendar", "client approvals", "video proofing", "agency scheduler"],
    },
  },

  "local-seo-agencies": {
    id: "solution-local-seo",
    slug: "local-seo-agencies",
    title: "For Local SEO & GBP Agencies",
    subtitle: "GBP audit scorecards, review automation & rank tracking",
    badge: "Local Search Architecture",
    badgeSla: "⚡ Geo-Grid Map Pack Sync",
    heroDescription:
      "Dominate the Google 3-Pack and prove local organic ROI to every franchise and small business client. Centralize multi-location Google Business Profile sync, live geo-grid rank tracking, and scheduled white-label audit reports.",
    accentColor: "amber",
    metrics: [
      { value: "+340%", label: "Avg Phone Call Inbound Lift" },
      { value: "800+", label: "Locations Managed per Pod" },
      { value: "100%", label: "Automated Citation Audits" },
      { value: "#1 Rank", label: "Google 3-Pack Target Velocity" },
    ],
    capabilities: [
      {
        title: "Multi-Location GBP Sync",
        description: "Centralized Google Business Profile management across hundreds of client franchise storefronts.",
      },
      {
        title: "Live Geo-Grid Rank Tracking",
        description: "Visual coordinate heatmaps tracking local Map Pack positions across exact radius coordinates.",
      },
      {
        title: "Automated Review Generation",
        description: "Automated SMS/email review invitation funnels with smart sentiment filters and AI response drafts.",
      },
      {
        title: "Local Citation & NAP Audits",
        description: "Continuous NAP consistency monitoring across 50+ tier-1 directories to protect local authority.",
      },
      {
        title: "Technical SEO Crawl Scanner",
        description: "Scheduled crawls detecting broken internal links, schema issues, and local landing page speed drops.",
      },
      {
        title: "White-Label Executive Reports",
        description: "Automated client PDF and web reports showing organic traffic, keyword movement, and call volume.",
      },
    ],
    transformation: [
      {
        before: "Tracking local rankings across dozens of client locations manually with disconnected spreadsheets.",
        after: "Visual coordinate geo-grid heatmaps give clients undeniable visual evidence of Map Pack ranking growth.",
      },
      {
        before: "Clients complaining about low review velocity and competitors outranking them in the 3-pack.",
        after: "Automated review request funnels trigger after customer visits, capturing 5-star Google reviews on autopilot.",
      },
      {
        before: "Wasting hours capturing manual ranking screenshots and compiling tedious monthly PDF reports.",
        after: "Scheduled white-label search reports automatically dispatch to clients with call and direction metrics.",
      },
    ],
    workflowSteps: [
      {
        step: "01",
        title: "Authorize Google Business Profiles",
        description: "One-click OAuth sync connects all client physical locations and franchise branches in seconds.",
      },
      {
        step: "02",
        title: "Deploy Geo-Grid Scanners",
        description: "Set local scan radiuses (3km, 5km, 10km) to continuously monitor exact Map Pack rankings.",
      },
      {
        step: "03",
        title: "Automate Review & Rank Reports",
        description: "Review request workflows and scheduled white-label ranking scorecards deliver proven commercial ROI.",
      },
    ],
    packages: [
      {
        id: "seo-local",
        name: "Local Agency Pod",
        price: "$599",
        billingPeriod: "monthly",
        description: "Multi-location local SEO and GBP automation for boutique local marketing agencies.",
        features: [
          "Up to 25 Google Business Profiles",
          "Geo-Grid Map Pack Rank Tracking",
          "Automated Citation Health Audits",
          "White-Label Client Ranking Reports",
          "Review Request Automation Funnels",
        ],
        isPopular: false,
        ctaText: "Deploy Local Pod",
        ctaLink: "/contact?solution=local-seo-agencies&package=local-pod",
      },
      {
        id: "seo-growth",
        name: "National Search Engine",
        price: "$1,199",
        billingPeriod: "monthly",
        description: "Complete local and national organic search operations for scaling SEO agencies.",
        features: [
          "Up to 100 Location Workspaces",
          "Unlimited Geo-Grid Rank Scans",
          "Automated Technical Crawl Monitoring",
          "White-Label Custom Subdomain Portals",
          "Direct Google Search Console Telemetry",
          "Priority Agency SEO Support SLA",
        ],
        isPopular: true,
        ctaText: "Deploy Search Engine",
        ctaLink: "/contact?solution=local-seo-agencies&package=national-engine",
      },
      {
        id: "seo-enterprise",
        name: "Enterprise Multi-Location Cluster",
        price: "$2,199",
        billingPeriod: "monthly",
        description: "Automated local search dominance for enterprise multi-location franchises & national brands.",
        features: [
          "500+ Location Workspaces",
          "Real-Time Geo-Grid Radius Heatmaps",
          "Multi-Account GBP API Synchronization",
          "Automated Algorithmic Rank Alerts",
          "Dedicated Senior Search Strategist",
          "Custom White-Label Executive Dashboards",
        ],
        isPopular: false,
        ctaText: "Deploy Enterprise Cluster",
        ctaLink: "/contact?solution=local-seo-agencies&package=enterprise-cluster",
      },
    ],
    relatedSolutionSlugs: ["performance-agencies", "scaling-agencies", "social-media-agencies"],
    seo: {
      title: "For Local SEO & GBP Agencies | Google 3-Pack & Geo-Grid Telemetry | DigiVigee",
      description:
        "Multi-location Google Business Profile sync, geo-grid rank tracking, and review automation built for local SEO agencies.",
      keywords: ["local SEO agencies", "GBP management", "geo grid rank tracker", "review automation", "Google Maps SEO"],
    },
  },

  "scaling-agencies": {
    id: "solution-scaling",
    slug: "scaling-agencies",
    title: "For Full-Service Scaling Agencies",
    subtitle: "Connected all-in-one OS for CRM, tasks, marketing & billing",
    badge: "Unified Agency Operating System",
    badgeSla: "⚡ Multi-Department Connected",
    heroDescription:
      "One unified operating system connecting every department, client, and retainer. Replace fragmented subscriptions for ClickUp, HubSpot, Buffer, and Stripe with a single, high-retention command center built for 7-figure agencies.",
    accentColor: "blue",
    metrics: [
      { value: "420+", label: "Scaling Digital Agencies Powered" },
      { value: "$18.4k", label: "Annual SaaS Subscriptions Saved" },
      { value: "100%", label: "Retainer Revenue Predictability" },
      { value: "15 Mins", label: "Client Intake to Delivery Kickoff" },
    ],
    capabilities: [
      {
        title: "Multi-Tenant CRM & Lead Routing",
        description: "Instant lead ingestion from landing pages directly to client CRM pipelines via webhooks.",
      },
      {
        title: "Stripe Connect Retainer Autopilot",
        description: "Automated recurring credit card and ACH billing on the 1st of every month with zero manual invoicing.",
      },
      {
        title: "Cross-Department Sprint Boards",
        description: "Synchronized kanban and task pipelines aligning creative, SEO, and paid ad teams per client retainer.",
      },
      {
        title: "White-Label Client Portals",
        description: "Custom-branded client hub where clients review deliverables, approve creative, and access invoices.",
      },
      {
        title: "SLA Guardrails & Scope Tracking",
        description: "Automated deliverable quotas that alert agency leadership before unbilled extra revisions begin.",
      },
      {
        title: "Enterprise Security & Granular RBAC",
        description: "Multi-tier permissions ensuring strict client data isolation and SOC-2 Type II compliance.",
      },
    ],
    transformation: [
      {
        before: "Juggling 8 disjointed SaaS tools (ClickUp, HubSpot, Buffer, Stripe) with data falling through the cracks.",
        after: "One unified agency operating system where CRM leads, task sprints, creative approvals, and billing sync automatically.",
      },
      {
        before: "Clients confused by scattered email links, missing invoices, and inconsistent agency communication.",
        after: "A single, white-label client command portal branded with your agency logo and custom subdomain.",
      },
      {
        before: "Unpaid scope creep and deliverable overages eating away at agency profit margins every sprint.",
        after: "Built-in deliverable quotas automatically enforce retainer boundaries and trigger unbilled scope alerts.",
      },
    ],
    workflowSteps: [
      {
        step: "01",
        title: "Onboard Team & Workspaces",
        description: "Set up client spaces, invite strategists, and configure automated Stripe retainer subscriptions.",
      },
      {
        step: "02",
        title: "Activate Cross-Functional Pods",
        description: "Assign creative, media, and SEO deliverables to standardized sprint queues with SLA milestones.",
      },
      {
        step: "03",
        title: "Deliver Enterprise Retainer Experience",
        description: "Impress high-ticket retainer clients with real-time white-label dashboards that eliminate churn.",
      },
    ],
    packages: [
      {
        id: "scaling-starter",
        name: "Agency Operations Starter",
        price: "$699",
        billingPeriod: "monthly",
        description: "Complete retainer billing, contract automation, and client onboarding engine.",
        features: [
          "Up to 15 Client Workspaces",
          "Stripe Connect Retainer Autopilot",
          "Automated Client Intake Wizards",
          "Multi-CRM Lead Routing Pipelines",
          "SLA Scope Overage Warning System",
        ],
        isPopular: false,
        ctaText: "Deploy Ops Pod",
        ctaLink: "/contact?solution=scaling-agencies&package=starter-ops",
      },
      {
        id: "scaling-engine",
        name: "Full-Service Scale Engine",
        price: "$1,299",
        billingPeriod: "monthly",
        description: "Full-scale agency operating system with custom white-label client portals and task sync.",
        features: [
          "Up to 45 Client Workspaces",
          "Multi-Department Task & Sprint Boards",
          "100% White-Label Custom Domain",
          "Automated Scope Creep Guardrails",
          "Direct Multi-Platform Ad & SEO Connectors",
          "Priority Agency Support SLA",
        ],
        isPopular: true,
        ctaText: "Deploy Scale Engine",
        ctaLink: "/contact?solution=scaling-agencies&package=scale-engine",
      },
      {
        id: "scaling-enterprise",
        name: "Enterprise Agency Network",
        price: "$2,499",
        billingPeriod: "monthly",
        description: "Custom ERP sync, enterprise billing rules, and multi-tier agency client operations.",
        features: [
          "Unlimited Client Workspaces",
          "Custom ERP & Accounting API Sync",
          "Dedicated Systems Architect & SLA",
          "Full Custom Webhook Integrations",
          "SOC-2 Isolated Client Workspaces",
          "Sub-15m Support SLA Guarantee",
        ],
        isPopular: false,
        ctaText: "Deploy Enterprise Network",
        ctaLink: "/contact?solution=scaling-agencies&package=enterprise-network",
      },
    ],
    relatedSolutionSlugs: ["performance-agencies", "social-media-agencies", "local-seo-agencies"],
    seo: {
      title: "For Full-Service Scaling Agencies | Unified Multi-Department OS | DigiVigee",
      description:
        "The all-in-one operating system for 7-figure scaling digital agencies. Unify CRM, tasks, marketing delivery, and automated billing.",
      keywords: ["scaling agencies", "agency operating system", "all in one agency software", "agency CRM", "retainer billing"],
    },
  },
};
