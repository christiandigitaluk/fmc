"use client";

import { useMemo, useState } from "react";
import { Printer } from "lucide-react";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";
import type { Church, PreachingPlanEntry } from "@/lib/types";

export function PreachingPlanExplorer({ entries, churches }: { entries: PreachingPlanEntry[]; churches: Church[] }) {
  const [query, setQuery] = useState("");
  const [churchSlug, setChurchSlug] = useState("All churches");

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
        {filtered.length} {filtered.length === 1 ? "entry" : "entries"}
      </p>

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
            {filtered.map((entry) => {
              const church = churchBySlug.get(entry.churchSlug);
              return (
                <tr key={entry.id} className="border-b border-line-200 last:border-0 even:bg-cream-50">
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
        {filtered.length === 0 && (
          <p className="p-8 text-center text-[var(--text-body)]">No entries match your search.</p>
        )}
      </div>
    </div>
  );
}
