import { NextRequest, NextResponse } from "next/server";
import { requirePermission } from "@/lib/auth/rbac";
import {
  toggleSubscriberStatus,
  deleteSubscriber,
} from "@/lib/services/subscriberService";

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function PUT(request: NextRequest, { params }: RouteParams) {
  const guard = await requirePermission(request, "subscribers.delete");
  if (!guard.authorized) return guard.response!;

  try {
    const { id } = await params;
    const body = await request.json();
    const result = await toggleSubscriberStatus(id, body.status);
    return NextResponse.json(result);
  } catch (error) {
    console.error("[/api/admin/subscribers/[id] PUT] Error:", error);
    return NextResponse.json({ success: false, error: "Internal server error." }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: RouteParams) {
  const guard = await requirePermission(request, "subscribers.delete");
  if (!guard.authorized) return guard.response!;

  try {
    const { id } = await params;
    const result = await deleteSubscriber(id);
    return NextResponse.json(result);
  } catch (error) {
    console.error("[/api/admin/subscribers/[id] DELETE] Error:", error);
    return NextResponse.json({ success: false, error: "Internal server error." }, { status: 500 });
  }
}

