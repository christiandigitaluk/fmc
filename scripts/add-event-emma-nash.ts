/**
 * Adds the 6 September 2026 worship + evangelism workshop at Loughton to
 * Sanity. Events normally live in Sanity Studio, so this is only here to
 * apply the addition without waiting on a Studio session — manage it there
 * in future and this becomes stale.
 *
 * Mirrors the entry added to lib/mock/events.ts so the local fallback and
 * the live dataset stay in step.
 *
 * Run with: npx tsx scripts/add-event-emma-nash.ts
 */
import { createClient } from "@sanity/client";
import { readFileSync, existsSync } from "fs";
import { join, dirname } from "path";
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

const SLUG = "evangelism-workshop-emma-nash";

async function main() {
  const event = events.find((e) => e.slug === SLUG);
  if (!event) throw new Error(`no event with slug "${SLUG}" in lib/mock/events.ts`);

  const churchId = `church-${event.churchSlug}`;
  const church = await client.getDocument(churchId);
  if (!church) throw new Error(`church document "${churchId}" not found in Sanity`);

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
  });

  console.log(`✓ ${event.title}`);
  console.log(`  ${event.startDateTime} → ${event.endDateTime} at ${church.name}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
