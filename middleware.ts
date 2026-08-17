import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const CANONICAL_HOSTS = new Set(["www.forestcircuit.co.uk", "forestcircuit.co.uk"]);

/**
 * Search engines should only ever index the real domain. Until DNS is cut
 * over, this project is also reachable at its vercel.app URL(s), which would
 * otherwise get indexed with pre-launch content and end up competing with
 * the real site once it goes live.
 */
export function middleware(request: NextRequest) {
  const host = request.headers.get("host") ?? "";
  if (CANONICAL_HOSTS.has(host)) return NextResponse.next();

  const response = NextResponse.next();
  response.headers.set("X-Robots-Tag", "noindex, nofollow");
  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
