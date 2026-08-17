import type { MetadataRoute } from "next";
import { headers } from "next/headers";

const CANONICAL_HOSTS = new Set(["www.forestcircuit.co.uk", "forestcircuit.co.uk"]);

/**
 * Before DNS is cut over, this project is also reachable at its vercel.app
 * URL(s). Those must stay out of search results entirely, not just skip a
 * few paths, so crawlers don't index pre-launch content under a URL that
 * will be dead once the real domain goes live.
 */
export default async function robots(): Promise<MetadataRoute.Robots> {
  const host = (await headers()).get("host") ?? "";
  if (!CANONICAL_HOSTS.has(host)) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/studio", "/api"],
    },
    sitemap: "https://www.forestcircuit.co.uk/sitemap.xml",
  };
}
