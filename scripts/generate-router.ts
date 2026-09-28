import fs from "fs";
import path from "path";

const apiDir = path.resolve("src/lib/api/handlers");

function getFiles(dir: string): string[] {
  let results: string[] = [];
  const list = fs.readdirSync(dir);
  list.forEach((file) => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      results = results.concat(getFiles(fullPath));
    } else if (file === "route.ts") {
      results.push(fullPath);
    }
  });
  return results;
}

const files = getFiles(apiDir);
const routes = files.map((f) => {
  const rel = path.relative(apiDir, path.dirname(f)).split(path.sep).join("/");
  return { rel, file: f };
});

// Sort routes: static first (no '['), then longer dynamic first
routes.sort((a, b) => {
  const aHas = a.rel.includes("[");
  const bHas = b.rel.includes("[");
  if (!aHas && bHas) return -1;
  if (aHas && !bHas) return 1;
  const aLen = a.rel.split("/").length;
  const bLen = b.rel.split("/").length;
  if (bLen !== aLen) return bLen - aLen;
  return a.rel.localeCompare(b.rel);
});

function toIdent(rel: string): string {
  return "h_" + rel.replace(/[^a-zA-Z0-9]/g, "_");
}

let code = `// Auto-generated unified API router for Vercel Serverless Function limit
import { NextRequest, NextResponse } from "next/server";

`;

routes.forEach((r) => {
  code += `import * as ${toIdent(r.rel)} from "@/lib/api/handlers/${r.rel}/route";\n`;
});

code += `
export interface RouteMatch {
  pattern: string;
  segments: string[];
  isDynamic: boolean;
  handlers: Record<string, any>;
}

const ROUTES: RouteMatch[] = [
`;

routes.forEach((r) => {
  const segs = r.rel.split("/");
  code += `  {
    pattern: "${r.rel}",
    segments: ${JSON.stringify(segs)},
    isDynamic: ${r.rel.includes("[") ? "true" : "false"},
    handlers: ${toIdent(r.rel)},
  },\n`;
});

code += `];

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
          console.error(\`API route error in \${entry.pattern} [\${method}]:\`, err);
          return NextResponse.json(
            { error: "Internal Server Error", message: err?.message || "Unexpected error" },
            { status: 500 }
          );
        }
      } else {
        return NextResponse.json(
          { error: \`Method \${method} Not Allowed on /\${entry.pattern}\` },
          { status: 405 }
        );
      }
    }
  }

  return NextResponse.json(
    { error: \`Route not found: /\${routeSegments.join("/")}\` },
    { status: 404 }
  );
}
`;

fs.writeFileSync("src/lib/api/router.ts", code, "utf8");
console.log(`Generated router for ${routes.length} routes in src/lib/api/router.ts`);
