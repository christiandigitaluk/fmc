import { defineEnableDraftMode } from "next-sanity/draft-mode";
import { client } from "@/sanity/lib/client";

/**
 * Called by Sanity's Presentation tool when a staff member opens the live
 * preview. Validates the request came from Studio (via a per-project secret
 * Sanity manages automatically, not something we configure ourselves), then
 * turns on Next.js draft mode so subsequent requests read unpublished edits.
 */
export const { GET } = defineEnableDraftMode({
  client: client.withConfig({ token: process.env.SANITY_API_TOKEN }),
});
