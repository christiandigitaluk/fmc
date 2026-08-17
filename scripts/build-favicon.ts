/**
 * Draws the browser-tab icon: the circuit mark in white on brand green,
 * matching the social share card's treatment so the two read as the same
 * mark rather than two different logo cuts.
 *
 * Run with: npx tsx scripts/build-favicon.ts
 * Needs python3 + Pillow on PATH (`pip3 install pillow`) — sharp can't emit
 * the multi-resolution .ico format, only Pillow's ICO writer can.
 */
import sharp from "sharp";
import { execFileSync } from "child_process";
import { mkdtempSync, rmSync } from "fs";
import { tmpdir } from "os";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const SOURCE = join(ROOT, "public/images/logo-white.png");
const GREEN = { r: 0x1b, g: 0x7a, b: 0x46 }; // --forest-700

async function squareIcon(size: number): Promise<Buffer> {
  const markHeight = Math.round(size * 0.62); // same calm margin as the share card
  const mark = await sharp(SOURCE).trim().resize({ height: markHeight }).toBuffer();
  const { width, height } = await sharp(mark).metadata();

  return sharp({ create: { width: size, height: size, channels: 4, background: { ...GREEN, alpha: 1 } } })
    .composite([{ input: mark, left: Math.round((size - (width ?? 0)) / 2), top: Math.round((size - (height ?? 0)) / 2) }])
    .png()
    .toBuffer();
}

async function main() {
  await sharp(await squareIcon(512)).toFile(join(ROOT, "app/icon.png"));
  await sharp(await squareIcon(180)).toFile(join(ROOT, "app/apple-icon.png"));

  const tmpDir = mkdtempSync(join(tmpdir(), "favicon-"));
  const source256 = join(tmpDir, "256.png");
  await sharp(await squareIcon(256)).toFile(source256);

  const icoPath = join(ROOT, "app/favicon.ico");
  execFileSync("python3", [
    "-c",
    `from PIL import Image; Image.open(${JSON.stringify(source256)}).save(${JSON.stringify(icoPath)}, sizes=[(16,16),(32,32),(48,48)])`,
  ]);
  rmSync(tmpDir, { recursive: true, force: true });

  console.log("wrote app/icon.png, app/apple-icon.png, app/favicon.ico");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
