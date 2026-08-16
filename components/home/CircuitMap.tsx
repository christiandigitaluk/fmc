"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/cn";

type Pin = { name: string; slug: string; xPct: number; yPct: number };

/**
 * Positions are percentages of the illustrated map image, not real lat/lng —
 * the artwork is a stylised drawing rather than a true projection.
 */
const CHURCH_PINS: Pin[] = [
  { name: "Trinity Church Debden Methodist", slug: "loughton-trinity", xPct: 66.65, yPct: 18.78 },
  { name: "Loughton Methodist Church", slug: "loughton", xPct: 58.83, yPct: 22.19 },
  { name: "South Chingford Methodist Church", slug: "south-chingford", xPct: 37.85, yPct: 43.25 },
  { name: "Winchester Road Methodist Church", slug: "winchester-road", xPct: 41.11, yPct: 52.74 },
  { name: "Woodford Methodist Church", slug: "woodford", xPct: 46.49, yPct: 54.22 },
  { name: "Shern Hall Methodist Church", slug: "shern-hall", xPct: 41.26, yPct: 65.7 },
  { name: "Lighthouse Methodist Church", slug: "lighthouse-walthamstow", xPct: 33.35, yPct: 69.81 },
  { name: "Leytonstone Methodist Church", slug: "leytonstone", xPct: 45.28, yPct: 75.45 },
  { name: "Leyton (Trinity) Methodist Church", slug: "leyton-trinity", xPct: 39.55, yPct: 79.62 },
  { name: "Cann Hall Methodist Church", slug: "cann-hall", xPct: 47.05, yPct: 81.28 },
];

/**
 * The circuit is geographically tight, so at phone width the ten pins land
 * 14-26px apart on a ~300px-wide map — far closer than the 44px minimum for
 * touch targets, leaving 15 of 45 pin pairs overlapping. Tapping a dot
 * reliably hit the wrong church, and pop-up name labels ran off the edge.
 *
 * So the map is presented as what it actually is at this size: an overview
 * showing where the circuit sits. The list below carries every church name
 * at full width, which also means names are readable without interacting at
 * all. On pointer devices, hovering a name still lights up its pin, so the
 * map-to-church connection survives where there's room for it.
 */
export function CircuitMap() {
  const [activeSlug, setActiveSlug] = useState<string | null>(null);

  return (
    <div>
      <div className="relative w-full">
        <Image
          src="/images/hero-map.png"
          alt="Map of Forest Circuit's ten Methodist churches across Waltham Forest, Wanstead and Loughton"
          width={1600}
          height={1180}
          sizes="(min-width: 1280px) 1160px, 100vw"
          className="block h-auto w-full rounded-[14px]"
        />

        <span className="sticker absolute left-4 top-4 z-10 flex h-20 w-20 items-center justify-center rounded-full bg-white sm:h-24 sm:w-24">
          <Image
            src="/images/logo-ink.png"
            alt="Forest Circuit"
            width={72}
            height={72}
            className="h-16 w-16 sm:h-20 sm:w-20"
          />
        </span>

        {CHURCH_PINS.map((pin) => (
          <span
            key={pin.slug}
            aria-hidden="true"
            className={cn(
              "pointer-events-none absolute block h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-ink-900 shadow-[1px_1px_0_var(--ink-900)] transition-[transform,background-color] duration-200 ease-[cubic-bezier(.22,.61,.36,1)] sm:h-5 sm:w-5",
              activeSlug === pin.slug ? "z-10 scale-[1.6] bg-white" : "bg-orange-500"
            )}
            style={{ left: `${pin.xPct}%`, top: `${pin.yPct}%` }}
          />
        ))}
      </div>

      <ul className="mt-4 grid gap-x-4 gap-y-0.5 sm:grid-cols-2 lg:grid-cols-3">
        {CHURCH_PINS.map((pin) => (
          <li key={pin.slug}>
            <Link
              href={`/churches/${pin.slug}`}
              onMouseEnter={() => setActiveSlug(pin.slug)}
              onMouseLeave={() => setActiveSlug(null)}
              onFocus={() => setActiveSlug(pin.slug)}
              onBlur={() => setActiveSlug(null)}
              className="flex items-center gap-2.5 rounded-full px-3 py-3 text-sm font-semibold text-[var(--text-heading)] no-underline transition-colors hover:bg-forest-100 hover:no-underline focus:outline-none focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-2"
              style={{ outlineColor: "var(--focus-ring)" }}
            >
              <span
                aria-hidden="true"
                className="h-2.5 w-2.5 shrink-0 rounded-full border-2 border-ink-900 bg-orange-500"
              />
              {pin.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
