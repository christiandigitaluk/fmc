"use client";

import { CalendarPlus } from "lucide-react";
import { buildIcs } from "@/lib/ics";
import type { CircuitEvent } from "@/lib/types";

export function IcsExportButton({ event, location }: { event: CircuitEvent; location: string }) {
  function handleDownload() {
    const ics = buildIcs(event, location);
    const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${event.slug}.ics`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  return (
    <button
      type="button"
      onClick={handleDownload}
      className="inline-flex items-center gap-2 rounded-full border border-forest-700 px-4 py-2 text-sm font-semibold text-forest-700 hover:bg-forest-100 focus:outline-none focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-2"
      style={{ outlineColor: "var(--focus-ring)" }}
    >
      <CalendarPlus size={16} aria-hidden="true" />
      Add to calendar
    </button>
  );
}
