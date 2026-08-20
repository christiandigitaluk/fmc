/**
 * Corrects the Lighthouse Methodist Church website URL in Sanity.
 *
 * The old address (www.lighthousemethodist.org.uk) no longer resolves, so the
 * link on the church page was dead. The church now sits at
 * lighthousemethodistchurch.org.uk.
 *
 * Churches normally live in Sanity Studio, so this is only here to apply the
 * correction without waiting on a Studio session. Mirrors the change made to
 * lib/mock/churches.ts so the local fallback and the live dataset stay in step.
 *
 * Run with: npx tsx scripts/set-lighthouse-website.ts
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

const SLUG = "lighthouse-walthamstow";

async function main() {
  const church = churches.find((c) => c.slug === SLUG);
  if (!church) throw new Error(`no church with slug "${SLUG}" in lib/mock/churches.ts`);

  const id = `church-${SLUG}`;
  const before = await client.getDocument(id);
  if (!before) throw new Error(`church document "${id}" not found in Sanity`);

  await client.patch(id).set({ website: church.website }).commit();

  console.log(`✓ ${church.name}`);
  console.log(`  was: ${before.website}`);
  console.log(`  now: ${church.website}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
