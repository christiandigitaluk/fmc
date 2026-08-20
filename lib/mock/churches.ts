import type { Church } from "@/lib/types";

/**
 * Every field here is either supplied by the circuit or traceable to a public
 * source — the Methodist Church's own directory (methodist.org.uk/findachurch),
 * the church's own website, or the circuit's Sept–Nov 2026 preaching plan,
 * which is the authority for service times.
 *
 * Where nothing could be verified the field is left empty rather than filled
 * in. A church page with fewer facts is not a problem; a church page that
 * promises step-free access, a toddler group or a phone number that turns out
 * not to exist sends someone on a wasted journey. Staff can fill the gaps in
 * Sanity Studio, where they know the answers.
 *
 * The descriptions are the exception, and deliberately so. They are an
 * invitation, not an inventory: a warm welcome is something every church here
 * would stand behind, so it can be offered without checking. What can't be
 * offered without checking is a specific, falsifiable claim — a toddler group,
 * a hearing loop, step-free access. Those go in `facilities`, where they read
 * as facts, and only once someone has confirmed them. Practical detail like
 * parking belongs there too rather than in the opening line; nobody wants to
 * be greeted by a caveat.
 */
export const churches: Church[] = [
  {
    slug: "cann-hall",
    name: "Cann Hall Methodist Church",
    area: "Leytonstone",
    address: "296 Cann Hall Road, Leytonstone",
    postcode: "E11 3NN",
    minister: "Rev Mike Long",
    phone: "020 8220 1221", // methodist.org.uk/findachurch/cann-hall-road
    email: "mike.long@methodist.org.uk",
    image: "/images/cann-hall.jpg",
    description: "Sunday mornings start early at Cann Hall. Whoever you are, and however long it has been since you were last in a church, you will find a welcome waiting.",
    serviceTimes: [{ day: "Sunday", time: "09:00", label: "Morning Worship" }],
    facilities: [],
    hallHireInfo: "",
    lat: 51.5575068,
    lng: 0.0162585,
  },
  {
    slug: "leyton-trinity",
    name: "Leyton (Trinity) Methodist Church",
    area: "Leyton",
    address: "274 High Road, Leyton",
    postcode: "E10 5PW",
    minister: "Rev Stephanie Njeru",
    email: "stephanie.njeru@methodist.org.uk",
    image: "/images/leyton-trinity.jpg",
    description: "A church on Leyton High Road where you are welcome exactly as you are, whether you have worshipped here for years or are simply looking for somewhere to belong.",
    serviceTimes: [{ day: "Sunday", time: "11:00", label: "Morning Worship" }],
    facilities: [],
    hallHireInfo: "",
    lat: 51.5601,
    lng: -0.0089,
  },
  {
    slug: "leytonstone",
    name: "Leytonstone Methodist Church",
    area: "Leytonstone",
    address: "578 High Road, Leytonstone",
    postcode: "E11 3DA",
    minister: "Rev Mike Long",
    email: "church@leytonstonemethodistchurch.org",
    website: "https://leytonstonemethodistchurch.org",
    image: "/images/leytonstone.jpg",
    description: "All are welcome here on Leytonstone High Road, with Junior Church for younger members while the service is on.",
    serviceTimes: [{ day: "Sunday", time: "11:00", label: "Morning Worship" }],
    // The church's own site takes bookings for the building.
    facilities: ["Hall hire"],
    hallHireInfo: "The church takes bookings for events and tabletop sales through its own website.",
    lat: 51.5657106,
    lng: 0.010605,
  },
  {
    slug: "lighthouse-walthamstow",
    name: "Lighthouse Methodist Church",
    area: "Walthamstow",
    address: "120 Markhouse Road, Walthamstow",
    postcode: "E17 8BQ",
    minister: "Rev Stephanie Njeru",
    email: "stephanie.njeru@methodist.org.uk",
    website: "https://lighthousemethodistchurch.org.uk",
    image: "/images/lighthouse.jpg",
    // Opening date and listed status per Historic England (list entry 1391928).
    description:
      "Known for the lantern tower that gives it its name, this Grade II listed church has stood on Markhouse Road since 1893, and still opens its doors to the neighbourhood every Sunday.",
    serviceTimes: [{ day: "Sunday", time: "11:00", label: "Morning Worship" }],
    facilities: [],
    hallHireInfo: "",
    lat: 51.5760404,
    lng: -0.0300766,
  },
  {
    slug: "loughton",
    name: "Loughton Methodist Church",
    area: "Loughton",
    address: "260 High Road, Loughton",
    postcode: "IG10 1RB",
    minister: "Rev Sue Creighton",
    phone: "020 8502 3071", // loughtonmethodist.org.uk/visit
    email: "administrator@loughtonmethodist.org.uk",
    website: "https://www.loughtonmethodist.org.uk",
    image: "/images/loughton.jpg",
    description:
      "A church for all ages on Loughton High Road, with a variety of worship, a community cafe, and an office open through the week if you would like to talk to someone before you visit.",
    serviceTimes: [{ day: "Sunday", time: "10:30", label: "Morning Worship" }],
    facilities: ["Hall hire", "Parking", "Accessible parking"],
    hallHireInfo: "Rooms are available to hire; the church office can be reached on weekdays between 9.30am and 3.30pm.",
    lat: 51.6496245,
    lng: 0.0566101,
  },
  {
    slug: "loughton-trinity",
    name: "Trinity Church Debden",
    area: "Loughton",
    address: "Mannock Drive, Loughton",
    postcode: "IG10 2JD",
    minister: "Rev Sue Creighton",
    image: "/images/trinity-debden.jpg",
    // The Methodist and Anglican joint congregation here ended in 2014, so the
    // description says ecumenical rather than naming the two denominations.
    description: "An ecumenical congregation worships here at the top of Mannock Drive, with all-age services and café-style worship through the year. Everyone is welcome.",
    serviceTimes: [{ day: "Sunday", time: "10:30", label: "Morning Worship" }],
    facilities: [],
    hallHireInfo: "",
    lat: 51.6549,
    lng: 0.0833,
  },
  {
    slug: "shern-hall",
    name: "Shern Hall Methodist Church",
    area: "Walthamstow",
    address: "Shernhall Street, Walthamstow",
    postcode: "E17 9HX",
    minister: "Rev Kong Ching Hii",
    email: "kongching.hii@methodist.org.uk",
    image: "/images/shern-hall.jpg",
    description: "There is a welcome waiting on Shernhall Street every Sunday morning. Come as you are, and come as you find us.",
    serviceTimes: [{ day: "Sunday", time: "11:00", label: "Morning Worship" }],
    facilities: [],
    hallHireInfo: "",
    lat: 51.5825842,
    lng: -0.0036702,
  },
  {
    slug: "south-chingford",
    name: "South Chingford Methodist Church",
    area: "Chingford",
    address: "3 New Road, Chingford",
    postcode: "E4 9EU",
    minister: "Rev Mike Long", // methodist.org.uk/findachurch/new-road-south-chingford
    phone: "020 8220 1221",
    email: "mike.long@methodist.org.uk",
    image: "/images/south-chingford.jpg",
    description: "A friendly Sunday morning on New Road, and an open door to anyone who would like to join us. There is no need to have been before.",
    serviceTimes: [{ day: "Sunday", time: "10:30", label: "Morning Worship" }],
    facilities: [],
    hallHireInfo: "",
    lat: 51.6168,
    lng: -0.0147,
  },
  {
    slug: "winchester-road",
    name: "Winchester Road Methodist Church",
    area: "Highams Park",
    address: "82 Winchester Road, Highams Park",
    postcode: "E4 9JP",
    minister: "Rev Stephanie Njeru",
    phone: "020 8531 8663", // premises warden, winchesterroadchurch.org.uk
    email: "admin@winchesterroadchurch.org.uk",
    website: "https://winchesterroadchurch.org.uk",
    image: "/images/winchester-road.jpg",
    description:
      "There is plenty going on in Highams Park. Children and young people join the first part of the service before heading off to their own groups, and the church is home to Beavers, Cubs and Scouts, Rainbows, Brownies, Guides and Rangers. The Sunday Lunch Club on the first Sunday of the month is open to all.",
    serviceTimes: [{ day: "Sunday", time: "10:30", label: "Morning Worship" }],
    facilities: ["Hall hire", "Youth programme"],
    hallHireInfo: "Hall bookings are handled by the church's lettings manager.",
    lat: 51.6038039,
    lng: -0.0031947,
  },
  {
    slug: "woodford",
    name: "Woodford Methodist Church",
    area: "South Woodford",
    address: "Derby Road, South Woodford",
    postcode: "E18 2PU",
    minister: "Rev Kong Ching Hii",
    email: "kongching.hii@methodist.org.uk",
    website: "https://www.woodfordmethodistchurch.org.uk",
    image: "/images/woodford.jpg",
    description: "Families are welcome at Messy Church, and a community lunch and the Boys' Brigade meet through the week alongside Sunday morning worship.",
    serviceTimes: [{ day: "Sunday", time: "10:30", label: "Morning Worship" }],
    facilities: ["Youth programme"],
    hallHireInfo: "",
    lat: 51.5994756,
    lng: 0.0195111,
  },
  {
    slug: "wanstead",
    name: "Wanstead Methodist Church",
    area: "Wanstead",
    address: "Hermon Hill, Wanstead",
    postcode: "E11 2AR",
    minister: "",
    phone: "07458 002275",
    email: "operations@forestcircuit.org.uk",
    image: "/images/wanstead.jpg",
    description:
      "Wanstead Methodist Church stopped holding Sunday services a few years back, but the building never went quiet. It is now a busy community hub, home to The Wanstead Curtain theatre company and a regular venue for rehearsals, classes and local groups. Five minutes' walk from Snaresbrook station.",
    serviceTimes: [],
    facilities: ["Hall hire", "Parking", "Accessible parking"],
    hallHireInfo:
      "A main hall with a stage end, plus smaller additional rooms and a kitchen/servery, available for rehearsals, classes, committees, workshops and more. This is a no-alcohol venue and we're unable to take birthday party bookings. Contact David Bishop (Operations) to enquire.",
    lat: 51.582154,
    lng: 0.024996,
    worshipping: false,
  },
];
