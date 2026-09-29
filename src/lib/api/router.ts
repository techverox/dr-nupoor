// Auto-generated unified API router for Vercel Serverless Function limit
import { NextRequest, NextResponse } from "next/server";

import * as h_admin_analytics_export from "@/lib/api/handlers/admin/analytics/export/route";
import * as h_admin_audit_logs_export from "@/lib/api/handlers/admin/audit-logs/export/route";
import * as h_admin_backup_export from "@/lib/api/handlers/admin/backup/export/route";
import * as h_admin_backup_status from "@/lib/api/handlers/admin/backup/status/route";
import * as h_admin_landing_pages_components from "@/lib/api/handlers/admin/landing-pages/components/route";
import * as h_admin_landing_pages_templates from "@/lib/api/handlers/admin/landing-pages/templates/route";
import * as h_admin_media_check_usage from "@/lib/api/handlers/admin/media/check-usage/route";
import * as h_auth_2fa_setup from "@/lib/api/handlers/auth/2fa/setup/route";
import * as h_auth_2fa_verify from "@/lib/api/handlers/auth/2fa/verify/route";
import * as h_admin_analytics from "@/lib/api/handlers/admin/analytics/route";
import * as h_admin_audit_logs from "@/lib/api/handlers/admin/audit-logs/route";
import * as h_admin_blog from "@/lib/api/handlers/admin/blog/route";
import * as h_admin_faqs from "@/lib/api/handlers/admin/faqs/route";
import * as h_admin_forms from "@/lib/api/handlers/admin/forms/route";
import * as h_admin_instagram from "@/lib/api/handlers/admin/instagram/route";
import * as h_admin_landing_pages from "@/lib/api/handlers/admin/landing-pages/route";
import * as h_admin_leads from "@/lib/api/handlers/admin/leads/route";
import * as h_admin_media from "@/lib/api/handlers/admin/media/route";
import * as h_admin_offers from "@/lib/api/handlers/admin/offers/route";
import * as h_admin_pages from "@/lib/api/handlers/admin/pages/route";
import * as h_admin_portfolio from "@/lib/api/handlers/admin/portfolio/route";
import * as h_admin_redirects from "@/lib/api/handlers/admin/redirects/route";
import * as h_admin_revisions from "@/lib/api/handlers/admin/revisions/route";
import * as h_admin_roles from "@/lib/api/handlers/admin/roles/route";
import * as h_admin_seo from "@/lib/api/handlers/admin/seo/route";
import * as h_admin_services from "@/lib/api/handlers/admin/services/route";
import * as h_admin_settings from "@/lib/api/handlers/admin/settings/route";
import * as h_admin_subscribers from "@/lib/api/handlers/admin/subscribers/route";
import * as h_admin_sync from "@/lib/api/handlers/admin/sync/route";
import * as h_admin_team from "@/lib/api/handlers/admin/team/route";
import * as h_admin_testimonials from "@/lib/api/handlers/admin/testimonials/route";
import * as h_admin_users from "@/lib/api/handlers/admin/users/route";
import * as h_analytics_events from "@/lib/api/handlers/analytics/events/route";
import * as h_auth_change_password from "@/lib/api/handlers/auth/change-password/route";
import * as h_auth_forgot_password from "@/lib/api/handlers/auth/forgot-password/route";
import * as h_auth_login from "@/lib/api/handlers/auth/login/route";
import * as h_auth_logout from "@/lib/api/handlers/auth/logout/route";
import * as h_auth_me from "@/lib/api/handlers/auth/me/route";
import * as h_auth_session from "@/lib/api/handlers/auth/session/route";
import * as h_instagram_proxy_image from "@/lib/api/handlers/instagram/proxy-image/route";
import * as h_offers_active from "@/lib/api/handlers/offers/active/route";
import * as h_redirects_resolve from "@/lib/api/handlers/redirects/resolve/route";
import * as h_stories_submit from "@/lib/api/handlers/stories/submit/route";
import * as h_health from "@/lib/api/handlers/health/route";
import * as h_instagram from "@/lib/api/handlers/instagram/route";
import * as h_leads from "@/lib/api/handlers/leads/route";
import * as h_newsletter from "@/lib/api/handlers/newsletter/route";
import * as h_settings from "@/lib/api/handlers/settings/route";
import * as h_stories from "@/lib/api/handlers/stories/route";
import * as h_admin_landing_pages_components__id__duplicate from "@/lib/api/handlers/admin/landing-pages/components/[id]/duplicate/route";
import * as h_admin_landing_pages_templates__id__use from "@/lib/api/handlers/admin/landing-pages/templates/[id]/use/route";
import * as h_admin_blog__id__publish from "@/lib/api/handlers/admin/blog/[id]/publish/route";
import * as h_admin_forms__id__duplicate from "@/lib/api/handlers/admin/forms/[id]/duplicate/route";
import * as h_admin_forms__id__submissions from "@/lib/api/handlers/admin/forms/[id]/submissions/route";
import * as h_admin_landing_pages__id__duplicate from "@/lib/api/handlers/admin/landing-pages/[id]/duplicate/route";
import * as h_admin_landing_pages__id__publish from "@/lib/api/handlers/admin/landing-pages/[id]/publish/route";
import * as h_admin_landing_pages_components__id_ from "@/lib/api/handlers/admin/landing-pages/components/[id]/route";
import * as h_admin_landing_pages_templates__id_ from "@/lib/api/handlers/admin/landing-pages/templates/[id]/route";
import * as h_admin_revisions__id__diff from "@/lib/api/handlers/admin/revisions/[id]/diff/route";
import * as h_admin_revisions__id__restore from "@/lib/api/handlers/admin/revisions/[id]/restore/route";
import * as h_admin_audit_logs__id_ from "@/lib/api/handlers/admin/audit-logs/[id]/route";
import * as h_admin_blog__id_ from "@/lib/api/handlers/admin/blog/[id]/route";
import * as h_admin_forms__id_ from "@/lib/api/handlers/admin/forms/[id]/route";
import * as h_admin_landing_pages__id_ from "@/lib/api/handlers/admin/landing-pages/[id]/route";
import * as h_admin_leads__id_ from "@/lib/api/handlers/admin/leads/[id]/route";
import * as h_admin_media__id_ from "@/lib/api/handlers/admin/media/[id]/route";
import * as h_admin_offers__id_ from "@/lib/api/handlers/admin/offers/[id]/route";
import * as h_admin_redirects__id_ from "@/lib/api/handlers/admin/redirects/[id]/route";
import * as h_admin_revisions__id_ from "@/lib/api/handlers/admin/revisions/[id]/route";
import * as h_admin_roles__id_ from "@/lib/api/handlers/admin/roles/[id]/route";
import * as h_admin_subscribers__id_ from "@/lib/api/handlers/admin/subscribers/[id]/route";
import * as h_admin_users__id_ from "@/lib/api/handlers/admin/users/[id]/route";
import * as h_forms__id__submit from "@/lib/api/handlers/forms/[id]/submit/route";

export interface RouteMatch {
  pattern: string;
  segments: string[];
  isDynamic: boolean;
  handlers: Record<string, any>;
}

const ROUTES: RouteMatch[] = [
  {
    pattern: "admin/analytics/export",
    segments: ["admin","analytics","export"],
    isDynamic: false,
    handlers: h_admin_analytics_export,
  },
  {
    pattern: "admin/audit-logs/export",
    segments: ["admin","audit-logs","export"],
    isDynamic: false,
    handlers: h_admin_audit_logs_export,
  },
  {
    pattern: "admin/backup/export",
    segments: ["admin","backup","export"],
    isDynamic: false,
    handlers: h_admin_backup_export,
  },
  {
    pattern: "admin/backup/status",
    segments: ["admin","backup","status"],
    isDynamic: false,
    handlers: h_admin_backup_status,
  },
  {
    pattern: "admin/landing-pages/components",
    segments: ["admin","landing-pages","components"],
    isDynamic: false,
    handlers: h_admin_landing_pages_components,
  },
  {
    pattern: "admin/landing-pages/templates",
    segments: ["admin","landing-pages","templates"],
    isDynamic: false,
    handlers: h_admin_landing_pages_templates,
  },
  {
    pattern: "admin/media/check-usage",
    segments: ["admin","media","check-usage"],
    isDynamic: false,
    handlers: h_admin_media_check_usage,
  },
  {
    pattern: "auth/2fa/setup",
    segments: ["auth","2fa","setup"],
    isDynamic: false,
    handlers: h_auth_2fa_setup,
  },
  {
    pattern: "auth/2fa/verify",
    segments: ["auth","2fa","verify"],
    isDynamic: false,
    handlers: h_auth_2fa_verify,
  },
  {
    pattern: "admin/analytics",
    segments: ["admin","analytics"],
    isDynamic: false,
    handlers: h_admin_analytics,
  },
  {
    pattern: "admin/audit-logs",
    segments: ["admin","audit-logs"],
    isDynamic: false,
    handlers: h_admin_audit_logs,
  },
  {
    pattern: "admin/blog",
    segments: ["admin","blog"],
    isDynamic: false,
    handlers: h_admin_blog,
  },
  {
    pattern: "admin/faqs",
    segments: ["admin","faqs"],
    isDynamic: false,
    handlers: h_admin_faqs,
  },
  {
    pattern: "admin/forms",
    segments: ["admin","forms"],
    isDynamic: false,
    handlers: h_admin_forms,
  },
  {
    pattern: "admin/instagram",
    segments: ["admin","instagram"],
    isDynamic: false,
    handlers: h_admin_instagram,
  },
  {
    pattern: "admin/landing-pages",
    segments: ["admin","landing-pages"],
    isDynamic: false,
    handlers: h_admin_landing_pages,
  },
  {
    pattern: "admin/leads",
    segments: ["admin","leads"],
    isDynamic: false,
    handlers: h_admin_leads,
  },
  {
    pattern: "admin/media",
    segments: ["admin","media"],
    isDynamic: false,
    handlers: h_admin_media,
  },
  {
    pattern: "admin/offers",
    segments: ["admin","offers"],
    isDynamic: false,
    handlers: h_admin_offers,
  },
  {
    pattern: "admin/pages",
    segments: ["admin","pages"],
    isDynamic: false,
    handlers: h_admin_pages,
  },
  {
    pattern: "admin/portfolio",
    segments: ["admin","portfolio"],
    isDynamic: false,
    handlers: h_admin_portfolio,
  },
  {
    pattern: "admin/redirects",
    segments: ["admin","redirects"],
    isDynamic: false,
    handlers: h_admin_redirects,
  },
  {
    pattern: "admin/revisions",
    segments: ["admin","revisions"],
    isDynamic: false,
    handlers: h_admin_revisions,
  },
  {
    pattern: "admin/roles",
    segments: ["admin","roles"],
    isDynamic: false,
    handlers: h_admin_roles,
  },
  {
    pattern: "admin/seo",
    segments: ["admin","seo"],
    isDynamic: false,
    handlers: h_admin_seo,
  },
  {
    pattern: "admin/services",
    segments: ["admin","services"],
    isDynamic: false,
    handlers: h_admin_services,
  },
  {
    pattern: "admin/settings",
    segments: ["admin","settings"],
    isDynamic: false,
    handlers: h_admin_settings,
  },
  {
    pattern: "admin/subscribers",
    segments: ["admin","subscribers"],
    isDynamic: false,
    handlers: h_admin_subscribers,
  },
  {
    pattern: "admin/sync",
    segments: ["admin","sync"],
    isDynamic: false,
    handlers: h_admin_sync,
  },
  {
    pattern: "admin/team",
    segments: ["admin","team"],
    isDynamic: false,
    handlers: h_admin_team,
  },
  {
    pattern: "admin/testimonials",
    segments: ["admin","testimonials"],
    isDynamic: false,
    handlers: h_admin_testimonials,
  },
  {
    pattern: "admin/users",
    segments: ["admin","users"],
    isDynamic: false,
    handlers: h_admin_users,
  },
  {
    pattern: "analytics/events",
    segments: ["analytics","events"],
    isDynamic: false,
    handlers: h_analytics_events,
  },
  {
    pattern: "auth/change-password",
    segments: ["auth","change-password"],
    isDynamic: false,
    handlers: h_auth_change_password,
  },
  {
    pattern: "auth/forgot-password",
    segments: ["auth","forgot-password"],
    isDynamic: false,
    handlers: h_auth_forgot_password,
  },
  {
    pattern: "auth/login",
    segments: ["auth","login"],
    isDynamic: false,
    handlers: h_auth_login,
  },
  {
    pattern: "auth/logout",
    segments: ["auth","logout"],
    isDynamic: false,
    handlers: h_auth_logout,
  },
  {
    pattern: "auth/me",
    segments: ["auth","me"],
    isDynamic: false,
    handlers: h_auth_me,
  },
  {
    pattern: "auth/session",
    segments: ["auth","session"],
    isDynamic: false,
    handlers: h_auth_session,
  },
  {
    pattern: "instagram/proxy-image",
    segments: ["instagram","proxy-image"],
    isDynamic: false,
    handlers: h_instagram_proxy_image,
  },
  {
    pattern: "offers/active",
    segments: ["offers","active"],
    isDynamic: false,
    handlers: h_offers_active,
  },
  {
    pattern: "redirects/resolve",
    segments: ["redirects","resolve"],
    isDynamic: false,
    handlers: h_redirects_resolve,
  },
  {
    pattern: "stories/submit",
    segments: ["stories","submit"],
    isDynamic: false,
    handlers: h_stories_submit,
  },
  {
    pattern: "health",
    segments: ["health"],
    isDynamic: false,
    handlers: h_health,
  },
  {
    pattern: "instagram",
    segments: ["instagram"],
    isDynamic: false,
    handlers: h_instagram,
  },
  {
    pattern: "leads",
    segments: ["leads"],
    isDynamic: false,
    handlers: h_leads,
  },
  {
    pattern: "newsletter",
    segments: ["newsletter"],
    isDynamic: false,
    handlers: h_newsletter,
  },
  {
    pattern: "settings",
    segments: ["settings"],
    isDynamic: false,
    handlers: h_settings,
  },
  {
    pattern: "stories",
    segments: ["stories"],
    isDynamic: false,
    handlers: h_stories,
  },
  {
    pattern: "admin/landing-pages/components/[id]/duplicate",
    segments: ["admin","landing-pages","components","[id]","duplicate"],
    isDynamic: true,
    handlers: h_admin_landing_pages_components__id__duplicate,
  },
  {
    pattern: "admin/landing-pages/templates/[id]/use",
    segments: ["admin","landing-pages","templates","[id]","use"],
    isDynamic: true,
    handlers: h_admin_landing_pages_templates__id__use,
  },
  {
    pattern: "admin/blog/[id]/publish",
    segments: ["admin","blog","[id]","publish"],
    isDynamic: true,
    handlers: h_admin_blog__id__publish,
  },
  {
    pattern: "admin/forms/[id]/duplicate",
    segments: ["admin","forms","[id]","duplicate"],
    isDynamic: true,
    handlers: h_admin_forms__id__duplicate,
  },
  {
    pattern: "admin/forms/[id]/submissions",
    segments: ["admin","forms","[id]","submissions"],
    isDynamic: true,
    handlers: h_admin_forms__id__submissions,
  },
  {
    pattern: "admin/landing-pages/[id]/duplicate",
    segments: ["admin","landing-pages","[id]","duplicate"],
    isDynamic: true,
    handlers: h_admin_landing_pages__id__duplicate,
  },
  {
    pattern: "admin/landing-pages/[id]/publish",
    segments: ["admin","landing-pages","[id]","publish"],
    isDynamic: true,
    handlers: h_admin_landing_pages__id__publish,
  },
  {
    pattern: "admin/landing-pages/components/[id]",
    segments: ["admin","landing-pages","components","[id]"],
    isDynamic: true,
    handlers: h_admin_landing_pages_components__id_,
  },
  {
    pattern: "admin/landing-pages/templates/[id]",
    segments: ["admin","landing-pages","templates","[id]"],
    isDynamic: true,
    handlers: h_admin_landing_pages_templates__id_,
  },
  {
    pattern: "admin/revisions/[id]/diff",
    segments: ["admin","revisions","[id]","diff"],
    isDynamic: true,
    handlers: h_admin_revisions__id__diff,
  },
  {
    pattern: "admin/revisions/[id]/restore",
    segments: ["admin","revisions","[id]","restore"],
    isDynamic: true,
    handlers: h_admin_revisions__id__restore,
  },
  {
    pattern: "admin/audit-logs/[id]",
    segments: ["admin","audit-logs","[id]"],
    isDynamic: true,
    handlers: h_admin_audit_logs__id_,
  },
  {
    pattern: "admin/blog/[id]",
    segments: ["admin","blog","[id]"],
    isDynamic: true,
    handlers: h_admin_blog__id_,
  },
  {
    pattern: "admin/forms/[id]",
    segments: ["admin","forms","[id]"],
    isDynamic: true,
    handlers: h_admin_forms__id_,
  },
  {
    pattern: "admin/landing-pages/[id]",
    segments: ["admin","landing-pages","[id]"],
    isDynamic: true,
    handlers: h_admin_landing_pages__id_,
  },
  {
    pattern: "admin/leads/[id]",
    segments: ["admin","leads","[id]"],
    isDynamic: true,
    handlers: h_admin_leads__id_,
  },
  {
    pattern: "admin/media/[id]",
    segments: ["admin","media","[id]"],
    isDynamic: true,
    handlers: h_admin_media__id_,
  },
  {
    pattern: "admin/offers/[id]",
    segments: ["admin","offers","[id]"],
    isDynamic: true,
    handlers: h_admin_offers__id_,
  },
  {
    pattern: "admin/redirects/[id]",
    segments: ["admin","redirects","[id]"],
    isDynamic: true,
    handlers: h_admin_redirects__id_,
  },
  {
    pattern: "admin/revisions/[id]",
    segments: ["admin","revisions","[id]"],
    isDynamic: true,
    handlers: h_admin_revisions__id_,
  },
  {
    pattern: "admin/roles/[id]",
    segments: ["admin","roles","[id]"],
    isDynamic: true,
    handlers: h_admin_roles__id_,
  },
  {
    pattern: "admin/subscribers/[id]",
    segments: ["admin","subscribers","[id]"],
    isDynamic: true,
    handlers: h_admin_subscribers__id_,
  },
  {
    pattern: "admin/users/[id]",
    segments: ["admin","users","[id]"],
    isDynamic: true,
    handlers: h_admin_users__id_,
  },
  {
    pattern: "forms/[id]/submit",
    segments: ["forms","[id]","submit"],
    isDynamic: true,
    handlers: h_forms__id__submit,
  },
];

export async function handleApiRoute(
  request: NextRequest,
  routeSegments: string[]
): Promise<Response> {
  const method = request.method.toUpperCase();

  if (method === "OPTIONS") {
    return new NextResponse(null, {
      status: 204,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, PATCH, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Requested-With",
      },
    });
  }

  for (const entry of ROUTES) {
    if (entry.segments.length !== routeSegments.length) continue;

    let match = true;
    const params: Record<string, string> = {};

    for (let i = 0; i < entry.segments.length; i++) {
      const segPattern = entry.segments[i];
      const actual = routeSegments[i];

      if (segPattern.startsWith("[") && segPattern.endsWith("]")) {
        const paramName = segPattern.slice(1, -1);
        params[paramName] = actual;
      } else if (segPattern !== actual) {
        match = false;
        break;
      }
    }

    if (match) {
      const handler = entry.handlers[method];
      if (typeof handler === "function") {
        try {
          return await handler(request, { params: Promise.resolve(params) });
        } catch (err: any) {
          console.error(`API route error in ${entry.pattern} [${method}]:`, err);
          return NextResponse.json(
            { error: "Internal Server Error", message: err?.message || "Unexpected error" },
            { status: 500 }
          );
        }
      } else {
        return NextResponse.json(
          { error: `Method ${method} Not Allowed on /${entry.pattern}` },
          { status: 405 }
        );
      }
    }
  }

  return NextResponse.json(
    { error: `Route not found: /${routeSegments.join("/")}` },
    { status: 404 }
  );
}
