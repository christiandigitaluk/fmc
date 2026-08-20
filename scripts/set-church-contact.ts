/**
 * Syncs a church's contact details (phone, email, website) from
 * lib/mock/churches.ts into Sanity.
 *
 * Churches are managed in Sanity Studio; this is only here to apply
 * corrections without waiting on a Studio session. Replaces the earlier
 * per-church scripts, so the next correction needs a slug rather than a new
 * file.
 *
 * Fields absent from the mock entry are unset in Sanity rather than left
 * behind, so removing a detail here actually removes it from the site.
 *
 * Run with: npx tsx scripts/set-church-contact.ts <slug> [slug ...]
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

const FIELDS = ["phone", "email", "website"] as const;

async function main() {
  const slugs = process.argv.slice(2);
  if (slugs.length === 0) {
    throw new Error("give at least one church slug, e.g. npx tsx scripts/set-church-contact.ts loughton-trinity");
  }

  for (const slug of slugs) {
    const church = churches.find((c) => c.slug === slug);
    if (!church) throw new Error(`no church with slug "${slug}" in lib/mock/churches.ts`);

    const id = `church-${slug}`;
    const before = await client.getDocument(id);
    if (!before) throw new Error(`church document "${id}" not found in Sanity`);

    const set: Record<string, string> = {};
    const unset: string[] = [];
    for (const field of FIELDS) {
      const value = church[field];
      if (value) set[field] = value;
      else if (before[field]) unset.push(field);
    }

    let patch = client.patch(id).set(set);
    if (unset.length > 0) patch = patch.unset(unset);
    await patch.commit();

    console.log(`✓ ${church.name}`);
    for (const field of FIELDS) {
      const was = before[field] ?? "(none)";
      const now = church[field] ?? "(none)";
      if (was !== now) console.log(`  ${field}: ${was} -> ${now}`);
    }
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
