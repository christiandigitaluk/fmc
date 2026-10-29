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
    slug: "shern-hall-venue-hire",
    title: "Shern Hall venue hire",
    summary:
      "Caulkwell Hall in Walthamstow is free for regular hire on Mondays and Wednesdays, 8am to 10pm. Ideal for classes, exercise groups and meetings, with free parking for hirers.",
    // No deadline: an ongoing search, like Wanstead's. Points at the venue
    // hire page, where the hash opens the Shern Hall card with the office's
    // contact details.
    label: "Now seeking hirers",
    highlight: "Mondays and Wednesdays free.",
    url: "https://www.forestcircuit.co.uk/venue-hire#shern-hall",
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
    url: "https://www.forestnightshelter.org.uk/volunteer-26/",
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
  {
    slug: "planning-for-evangelism-enfield-2026",
    title: "Planning for Evangelism",
    summary:
      "A free, practical workshop from Enfield Methodist Circuit, led by Emma Nash of the Evangelism and Growth Team. Saturday 7 November, 10am to 2pm, at Ponders End Methodist Church, with a light lunch provided.",
    // Deadline is the RSVP date, so the notice comes down once places can no
    // longer be booked; the label says so more plainly than "Closes 31 Oct".
    deadline: "2026-10-31",
    label: "RSVP by 31 Oct",
    highlight: "Grow in confidence sharing your faith.",
    // Enfield Circuit's own flyer, hosted here with their permission.
    url: "https://www.forestcircuit.co.uk/documents/planning-for-evangelism-enfield-2026.pdf",
  },
];
