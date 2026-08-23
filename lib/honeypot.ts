/**
 * True when the invisible honeypot field (components/ui/Honeypot.tsx) has a
 * value, meaning a bot filled in a field no real visitor can see or reach.
 *
 * Callers should stop right after this check and return their normal
 * success state rather than an error, so an automated submitter has no
 * signal that it was caught rather than genuinely accepted, and never write
 * the submission to Sanity.
 */
export function isHoneypotFilled(formData: FormData): boolean {
  return String(formData.get("hp_website") ?? "").trim() !== "";
}
