"use client";

import { useMemo, useState } from "react";
import { Printer } from "lucide-react";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";
import type { Church, PreachingPlanEntry } from "@/lib/types";

/**
 * `today` (YYYY-MM-DD, London time) comes from the server rather than the
 * browser's clock, so the server-rendered table and the hydrated one always
 * agree on which Sundays have passed.
 */
export function PreachingPlanExplorer({
  entries,
  churches,
  today,
}: {
  entries: PreachingPlanEntry[];
  churches: Church[];
  today: string;
}) {
  const [query, setQuery] = useState("");
  const [churchSlug, setChurchSlug] = useState("All churches");
  // Past Sundays are folded away by default: visitors almost always want
  // this week or later, and late in a quarter the old ones filled the top
  // of the table. Still one click away for "who preached last week?".
  const [showPast, setShowPast] = useState(false);

  const churchBySlug = useMemo(() => new Map(churches.map((c) => [c.slug, c])), [churches]);
  const churchOptions = useMemo(
    () => ["All churches", ...churches.map((c) => c.name)],
    [churches]
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return entries.filter((entry) => {
      const church = churchBySlug.get(entry.churchSlug);
      const matchesChurch = churchSlug === "All churches" || church?.name === churchSlug;
      const formattedDate = new Date(entry.date)
        .toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long", year: "numeric" })
        .toLowerCase();
      const matchesQuery =
        !q ||
        entry.preacher.toLowerCase().includes(q) ||
        entry.notes?.toLowerCase().includes(q) ||
        church?.name.toLowerCase().includes(q) ||
        church?.area.toLowerCase().includes(q) ||
        entry.date.includes(q) ||
        formattedDate.includes(q);
      return matchesChurch && matchesQuery;
    });
  }, [entries, query, churchSlug, churchBySlug]);

  const pastCount = filtered.filter((entry) => entry.date < today).length;
  const visible = showPast ? filtered : filtered.filter((entry) => entry.date >= today);

  return (
    <div>
      <div className="no-print mb-8 flex flex-col gap-4 rounded-[10px] border border-line-200 border-t-4 border-t-orange-500 bg-white p-6 shadow-[var(--shadow-card)] lg:flex-row lg:flex-wrap lg:items-end">
        <div className="min-w-0 flex-1 basis-full lg:basis-56">
          <label htmlFor="plan-search" className="mb-1.5 block text-sm font-semibold text-[var(--text-heading)]">
            Search by preacher, church or date
          </label>
          <input
            id="plan-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="e.g. Rev Mike Long, Loughton, 2026-09-06"
            className="w-full rounded-[4px] border border-line-200 px-4 py-2.5 text-body focus:outline-none focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-2"
            style={{ outlineColor: "var(--focus-ring)" }}
          />
        </div>
        <div className="min-w-0 flex-1 basis-full lg:basis-48 lg:flex-none">
          <Select label="Church" options={churchOptions} value={churchSlug} onChange={(e) => setChurchSlug(e.target.value)} />
        </div>
        <Button
          variant="secondary"
          href="/documents/preaching-plan-sept-nov-2026.pdf"
          target="_blank"
          className="w-full lg:w-auto"
        >
          <Printer size={16} aria-hidden="true" />
          Print plan
        </Button>
      </div>

      <p role="status" className="sr-only">
        {visible.length} {visible.length === 1 ? "entry" : "entries"}
      </p>

      {pastCount > 0 && (
        <div className="no-print mb-4 flex justify-end">
          <button
            type="button"
            onClick={() => setShowPast((v) => !v)}
            aria-pressed={showPast}
            className="text-sm font-semibold text-forest-600 underline-offset-4 hover:underline focus:outline-none focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-2"
            style={{ outlineColor: "var(--focus-ring)" }}
          >
            {showPast ? "Hide earlier Sundays" : `Show earlier Sundays (${pastCount})`}
          </button>
        </div>
      )}

      <div className="overflow-x-auto rounded-[10px] border border-line-200">
        <table className="w-full border-collapse bg-white text-left">
          <caption className="sr-only">Circuit preaching plan</caption>
          <thead>
            <tr className="border-b border-line-200 bg-cream-100">
              <th scope="col" className="px-4 py-3 text-sm font-semibold text-[var(--text-heading)]">
                Date
              </th>
              <th scope="col" className="px-4 py-3 text-sm font-semibold text-[var(--text-heading)]">
                Time
              </th>
              <th scope="col" className="px-4 py-3 text-sm font-semibold text-[var(--text-heading)]">
                Church
              </th>
              <th scope="col" className="px-4 py-3 text-sm font-semibold text-[var(--text-heading)]">
                Preacher
              </th>
              <th scope="col" className="px-4 py-3 text-sm font-semibold text-[var(--text-heading)]">
                Notes
              </th>
            </tr>
          </thead>
          <tbody>
            {visible.map((entry) => {
              const church = churchBySlug.get(entry.churchSlug);
              const past = entry.date < today;
              return (
                <tr
                  key={entry.id}
                  className={`border-b border-line-200 last:border-0 even:bg-cream-50${past ? " opacity-60" : ""}`}
                >
                  <td className="px-4 py-3 text-sm text-[var(--text-body)]">
                    {new Date(entry.date).toLocaleDateString("en-GB", {
                      weekday: "short",
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </td>
                  <td className="px-4 py-3 text-sm text-[var(--text-body)]">{entry.time}</td>
                  <td className="px-4 py-3 text-sm font-semibold text-[var(--text-heading)]">{church?.name}</td>
                  <td className="px-4 py-3 text-sm text-[var(--text-body)]">{entry.preacher}</td>
                  <td className="px-4 py-3 text-sm text-[var(--text-muted)]">{entry.notes ?? "—"}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {visible.length === 0 && (
          <p className="p-8 text-center text-[var(--text-body)]">
            {filtered.length === 0
              ? "No entries match your search."
              : "No more services in this plan. The next quarter's plan will appear here soon."}
          </p>
        )}
      </div>
    </div>
  );
}
