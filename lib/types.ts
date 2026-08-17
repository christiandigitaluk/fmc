export type Facility =
  | "Wheelchair access"
  | "Hall hire"
  | "Youth programme"
  | "Parking"
  | "Toddler group"
  | "Food bank"
  | "Hearing loop";

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
  publishedAt: string;
  tags: string[];
};

export type EventCategory = "Community" | "Worship" | "Youth" | "Special Services";

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
  room: string;
  requestedDate: string;
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
