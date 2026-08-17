export type LatLng = { lat: number; lng: number };

const FULL_POSTCODE_REGEX = /^[A-Z]{1,2}\d[A-Z\d]?\s*\d[A-Z]{2}$/i;
const OUTCODE_REGEX = /^[A-Z]{1,2}\d[A-Z\d]?$/i;

export function looksLikePostcode(input: string): boolean {
  const value = input.trim();
  return FULL_POSTCODE_REGEX.test(value) || OUTCODE_REGEX.test(value);
}

export function milesBetween(a: LatLng, b: LatLng): number {
  const R = 3958.8;
  const toRad = (deg: number) => (deg * Math.PI) / 180;
  const dLat = toRad(b.lat - a.lat);
  const dLng = toRad(b.lng - a.lng);
  const h =
    Math.sin(dLat / 2) ** 2 + Math.cos(toRad(a.lat)) * Math.cos(toRad(b.lat)) * Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.asin(Math.sqrt(h));
}

export type GeocodeResult = { location: LatLng; label: string };

/**
 * Local place names around the circuit, for resolving a plain town/area
 * search (not just postcodes) to a location so "nearest church" sorting
 * works for both. Keyed by lowercase name; values are the properly-cased
 * display label plus an approximate central lat/lng for the area.
 */
const KNOWN_PLACES: Record<string, GeocodeResult> = {
  leytonstone: { label: "Leytonstone", location: { lat: 51.5673, lng: 0.0089 } },
  leyton: { label: "Leyton", location: { lat: 51.5637, lng: -0.0064 } },
  walthamstow: { label: "Walthamstow", location: { lat: 51.5886, lng: -0.0177 } },
  loughton: { label: "Loughton", location: { lat: 51.6423, lng: 0.0546 } },
  chingford: { label: "Chingford", location: { lat: 51.6294, lng: -0.0092 } },
  "highams park": { label: "Highams Park", location: { lat: 51.6114, lng: -0.0028 } },
  "south woodford": { label: "South Woodford", location: { lat: 51.5921, lng: 0.0286 } },
  woodford: { label: "Woodford", location: { lat: 51.607, lng: 0.0335 } },
  "woodford green": { label: "Woodford Green", location: { lat: 51.6079, lng: 0.0257 } },
  wanstead: { label: "Wanstead", location: { lat: 51.5765, lng: 0.0287 } },
  barkingside: { label: "Barkingside", location: { lat: 51.5866, lng: 0.0838 } },
  epping: { label: "Epping", location: { lat: 51.6999, lng: 0.1092 } },
  debden: { label: "Debden", location: { lat: 51.6453, lng: 0.0713 } },
  snaresbrook: { label: "Snaresbrook", location: { lat: 51.581, lng: 0.018 } },
};

/** Display-cased place names, for search suggestions (datalist options etc.) */
export const KNOWN_PLACE_NAMES: string[] = Object.values(KNOWN_PLACES).map((p) => p.label);

/** Looks up a plain town/area name (not a postcode) against the local gazetteer. */
export function geocodePlaceName(input: string): GeocodeResult | null {
  return KNOWN_PLACES[input.trim().toLowerCase()] ?? null;
}

/** Rough centre of the ten churches, used to judge what counts as local. */
const CIRCUIT_CENTRE: LatLng = { lat: 51.594, lng: 0.014 };

/**
 * How far out still counts as "around the circuit". Wide enough for the towns
 * people actually travel in from — Epping, Romford, Stratford, Brentwood — and
 * tight enough to rule out Chelmsford, Southend and the rest of the country.
 */
const LOCAL_RADIUS_MILES = 20;

/**
 * Resolves a nearby town or area via postcodes.io, covering the many local
 * places missing from the short list above: Buckhurst Hill and Chigwell sit
 * inside the circuit's own boundary yet returned nothing at all.
 *
 * Two things need care. Place names repeat across the country and the API
 * answers in its own order rather than by relevance — "Ilford" comes back as
 * Ilford in Somerset, 134 miles off, and "Woodford" as Woodford in Somerset
 * ahead of the one a mile up the road — so every candidate is considered and
 * the closest to the circuit wins. And anywhere genuinely distant is refused
 * rather than answered, because sorting ten East London churches by their
 * distance from Manchester is a worse answer than admitting there isn't one.
 */
export async function geocodePlaceRemote(input: string): Promise<GeocodeResult | null> {
  const value = input.trim();
  if (value.length < 3) return null;

  try {
    const res = await fetch(`https://api.postcodes.io/places?q=${encodeURIComponent(value)}&limit=10`);
    if (!res.ok) return null;
    const data = await res.json();
    const candidates: Array<{ name_1: string; latitude: number; longitude: number }> = data?.result ?? [];
    if (candidates.length === 0) return null;

    let best: GeocodeResult | null = null;
    let bestMiles = Infinity;
    for (const c of candidates) {
      const location = { lat: c.latitude, lng: c.longitude };
      const miles = milesBetween(CIRCUIT_CENTRE, location);
      if (miles < bestMiles) {
        bestMiles = miles;
        best = { location, label: c.name_1 };
      }
    }

    return bestMiles <= LOCAL_RADIUS_MILES ? best : null;
  } catch {
    return null;
  }
}

/** Geocodes a full or partial UK postcode via the free postcodes.io API. Returns null if not found. */
export async function geocodePostcode(input: string): Promise<GeocodeResult | null> {
  const value = input.trim();
  const isOutcode = OUTCODE_REGEX.test(value) && !FULL_POSTCODE_REGEX.test(value);
  const endpoint = isOutcode
    ? `https://api.postcodes.io/outcodes/${encodeURIComponent(value)}`
    : `https://api.postcodes.io/postcodes/${encodeURIComponent(value.replace(/\s+/g, ""))}`;

  try {
    const res = await fetch(endpoint);
    if (!res.ok) return null;
    const data = await res.json();
    if (data.status !== 200 || !data.result) return null;
    return {
      location: { lat: data.result.latitude, lng: data.result.longitude },
      label: isOutcode ? data.result.outcode : data.result.postcode,
    };
  } catch {
    return null;
  }
}
