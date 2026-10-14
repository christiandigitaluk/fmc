"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";

/**
 * Small promo widget for one upcoming event, floating bottom-right on the
 * homepage. Tapping it opens the event's poster full size.
 *
 * It appears after a delay so it never competes with the hero on first
 * paint, and it is fixed-position so it cannot push content around.
 * Dismissing it or opening the poster both count as "seen" for the rest of
 * the browser session, so a visitor moving between pages is not nagged.
 *
 * It retires itself: once `endsAt` has passed it never appears, so nobody
 * has to remember to take it down after the event. To promote the next
 * event, change the props where it is mounted (with a new `id`, so people
 * who dismissed the last one still see this one).
 */
const REVEAL_DELAY_MS = 8000;
const DAY_MS = 24 * 60 * 60 * 1000;

export type EventPosterWidgetProps = {
  /** Unique per event. Used to remember that a visitor has seen this one. */
  id: string;
  /** Short name shown after the day, e.g. "Black History Month at Shern Hall". */
  title: string;
  /** Local date-times, e.g. "2026-10-17T17:30:00". */
  startsAt: string;
  endsAt: string;
  poster: {
    src: string;
    width: number;
    height: number;
    alt: string;
    /** Square image for the small widget. Defaults to a crop of the poster, which suits portrait posters. */
    thumbnailSrc?: string;
  };
};

/** "Today", "Tomorrow", "This Saturday", or the date once it is a week or more away. */
function dayLabel(startsAt: string, now: Date): string {
  const start = new Date(startsAt);
  const midnight = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime();
  const days = Math.round((midnight(start) - midnight(now)) / DAY_MS);

  if (days <= 0) return "Today";
  if (days === 1) return "Tomorrow";
  if (days < 7) return `This ${start.toLocaleDateString("en-GB", { weekday: "long" })}`;
  return start.toLocaleDateString("en-GB", { day: "numeric", month: "long" });
}

export function EventPosterWidget({ id, title, startsAt, endsAt, poster }: EventPosterWidgetProps) {
  // A landscape poster at portrait width leaves its small print unreadable,
  // so it gets a wider pop-up.
  const landscape = poster.width > poster.height;
  // armed: this visitor is going to be shown the widget, so it is in the
  // page but hidden, which lets the thumbnail load during the delay.
  // visible: the delay has passed and it has been revealed.
  const [armed, setArmed] = useState(false);
  const [visible, setVisible] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [when, setWhen] = useState("");
  const storageKey = `event-widget-seen:${id}`;

  useEffect(() => {
    const now = new Date();
    if (now.getTime() > new Date(endsAt).getTime()) return;

    let seen = false;
    try {
      seen = sessionStorage.getItem(storageKey) === "1";
    } catch {
      seen = false;
    }
    if (seen) return;

    // Worked out in the browser, not at build time: the page is cached, and
    // "This Saturday" has to turn into "Tomorrow" and "Today" on its own.
    setWhen(dayLabel(startsAt, now));
    setArmed(true);
    const timer = setTimeout(() => setVisible(true), REVEAL_DELAY_MS);
    return () => clearTimeout(timer);
  }, [startsAt, endsAt, storageKey]);

  useEffect(() => {
    if (!expanded) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setExpanded(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [expanded]);

  const markSeen = () => {
    try {
      sessionStorage.setItem(storageKey, "1");
    } catch {
      // sessionStorage unavailable (private browsing etc.), not worth failing over
    }
  };

  const dismiss = () => {
    setVisible(false);
    setArmed(false);
    markSeen();
  };

  const open = () => {
    setExpanded(true);
    markSeen();
  };

  if (!armed && !expanded) return null;

  return (
    <>
      {armed && !expanded && (
        <div
          className={`fixed bottom-3 right-3 z-40 sm:bottom-6 sm:right-6 ${
            // `invisible` also takes it out of the tab order and away from
            // screen readers until it is actually revealed.
            visible ? "animate-widget-in" : "pointer-events-none invisible"
          }`}
        >
          <div className="sticker relative w-[180px] rounded-[12px] bg-white p-2.5 sm:w-[240px] sm:rounded-[14px] sm:p-3">
            <button
              type="button"
              onClick={dismiss}
              aria-label="Dismiss"
              className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full border-2 border-ink-900 bg-white text-ink-900 transition-transform hover:scale-110 sm:h-6 sm:w-6"
            >
              <X size={11} strokeWidth={3} aria-hidden="true" className="sm:hidden" />
              <X size={13} strokeWidth={3} aria-hidden="true" className="hidden sm:block" />
            </button>

            <button type="button" onClick={open} className="flex w-full items-center gap-2 text-left sm:gap-3">
              <span className="relative h-11 w-11 shrink-0 overflow-hidden rounded-[7px] border-2 border-ink-900 sm:h-14 sm:w-14 sm:rounded-[8px]">
                <Image
                  src={poster.thumbnailSrc ?? poster.src}
                  alt=""
                  fill
                  sizes="112px"
                  loading="eager"
                  className="object-cover"
                />
              </span>
              <span className="min-w-0">
                <span className="sticker mb-1 inline-flex items-center rounded-full bg-orange-500 px-2 py-0.5 text-[9px] font-extrabold uppercase tracking-wide text-ink-900 sm:text-[10px]">
                  Upcoming
                </span>
                <span className="block text-xs font-bold leading-snug text-ink-900">
                  {when}: {title}
                </span>
              </span>
            </button>
          </div>
        </div>
      )}

      {expanded && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-ink-900/70 p-4"
          onClick={() => setExpanded(false)}
        >
          <div
            className={`relative max-h-[90vh] w-full overflow-auto rounded-[16px] border-2 border-ink-900 bg-white p-2 shadow-[6px_6px_0_var(--ink-900)] ${
              landscape ? "max-w-4xl" : "max-w-sm sm:max-w-md"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Inside the card, not hanging off its corner: on a narrow
                screen a negative offset pushes it past the viewport edge. */}
            <button
              type="button"
              onClick={() => setExpanded(false)}
              aria-label="Close"
              className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full border-2 border-ink-900 bg-white text-ink-900 transition-transform hover:scale-110"
            >
              <X size={18} strokeWidth={3} aria-hidden="true" />
            </button>
            <Image
              src={poster.src}
              alt={poster.alt}
              width={poster.width}
              height={poster.height}
              sizes={landscape ? "(min-width: 928px) 880px, 95vw" : "(min-width: 640px) 448px, 90vw"}
              className="h-auto w-full rounded-[10px]"
              priority
            />
          </div>
        </div>
      )}
    </>
  );
}
