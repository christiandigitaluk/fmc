/**
 * Adds one event from lib/mock/events.ts to Sanity by slug.
 *
 * Events are normally managed in Sanity Studio; this is only here to apply
 * an addition without waiting on a Studio session. Replaces the earlier
 * per-event scripts (add-event-emma-nash.ts and similar), so the next event
 * needs a slug rather than a new file.
 *
 * A poster given as a path under public/ (e.g. "/images/advent-2026-poster.webp")
 * is uploaded as a Sanity image asset, since the event's image field holds an
 * asset reference, not a URL.
 *
 * Run with: npx tsx scripts/add-event.ts <slug>
 */
import { createClient } from "@sanity/client";
import { readFileSync, existsSync, createReadStream } from "fs";
import { join, dirname, basename } from "path";
import { fileURLToPath } from "url";
import { events } from "../lib/mock/events";

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

async function main() {
  const slug = process.argv[2];
  if (!slug) throw new Error("give an event slug, e.g. npx tsx scripts/add-event.ts my-event-slug");

  const event = events.find((e) => e.slug === slug);
  if (!event) throw new Error(`no event with slug "${slug}" in lib/mock/events.ts`);

  const churchId = `church-${event.churchSlug}`;
  const church = await client.getDocument(churchId);
  if (!church) throw new Error(`church document "${churchId}" not found in Sanity`);

  let image: { _type: "image"; asset: { _type: "reference"; _ref: string } } | undefined;
  if (event.image) {
    const file = join(ROOT, "public", event.image);
    if (!existsSync(file)) throw new Error(`poster not found at public${event.image}`);
    const asset = await client.assets.upload("image", createReadStream(file), { filename: basename(file) });
    image = { _type: "image", asset: { _type: "reference", _ref: asset._id } };
  }

  await client.createOrReplace({
    _id: `event-${event.slug}`,
    _type: "event",
    title: event.title,
    slug: { _type: "slug", current: event.slug },
    category: event.category,
    startDateTime: event.startDateTime,
    endDateTime: event.endDateTime,
    church: { _type: "reference", _ref: churchId },
    description: event.description,
    ...(event.location ? { location: event.location } : {}),
    ...(image ? { image } : {}),
    ...(event.ticketUrl ? { ticketUrl: event.ticketUrl } : {}),
    ...(event.recurrence ? { recurrence: event.recurrence } : {}),
  });

  console.log(`✓ ${event.title}`);
  console.log(`  ${event.startDateTime} → ${event.endDateTime} at ${church.name}`);
  if (image) console.log(`  poster: ${event.image}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
