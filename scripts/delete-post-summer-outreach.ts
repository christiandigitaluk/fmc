/**
 * Removes the "Reflections from our summer outreach" placeholder post from
 * Sanity. It was filler content written before the churches supplied real
 * news, and it sat directly beneath the launch article inviting people to
 * send in their own stories.
 *
 * Mirrors the removal from lib/mock/posts.ts so the local fallback and the
 * live dataset stay in step.
 *
 * Run with: npx tsx scripts/delete-post-summer-outreach.ts
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

const ID = "post-reflections-from-our-summer-outreach";

async function main() {
  const existing = await client.getDocument(ID);
  if (!existing) {
    console.log(`nothing to do, "${ID}" is not in the dataset`);
    return;
  }

  await client.delete(ID);
  console.log(`✓ deleted ${ID}`);
  console.log(`  was: ${existing.title}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
