import Image from "next/image";
import Link from "next/link";
import { CalendarDays, MapPin, Navigation, Ticket } from "lucide-react";
import { IcsExportButton } from "@/components/events/IcsExportButton";
import { eventLocation } from "@/lib/eventLocation";
import type { Church, CircuitEvent } from "@/lib/types";

/**
 * A big homepage spotlight for one major event, sitting straight under the
 * hero. For the handful of events a year that deserve more than a card on
 * the events page and the corner pop-up.
 *
 * It needs no taking down: the homepage passes in the event looked up from
 * getEvents, which drops events once they have ended, so when the event is
 * over there is nothing to pass and this renders nothing.
 *
 * The day label ("This Saturday", "Tomorrow", "Today") is worked out on the
 * server in London time. The homepage is regenerated every few minutes as
 * its content revalidates, so the label moves on by itself.
 */
function londonDate(d: Date): string {
  return d.toLocaleDateString("en-CA", { timeZone: "Europe/London" });
}

function dayLabel(startDateTime: string): string {
  const day = startDateTime.slice(0, 10);
  const today = londonDate(new Date());
  const days = Math.round((Date.parse(day) - Date.parse(today)) / 86_400_000);
  if (days <= 0) return "Today";
  if (days === 1) return "Tomorrow";
  const weekday = new Date(`${day}T12:00:00`).toLocaleDateString("en-GB", { weekday: "long" });
  return days < 7 ? `This ${weekday}` : new Date(`${day}T12:00:00`).toLocaleDateString("en-GB", { day: "numeric", month: "long" });
}

function timeRange(event: CircuitEvent): string {
  const fmt = (iso: string) => {
    const [h, m] = iso.slice(11, 16).split(":").map(Number);
    const suffix = h >= 12 ? "pm" : "am";
    const hour = h % 12 || 12;
    return m ? `${hour}.${String(m).padStart(2, "0")}${suffix}` : `${hour}${suffix}`;
  };
  return `${fmt(event.startDateTime)} to ${fmt(event.endDateTime)}`;
}

export function FeaturedEvent({
  event,
  church,
  lead,
  highlights,
  admission,
}: {
  event: CircuitEvent;
  church?: Church;
  /** One warm sentence; the event's own description repeats the chips below. */
  lead?: string;
  /** Short draws from the poster, shown as chips. */
  highlights: string[];
  admission?: string;
}) {
  const location = eventLocation(event, church);
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location)}`;
  const date = new Date(`${event.startDateTime.slice(0, 10)}T12:00:00`).toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  return (
    <section aria-labelledby="featured-event-heading" className="container-max pb-4 pt-10 md:pt-14">
      <div className="sticker relative overflow-hidden rounded-[20px] bg-white">
        {/* Orange warmth in the corner, the same outline accent as the hero. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full border-2 border-orange-500/30"
        />
        <div className="relative grid gap-8 p-6 sm:p-8 md:grid-cols-[1.35fr_1fr] md:items-center md:gap-10 lg:p-12">
          <div>
            <span className="sticker mb-5 inline-flex -rotate-2 items-center rounded-full bg-orange-500 px-4 py-1.5 text-sm font-extrabold uppercase tracking-wide text-ink-900">
              {dayLabel(event.startDateTime)} · Don&apos;t miss it
            </span>
            <h2 id="featured-event-heading" className="mb-3 font-bold text-ink-900" style={{ fontSize: "var(--text-h1)", lineHeight: 1.05 }}>
              {event.title} at {church?.name.replace(/ Methodist Church$/, "") ?? "the circuit"}
            </h2>
            <p className="mb-6 max-w-xl text-[var(--text-body)]" style={{ fontSize: "var(--text-lead)" }}>
              {lead ?? event.description}
            </p>

            <ul className="mb-6 flex flex-wrap gap-2">
              {highlights.map((item) => (
                <li
                  key={item}
                  className="rounded-full border-2 border-ink-900 bg-forest-100 px-3 py-1 text-sm font-bold text-ink-900"
                >
                  {item}
                </li>
              ))}
            </ul>

            <div className="mb-7 grid gap-2 text-[var(--text-heading)] sm:grid-cols-2">
              <p className="flex items-center gap-2 font-semibold">
                <CalendarDays size={18} className="shrink-0 text-forest-700" aria-hidden="true" />
                {date}, {timeRange(event)}
              </p>
              {admission && (
                <p className="flex items-center gap-2 font-semibold">
                  <Ticket size={18} className="shrink-0 text-forest-700" aria-hidden="true" />
                  {admission}
                </p>
              )}
              <p className="flex items-start gap-2 font-semibold sm:col-span-2">
                <MapPin size={18} className="mt-0.5 shrink-0 text-forest-700" aria-hidden="true" />
                {location}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <a
                href={mapsUrl}
                target="_blank"
                rel="noreferrer"
                className="sticker inline-flex items-center gap-2 rounded-full bg-forest-700 px-5 py-2.5 font-bold text-white hover:bg-forest-600"
              >
                <Navigation size={16} aria-hidden="true" />
                Get directions
              </a>
              <IcsExportButton event={event} location={location} />
            </div>
          </div>

          {event.image && (
            <Link
              href={`/events#${event.slug}`}
              aria-label={`${event.title} on the events page`}
              className="mx-auto block w-full max-w-[300px] rotate-2 transition-transform hover:rotate-0 md:max-w-[340px]"
            >
              <Image
                src={event.image}
                alt={`Poster for ${event.title}`}
                width={event.imageWidth ?? 1000}
                height={event.imageHeight ?? 1414}
                sizes="(min-width: 768px) 340px, 300px"
                className="h-auto w-full rounded-[10px] border-2 border-ink-900 shadow-[6px_6px_0_var(--ink-900)]"
              />
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
