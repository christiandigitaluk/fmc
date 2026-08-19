import type { CircuitEvent } from "@/lib/types";

function toIcsDate(dateTime: string): string {
  return dateTime.replace(/[-:]/g, "").replace(/\.\d+/, "") + (dateTime.includes("T") ? "00" : "");
}

export function buildIcs(event: CircuitEvent, location: string): string {
  const start = toIcsDate(event.startDateTime);
  const end = toIcsDate(event.endDateTime);
  const now = toIcsDate(new Date().toISOString().slice(0, 19));

  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Forest Circuit//Events//EN",
    "BEGIN:VEVENT",
    // Not an address — a calendar UID, which is conventionally domain-qualified
    // and must stay stable: change it and calendars treat a re-download as a
    // new event rather than an update, duplicating whatever people have saved.
    `UID:${event.slug}@forestcircuit.co.uk`,
    `DTSTAMP:${now}Z`,
    `DTSTART:${start}`,
    `DTEND:${end}`,
    `SUMMARY:${event.title}`,
    `LOCATION:${location}`,
    `DESCRIPTION:${event.description.replace(/\n/g, "\\n")}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
}
