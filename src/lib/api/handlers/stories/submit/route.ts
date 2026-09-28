import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { COLLECTIONS } from "@/config/firebase";
import { saveCmsItem } from "@/lib/services/cmsService";
import { notifyLiveSync } from "@/lib/sync/clientSync";
import { recordAuditLog } from "@/lib/services/auditLogService";
import { TestimonialItem } from "@/types";

export const dynamic = "force-dynamic";

const submitSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  city: z.string().min(2, "City must be at least 2 characters").max(100),
  category: z.string().min(2, "Please select a care category"),
  rating: z.coerce.number().min(1).max(5).default(5),
  story: z.string().min(10, "Please share a few words about your journey (at least 10 characters)").max(3000),
  isAnonymous: z.boolean().default(false),
  photoUrl: z.string().optional().nullable(),
  videoUrl: z.string().optional().nullable(),
  phone: z.string().max(20).optional().nullable(),
  email: z.string().email().optional().nullable().or(z.literal("")),
  verifiedConsent: z.boolean().refine((val) => val === true, {
    message: "Consent to share your experience is required.",
  }),
});

export async function POST(request: NextRequest) {
  try {
    const json = await request.json();
    const parsed = submitSchema.safeParse(json);

    if (!parsed.success) {
      const firstError = parsed.error.issues[0]?.message || "Invalid submission data.";
      return NextResponse.json(
        { success: false, error: firstError, details: parsed.error.issues },
        { status: 400 }
      );
    }

    const {
      name,
      city,
      category,
      rating,
      story,
      isAnonymous,
      photoUrl,
      videoUrl,
      phone,
      email,
      verifiedConsent,
    } = parsed.data;

    // Determine public display name
    const publicDisplayName = isAnonymous
      ? `Patient from ${city.trim()}`
      : name.trim();

    // Default avatar choice based on a friendly palette
    const defaultAvatars = [
      "/images/doctor/assets/patient-avatar-1.png",
      "/images/doctor/assets/patient-avatar-2.png",
      "/images/doctor/assets/patient-avatar-3.png",
    ];
    const assignedAvatar = photoUrl || defaultAvatars[Math.floor(Math.random() * defaultAvatars.length)];

    const docId = `story-${Date.now()}`;
    const payload: Partial<TestimonialItem> = {
      id: docId,
      clientName: publicDisplayName,
      realName: name.trim(),
      isAnonymous,
      clientRole: category.trim(),
      companyName: "Patient Care Journey",
      rating,
      testimonial: story.trim(),
      serviceReceived: category.trim(),
      city: city.trim(),
      category: category.trim(),
      clientAvatar: assignedAvatar,
      photoUrl: photoUrl || undefined,
      videoUrl: videoUrl?.trim() || undefined,
      mediaType: videoUrl?.trim() ? "video" : photoUrl ? "photo" : "text",
      phone: phone?.trim() || undefined,
      email: email ? email.trim() : undefined,
      verifiedConsent,
      // Critical moderation defaults:
      status: "pending", // Pending review by Dr. Noopur Patel
      isPublished: false, // Hidden until Dr. Noopur approves
      isFeatured: false,
      order: 99,
      submittedAt: new Date().toISOString(),
    };

    const saveResult = await saveCmsItem(COLLECTIONS.TESTIMONIALS, payload, docId);

    if (!saveResult.success) {
      return NextResponse.json(
        { success: false, error: saveResult.error || "Failed to save submission." },
        { status: 500 }
      );
    }

    // Trigger real-time cross-tab and cross-device sync for Dr. Noopur's admin panel
    notifyLiveSync("testimonials", docId);

    // Audit log entry for governance
    try {
      await recordAuditLog({
        actor: {
          uid: "public-patient",
          email: email || "patient@public.submission",
          displayName: publicDisplayName,
          role: "viewer",
          roleName: "Public Patient Submitter",
        },
        action: "CREATE",
        resourceType: "testimonial",
        resourceId: docId,
        resourceTitle: `${publicDisplayName} (${category})`,
        summary: `New patient review submitted from ${city} - Pending Moderation`,
        status: "success",
      });
    } catch {
      // Non-blocking audit failure
    }

    return NextResponse.json({
      success: true,
      id: docId,
      message:
        "Thank you! Your story has been submitted safely. Dr. Noopur Patel's clinical team will review it before featuring it on the website.",
    });
  } catch (error) {
    console.error("[/api/stories/submit POST] Error:", error);
    return NextResponse.json(
      { success: false, error: "An unexpected error occurred. Please try again." },
      { status: 500 }
    );
  }
}
