/**
 * One-off targeted patch: corrects the main Sunday serviceTimes entry for
 * churches whose church-page time didn't match their (verified-correct)
 * preaching plan time. Only touches the specific field, not a full reseed,
 * so it can't clobber any real edits made via Sanity Studio since seeding.
 * Run with: npx tsx scripts/fix-service-times.ts
 */
import { createClient } from "@sanity/client";
import { readFileSync, existsSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

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

// slug -> corrected first serviceTimes[0].time, verified against every
// preaching plan entry for that church (13/13 consistent in each case)
const CORRECTIONS: Record<string, string> = {
  "cann-hall": "09:00",
  "leyton-trinity": "11:00",
  leytonstone: "11:00",
  loughton: "10:30",
  "loughton-trinity": "10:30",
  "shern-hall": "11:00",
  woodford: "10:30",
};

async function main() {
  for (const [slug, time] of Object.entries(CORRECTIONS)) {
    const id = `church-${slug}`;
    const doc = await client.getDocument(id);
    if (!doc) {
      console.warn(`skip ${id}: not found`);
      continue;
    }
    const serviceTimes = (doc.serviceTimes as { day: string; time: string; label: string }[]) || [];
    if (serviceTimes.length === 0) {
      console.warn(`skip ${id}: no serviceTimes array`);
      continue;
    }
    const before = serviceTimes[0].time;
    serviceTimes[0] = { ...serviceTimes[0], time };
    await client.patch(id).set({ serviceTimes }).commit();
    console.log(`${id}: ${before} -> ${time}`);
  }
  console.log("Done.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
