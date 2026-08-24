import type { NextConfig } from "next";

/**
 * Four headers with no functional cost, deliberately stopping short of a
 * Content-Security-Policy. CSP is the one header in this family that can
 * genuinely break a page if scoped wrong — it would need to enumerate
 * Sanity's API and CDN domains, the OpenStreetMap embed on every church
 * page, and Next's own hydration script, and a mistake in any of those is
 * the kind of thing a quick check can miss. Worth doing as its own
 * carefully tested piece of work, not folded in here under time pressure.
 *
 * X-Frame-Options is SAMEORIGIN, not the stricter DENY: Sanity's
 * Presentation tool previews the site by loading it in an iframe inside
 * Studio, which is same-origin (Studio is served from /studio on this same
 * app) and DENY would break that.
 *
 * Permissions-Policy explicitly allows geolocation, which "Find a church
 * near you" uses, and clipboard-write, which the article share button's
 * copy-link uses. Blocking either by default would silently break a real
 * feature.
 */
const SECURITY_HEADERS = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "geolocation=(self), clipboard-write=(self), camera=(), microphone=(), payment=(), usb=()",
  },
];

const nextConfig: NextConfig = {
  outputFileTracingRoot: __dirname,
  images: {
    remotePatterns: [{ protocol: "https", hostname: "cdn.sanity.io" }],
    // The circuit map is fine-detail cartography with small place labels,
    // which the default quality of 75 visibly mushes. Allow a higher setting
    // for that one image (Next only honours qualities listed here).
    qualities: [75, 92],
  },
  async headers() {
    return [{ source: "/:path*", headers: SECURITY_HEADERS }];
  },
};

export default nextConfig;
