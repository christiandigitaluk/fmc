import type { CircuitEvent, Church } from "@/lib/types";

/**
 * The address to show for an event, and to write into its calendar entry.
 *
 * `event.location` stays a genuine override, for the occasions something is
 * held somewhere other than its church. Everything else is derived from the
 * church record, so the address is maintained in one place instead of being
 * retyped onto each event — which had already drifted, with two Woodford
 * events carrying slightly different versions of the same address.
 */
export function eventLocation(event: CircuitEvent, church?: Church): string {
  if (event.location) return event.location;
  if (!church) return "Forest Circuit";
  return [church.name, church.address, church.postcode].filter(Boolean).join(", ");
}
