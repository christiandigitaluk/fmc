import Link from "next/link";
import Image from "next/image";
import { Mail, Phone } from "lucide-react";
import { FacebookIcon, InstagramIcon } from "@/components/ui/SocialIcons";
import type { SiteSettings } from "@/lib/types";

const FOOTER_LINKS = [
  { href: "/about", label: "About us" },
  { href: "/staff", label: "Circuit staff" },
  { href: "/churches", label: "Find a church" },
  { href: "/preaching-plan", label: "Preaching plan" },
  { href: "/events", label: "Events" },
  { href: "/news", label: "News" },
  { href: "/hall-hire", label: "Venue hire" },
  { href: "/jobs", label: "Jobs" },
  { href: "/resources", label: "Resources" },
  { href: "/contact", label: "Contact" },
];

const LEGAL_LINKS = [
  { href: "/privacy", label: "Privacy notice" },
  { href: "/safeguarding", label: "Safeguarding" },
  { href: "/safeguarding/connection", label: "Connection safeguarding" },
  { href: "/safeguarding/data-protection", label: "Data protection" },
  { href: "/useful-links", label: "Useful links" },
  { href: "https://www.forestcircuit.co.uk/safeguarding-officers-forms", label: "Safeguarding officers' forms", external: true },
  { href: "https://www.forestcircuit.co.uk/volunteer-job-descriptions", label: "Volunteer job descriptions", external: true },
];

/**
 * True once a social URL points at an actual page rather than sitting on the
 * bare placeholder domain (https://facebook.com, https://instagram.com) that
 * ships until the circuit has real accounts to link. Checking the path
 * rather than a fixed list of placeholder strings means a real handle added
 * later, e.g. https://facebook.com/forestcircuit, is picked up automatically
 * with no further code change.
 */
function isConfiguredSocialUrl(url: string | undefined): url is string {
  if (!url) return false;
  try {
    return new URL(url).pathname.replace(/\/$/, "") !== "";
  } catch {
    return false;
  }
}

export function Footer({ settings }: { settings: SiteSettings }) {
  const facebookConfigured = isConfiguredSocialUrl(settings.facebookUrl);
  const instagramConfigured = isConfiguredSocialUrl(settings.instagramUrl);
  const anySocialConfigured = facebookConfigured || instagramConfigured;
  return (
    <footer
      className="slant-top relative bg-ink-900 text-cream-50"
      style={{ marginTop: "calc(-1 * var(--slant-h))" }}
    >
      <div className="container-max grid gap-10 py-16 md:grid-cols-3">
        <div>
          <Link href="/" className="mb-4 flex items-center" aria-label="Forest Circuit home">
            <Image src="/images/logo-white.png" alt="" width={96} height={96} className="h-24 w-24" />
          </Link>
          <p className="max-w-xs text-sm text-white/70">
            Heaven touching earth. A team ministry of ten Methodist churches across Waltham Forest, Wanstead and
            Loughton.
          </p>
        </div>

        <nav aria-label="Footer">
          <p className="eyebrow mb-4 !text-white">Explore</p>
          <ul className="space-y-2.5">
            {FOOTER_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-sm text-white/85 no-underline hover:text-forest-100 hover:underline">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <p className="eyebrow mb-4 !text-white">Get in touch</p>
          <ul className="space-y-2.5 text-sm text-white/85">
            <li className="flex items-center gap-2">
              <Phone size={16} aria-hidden="true" />
              <a href={`tel:${settings.phone.replace(/\s/g, "")}`} className="text-white/85 no-underline hover:text-forest-100 hover:underline">
                {settings.phone}
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Mail size={16} aria-hidden="true" />
              <a href={`mailto:${settings.email}`} className="text-white/85 no-underline hover:text-forest-100 hover:underline">
                {settings.email}
              </a>
            </li>
          </ul>
          <p className="mt-6 mb-3 text-xs font-bold uppercase tracking-wide text-white/70">Follow us</p>
          <div className="flex items-center gap-3">
            {facebookConfigured ? (
              <a
                href={settings.facebookUrl}
                aria-label="Forest Circuit on Facebook"
                className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-ink-900 bg-cream-50 text-ink-900 shadow-[var(--shadow-sticker-sm)] transition-[transform,background-color] duration-200 ease-[cubic-bezier(.22,.61,.36,1)] hover:-rotate-6 hover:bg-orange-500 hover:shadow-[var(--shadow-sticker)] focus:outline-none focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-2"
                style={{ outlineColor: "var(--focus-ring)" }}
              >
                <FacebookIcon />
              </a>
            ) : (
              // Not yet linked, since the circuit has no Facebook page live.
              // Kept visible rather than removed so the brand mark still
              // reads, but inert: no href, out of tab order, no hover state.
              <span
                aria-hidden="true"
                title="Coming soon"
                className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-ink-900 bg-cream-50 text-ink-900/40 shadow-[var(--shadow-sticker-sm)]"
              >
                <FacebookIcon />
              </span>
            )}
            {instagramConfigured ? (
              <a
                href={settings.instagramUrl}
                aria-label="Forest Circuit on Instagram"
                className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-ink-900 bg-cream-50 text-ink-900 shadow-[var(--shadow-sticker-sm)] transition-[transform,background-color] duration-200 ease-[cubic-bezier(.22,.61,.36,1)] hover:rotate-6 hover:bg-orange-500 hover:shadow-[var(--shadow-sticker)] focus:outline-none focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-2"
                style={{ outlineColor: "var(--focus-ring)" }}
              >
                <InstagramIcon />
              </a>
            ) : (
              <span
                aria-hidden="true"
                title="Coming soon"
                className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-ink-900 bg-cream-50 text-ink-900/40 shadow-[var(--shadow-sticker-sm)]"
              >
                <InstagramIcon />
              </span>
            )}
            {!anySocialConfigured && <span className="sr-only">Social media links are coming soon.</span>}
          </div>
        </div>
      </div>

      <div className="border-t border-white/15 py-6">
        <div className="container-max flex flex-col gap-3 text-xs text-white/60">
          <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3">
            <ul className="flex flex-wrap items-center gap-x-5 gap-y-2">
              {LEGAL_LINKS.map((link) =>
                link.external ? (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noreferrer"
                      className="text-white/60 no-underline hover:text-white hover:underline"
                    >
                      {link.label}
                    </a>
                  </li>
                ) : (
                  <li key={link.href}>
                    <Link href={link.href} className="text-white/60 no-underline hover:text-white hover:underline">
                      {link.label}
                    </Link>
                  </li>
                )
              )}
            </ul>
            <p>
              Designed &amp; developed by{" "}
              <a
                href="https://satsuma.studio/"
                target="_blank"
                rel="noreferrer"
                className="text-white/60 no-underline hover:text-white hover:underline"
              >
                Satsuma
              </a>
            </p>
          </div>
          <p>&copy; {new Date().getFullYear()} Forest Methodist Circuit. A registered charity.</p>
        </div>
      </div>
    </footer>
  );
}
