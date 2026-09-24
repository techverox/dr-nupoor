import { getAdminFirestore } from "@/lib/firebase/admin";
import { COLLECTIONS } from "@/config/firebase";
import {
  LandingPage,
  LandingPageTemplate,
  CreateLandingPageTemplateInput,
  LandingPageSection,
} from "@/types/landingPage";
import { createLandingPage } from "@/lib/services/landingPageService";

// Pre-structured canonical starter templates matching Dr. Noopur Patel clinical practice
const SEED_LANDING_TEMPLATES: LandingPageTemplate[] = [
  {
    id: "tpl-homepage-os",
    name: "Dr. Noopur Patel Practice Homepage Template",
    description:
      "Canonical clinical template for Dr. Noopur Patel with Hero, Clinical Focus Pillars, Surgical Capabilities, Patient Outcomes, FAQ, and Consultation Booking.",
    category: "Clinical Practice",
    badge: "Practice Homepage",
    tags: ["homepage", "breast-oncology", "clinical", "hospital"],
    sections: [
      {
        id: "sec-os-hero",
        type: "hero",
        order: 0,
        isVisible: true,
        content: {
          eyebrow: "Surgical Breast Oncology & Oncoplastic Care",
          headline: "Comprehensive, Compassionate & Evidence-Based Breast Care",
          description:
            "Personalized breast cancer surgery and oncoplastic techniques preserving form, function, and dignity at Marengo CIMS Hospital, Ahmedabad.",
          primaryCtaLabel: "Book Consultation",
          primaryCtaTarget: "#lead-form",
          secondaryCtaLabel: "Clinical Specialities",
          secondaryCtaTarget: "#features",
          logosHeading: "Affiliated with Marengo CIMS Hospital, Ahmedabad",
        },
        styling: {
          backgroundColor: "#0B4F6C",
          textColor: "#ffffff",
          paddingY: "xl",
        },
      },
      {
        id: "sec-os-features",
        type: "features",
        order: 1,
        isVisible: true,
        content: {
          badge: "Clinical Philosophy",
          sectionTitle: "Evidence-Based Surgical Breast Oncology",
          sectionSubtitle:
            "Combining international clinical standards with empathetic patient care at Marengo CIMS Hospital.",
          features: [
            {
              tag: "Aesthetic Oncology",
              title: "Oncoplastic Conservation",
              desc: "Complete tumor excision paired with cosmetic breast tissue remodeling to preserve natural symmetry.",
            },
            {
              tag: "Minimally Invasive",
              title: "Sentinel Node Staging",
              desc: "Targeted lymph node evaluation minimizing trauma and reducing chronic upper-limb lymphedema risk.",
            },
            {
              tag: "Tumour Board",
              title: "Multidisciplinary Review",
              desc: "Collaborative care pathways integrated with medical oncologists, radiation oncologists, and pathologists.",
            },
            {
              tag: "Benign Care",
              title: "Benign Breast Clinic",
              desc: "Specialized assessment for fibroadenomas, complex cysts, breast pain, and nipple discharge.",
            },
            {
              tag: "Risk Assessment",
              title: "Genetics & High-Risk Screening",
              desc: "Personalized screening protocols and risk-reduction strategies for family history and BRCA variants.",
            },
            {
              tag: "Holistic Care",
              title: "Dedicated Patient Navigation",
              desc: "Compassionate, patient-centered care and long-term surveillance from consultation to recovery.",
            },
          ],
        },
        styling: {
          backgroundColor: "#F8FAFC",
          textColor: "#0f172a",
          paddingY: "xl",
        },
      },
      {
        id: "sec-os-services",
        type: "services",
        order: 2,
        isVisible: true,
        content: {
          sectionTitle: "Full-Funnel Growth Capabilities Suite",
          sectionSubtitle:
            "From top-of-funnel demand capture to retention systems, every capability is tuned for enterprise ROI.",
          services: [
            {
              icon: "🎯",
              title: "Performance Paid Media",
              desc: "High-ROAS acquisition across Meta Ads, Google Performance Max, and LinkedIn Ads.",
            },
            {
              icon: "⚡",
              title: "CRO & Funnel Engineering",
              desc: "Silicon Valley-grade landing pages and rigorous A/B experimentation engines.",
            },
            {
              icon: "📈",
              title: "SEO Scaling Engine",
              desc: "Topical authority blueprints and programmatic search dominance strategies.",
            },
            {
              icon: "💼",
              title: "B2B Outbound Lead Gen",
              desc: "Account-based prospecting and verified executive appointment scheduling.",
            },
            {
              icon: "🔄",
              title: "Lifecycle Marketing",
              desc: "Automated email sequences, SMS remarketing, and customer lifetime value expansion.",
            },
            {
              icon: "🤖",
              title: "AI Growth Automations",
              desc: "Custom Zapier, Make, and AI agents automating lead routing and performance digests.",
            },
          ],
        },
        styling: {
          backgroundColor: "#ffffff",
          textColor: "#0f172a",
          paddingY: "xl",
        },
      },
      {
        id: "sec-os-statistics",
        type: "statistics",
        order: 3,
        isVisible: true,
        content: {
          stats: [
            { value: "2,350+", label: "Retainers Scaled" },
            { value: "$142M+", label: "Ad Spend Managed" },
            { value: "99.8%", label: "Client Retention" },
            { value: "3.8x", label: "Average ROAS Lift" },
          ],
        },
        styling: {
          backgroundColor: "#0f172a",
          textColor: "#ffffff",
          paddingY: "lg",
        },
      },
      {
        id: "sec-os-testimonials",
        type: "testimonials",
        order: 4,
        isVisible: true,
        content: {
          quote:
            "Dr. Noopur Patel's surgical precision, clear communication, and compassionate guidance made all the difference during my breast cancer surgery and recovery at Marengo CIMS Hospital.",
          author: "Patient Care Journey",
          role: "Ahmedabad, Gujarat",
        },
        styling: {
          backgroundColor: "#F8FAFC",
          textColor: "#0f172a",
          paddingY: "xl",
        },
      },
      {
        id: "sec-os-faq",
        type: "faq",
        order: 5,
        isVisible: true,
        content: {
          sectionTitle: "Frequently Asked Questions",
          items: [
            {
              question: "When should I consult a breast surgeon?",
              answer:
                "You should schedule an evaluation if you notice a new breast lump, persistent localized pain, skin dimpling, nipple retraction or discharge, or receive abnormal mammogram findings.",
            },
            {
              question: "What is oncoplastic breast surgery?",
              answer:
                "Oncoplastic surgery combines oncological tumor resection with reconstructive plastic surgery principles to preserve the natural shape, contour, and aesthetic symmetry of the breast.",
            },
            {
              question: "Can breast cancer be treated while preserving the breast?",
              answer:
                "Yes, Breast Conservation Surgery (lumpectomy with oncoplastic remodeling) is a safe and proven standard for suitable candidates, offering equivalent survival to mastectomy.",
            },
            {
              question: "Where are consultations and surgeries conducted?",
              answer:
                "Dr. Noopur Patel consults and operates at Marengo CIMS Hospital, Off Science City Road, Sola, Ahmedabad, Gujarat.",
            },
          ],
        },
        styling: {
          backgroundColor: "#ffffff",
          textColor: "#0f172a",
          paddingY: "xl",
        },
      },
      {
        id: "sec-os-form",
        type: "form",
        order: 6,
        isVisible: true,
        content: {
          headline: "Schedule a Consultation with Dr. Noopur Patel",
          subheadline:
            "Fill in patient details to coordinate an appointment slot at Marengo CIMS Hospital, Ahmedabad.",
          leadSourceTag: "landing-page:homepage-clinical",
        },
        styling: {
          backgroundColor: "#F8FAFC",
          textColor: "#0f172a",
          paddingY: "xl",
        },
      },
      {
        id: "sec-os-cta",
        type: "cta",
        order: 7,
        isVisible: true,
        content: {
          headline: "Seeking an Expert Surgical Breast Oncology Opinion?",
          subheadline:
            "Consult with Dr. Noopur Patel at Marengo CIMS Hospital, Ahmedabad. Comprehensive report reviews and second opinions welcome.",
          buttonLabel: "Request Appointment",
          buttonTarget: "#lead-form",
        },
        styling: {
          backgroundColor: "linear-gradient(135deg, #0B4F6C 0%, #083a50 100%)",
          textColor: "#ffffff",
          paddingY: "xl",
        },
      },
    ],
    defaultCta: {
      primaryCtaLabel: "Book Consultation",
      primaryCtaType: "scroll_to_form",
      primaryCtaTarget: "#lead-form",
    },
    defaultForm: {
      formTitle: "Schedule a Consultation with Dr. Noopur Patel",
      formSubtitle: "Fill in patient details to coordinate an appointment slot at Marengo CIMS Hospital.",
      submitButtonText: "Request Appointment Slot",
      leadSourceTag: "landing-page:homepage-clinical",
    },
    createdAt: "2026-08-01T00:00:00.000Z",
    updatedAt: "2026-08-01T00:00:00.000Z",
  },
  {
    id: "tpl-agency-lead-gen",
    name: "Performance Marketing Enterprise Lead Gen",
    description:
      "Engineered for high-ticket acquisition: Hero header, feature advantages, service cards, metrics, pricing, FAQ, and in-page lead form.",
    category: "Lead Generation",
    badge: "Most Popular",
    tags: ["b2b", "agency", "lead-gen", "growth"],
    sections: [
      {
        id: "sec-tpl-hero-1",
        type: "hero",
        order: 0,
        isVisible: true,
        content: {
          eyebrow: "Proven Marketing Strategy",
          headline: "Accelerate Your Qualified Inquiries with Performance Marketing",
          description:
            "Data-backed acquisition campaigns, high-converting design, and revenue-driven growth frameworks.",
          primaryCtaLabel: "Request Free Consultation",
          primaryCtaTarget: "#lead-form",
          secondaryCtaLabel: "Explore Services",
          secondaryCtaTarget: "#services",
        },
        styling: { backgroundColor: "#0f172a", textColor: "#ffffff", paddingY: "xl" },
      },
      {
        id: "sec-tpl-feat-1",
        type: "features",
        order: 1,
        isVisible: true,
        content: {
          sectionTitle: "Why Forward-Thinking Brands Choose Us",
          sectionSubtitle: "Built on analytical precision, transparent reporting, and verified client outcomes.",
          features: [
            { title: "Transparent Attribution", desc: "No vanity metrics. Every dollar is tracked to pipeline revenue." },
            { title: "Senior Specialists", desc: "Direct access to experienced growth buyers, not junior coordinators." },
            { title: "Rapid Iteration", desc: "Weekly creative sprints, landing page experiments, and copy testing." },
          ],
        },
        styling: { backgroundColor: "#ffffff", paddingY: "xl" },
      },
      {
        id: "sec-tpl-serv-1",
        type: "services",
        order: 2,
        isVisible: true,
        content: {
          sectionTitle: "Specialized Marketing Capabilities",
          services: [
            { title: "Paid Search & Meta Ads", desc: "Targeted campaigns built for strict ROAS targets.", icon: "📈" },
            { title: "Conversion Optimization", desc: "Frictionless landing pages that maximize inquiry rates.", icon: "🎯" },
            { title: "Analytics Architecture", desc: "Server-side tracking and full attribution modeling.", icon: "🔍" },
          ],
        },
        styling: { backgroundColor: "#f8fafc", paddingY: "xl" },
      },
      {
        id: "sec-tpl-stat-1",
        type: "statistics",
        order: 3,
        isVisible: true,
        content: {
          stats: [
            { value: "250+", label: "Happy Clients" },
            { value: "500+", label: "Projects Completed" },
            { value: "5+ Years", label: "Industry Experience" },
            { value: "98%", label: "Client Satisfaction" },
          ],
        },
        styling: { backgroundColor: "#0f172a", textColor: "#ffffff", paddingY: "lg" },
      },
      {
        id: "sec-tpl-test-1",
        type: "testimonials",
        order: 4,
        isVisible: true,
        content: {
          sectionTitle: "Client Success Proof",
          quote:
            "Dr. Noopur Patel's clinical insight and surgical approach provided profound confidence during our breast cancer care at Marengo CIMS Hospital.",
          author: "Rajesh Patel",
          role: "Managing Director, Kalpvruksh Group",
        },
        styling: { backgroundColor: "#f8fafc", paddingY: "lg" },
      },
      {
        id: "sec-tpl-price-1",
        type: "pricing",
        order: 5,
        isVisible: true,
        content: {
          sectionTitle: "Flexible Campaign Packages",
          tiers: [
            {
              name: "Growth Starter",
              price: "$950",
              period: "/month",
              highlighted: false,
              features: ["2 Ad Platforms", "Bi-Weekly Performance Reviews", "Custom Conversion Dashboard"],
              ctaLabel: "Get Started",
              ctaTarget: "#lead-form",
            },
            {
              name: "Scale Accelerator",
              price: "$1,850",
              period: "/month",
              highlighted: true,
              badge: "Most Popular",
              features: ["Omnichannel Ads", "Weekly Strategy Sprints", "Full Funnel A/B Testing", "Slack Support"],
              ctaLabel: "Claim Accelerator",
              ctaTarget: "#lead-form",
            },
            {
              name: "Enterprise Custom",
              price: "Custom",
              period: "Retainer",
              highlighted: false,
              features: ["Dedicated Team", "Custom Conversion Funnels", "Full Attribution Modeling"],
              ctaLabel: "Contact Enterprise",
              ctaTarget: "#lead-form",
            },
          ],
        },
        styling: { backgroundColor: "#ffffff", paddingY: "xl" },
      },
      {
        id: "sec-tpl-faq-1",
        type: "faq",
        order: 6,
        isVisible: true,
        content: {
          sectionTitle: "Frequently Asked Questions",
          items: [
            { question: "How quickly can we launch?", answer: "Typically within 5 to 7 business days." },
            { question: "What ad spend budgets do you manage?", answer: "From targeted local budgets to enterprise ad spend." },
          ],
        },
        styling: { backgroundColor: "#f8fafc", paddingY: "xl" },
      },
      {
        id: "sec-tpl-form-1",
        type: "form",
        order: 7,
        isVisible: true,
        content: {
          headline: "Request Your Custom Growth Blueprint",
          subheadline: "Share your acquisition goals and a strategist will audit your competitive market.",
          submitButtonText: "Submit Inquiry Now",
          leadSourceTag: "landing-page:agency-lead-gen",
        },
        styling: { backgroundColor: "#ffffff", paddingY: "xl" },
      },
      {
        id: "sec-tpl-foot-1",
        type: "footer",
        order: 8,
        isVisible: true,
        content: {
          copyrightText: "© 2026 Dr. Noopur Patel. All Rights Reserved.",
          showLegalLinks: true,
        },
        styling: { backgroundColor: "#0b132b", textColor: "#ffffff", paddingY: "md" },
      },
    ],
    defaultCta: {
      primaryCtaLabel: "Request Free Consultation",
      primaryCtaType: "scroll_to_form",
      primaryCtaTarget: "#lead-form",
    },
    defaultForm: {
      formTitle: "Request Your Custom Growth Blueprint",
      formSubtitle: "Fill in your details and an agency strategist will review your market.",
      submitButtonText: "Submit Inquiry Now",
      leadSourceTag: "landing-page:agency-lead-gen",
    },
    createdAt: "2026-08-01T00:00:00.000Z",
    updatedAt: "2026-08-01T00:00:00.000Z",
  },
  {
    id: "tpl-service-growth",
    name: "B2B Professional Services & Consulting Accelerator",
    description:
      "Structured for consulting, agencies, and professional firms: Process workflow, service breakdown, authority logos, and contact section.",
    category: "Service",
    badge: "High Conversion",
    tags: ["consulting", "b2b", "services", "process"],
    sections: [
      {
        id: "sec-tpl-serv-hero",
        type: "hero",
        order: 0,
        isVisible: true,
        content: {
          eyebrow: "Strategic Advisory",
          headline: "Modern Digital Growth for Professional B2B Services",
          description: "Elevate your market positioning and generate qualified high-value commercial relationships.",
          primaryCtaLabel: "Schedule Advisory Call",
          primaryCtaTarget: "#lead-form",
        },
        styling: { backgroundColor: "#0f172a", textColor: "#ffffff", paddingY: "xl" },
      },
      {
        id: "sec-tpl-serv-proc",
        type: "process",
        order: 1,
        isVisible: true,
        content: {
          heading: "Our 4-Step Engagement Model",
          steps: [
            { step: "01", title: "Diagnostic Audit", desc: "Assess baseline acquisition metrics and competitive whitespace." },
            { step: "02", title: "Blueprint Formulation", desc: "Architect full-funnel media allocations and high-intent targeting." },
            { step: "03", title: "Campaign Execution", desc: "Launch verified search, display, and social acquisition funnels." },
            { step: "04", title: "Scale & Retention", desc: "Continuous ROAS expansion and customer lifetime value optimization." },
          ],
        },
        styling: { backgroundColor: "#f8fafc", paddingY: "xl" },
      },
      {
        id: "sec-tpl-serv-logos",
        type: "client-logos",
        order: 2,
        isVisible: true,
        content: {
          heading: "Trusted by Recognized Industry Leaders",
          logos: [{ name: "Kalpvruksh Group" }, { name: "The Printing Wala" }, { name: "Ayush Wellness" }],
        },
        styling: { backgroundColor: "#ffffff", paddingY: "md" },
      },
      {
        id: "sec-tpl-serv-form",
        type: "form",
        order: 3,
        isVisible: true,
        content: {
          headline: "Schedule Your Advisory Consultation",
          subheadline: "Let our growth team evaluate your commercial acquisition goals.",
          submitButtonText: "Book Discovery Session",
          leadSourceTag: "landing-page:b2b-services",
        },
        styling: { backgroundColor: "#f8fafc", paddingY: "xl" },
      },
      {
        id: "sec-tpl-serv-foot",
        type: "footer",
        order: 4,
        isVisible: true,
        content: { copyrightText: "© 2026 Dr. Noopur Patel.", showLegalLinks: true },
        styling: { backgroundColor: "#0b132b", textColor: "#ffffff", paddingY: "md" },
      },
    ],
    defaultCta: {
      primaryCtaLabel: "Schedule Advisory Call",
      primaryCtaType: "scroll_to_form",
      primaryCtaTarget: "#lead-form",
    },
    defaultForm: {
      formTitle: "Schedule Your Advisory Consultation",
      submitButtonText: "Book Discovery Session",
      leadSourceTag: "landing-page:b2b-services",
    },
    createdAt: "2026-08-01T00:00:00.000Z",
    updatedAt: "2026-08-01T00:00:00.000Z",
  },
  {
    id: "tpl-ecommerce-scale",
    name: "Omnichannel E-Commerce & D2C Scaling Funnel",
    description:
      "Fast-paced campaign funnel with countdown urgency banner, video presentation, pricing comparison, and frictionless lead form.",
    category: "Product",
    badge: "D2C Focus",
    tags: ["product", "countdown", "offer", "video"],
    sections: [
      {
        id: "sec-tpl-prod-hero",
        type: "hero",
        order: 0,
        isVisible: true,
        content: {
          eyebrow: "Exclusive Early Access",
          headline: "The Complete Performance Growth Toolkit",
          description: "Transform your brand's digital presence with verified acquisition frameworks.",
          primaryCtaLabel: "Claim Special Offer",
          primaryCtaTarget: "#lead-form",
        },
        styling: { backgroundColor: "#0f172a", textColor: "#ffffff", paddingY: "xl" },
      },
      {
        id: "sec-tpl-prod-count",
        type: "countdown",
        order: 1,
        isVisible: true,
        content: {
          badge: "Limited Spots Available",
          headline: "Early-Bird Strategy Audit Package",
          description: "Only 10 complimentary audits remaining this calendar quarter.",
          ctaLabel: "Lock In Your Spot",
          ctaTarget: "#lead-form",
        },
        styling: { backgroundColor: "#1e293b", textColor: "#ffffff", paddingY: "lg" },
      },
      {
        id: "sec-tpl-prod-vid",
        type: "video",
        order: 2,
        isVisible: true,
        content: {
          heading: "See How The Methodology Operates",
          videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        },
        styling: { backgroundColor: "#ffffff", paddingY: "xl" },
      },
      {
        id: "sec-tpl-prod-form",
        type: "form",
        order: 3,
        isVisible: true,
        content: {
          headline: "Claim Your Special Launch Offer",
          submitButtonText: "Claim Exclusive Offer",
          leadSourceTag: "landing-page:product-launch",
        },
        styling: { backgroundColor: "#f8fafc", paddingY: "xl" },
      },
      {
        id: "sec-tpl-prod-foot",
        type: "footer",
        order: 4,
        isVisible: true,
        content: { copyrightText: "© 2026 Dr. Noopur Patel.", showLegalLinks: true },
        styling: { backgroundColor: "#0b132b", textColor: "#ffffff", paddingY: "md" },
      },
    ],
    defaultCta: {
      primaryCtaLabel: "Claim Special Offer",
      primaryCtaType: "scroll_to_form",
      primaryCtaTarget: "#lead-form",
    },
    defaultForm: {
      formTitle: "Claim Your Special Launch Offer",
      submitButtonText: "Claim Exclusive Offer",
      leadSourceTag: "landing-page:product-launch",
    },
    createdAt: "2026-08-01T00:00:00.000Z",
    updatedAt: "2026-08-01T00:00:00.000Z",
  },
  {
    id: "tpl-saas-demand",
    name: "B2B SaaS Demand Generation & Demo Pipeline",
    description:
      "High-intent software pipeline funnel: Live product feature highlights, customer ROI metrics, 3-tier pricing comparison, and demo booking form.",
    category: "Lead Generation",
    badge: "SaaS Focus",
    tags: ["saas", "software", "demo", "b2b", "pipeline"],
    sections: [
      {
        id: "sec-tpl-saas-hero",
        type: "hero",
        order: 0,
        isVisible: true,
        content: {
          eyebrow: "Next-Gen Software Growth",
          headline: "Automate Pipeline Velocity for Modern SaaS Teams",
          description: "Connect telemetry, capture high-intent inquiries, and close enterprise deals faster.",
          primaryCtaLabel: "Book Interactive Demo",
          primaryCtaTarget: "#lead-form",
          secondaryCtaLabel: "View Pricing Plans",
          secondaryCtaTarget: "#pricing",
        },
        styling: { backgroundColor: "#0f172a", textColor: "#ffffff", paddingY: "xl" },
      },
      {
        id: "sec-tpl-saas-feat",
        type: "features",
        order: 1,
        isVisible: true,
        content: {
          sectionTitle: "Engineered for Product-Led Expansion",
          features: [
            { title: "Automated Lead Routing", desc: "Instant CRM qualification based on firmographic signals." },
            { title: "Real-Time Attribution", desc: "Track every software sign-up back to the initial ad click." },
            { title: "Interactive Software Mockups", desc: "Give prospects an authentic glimpse into the product UI." },
          ],
        },
        styling: { backgroundColor: "#ffffff", paddingY: "xl" },
      },
      {
        id: "sec-tpl-saas-stat",
        type: "statistics",
        order: 2,
        isVisible: true,
        content: {
          stats: [
            { value: "3.4x", label: "Pipeline Velocity" },
            { value: "48%", label: "Lower CAC" },
            { value: "99.9%", label: "Uptime SLA" },
            { value: "500+", label: "SaaS Integrations" },
          ],
        },
        styling: { backgroundColor: "#0f172a", textColor: "#ffffff", paddingY: "lg" },
      },
      {
        id: "sec-tpl-saas-form",
        type: "form",
        order: 3,
        isVisible: true,
        content: {
          headline: "Schedule Your 15-Minute Software Demo",
          subheadline: "Schedule a comprehensive clinical case consultation with Dr. Noopur Patel.",
          submitButtonText: "Confirm Demo Time",
          leadSourceTag: "landing-page:saas-demand",
        },
        styling: { backgroundColor: "#f8fafc", paddingY: "xl" },
      },
    ],
    defaultCta: {
      primaryCtaLabel: "Book Interactive Demo",
      primaryCtaType: "scroll_to_form",
      primaryCtaTarget: "#lead-form",
    },
    defaultForm: {
      formTitle: "Schedule Your 15-Minute Software Demo",
      submitButtonText: "Confirm Demo Time",
      leadSourceTag: "landing-page:saas-demand",
    },
    createdAt: "2026-08-01T00:00:00.000Z",
    updatedAt: "2026-08-01T00:00:00.000Z",
  },
  {
    id: "tpl-local-business",
    name: "Local Business Growth & Maps Acceleration",
    description:
      "Designed for local service establishments: Direct WhatsApp chat action, local phone/address contact block, client testimonials, and inquiry form.",
    category: "Campaign",
    badge: "Local Focus",
    tags: ["local", "maps", "whatsapp", "inquiries"],
    sections: [
      {
        id: "sec-tpl-loc-hero",
        type: "hero",
        order: 0,
        isVisible: true,
        content: {
          eyebrow: "Local Market Domination",
          headline: "Attract High-Intent Local Customers Every Single Week",
          description: "Dominate Google Maps, local search results, and targeted neighborhood social ads.",
          primaryCtaLabel: "Chat on WhatsApp",
          primaryCtaTarget: "#whatsapp",
          secondaryCtaLabel: "Request In-Depth Audit",
          secondaryCtaTarget: "#lead-form",
        },
        styling: { backgroundColor: "#0f172a", textColor: "#ffffff", paddingY: "xl" },
      },
      {
        id: "sec-tpl-loc-whats",
        type: "whatsapp",
        order: 1,
        isVisible: true,
        content: {
          headline: "Chat Directly with an Agency Specialist",
          subheadline: "Get immediate answers, service quotes, and local campaign estimates.",
          buttonLabel: "Open WhatsApp Chat",
          phoneNumber: "+919876543210",
        },
        styling: { backgroundColor: "#ecfdf5", textColor: "#065f46", paddingY: "lg" },
      },
      {
        id: "sec-tpl-loc-contact",
        type: "contact",
        order: 2,
        isVisible: true,
        content: {
          heading: "Our Agency Headquarters",
          phone: "+91 98765 43210",
          email: "dr.noopurpatel@gmail.com",
          address: "Digital Marketing Agency Hub, Surat, Gujarat, India",
        },
        styling: { backgroundColor: "#ffffff", paddingY: "lg" },
      },
      {
        id: "sec-tpl-loc-form",
        type: "form",
        order: 3,
        isVisible: true,
        content: {
          headline: "Request Your Local Market Review",
          submitButtonText: "Submit Local Inquiry",
          leadSourceTag: "landing-page:local-growth",
        },
        styling: { backgroundColor: "#f8fafc", paddingY: "xl" },
      },
      {
        id: "sec-tpl-loc-foot",
        type: "footer",
        order: 4,
        isVisible: true,
        content: { copyrightText: "© 2026 Dr. Noopur Patel.", showLegalLinks: true },
        styling: { backgroundColor: "#0b132b", textColor: "#ffffff", paddingY: "md" },
      },
    ],
    defaultCta: {
      primaryCtaLabel: "Chat on WhatsApp",
      primaryCtaType: "whatsapp",
      primaryCtaTarget: "+919876543210",
    },
    defaultForm: {
      formTitle: "Request Your Local Market Review",
      submitButtonText: "Submit Local Inquiry",
      leadSourceTag: "landing-page:local-growth",
    },
    createdAt: "2026-08-01T00:00:00.000Z",
    updatedAt: "2026-08-01T00:00:00.000Z",
  },
];

/**
 * Retrieves all landing page templates for the Admin Template Gallery.
 */
export async function getAllLandingTemplatesAdmin(): Promise<LandingPageTemplate[]> {
  const adminDb = getAdminFirestore();

  if (!adminDb) {
    return [...SEED_LANDING_TEMPLATES];
  }

  try {
    const snapshot = await adminDb
      .collection(COLLECTIONS.LANDING_TEMPLATES)
      .orderBy("createdAt", "desc")
      .get();

    if (snapshot.empty) {
      // Seed default templates
      const batch = adminDb.batch();
      for (const tpl of SEED_LANDING_TEMPLATES) {
        const docRef = adminDb.collection(COLLECTIONS.LANDING_TEMPLATES).doc(tpl.id);
        const { id: _, ...data } = tpl;
        void _;
        batch.set(docRef, data);
      }
      await batch.commit();
      return [...SEED_LANDING_TEMPLATES];
    }

    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as Omit<LandingPageTemplate, "id">),
    }));
  } catch (error) {
    console.error("[landingTemplateService] Error fetching templates:", error);
    return [...SEED_LANDING_TEMPLATES];
  }
}

/**
 * Retrieves a single landing page template by ID.
 */
export async function getLandingTemplateByIdAdmin(id: string): Promise<LandingPageTemplate | null> {
  const adminDb = getAdminFirestore();

  if (!adminDb) {
    return SEED_LANDING_TEMPLATES.find((t) => t.id === id) || null;
  }

  try {
    const doc = await adminDb.collection(COLLECTIONS.LANDING_TEMPLATES).doc(id).get();
    if (!doc.exists) {
      return SEED_LANDING_TEMPLATES.find((t) => t.id === id) || null;
    }

    return {
      id: doc.id,
      ...(doc.data() as Omit<LandingPageTemplate, "id">),
    };
  } catch (error) {
    console.error(`[landingTemplateService] Error fetching template ${id}:`, error);
    return SEED_LANDING_TEMPLATES.find((t) => t.id === id) || null;
  }
}

/**
 * Saves a new template definition (e.g. exported from an existing landing page).
 */
export async function createLandingTemplate(
  input: CreateLandingPageTemplateInput
): Promise<LandingPageTemplate> {
  if (!input.name || !input.name.trim()) {
    throw new Error("Template name is required.");
  }
  if (!input.category || !input.category.trim()) {
    throw new Error("Template category is required.");
  }

  const now = new Date().toISOString();

  // Perform deep cloning of sections to create a clean template snapshot
  const clonedSections: LandingPageSection[] = JSON.parse(JSON.stringify(input.sections || []));

  const payload = {
    name: input.name.trim(),
    description: input.description?.trim() || "",
    category: input.category.trim(),
    tags: Array.isArray(input.tags) ? input.tags.map((t) => t.trim().toLowerCase()) : [],
    thumbnailUrl: input.thumbnailUrl || "",
    badge: input.badge || "",
    sections: clonedSections,
    defaultCta: input.defaultCta ? JSON.parse(JSON.stringify(input.defaultCta)) : undefined,
    defaultForm: input.defaultForm ? JSON.parse(JSON.stringify(input.defaultForm)) : undefined,
    createdAt: now,
    updatedAt: now,
  };

  const adminDb = getAdminFirestore();
  if (adminDb) {
    const docRef = await adminDb.collection(COLLECTIONS.LANDING_TEMPLATES).add(payload);
    return {
      id: docRef.id,
      ...payload,
    };
  }

  const mockTemplate: LandingPageTemplate = {
    id: `tpl-${Date.now()}`,
    ...payload,
  };
  SEED_LANDING_TEMPLATES.unshift(mockTemplate);
  return mockTemplate;
}

/**
 * Deletes a template master.
 */
export async function deleteLandingTemplate(id: string): Promise<boolean> {
  const adminDb = getAdminFirestore();

  if (adminDb) {
    const docRef = adminDb.collection(COLLECTIONS.LANDING_TEMPLATES).doc(id);
    const doc = await docRef.get();
    if (!doc.exists) {
      throw new Error(`Template with ID "${id}" does not exist.`);
    }
    await docRef.delete();
    return true;
  }

  const idx = SEED_LANDING_TEMPLATES.findIndex((t) => t.id === id);
  if (idx !== -1) {
    SEED_LANDING_TEMPLATES.splice(idx, 1);
    return true;
  }

  return false;
}

/**
 * Instantiates a brand new LandingPage from a template master.
 * CRITICAL: Clones template sections into independent Page Copies with freshly generated section IDs.
 */
export async function instantiateLandingPageFromTemplate(
  templateId: string,
  input: { title: string; slug: string }
): Promise<LandingPage> {
  const template = await getLandingTemplateByIdAdmin(templateId);
  if (!template) {
    throw new Error(`Template with ID "${templateId}" not found.`);
  }

  // Deep clone sections and assign fresh unique section IDs to guarantee Page Copy independence
  const independentSections: LandingPageSection[] = (template.sections || []).map((sec, idx) => ({
    ...JSON.parse(JSON.stringify(sec)),
    id: `sec-${Date.now()}-${idx}-${Math.random().toString(36).substring(2, 6)}`,
    order: idx,
  }));

  // Create independent landing page document using existing landingPageService
  return createLandingPage({
    title: input.title,
    slug: input.slug,
    templateId: template.id,
    status: "draft",
    sections: independentSections,
    cta: template.defaultCta ? JSON.parse(JSON.stringify(template.defaultCta)) : undefined,
    form: template.defaultForm ? JSON.parse(JSON.stringify(template.defaultForm)) : undefined,
  });
}

/**
 * Resets all landing page templates back to canonical seed defaults.
 * Wipes existing template records and batch re-inserts all 6 canonical blueprints.
 */
export async function resetLandingTemplatesAdmin(): Promise<LandingPageTemplate[]> {
  const adminDb = getAdminFirestore();

  if (adminDb) {
    try {
      const snapshot = await adminDb.collection(COLLECTIONS.LANDING_TEMPLATES).get();
      const deleteBatch = adminDb.batch();
      snapshot.docs.forEach((doc) => {
        deleteBatch.delete(doc.ref);
      });
      await deleteBatch.commit();

      const insertBatch = adminDb.batch();
      for (const tpl of SEED_LANDING_TEMPLATES) {
        const docRef = adminDb.collection(COLLECTIONS.LANDING_TEMPLATES).doc(tpl.id);
        const { id: _, ...data } = tpl;
        void _;
        insertBatch.set(docRef, data);
      }
      await insertBatch.commit();

      return JSON.parse(JSON.stringify(SEED_LANDING_TEMPLATES));
    } catch (error) {
      console.error("[landingTemplateService] Error resetting templates in Firestore:", error);
      return JSON.parse(JSON.stringify(SEED_LANDING_TEMPLATES));
    }
  }

  return JSON.parse(JSON.stringify(SEED_LANDING_TEMPLATES));
}
