import type { CircuitEvent } from "@/lib/types";

export const events: CircuitEvent[] = [
  {
    slug: "2nd-highams-park-guides-centenary",
    title: "2nd Highams Park Guides Centenary Thanksgiving Service",
    category: "Special Services",
    startDateTime: "2026-09-20T14:00:00",
    endDateTime: "2026-09-20T15:30:00",
    churchSlug: "winchester-road",
    description:
      "Celebrating 100 years of 2nd Highams Park Guides, followed by coffee and cake. Current and past members of the Uniformed Organisations, friends and anyone associated with the group are warmly invited. To help with numbers, please RSVP by 30 June 2026 to 2ndhighamsparkguides@gmail.com or Debbie Crawford on 07702 165456.",
  },
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
  {
    slug: "black-history-month-notting-hill-carnival",
    title: "Black History Month: 60 Years of Notting Hill Carnival",
    category: "Special Services",
    startDateTime: "2026-10-17T17:30:00",
    endDateTime: "2026-10-17T21:00:00",
    churchSlug: "shern-hall",
    description:
      "A fundraising evening of spoken word, music and thanksgiving celebrating 60 years of Notting Hill Carnival, featuring the Shern Hall Methodist Youth Steelband and more exciting acts. Light refreshments served. Adults £15, ages 12–18 £5, under 11s free — donations welcome. Call 0208 503 6750 or 0208 550 2763.",
  },
  {
    slug: "peoples-emergency-briefing-loughton",
    title: "People's Emergency Briefing: Community Screening",
    category: "Talks & Learning",
    startDateTime: "2026-10-14T19:30:00",
    endDateTime: "2026-10-14T21:00:00",
    churchSlug: "loughton",
    description:
      "A screening of the People's Emergency Briefing, a 50 minute film on what climate change means for everyday life in the UK, hosted with the Emergency Planning Society.",
  },
  {
    slug: "eco-exhibition-loughton-day-1",
    title: "Eco Exhibition",
    category: "Community",
    startDateTime: "2026-10-16T10:00:00",
    endDateTime: "2026-10-16T16:00:00",
    churchSlug: "loughton",
    description: "Energy saving ideas and planet saving thoughts. Drop in any time between 10am and 4pm.",
  },
  {
    slug: "eco-exhibition-loughton-day-2",
    title: "Eco Exhibition",
    category: "Community",
    startDateTime: "2026-10-17T10:00:00",
    endDateTime: "2026-10-17T16:00:00",
    churchSlug: "loughton",
    description: "Energy saving ideas and planet saving thoughts. Drop in any time between 10am and 4pm.",
  },
];
