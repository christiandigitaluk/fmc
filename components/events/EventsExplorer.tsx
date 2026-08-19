"use client";

import { useMemo, useState } from "react";
import { cn } from "@/lib/cn";
import { EventCard } from "@/components/events/EventCard";
import { CATEGORY_PILL_CLASSES, ALL_PILL_CLASSES } from "@/lib/eventCategoryStyles";
import type { CircuitEvent, Church, EventCategory } from "@/lib/types";
import { EVENT_CATEGORIES } from "@/lib/types";

const CATEGORIES: (EventCategory | "All")[] = ["All", ...EVENT_CATEGORIES];

export function EventsExplorer({ events, churches }: { events: CircuitEvent[]; churches: Church[] }) {
  const [category, setCategory] = useState<string>("All");
  const churchBySlug = useMemo(() => new Map(churches.map((c) => [c.slug, c])), [churches]);

  const filtered = useMemo(
    () => (category === "All" ? events : events.filter((e) => e.category === category)),
    [events, category]
  );

  return (
    <div>
      <div className="mb-8 flex flex-wrap gap-2.5" role="tablist" aria-label="Filter events by category">
        {CATEGORIES.map((item) => {
          const selected = item === category;
          const classes = item === "All" ? ALL_PILL_CLASSES : CATEGORY_PILL_CLASSES[item];
          return (
            <button
              key={item}
              type="button"
              role="tab"
              aria-selected={selected}
              onClick={() => setCategory(item)}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-bold transition-[background-color,transform,box-shadow] duration-150 ease-[cubic-bezier(.22,.61,.36,1)] focus:outline-none focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-2",
                selected ? classes.active : classes.inactive
              )}
              style={{ outlineColor: "var(--focus-ring)" }}
            >
              {item}
            </button>
          );
        })}
      </div>

      {filtered.length === 0 ? (
        <p className="rounded-[10px] border border-line-200 bg-white p-8 text-center text-[var(--text-body)]">
          No events in this category right now. Check back soon.
        </p>
      ) : (
        <ul className="flex flex-col gap-5">
          {filtered.map((event) => (
            <EventCard key={event.slug} event={event} church={churchBySlug.get(event.churchSlug)} />
          ))}
        </ul>
      )}
    </div>
  );
}
