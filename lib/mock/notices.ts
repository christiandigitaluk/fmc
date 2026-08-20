import type { Notice } from "@/lib/types";

export const notices: Notice[] = [
  {
    slug: "leadership-year-2026-27",
    title: "Leadership Year",
    summary:
      "Twelve fully funded places for 18 to 30s, across three residential weekends at Cliff College. Travel and meals covered.",
    deadline: "2026-09-20",
    // Tracking parameters from the Methodist News email are deliberately
    // stripped: the utm tags would log our visitors as their campaign's
    // traffic, and dm_i identifies the individual recipient of that send.
    url: "https://www.methodist.org.uk/for-churches/ministries/children-youth-family-ministry/methodist-young-adults/leadershipyear/",
  },
];
