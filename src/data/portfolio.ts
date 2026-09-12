import { PortfolioItem } from "@/types";

export const PORTFOLIO_DATA: PortfolioItem[] = [
  {
    id: "portfolio-1",
    title: "How Apex Scaled from 15 to 68 Enterprise Retainers with 0 Extra Account Managers",
    slug: "apex-digital-media",
    clientName: "Apex Digital Media",
    industry: "Performance Ad Agency (45 FTEs)",
    category: "Ad Ops & Pacing Automation",
    categoryKey: "performance",
    authorName: "Marcus Vance",
    authorRole: "Managing Partner",
    authorAvatar: "/images/showcase/marcus_vance.jpg",
    heroImage: "/images/showcase/pillar_roas_command.jpg",
    servicesDelivered: ["Performance Ad Ops Engine", "Multi-Account Pacing", "Automated ROAS Portals"],
    shortDescription:
      "Automated ad pacing guardrails and live CAPI telemetry enabled 45 media buyers to manage $14M+ monthly spend with zero overspend errors.",
    challenge:
      "Apex was drowning in manual Google Sheets for ad budget pacing and constant client Slack pings, resulting in severe team burnout and two major budget overspend incidents during holiday peak periods.",
    strategy:
      "Migrated the entire 68-client roster to Digivigee Agency OS. Deployed automated ad spend pacing guardrails, live blended ROAS telemetry, and 1-click self-serve client portal access.",
    execution:
      "Connected 85+ Meta, Google, and TikTok ad accounts into Digivigee's centralized engine within 48 hours. Configured automated daily pacing threshold alerts and scheduled executive live reporting links.",
    results:
      "Eliminated manual client reporting entirely, freed up 14 hours per week per pod, and scaled agency MRR by 420% over 12 months with zero account manager headcount addition.",
    testimonialQuote:
      "Digivigee transformed our media buying operations overnight. We scaled spend from $3M to $14M monthly across 68 retainers without hiring a single extra account manager, and our client overspend errors dropped to absolute zero.",
    keyTakeaway:
      "Automated pacing thresholds and unified CAPI telemetry turned a high-burnout spreadsheet operation into an enterprise-grade performance engine.",
    beforePoints: [
      "Manual daily Google Sheet pacing taking 3.5 hours per pod every morning",
      "Frequent holiday budget overspends resulting in costly agency cash rebates",
      "Constant client Slack interruptions demanding live spend and ROAS updates",
      "Account managers overwhelmed, capping profitable agency scale at 15 accounts",
    ],
    afterPoints: [
      "Automated hourly pacing guardrails with live CAPI telemetry across 85+ ad accounts",
      "100% budget accuracy with zero overspend errors across 12 consecutive months",
      "Self-serve executive client portals eliminating 14 hours of manual status pings per week",
      "Scaled seamlessly to 68 high-ticket enterprise retainers with zero added headcount",
    ],
    executionMilestones: [
      "Day 1: Ingested 85+ Meta, Google & TikTok ad accounts into Digivigee Engine",
      "Day 2: Calibrated automated daily pacing guardrails and budget alert webhooks",
      "Day 3: Activated 1-click self-serve client portals with blended ROAS dashboards",
      "Day 7: Full team adoption achieved across all 45 media buyers with zero operational disruption",
    ],
    metrics: [
      { label: "MRR Growth", value: "+420%", description: "Retainer revenue expansion" },
      { label: "Time Saved", value: "14 hrs/wk", description: "Per media buyer pod" },
      { label: "Client Retention", value: "99.4%", description: "All-time high client NPS" },
      { label: "Managed Ad Spend", value: "$14M+", description: "With zero overspend errors" },
    ],
    tags: ["Agency OS", "Performance Marketing", "Ad Ops", "Client Retainers"],
    isFeatured: true,
    isPublished: true,
    order: 1,
    seo: {
      title: "Apex Digital Media Case Study | Digivigee Agency OS",
      description: "How Apex Digital scaled to 68 enterprise retainers and saved 14 hrs/wk per pod using Digivigee OS.",
      slug: "apex-digital-media",
    },
    createdAt: "2026-01-01T00:00:00Z",
    updatedAt: "2026-01-01T00:00:00Z",
  },
  {
    id: "portfolio-2",
    title: "Automating 65+ Hours of Monthly Client Reporting Across 120 DTC Retainers",
    slug: "vanguard-performance-ops",
    clientName: "Vanguard Performance Ops",
    industry: "Full-Funnel DTC Media Agency",
    category: "Client Portal & Reporting",
    categoryKey: "performance",
    authorName: "Elena Rostova",
    authorRole: "Head of Media Operations",
    authorAvatar: "/images/showcase/elena_rostova.jpg",
    heroImage: "/images/showcase/pillar_client_intelligence.jpg",
    servicesDelivered: ["White-Label Portals", "Live Executive Dashboards", "CAPI Telemetry"],
    shortDescription:
      "Replaced manual 40-page PDF reporting decks with real-time white-labeled client dashboards, boosting client NPS from 42 to 89.",
    challenge:
      "Account directors spent the first 5 business days of every month copying and pasting metrics from Meta, Google, and Shopify into slide decks, creating massive delivery delays and team exhaustion.",
    strategy:
      "Deployed Digivigee's 100% white-labeled client portals with live blended ROAS, automated deliverable checklists, and self-serve client metrics.",
    execution:
      "Onboarded 120 brand retainers with custom branded subdomains, agency color schemes, and granular role-based permissions in under two weeks.",
    results:
      "Reporting time reduced from 65 hours per month to zero, with zero client churn during Q4 peak season and an increase in client NPS to 89.",
    testimonialQuote:
      "Our account directors used to spend the first week of every month trapped in PowerPoint hell. With Digivigee white-label portals, client reporting is 100% autonomous, and our client NPS surged from 42 to 89.",
    keyTakeaway:
      "White-label client intelligence replaced 40-page PDF slides with real-time transparency, driving 28% retainer expansion.",
    beforePoints: [
      "Account directors losing 65+ hours per month manually formatting PDF slide decks",
      "Discrepancies between Shopify, Meta, and Google creating client mistrust",
      "Delivery bottlenecks causing monthly reports to arrive 7 to 10 days late",
      "High client churn during Q4 peak due to lack of real-time performance visibility",
    ],
    afterPoints: [
      "100% white-labeled client portals on custom domains with agency branding",
      "Live blended ROAS, MER, and net profit telemetry synced automatically",
      "Zero hours spent on manual reporting, freeing directors for strategic upsells",
      "Zero client churn across 120 DTC retainers with client NPS soaring to 89",
    ],
    executionMilestones: [
      "Week 1: Configured custom branded agency portal subdomain and client permission groups",
      "Week 1: Automated data pipelines across Shopify, Google Analytics 4, and Meta Ads",
      "Week 2: Onboarded 120 DTC brands with personalized video walkthroughs",
      "Day 30: Delivered first fully automated month-end reporting cycle with zero manual slides",
    ],
    metrics: [
      { label: "Reporting Automated", value: "65 hrs/mo", description: "Manual deck preparation cut to 0" },
      { label: "White-Label Portals", value: "100%", description: "Custom branded client domains" },
      { label: "Client NPS Lift", value: "42 ➔ 89", description: "Dramatic jump in satisfaction" },
      { label: "Retainer Expansion", value: "+28%", description: "Upsells driven by live telemetry" },
    ],
    tags: ["White-Label", "Client Reporting", "DTC", "Agency Scale"],
    isFeatured: true,
    isPublished: true,
    order: 2,
    seo: {
      title: "Vanguard Performance Ops Case Study | Digivigee Agency OS",
      description: "How Vanguard automated 65+ hours of monthly reporting across 120 client retainers with Digivigee white-label portals.",
      slug: "vanguard-performance-ops",
    },
    createdAt: "2026-01-01T00:00:00Z",
    updatedAt: "2026-01-01T00:00:00Z",
  },
  {
    id: "portfolio-3",
    title: "Cutting Client Creative Approval Cycles by 78% with Interactive Proofing",
    slug: "catalyst-creative-labs",
    clientName: "Catalyst Creative Labs",
    industry: "Creative & Social Agency (London & NYC)",
    category: "Creative Proofing & Workflows",
    categoryKey: "social",
    authorName: "Arjun Mehta",
    authorRole: "Creative Operations Director",
    authorAvatar: "/images/showcase/arjun_studio.jpg",
    heroImage: "/images/showcase/card_approvals.jpg",
    servicesDelivered: ["Visual Approval Kanban", "Multi-Brand Asset DAM", "Creative Proofing Canvas"],
    shortDescription:
      "Streamlined multi-client visual post calendars and instant 1-click proofing links to eliminate email review bottlenecks entirely.",
    challenge:
      "Client review delays stalled over 40% of planned social campaigns, while revision notes were lost across scattered email chains, WhatsApp messages, and Slack threads.",
    strategy:
      "Implemented Digivigee's visual proofing canvas, enabling clients to view scheduled reels, carousels, and ads on a live calendar and annotate revisions directly on media.",
    execution:
      "Migrated 40 active client accounts to Digivigee's asset library with 1-click approval links that require no client login or password friction.",
    results:
      "Average creative approval turnaround dropped from 4.2 days to under 8 hours, increasing monthly creative throughput by 4x without hiring additional designers.",
    testimonialQuote:
      "Creative proofing used to be a nightmare of scattered WhatsApp messages and lost feedback. Digivigee's visual canvas cut approval turnaround from 4 days to 8 hours, supercharging our output by 4x.",
    keyTakeaway:
      "Interactive media markups and friction-free 1-click client approvals eliminated email review drag and 4x'd creative volume.",
    beforePoints: [
      "Creative approvals stalled for 4+ days across messy email threads and WhatsApp chats",
      "Client revision feedback lost or misinterpreted, requiring 3+ rounds of redesigns",
      "Designers spending hours chasing client sign-offs instead of producing assets",
      "Client frustration with missed launch dates and campaign delays",
    ],
    afterPoints: [
      "Interactive visual proofing canvas allowing clients to annotate revisions directly on media",
      "1-click friction-free approval links requiring no client login or password friction",
      "Average creative approval turnaround plummeted from 4.2 days to under 8 hours",
      "Client revision cycles reduced by 62%, unlocking 4x monthly creative throughput",
    ],
    executionMilestones: [
      "Day 1: Centralized 3,400+ creative assets into Digivigee Multi-Brand Asset DAM",
      "Day 2: Set up visual approval kanban workflows and Slack notification triggers",
      "Day 3: Activated 1-click client proofing links across 40 active social accounts",
      "Week 2: Achieved sub-8-hour average creative approval turnaround across all campaigns",
    ],
    metrics: [
      { label: "Approval Turnaround", value: "78% Faster", description: "From 4.2 days down to 8 hrs" },
      { label: "Assets Delivered", value: "3,400+", description: "Reels, carousels & banners" },
      { label: "Client Revisions", value: "-62%", description: "Precise on-canvas annotations" },
      { label: "Creative Throughput", value: "4x Lift", description: "Shipped with existing headcount" },
    ],
    tags: ["Social Media", "Creative Proofing", "Asset Library", "SOPs"],
    isFeatured: true,
    isPublished: true,
    order: 3,
    seo: {
      title: "Catalyst Creative Labs Case Study | Digivigee Agency OS",
      description: "How Catalyst Creative Labs accelerated client creative approvals by 78% using Digivigee interactive proofing.",
      slug: "catalyst-creative-labs",
    },
    createdAt: "2026-01-01T00:00:00Z",
    updatedAt: "2026-01-01T00:00:00Z",
  },
  {
    id: "portfolio-4",
    title: "Automating $180k/mo in Recurring Retainer Billing and SLA Tracking on Autopilot",
    slug: "acuity-media-network",
    clientName: "Acuity Media Network",
    industry: "B2B Demand Gen & SEO Agency",
    category: "Retainer Billing & SLA Guardrails",
    categoryKey: "fullservice",
    authorName: "David Sterling",
    authorRole: "Agency Principal",
    authorAvatar: "/images/showcase/david_studio.jpg",
    heroImage: "/images/showcase/pillar_stripe_billing.jpg",
    servicesDelivered: ["Automated Retainer Contracts", "Stripe Connect Billing", "SLA Guardrails"],
    shortDescription:
      "Consolidated recurring retainer agreements, card-on-file automated billing, and deliverable milestones into a unified agency OS.",
    challenge:
      "Managing recurring invoices manually resulted in 18% delayed payments, severe cash flow friction, and rampant scope creep across high-ticket B2B retainers.",
    strategy:
      "Integrated Digivigee's automated billing engine with Stripe Connect, locking retainer renewals to verified deliverable milestones and automated invoice capture.",
    execution:
      "Automated recurring payment collection on the 1st of every month, paired with automated scope overage warnings that alert account managers before unbilled work begins.",
    results:
      "Zero overdue invoices across 9 consecutive months, with average client retainer value expanding from $3,500 to $12,000/month.",
    testimonialQuote:
      "Delayed invoice payments nearly crippled our cash flow. Digivigee automated our entire $180k monthly retainer billing on Stripe Connect, and we haven't had a single overdue invoice in 9 months.",
    keyTakeaway:
      "Card-on-file automated billing and milestone-locked renewals secured 100% on-time cash flow and trippled average retainer value.",
    beforePoints: [
      "18% of invoices delayed by 30+ days, creating severe working capital strain",
      "Manual contract generation, invoice drafting, and awkward payment follow-up emails",
      "Uncontrolled scope creep with account managers doing unbilled out-of-scope work",
      "Retainer contracts averaging just $3,500/month with high churn risk",
    ],
    afterPoints: [
      "Automated card-on-file retainer collection on the 1st of every month via Stripe Connect",
      "Automated deliverable milestone guardrails that prevent unbilled scope creep",
      "Zero overdue invoices across 9 consecutive months with 100% predictable cash flow",
      "Average retainer value expanded by 310%, growing from $3,500 to $12,000/month",
    ],
    executionMilestones: [
      "Day 1: Connected agency Stripe Connect account with automated billing rules",
      "Day 2: Migrated existing retainer agreements into milestone-backed SLA contracts",
      "Day 3: Enabled card-on-file automated charging for all 24 active B2B clients",
      "Month 1: Reached $180k/mo in zero-touch autopilot billing with 0 overdue accounts",
    ],
    metrics: [
      { label: "Autopilot Billing", value: "$180k/mo", description: "Zero-touch retainer capture" },
      { label: "Overdue Invoices", value: "0 Invoices", description: "100% on-time automated billing" },
      { label: "Avg Retainer Value", value: "+310%", description: "Scaled from $3.5k to $12k/mo" },
      { label: "SLA Compliance", value: "100%", description: "Zero unbilled scope creep" },
    ],
    tags: ["Retainer Billing", "Stripe Connect", "B2B Agency", "SLA Guardrails"],
    isFeatured: true,
    isPublished: true,
    order: 4,
    seo: {
      title: "Acuity Media Network Case Study | Digivigee Agency OS",
      description: "How Acuity Media collected $180k/mo in retainer billing with zero overdue invoices using Digivigee OS.",
      slug: "acuity-media-network",
    },
    createdAt: "2026-01-01T00:00:00Z",
    updatedAt: "2026-01-01T00:00:00Z",
  },
  {
    id: "portfolio-5",
    title: "Consolidating 7 Disjointed Agency SaaS Tools into 1 Unified Operating System",
    slug: "omniscale-growth-partners",
    clientName: "OmniScale Growth Partners",
    industry: "Full-Service Growth Agency",
    category: "Consolidated Agency OS",
    categoryKey: "fullservice",
    authorName: "Sophie Laurent",
    authorRole: "Chief Operating Officer",
    authorAvatar: "/images/showcase/sophie_studio.jpg",
    heroImage: "/images/showcase/collaborate_keynote.jpg",
    servicesDelivered: ["Unified Agency OS", "Capacity Forecasting", "Cross-Pod Workflows"],
    shortDescription:
      "Replaced ClickUp, Harvest, Sheets, DashThis, and Loom with Digivigee OS, slashing $48,000 in annual software seat licenses.",
    challenge:
      "Tool sprawl across 7 different platforms led to duplicated data entry, billing mismatches, and fragmented client communication that threatened agency scalability.",
    strategy:
      "Rolled out Digivigee OS across account management, media buying, SEO, and finance as the single operational source of truth.",
    execution:
      "Completed full agency data migration in 5 business days with automated team permission groups, SOP checklists, and client project templates.",
    results:
      "Cut annual SaaS expenses by $48,000, accelerated team onboarding by 2.4x, and achieved 100% platform adoption across 52 employees.",
    testimonialQuote:
      "We were spending $48,000 a year on 7 disconnected tools and wasting hundreds of hours copying data. Digivigee gave our 52-person team a single operational brain that everyone loves using.",
    keyTakeaway:
      "Consolidating 7 fragmented software tools into one unified agency operating system saved $48k/year and sped up onboarding by 2.4x.",
    beforePoints: [
      "Paying $48k/year across ClickUp, Harvest, Sheets, DashThis, Loom, and HubSpot",
      "Fragmented data silos leading to duplicated data entry and billing discrepancies",
      "New hire account managers taking 3+ weeks before becoming billable",
      "Executive leadership lacking real-time visibility into pod capacity and margins",
    ],
    afterPoints: [
      "Single unified agency OS for CRM, tasks, media buying, proofing, and retainer billing",
      "Eliminated 6 legacy software subscriptions, saving $48,000 in recurring annual licenses",
      "New hires onboarded and billable in just 4 days with built-in agency SOP templates",
      "Real-time capacity forecasting and pod profitability dashboards for leadership",
    ],
    executionMilestones: [
      "Day 1: Migrated agency client directory, retainer contracts, and active projects",
      "Day 3: Standardized operational SOP checklists and pod capacity rules",
      "Day 5: Deprecated 6 legacy tools and unified all 52 employees onto Digivigee OS",
      "Day 30: Achieved 100% platform adoption and saved 320+ hours of duplicate data entry",
    ],
    metrics: [
      { label: "SaaS Cost Reduction", value: "-$48k/yr", description: "Tool consolidation savings" },
      { label: "Team Adoption", value: "100%", description: "Single source of operational truth" },
      { label: "New Hire Onboarding", value: "2.4x Faster", description: "Billable in 4 days" },
      { label: "Active Retainers", value: "52 Accounts", description: "Managed seamlessly" },
    ],
    tags: ["Tool Consolidation", "Agency OS", "Capacity Planning", "Efficiency"],
    isFeatured: false,
    isPublished: true,
    order: 5,
    seo: {
      title: "OmniScale Growth Partners Case Study | Digivigee Agency OS",
      description: "How OmniScale consolidated 7 agency tools and cut $48k in software licenses with Digivigee OS.",
      slug: "omniscale-growth-partners",
    },
    createdAt: "2026-01-01T00:00:00Z",
    updatedAt: "2026-01-01T00:00:00Z",
  },
  {
    id: "portfolio-6",
    title: "Scaling Local Search Operations Across 850+ Franchise Locations with 0 Headcount Addition",
    slug: "zenith-local-media",
    clientName: "Zenith Local Media",
    industry: "Multi-Location Local SEO Agency",
    category: "Local SEO & GBP Automation",
    categoryKey: "localseo",
    authorName: "Marcus Thorne",
    authorRole: "VP Local Search & Franchises",
    authorAvatar: "/images/showcase/enterprise_support_pro.jpg",
    heroImage: "/images/showcase/card_seo.jpg",
    servicesDelivered: ["Multi-Location GBP Sync", "Automated Local Audits", "Geo-Grid Rank Tracker"],
    shortDescription:
      "Automated Google Business Profile synchronization and geo-grid rank scorecards enabled an 8-person SEO pod to manage 850+ locations.",
    challenge:
      "Verifying local NAP citations, review responses, and Map Pack rankings across hundreds of franchise locations manually was impossible to scale profitably.",
    strategy:
      "Connected Digivigee's Local Rank Architecture to automatically audit citation health, track keyword ranks across geo-coordinates, and trigger review alerts.",
    execution:
      "Automated scheduled weekly audit scorecards delivered straight to franchise owners via white-labeled emails with zero manual intervention.",
    results:
      "Maintained 99.8% citation accuracy, improved top-3 Map Pack presence by 340%, and scaled agency gross margin to 76%.",
    testimonialQuote:
      "Managing 850 franchise locations manually was a total nightmare. Digivigee's automated geo-grid tracking and multi-location GBP sync allowed our 8-person team to deliver an astonishing 76% gross margin.",
    keyTakeaway:
      "Automated GBP multi-location sync and geo-grid audit scorecards allowed an 8-person pod to profitably scale 850+ client locations.",
    beforePoints: [
      "8-person team drowning in manual NAP verification across 850+ individual locations",
      "Franchise owners constantly complaining about lack of local Map Pack visibility",
      "Manual review monitoring taking up hours of staff time every single day",
      "Agency gross margin suppressed at 41% due to extreme operational labor overhead",
    ],
    afterPoints: [
      "Automated Google Business Profile synchronization across all 850+ franchise sites",
      "Geo-grid coordinate rank scorecards emailed automatically to franchise owners weekly",
      "Top-3 local Map Pack rankings improved by 340% across target metropolitan areas",
      "Agency gross margin expanded from 41% to 76% with zero additional staff hired",
    ],
    executionMilestones: [
      "Day 1: Connected multi-location Google Business Profile API and citation audit engine",
      "Day 2: Set up automated geo-grid rank tracking across 850+ franchise coordinates",
      "Day 3: Launched automated weekly white-label performance scorecards to franchise owners",
      "Day 14: Onboarded new franchise locations in under 15 minutes per site",
    ],
    metrics: [
      { label: "Locations Handled", value: "850+ Sites", description: "Managed by an 8-person pod" },
      { label: "Map Pack Lift", value: "+340%", description: "Top 3 local search positions" },
      { label: "Agency Gross Margin", value: "76%", description: "High-efficiency operational scale" },
      { label: "Client Onboarding", value: "15 Minutes", description: "Automated location ingestion" },
    ],
    tags: ["Local SEO", "Multi-Location", "GBP Automation", "Franchise Scale"],
    isFeatured: false,
    isPublished: true,
    order: 6,
    seo: {
      title: "Zenith Local Media Case Study | Digivigee Agency OS",
      description: "How Zenith scaled local SEO across 850+ locations with an 8-person team using Digivigee Local Rank Architecture.",
      slug: "zenith-local-media",
    },
    createdAt: "2026-01-01T00:00:00Z",
    updatedAt: "2026-01-01T00:00:00Z",
  },
];

