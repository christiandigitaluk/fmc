/**
 * Pushes the noticeboard items from lib/mock/notices.ts into Sanity.
 *
 * Noticeboard items are managed in Sanity Studio under "Noticeboard"; this is
 * only here to seed them without waiting on a Studio session. Add and retire
 * them there in future and this becomes stale.
 *
 * Expired notices do not need deleting: getNotices drops anything whose
 * deadline has passed, so a finished item comes off the site by itself.
 *
 * Run with: npx tsx scripts/set-notices.ts
 */
import { createClient } from "@sanity/client";
import { readFileSync, existsSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { notices } from "../lib/mock/notices";

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
  for (const notice of notices) {
    if (notice.url && /[?&](utm_|dm_i)/.test(notice.url)) {
      throw new Error(`"${notice.slug}" still carries tracking parameters: ${notice.url}`);
    }

    await client.createOrReplace({
      _id: `notice-${notice.slug}`,
      _type: "notice",
      title: notice.title,
      slug: { _type: "slug", current: notice.slug },
      summary: notice.summary,
      ...(notice.deadline ? { deadline: notice.deadline } : {}),
      ...(notice.label ? { label: notice.label } : {}),
      ...(notice.url ? { url: notice.url } : {}),
    });

    console.log(`✓ ${notice.title}${notice.deadline ? `  (closes ${notice.deadline})` : ""}`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
