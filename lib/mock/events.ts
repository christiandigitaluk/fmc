import type { CircuitEvent } from "@/lib/types";

export const events: CircuitEvent[] = [
  {
    slug: "our-fear-our-hope-prof-anthony-reddie",
    title: "Our Fear, Our Hope with Prof Anthony Reddie",
    category: "Talks & Learning",
    startDateTime: "2026-10-03T10:00:00",
    endDateTime: "2026-10-03T13:00:00",
    churchSlug: "shern-hall",
    description:
      "Looking at the afterlife through cultural, theological and pastoral perspectives, with Prof Anthony Reddie.",
    ticketUrl:
      "https://www.eventbrite.com/e/our-fear-our-hope-with-prof-anthony-reddie-tickets-1995663566449",
  },
  {
    slug: "community-lunch-woodford",
    title: "Community Lunch",
    category: "Community",
    startDateTime: "2026-09-14T12:00:00",
    endDateTime: "2026-09-14T13:30:00",
    churchSlug: "woodford",
    description:
      "A 3-course meal for just £6, with coffee, tea and biscuits. Everyone welcome — come along, reconnect and meet new people. Held on the 2nd Monday of every month.",
    recurrence: { nthWeekday: 2, weekday: 1 },
  },
  {
    slug: "messy-church-woodford",
    title: "Messy Church",
    category: "Youth",
    startDateTime: "2026-08-16T15:30:00",
    endDateTime: "2026-08-16T17:30:00",
    churchSlug: "woodford",
    description:
      "A church for people who find sitting still and being quiet impossible. Themed activities, crafts, singing, dance, drama, a short talk and snacks — for children, young people and their families. Held on the 3rd Sunday of every month, 3:30-5:30pm. Contact office.woodford@forestcircuit.org.uk or 07746 540193.",
    recurrence: { nthWeekday: 3, weekday: 0 },
  },
  {
    slug: "praise-150-anniversary-concert",
    title: "Praise 150 Anniversary Concert",
    category: "Special Services",
    startDateTime: "2026-09-19T19:00:00",
    endDateTime: "2026-09-19T21:00:00",
    churchSlug: "woodford",
    description:
      "A celebration of worship and community marking 150 years, featuring the Salway Singers, Indoor Pigeon, Shern Hall Steel Band, Gospel Choir, a piano recital from Debbie Hii, gospel soloist Londiwe Dhlomo-Dlamini, dance, and Crescendo Music School. Free entry, voluntary donations welcome — all proceeds go to local charities.",
  },
  {
    slug: "evangelism-workshop-emma-nash",
    title: "Worship and Evangelism Workshop with Emma Nash",
    category: "Worship",
    startDateTime: "2026-09-06T10:30:00",
    endDateTime: "2026-09-06T14:00:00",
    churchSlug: "loughton",
    description:
      "Worship at 10.30am with visiting preacher Emma Nash, from the Methodist Connexional Evangelism and Growth team, followed at 12 by a workshop Emma is leading. Emma says: “Bring your packed lunch and gather with others for an evangelism workshop that’s practical, down-to-earth, and doesn’t assume we’re all happy preaching to strangers. I will help us all explore how we meet with God, how to have simple faith conversations, and how we might weave faith-sharing into church activities we’re already doing.”",
  },
];
