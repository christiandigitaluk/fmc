import { draftMode } from "next/headers";
import { stegaClean } from "next-sanity";
import { isSanityConfigured } from "@/sanity/env";
import { client, previewClient, writeClient } from "@/sanity/lib/client";
import { churches as mockChurches } from "@/lib/mock/churches";
import { posts as mockPosts } from "@/lib/mock/posts";
import { notices as mockNotices } from "@/lib/mock/notices";
import { events as mockEvents } from "@/lib/mock/events";
import { preachingPlan as mockPreachingPlan } from "@/lib/mock/preachingPlan";
import { siteSettings as mockSettings } from "@/lib/mock/settings";
import { jobVacancies as mockJobVacancies } from "@/lib/mock/jobVacancies";
import { resolveEventOccurrences } from "@/lib/recurrence";
import type {
  Church,
  Post,
  Notice,
  CircuitEvent,
  PreachingPlanEntry,
  SiteSettings,
  JobVacancy,
  BookingRequest,
  NewsletterSignup,
  ContactMessage,
} from "@/lib/types";

/**
 * Every getter here prefers live Sanity data when NEXT_PUBLIC_SANITY_PROJECT_ID
 * is set, and falls back to local mock data otherwise (or if the query fails) —
 * so every page renders immediately with zero CMS configuration.
 */

async function safeFetch<T>(query: string, fallback: T, tags: string[]): Promise<T> {
  if (!isSanityConfigured) return fallback;
  try {
    // While a staff member has the Presentation tool's live preview open,
    // read unpublished drafts with no caching, stega-encoded so the
    // click-to-edit overlay can trace each bit of text back to its field.
    // Otherwise, read published content through the CDN as normal.
    const { isEnabled: preview } = await draftMode();
    const activeClient = preview ? previewClient : client;
    const result = await activeClient.fetch<T>(
      query,
      {},
      preview ? { cache: "no-store" } : { next: { tags, revalidate: 300 } }
    );
    if (!result || (Array.isArray(result) && result.length === 0)) return fallback;
    return result;
  } catch {
    return fallback;
  }
}

// Stega-encoding embeds invisible metadata into every string a preview
// fetch returns — harmless for displayed text, but it would corrupt a URL
// if left in a slug or image src. Clean just the structural fields; the
// human-readable ones (title, description, etc.) stay encoded so the
// visual editing overlay can still trace and highlight them.
function cleanStructural<T extends Record<string, unknown>>(obj: T, keys: (keyof T)[]): T {
  const copy = { ...obj };
  for (const key of keys) {
    if (typeof copy[key] === "string") copy[key] = stegaClean(copy[key]) as T[keyof T];
  }
  return copy;
}

// Sanity's `image`/`reference` fields don't resolve to plain strings by
// default — without these projections, `church.image` etc. would come back
// as raw asset/reference objects (not the `string` our types promise),
// which would silently break next/image and church-lookup-by-slug the
// moment a real Sanity project is connected. Mock data already provides
// plain strings, so this only changes behaviour against live Sanity.
export async function getChurches(): Promise<Church[]> {
  const churches = await safeFetch(
    `*[_type == "church"] | order(name asc) { ..., "slug": slug.current, "image": image.asset->url }`,
    mockChurches,
    ["church"]
  );
  return churches.map((c) => cleanStructural(c, ["slug", "image"]));
}

export async function getChurch(slug: string): Promise<Church | undefined> {
  const all = await getChurches();
  return all.find((c) => c.slug === slug);
}

export async function getPosts(): Promise<Post[]> {
  const posts = await safeFetch(
    `*[_type == "post"] | order(publishedAt desc) {
      ...,
      "slug": slug.current,
      "coverImage": coverImage.asset->url,
      "body": body[]{ ..., _type == "image" => { ..., "asset": asset-> } }
    }`,
    mockPosts,
    ["post"]
  );
  return posts.map((p) => cleanStructural(p, ["slug", "coverImage"]));
}

/**
 * Noticeboard items, soonest deadline first, with undated ones last.
 *
 * A notice whose deadline has passed is dropped here rather than in the
 * component, so nothing stale can reach any page that uses it. The comparison
 * is on plain YYYY-MM-DD strings, which sorts and compares correctly and
 * avoids timezone drift around midnight. Pages using this revalidate on the
 * usual interval, so an expired notice clears itself without a deploy.
 */
export async function getNotices(): Promise<Notice[]> {
  const notices = await safeFetch(
    `*[_type == "notice"] | order(coalesce(deadline, "9999-12-31") asc, title asc) {
      ...,
      "slug": slug.current
    }`,
    mockNotices,
    ["notice"]
  );
  const today = new Date().toISOString().slice(0, 10);
  return notices
    .map((n) => cleanStructural(n, ["slug", "url"]))
    .filter((n) => !n.deadline || n.deadline >= today);
}

export async function getPost(slug: string): Promise<Post | undefined> {
  const all = await getPosts();
  return all.find((p) => p.slug === slug);
}

export async function getEvents(): Promise<CircuitEvent[]> {
  const events = await safeFetch(
    `*[_type == "event"] | order(startDateTime asc) {
      ...,
      "slug": slug.current,
      "churchSlug": church->slug.current,
      "image": image.asset->url
    }`,
    mockEvents,
    ["event"]
  );
  const cleaned = events.map((e) => cleanStructural(e, ["slug", "churchSlug", "image"]));
  const resolved = resolveEventOccurrences(cleaned);
  return resolved.sort((a, b) => a.startDateTime.localeCompare(b.startDateTime));
}

export async function getEvent(slug: string): Promise<CircuitEvent | undefined> {
  const all = await getEvents();
  return all.find((e) => e.slug === slug);
}

export async function getPreachingPlan(): Promise<PreachingPlanEntry[]> {
  const entries = await safeFetch(
    `*[_type == "preachingPlanEntry"] | order(date asc) { ..., "id": _id, "churchSlug": church->slug.current }`,
    mockPreachingPlan,
    ["preachingPlanEntry"]
  );
  return entries.map((e) => cleanStructural(e, ["id", "churchSlug"]));
}

export async function getJobVacancies(): Promise<JobVacancy[]> {
  return safeFetch(
    `*[_type == "jobVacancy" && active != false] | order(_createdAt desc)`,
    mockJobVacancies,
    ["jobVacancy"]
  );
}

export async function getSiteSettings(): Promise<SiteSettings> {
  return safeFetch(`*[_type == "siteSettings"][0]`, mockSettings, ["siteSettings"]);
}

export async function submitBookingRequest(request: BookingRequest): Promise<{ ok: boolean }> {
  if (!isSanityConfigured) {
    console.info("[hall-hire] mock booking request received", request);
    return { ok: true };
  }
  try {
    await writeClient.create({ _type: "bookingRequest", ...request, status: "new" });
    return { ok: true };
  } catch {
    return { ok: false };
  }
}

export async function submitNewsletterSignup(signup: NewsletterSignup): Promise<{ ok: boolean }> {
  if (!isSanityConfigured) {
    console.info("[newsletter] mock signup received", signup);
    return { ok: true };
  }
  try {
    await writeClient.create({ _type: "newsletterSignup", ...signup });
    return { ok: true };
  } catch {
    return { ok: false };
  }
}

export async function submitContactMessage(contact: ContactMessage): Promise<{ ok: boolean }> {
  if (!isSanityConfigured) {
    console.info("[contact] mock message received", contact);
    return { ok: true };
  }
  try {
    await writeClient.create({ _type: "contactMessage", ...contact, status: "new" });
    return { ok: true };
  } catch {
    return { ok: false };
  }
}
