/**
 * One-time import of the site's mock data into a real Sanity dataset.
 * Run with: npx tsx scripts/seed.ts
 *
 * Safe to re-run — every document uses a deterministic _id and
 * createOrReplace, so running this twice just overwrites the same records
 * rather than duplicating them. Images are uploaded once and cached by
 * local path within a single run.
 */
import { createClient } from "@sanity/client";
import { readFileSync, existsSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

import { churches } from "../lib/mock/churches";
import { posts } from "../lib/mock/posts";
import { events } from "../lib/mock/events";
import { preachingPlan } from "../lib/mock/preachingPlan";
import { siteSettings } from "../lib/mock/settings";

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
    if (!(key in process.env)) process.env[key] = value;
  }
}
loadEnvLocal();

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2026-01-01";
const token = process.env.SANITY_API_TOKEN;

if (!projectId || !token) {
  console.error("Missing NEXT_PUBLIC_SANITY_PROJECT_ID or SANITY_API_TOKEN in .env.local");
  process.exit(1);
}

const client = createClient({ projectId, dataset, apiVersion, token, useCdn: false });

const assetCache = new Map<string, string>(); // local path -> asset _id

async function uploadImage(publicPath: string): Promise<string | null> {
  if (assetCache.has(publicPath)) return assetCache.get(publicPath)!;
  const filePath = join(ROOT, "public", publicPath.replace(/^\//, ""));
  if (!existsSync(filePath)) {
    console.warn(`  ! image not found, skipping: ${publicPath}`);
    return null;
  }
  const buffer = readFileSync(filePath);
  const asset = await client.assets.upload("image", buffer, { filename: publicPath.split("/").pop() });
  assetCache.set(publicPath, asset._id);
  console.log(`  uploaded ${publicPath} -> ${asset._id}`);
  return asset._id;
}

function imageField(assetId: string | null) {
  if (!assetId) return undefined;
  return { _type: "image", asset: { _type: "reference", _ref: assetId } };
}

function slugField(current: string) {
  return { _type: "slug", current };
}

function toPortableText(paragraphs: string[]) {
  return paragraphs.map((text) => ({
    _type: "block",
    _key: Math.random().toString(36).slice(2),
    style: "normal",
    children: [{ _type: "span", _key: Math.random().toString(36).slice(2), text, marks: [] }],
    markDefs: [],
  }));
}

async function seedChurches() {
  console.log(`\nSeeding ${churches.length} churches...`);
  const slugToId = new Map<string, string>();
  for (const church of churches) {
    const _id = `church-${church.slug}`;
    slugToId.set(church.slug, _id);
    const assetId = await uploadImage(church.image);
    await client.createOrReplace({
      _id,
      _type: "church",
      name: church.name,
      slug: slugField(church.slug),
      area: church.area,
      address: church.address,
      postcode: church.postcode,
      minister: church.minister,
      phone: church.phone,
      email: church.email,
      image: imageField(assetId),
      description: church.description,
      serviceTimes: church.serviceTimes,
      facilities: church.facilities,
      hallHireInfo: church.hallHireInfo,
      lat: church.lat,
      lng: church.lng,
      worshipping: church.worshipping !== false,
    });
    console.log(`  ✓ ${church.name}`);
  }
  return slugToId;
}

async function seedPosts() {
  console.log(`\nSeeding ${posts.length} news posts...`);
  for (const post of posts) {
    const _id = `post-${post.slug}`;
    const assetId = await uploadImage(post.coverImage);
    await client.createOrReplace({
      _id,
      _type: "post",
      title: post.title,
      slug: slugField(post.slug),
      excerpt: post.excerpt,
      coverImage: imageField(assetId),
      publishedAt: new Date(post.publishedAt).toISOString(),
      tags: post.tags,
      body: toPortableText(post.body),
    });
    console.log(`  ✓ ${post.title}`);
  }
}

async function seedEvents(slugToId: Map<string, string>) {
  console.log(`\nSeeding ${events.length} events...`);
  for (const event of events) {
    const _id = `event-${event.slug}`;
    const churchId = slugToId.get(event.churchSlug);
    if (!churchId) {
      console.warn(`  ! unknown church slug "${event.churchSlug}" for event "${event.title}", skipping`);
      continue;
    }
    const assetId = event.image ? await uploadImage(event.image) : null;
    await client.createOrReplace({
      _id,
      _type: "event",
      title: event.title,
      slug: slugField(event.slug),
      category: event.category,
      startDateTime: event.startDateTime,
      endDateTime: event.endDateTime,
      recurrence: event.recurrence,
      church: { _type: "reference", _ref: churchId },
      location: event.location,
      description: event.description,
      image: imageField(assetId),
      ticketUrl: event.ticketUrl,
    });
    console.log(`  ✓ ${event.title}`);
  }
}

async function seedPreachingPlan(slugToId: Map<string, string>) {
  console.log(`\nSeeding ${preachingPlan.length} preaching plan entries...`);
  let count = 0;
  for (const entry of preachingPlan) {
    const churchId = slugToId.get(entry.churchSlug);
    if (!churchId) {
      console.warn(`  ! unknown church slug "${entry.churchSlug}" for entry ${entry.id}, skipping`);
      continue;
    }
    await client.createOrReplace({
      _id: `pp-${entry.id}`,
      _type: "preachingPlanEntry",
      date: entry.date,
      church: { _type: "reference", _ref: churchId },
      time: entry.time,
      preacher: entry.preacher,
      notes: entry.notes,
    });
    count++;
  }
  console.log(`  ✓ ${count} entries created`);
}

async function seedSiteSettings() {
  console.log(`\nSeeding site settings...`);
  await client.createOrReplace({
    _id: "siteSettings",
    _type: "siteSettings",
    ...siteSettings,
  });
  console.log("  ✓ site settings");
}

async function main() {
  console.log(`Seeding project ${projectId} / dataset ${dataset}`);
  const slugToId = await seedChurches();
  await seedPosts();
  await seedEvents(slugToId);
  await seedPreachingPlan(slugToId);
  await seedSiteSettings();
  console.log("\nDone. Check your Studio — content should appear immediately.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
