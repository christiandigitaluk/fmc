import type { SiteSettings } from "@/lib/types";

export const siteSettings: SiteSettings = {
  bannerActive: true,
  bannerText: "The new Autumn preaching plan (September – November 2026) is now available to",
  // Relative, so it keeps working when the site moves to forestcircuit.co.uk.
  bannerLinkHref: "/documents/preaching-plan-sept-nov-2026.pdf",
  bannerLinkLabel: "print",
  phone: "07458 002275",
  // The circuit's mail runs on forestcircuit.org.uk; the website is on
  // forestcircuit.co.uk. Different domains, deliberately.
  email: "operations@forestcircuit.org.uk",
  facebookUrl: "https://facebook.com",
  instagramUrl: "https://instagram.com",
};
