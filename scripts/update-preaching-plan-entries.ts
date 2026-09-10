/**
 * Re-pushes one or more preaching plan entries from lib/mock/preachingPlan.ts
 * to Sanity by id, using the same "pp-<id>" document id the original seed
 * script used (scripts/seed.ts, seedPreachingPlan).
 *
 * Preaching plan entries are normally managed in Sanity Studio; this exists
 * for the same reason as scripts/add-event.ts, applying a correction from the
 * plan booklet without waiting on a Studio session. createOrReplace means an
 * id that doesn't exist yet is created, so this doubles as an add script too.
 *
 * Run with: npx tsx scripts/update-preaching-plan-entries.ts <id> [<id> ...]
 */
import { createClient } from "@sanity/client";
import { readFileSync, existsSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { preachingPlan } from "../lib/mock/preachingPlan";

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
  const ids = process.argv.slice(2);
  if (ids.length === 0) {
    throw new Error(
      "give one or more entry ids, e.g. npx tsx scripts/update-preaching-plan-entries.ts 2026-09-27-south-chingford"
    );
  }

  for (const id of ids) {
    const entry = preachingPlan.find((e) => e.id === id);
    if (!entry) throw new Error(`no entry with id "${id}" in lib/mock/preachingPlan.ts`);

    const churchId = `church-${entry.churchSlug}`;
    const church = await client.getDocument(churchId);
    if (!church) throw new Error(`church document "${churchId}" not found in Sanity`);

    await client.createOrReplace({
      _id: `pp-${entry.id}`,
      _type: "preachingPlanEntry",
      date: entry.date,
      church: { _type: "reference", _ref: churchId },
      time: entry.time,
      preacher: entry.preacher,
      notes: entry.notes,
    });

    console.log(`✓ ${entry.date}  ${church.name}  ${entry.preacher}${entry.notes ? `  (${entry.notes})` : ""}`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
