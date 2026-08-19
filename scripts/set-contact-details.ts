/**
 * Sets the site's contact phone/email. Content normally lives in Sanity
 * Studio (Site settings), so this is only here to apply the change without
 * waiting on a Studio session — edit it there in future and this becomes
 * stale.
 * Run with: npx tsx scripts/set-contact-details.ts
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

const contact = {
  phone: "07458 002275",
  email: "operations@forestcircuit.org.uk",
};

async function main() {
  const before = await client.getDocument("siteSettings");
  if (!before) {
    console.log("No siteSettings document exists in Sanity yet — nothing to patch. The site is reading the mock fallback, which is already updated.");
    return;
  }
  await client.patch("siteSettings").set(contact).commit();
  console.log("was:", JSON.stringify({ phone: before?.phone, email: before?.email }, null, 1));
  console.log("now:", JSON.stringify(contact, null, 1));
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
