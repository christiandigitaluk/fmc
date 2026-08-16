"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { KNOWN_PLACE_NAMES } from "@/lib/geo";

export function FindAChurchBar({ areas }: { areas: string[] }) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const suggestions = useMemo(() => Array.from(new Set([...areas, ...KNOWN_PLACE_NAMES])).sort(), [areas]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams();
    if (query.trim()) params.set("q", query.trim());
    router.push(`/churches${params.toString() ? `?${params.toString()}` : ""}`);
  }

  return (
    <section aria-label="Find a church near you" className="relative -mt-10 z-10">
      <div className="container-max">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-3 rounded-[10px] border border-line-200 bg-white p-4 shadow-[var(--shadow-lift)] sm:flex-row sm:items-end"
        >
          <div className="flex-1">
            <label htmlFor="find-church-q" className="mb-1.5 block text-sm font-semibold text-[var(--text-heading)]">
              Search by town, area or postcode
            </label>
            <input
              id="find-church-q"
              type="search"
              list="church-areas"
              autoComplete="off"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="e.g. Leytonstone, Loughton, E17"
              className="w-full rounded-[4px] border border-line-200 px-4 py-2.5 text-body focus:outline-none focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-2"
              style={{ outlineColor: "var(--focus-ring)" }}
            />
            <datalist id="church-areas">
              {suggestions.map((s) => (
                <option key={s} value={s} />
              ))}
            </datalist>
          </div>
          <Button type="submit" variant="primary" size="md" className="sm:w-auto">
            <Search size={18} aria-hidden="true" />
            Find a church
          </Button>
        </form>
      </div>
    </section>
  );
}
