import * as admin from "firebase-admin";
import { FieldValue } from "firebase-admin/firestore";
import { getAdminFirestore } from "@/lib/firebase/admin";
import { COLLECTIONS } from "@/config/firebase";
import { SERVICES_DATA } from "@/data/services";
import { PORTFOLIO_DATA } from "@/data/portfolio";
import { BLOG_POSTS_DATA } from "@/data/blog";
import { TESTIMONIALS_DATA } from "@/data/testimonials";
import { FAQS_DATA } from "@/data/faqs";
import { TEAM_MEMBERS_DATA } from "@/data/team";
import {
  DEFAULT_HOME_PAGE_CONTENT,
  DEFAULT_ABOUT_PAGE_CONTENT,
  DEFAULT_CONTACT_PAGE_CONTENT,
  DEFAULT_SITE_SETTINGS,
  revalidateWebsitePages,
} from "@/lib/services/cmsService";
import { DEFAULT_SEED_OFFERS } from "@/lib/services/offerService";
import { SYSTEM_ROLES } from "@/lib/auth/rbac";

export interface SyncStats {
  services: number;
  portfolio: number;
  blogs: number;
  testimonials: number;
  faqs: number;
  team: number;
  pages: number;
  settings: number;
  offers: number;
  roles: number;
  adminUsers: number;
}

export interface SyncResult {
  success: boolean;
  message: string;
  stats?: SyncStats;
  error?: string;
}

/**
 * Safely synchronizes and seeds all initial static datasets into live Cloud Firestore collections.
 * Uses merge writes so existing customizations are not destroyed.
 */
export async function syncAllDataToFirestore(): Promise<SyncResult> {
  const adminDb = getAdminFirestore();

  if (!adminDb) {
    return {
      success: false,
      message: "Firebase Admin Firestore is not initialized. Please verify Firebase Admin credentials in environment variables.",
      error: "Firebase Admin Firestore is not initialized.",
    };
  }

  try {
    const stats: SyncStats = {
      services: 0,
      portfolio: 0,
      blogs: 0,
      testimonials: 0,
      faqs: 0,
      team: 0,
      pages: 0,
      settings: 0,
      offers: 0,
      roles: 0,
      adminUsers: 0,
    };

    const timestamp = FieldValue.serverTimestamp();

    // 1. Services Collection
    for (const service of SERVICES_DATA) {
      const docRef = adminDb.collection(COLLECTIONS.SERVICES).doc(service.id);
      await docRef.set({ ...service, updatedAt: timestamp }, { merge: true });
      stats.services++;
    }

    // 2. Portfolio Collection
    for (const item of PORTFOLIO_DATA) {
      const docRef = adminDb.collection(COLLECTIONS.PORTFOLIO).doc(item.id);
      await docRef.set({ ...item, updatedAt: timestamp }, { merge: true });
      stats.portfolio++;
    }

    // 3. Blogs Collection
    for (const blog of BLOG_POSTS_DATA) {
      const docRef = adminDb.collection(COLLECTIONS.BLOGS).doc(blog.id);
      await docRef.set({ ...blog, updatedAt: timestamp }, { merge: true });
      stats.blogs++;
    }

    // 4. Testimonials Collection
    for (const testimonial of TESTIMONIALS_DATA) {
      const docRef = adminDb.collection(COLLECTIONS.TESTIMONIALS).doc(testimonial.id);
      await docRef.set({ ...testimonial, updatedAt: timestamp }, { merge: true });
      stats.testimonials++;
    }

    // 5. FAQs Collection
    for (const faq of FAQS_DATA) {
      const docRef = adminDb.collection(COLLECTIONS.FAQS).doc(faq.id);
      await docRef.set({ ...faq, updatedAt: timestamp }, { merge: true });
      stats.faqs++;
    }

    // 6. Team Collection
    for (const member of TEAM_MEMBERS_DATA) {
      const docRef = adminDb.collection(COLLECTIONS.TEAM).doc(member.id);
      await docRef.set({ ...member, updatedAt: timestamp }, { merge: true });
      stats.team++;
    }

    // 7. Pages Collection
    await adminDb.collection(COLLECTIONS.PAGES).doc("home").set({ ...DEFAULT_HOME_PAGE_CONTENT, updatedAt: timestamp }, { merge: true });
    await adminDb.collection(COLLECTIONS.PAGES).doc("about").set({ ...DEFAULT_ABOUT_PAGE_CONTENT, updatedAt: timestamp }, { merge: true });
    await adminDb.collection(COLLECTIONS.PAGES).doc("contact").set({ ...DEFAULT_CONTACT_PAGE_CONTENT, updatedAt: timestamp }, { merge: true });
    stats.pages = 3;

    // 8. Site Settings Collection
    await adminDb.collection(COLLECTIONS.SITE_SETTINGS).doc("global").set({ ...DEFAULT_SITE_SETTINGS, updatedAt: timestamp }, { merge: true });
    stats.settings = 1;

    // 9. Promotional Offers Collection
    for (const offer of DEFAULT_SEED_OFFERS) {
      const docRef = adminDb.collection(COLLECTIONS.OFFERS).doc(offer.id);
      await docRef.set({ ...offer, updatedAt: timestamp }, { merge: true });
      stats.offers++;
    }

    // 10. RBAC Roles Collection
    for (const role of Object.values(SYSTEM_ROLES)) {
      const docRef = adminDb.collection(COLLECTIONS.ROLES).doc(role.id);
      await docRef.set({ ...role, updatedAt: timestamp }, { merge: true });
      stats.roles++;
    }

    // 10. Super Admin User
    const adminUserRef = adminDb.collection(COLLECTIONS.ADMIN_USERS).doc("default-super-admin");
    await adminUserRef.set({
      id: "default-super-admin",
      email: "admin@digivigee.com",
      displayName: "DigiVigee Administrator",
      roleId: "super_admin",
      isActive: true,
      updatedAt: timestamp,
    }, { merge: true });
    stats.adminUsers = 1;

    // Trigger instant cache revalidation across all public pages
    revalidateWebsitePages();

    return {
      success: true,
      message: "All 10 platform CMS collections synchronized with Firestore successfully.",
      stats,
    };
  } catch (error) {
    console.error("[syncAllDataToFirestore] Error:", error);
    return {
      success: false,
      message: "An unexpected error occurred during database synchronization.",
      error: error instanceof Error ? error.message : "An unexpected error occurred.",
    };
  }
}
