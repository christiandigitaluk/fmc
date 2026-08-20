/**
 * Updates the Loughton and Trinity Debden entries in Sanity.
 *
 * Loughton: a fuller description supplied by the circuit, naming the variety
 * of worship and the community cafe alongside the weekday office.
 *
 * Trinity Debden: the Methodist and Anglican joint congregation there ended in
 * 2014, so the old description was factually wrong. It now reads as an
 * ecumenical congregation, and the name drops the trailing "Methodist".
 *
 * Churches normally live in Sanity Studio, so this is only here to apply the
 * corrections without waiting on a Studio session. Mirrors the edits made to
 * lib/mock/churches.ts so the local fallback and the live dataset stay in step.
 *
 * Run with: npx tsx scripts/set-loughton-and-debden-copy.ts
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

const SLUGS = ["loughton", "loughton-trinity"];

async function main() {
  for (const slug of SLUGS) {
    const church = churches.find((c) => c.slug === slug);
    if (!church) throw new Error(`no church with slug "${slug}" in lib/mock/churches.ts`);

    const id = `church-${slug}`;
    const before = await client.getDocument(id);
    if (!before) throw new Error(`church document "${id}" not found in Sanity`);

    await client.patch(id).set({ name: church.name, description: church.description }).commit();

    console.log(`✓ ${church.name}`);
    if (before.name !== church.name) console.log(`  name was: ${before.name}`);
    console.log(`  desc now: ${church.description}`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
