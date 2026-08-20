/**
 * Publishes the site and brand launch article to Sanity.
 *
 * News posts normally live in Sanity Studio, so this is only here to apply
 * the addition without waiting on a Studio session. Manage the post there in
 * future and this script becomes stale.
 *
 * Mirrors the entry added to lib/mock/posts.ts so the local fallback and the
 * live dataset stay in step. Two shape differences matter:
 *   - coverImage is a Sanity image asset, not a path, so the file is uploaded
 *     first and referenced by asset id.
 *   - body is Portable Text, so the mock's plain paragraphs are wrapped as
 *     blocks. Keys are derived from the index to keep reruns idempotent.
 *
 * Run with: npx tsx scripts/add-post-launch-article.ts
 */
import { createClient } from "@sanity/client";
import { readFileSync, existsSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { posts } from "../lib/mock/posts";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");

function loadEnvLocal() {
  const envPath = join(ROOT, ".env.local");
  if (!existsSync(envPath)) return;
  for (const line of readFileSync(envPath, "utf8").split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    const value = trimmed.slice(eq + 1).trim();
    if (!process.env[key]) process.env[key] = value;
  }
}
loadEnvLocal();

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2026-01-01",
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

const SLUG = "one-circuit-one-front-door";
const COVER = "og-share.png";

async function main() {
  const post = posts.find((p) => p.slug === SLUG);
  if (!post) throw new Error(`no post with slug "${SLUG}" in lib/mock/posts.ts`);

  const coverPath = join(ROOT, "public", "images", COVER);
  if (!existsSync(coverPath)) throw new Error(`cover image not found at ${coverPath}`);

  const asset = await client.assets.upload("image", readFileSync(coverPath), {
    filename: COVER,
  });
  console.log(`✓ uploaded cover image (${asset._id})`);

  await client.createOrReplace({
    _id: `post-${post.slug}`,
    _type: "post",
    title: post.title,
    slug: { _type: "slug", current: post.slug },
    excerpt: post.excerpt,
    publishedAt: new Date(`${post.publishedAt}T09:00:00Z`).toISOString(),
    tags: post.tags,
    coverImage: {
      _type: "image",
      asset: { _type: "reference", _ref: asset._id },
    },
    body: post.body.map((paragraph, i) => ({
      _type: "block",
      _key: `p${i}`,
      style: "normal",
      markDefs: [],
      children: [{ _type: "span", _key: `p${i}s0`, text: paragraph, marks: [] }],
    })),
  });

  console.log(`✓ ${post.title}`);
  console.log(`  /news/${post.slug}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
