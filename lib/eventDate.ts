import type { CircuitEvent } from "@/lib/types";

/**
 * The date/time text to show on an event card.
 *
 * Most events start and end the same day, so this reads as a single date
 * and start time. A handful (a two-day exhibition, say) run across several
 * calendar days at the same times each day — those get a date range instead,
 * so the listing doesn't imply one continuous 30-hour session.
 */
export function formatEventDate(event: CircuitEvent): string {
  const start = new Date(event.startDateTime);
  const end = new Date(event.endDateTime);
  const sameDay = start.toDateString() === end.toDateString();

  const time = (d: Date) => d.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });

  if (sameDay) {
    const date = start.toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
    return `${date} · ${time(start)}`;
  }

  // Built manually rather than passed to toLocaleDateString together, since
  // Intl only inserts its weekday comma when `year` is part of the same
  // call — asking for it on just one side of the range produces a
  // "Friday 16 October – Saturday, 17 October 2026" mismatch.
  const weekday = (d: Date) => d.toLocaleDateString("en-GB", { weekday: "long" });
  const dayMonth = (d: Date) => d.toLocaleDateString("en-GB", { day: "numeric", month: "long" });
  const year = end.getFullYear();
  return `${weekday(start)} ${dayMonth(start)} – ${weekday(end)} ${dayMonth(end)} ${year} · ${time(start)}–${time(end)} daily`;
}
