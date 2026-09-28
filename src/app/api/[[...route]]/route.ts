import { NextRequest, NextResponse } from "next/server";
import { handleApiRoute } from "@/lib/api/router";

interface RouteContext {
  params: Promise<{ route?: string[] }>;
}

async function dispatch(request: NextRequest, context: RouteContext) {
  const { route = [] } = await context.params;
  if (!route || route.length === 0) {
    return NextResponse.json({
      status: "ok",
      service: "Dr. Noopur Patel Platform API",
      timestamp: new Date().toISOString(),
    });
  }
  return handleApiRoute(request, route);
}

export async function GET(request: NextRequest, context: RouteContext) {
  return dispatch(request, context);
}

export async function POST(request: NextRequest, context: RouteContext) {
  return dispatch(request, context);
}

export async function PUT(request: NextRequest, context: RouteContext) {
  return dispatch(request, context);
}

export async function PATCH(request: NextRequest, context: RouteContext) {
  return dispatch(request, context);
}

export async function DELETE(request: NextRequest, context: RouteContext) {
  return dispatch(request, context);
}

export async function OPTIONS(request: NextRequest, context: RouteContext) {
  return dispatch(request, context);
}

export async function HEAD(request: NextRequest, context: RouteContext) {
  return dispatch(request, context);
}
