"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

type Pin = { name: string; slug: string; xPct: number; yPct: number };
type LabelAlign = "center" | "left" | "right";

const RAW_PINS: Pin[] = [
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
 * A label pops up directly below (or above) its own pin, centred on it. When
 * two pins sit close together, a centred label is wide enough to reach right
 * over the neighbouring pin and block clicks on it — e.g. Winchester Road's
 * label used to cover Woodford's dot. For pins with a close neighbour,
 * anchor the label to whichever edge points away from that neighbour
 * instead of centring it, so the whole label body sits clear of it
 * regardless of how long the church name is.
 */
function withLabelAlign(pins: Pin[]) {
  return pins.map((pin, i) => {
    let nearestDist = Infinity;
    let nearestX = pin.xPct;
    pins.forEach((other, j) => {
      if (i === j) return;
      const dist = Math.hypot(other.xPct - pin.xPct, other.yPct - pin.yPct);
      if (dist < nearestDist) {
        nearestDist = dist;
        nearestX = other.xPct;
      }
    });
    const labelAlign: LabelAlign = nearestDist >= 8 ? "center" : pin.xPct <= nearestX ? "left" : "right";
    return { ...pin, labelAlign };
  });
}

const CHURCH_PINS = withLabelAlign(RAW_PINS);

/**
 * Pins carry the interaction from `lg` up, and a plain list carries it below.
 *
 * The circuit is geographically tight, so pin spacing scales with the map:
 * at 1024px+ the closest two pins sit 44px apart or more, which is exactly
 * the minimum for separate touch targets. Below that they close to 32px at
 * tablet and 14px on a phone, so 15 of 45 pin pairs overlap and a tap lands
 * on the wrong church — and a full church name is wider than the space left
 * beside most pins, so the pop-up labels get clipped at the container edge.
 *
 * Rather than degrade the desktop map to fix a small-screen problem, the
 * pins go quiet below `lg` (decorative only, no labels) and every church is
 * listed underneath at full width instead.
 */
export function CircuitMap() {
  // Only one index is ever "active" (hover previews, click locks it open for
  // touch) so at most one name label can be on screen at a time — with pins
  // this close together, showing more than one at once is how they collide.
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const [lockedIndex, setLockedIndex] = useState<number | null>(null);
  const activeIndex = hoverIndex ?? lockedIndex;
  const activePin = activeIndex !== null ? CHURCH_PINS[activeIndex] : null;
  const labelAbove = activePin ? activePin.yPct > 68 : false;
  const labelTranslateX =
    activePin?.labelAlign === "left" ? "calc(-100% - 10px)" : activePin?.labelAlign === "right" ? "10px" : "-50%";

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
          <Image src="/images/logo-ink.png" alt="Forest Circuit" width={72} height={72} className="h-16 w-16 sm:h-20 sm:w-20" />
        </span>

        {CHURCH_PINS.map((pin, i) => (
          <button
            key={pin.slug}
            type="button"
            onMouseEnter={() => setHoverIndex(i)}
            onMouseLeave={() => setHoverIndex(null)}
            onFocus={() => setHoverIndex(i)}
            onBlur={() => setHoverIndex(null)}
            onClick={() => setLockedIndex((cur) => (cur === i ? null : i))}
            aria-expanded={lockedIndex === i}
            aria-label={pin.name}
            className="pointer-events-none absolute block h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-ink-900 bg-orange-500 shadow-[1px_1px_0_var(--ink-900)] transition-transform before:absolute before:inset-[-14px] before:content-[''] focus:outline-none focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-2 sm:h-5 sm:w-5 lg:pointer-events-auto lg:hover:scale-125"
            style={{ left: `${pin.xPct}%`, top: `${pin.yPct}%`, outlineColor: "var(--focus-ring)" }}
          />
        ))}

        {activePin && (
          <span
            aria-hidden="true"
            className="pointer-events-none absolute z-10 hidden whitespace-nowrap rounded-full border-2 border-ink-900 bg-white px-3 py-1.5 text-xs font-bold text-ink-900 shadow-[2px_2px_0_var(--ink-900)] sm:text-sm lg:block"
            style={{
              left: `${activePin.xPct}%`,
              transform: `translateX(${labelTranslateX})`,
              ...(labelAbove ? { bottom: `${100 - activePin.yPct}%`, marginBottom: "12px" } : { top: `${activePin.yPct}%`, marginTop: "12px" }),
            }}
          >
            {activePin.name}
          </span>
        )}
      </div>

      <ul className="mt-4 grid gap-x-4 gap-y-0.5 sm:grid-cols-2 lg:hidden">
        {CHURCH_PINS.map((pin) => (
          <li key={pin.slug}>
            <Link
              href={`/churches/${pin.slug}`}
              className="flex items-center gap-2.5 rounded-full px-3 py-3 text-sm font-semibold text-[var(--text-heading)] no-underline transition-colors hover:bg-forest-100 hover:no-underline focus:outline-none focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-2"
              style={{ outlineColor: "var(--focus-ring)" }}
            >
              <span aria-hidden="true" className="h-2.5 w-2.5 shrink-0 rounded-full border-2 border-ink-900 bg-orange-500" />
              {pin.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
