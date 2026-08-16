/**
 * One-off targeted patch: corrects church address/postcode/coordinates found
 * to be wrong against the Methodist Church's own official directory
 * (methodist.org.uk/findachurch) and postcodes.io geocoding.
 * Run with: npx tsx scripts/fix-church-addresses.ts
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

const CORRECTIONS: Record<string, Record<string, unknown>> = {
  woodford: { postcode: "E18 2PU", lat: 51.599547, lng: 0.018131 },
  "shern-hall": { address: "Shernhall Street, Walthamstow" },
  leytonstone: { address: "578 High Road, Leytonstone" },
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
