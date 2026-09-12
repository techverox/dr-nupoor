import { ServiceItem } from "@/types";

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: "service-1",
    title: "Social Media Delivery Engine",
    subtitle: "Multi-client visual calendars & 1-click approvals",
    slug: "social-media-marketing",
    shortDescription:
      "Deploy standardized multi-client social pipelines, visual buffer calendars, and 1-click white-label client approvals across all active agency accounts.",
    detailedDescription:
      "Eliminate spreadsheet chaos and approval bottlenecks. The Social Media Delivery Engine equips your agency with multi-client visual calendars, direct Instagram/TikTok/LinkedIn publishing, automated client feedback loops, and 1-click white-label proofing links that require zero client logins.",
    problemStatement:
      "Account managers spending 15+ hours weekly chasing client email approvals, formatting spreadsheets, and missing publishing deadlines.",
    solutionStatement:
      "Deploy a unified multi-client visual calendar with white-label client approval links, automated buffer queues, and instant client feedback canvas.",
    outcomeStatement:
      "Zero client approval delays, 78% faster sign-offs, and 3x more retainer accounts managed per social media strategist.",
    order: 1,
    isPublished: true,
    isFeatured: true,
    capabilities: [
      {
        title: "Multi-Client Visual Calendar",
        description: "Color-coded master schedule across all client accounts with drag-and-drop rescheduling.",
      },
      {
        title: "1-Click Client Proofing Portal",
        description: "Passwordless client review links where clients approve or annotate changes with one click.",
      },
      {
        title: "Hook-Driven Reels Pipeline",
        description: "Standardized vertical video workflows from raw script to edited master with version tracking.",
      },
      {
        title: "Community & Lead Inbox Workflows",
        description: "Unified multi-client DM and comment streams with automated canned responses and lead tagging.",
      },
      {
        title: "Automated Buffer Publishing Queue",
        description: "Direct algorithmic posting to Instagram, TikTok, Facebook, LinkedIn, and YouTube Shorts.",
      },
      {
        title: "White-Label Performance Scorecards",
        description: "Automated monthly engagement and audience growth reports branded with your agency logo.",
      },
    ],
    benefits: [
      {
        title: "Scale Retainer Capacity",
        description: "Enable each social media manager to handle 15+ active client retainers without quality degradation.",
      },
      {
        title: "Accelerate Client Approvals",
        description: "Cut approval turnaround from 4 days down to under 8 hours with frictionless proofing links.",
      },
      {
        title: "Zero Missed Post Deadlines",
        description: "Automate delivery queues with smart fallback triggers and client reminder notifications.",
      },
      {
        title: "Premium White-Label Experience",
        description: "Impress high-ticket retainer clients with enterprise-grade branded dashboards and reports.",
      },
    ],
    deliverables: [
      "Standardized SOPs & Retainer Milestones",
      "Multi-Client Visual Scheduling & Buffer Queue",
      "1-Click Client Proofing & Feedback Portal",
      "Automated Engagement & Lead Response Workflows",
      "White-Label Performance Scorecards & Reporting",
      "Monthly SLA & Retainer Deliverable Audit",
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
        ctaText: "Deploy Workflow",
        ctaLink: "/contact?service=social-media-marketing&package=starter-pod",
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
        ctaText: "Deploy Workflow",
        ctaLink: "/contact?service=social-media-marketing&package=growth-engine",
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
          "Automated Overspend & Deliverable Guardrails",
        ],
        isPopular: false,
        ctaText: "Deploy Workflow",
        ctaLink: "/contact?service=social-media-marketing&package=enterprise-cluster",
      },
    ],
    faqs: [
      {
        question: "How does the client approval portal work?",
        answer:
          "Your team schedules social posts in Digivigee and generates a 1-click review link. Clients view posts in a mock feed or calendar, leave visual annotations, and approve posts with one click—no login or password required.",
      },
      {
        question: "Can we fully white-label the portal with our agency branding?",
        answer:
          "Yes! Growth and Enterprise tiers include full white-label capabilities: custom subdomains (portal.youragency.com), custom brand colors, agency logos, and customized notification emails.",
      },
      {
        question: "Does Digivigee publish directly to social networks?",
        answer:
          "Yes. Once approved by the client, posts are automatically scheduled and published directly to Instagram, Facebook, LinkedIn, TikTok, and YouTube via official APIs.",
      },
      {
        question: "Can we customize deliverables for each client retainer?",
        answer:
          "Yes. You can define custom deliverable quotas (e.g. 16 reels/mo, 4 carousels/mo) per client workspace and track fulfillment progress automatically in real time.",
      },
    ],
    relatedServiceSlugs: ["performance-marketing", "content-creation", "lead-generation-and-automation"],
    relatedPortfolioSlugs: ["catalyst-creative-labs", "vanguard-performance-ops"],
    seo: {
      title: "Social Media Delivery Engine for Agencies | Digivigee OS",
      description:
        "Scale agency social media retainers with multi-client visual calendars, 1-click white-label approvals, and automated reporting.",
      slug: "social-media-marketing",
    },
    createdAt: "2026-01-01T00:00:00Z",
    updatedAt: "2026-01-01T00:00:00Z",
  },
  {
    id: "service-2",
    title: "Performance Ad Ops Engine",
    subtitle: "Multi-account pacing & automated CAPI telemetry",
    slug: "performance-marketing",
    shortDescription:
      "Multi-account ad budget pacing, automated Meta & Google CAPI telemetry, and cross-channel ROAS dashboards built for media buying teams.",
    detailedDescription:
      "Eliminate ad account chaos, accidental budget overspends, and manual spreadsheet reporting. The Performance Ad Ops Engine connects all your client ad accounts into a centralized command center with automated budget pacing, live blended ROAS calculation, and automated weekly client updates.",
    problemStatement:
      "Media buyers logging into 40 separate ad accounts daily, risking accidental overspends and wasting days assembling manual client reporting decks.",
    solutionStatement:
      "Centralize multi-account budget pacing with automated spend guardrails, unified cross-platform ROAS feeds, and white-label client dashboards.",
    outcomeStatement:
      "Eliminate ad overspend risks entirely, automate 65+ hours of monthly reporting, and increase media buyer account capacity by 400%.",
    order: 2,
    isPublished: true,
    isFeatured: true,
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
        title: "Automated Client Performance Dashboards",
        description: "Live white-label client links showing verified campaign KPIs without manual deck preparation.",
      },
      {
        title: "Creative Fatigue & Anomaly Detection",
        description: "Algorithmic alerts when CPA spikes or CTR drops below historical target thresholds.",
      },
      {
        title: "Server-Side CAPI & Pixel Health",
        description: "Continuous telemetry on Conversion API signal quality and Event Match Quality scores.",
      },
      {
        title: "Executive Retainer Attribution",
        description: "Clear multi-touch attribution models demonstrating the true commercial return of agency media spend.",
      },
    ],
    benefits: [
      {
        title: "Prevent Costly Overspends",
        description: "Automated budget caps and pacing alerts eliminate human errors during high-spend scaling campaigns.",
      },
      {
        title: "Automate 60+ Hours of Reporting",
        description: "Replace repetitive monthly Google Slides decks with always-live executive client dashboards.",
      },
      {
        title: "Manage 4x More Ad Spend",
        description: "Equip media buyers with high-level command views so they spend time strategizing, not copying data.",
      },
      {
        title: "Improve Client Retention",
        description: "Transparent, real-time attribution builds trust and prevents client churn during seasonal volatility.",
      },
    ],
    deliverables: [
      "Cross-Channel Pacing Guardrails & Overspend Alerts",
      "Live Blended ROAS & MER Telemetry Feeds",
      "Automated Weekly Client Performance Dashboards",
      "Multi-Account Rule Automation & Creative Fatigue Alerts",
      "First-Party Server-Side CAPI & Pixel Health Monitor",
      "Executive Retainer Attribution Audit Summaries",
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
        ctaText: "Deploy Workflow",
        ctaLink: "/contact?service=performance-marketing&package=starter-pod",
      },
      {
        id: "perf-scale",
        name: "Scale Media Buyer Hub",
        price: "$1,399",
        billingPeriod: "monthly",
        description: "Complete performance operations engine for agencies managing up to $500k/mo ad spend.",
        features: [
          "Up to 45 Connected Ad Accounts",
          "Blended ROAS & MER Calculations",
          "100% White-Label Client Dashboards",
          "Creative Fatigue & CPA Spike Alerts",
          "Shopify & Stripe Revenue Reconciliation",
          "Automated Weekly Client Email Summaries",
        ],
        isPopular: true,
        ctaText: "Deploy Workflow",
        ctaLink: "/contact?service=performance-marketing&package=scale-hub",
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
        ctaLink: "/contact?service=performance-marketing&package=enterprise-cluster",
      },
    ],
    faqs: [
      {
        question: "Which ad platforms does the Ad Ops Engine integrate with?",
        answer:
          "Digivigee natively integrates with Meta Ads, Google Ads, TikTok Ads, YouTube Ads, LinkedIn Ads, Shopify, and Stripe for end-to-end attribution and spend pacing.",
      },
      {
        question: "How does budget pacing alert our media buyers?",
        answer:
          "You configure monthly budgets and target pacing curves. If an ad account spends 10% above or below target pacing, instant alerts are dispatched via Slack, Teams, or email.",
      },
    ],
    relatedServiceSlugs: ["social-media-marketing", "website-design-and-development", "lead-generation-and-automation"],
    relatedPortfolioSlugs: ["apex-digital-media", "vanguard-performance-ops"],
    seo: {
      title: "Performance Ad Ops Engine for Agencies | Digivigee OS",
      description:
        "Multi-account ad budget pacing, automated ROAS dashboards, and CAPI telemetry built for digital marketing agencies.",
      slug: "performance-marketing",
    },
    createdAt: "2026-01-01T00:00:00Z",
    updatedAt: "2026-01-01T00:00:00Z",
  },
  {
    id: "service-3",
    title: "Creative Production & Proofing",
    subtitle: "Collaborative asset library & client markup canvas",
    slug: "content-creation",
    shortDescription:
      "Centralized multi-client digital asset management, brand kit version control, and real-time client markup canvas for rapid creative sign-offs.",
    detailedDescription:
      "Transform creative production from a chaotic back-and-forth into an assembly line of high-converting assets. Organize client brand guidelines, video scripts, raw footage, and finished deliverables in dedicated client workspaces with visual annotation and instant client approvals.",
    problemStatement:
      "Designers drowning in scattered Google Drive folders, contradictory Slack client feedback, and unorganized ad creative iterations.",
    solutionStatement:
      "Unify creative production with interactive asset proofing, centralized client brand libraries, and direct markup feedback loops.",
    outcomeStatement:
      "Cut creative revision cycles by 70%, eliminate lost assets, and accelerate ad creative turnaround to under 24 hours.",
    order: 3,
    isPublished: true,
    isFeatured: true,
    capabilities: [
      {
        title: "Visual Annotation & Markup Canvas",
        description: "Point-and-click visual commenting directly on static graphics, carousel slides, and video frames.",
      },
      {
        title: "Multi-Brand Digital Asset Library",
        description: "Centralized DAM storing logos, typography, fonts, color swatches, and licensed assets per client.",
      },
      {
        title: "Script-to-Screen Reel Workflows",
        description: "Structured production pipelines from hook ideation to script approval and final video render.",
      },
      {
        title: "Automated Version History",
        description: "Clear side-by-side comparisons of v1, v2, and final approved creative assets.",
      },
      {
        title: "Creative Fatigue Tracking",
        description: "Cross-references creative IDs with performance ad ops to identify when winning ads burn out.",
      },
      {
        title: "Cloud Sync Connectors",
        description: "Direct asset ingestion from Figma, Adobe Creative Cloud, Frame.io, and Google Drive.",
      },
    ],
    benefits: [
      {
        title: "Rapid 24-Hour Creative Turnaround",
        description: "Clear visual feedback eliminates ambiguous email revision requests and lengthy review calls.",
      },
      {
        title: "Eliminate Missing Brand Assets",
        description: "Every designer has instant access to approved client fonts, vector logos, and brand color hexes.",
      },
      {
        title: "Protect Creative Margins",
        description: "Track revision rounds per deliverable to prevent client scope creep and unpaid re-edits.",
      },
      {
        title: "Higher Ad Conversion Rates",
        description: "Systematically test and iterate winning visual hooks based on ad performance telemetry.",
      },
    ],
    deliverables: [
      "Real-Time Collaborative Visual Proofing Canvas",
      "Centralized Brand Kit & Multi-Client DAM",
      "Automated Creative Refresh & SLA Escalation Alerts",
      "Figma & Adobe Direct Cloud Sync Connectors",
      "Hook-Driven Vertical Video Storyboard Templates",
      "Automated Asset Handoff & Version History",
    ],
    packages: [
      {
        id: "content-starter",
        name: "Creative Pod Hub",
        price: "$549",
        billingPeriod: "monthly",
        description: "Essential proofing and digital asset management for boutique creative teams.",
        features: [
          "Up to 15 Client Brand Libraries",
          "Interactive Visual Proofing Canvas",
          "Video Frame-by-Frame Annotations",
          "1-Click Client Review Links",
          "Version History & Comparison",
        ],
        isPopular: false,
        ctaText: "Deploy Workflow",
        ctaLink: "/contact?service=content-creation&package=creative-pod",
      },
      {
        id: "content-pro",
        name: "Studio Production Engine",
        price: "$1,199",
        billingPeriod: "monthly",
        description: "Full-scale creative operations engine for high-velocity agency studios.",
        features: [
          "Unlimited Client Brand Libraries",
          "White-Label Proofing Portals",
          "Creative Fatigue Performance Tracking",
          "Figma & Adobe Cloud Direct Sync",
          "Automated Revision Round Enforcers",
          "High-Priority Studio Support SLA",
        ],
        isPopular: true,
        ctaText: "Deploy Workflow",
        ctaLink: "/contact?service=content-creation&package=studio-engine",
      },
      {
        id: "content-enterprise",
        name: "Enterprise Studio Cluster",
        price: "$2,299",
        billingPeriod: "monthly",
        description: "High-throughput creative engine for global marketing agencies and brand studios.",
        features: [
          "Unlimited Multi-Client Workspaces",
          "Dedicated Senior Art Director SLA",
          "Custom Brand Guidelines Engine",
          "Enterprise Asset Security & DRM",
          "Automated Creative Fatigue API",
          "Sub-15m Priority SLA Support",
        ],
        isPopular: false,
        ctaText: "Deploy Studio Cluster",
        ctaLink: "/contact?service=content-creation&package=enterprise-cluster",
      },
    ],
    faqs: [
      {
        question: "Can clients leave comments on specific seconds of video reels?",
        answer:
          "Yes! Clients can pause vertical video reels, scrub through frames, and click anywhere on the video canvas to leave time-coded visual feedback.",
      },
    ],
    relatedServiceSlugs: ["social-media-marketing", "website-design-and-development"],
    relatedPortfolioSlugs: ["catalyst-creative-labs", "apex-digital-media"],
    seo: {
      title: "Agency Creative Production & Proofing Engine | Digivigee OS",
      description:
        "Centralize multi-client asset libraries, visual video proofing, and 1-click approvals for digital marketing agencies.",
      slug: "content-creation",
    },
    createdAt: "2026-01-01T00:00:00Z",
    updatedAt: "2026-01-01T00:00:00Z",
  },
  {
    id: "service-4",
    title: "High-Speed Client Web Engines",
    subtitle: "Next.js performance stacks & conversion architecture",
    slug: "website-design-and-development",
    shortDescription:
      "Deploy sub-second Next.js conversion stacks, high-converting funnel architectures, and automated Core Web Vitals monitors for client retainers.",
    detailedDescription:
      "Build and maintain client web assets on an enterprise Next.js foundation. Eliminate slow WordPress plugins and security vulnerabilities with modern, sub-second conversion architectures that boost paid ad landing page conversion rates and SEO rankings.",
    problemStatement:
      "Agencies delivering slow, bloated WordPress sites that break after updates, suffer poor mobile conversions, and frustrate clients.",
    solutionStatement:
      "Standardize client web delivery on enterprise Next.js stacks with pre-configured conversion blocks, instant API sync, and sub-second speed.",
    outcomeStatement:
      "99+ Core Web Vitals scores, 60% lower client bounce rates, and 2.8x higher inbound inquiry conversion rates.",
    order: 4,
    isPublished: true,
    isFeatured: true,
    capabilities: [
      {
        title: "Sub-Second Next.js Architecture",
        description: "Static generation and dynamic server components engineered for 99+ PageSpeed scores.",
      },
      {
        title: "Pre-Built Conversion Funnels",
        description: "Multi-step quotation calculators, lead capture modules, and instant WhatsApp booking triggers.",
      },
      {
        title: "Continuous Core Web Vitals Monitoring",
        description: "Automated telemetry tracking LCP, FID, and CLS across all active client websites.",
      },
      {
        title: "Automated Headless CMS Connectors",
        description: "Self-serve content management portals allowing clients to edit copy without breaking layout code.",
      },
      {
        title: "Enterprise Edge Deployment",
        description: "Global CDN distribution with automated SSL, DDoS mitigation, and 99.99% uptime guarantees.",
      },
      {
        title: "Technical Schema & Meta Architecture",
        description: "Automated JSON-LD rich snippet generation for local business, product, and review schemas.",
      },
    ],
    benefits: [
      {
        title: "Drastically Higher Ad Conversion",
        description: "Sub-second landing page load times decrease paid ad bounce rates and lift ROAS by up to 35%.",
      },
      {
        title: "Eliminate WordPress Maintenance Hell",
        description: "No plugin conflicts, database crashes, or security hacks to troubleshoot on weekends.",
      },
      {
        title: "Higher Retainer Value",
        description: "Package high-speed web hosting and continuous conversion rate optimization into premium retainers.",
      },
    ],
    deliverables: [
      "Sub-Second Next.js Stacks with 99+ Performance Scores",
      "Dynamic Schema & Structured Metadata Architecture",
      "High-Converting Retainer Lead Capture Modules",
      "Automated Uptime & SLA Performance Monitoring",
      "Frictionless WhatsApp & Multi-CRM Webhook Sync",
      "Zero-Downtime Global Edge Deployment Pipeline",
    ],
    packages: [
      {
        id: "web-starter",
        name: "Starter Web Pod",
        price: "$899",
        billingPeriod: "monthly",
        description: "Sub-second Next.js landing page & conversion funnels for boutique client retainers.",
        features: [
          "Next.js Modern Architecture",
          "Top Core Web Vitals (98+ PageSpeed)",
          "Lead Capture & WhatsApp Integration",
          "Technical SEO Schema Setup",
          "Automated Global Edge CDN",
        ],
        isPopular: false,
        ctaText: "Deploy Web Engine",
        ctaLink: "/contact?service=website-design-and-development&package=starter-web",
      },
      {
        id: "web-growth",
        name: "High-Speed Growth Stack",
        price: "$1,699",
        billingPeriod: "monthly",
        description: "Full-scale conversion architecture and multi-funnel web stack for scaling brands.",
        features: [
          "Full Next.js Multi-Page Web Stack",
          "Dynamic Headless CMS Integration",
          "Real-Time Conversion Rate Testing",
          "Sub-Second Core Web Vitals SLA",
          "Multi-CRM & WhatsApp Webhooks",
          "24/7 Edge Uptime Monitoring",
        ],
        isPopular: true,
        ctaText: "Deploy Growth Stack",
        ctaLink: "/contact?service=website-design-and-development&package=growth-stack",
      },
      {
        id: "web-enterprise",
        name: "Enterprise Headless Engine",
        price: "$3,299",
        billingPeriod: "monthly",
        description: "Enterprise digital product infrastructure, custom API microservices, and global edge CDNs.",
        features: [
          "Custom Full-Stack Next.js Stacks",
          "Multi-Tenant Enterprise Architecture",
          "High-Frequency A/B Testing Engine",
          "Dedicated Solutions Architect",
          "99.99% Global Uptime SLA",
          "SOC-2 Type II Compliance Ready",
        ],
        isPopular: false,
        ctaText: "Deploy Enterprise Stack",
        ctaLink: "/contact?service=website-design-and-development&package=enterprise-engine",
      },
    ],
    faqs: [
      {
        question: "Why should an agency build on Next.js instead of WordPress?",
        answer:
          "Next.js delivers sub-second load times, superior Core Web Vitals, and eliminates plugin security vulnerabilities. This directly lowers paid ad bounce rates and gives your agency a modern, high-margin competitive advantage.",
      },
    ],
    relatedServiceSlugs: ["seo-and-local-seo", "performance-marketing", "lead-generation-and-automation"],
    relatedPortfolioSlugs: ["acuity-media-network", "omniscale-growth-partners"],
    seo: {
      title: "Agency Next.js Web Delivery Engine | Digivigee OS",
      description:
        "High-performance Next.js website architecture and conversion landing page engines for digital marketing agencies.",
      slug: "website-design-and-development",
    },
    createdAt: "2026-01-01T00:00:00Z",
    updatedAt: "2026-01-01T00:00:00Z",
  },
  {
    id: "service-5",
    title: "SEO & Local Rank Architecture",
    subtitle: "Automated GBP audit scorecards & rank tracking",
    slug: "seo-and-local-seo",
    shortDescription:
      "Automate Google Business Profile sync, local Map Pack audits, and multi-location rank tracking engines across your entire client portfolio.",
    detailedDescription:
      "Scale local SEO and national search operations without drowning in manual spreadsheet audits. The SEO & Local Rank Architecture provides multi-location Google Business Profile management, automated local citation auditing, live geo-grid keyword tracking, and scheduled white-label client search reports.",
    problemStatement:
      "Managing local rankings across dozens of client locations manually with disconnected spreadsheets and slow screenshot reports.",
    solutionStatement:
      "Deploy automated multi-location GBP synchronization, live geo-grid keyword tracking, and scheduled white-label search reports.",
    outcomeStatement:
      "#1 Map Pack positioning, automated rank monitoring for 100+ clients, and zero manual reporting hours for SEO teams.",
    order: 5,
    isPublished: true,
    isFeatured: true,
    capabilities: [
      {
        title: "Multi-Location GBP Sync",
        description: "Centralized Google Business Profile management across hundreds of client franchise locations.",
      },
      {
        title: "Live Geo-Grid Rank Tracking",
        description: "Visual heatmaps tracking local Map Pack positions across exact latitude/longitude coordinates.",
      },
      {
        title: "Automated Citation Health Audits",
        description: "Continuous NAP consistency monitoring across 50+ tier-1 business directories.",
      },
      {
        title: "Review Generation & Response Bots",
        description: "Automated SMS/email review invitation workflows with AI sentiment analysis and response drafts.",
      },
      {
        title: "Technical SEO Audit Scanner",
        description: "Scheduled crawl reports detecting broken internal links, schema errors, and indexing issues.",
      },
      {
        title: "Scheduled White-Label Search Reports",
        description: "Automated PDF and web reports showing organic traffic, keyword movement, and call volume.",
      },
    ],
    benefits: [
      {
        title: "Manage 10x More Locations",
        description: "An 8-person SEO pod can manage 800+ local client locations with automated sync and alert triggers.",
      },
      {
        title: "Demonstrate Visual Map Pack ROI",
        description: "Geo-grid heatmaps give clients undeniable visual evidence of ranking improvements.",
      },
      {
        title: "Zero Manual Audit Overhead",
        description: "Automated weekly health scans free SEO account directors to focus on strategy and retainer upselling.",
      },
    ],
    deliverables: [
      "Automated Multi-Location GBP Sync & Scorecards",
      "Live Geo-Grid Keyword Rank Tracking Engine",
      "White-Label Client Search Visibility Reports",
      "Automated Review Generation & Response Triggers",
      "Local Citation Health & NAP Consistency Monitor",
      "Automated Algorithmic Ranking Fluctuation Alerts",
    ],
    packages: [
      {
        id: "seo-local",
        name: "Local Agency Pod",
        price: "$599",
        billingPeriod: "monthly",
        description: "Multi-location local SEO and GBP automation for local marketing agencies.",
        features: [
          "Up to 25 Google Business Profiles",
          "Geo-Grid Map Pack Rank Tracking",
          "Automated Citation Health Audits",
          "White-Label Client Ranking Reports",
          "Review Request Automation Funnels",
        ],
        isPopular: false,
        ctaText: "Deploy Workflow",
        ctaLink: "/contact?service=seo-and-local-seo&package=local-pod",
      },
      {
        id: "seo-growth",
        name: "National Search Engine",
        price: "$1,299",
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
        ctaText: "Deploy Workflow",
        ctaLink: "/contact?service=seo-and-local-seo&package=national-engine",
      },
      {
        id: "seo-enterprise",
        name: "Enterprise Multi-Location Cluster",
        price: "$2,299",
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
        ctaText: "Deploy Search Cluster",
        ctaLink: "/contact?service=seo-and-local-seo&package=enterprise-cluster",
      },
    ],
    faqs: [
      {
        question: "How do geo-grid rank heatmaps work?",
        answer:
          "Digivigee scans Google Maps search queries at specified geographic coordinate radiuses (e.g. 5km, 10km) around your client's physical location, generating a visual color-coded grid showing rank positions 1 through 20+.",
      },
    ],
    relatedServiceSlugs: ["website-design-and-development", "content-creation"],
    relatedPortfolioSlugs: ["zenith-local-media", "acuity-media-network"],
    seo: {
      title: "Agency Local SEO & GBP Rank Architecture | Digivigee OS",
      description:
        "Multi-location Google Business Profile sync, geo-grid rank tracking, and automated reporting for SEO agencies.",
      slug: "seo-and-local-seo",
    },
    createdAt: "2026-01-01T00:00:00Z",
    updatedAt: "2026-01-01T00:00:00Z",
  },
  {
    id: "service-6",
    title: "Lead Flow & Retainer Automation",
    subtitle: "Multi-client CRM sync & automated billing rules",
    slug: "lead-generation-and-automation",
    shortDescription:
      "Automate client onboarding pipelines, multi-tenant CRM routing, and zero-touch recurring retainer billing with automated Stripe Connect rules.",
    detailedDescription:
      "Eliminate manual invoice chasing and messy client onboarding. The Lead Flow & Retainer Automation module standardizes your entire client journey: digital service agreements, automated recurring retainer billing, multi-channel CRM lead routing, and client SLA deliverable tracking.",
    problemStatement:
      "Inconsistent retainer billing, delayed invoice collections, messy client onboarding, and leads slipping through cracks.",
    solutionStatement:
      "Automate recurring retainer subscriptions, contract sign-offs, instant CRM lead dispatch, and client SLA guardrails in one OS.",
    outcomeStatement:
      "Zero overdue client invoices, 100% automated onboarding workflows, and seamless recurring revenue predictability.",
    order: 6,
    isPublished: true,
    isFeatured: true,
    capabilities: [
      {
        title: "Stripe Connect Retainer Autopilot",
        description: "Automated recurring credit card and ACH billing on the 1st of every month with zero manual invoicing.",
      },
      {
        title: "Automated Client Onboarding SOPs",
        description: "Self-serve client onboarding wizards collecting brand assets, access permissions, and billing info.",
      },
      {
        title: "Multi-Tenant CRM Lead Routing",
        description: "Instant lead ingestion from landing pages directly to client CRM pipelines via webhooks.",
      },
      {
        title: "SLA Guardrails & Overage Tracking",
        description: "Automated scope trackers that alert agency leadership before unbilled extra work begins.",
      },
      {
        title: "WhatsApp & SMS Alert Dispatches",
        description: "Real-time mobile notifications dispatched to client sales reps the moment high-intent leads submit.",
      },
      {
        title: "White-Label Client Account Management",
        description: "Client-facing portals where clients manage payment methods, download invoices, and review active scopes.",
      },
    ],
    benefits: [
      {
        title: "Accelerate Retainer Cash Collection",
        description: "Card-on-file automated billing eliminates overdue receivables and cash flow uncertainty.",
      },
      {
        title: "Onboard Clients in 15 Minutes",
        description: "Automated intake forms replace disjointed onboarding calls and repetitive email requests.",
      },
      {
        title: "Stop Unpaid Scope Creep",
        description: "Built-in deliverable quotas ensure your agency gets paid for every extra revision or asset shipped.",
      },
    ],
    deliverables: [
      "Stripe Connect Recurring Retainer Autopilot",
      "Automated Client Onboarding & SLA Tracker",
      "Multi-Channel CRM Routing & Lead Notification Bots",
      "White-Label Client Account Management Portals",
      "Automated Retainer Scope & Overage Enforcement",
      "Direct Webhook Dispatches for Zapier & Make",
    ],
    packages: [
      {
        id: "lead-starter",
        name: "Retainer Flow Starter",
        price: "$699",
        billingPeriod: "monthly",
        description: "Automated retainer invoicing and CRM lead routing for boutique agency workflows.",
        features: [
          "Stripe Connect Retainer Autopilot",
          "Automated Client Intake Wizards",
          "Multi-CRM Lead Routing Pipelines",
          "SLA Scope Overage Warning System",
          "White-Label Client Billing Portals",
        ],
        isPopular: false,
        ctaText: "Deploy Retainer Pod",
        ctaLink: "/contact?service=lead-generation-and-automation&package=starter-flow",
      },
      {
        id: "lead-growth",
        name: "Agency Autopilot Engine",
        price: "$1,299",
        billingPeriod: "monthly",
        description: "Full-scale retainer automation, automated contract agreements, and instant CRM lead dispatch.",
        features: [
          "Automated Multi-Client Retainer Subscriptions",
          "Instant Contract E-Sign & Onboarding",
          "Multi-Tenant CRM Lead Dispatch",
          "Automated Scope Creep & Retainer Overage Alerts",
          "Custom White-Label Billing Domain",
          "Priority Technical Support SLA",
        ],
        isPopular: true,
        ctaText: "Deploy Autopilot Engine",
        ctaLink: "/contact?service=lead-generation-and-automation&package=autopilot-engine",
      },
      {
        id: "lead-enterprise",
        name: "Enterprise Ops Architecture",
        price: "$2,399",
        billingPeriod: "monthly",
        description: "Custom ERP sync, enterprise billing rules, and multi-tier agency client operations.",
        features: [
          "Custom Billing Rules & ACH Support",
          "Unlimited Client Portals & Workspaces",
          "Dedicated Systems Architect",
          "Enterprise Accounting & Tax API Sync",
          "Full Custom Webhook Integrations",
          "Sub-15m Support SLA Guarantee",
        ],
        isPopular: false,
        ctaText: "Deploy Ops Architecture",
        ctaLink: "/contact?service=lead-generation-and-automation&package=enterprise-ops",
      },
    ],
    faqs: [
      {
        question: "How does the automated retainer billing work?",
        answer:
          "You set up client retainer tiers in Digivigee OS. On the renewal date, Digivigee automatically charges the client's card or ACH via Stripe, dispatches the receipt, and updates the client's deliverable quota for the new billing cycle.",
      },
    ],
    relatedServiceSlugs: ["performance-marketing", "website-design-and-development"],
    relatedPortfolioSlugs: ["acuity-media-network", "omniscale-growth-partners"],
    seo: {
      title: "Agency Retainer Billing & Lead Automation Engine | Digivigee OS",
      description:
        "Automated retainer billing, client onboarding pipelines, and CRM routing built for scaling digital marketing agencies.",
      slug: "lead-generation-and-automation",
    },
    createdAt: "2026-01-01T00:00:00Z",
    updatedAt: "2026-01-01T00:00:00Z",
  },
  {
    id: "service-7",
    title: "Brand Strategy & Visual Architecture",
    slug: "brand-strategy",
    shortDescription:
      "Deploy enterprise brand design systems, high-ticket positioning matrices, and multi-channel asset tokens that command premium client retainers.",
    detailedDescription:
      "Transform commodity agency services into high-ticket enterprise partnerships. The Brand Strategy & Visual Architecture engine standardizes your brand positioning, typography systems, vector UI design tokens, client pitch decks, and brand governance guidelines across all marketing touchpoints.",
    problemStatement:
      "Agencies losing high-ticket RFPs to legacy design firms due to fragmented visual guidelines, generic pitch assets, and inconsistent brand positioning.",
    solutionStatement:
      "Deploy systematic brand architecture: audited positioning matrices, comprehensive Figma design token libraries, and executive visual guidelines.",
    outcomeStatement:
      "3.2x higher retainer win rates, enterprise brand credibility, and unified multi-channel visual cohesion across all active campaigns.",
    order: 7,
    isPublished: true,
    isFeatured: true,
    capabilities: [
      {
        title: "Enterprise Design System & Tokens",
        description: "Comprehensive Figma libraries with semantic color palettes, typography scales, and responsive UI components.",
      },
      {
        title: "High-Ticket Brand Positioning",
        description: "Competitor gap analysis, ICP value proposition frameworks, and category-defining brand narratives.",
      },
      {
        title: "Multi-Channel Brand Governance",
        description: "Automated brand guideline portals ensuring strict visual consistency across social, web, and paid media.",
      },
      {
        title: "Vector Logo & Identity Systems",
        description: "Scalable responsive mark systems, iconography libraries, and dynamic animation guidelines.",
      },
      {
        title: "Executive Pitch & Sales Collateral",
        description: "High-converting proposal templates, case study frameworks, and interactive executive presentation decks.",
      },
      {
        title: "Brand Asset DAM Workflows",
        description: "Centralized cloud asset management with instant format conversions and version control.",
      },
    ],
    benefits: [
      {
        title: "Command Enterprise Retainer Pricing",
        description: "Position your agency as an indispensable strategic partner rather than a low-cost execution vendor.",
      },
      {
        title: "Accelerate RFP Win Rates",
        description: "Equip your sales team with world-class visual collateral that outshines traditional enterprise competitors.",
      },
      {
        title: "Zero Brand Dilution",
        description: "Centralized design tokens prevent inconsistent typography, off-brand colors, and unapproved asset usage.",
      },
      {
        title: "Rapid Asset Production",
        description: "Reusable component tokens cut creative asset turnaround times by over 60% across all client accounts.",
      },
    ],
    deliverables: [
      "Audited Enterprise Brand Positioning Blueprint",
      "Comprehensive Figma Design System & UI Token Library",
      "Vector Logo Mark, Iconography & Typography Scale",
      "Digital Brand Governance & Identity Guidelines Portal",
      "Executive Pitch Deck & Retainer Proposal Frameworks",
      "High-Resolution Multi-Channel Digital Asset Pack",
    ],
    packages: [
      {
        id: "brand-foundations",
        name: "Brand Foundations Pod",
        price: "$1,199",
        billingPeriod: "monthly",
        description: "Core identity and positioning architecture for agencies scaling to seven figures.",
        features: [
          "Complete Brand Positioning Matrix",
          "Comprehensive Figma UI Design Kit",
          "Semantic Color & Typography Tokens",
          "Client Proposal Presentation Kit",
          "Digital Guidelines Portal",
        ],
        isPopular: false,
        ctaText: "Deploy Workflow",
        ctaLink: "/contact?service=brand-strategy&package=foundations-pod",
      },
      {
        id: "brand-enterprise",
        name: "Enterprise Brand Architecture",
        price: "$2,499",
        billingPeriod: "monthly",
        description: "Category-defining brand systems and design tokens for high-volume enterprise agencies.",
        features: [
          "Full Enterprise Brand System",
          "Custom Multi-Brand Token Architecture",
          "3D & Motion Graphic Asset Library",
          "Dedicated Brand Design Director SLA",
          "Continuous Quarterly Positioning Audits",
          "Full White-Label Client Portals",
        ],
        isPopular: true,
        ctaText: "Deploy Workflow",
        ctaLink: "/contact?service=brand-strategy&package=enterprise-architecture",
      },
    ],
    faqs: [
      {
        question: "How do the brand design tokens work with our development and creative teams?",
        answer:
          "We provide synchronized Figma token variables that export directly to CSS/Tailwind variables and JSON tokens, ensuring your designers and developers remain in 100% visual lockstep.",
      },
      {
        question: "Can we use this for our agency's clients as well as our own agency?",
        answer:
          "Yes. Our brand architecture frameworks can be deployed both internally to elevate your agency's brand authority and white-labeled as high-ticket retainers for your clients.",
      },
    ],
    relatedServiceSlugs: ["content-creation", "website-design-and-development"],
    relatedPortfolioSlugs: ["catalyst-creative-labs", "vanguard-performance-ops"],
    seo: {
      title: "Agency Brand Strategy & Visual Architecture | Digivigee OS",
      description:
        "Enterprise brand design systems, high-ticket positioning matrices, and vector design tokens built for scaling agencies.",
      slug: "brand-strategy",
    },
    createdAt: "2026-01-01T00:00:00Z",
    updatedAt: "2026-01-01T00:00:00Z",
  },
];

