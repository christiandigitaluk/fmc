export type Facility =
  | "Wheelchair access"
  | "Hall hire"
  | "Youth programme"
  | "Parking"
  | "Accessible parking"
  | "Toddler group"
  | "Food bank"
  | "Hearing loop";

/**
 * A short notice pinned under the news articles: an opportunity, a deadline,
 * something from the wider Methodist Church worth a line rather than a whole
 * article.
 */
export type Notice = {
  slug: string;
  title: string;
  summary: string;
  /**
   * ISO date (YYYY-MM-DD). Shown on the badge, and the notice removes itself
   * once the date has passed, so nothing goes stale on the page.
   */
  deadline?: string;
  /** Badge text when there is no deadline, e.g. "Opportunity". */
  label?: string;
  /** Where the notice points, usually off site. */
  url?: string;
};

/** One regular gathering: a service, group or activity that repeats. */
export type ChurchActivity = {
  name: string;
  /** As the church writes it, e.g. "9am", "12.15pm". */
  time: string;
  /** How often it runs, e.g. "Weekly", "Second Sunday". */
  frequency: string;
  /** Qualifier shown after the frequency, e.g. "term time". */
  note?: string;
  description: string;
};

/**
 * A titled set of regular gatherings, shown collapsed under a church's
 * service times. Churches group these their own way (a Sunday pattern, a
 * weekday programme), so the grouping is theirs to define rather than fixed.
 */
export type ChurchActivityGroup = {
  title: string;
  /** Optional line under the title, e.g. "All are welcome". */
  intro?: string;
  activities: ChurchActivity[];
};

export type Church = {
  slug: string;
  name: string;
  area: string;
  address: string;
  postcode: string;
  minister: string;
  phone?: string;
  email?: string;
  /** The church's own site, where it has one. */
  website?: string;
  image: string;
  /** May be empty: better a shorter page than an invented one. */
  description: string;
  serviceTimes: { day: string; time: string; label: string }[];
  /** Regular gatherings beyond the headline service times, shown collapsed. */
  activityGroups?: ChurchActivityGroup[];
  facilities: Facility[];
  hallHireInfo: string;
  lat: number;
  lng: number;
  /** False for buildings kept on purely for hall hire — no longer a
   * worshipping congregation. Defaults to true when omitted. */
  worshipping?: boolean;
};

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  body: string[];
  coverImage: string;
  /**
   * How the cover fills the article hero. "cover" (the default) crops to fill,
   * which is right for a photograph. "contain" shows the whole image on a
   * green band, for a flat brand graphic whose centred mark must not be cut.
   */
  coverFit?: "cover" | "contain";
  publishedAt: string;
  tags: string[];
};

export const EVENT_CATEGORIES = [
  "Community",
  "Worship",
  "Youth",
  "Special Services",
  "Talks & Learning",
] as const;

export type EventCategory = (typeof EVENT_CATEGORIES)[number];

export type EventRecurrence = {
  /** Which occurrence of the weekday in the month: 1st, 2nd, 3rd, 4th or 5th. */
  nthWeekday: 1 | 2 | 3 | 4 | 5;
  /** 0 = Sunday ... 6 = Saturday */
  weekday: 0 | 1 | 2 | 3 | 4 | 5 | 6;
};

export type CircuitEvent = {
  slug: string;
  title: string;
  category: EventCategory;
  startDateTime: string;
  endDateTime: string;
  churchSlug: string;
  location?: string;
  description: string;
  image?: string;
  ticketUrl?: string;
  /**
   * For events that repeat monthly on a fixed nth-weekday (e.g. "3rd Sunday").
   * When set, startDateTime/endDateTime are treated as a template — only
   * their time-of-day and duration are used, and the displayed date is
   * always recalculated to the next upcoming occurrence.
   */
  recurrence?: EventRecurrence;
};

export type PreachingPlanEntry = {
  id: string;
  date: string;
  churchSlug: string;
  time: string;
  preacher: string;
  notes?: string;
};

export type SiteSettings = {
  bannerActive: boolean;
  bannerText: string;
  bannerLinkHref: string;
  bannerLinkLabel: string;
  phone: string;
  email: string;
  facebookUrl: string;
  instagramUrl: string;
};

export type JobVacancy = {
  title: string;
  salary: string;
  hours: string;
  closingDate: string;
  advertHref?: string;
  descriptionHref?: string;
};

export type BookingRequest = {
  churchSlug: string;
  organisation: string;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  /** The enquirer's own website or social media, not the circuit's. Optional. */
  orgWebsite?: string;
  message: string;
};

export type NewsletterSignup = {
  name: string;
  email: string;
};

export type ContactMessage = {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
};
