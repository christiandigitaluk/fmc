import type { CircuitEvent } from "@/lib/types";

function pad(n: number): string {
  return String(n).padStart(2, "0");
}

function toLocalIso(d: Date): string {
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
}

function nthWeekdayOfMonth(year: number, month: number, weekday: number, nth: number): Date {
  const firstOfMonth = new Date(year, month, 1);
  const offset = (7 + weekday - firstOfMonth.getDay()) % 7;
  return new Date(year, month, 1 + offset + (nth - 1) * 7);
}

/**
 * For a recurring event, replaces its startDateTime/endDateTime with the
 * next upcoming occurrence (relative to `now`), preserving the original
 * time-of-day and duration. Non-recurring events pass through unchanged.
 */
export function resolveEventOccurrence(event: CircuitEvent, now: Date = new Date()): CircuitEvent {
  if (!event.recurrence) return event;

  const { nthWeekday, weekday } = event.recurrence;
  const start = new Date(event.startDateTime);
  const end = new Date(event.endDateTime);
  const durationMs = end.getTime() - start.getTime();
  const hours = start.getHours();
  const minutes = start.getMinutes();

  function occurrenceInMonth(year: number, month: number): Date {
    const d = nthWeekdayOfMonth(year, month, weekday, nthWeekday);
    d.setHours(hours, minutes, 0, 0);
    return d;
  }

  let occurrence = occurrenceInMonth(now.getFullYear(), now.getMonth());
  if (occurrence.getTime() + durationMs < now.getTime()) {
    // This month's occurrence has already finished — roll forward to next month
    // (Date normalises month 12 into January of the following year automatically).
    occurrence = occurrenceInMonth(now.getFullYear(), now.getMonth() + 1);
  }

  return {
    ...event,
    startDateTime: toLocalIso(occurrence),
    endDateTime: toLocalIso(new Date(occurrence.getTime() + durationMs)),
  };
}

export function resolveEventOccurrences(events: CircuitEvent[], now: Date = new Date()): CircuitEvent[] {
  return events.map((event) => resolveEventOccurrence(event, now));
}
