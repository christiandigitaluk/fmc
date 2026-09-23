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
  {
    slug: "wanstead-venue-hire",
    title: "Wanstead venue hire",
    summary:
      "A main hall with a stage end, smaller rooms and a kitchen, five minutes from Snaresbrook. Rehearsals, classes, workshops and committees all welcome.",
    // No deadline: this is an ongoing search, so the badge carries the label
    // instead and the notice stays up until it is removed in Studio.
    label: "Now seeking hirers",
    url: "https://wansteadmethodists.org.uk",
  },
  {
    slug: "our-fear-our-hope-prof-anthony-reddie",
    title: "Our Fear, Our Hope",
    summary:
      "Professor Anthony Reddie, one of Britain's foremost Black theologians, explores the afterlife through cultural, theological and pastoral perspectives. Saturday 3 October, 10am, at Shern Hall Methodist Church.",
    deadline: "2026-10-03",
    url: "https://www.eventbrite.com/e/our-fear-our-hope-with-prof-anthony-reddie-tickets-1995663566449",
  },
];
