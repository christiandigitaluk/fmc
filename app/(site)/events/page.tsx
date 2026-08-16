import type { Metadata } from "next";
import { EventsExplorer } from "@/components/events/EventsExplorer";
import { getEvents, getChurches } from "@/lib/content";

export const metadata: Metadata = {
  title: "Events",
  description: "Worship services, youth activities and community gatherings across Forest Circuit.",
  alternates: { canonical: "/events" },
};

// Recurring events (e.g. "3rd Sunday") are resolved to their next upcoming
// occurrence relative to the current date — revalidate regularly so that
// rollover happens automatically in production, not just at the next deploy.
export const revalidate = 3600;

export default async function EventsPage() {
  const [events, churches] = await Promise.all([getEvents(), getChurches()]);

  return (
    <div className="container-max py-14 md:py-20">
      <p className="eyebrow mb-3">What&apos;s on</p>
      <h1 style={{ fontSize: "var(--text-h1)" }} className="mb-4 max-w-2xl">
        Events &amp; community groups
      </h1>
      <p className="mb-10 max-w-2xl text-lg text-[var(--text-body)]" style={{ fontSize: "var(--text-lead)" }}>
        From Sunday worship to youth socials and community coffee mornings, there is always something happening
        across the circuit. Add any event straight to your calendar.
      </p>
      <EventsExplorer events={events} churches={churches} />
    </div>
  );
}
