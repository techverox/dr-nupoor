import { NextRequest, NextResponse } from "next/server";
import { requirePermission } from "@/lib/auth/rbac";
import {
  getAllSubscribersAdmin,
  exportSubscribersCsv,
  resetSubscribersAdmin,
  createSubscriberAdmin,
} from "@/lib/services/subscriberService";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const isExport = searchParams.get("export") === "csv";

  const requiredPermission = isExport ? "subscribers.export" : "subscribers.view";
  const guard = await requirePermission(request, requiredPermission);
  if (!guard.authorized) return guard.response!;

  const search = searchParams.get("search") || undefined;
  const status = searchParams.get("status") || undefined;

  if (isExport) {
    const csvContent = await exportSubscribersCsv();
    return new NextResponse(csvContent, {
      status: 200,
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="dr-noopur-patel-subscribers-${Date.now()}.csv"`,
      },
    });
  }

  const subscribers = await getAllSubscribersAdmin(search, status);
  return NextResponse.json({ success: true, subscribers });
}

export async function POST(request: NextRequest) {
  const guard = await requirePermission(request, "subscribers.view");
  if (!guard.authorized) return guard.response!;

  try {
    const body = await request.json().catch(() => ({}));

    if (body.action === "reset") {
      const subscribers = await resetSubscribersAdmin();
      return NextResponse.json({
        success: true,
        subscribers,
        message: "Audience contacts have been successfully reset to Dr. Noopur Patel's clinical subscribers baseline.",
      });
    }

    if (body.action === "create") {
      if (!body.subscriber || !body.subscriber.email) {
        return NextResponse.json(
          { success: false, error: "Please provide a valid subscriber email address." },
          { status: 400 }
        );
      }
      const result = await createSubscriberAdmin(body.subscriber);
      return NextResponse.json(result);
    }

    return NextResponse.json({ success: false, error: "Invalid action provided" }, { status: 400 });
  } catch (error) {
    console.error("[/api/admin/subscribers POST] Error:", error);
    return NextResponse.json({ success: false, error: "Failed to process subscriber action" }, { status: 500 });
  }
}
