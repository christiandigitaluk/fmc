"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { LayoutGrid, List as ListIcon, LocateFixed, Loader2, X } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Select } from "@/components/ui/Select";
import {
  geocodePostcode,
  geocodePlaceName,
  geocodePlaceRemote,
  looksLikePostcode,
  milesBetween,
  KNOWN_PLACE_NAMES,
  type LatLng,
} from "@/lib/geo";
import type { Church } from "@/lib/types";

type Origin = { location: LatLng; label: string; source: "postcode" | "place" | "geolocation" };

export function ChurchDirectory({ churches }: { churches: Church[] }) {
  /**
   * Read client-side rather than passed down from the server. The page
   * previously read searchParams in its Server Component just to pass this
   * one value down, which forces the whole route to render fresh on every
   * request — no static caching at all. Same fix as HallHireForm.
   *
   * No re-sync effect needed here unlike that case: FindAChurchBar only
   * lives on the home page, so arriving at /churches?q=... is always a
   * fresh navigation onto this component, not an in-place URL change while
   * it's already mounted.
   */
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(() => searchParams.get("q") ?? "");
  const [area, setArea] = useState("All areas");
  const [view, setView] = useState<"grid" | "list">("grid");
  const [origin, setOrigin] = useState<Origin | null>(null);
  const [geoStatus, setGeoStatus] = useState<"idle" | "loading" | "error" | "denied" | "notfound">("idle");
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const areas = useMemo(() => ["All areas", ...Array.from(new Set(churches.map((c) => c.area))).sort()], [churches]);
  const searchSuggestions = useMemo(
    () => Array.from(new Set([...churches.map((c) => c.area), ...KNOWN_PLACE_NAMES])).sort(),
    [churches]
  );

  useEffect(() => {
    const trimmed = query.trim();

    // A known town/area name (e.g. "Woodford", "Barkingside") resolves
    // instantly from the local gazetteer — no network round-trip needed.
    const place = geocodePlaceName(trimmed);
    if (place) {
      if (debounceRef.current) clearTimeout(debounceRef.current);
      setOrigin({ ...place, source: "place" });
      setGeoStatus("idle");
      return;
    }

    const isPostcode = looksLikePostcode(trimmed);

    // A church's own name, area or address is a plain text search. Postcodes
    // are checked first, so "E17" still sorts every church by distance from
    // E17 rather than narrowing to the two that happen to sit in it.
    const matchesAChurch =
      !isPostcode &&
      trimmed.length > 0 &&
      churches.some((c) =>
        [c.name, c.area, c.address].some((field) => field.toLowerCase().includes(trimmed.toLowerCase()))
      );

    if (trimmed.length < 3 || matchesAChurch) {
      setOrigin((prev) => (prev?.source === "postcode" || prev?.source === "place" ? null : prev));
      if (geoStatus !== "loading" || debounceRef.current === null) setGeoStatus("idle");
      return;
    }

    setGeoStatus("loading");
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(async () => {
      // A postcode is looked up as one; anything else is treated as the name
      // of a town or area near the circuit, which is what "Buckhurst Hill"
      // used to fall through and fail on.
      const result = isPostcode ? await geocodePostcode(trimmed) : await geocodePlaceRemote(trimmed);
      if (result) {
        setOrigin({ ...result, source: isPostcode ? "postcode" : "place" });
        setGeoStatus("idle");
      } else {
        setOrigin((prev) => (prev?.source === "postcode" || prev?.source === "place" ? null : prev));
        setGeoStatus("notfound");
      }
    }, 500);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  function handleUseLocation() {
    if (!("geolocation" in navigator)) {
      setGeoStatus("error");
      return;
    }
    setGeoStatus("loading");
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setOrigin({
          location: { lat: position.coords.latitude, lng: position.coords.longitude },
          label: "your location",
          source: "geolocation",
        });
        setQuery("");
        setGeoStatus("idle");
      },
      (err) => {
        setGeoStatus(err.code === err.PERMISSION_DENIED ? "denied" : "error");
      },
      { timeout: 10000 }
    );
  }

  function clearOrigin() {
    setOrigin(null);
    setQuery("");
    setGeoStatus("idle");
  }

  const milesBySlug = useMemo(() => {
    if (!origin) return null;
    const map = new Map<string, number>();
    churches.forEach((c) => map.set(c.slug, milesBetween(origin.location, { lat: c.lat, lng: c.lng })));
    return map;
  }, [churches, origin]);

  const usingDistance = Boolean(origin && milesBySlug);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const base = churches.filter((church) => {
      const matchesQuery =
        usingDistance ||
        !q ||
        church.name.toLowerCase().includes(q) ||
        church.area.toLowerCase().includes(q) ||
        church.postcode.toLowerCase().includes(q) ||
        church.address.toLowerCase().includes(q);
      const matchesArea = area === "All areas" || church.area === area;
      return matchesQuery && matchesArea;
    });

    if (usingDistance && milesBySlug) {
      return [...base].sort((a, b) => (milesBySlug.get(a.slug) ?? Infinity) - (milesBySlug.get(b.slug) ?? Infinity));
    }
    return [...base].sort((a, b) => a.name.localeCompare(b.name));
  }, [churches, query, area, usingDistance, milesBySlug]);

  function formatMiles(slug: string) {
    const miles = milesBySlug?.get(slug);
    if (miles === undefined) return null;
    return miles < 0.1 ? "Less than 0.1 mi away" : `${miles.toFixed(1)} mi away`;
  }

  return (
    <div>
      <div className="mb-8 grid gap-6 rounded-[10px] border border-line-200 bg-white p-6 shadow-[var(--shadow-card)] lg:grid-cols-[1fr_auto]">
        <div>
          <label htmlFor="church-search" className="mb-1.5 block text-sm font-semibold text-[var(--text-heading)]">
            Search churches
          </label>
          <div className="flex gap-2">
            <input
              id="church-search"
              type="search"
              list="church-directory-suggestions"
              autoComplete="off"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Name, area or postcode"
              className="w-full rounded-[4px] border border-line-200 px-4 py-2.5 text-body focus:outline-none focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-2 lg:w-72"
              style={{ outlineColor: "var(--focus-ring)" }}
            />
            <datalist id="church-directory-suggestions">
              {searchSuggestions.map((s) => (
                <option key={s} value={s} />
              ))}
            </datalist>
            <button
              type="button"
              onClick={handleUseLocation}
              disabled={geoStatus === "loading"}
              aria-label={geoStatus === "loading" ? "Locating…" : "Use my location"}
              className="flex shrink-0 items-center gap-1.5 rounded-[4px] border border-line-200 px-3 py-2.5 text-sm font-semibold text-forest-600 hover:bg-forest-100 disabled:opacity-60 focus:outline-none focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-2"
              style={{ outlineColor: "var(--focus-ring)" }}
            >
              {geoStatus === "loading" ? (
                <Loader2 size={16} className="animate-spin" aria-hidden="true" />
              ) : (
                <LocateFixed size={16} aria-hidden="true" />
              )}
              <span className="hidden sm:inline">{geoStatus === "loading" ? "Locating…" : "Use my location"}</span>
            </button>
          </div>
          <div aria-live="polite">
            {geoStatus === "loading" && (
              <p className="mt-1.5 text-sm text-[var(--text-muted)] sm:hidden">Locating…</p>
            )}
            {geoStatus === "error" && (
              <p className="mt-1.5 text-sm text-[var(--error)]">
                We couldn&apos;t find that postcode or location. Try again, or search by area name.
              </p>
            )}
            {geoStatus === "notfound" && (
              <p className="mt-1.5 text-sm text-[var(--text-muted)]">
                We couldn&apos;t find anywhere by that name in or around the circuit. The ten churches are
                spread across Waltham Forest, Wanstead and Loughton.
              </p>
            )}
            {geoStatus === "denied" && (
              <p className="mt-1.5 text-sm text-[var(--error)]">
                Location access was denied or blocked. You can still search by area or postcode above, or check
                your browser and device location settings for this site and try again.
              </p>
            )}
          </div>
        </div>
        <Select label="Area" options={areas} value={area} onChange={(e) => setArea(e.target.value)} />
      </div>

      {origin && (
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3 rounded-[10px] border-2 border-forest-600 bg-forest-100 px-5 py-3">
          <p className="text-sm font-semibold text-[var(--text-heading)]">
            Showing churches nearest to {origin.label === "your location" ? "your location" : origin.label}
          </p>
          <button
            type="button"
            onClick={clearOrigin}
            className="flex items-center gap-1 text-sm font-semibold text-forest-700 hover:underline focus:outline-none focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-2"
            style={{ outlineColor: "var(--focus-ring)" }}
          >
            <X size={14} aria-hidden="true" />
            Clear
          </button>
        </div>
      )}

      <p role="status" className="sr-only">
        {filtered.length} {filtered.length === 1 ? "church" : "churches"} found
      </p>

      <div className="mb-6 flex items-center justify-end">
        <div className="flex items-center gap-1 rounded-full border border-line-200 p-1" role="group" aria-label="Layout">
          <button
            type="button"
            aria-pressed={view === "grid"}
            onClick={() => setView("grid")}
            className="rounded-full p-2 focus:outline-none focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-2"
            style={{
              outlineColor: "var(--focus-ring)",
              background: view === "grid" ? "var(--forest-100)" : "transparent",
            }}
            aria-label="Grid view"
          >
            <LayoutGrid size={18} aria-hidden="true" />
          </button>
          <button
            type="button"
            aria-pressed={view === "list"}
            onClick={() => setView("list")}
            className="rounded-full p-2 focus:outline-none focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-2"
            style={{
              outlineColor: "var(--focus-ring)",
              background: view === "list" ? "var(--forest-100)" : "transparent",
            }}
            aria-label="List view"
          >
            <ListIcon size={18} aria-hidden="true" />
          </button>
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="rounded-[10px] border border-line-200 bg-white p-8 text-center text-[var(--text-body)]">
          No churches match your search. Try clearing a filter.
        </p>
      ) : view === "grid" ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((church, i) => (
            <Card
              key={church.slug}
              href={`/churches/${church.slug}`}
              image={church.image}
              eyebrow={usingDistance && i === 0 ? `${church.area} · Nearest` : church.area}
              title={church.name}
              footer={
                <>
                  {formatMiles(church.slug) && (
                    <span className="mr-1 text-forest-600">{formatMiles(church.slug)} ·</span>
                  )}
                  Plan your visit →
                </>
              }
            >
              {church.description}
            </Card>
          ))}
        </div>
      ) : (
        <ul className="flex flex-col gap-4">
          {filtered.map((church, i) => (
            <li key={church.slug}>
              <a
                href={`/churches/${church.slug}`}
                className="flex flex-col gap-1 rounded-[10px] border border-line-200 bg-white p-5 no-underline shadow-[var(--shadow-card)] transition-shadow hover:shadow-[var(--shadow-lift)] sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <p className="eyebrow mb-1">{usingDistance && i === 0 ? `${church.area} · Nearest` : church.area}</p>
                  <h3 style={{ fontSize: "var(--text-h3)" }} className="text-[var(--text-heading)]">
                    {church.name}
                  </h3>
                  <p className="text-sm text-[var(--text-body)]">
                    {church.address}, {church.postcode}
                  </p>
                  {formatMiles(church.slug) && (
                    <p className="text-sm font-semibold text-forest-600">{formatMiles(church.slug)}</p>
                  )}
                </div>
                <span className="mt-3 text-sm font-semibold text-forest-600 sm:mt-0">Plan your visit →</span>
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
