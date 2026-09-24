import { getAdminFirestore } from "@/lib/firebase/admin";
import { COLLECTIONS } from "@/config/firebase";
import {
  getAllCmsServicesAdmin,
  getAllCmsPortfolioAdmin,
  getAllCmsFaqsAdmin,
  getAllCmsTestimonialsAdmin,
  getAllCmsTeamMembersAdmin,
  getAllCmsBlogPostsAdmin,
} from "@/lib/services/cmsService";
import { getAllMediaAdmin } from "@/lib/services/mediaService";
import { getAllSubscribersAdmin } from "@/lib/services/subscriberService";
import { getAllOffersAdmin } from "@/lib/services/offerService";
import { getAllRedirectsAdmin } from "@/lib/services/redirectService";
import { getSeoHealthAudit } from "@/lib/services/seoService";
import { getAllLandingPagesAdmin } from "@/lib/services/landingPageService";

export interface DashboardLeadItem {
  id: string;
  name: string;
  email: string;
  phone?: string;
  service?: string;
  status: string;
  createdAt: string;
}

export interface DashboardMetrics {
  totalLeads: number;
  newLeads: number;
  publishedBlogs: number;
  totalServices: number;
  portfolioProjects: number;
  totalFaqs: number;
  totalTestimonials: number;
  totalTeamMembers: number;
  totalMedia?: number;
  totalDrafts?: number;
  totalSubscribers?: number;
  activeOffers?: number;
  activeRedirects?: number;
  seoHealthScore?: number;
  totalLandingPages?: number;
  totalPageViews?: number;
  uniqueVisitors?: number;
}

export interface DashboardSummary {
  metrics: DashboardMetrics;
  recentLeads: DashboardLeadItem[];
  systemStatus: {
    authStatus: "connected" | "disconnected";
    firestoreStatus: "connected" | "disconnected" | "local_fallback";
    sessionSecurity: "active";
    nodeEnv: string;
  };
}

/**
 * Retrieves aggregated dashboard metrics, recent real leads from Firestore, and dynamic CMS content counts.
 */
export async function getDashboardSummary(): Promise<DashboardSummary> {
  let totalLeads = 0;
  let newLeads = 0;
  const recentLeads: DashboardLeadItem[] = [];
  let firestoreStatus: "connected" | "disconnected" | "local_fallback" = "local_fallback";

  const adminDb = getAdminFirestore();

  if (adminDb) {
    try {
      // 1. Fetch recent leads ordered by createdAt descending (limit 5)
      const leadsSnapshot = await adminDb
        .collection(COLLECTIONS.LEADS)
        .orderBy("createdAt", "desc")
        .limit(5)
        .get();

      firestoreStatus = "connected";

      leadsSnapshot.forEach((doc) => {
        const data = doc.data();
        let createdAtFormatted = new Date().toLocaleDateString("en-IN", {
          day: "numeric",
          month: "short",
          year: "numeric",
        });

        if (data.createdAt && typeof data.createdAt.toDate === "function") {
          createdAtFormatted = data.createdAt.toDate().toLocaleDateString("en-IN", {
            day: "numeric",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          });
        }

        recentLeads.push({
          id: doc.id,
          name: data.name || "Anonymous",
          email: data.email || "—",
          phone: data.phone || undefined,
          service: data.serviceInterestedIn || undefined,
          status: data.status || "new",
          createdAt: createdAtFormatted,
        });
      });

      // 2. Fetch total count of leads
      const countSnapshot = await adminDb.collection(COLLECTIONS.LEADS).count().get();
      totalLeads = countSnapshot.data().count;

      // 3. Fetch count of new leads
      const newCountSnapshot = await adminDb
        .collection(COLLECTIONS.LEADS)
        .where("status", "==", "new")
        .count()
        .get();
      newLeads = newCountSnapshot.data().count;
    } catch (error) {
      console.warn("[Dr. Noopur Patel Dashboard Engine] Firestore query warning:", error);
      firestoreStatus = "disconnected";
    }
  }

  const [
    services,
    portfolio,
    faqs,
    testimonials,
    team,
    blogs,
    media,
    subscribers,
    offers,
    redirects,
    seoAudit,
    landingPages,
  ] = await Promise.all([
    getAllCmsServicesAdmin(),
    getAllCmsPortfolioAdmin(),
    getAllCmsFaqsAdmin(),
    getAllCmsTestimonialsAdmin(),
    getAllCmsTeamMembersAdmin(),
    getAllCmsBlogPostsAdmin(),
    getAllMediaAdmin(),
    getAllSubscribersAdmin(),
    getAllOffersAdmin(),
    getAllRedirectsAdmin(),
    getSeoHealthAudit(),
    getAllLandingPagesAdmin(),
  ]);

  const blogDrafts = blogs.filter((p) => p.status === "draft").length;
  const serviceDrafts = services.filter((s) => !s.isPublished).length;
  const portfolioDrafts = portfolio.filter((p) => !p.isPublished).length;
  const landingDrafts = landingPages.filter((lp) => lp.status === "draft").length;
  const totalDrafts = blogDrafts + serviceDrafts + portfolioDrafts + landingDrafts;

  const activeOffers = offers.filter((o) => o.isActive).length;
  const activeRedirects = redirects.filter((r) => r.isActive).length;

  let totalPageViews = 0;
  let uniqueVisitors = 0;
  if (adminDb) {
    try {
      const evSnap = await adminDb.collection(COLLECTIONS.ANALYTICS_EVENTS).limit(1000).get();
      totalPageViews = evSnap.size;
      const vSet = new Set<string>();
      evSnap.forEach((d) => {
        const vid = d.data().visitorId;
        if (vid && vid !== "unknown") vSet.add(vid);
      });
      uniqueVisitors = vSet.size;
    } catch {
      // Non-blocking fallback
    }
  }

  return {
    metrics: {
      totalLeads,
      newLeads,
      publishedBlogs: blogs.filter((p) => p.status === "published").length,
      totalServices: services.length,
      portfolioProjects: portfolio.length,
      totalFaqs: faqs.length,
      totalTestimonials: testimonials.length,
      totalTeamMembers: team.length,
      totalMedia: media.length,
      totalDrafts,
      totalSubscribers: subscribers.length,
      activeOffers,
      activeRedirects,
      seoHealthScore: seoAudit.overallScore,
      totalLandingPages: landingPages.length,
      totalPageViews,
      uniqueVisitors,
    },
    recentLeads,
    systemStatus: {
      authStatus: "connected",
      firestoreStatus,
      sessionSecurity: "active",
      nodeEnv: process.env.NODE_ENV || "development",
    },
  };
}
