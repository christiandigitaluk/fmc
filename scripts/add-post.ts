/**
 * Publishes one news post from lib/mock/posts.ts to Sanity, by slug.
 *
 * Posts normally live in Sanity Studio; this is for adding one without
 * waiting on a Studio session. The cover file is uploaded as an image asset
 * (Sanity dedupes identical files, so reruns don't pile up copies), and each
 * paragraph becomes a Portable Text block, with [text](url) turned into a
 * link. Keys come from positions, so a rerun replaces rather than duplicates.
 *
 * Run with: npx tsx scripts/add-post.ts <slug>
 */
import { createClient } from "@sanity/client";
import { readFileSync, existsSync } from "fs";
import { join, dirname, basename } from "path";
import { fileURLToPath } from "url";
import { posts } from "../lib/mock/posts";
import { splitLinks } from "../lib/inlineLinks";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const envPath = join(ROOT, ".env.local");
if (existsSync(envPath)) {
  for (const line of readFileSync(envPath, "utf8").split("\n")) {
    const t = line.trim();
    const eq = t.indexOf("=");
    if (!t || t.startsWith("#") || eq === -1) continue;
    const key = t.slice(0, eq).trim();
    if (!process.env[key]) process.env[key] = t.slice(eq + 1).trim();
  }
}

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2026-01-01",
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

function toBlock(paragraph: string, i: number) {
  const markDefs: { _key: string; _type: "link"; href: string }[] = [];
  const children = splitLinks(paragraph).map((part, j) => {
    if (part.href === undefined) return { _type: "span", _key: `p${i}s${j}`, text: part.text, marks: [] };
    const key = `p${i}l${j}`;
    markDefs.push({ _key: key, _type: "link", href: part.href });
    return { _type: "span", _key: `p${i}s${j}`, text: part.text, marks: [key] };
  });
  return { _type: "block", _key: `p${i}`, style: "normal", markDefs, children };
}

async function main() {
  const slug = process.argv[2];
  if (!slug) throw new Error("give a post slug, e.g. npx tsx scripts/add-post.ts my-post");
  const post = posts.find((p) => p.slug === slug);
  if (!post) throw new Error(`no post with slug "${slug}" in lib/mock/posts.ts`);

  const file = join(ROOT, "public", post.coverImage);
  const asset = await client.assets.upload("image", readFileSync(file), { filename: basename(file) });

  await client.createOrReplace({
    _id: `post-${post.slug}`,
    _type: "post",
    title: post.title,
    slug: { _type: "slug", current: post.slug },
    excerpt: post.excerpt,
    publishedAt: new Date(`${post.publishedAt}T09:00:00Z`).toISOString(),
    tags: post.tags,
    ...(post.coverFit ? { coverFit: post.coverFit } : {}),
    coverImage: { _type: "image", asset: { _type: "reference", _ref: asset._id } },
    body: post.body.map(toBlock),
  });
  console.log(`✓ ${post.title}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
