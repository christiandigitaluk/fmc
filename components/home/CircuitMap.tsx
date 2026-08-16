"use client";

import { useState } from "react";
import Image from "next/image";

type Pin = { name: string; xPct: number; yPct: number };
type LabelAlign = "center" | "left" | "right";

const RAW_PINS: Pin[] = [
  { name: "Trinity Church Debden Methodist", xPct: 66.65, yPct: 18.78 },
  { name: "Loughton Methodist Church", xPct: 58.83, yPct: 22.19 },
  { name: "South Chingford Methodist Church", xPct: 37.85, yPct: 43.25 },
  { name: "Winchester Road Methodist Church", xPct: 41.11, yPct: 52.74 },
  { name: "Woodford Methodist Church", xPct: 46.49, yPct: 54.22 },
  { name: "Shern Hall Methodist Church", xPct: 41.26, yPct: 65.7 },
  { name: "Lighthouse Methodist Church", xPct: 33.35, yPct: 69.81 },
  { name: "Leytonstone Methodist Church", xPct: 45.28, yPct: 75.45 },
  { name: "Leyton (Trinity) Methodist Church", xPct: 39.55, yPct: 79.62 },
  { name: "Cann Hall Methodist Church", xPct: 47.05, yPct: 81.28 },
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
          key={pin.name}
          type="button"
          onMouseEnter={() => setHoverIndex(i)}
          onMouseLeave={() => setHoverIndex(null)}
          onFocus={() => setHoverIndex(i)}
          onBlur={() => setHoverIndex(null)}
          onClick={() => setLockedIndex((cur) => (cur === i ? null : i))}
          aria-expanded={lockedIndex === i}
          aria-label={pin.name}
          className="absolute block h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-ink-900 bg-orange-500 shadow-[1px_1px_0_var(--ink-900)] transition-transform before:absolute before:inset-[-14px] before:content-[''] hover:scale-125 focus:outline-none focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-2 sm:h-5 sm:w-5"
          style={{ left: `${pin.xPct}%`, top: `${pin.yPct}%`, outlineColor: "var(--focus-ring)" }}
        />
      ))}

      {activePin && (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute z-10 whitespace-nowrap rounded-full border-2 border-ink-900 bg-white px-3 py-1.5 text-xs font-bold text-ink-900 shadow-[2px_2px_0_var(--ink-900)] sm:text-sm"
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
  );
}
