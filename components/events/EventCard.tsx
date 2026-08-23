import Link from "next/link";
import { CalendarDays, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { IcsExportButton } from "@/components/events/IcsExportButton";
import { CATEGORY_TONE } from "@/lib/eventCategoryStyles";
import { eventLocation } from "@/lib/eventLocation";
import type { CircuitEvent, Church } from "@/lib/types";

export function EventCard({ event, church }: { event: CircuitEvent; church?: Church }) {
  const start = new Date(event.startDateTime);

  return (
    <li className="flex flex-col gap-3 rounded-[10px] border border-line-200 bg-white p-6 shadow-[var(--shadow-card)] sm:flex-row sm:items-start sm:justify-between">
      <div>
        <Badge tone={CATEGORY_TONE[event.category]} className="mb-3">
          {event.category}
        </Badge>
        {/* h2, not h3: same heading-order gap as QuickActionsGrid — these are
            the first headings after the page h1, with no h2 between them
            (Lighthouse). Visual size is set by the inline font-size, so the
            tag change has no visual effect. */}
        <h2 style={{ fontSize: "var(--text-h3)" }} className="mb-2">
          {event.title}
        </h2>
        <p className="mb-3 text-sm text-[var(--text-body)]">{event.description}</p>
        <div className="flex flex-wrap gap-x-5 gap-y-1 text-sm text-[var(--text-muted)]">
          <span className="flex items-center gap-1.5">
            <CalendarDays size={16} aria-hidden="true" />
            {start.toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
            {" · "}
            {start.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" })}
          </span>
          {church && (
            <span className="flex items-center gap-1.5">
              <MapPin size={16} aria-hidden="true" />
              <Link href={`/churches/${church.slug}`} className="text-forest-600">
                {eventLocation(event, church)}
              </Link>
            </span>
          )}
        </div>
      </div>
      <div className="flex shrink-0 flex-col items-start gap-2 sm:items-end">
        <IcsExportButton event={event} location={eventLocation(event, church)} />
        {event.ticketUrl && (
          <a
            href={event.ticketUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-semibold text-forest-600 underline"
          >
            Get tickets ↗
          </a>
        )}
      </div>
    </li>
  );
}
