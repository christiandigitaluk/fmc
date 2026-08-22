import type { Post } from "@/lib/types";

export const posts: Post[] = [
  {
    slug: "one-circuit-one-front-door",
    title: "One circuit, one front door",
    excerpt:
      "Ten churches, one circuit, and until now no single place that held it all together. Our new website and brand identity are live.",
    coverImage: "/images/og-share.png",
    // A centred mark, not a photograph: cropping it to fill would cut it off.
    coverFit: "contain",
    publishedAt: "2026-08-20",
    tags: ["Circuit news", "Communications"],
    body: [
      "Ten churches. One circuit. Until now, no single place that held it all together. Today we are launching a new website for the Forest Methodist Circuit, together with a brand identity that gives us a consistent look and voice for the first time.",
      "For too long the circuit has worked as several disconnected units. Each church has its own rhythms, its own notices and its own way of passing news along, and that local character is a strength worth protecting. What has been missing is a central point of connection: somewhere a member of one congregation can see what is happening in the other nine, and somewhere a newcomer can find us without already knowing which door to knock on.",
      "This is not a cosmetic exercise. It answers the first of the five priorities set out in our Mission Strategy 2025 to 28, which commits the circuit to developing a communications strategy and network, “to promote a greater sense of circuit identity, better sharing of information, ideas and resources between churches; and enable better sharing of circuit decisions and activities across the churches.” The website is the first substantial piece of that work.",
      "Find a church is the part we expect to be used most. Every one of our ten churches has its own page carrying service times, facilities, contact details and a map, so anyone new to the area can find their nearest congregation in seconds rather than assembling it from search results and out of date listings.",
      "The preaching plan is now interactive. Instead of squinting at a printed grid, you can filter by church or by date to see who is preaching where, and the plan on screen is always the current one. A print button is built in for anyone who still wants a copy for the noticeboard, and what prints is exactly what you are looking at.",
      "The events page brings the whole circuit diary into a single view. Community lunches, Messy Church, anniversary services and our new Talks & Learning strand now sit alongside one another, filterable by category and by church, each with a full address and an add to calendar button. If something worth your time is happening at Woodford or Loughton, you should no longer have to hear about it by accident.",
      "The resource hub gathers the documents people ask for again and again: the current preaching plan, the circuit overview map, the mission strategy and our safeguarding policy. All of them are properly formatted, downloadable, and in one predictable place.",
      "Alongside the site, the circuit now has a proper visual identity. A logo, a defined colour palette, a pair of typefaces and a set of guidelines that carry across print, email signatures, letterheads and newsletters. It means a poster in Chingford and a letter from the circuit office will look as though they come from the same family, because they do.",
      "A website is only ever as good as what is on it. Please send us your news, your events and your photographs, so that this becomes a genuine shared noticeboard rather than a brochure that sits still. Heaven touching earth, in ten places at once, is a good deal easier to see when we are all looking at the same thing.",
    ],
  },
];
