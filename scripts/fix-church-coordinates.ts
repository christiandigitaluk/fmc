/**
 * One-off targeted patch: replaces postcode-centroid coordinates with the
 * actual building's coordinates from OpenStreetMap's place_of_worship POI
 * data, for churches where a confident, name-matched POI was found. A
 * postcode centroid can legitimately be 50-200m from the real building,
 * which is visibly wrong on a street-level embedded map.
 *
 * Left unchanged (kept on the verified postcode centroid): leyton-trinity,
 * loughton-trinity, south-chingford, wanstead — no confident building-level
 * OSM match was found for these, and a wrong guess is worse than a slightly
 * imprecise but honest centroid.
 *
 * Run with: npx tsx scripts/fix-church-coordinates.ts
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

const CORRECTIONS: Record<string, { lat: number; lng: number }> = {
  "cann-hall": { lat: 51.5575068, lng: 0.0162585 },
  leytonstone: { lat: 51.5657106, lng: 0.010605 },
  "lighthouse-walthamstow": { lat: 51.5760404, lng: -0.0300766 },
  loughton: { lat: 51.6496245, lng: 0.0566101 },
  "shern-hall": { lat: 51.5825842, lng: -0.0036702 },
  "winchester-road": { lat: 51.6038039, lng: -0.0031947 },
  // Overrides the earlier postcode-centroid fix for Woodford (E18 2PU) with
  // its more precise place_of_worship POI coordinate — ~130m closer to the
  // real building than a postcode centroid gets.
  woodford: { lat: 51.5994756, lng: 0.0195111 },
};

async function main() {
  for (const [slug, patch] of Object.entries(CORRECTIONS)) {
    const id = `church-${slug}`;
    await client.patch(id).set(patch).commit();
    console.log(`${id}:`, JSON.stringify(patch));
  }
  console.log("Done.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
