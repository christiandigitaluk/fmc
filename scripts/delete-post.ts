/**
 * Removes one or more news posts from Sanity by slug.
 *
 * Replaces delete-post-summer-outreach.ts, which only ever handled one post
 * by name. Deletes are permanent in Sanity, so back the document up first if
 * there is any chance it is wanted back:
 *
 *   curl -s -G "https://<project>.apicdn.sanity.io/v2026-01-01/data/query/production" \
 *     --data-urlencode 'query=*[_type=="post" && slug.current=="<slug>"][0]' > backup.json
 *
 * Run with: npx tsx scripts/delete-post.ts <slug> [slug ...]
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

async function main() {
  const slugs = process.argv.slice(2);
  if (slugs.length === 0) {
    throw new Error("give at least one post slug, e.g. npx tsx scripts/delete-post.ts my-post-slug");
  }

  for (const slug of slugs) {
    const id = `post-${slug}`;
    const existing = await client.getDocument(id);
    if (!existing) {
      console.log(`nothing to do, "${id}" is not in the dataset`);
      continue;
    }
    await client.delete(id);
    console.log(`✓ deleted ${id}`);
    console.log(`  was: ${existing.title}`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
