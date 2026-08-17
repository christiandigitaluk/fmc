"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

type Pin = { name: string; slug: string; xPct: number; yPct: number };
type LabelAlign = "center" | "left" | "right";

/**
 * Ordered north to south, so the numbering on the map reads top-to-bottom
 * and matches the order of the list underneath it.
 */
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
 * Two presentations of the same map, split at `lg`.
 *
 * Desktop keeps the original: pins are buttons, hovering one pops its name
 * up beside it. That works because pin spacing scales with the map — the
 * closest two sit 44px apart at 1024px and 62px at 1440px.
 *
 * On a phone the same pins close to 14px, so they can neither be tapped
 * apart nor labelled without the label running off the edge. Two things fix
 * it. The churches only occupy the middle third of the artwork's width but
 * two thirds of its height, so below `lg` the map is cropped to the circuit
 * itself — which suits a portrait screen and spreads the pins to ~32px,
 * enough to number them. The numbers then key into a list underneath, which
 * is where the tapping happens.
 *
 * The crop shows x 28%-72% and y 8%-92% of the source image, which keeps the
 * whole green circuit outline (measured at x 30.9%-69.0%, y 10.3%-90.3%)
 * inside frame. Only the horizontal crop sets the scale — the image is
 * sized to the box width — so the generous vertical bounds cost no pin
 * spacing. Expressed as Tailwind classes rather than inline styles so the
 * `lg:` variants can switch the crop off:
 *   width  100/0.44 = 227.27%     left  -(28/44) = -63.64%
 *   height 100/0.84 = 119.05%     top   -(8/84)  =  -9.52%
 *   box aspect (0.44*1600)/(0.84*1180) = 880/1239
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
      <div className="relative aspect-[880/1239] w-full overflow-hidden rounded-[14px] lg:aspect-[1600/1180]">
        {/* The full artwork, oversized and offset so the crop window above
            frames just the circuit. Pin percentages stay relative to this,
            i.e. to the image itself, so they need no adjusting. */}
        <div className="absolute left-[-63.64%] top-[-9.52%] h-[119.05%] w-[227.27%] lg:left-0 lg:top-0 lg:h-full lg:w-full">
          <Image
            src="/images/hero-map.png"
            alt="Map of Forest Circuit's ten Methodist churches across Waltham Forest, Wanstead and Loughton"
            width={1600}
            height={1180}
            sizes="(min-width: 1024px) 1160px, 230vw"
            className="block h-full w-full"
          />

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
              className="pointer-events-none absolute flex h-6 w-6 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-ink-900 bg-orange-500 text-[11px] font-bold leading-none text-ink-900 shadow-[1px_1px_0_var(--ink-900)] transition-transform before:absolute before:inset-[-14px] before:content-[''] focus:outline-none focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-2 lg:pointer-events-auto lg:h-5 lg:w-5 lg:hover:scale-125"
              style={{ left: `${pin.xPct}%`, top: `${pin.yPct}%`, outlineColor: "var(--focus-ring)" }}
            >
              {/* Desktop identifies pins by their hover label instead, and a
                  numeral in a 20px dot would only crowd it. */}
              <span aria-hidden="true" className="lg:hidden">
                {i + 1}
              </span>
            </button>
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

        <span className="sticker absolute left-4 top-4 z-10 flex h-20 w-20 items-center justify-center rounded-full bg-white sm:h-24 sm:w-24">
          <Image src="/images/logo-ink.png" alt="Forest Circuit" width={72} height={72} className="h-16 w-16 sm:h-20 sm:w-20" />
        </span>
      </div>

      <ol className="mt-4 grid gap-x-4 gap-y-0.5 sm:grid-cols-2 lg:hidden">
        {CHURCH_PINS.map((pin, i) => (
          <li key={pin.slug}>
            <Link
              href={`/churches/${pin.slug}`}
              className="flex items-center gap-3 rounded-full px-2 py-2.5 text-sm font-semibold text-[var(--text-heading)] no-underline transition-colors hover:bg-forest-100 hover:no-underline focus:outline-none focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-2"
              style={{ outlineColor: "var(--focus-ring)" }}
            >
              <span
                aria-hidden="true"
                className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 border-ink-900 bg-orange-500 text-[11px] font-bold leading-none text-ink-900"
              >
                {i + 1}
              </span>
              {pin.name}
            </Link>
          </li>
        ))}
      </ol>
    </div>
  );
}
