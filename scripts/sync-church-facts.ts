/**
 * Replaces the placeholder church content that shipped with the first build.
 *
 * The original descriptions, facilities, phone numbers, emails and hall-hire
 * text were written to make the pages look complete — the design handoff only
 * ever supplied name, address, minister and area. This pushes the researched
 * replacements from lib/mock/churches.ts into Sanity and clears the fields
 * that couldn't be verified, so nothing invented stays published.
 *
 * Run with: npx tsx scripts/sync-church-facts.ts
 */
import { createClient } from "@sanity/client";
import { readFileSync, existsSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

import { churches } from "../lib/mock/churches";

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
  for (const c of churches) {
    const id = `church-${c.slug}`;

    const set: Record<string, unknown> = {
      address: c.address,
      postcode: c.postcode,
      minister: c.minister,
      serviceTimes: c.serviceTimes,
      facilities: c.facilities,
      lat: c.lat,
      lng: c.lng,
    };
    // Anything we couldn't verify is removed outright rather than left as an
    // empty string, so Studio shows a genuinely blank field to fill in.
    const unset: string[] = [];
    for (const key of ["phone", "email", "website", "description", "hallHireInfo"] as const) {
      const value = c[key];
      if (value) set[key] = value;
      else unset.push(key);
    }

    let patch = client.patch(id).set(set);
    if (unset.length) patch = patch.unset(unset);
    await patch.commit();

    const kept = Object.keys(set).length;
    console.log(`${id.padEnd(30)} set ${kept} fields, cleared: ${unset.join(", ") || "none"}`);
  }
  console.log("\nDone.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
