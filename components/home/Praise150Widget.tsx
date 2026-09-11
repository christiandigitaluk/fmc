"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";

/**
 * Small promo widget for the Praise 150 concert, floating bottom-right on
 * the homepage. Appears after a delay so it never competes with the hero on
 * first paint, and stays out of the layout entirely (fixed position) so it
 * can't push content around. Dismissing it or opening the poster both count
 * as "seen" for the rest of the browser session, via sessionStorage, so a
 * visitor browsing several pages isn't nagged by it repeatedly.
 */
const REVEAL_DELAY_MS = 8000;
const SESSION_KEY = "praise150-widget-seen";

export function Praise150Widget() {
  const [visible, setVisible] = useState(false);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem(SESSION_KEY) === "1";
    } catch {
      seen = false;
    }
    if (seen) return;

    const timer = setTimeout(() => setVisible(true), REVEAL_DELAY_MS);
    return () => clearTimeout(timer);
  }, []);

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
      sessionStorage.setItem(SESSION_KEY, "1");
    } catch {
      // sessionStorage unavailable (private browsing etc.), not worth failing over
    }
  };

  const dismiss = () => {
    setVisible(false);
    markSeen();
  };

  const open = () => {
    setExpanded(true);
    markSeen();
  };

  if (!visible && !expanded) return null;

  return (
    <>
      {visible && !expanded && (
        <div className="fixed bottom-3 right-3 z-40 animate-widget-in sm:bottom-6 sm:right-6">
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

            <button
              type="button"
              onClick={open}
              className="flex w-full items-center gap-2 text-left sm:gap-3"
            >
              <span className="relative h-11 w-11 shrink-0 overflow-hidden rounded-[7px] border-2 border-ink-900 sm:h-14 sm:w-14 sm:rounded-[8px]">
                <Image
                  src="/images/praise-150-poster.jpg"
                  alt=""
                  fill
                  sizes="56px"
                  className="object-cover"
                />
              </span>
              <span className="min-w-0">
                <span className="sticker mb-1 inline-flex items-center rounded-full bg-orange-500 px-2 py-0.5 text-[9px] font-extrabold uppercase tracking-wide text-ink-900 sm:text-[10px]">
                  Upcoming
                </span>
                <span className="block text-xs font-bold leading-snug text-ink-900">
                  Next week: Woodford&rsquo;s Praise 150 event
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
            className="relative max-h-[90vh] w-full max-w-sm overflow-auto rounded-[16px] border-2 border-ink-900 bg-white p-2 shadow-[6px_6px_0_var(--ink-900)] sm:max-w-md"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setExpanded(false)}
              aria-label="Close"
              className="absolute -right-3 -top-3 flex h-9 w-9 items-center justify-center rounded-full border-2 border-ink-900 bg-white text-ink-900 transition-transform hover:scale-110"
            >
              <X size={18} strokeWidth={3} aria-hidden="true" />
            </button>
            <Image
              src="/images/praise-150-poster.jpg"
              alt="Praise 150 Anniversary Concert poster. Woodford Methodist Church, Saturday 19 September 2026, 7 to 9pm. Derby Road, E18 2PU. Free entry, donations welcome for local charities. Hashtag Open Door 150."
              width={1054}
              height={1492}
              sizes="(min-width: 640px) 448px, 90vw"
              className="h-auto w-full rounded-[10px]"
              priority
            />
          </div>
        </div>
      )}
    </>
  );
}
