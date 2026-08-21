import type { Notice } from "@/lib/types";

/**
 * Badge text for a notice: its deadline where it has one, otherwise its label.
 *
 * Shared by the noticeboard cards and the home page strip so the two cannot
 * drift apart on wording or date format.
 */
export function noticeBadge(notice: Notice): string {
  if (!notice.deadline) return notice.label ?? "Opportunity";
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
