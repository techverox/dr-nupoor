import { NextRequest, NextResponse } from "next/server";
import { requirePermission } from "@/lib/auth/rbac";
import {
  getFormByIdAdmin,
  getFormSubmissionsAdmin,
  exportFormSubmissionsToCsv,
} from "@/lib/services/formService";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { searchParams } = new URL(request.url);
  const format = searchParams.get("format");

  const requiredPermission = format === "csv" ? "forms.submissions.export" : "forms.submissions.view";
  const guard = await requirePermission(request, requiredPermission);
  if (!guard.authorized) return guard.response!;

  try {
    const { id } = await params;
    const form = await getFormByIdAdmin(id);
    if (!form) {
      return NextResponse.json({ success: false, error: "Form not found" }, { status: 404 });
    }

    const search = searchParams.get("search") || undefined;
    const status = searchParams.get("status") || undefined;

    const submissions = await getFormSubmissionsAdmin(id, { search, status });

    if (format === "csv") {
      const csv = exportFormSubmissionsToCsv(submissions);
      const filename = `${form.slug || "form"}-submissions-${new Date().toISOString().slice(0, 10)}.csv`;

      return new Response(csv, {
        status: 200,
        headers: {
          "Content-Type": "text/csv; charset=utf-8",
          "Content-Disposition": `attachment; filename="${filename}"`,
        },
      });
    }

    return NextResponse.json({ success: true, form, submissions }, { status: 200 });
  } catch (error: unknown) {
    console.error("[GET /api/admin/forms/[id]/submissions] Error:", error);
    return NextResponse.json({ success: false, error: "Failed to load submissions." }, { status: 500 });
  }
}

