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

export interface WhyDrNoopurItem {
  id: string;
  title: string;
  badge: string;
  description: string;
  stat?: string;
  statLabel?: string;
  colSpan: string;
}

export type WhyDigivigeeItem = WhyDrNoopurItem;

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

export const WHY_DR_NOOPUR: WhyDrNoopurItem[] = [
  {
    id: "one-ecosystem",
    title: "Comprehensive Breast Care Under One Roof",
    badge: "01. INTEGRATED",
    description:
      "Patients and families receive seamless, multidisciplinary care spanning screening, advanced oncoplastic surgery, systemic therapy coordination, and holistic recovery at Marengo CIMS Hospital.",
    stat: "End-to-End",
    statLabel: "Integrated oncology",
    colSpan: "col-span-1 md:col-span-2",
  },
  {
    id: "evidence-based",
    title: "Evidence-Based Surgical Decision Making",
    badge: "02. CLINICAL EXCELLENCE",
    description:
      "Every treatment recommendation is guided by international NCCN and ESMO clinical guidelines, ensuring maximum oncological cure rates with minimal treatment morbidity.",
    stat: "NCCN/ESMO",
    statLabel: "Guideline compliance",
    colSpan: "col-span-1",
  },
  {
    id: "oncoplastic-precision",
    title: "Oncoplastic Breast Conservation Expertise",
    badge: "03. AESTHETIC ONCOLOGY",
    description:
      "Specialized training in oncoplastic surgery allows complete surgical excision of breast cancer while preserving breast symmetry, contour, and psychological well-being.",
    stat: "Form & Cure",
    statLabel: "Aesthetic conservation",
    colSpan: "col-span-1",
  },
  {
    id: "minimally-invasive",
    title: "Minimally Invasive Axillary Staging",
    badge: "04. ADVANCED TECHNIQUE",
    description:
      "Routine use of Sentinel Lymph Node Biopsy (SLNB) avoids unnecessary full axillary clearance, dramatically reducing the lifetime risk of chronic arm lymphedema.",
    stat: "SLNB Standard",
    statLabel: "Reduced lymphedema risk",
    colSpan: "col-span-1 md:col-span-2",
  },
  {
    id: "multidisciplinary-board",
    title: "Multidisciplinary Tumour Board Review",
    badge: "05. COLLABORATIVE",
    description:
      "Complex breast cancer cases are deliberated in multidisciplinary tumour boards alongside medical oncologists, radiation oncologists, radiologists, and pathologists.",
    stat: "Tumour Board",
    statLabel: "Multidisciplinary review",
    colSpan: "col-span-1 md:col-span-2",
  },
  {
    id: "compassionate-care",
    title: "Empathetic, Patient-Centered Communication",
    badge: "06. COMPASSION",
    description:
      "A cancer diagnosis is deeply emotional. Dr. Noopur Patel ensures ample time for every patient consultation, answering questions and guiding families through every step.",
    stat: "Patient First",
    statLabel: "Empathetic guidance",
    colSpan: "col-span-1",
  },
  {
    id: "hospital-infrastructure",
    title: "Tertiary Cancer Care Infrastructure at Marengo CIMS Hospital",
    badge: "07. INFRASTRUCTURE",
    description:
      "Consultations and surgeries are conducted at Marengo CIMS Hospital, Ahmedabad — a premier, NABH-accredited tertiary medical facility with state-of-the-art surgical suites and intensive care.",
    stat: "NABH Center",
    statLabel: "Tertiary care hospital",
    colSpan: "col-span-1 md:col-span-3",
  },
];

export const WHY_DIGIVIGEE = WHY_DR_NOOPUR;

export const JOURNEY_MILESTONES: JourneyMilestone[] = [
  {
    id: "foundation-med",
    year: "Academic Foundation",
    phase: "PHASE 01",
    tag: "MEDICAL EDUCATION",
    title: "Rigorous Surgical Training & General Surgery Foundation",
    headline: "Extensive surgical training establishing deep expertise in operative anatomy, oncology principles, and patient care.",
    narrative:
      "Dr. Noopur Patel completed comprehensive surgical training with exceptional academic distinction, developing an enduring passion for dedicated breast disease management and oncologic precision.",
    milestones: [
      "Rigorous surgical residency and advanced clinical operative training",
      "Focused training on surgical precision, aseptic technique, and wound healing",
      "Dedication to patient-first medical ethics and multidisciplinary care",
    ],
    keyMetric: {
      value: "MBBS, MS",
      label: "Surgical Foundation",
    },
    badgeColor: "emerald",
  },
  {
    id: "specialization-breast",
    year: "Subspecialty Focus",
    phase: "PHASE 02",
    tag: "BREAST ONCOLOGY",
    title: "Specialized Surgical Breast Oncology & Oncoplastic Surgery",
    headline: "Dedicated sub-specialization in breast cancer surgery, breast conservation, and oncoplastic techniques.",
    narrative:
      "Committed to preserving quality of life alongside cancer cure, Dr. Patel pursued advanced subspecialty training in breast surgical oncology, mastering modern volume-displacement and volume-replacement techniques that preserve natural breast aesthetics.",
    milestones: [
      "Advanced oncoplastic surgical techniques and contour preservation",
      "Sentinel lymph node biopsy protocols minimizing lymphedema risks",
      "Comprehensive management of benign, high-risk, and malignant breast conditions",
    ],
    keyMetric: {
      value: "Oncoplastic",
      label: "Advanced Subspecialty",
    },
    badgeColor: "blue",
  },
  {
    id: "clinical-excellence",
    year: "Clinical Practice",
    phase: "PHASE 03",
    tag: "MARENGO CIMS HOSPITAL",
    title: "Associate Consultant – Surgical Breast Oncology",
    headline: "Delivering world-class surgical breast oncology care at Marengo CIMS Hospital, Ahmedabad.",
    narrative:
      "Today, Dr. Noopur Patel serves patients across Gujarat and western India with evidence-based surgical oncology care, collaborating within a multidisciplinary tumor board of radiation oncologists, medical oncologists, and pathologists.",
    milestones: [
      "Associate Consultant – Surgical Breast Oncology at Marengo CIMS Hospital",
      "Active participant in multidisciplinary breast tumor board discussions",
      "Patient education initiatives for early breast screening and awareness",
    ],
    keyMetric: {
      value: "CIMS",
      label: "Marengo CIMS Hospital",
    },
    badgeColor: "purple",
  },
];

export const TRUST_CREDENTIALS = [
  {
    name: "Marengo CIMS Hospital",
    badge: "Clinical Base",
    rating: "Tertiary Cancer Care",
    verified: "Off Science City Road, Sola, Ahmedabad",
  },
  {
    name: "Surgical Breast Oncology",
    badge: "Subspecialty",
    rating: "Cancer Surgery",
    verified: "Evidence-Based Surgical Treatment",
  },
  {
    name: "Oncoplastic Techniques",
    badge: "Aesthetic Safety",
    rating: "Breast Preservation",
    verified: "Volume Displacement & Symmetry",
  },
  {
    name: "Patient-Centered Care",
    badge: "Compassionate",
    rating: "Holistic Healing",
    verified: "Personalized Treatment Pathways",
  },
];
