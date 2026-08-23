import { createClient } from "next-sanity";
import { projectId, dataset, apiVersion } from "@/sanity/env";

// Authenticated so reads keep working once the dataset is switched from
// public to private. useCdn is false because Sanity's CDN does not serve
// token-authenticated requests — the client falls back to the API directly
// either way, but setting it explicitly avoids a runtime warning.
export const client = createClient({
  projectId: projectId || "placeholder",
  dataset,
  apiVersion,
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});

// Server-only client for writes (booking requests). Requires SANITY_API_TOKEN
// with "Editor" or higher permissions, generated in manage.sanity.io.
export const writeClient = createClient({
  projectId: projectId || "placeholder",
  dataset,
  apiVersion,
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});

// Used only while draft mode is on (i.e. inside the Presentation tool's
// live preview). Reads unpublished edits and stega-encodes every string
// result with hidden metadata so @sanity/visual-editing's overlay knows
// which document/field/path each bit of text on the page came from.
export const previewClient = createClient({
  projectId: projectId || "placeholder",
  dataset,
  apiVersion,
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
  perspective: "drafts",
  stega: {
    studioUrl: "/studio",
  },
});
