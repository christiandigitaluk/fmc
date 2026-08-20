/**
 * Pushes a church's regular gatherings (activityGroups) into Sanity from the
 * mock data, which is where the copy is authored in this repo.
 *
 * Churches normally live in Sanity Studio, so this is only here to apply the
 * data without waiting on a Studio session. Edit it there in future and this
 * becomes stale.
 *
 * Sanity needs a _key on every array item or the Studio shows a "missing
 * keys" error and drag-to-reorder breaks, so keys are derived from the
 * content and stay stable across reruns.
 *
 * Run with: npx tsx scripts/set-church-activity-groups.ts [slug ...]
 * Defaults to loughton when no slug is given.
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

/** Stable, readable key from arbitrary text. */
function keyFrom(value: string, fallback: number): string {
  const slug = value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 40);
  return slug || `item-${fallback}`;
}

async function main() {
  const slugs = process.argv.slice(2);
  const targets = slugs.length > 0 ? slugs : ["loughton"];

  for (const slug of targets) {
    const church = churches.find((c) => c.slug === slug);
    if (!church) throw new Error(`no church with slug "${slug}" in lib/mock/churches.ts`);
    if (!church.activityGroups?.length) throw new Error(`"${slug}" has no activityGroups to push`);

    const id = `church-${slug}`;
    const existing = await client.getDocument(id);
    if (!existing) throw new Error(`church document "${id}" not found in Sanity`);

    const activityGroups = church.activityGroups.map((group, gi) => ({
      _type: "object",
      _key: keyFrom(group.title, gi),
      title: group.title,
      ...(group.intro ? { intro: group.intro } : {}),
      activities: group.activities.map((activity, ai) => ({
        _type: "object",
        _key: keyFrom(`${activity.name}-${activity.time}`, ai),
        name: activity.name,
        time: activity.time,
        frequency: activity.frequency,
        ...(activity.note ? { note: activity.note } : {}),
        description: activity.description,
      })),
    }));

    await client.patch(id).set({ activityGroups }).commit();

    const count = church.activityGroups.reduce((n, g) => n + g.activities.length, 0);
    console.log(`✓ ${church.name}`);
    console.log(`  ${activityGroups.length} groups, ${count} gatherings`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
