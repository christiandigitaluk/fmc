import type { MetadataRoute } from "next";
import { getChurches, getPosts } from "@/lib/content";

const BASE_URL = "https://www.forestcircuit.co.uk";

const STATIC_ROUTES = [
  "",
  "/about",
  "/churches",
  "/preaching-plan",
  "/events",
  "/news",
  "/hall-hire",
  "/jobs",
  "/contact",
  "/safeguarding",
  "/safeguarding/connection",
  "/safeguarding/data-protection",
  "/useful-links",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [churches, posts] = await Promise.all([getChurches(), getPosts()]);

  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((path) => ({
    url: `${BASE_URL}${path}`,
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : 0.7,
  }));

  const churchEntries: MetadataRoute.Sitemap = churches.map((church) => ({
    url: `${BASE_URL}/churches/${church.slug}`,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const postEntries: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${BASE_URL}/news/${post.slug}`,
    lastModified: post.publishedAt,
    changeFrequency: "yearly",
    priority: 0.5,
  }));

  return [...staticEntries, ...churchEntries, ...postEntries];
}
