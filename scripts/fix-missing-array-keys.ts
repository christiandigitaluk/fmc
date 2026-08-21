/**
 * Adds a _key to any array item in Sanity that is missing one.
 *
 * Sanity needs a _key on every item in an array of objects. Without it the
 * Studio refuses to edit the field, showing "Some items in the list are
 * missing their keys", which is what happened to every church's service times:
 * whatever first seeded the dataset wrote the arrays without keys.
 *
 * Only ever adds _key. Nothing else about a document is touched, so this is
 * safe to run again, and safe to run across every document type.
 *
 * Run with:
 *   npx tsx scripts/fix-missing-array-keys.ts          (report only)
 *   npx tsx scripts/fix-missing-array-keys.ts --apply  (write the fixes)
 */
import { createClient } from "@sanity/client";
import { createHash } from "crypto";
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

/** Content-derived so a rerun produces the same key, index-suffixed so two
 *  identical items cannot collide. */
function keyFor(item: unknown, index: number): string {
  const hash = createHash("sha1").update(JSON.stringify(item)).digest("hex").slice(0, 8);
  return `${hash}${index}`;
}

/** Walks a value, adding _key to objects inside arrays. Returns whether
 *  anything changed. */
function addKeys(value: unknown, added: { count: number }): unknown {
  if (Array.isArray(value)) {
    return value.map((item, i) => {
      const walked = addKeys(item, added);
      if (walked && typeof walked === "object" && !Array.isArray(walked)) {
        const obj = walked as Record<string, unknown>;
        if (!obj._key) {
          added.count++;
          return { ...obj, _key: keyFor(obj, i) };
        }
      }
      return walked;
    });
  }
  if (value && typeof value === "object") {
    const out: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(value as Record<string, unknown>)) {
      out[k] = addKeys(v, added);
    }
    return out;
  }
  return value;
}

const SYSTEM_FIELDS = new Set(["_id", "_type", "_rev", "_createdAt", "_updatedAt"]);

/**
 * Sanity's own system documents live under ids beginning "_." and include the
 * access-control grants (_.groups.*). Those legitimately hold keyless arrays,
 * they are not editable content, and patching them risks the project's
 * permissions. Content only.
 */
function isSystemDocument(id: string): boolean {
  return id.startsWith("_.");
}

async function main() {
  const apply = process.argv.includes("--apply");
  const docs: Record<string, unknown>[] = await client.fetch("*[]");

  let docsChanged = 0;
  let keysAdded = 0;

  for (const doc of docs) {
    if (isSystemDocument(doc._id as string)) continue;

    const patchFields: Record<string, unknown> = {};
    const perDoc = { count: 0 };

    for (const [field, value] of Object.entries(doc)) {
      if (SYSTEM_FIELDS.has(field)) continue;
      const before = { count: 0 };
      const walked = addKeys(value, before);
      if (before.count > 0) {
        patchFields[field] = walked;
        perDoc.count += before.count;
      }
    }

    if (perDoc.count === 0) continue;

    docsChanged++;
    keysAdded += perDoc.count;
    console.log(`${apply ? "fixing" : "would fix"} ${doc._id}  (+${perDoc.count} keys in: ${Object.keys(patchFields).join(", ")})`);

    if (apply) {
      await client.patch(doc._id as string).set(patchFields).commit();
    }
  }

  console.log(
    `\n${apply ? "added" : "would add"} ${keysAdded} keys across ${docsChanged} documents` +
      (apply ? "" : "\nrun again with --apply to write the fixes")
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
