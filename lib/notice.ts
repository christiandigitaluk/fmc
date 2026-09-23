import type { Notice } from "@/lib/types";

/**
 * Badge text for a notice: an explicit label if it has one, otherwise its
 * deadline, otherwise "Opportunity".
 *
 * A label overrides the deadline text (e.g. "Book free tickets" rather than
 * "Closes 3 Oct") without affecting expiry, which is driven by the deadline
 * alone in getNotices.
 *
 * Shared by the noticeboard cards and the home page strip so the two cannot
 * drift apart on wording or date format.
 */
export function noticeBadge(notice: Notice): string {
  if (notice.label) return notice.label;
  if (!notice.deadline) return "Opportunity";
  // Parsed and formatted as UTC. Only ever a date, never a time, so there is
  // no hour that could roll into the previous day in another timezone.
  const on = new Date(`${notice.deadline}T00:00:00Z`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    timeZone: "UTC",
  });
  return `Closes ${on}`;
}

/**
 * The opening sentence of a summary, for the home page strip where each
 * notice gets a single line. Falls back to the whole string when there is no
 * sentence break to cut on.
 */
export function firstSentence(text: string): string {
  const match = text.match(/^.*?\.(?=\s|$)/);
  return match ? match[0] : text;
}
