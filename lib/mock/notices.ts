import type { Notice } from "@/lib/types";

export const notices: Notice[] = [
  {
    slug: "leadership-year-2026-27",
    title: "Leadership Year",
    summary:
      "Twelve fully funded places for 18 to 30s, across three residential weekends at Cliff College. Travel and meals covered.",
    highlight: "Fully funded, apply today.",
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
    highlight: "Room to grow your group.",
    url: "https://wansteadmethodists.org.uk",
  },
  {
    slug: "fcens-volunteer-support-workers",
    title: "FCENS Volunteer Support Workers",
    summary:
      "Forest Churches Emergency Night Shelter needs volunteers for their Drop-In service, supporting people experiencing homelessness in Waltham Forest. No experience needed, full training and support provided.",
    // No deadline: this is an ongoing recruitment drive, so the badge
    // carries the label instead and the notice stays up until it is
    // removed in Studio.
    label: "Now recruiting",
    highlight: "Help make a difference.",
    url: "https://forestnightshelter.org.uk",
  },
  {
    slug: "our-fear-our-hope-prof-anthony-reddie",
    title: "Our Fear, Our Hope",
    summary:
      "Professor Anthony Reddie, one of Britain's foremost Black theologians, explores the afterlife through cultural, theological and pastoral perspectives. Saturday 3 October, 10am, at Shern Hall Methodist Church.",
    // Deadline still drives expiry (the notice comes off the site after the
    // event), but the badge shows this label instead of "Closes 3 Oct".
    deadline: "2026-10-03",
    label: "Book free tickets",
    highlight: "One not to miss.",
    url: "https://www.eventbrite.com/e/our-fear-our-hope-with-prof-anthony-reddie-tickets-1995663566449",
  },
];
