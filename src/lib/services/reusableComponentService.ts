import { getAdminFirestore } from "@/lib/firebase/admin";
import { COLLECTIONS } from "@/config/firebase";
import {
  ReusableComponent,
  CreateReusableComponentInput,
  UpdateReusableComponentInput,
} from "@/types/landingPage";

// 11 In-memory canonical homepage-grade master components matching DigiVigee 1:1
const SEED_REUSABLE_COMPONENTS: ReusableComponent[] = [
  {
    id: "cmp-hero-enterprise",
    name: "Homepage Enterprise Hero + Logos Ribbon",
    category: "Hero",
    description: "Deep obsidian backdrop with emerald eyebrow, dual conversion CTAs, and Forbes/TechCrunch verified enterprise logo ribbon.",
    tags: ["hero", "b2b", "performance", "homepage-os"],
    sectionType: "hero",
    sectionContent: {
      eyebrow: "Enterprise Agency Growth OS",
      headline: "Scale 10x Client Retainers. Burn Out 0 Teams.",
      description:
        "Stop wasting your best agency talent on manual reporting and fragmented spreadsheets that Digivigee handles in seconds.",
      primaryCtaLabel: "Claim Your Free Proposal",
      primaryCtaTarget: "#lead-form",
      secondaryCtaLabel: "Explore Capabilities",
      secondaryCtaTarget: "#features",
      logosHeading: "Trusted by 2,350+ Scaling Agencies & Enterprises",
    },
    sectionStyling: {
      backgroundColor: "#0f172a",
      textColor: "#ffffff",
      paddingY: "xl",
    },
    createdAt: "2026-08-01T00:00:00.000Z",
    updatedAt: "2026-08-01T00:00:00.000Z",
  },
  {
    id: "cmp-bento-pillars",
    name: "Bento Role Pillars Grid (6 Core Workflows)",
    category: "Features",
    description: "High-contrast 2x3 bento feature cards with workflow tag badges and clean agency typography.",
    tags: ["features", "bento", "workflows", "homepage-os"],
    sectionType: "features",
    sectionContent: {
      sectionTitle: "Scale 10x Retainers. Burn Out 0 Teams.",
      sectionSubtitle:
        "Every agency department has manual work that DigiVigee automated frameworks handle seamlessly.",
      features: [
        {
          title: "Agency AI Agents",
          desc: "Build autonomous marketing workflows with Digivigee agents to handle campaign pacing, weekly reporting, and client follow-ups.",
        },
        {
          title: "Full-Funnel Attribution",
          desc: "Connect media buying ad accounts directly with CRM telemetry to prove bottom-line pipeline revenue.",
        },
        {
          title: "Campaign Velocity Engine",
          desc: "Launch omnichannel campaigns across Meta, Google, and LinkedIn in under 24 hours with pre-approved blueprints.",
        },
        {
          title: "Talent Retention Safeguard",
          desc: "Eliminate burnout-inducing routine tasks so your senior strategists focus purely on high-margin creative output.",
        },
        {
          title: "Executive Proof Portals",
          desc: "Live white-label client dashboards showing ROAS, CAC, and pipeline progression updated in real-time.",
        },
        {
          title: "Predictable Scaling Framework",
          desc: "Standard operating procedures designed to take agencies from $50k MRR to eight-figure enterprise retainers.",
        },
      ],
    },
    sectionStyling: {
      backgroundColor: "#F8FAFC",
      textColor: "#0f172a",
      paddingY: "xl",
    },
    createdAt: "2026-08-01T00:00:00.000Z",
    updatedAt: "2026-08-01T00:00:00.000Z",
  },
  {
    id: "cmp-services-suite",
    name: "Full-Funnel Capabilities Suite (6 Services)",
    category: "Services",
    description: "Enterprise capability cards covering Meta/Google Ads, CRO Funnel Engineering, SEO Scaling Engine, B2B Lead Gen, Retention & AI Growth.",
    tags: ["services", "capabilities", "full-funnel", "homepage-os"],
    sectionType: "services",
    sectionContent: {
      sectionTitle: "Full-Funnel Agency Growth Capabilities",
      sectionSubtitle: "Engineered to capture high-intent demand, optimize conversions, and scale retained revenue.",
      services: [
        {
          icon: "🎯",
          title: "Performance Paid Media",
          desc: "High-ROAS media buying across Meta Ads, Google Performance Max, and LinkedIn with algorithmic bidding.",
        },
        {
          icon: "⚡",
          title: "CRO & Funnel Engineering",
          desc: "Silicon Valley-grade landing page design and rapid A/B experimentation to multiply inbound conversions.",
        },
        {
          icon: "📈",
          title: "SEO Scaling Engine",
          desc: "Topical authority architecture, technical health audits, and programmatic content engines for sustained dominance.",
        },
        {
          icon: "💼",
          title: "B2B Outbound Lead Gen",
          desc: "Precision account-based marketing, verified prospect data, and warm executive appointment scheduling.",
        },
        {
          icon: "🔄",
          title: "Retention & Lifecycle Marketing",
          desc: "Automated email sequences, SMS remarketing, and churn reduction strategies that expand customer lifetime value.",
        },
        {
          icon: "🤖",
          title: "AI Automation Workflows",
          desc: "Custom Zapier, Make, and AI agents automating lead routing, reporting digests, and client onboarding.",
        },
      ],
    },
    sectionStyling: {
      backgroundColor: "#ffffff",
      textColor: "#0f172a",
      paddingY: "xl",
    },
    createdAt: "2026-08-01T00:00:00.000Z",
    updatedAt: "2026-08-01T00:00:00.000Z",
  },
  {
    id: "cmp-proof-counter",
    name: "Agency Growth & Scale Proof Counter",
    category: "Trust",
    description: "Prominent 4-metric statistics counter displaying retainers scaled, ad spend managed, retention, and ROAS lift.",
    tags: ["stats", "proof", "trust", "homepage-os"],
    sectionType: "statistics",
    sectionContent: {
      stats: [
        { value: "2,350+", label: "Retainers Scaled" },
        { value: "$142M+", label: "Ad Spend Managed" },
        { value: "99.8%", label: "Client Retention Rate" },
        { value: "3.8x", label: "Average ROAS Lift" },
      ],
    },
    sectionStyling: {
      backgroundColor: "#0f172a",
      textColor: "#ffffff",
      paddingY: "lg",
    },
    createdAt: "2026-08-01T00:00:00.000Z",
    updatedAt: "2026-08-01T00:00:00.000Z",
  },
  {
    id: "cmp-testimonial-wall",
    name: "Verified Executive Social Proof Wall",
    category: "Testimonials",
    description: "Dual-split social proof block with verified executive attribution from Kalpvruksh Group.",
    tags: ["testimonials", "social-proof", "reviews", "homepage-os"],
    sectionType: "testimonials",
    sectionContent: {
      quote:
        "DigiVigee completely restructured our acquisition pipeline. We achieved a 3.4x lift in qualified inbound enterprise inquiries within 90 days while reducing our blended customer acquisition cost by 42%.",
      author: "Rajesh Patel",
      role: "Managing Director, Kalpvruksh Group",
    },
    sectionStyling: {
      backgroundColor: "#F8FAFC",
      textColor: "#0f172a",
      paddingY: "xl",
    },
    createdAt: "2026-08-01T00:00:00.000Z",
    updatedAt: "2026-08-01T00:00:00.000Z",
  },
  {
    id: "cmp-portfolio-showcase",
    name: "High-Impact Enterprise Case Studies",
    category: "Trust",
    description: "Featured case study cards with verified performance metrics and strategic summaries.",
    tags: ["portfolio", "case-studies", "results", "homepage-os"],
    sectionType: "portfolio",
    sectionContent: {
      sectionTitle: "Proven Client Transformation Case Studies",
      projects: [
        {
          category: "E-Commerce / D2C",
          title: "Kalpvruksh Luxury Organics",
          metric: "+340% Revenue Growth",
          summary:
            "Scaled monthly recurring revenue from $45k to $198k via Omnichannel Meta/Google PMax and high-converting funnel design.",
        },
        {
          category: "FinTech Platform",
          title: "Apex Capital Wealth OS",
          metric: "4.2x ROAS in 60 Days",
          summary:
            "Restructured B2B demand generation funnels, driving 1,200+ qualified investor consultation calls.",
        },
        {
          category: "B2B SaaS Engine",
          title: "CloudFlow DevOps Studio",
          metric: "-48% Cost Per Acquisition",
          summary:
            "Engineered programmatic SEO architecture and LinkedIn executive outbound, yielding $2.1M in ARR pipeline.",
        },
      ],
    },
    sectionStyling: {
      backgroundColor: "#ffffff",
      textColor: "#0f172a",
      paddingY: "xl",
    },
    createdAt: "2026-08-01T00:00:00.000Z",
    updatedAt: "2026-08-01T00:00:00.000Z",
  },
  {
    id: "cmp-pricing-tiers",
    name: "Transparent Retainer Pricing Table (3 Tiers)",
    category: "Pricing",
    description: "Comparison package tiers with feature checklists, popular badge, and direct consultation CTAs.",
    tags: ["pricing", "retainers", "conversion", "homepage-os"],
    sectionType: "pricing",
    sectionContent: {
      sectionTitle: "Flexible Campaign Packages",
      sectionSubtitle: "Transparent structures designed to scale seamlessly with your monthly acquisition budget.",
      tiers: [
        {
          name: "Growth Starter",
          price: "$950",
          period: "/month",
          highlighted: false,
          features: [
            "2 Ad Platforms (Meta + Google)",
            "Bi-Weekly Strategy Sprints",
            "Custom Real-Time Dashboard",
            "Standard Creative Refresh",
          ],
          ctaLabel: "Get Started",
          ctaTarget: "#lead-form",
        },
        {
          name: "Scale Accelerator",
          price: "$1,850",
          period: "/month",
          highlighted: true,
          badge: "Most Popular",
          features: [
            "Omnichannel Ads (Meta, Google, LinkedIn)",
            "Weekly Executive Strategy Sprints",
            "Full Funnel CRO & Landing Page A/B Testing",
            "Priority Slack & WhatsApp Support",
            "Dedicated Media Buyer & Creative Director",
          ],
          ctaLabel: "Claim Accelerator",
          ctaTarget: "#lead-form",
        },
        {
          name: "Enterprise Custom",
          price: "Custom",
          period: "Retainer",
          highlighted: false,
          features: [
            "Dedicated Full-Stack Growth Pod",
            "Unlimited Funnel & Creative Sprints",
            "Custom Multi-Touch Attribution",
            "White-Glove Executive Support",
            "Guaranteed Pipeline Milestones",
          ],
          ctaLabel: "Contact Enterprise",
          ctaTarget: "#lead-form",
        },
      ],
    },
    sectionStyling: {
      backgroundColor: "#F8FAFC",
      textColor: "#0f172a",
      paddingY: "xl",
    },
    createdAt: "2026-08-01T00:00:00.000Z",
    updatedAt: "2026-08-01T00:00:00.000Z",
  },
  {
    id: "cmp-faq-clearance",
    name: "High-Conversion FAQ Objection Clearance",
    category: "FAQ",
    description: "Addresses top enterprise buyer questions regarding turnaround speed, budgets, and reporting dashboards.",
    tags: ["faq", "objections", "support", "homepage-os"],
    sectionType: "faq",
    sectionContent: {
      sectionTitle: "Frequently Asked Questions",
      items: [
        {
          question: "How quickly can we launch our first campaign sprint?",
          answer:
            "Typically within 5 to 7 business days following our initial technical tracking audit, competitor reconnaissance, and creative blueprint signoff.",
        },
        {
          question: "What monthly ad spend budgets do you work with?",
          answer:
            "We manage campaigns across a broad spectrum, ranging from high-growth local businesses spending $3,000/mo to large enterprise accounts deploying $100k+/month.",
        },
        {
          question: "How is performance tracked and verified?",
          answer:
            "You receive access to a 24/7 real-time telemetry dashboard integrated directly with your ad accounts and CRM, plus weekly Loom video executive summaries.",
        },
        {
          question: "Are there long-term lock-in contracts?",
          answer:
            "No. All our standard retainers operate on flexible 90-day growth sprints with transparent monthly milestones.",
        },
      ],
    },
    sectionStyling: {
      backgroundColor: "#ffffff",
      textColor: "#0f172a",
      paddingY: "xl",
    },
    createdAt: "2026-08-01T00:00:00.000Z",
    updatedAt: "2026-08-01T00:00:00.000Z",
  },
  {
    id: "cmp-lead-capture",
    name: "High-Converting Lead Capture Form Card",
    category: "Conversion",
    description: "Clean lead generation form card with trust assurances and instant inquiry routing.",
    tags: ["form", "lead-capture", "conversion", "homepage-os"],
    sectionType: "form",
    sectionContent: {
      headline: "Claim Your Free Strategic Growth Proposal",
      subheadline:
        "Receive a complimentary 15-minute acquisition audit, competitor gap analysis, and tailored 90-day roadmap.",
      leadSourceTag: "landing_page_master_component",
    },
    sectionStyling: {
      backgroundColor: "#F8FAFC",
      textColor: "#0f172a",
      paddingY: "xl",
    },
    createdAt: "2026-08-01T00:00:00.000Z",
    updatedAt: "2026-08-01T00:00:00.000Z",
  },
  {
    id: "cmp-cta-banner",
    name: "Final Conversion Banner (Deep Emerald Gradient)",
    category: "Conversion",
    description: "High-impact final conversion section with emerald gradient background and dual trust buttons.",
    tags: ["cta", "banner", "conversion", "homepage-os"],
    sectionType: "cta",
    sectionContent: {
      headline: "Ready to Scale 10x Client Retainers?",
      subheadline:
        "Join 2,350+ agencies and enterprise leaders growing predictably with DigiVigee. Zero lock-in contracts.",
      buttonLabel: "Request Strategic Consultation",
      buttonTarget: "#lead-form",
    },
    sectionStyling: {
      backgroundColor: "linear-gradient(135deg, #064e3b 0%, #065f46 50%, #047857 100%)",
      textColor: "#ffffff",
      paddingY: "xl",
    },
    createdAt: "2026-08-01T00:00:00.000Z",
    updatedAt: "2026-08-01T00:00:00.000Z",
  },
  {
    id: "cmp-process-workflow",
    name: "4-Step Agency OS Delivery Framework",
    category: "Features",
    description: "Sequential step-by-step cards outlining Audit, Blueprint Architecture, Omnichannel Scale, and Optimization.",
    tags: ["process", "framework", "steps", "homepage-os"],
    sectionType: "process",
    sectionContent: {
      heading: "Our Proven 4-Step Agency Delivery Framework",
      steps: [
        {
          step: "01",
          title: "Comprehensive Audit",
          desc: "Deep technical tracking inspection, ad account audit, and competitor benchmark mapping.",
        },
        {
          step: "02",
          title: "Architecture Sprint",
          desc: "Design high-converting landing funnels, configure CRM pipelines, and draft creative messaging.",
        },
        {
          step: "03",
          title: "Omnichannel Launch",
          desc: "Deploy algorithmic ad campaigns across Meta and Google with calibrated conversion signals.",
        },
        {
          step: "04",
          title: "Aggressive Optimization",
          desc: "Weekly A/B test iterations, creative refreshes, and budget reallocation to highest-performing assets.",
        },
      ],
    },
    sectionStyling: {
      backgroundColor: "#ffffff",
      textColor: "#0f172a",
      paddingY: "xl",
    },
    createdAt: "2026-08-01T00:00:00.000Z",
    updatedAt: "2026-08-01T00:00:00.000Z",
  },
];

/**
 * Retrieves all reusable master components for the Admin Library.
 */
export async function getAllReusableComponentsAdmin(): Promise<ReusableComponent[]> {
  const adminDb = getAdminFirestore();

  if (!adminDb) {
    return [...SEED_REUSABLE_COMPONENTS];
  }

  try {
    const snapshot = await adminDb
      .collection(COLLECTIONS.REUSABLE_COMPONENTS)
      .orderBy("createdAt", "desc")
      .get();

    if (snapshot.empty) {
      // Seed default master components
      const batch = adminDb.batch();
      for (const comp of SEED_REUSABLE_COMPONENTS) {
        const docRef = adminDb.collection(COLLECTIONS.REUSABLE_COMPONENTS).doc(comp.id);
        const { id: _, ...data } = comp;
        void _;
        batch.set(docRef, data);
      }
      await batch.commit();
      return [...SEED_REUSABLE_COMPONENTS];
    }

    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as Omit<ReusableComponent, "id">),
    }));
  } catch (error) {
    console.error("[reusableComponentService] Failed to fetch master components:", error);
    return [...SEED_REUSABLE_COMPONENTS];
  }
}

/**
 * Retrieves a single reusable master component by ID.
 */
export async function getReusableComponentByIdAdmin(id: string): Promise<ReusableComponent | null> {
  const adminDb = getAdminFirestore();

  if (!adminDb) {
    return SEED_REUSABLE_COMPONENTS.find((c) => c.id === id) || null;
  }

  try {
    const doc = await adminDb.collection(COLLECTIONS.REUSABLE_COMPONENTS).doc(id).get();
    if (!doc.exists) {
      return SEED_REUSABLE_COMPONENTS.find((c) => c.id === id) || null;
    }

    return {
      id: doc.id,
      ...(doc.data() as Omit<ReusableComponent, "id">),
    };
  } catch (error) {
    console.error(`[reusableComponentService] Error fetching component ${id}:`, error);
    return SEED_REUSABLE_COMPONENTS.find((c) => c.id === id) || null;
  }
}

/**
 * Creates a new Master Component from a serialized snapshot.
 */
export async function createReusableComponent(
  input: CreateReusableComponentInput
): Promise<ReusableComponent> {
  if (!input.name || !input.name.trim()) {
    throw new Error("Component name is required.");
  }
  if (!input.category || !input.category.trim()) {
    throw new Error("Component category is required.");
  }
  if (!input.sectionType) {
    throw new Error("Section type is required.");
  }

  const now = new Date().toISOString();

  // Perform deep structured cloning to ensure total isolation
  const payload = {
    name: input.name.trim(),
    category: input.category.trim(),
    description: input.description?.trim() || "",
    tags: Array.isArray(input.tags) ? input.tags.map((t) => t.trim().toLowerCase()) : [],
    sectionType: input.sectionType,
    sectionContent: JSON.parse(JSON.stringify(input.sectionContent || {})),
    sectionStyling: input.sectionStyling ? JSON.parse(JSON.stringify(input.sectionStyling)) : undefined,
    createdAt: now,
    updatedAt: now,
  };

  const adminDb = getAdminFirestore();
  if (adminDb) {
    const docRef = await adminDb.collection(COLLECTIONS.REUSABLE_COMPONENTS).add(payload);
    return {
      id: docRef.id,
      ...payload,
    };
  }

  const mockComponent: ReusableComponent = {
    id: `comp-${Date.now()}`,
    ...payload,
  };
  SEED_REUSABLE_COMPONENTS.unshift(mockComponent);
  return mockComponent;
}

/**
 * Updates a master component's metadata or snapshot.
 * Note: Does NOT modify already-inserted Page Copies.
 */
export async function updateReusableComponent(
  id: string,
  input: UpdateReusableComponentInput
): Promise<ReusableComponent> {
  const existing = await getReusableComponentByIdAdmin(id);
  if (!existing) {
    throw new Error(`Master component with ID "${id}" does not exist.`);
  }

  const now = new Date().toISOString();
  const updated: ReusableComponent = {
    ...existing,
    name: input.name !== undefined ? input.name.trim() : existing.name,
    category: input.category !== undefined ? input.category.trim() : existing.category,
    description: input.description !== undefined ? input.description.trim() : existing.description,
    tags: input.tags !== undefined ? input.tags.map((t) => t.trim().toLowerCase()) : existing.tags,
    sectionContent: input.sectionContent !== undefined ? JSON.parse(JSON.stringify(input.sectionContent)) : existing.sectionContent,
    sectionStyling: input.sectionStyling !== undefined ? JSON.parse(JSON.stringify(input.sectionStyling)) : existing.sectionStyling,
    updatedAt: now,
  };

  const adminDb = getAdminFirestore();
  if (adminDb) {
    const payload = { ...updated } as Partial<ReusableComponent>;
    delete payload.id;
    await adminDb.collection(COLLECTIONS.REUSABLE_COMPONENTS).doc(id).set(payload, { merge: true });
  } else {
    const idx = SEED_REUSABLE_COMPONENTS.findIndex((c) => c.id === id);
    if (idx !== -1) {
      SEED_REUSABLE_COMPONENTS[idx] = updated;
    }
  }

  return updated;
}

/**
 * Duplicates a master component, creating an independent master definition with fresh ID.
 */
export async function duplicateReusableComponent(id: string): Promise<ReusableComponent> {
  const original = await getReusableComponentByIdAdmin(id);
  if (!original) {
    throw new Error(`Master component with ID "${id}" does not exist.`);
  }

  const duplicateInput: CreateReusableComponentInput = {
    name: `${original.name} (Copy)`,
    category: original.category,
    description: original.description,
    tags: [...(original.tags || [])],
    sectionType: original.sectionType,
    sectionContent: JSON.parse(JSON.stringify(original.sectionContent)),
    sectionStyling: original.sectionStyling ? JSON.parse(JSON.stringify(original.sectionStyling)) : undefined,
  };

  return createReusableComponent(duplicateInput);
}

/**
 * Deletes a master component.
 * CRITICAL: Page sections previously created from this component remain 100% intact.
 */
export async function deleteReusableComponent(id: string): Promise<boolean> {
  const adminDb = getAdminFirestore();

  if (adminDb) {
    const docRef = adminDb.collection(COLLECTIONS.REUSABLE_COMPONENTS).doc(id);
    const doc = await docRef.get();
    if (!doc.exists) {
      throw new Error(`Master component with ID "${id}" does not exist.`);
    }
    await docRef.delete();
    return true;
  }

  const idx = SEED_REUSABLE_COMPONENTS.findIndex((c) => c.id === id);
  if (idx !== -1) {
    SEED_REUSABLE_COMPONENTS.splice(idx, 1);
    return true;
  }

  return false;
}

/**
 * 1-Click "Reset to Defaults": Restores all 11 canonical DigiVigee homepage-grade
 * master components into Firestore / in-memory store.
 */
export async function resetReusableComponentsAdmin(): Promise<ReusableComponent[]> {
  const adminDb = getAdminFirestore();

  if (adminDb) {
    try {
      // 1. Fetch and batch delete all existing reusable components
      const snapshot = await adminDb.collection(COLLECTIONS.REUSABLE_COMPONENTS).get();
      const deleteBatch = adminDb.batch();
      snapshot.docs.forEach((doc) => {
        deleteBatch.delete(doc.ref);
      });
      await deleteBatch.commit();

      // 2. Batch set the canonical 11 master components
      const insertBatch = adminDb.batch();
      for (const comp of SEED_REUSABLE_COMPONENTS) {
        const docRef = adminDb.collection(COLLECTIONS.REUSABLE_COMPONENTS).doc(comp.id);
        const { id: _, ...data } = comp;
        void _;
        insertBatch.set(docRef, {
          ...data,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        });
      }
      await insertBatch.commit();

      // 3. Return fresh list from Firestore
      const freshSnapshot = await adminDb
        .collection(COLLECTIONS.REUSABLE_COMPONENTS)
        .orderBy("createdAt", "desc")
        .get();

      return freshSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<ReusableComponent, "id">),
      }));
    } catch (err) {
      console.error("[reusableComponentService] Error resetting components in Firestore:", err);
      return [...SEED_REUSABLE_COMPONENTS];
    }
  }

  // Memory fallback
  return [...SEED_REUSABLE_COMPONENTS];
}

