/**
 * Draws the social share card: the circuit mark in white, centred on brand
 * green, at the 1200x630 every platform crops its link preview from.
 *
 * Run with: npx tsx scripts/build-share-image.ts
 *
 * Committed as a real file rather than generated per-request, because crawlers
 * fetch it far more often than anyone deploys, and several of them give up on
 * a slow response and show nothing.
 */
import sharp from "sharp";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const SOURCE = join(ROOT, "public/images/logo-white.png");
const OUTPUT = join(ROOT, "public/images/og-share.png");

const WIDTH = 1200;
const HEIGHT = 630;
const GREEN = { r: 0x1b, g: 0x7a, b: 0x46 }; // --forest-700
const MARK_HEIGHT = Math.round(HEIGHT * 0.52); // calm margin on every side

async function main() {
  // The source has transparent padding baked in; trim it so the mark itself
  // ends up centred rather than its bounding box.
  const mark = await sharp(SOURCE).trim().resize({ height: MARK_HEIGHT }).toBuffer();
  const { width, height } = await sharp(mark).metadata();

  await sharp({
    create: { width: WIDTH, height: HEIGHT, channels: 4, background: { ...GREEN, alpha: 1 } },
  })
    .composite([
      {
        input: mark,
        left: Math.round((WIDTH - (width ?? 0)) / 2),
        top: Math.round((HEIGHT - (height ?? 0)) / 2),
      },
    ])
    .png({ compressionLevel: 9 })
    .toFile(OUTPUT);

  const out = await sharp(OUTPUT).metadata();
  console.log(`wrote public/images/og-share.png — ${out.width}x${out.height}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
