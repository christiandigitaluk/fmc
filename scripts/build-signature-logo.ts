/**
 * The circuit mark in forest green on transparent, for email signatures —
 * the one place the brand uses a plain green-on-white treatment instead of
 * ink or the white-on-green reversed mark, since email clients render on a
 * white compose background and a circular colour badge doesn't survive
 * Outlook/Gmail's HTML stripping reliably.
 *
 * Run with: npx tsx scripts/build-signature-logo.ts
 */
import sharp from "sharp";
import { readFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const SOURCE = join(ROOT, "public/images/logo-white.png");
const OUTPUT = join(ROOT, "public/images/logo-green.png");
const GREEN = { r: 0x1b, g: 0x7a, b: 0x46, alpha: 1 }; // --forest-700

async function main() {
  // tint() preserves luminance, so it barely shifts a near-white source —
  // rebuild the pixel buffer directly instead: keep the white source's
  // alpha channel (and its anti-aliasing) exactly, replace every RGB triple
  // with the flat green.
  const { data, info } = await sharp(SOURCE).trim().ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  for (let i = 0; i < data.length; i += info.channels) {
    data[i] = GREEN.r;
    data[i + 1] = GREEN.g;
    data[i + 2] = GREEN.b;
    // alpha (data[i + 3]) is left as-is
  }
  await sharp(data, { raw: { width: info.width, height: info.height, channels: info.channels } }).png().toFile(OUTPUT);

  const out = await sharp(OUTPUT).metadata();
  console.log(`wrote public/images/logo-green.png — ${out.width}x${out.height}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
