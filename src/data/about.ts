export interface JourneyMilestone {
  id: string;
  year: string;
  phase: string;
  tag: string;
  title: string;
  headline: string;
  narrative: string;
  milestones: string[];
  keyMetric: {
    value: string;
    label: string;
  };
  badgeColor: string;
}

export interface DigitalProduct {
  id: string;
  name: string;
  type: string;
  badge: string;
  corePositioning: string;
  description: string;
  keyFeatures: string[];
  href: string;
  platform: string;
  status: string;
  accentColor: string;
}

export interface DigitalToolCategory {
  id: string;
  name: string;
  badge: string;
  description: string;
  icon: string;
}

export interface WhatWeDoItem {
  id: string;
  title: string;
  category: string;
  description: string;
  icon: string;
  tags: string[];
}

export interface ApproachStep {
  step: number;
  title: string;
  tagline: string;
  description: string;
}

export interface WhyDigivigeeItem {
  id: string;
  title: string;
  badge: string;
  description: string;
  stat?: string;
  statLabel?: string;
  colSpan: string;
}

export const COMPANY_FOUNDING_YEAR = 2016;

export const ABOUT_STATS = [
  {
    value: 2016,
    prefix: "Est. ",
    suffix: "",
    decimals: 0,
    label: "Founded in 2016",
    caption: "10+ Years of Continuous Digital Innovation",
    useGrouping: false,
  },
  {
    value: 250,
    prefix: "",
    suffix: "+",
    decimals: 0,
    label: "Businesses & Workspaces Empowered",
    caption: "Across retail, F&B, local commerce, and SaaS",
    useGrouping: true,
  },
  {
    value: 10,
    prefix: "",
    suffix: "+",
    decimals: 0,
    label: "Ecosystem Tool Categories",
    caption: "WhatsApp, CRM, AI, POS, Web & Visibility",
    useGrouping: true,
  },
  {
    value: 2,
    prefix: "",
    suffix: " Flagship",
    decimals: 0,
    label: "Proprietary Digital Products",
    caption: "RestroMitra (SaaS) & Maru Gujarat (Android App)",
    useGrouping: true,
  },
];

export const DIGITAL_PRODUCTS: DigitalProduct[] = [
  {
    id: "restromitra",
    name: "RestroMitra",
    type: "Restaurant Management Software — SaaS",
    badge: "PROPRIETARY SAAS PRODUCT",
    corePositioning: "Make restaurant management smarter and simpler.",
    description:
      "RestroMitra is a restaurant-focused SaaS solution designed to help restaurants simplify management, improve operational efficiency and adopt modern digital technology.",
    keyFeatures: [
      "Smart Billing & Cloud POS Infrastructure",
      "Real-time Inventory & Table Management",
      "Automated WhatsApp Bill Delivery & Kitchen Display (KDS)",
      "Multi-branch Centralized Analytics & Reports",
    ],
    href: "/products/restromitra",
    platform: "Cloud SaaS Platform",
    status: "Live & Powering F&B Outlets",
    accentColor: "emerald",
  },
  {
    id: "maru-gujarat",
    name: "Maru Gujarat",
    type: "Gujarat Business Listing & Directory — Android Application",
    badge: "PROPRIETARY ANDROID ECOSYSTEM",
    corePositioning: "Local businesses. Local discovery. Digital visibility.",
    description:
      "Maru Gujarat is an Android application created to connect businesses and customers through a Gujarat-focused business listing and directory platform. It helps local businesses improve discoverability and gives customers an easier way to discover businesses and services across Gujarat.",
    keyFeatures: [
      "State-wide Verified Business Listing Network",
      "Direct Click-to-WhatsApp & Click-to-Call Connections",
      "Hyperlocal Discovery by Category & Location",
      "Dedicated Merchant Dashboard with Lead Tracking",
    ],
    href: "/products/maru-gujarat",
    platform: "Native Android Application",
    status: "Live on Google Play Store",
    accentColor: "blue",
  },
];

export const DIGITAL_TOOL_CATEGORIES: DigitalToolCategory[] = [
  {
    id: "lead-gen",
    name: "Lead Generation",
    badge: "Growth",
    description: "Multi-channel funnels, landing architectures, and automated inbound inquiry pipelines.",
    icon: "Target",
  },
  {
    id: "whatsapp-auto",
    name: "WhatsApp Automation",
    badge: "Automation",
    description: "Official Cloud API workflows, automated notifications, interactive bots, and 1-click catalogs.",
    icon: "MessageSquare",
  },
  {
    id: "crm",
    name: "CRM & Customer Management",
    badge: "Operations",
    description: "Centralized customer contact hubs, deal stage telemetry, and automated team follow-ups.",
    icon: "Users",
  },
  {
    id: "ai-tools",
    name: "AI Tools & AI Agents",
    badge: "Next-Gen AI",
    description: "Task automation agents, automated copywriting assistants, and contextual business bots.",
    icon: "Cpu",
  },
  {
    id: "social-marketing",
    name: "Social Media & Marketing Tools",
    badge: "Branding",
    description: "Content distribution calendars, asset proofs, and high-converting creative workflow engines.",
    icon: "Share2",
  },
  {
    id: "data-research",
    name: "Data & Business Research Tools",
    badge: "Analytics",
    description: "Competitor intelligence, search trend audits, and market sentiment research dashboards.",
    icon: "BarChart3",
  },
  {
    id: "pos-billing",
    name: "POS & Billing Software",
    badge: "Commerce",
    description: "Fast retail billing, digital invoicing, GST reconciliation, and receipt automation.",
    icon: "Receipt",
  },
  {
    id: "digital-branding",
    name: "Digital Branding & Digital Cards",
    badge: "Identity",
    description: "NFC digital business cards, brand assets, and mobile-first micro-portfolios for modern executives.",
    icon: "CreditCard",
  },
  {
    id: "stores-websites",
    name: "Online Stores & Business Websites",
    badge: "Development",
    description: "Sub-second Next.js web applications, digital storefronts, and conversion-optimized checkout.",
    icon: "Globe",
  },
  {
    id: "productivity",
    name: "Productivity & Business Automation",
    badge: "Efficiency",
    description: "Zapier/Webhook data sync, paperless internal workflows, and operational cost elimination.",
    icon: "Zap",
  },
];

export const WHAT_WE_DO: WhatWeDoItem[] = [
  {
    id: "tools-saas",
    title: "Digital Tools & SaaS",
    category: "Software Ecosystem",
    description:
      "Business and marketing tools designed to improve productivity, automation and online growth.",
    icon: "Layers",
    tags: ["Productivity", "SaaS Apps", "Workflows"],
  },
  {
    id: "automation-ai",
    title: "Automation & AI",
    category: "Intelligent Workflows",
    description:
      "WhatsApp automation, CRM solutions, AI-powered tools and agents that help reduce repetitive work.",
    icon: "Bot",
    tags: ["WhatsApp Cloud API", "AI Agents", "Automations"],
  },
  {
    id: "business-software",
    title: "Business Software",
    category: "Core Operations",
    description:
      "POS, billing, WhatsApp CRM, digital cards, online stores and other software solutions.",
    icon: "Database",
    tags: ["POS & Billing", "WhatsApp CRM", "Digital Cards"],
  },
  {
    id: "web-app-dev",
    title: "Website & App Development",
    category: "Engineering",
    description:
      "Professional websites, web applications and mobile applications tailored to business requirements.",
    icon: "Code2",
    tags: ["Next.js Architecture", "Android Apps", "Full-Stack Web"],
  },
  {
    id: "digital-marketing",
    title: "Digital Marketing",
    category: "Commercial Scale",
    description:
      "Social media, Meta advertising, SEO, content and other digital marketing solutions.",
    icon: "TrendingUp",
    tags: ["Official Meta Partner", "Search Dominance", "Content"],
  },
  {
    id: "business-visibility",
    title: "Business Visibility",
    category: "Local Discovery",
    description:
      "Google Business Profile, directory, website and online discovery solutions for local businesses.",
    icon: "MapPin",
    tags: ["GBP Audits", "Maru Gujarat Directory", "Local SEO"],
  },
];

export const OUR_APPROACH_STEPS: ApproachStep[] = [
  {
    step: 1,
    title: "Understand",
    tagline: "Deep Diagnosis",
    description: "We first understand the business, its audience, its operations, and its commercial goals.",
  },
  {
    step: 2,
    title: "Strategize",
    tagline: "Tailored Architecture",
    description: "We recommend the most suitable combination of technology, tools, and digital marketing strategy.",
  },
  {
    step: 3,
    title: "Build",
    tagline: "Precision Engineering",
    description: "We build custom websites, applications, and configure software solutions tailored to real needs.",
  },
  {
    step: 4,
    title: "Implement",
    tagline: "Seamless Onboarding",
    description: "We deploy automation workflows, integrate CRM systems, and roll out software across your team.",
  },
  {
    step: 5,
    title: "Optimize",
    tagline: "Continuous Tuning",
    description: "We measure real performance metrics, refine ad campaigns, and fine-tune operational efficiency.",
  },
  {
    step: 6,
    title: "Grow",
    tagline: "Compounding Lift",
    description: "We scale what works, unlocking predictable commercial return, productivity gains, and market leadership.",
  },
];

export const WHY_DIGIVIGEE: WhyDigivigeeItem[] = [
  {
    id: "one-ecosystem",
    title: "Multiple Digital Solutions Under One Ecosystem",
    badge: "01. UNIFIED",
    description:
      "Businesses should not have to deal with 10 different fragmented agencies and vendors for every digital requirement. Digivigee brings tools, technology, and marketing together in one cohesive stack.",
    stat: "1 Stack",
    statLabel: "All-in-one ecosystem",
    colSpan: "col-span-1 md:col-span-2",
  },
  {
    id: "business-thinking",
    title: "Technology Combined with Business-Focused Thinking",
    badge: "02. PRAGMATIC",
    description:
      "The objective is never to add technology for the sake of technology, but to deploy it where it creates real, verifiable commercial value and eliminates bottlenecks.",
    stat: "ROI-First",
    statLabel: "Commercial focus",
    colSpan: "col-span-1",
  },
  {
    id: "practical-tools",
    title: "Practical Tools for Automation, Marketing & Productivity",
    badge: "03. ACTIONABLE",
    description:
      "From WhatsApp Cloud automation to real-time CRM syncing and paperless digital cards, we deliver tools that your staff and customers actually enjoy using.",
    stat: "Zero Fluff",
    statLabel: "Real-world utility",
    colSpan: "col-span-1",
  },
  {
    id: "custom-engineering",
    title: "Custom Website & Application Development Capabilities",
    badge: "04. ENGINEERING",
    description:
      "High-speed Next.js web applications, native Android apps, and custom APIs built to enterprise standards without templates or sluggish codebases.",
    stat: "100%",
    statLabel: "Tailored codebases",
    colSpan: "col-span-1 md:col-span-2",
  },
  {
    id: "saas-products",
    title: "SaaS Products Developed for Specific Business Needs",
    badge: "05. PROPRIETARY",
    description:
      "We build our own market-tested products like RestroMitra (Restaurant SaaS) and Maru Gujarat (Local Directory App), proving our deep software architecture expertise.",
    stat: "2 Flagships",
    statLabel: "Proprietary software",
    colSpan: "col-span-1 md:col-span-2",
  },
  {
    id: "meta-visibility",
    title: "Digital Marketing & Online Visibility Solutions",
    badge: "06. META PARTNER",
    description:
      "As an official Meta Partner, we manage Facebook & Instagram advertising with strategic audience segmentation, creative production, and full-funnel optimization.",
    stat: "Meta Partner",
    statLabel: "Official recognition",
    colSpan: "col-span-1",
  },
  {
    id: "tailored-requirements",
    title: "Solutions Designed Around Actual Business Requirements",
    badge: "07. CUSTOMIZED",
    description:
      "No rigid packages or cookie-cutter solutions. We carefully audit your exact operational model and tailor digital workflows that address your specific growth bottlenecks.",
    stat: "100% Fit",
    statLabel: "Customized alignment",
    colSpan: "col-span-1 md:col-span-3",
  },
];

export const JOURNEY_MILESTONES: JourneyMilestone[] = [
  {
    id: "foundation-2016",
    year: "2016",
    phase: "PHASE 01",
    tag: "ORIGIN & FOUNDATION",
    title: "The Genesis: Bridging Business & Digital Reality",
    headline: "Founded in 2016 with a commitment to bring practical, result-oriented digital solutions to growing businesses.",
    narrative:
      "Digivigee was established in 2016 on a clear realization: businesses were being sold confusing marketing promises and bloated packages without practical digital tools. We set out to become a trusted digital partner helping companies build, automate, market, and grow with technology that actually works.",
    milestones: [
      "Company founded in 2016 with focus on high-impact digital solutions",
      "Delivered first 50+ business websites and conversion marketing campaigns",
      "Pioneered transparent client communication and practical digital onboarding",
    ],
    keyMetric: {
      value: "2016",
      label: "Official Year Founded",
    },
    badgeColor: "emerald",
  },
  {
    id: "engineering-2019",
    year: "2019",
    phase: "PHASE 02",
    tag: "EXPANSION & DEV",
    title: "Custom Applications & Operational Software",
    headline: "Expanding beyond websites into custom web apps, POS, and digital workflow software.",
    narrative:
      "As businesses matured, their needs expanded beyond brochure websites. In 2019, Digivigee invested heavily into software engineering capabilities—building custom business applications, billing systems, POS software, and digital branding solutions tailored to daily operational workflows.",
    milestones: [
      "Engineered tailored web applications and custom business software",
      "Introduced retail billing and POS integration solutions",
      "Surpassed 120+ active business clients across multiple sectors",
    ],
    keyMetric: {
      value: "100+",
      label: "Custom Software Implementations",
    },
    badgeColor: "blue",
  },
  {
    id: "meta-partner-2022",
    year: "2022",
    phase: "PHASE 03",
    tag: "META PARTNER & AUTOMATION",
    title: "Official Meta Partnership & AI/WhatsApp Automation",
    headline: "Achieving official Meta Partner accreditation and rolling out conversational business automation.",
    narrative:
      "In 2022, Digivigee became an official Meta Partner, cementing our advanced capabilities across Facebook and Instagram advertising. Simultaneously, we deployed WhatsApp Cloud automation and CRM integration tools, enabling local and regional businesses to capture and nurture leads with zero latency.",
    milestones: [
      "Accredited as an Official Meta Partner with verified compliance",
      "Launched full-funnel WhatsApp Automation & CRM integration pipelines",
      "Pioneered server-side conversion tracking & advanced audience segmentation",
    ],
    keyMetric: {
      value: "Meta",
      label: "Official Partner Status",
    },
    badgeColor: "purple",
  },
  {
    id: "products-2024-2026",
    year: "2024–2026+",
    phase: "PHASE 04",
    tag: "PROPRIETARY ECOSYSTEM",
    title: "Flagship Products: RestroMitra, Maru Gujarat & Beyond",
    headline: "Launching proprietary SaaS solutions and unifying digital tools into a single powerful ecosystem.",
    narrative:
      "Entering our second decade of digital excellence, Digivigee launched two major proprietary digital products: RestroMitra (restaurant management SaaS) and Maru Gujarat (local business directory Android app). Today, we provide a unified ecosystem where businesses find the exact tools, software, and expertise to do business better.",
    milestones: [
      "Launched RestroMitra: Cloud restaurant POS & management SaaS",
      "Launched Maru Gujarat: Gujarat business directory Android application",
      "Integrated 10+ digital tools categories into a single accessible platform",
    ],
    keyMetric: {
      value: "10+ Yrs",
      label: "Proven Digital Track Record",
    },
    badgeColor: "amber",
  },
];

export const TRUST_CREDENTIALS = [
  {
    name: "Official Meta Partner",
    badge: "Badged Partner",
    rating: "Facebook & Instagram",
    verified: "Official Advertising & Business Partner",
  },
  {
    name: "Google Business Partner",
    badge: "Local Discovery",
    rating: "Top Optimization",
    verified: "Google Business Profile Specialists",
  },
  {
    name: "RestroMitra SaaS",
    badge: "Proprietary F&B Tech",
    rating: "Cloud POS",
    verified: "Built & Maintained by Digivigee",
  },
  {
    name: "Maru Gujarat App",
    badge: "Android Platform",
    rating: "Local Discovery",
    verified: "Built & Maintained by Digivigee",
  },
];
