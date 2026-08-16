import type { CircuitEvent } from "@/lib/types";

function toIcsDate(dateTime: string): string {
  return dateTime.replace(/[-:]/g, "").replace(/\.\d+/, "") + (dateTime.includes("T") ? "00" : "");
}

export function buildIcs(event: CircuitEvent, churchName: string): string {
  const start = toIcsDate(event.startDateTime);
  const end = toIcsDate(event.endDateTime);
  const now = toIcsDate(new Date().toISOString().slice(0, 19));

  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Forest Circuit//Events//EN",
    "BEGIN:VEVENT",
    `UID:${event.slug}@forestcircuit.co.uk`,
    `DTSTAMP:${now}Z`,
    `DTSTART:${start}`,
    `DTEND:${end}`,
    `SUMMARY:${event.title}`,
    `LOCATION:${event.location ?? churchName}`,
    `DESCRIPTION:${event.description.replace(/\n/g, "\\n")}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
}
