import Image from "next/image";
import { ChevronDown, type LucideIcon } from "lucide-react";

/**
 * A collapsible card above the venue hire enquiry form for a hall that is
 * actively looking for hirers. Started life as Wanstead's spotlight and was
 * pulled out when Shern Hall needed the same treatment, so the two sit as a
 * matching pair rather than one looking like an afterthought.
 *
 * Collapsed by default: at full height a single spotlight pushed the enquiry
 * form well below the fold, which read as an advert rather than a prompt, and
 * two open ones would bury it. The teaser keeps each hall in front of every
 * visitor while leaving the form the main event.
 *
 * The photograph stays in the markup while collapsed but is not fetched:
 * a closed panel paints nothing, so the lazy image never comes near the
 * viewport. That is also why it does not carry `priority`, which would
 * preload an image the visitor may never open, competing with the real LCP
 * element.
 */
export type HallFeature = { icon: LucideIcon; label: string };

export function HallSpotlight({
  id,
  badge,
  title,
  teaser,
  imageSrc,
  imageAlt,
  features,
  note,
  actions,
  children,
}: {
  /** Also the anchor, so /venue-hire#{id} lands on (and opens) this card. */
  id: string;
  badge: string;
  title: string;
  teaser: string;
  imageSrc: string;
  imageAlt: string;
  features: HallFeature[];
  note?: string;
  actions: React.ReactNode;
  children: React.ReactNode;
}) {
  const headingId = `${id}-heading`;

  return (
    <section aria-labelledby={headingId}>
      <details
        id={id}
        className="sticker scroll-mt-28 overflow-hidden rounded-[10px] bg-white [&_summary::-webkit-details-marker]:hidden sm:rounded-[20px]"
        style={{ borderColor: "var(--orange-500)" }}
      >
        {/* Sized like a Noticeboard card on mobile (p-5, rounded-[10px],
            a small bold title, badge at px-3 py-1) rather than muted: those
            cards keep the full loud sticker/orange treatment and still read
            as minor, purely because they're compact. The earlier attempt
            toned down colour and shadow instead, which missed the actual
            cause. Grows back to the original spacious layout from sm up. */}
        <summary className="flex cursor-pointer list-none items-start gap-4 p-5 focus:outline-none focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:[outline-color:var(--focus-ring)] sm:p-6">
          <div className="min-w-0 flex-1">
            <span className="sticker mb-2 inline-flex items-center rounded-full bg-orange-500 px-3 py-1 text-xs font-extrabold uppercase tracking-wide text-ink-900 sm:mb-3 sm:-rotate-1 sm:px-4 sm:py-1.5">
              {badge}
            </span>
            {/* Body-text size and weight on mobile, matching a Noticeboard
                title; grows to the full text-h3 heading (same size as "Make
                an enquiry" below) from sm up, where there's room for the two
                to sit as equals. */}
            <h2
              id={headingId}
              className="mb-1.5 text-[length:var(--text-body-size)] font-bold sm:mb-2 sm:text-[length:var(--text-h3)]"
            >
              {title}
            </h2>
            {/* Hidden on mobile. The badge and heading already say what this
                is, and on a phone this paragraph pushed the enquiry form
                further down for the many visitors who arrive from a different
                church's enquiry link and did not come here for this hall. */}
            <p className="hidden text-[var(--text-body)] sm:block">{teaser}</p>
          </div>

          <span className="mt-1 flex shrink-0 items-center gap-1.5 text-sm font-semibold text-forest-600">
            {/* Visible at every width, not just sm+: a bare chevron on this
                sticker-bordered card reads as a button leading somewhere,
                not as a disclosure toggle, and mobile visitors were tapping
                it expecting navigation. The label is what says "this just
                expands in place." */}
            <span className="when-collapsed">See more</span>
            <span className="when-expanded">See less</span>
            <ChevronDown size={18} aria-hidden="true" className="disclosure-chevron" />
          </span>
        </summary>

        <div className="grid border-t border-line-200 md:grid-cols-[1fr_1.15fr]">
          <div className="relative min-h-[220px] md:min-h-full">
            <Image
              src={imageSrc}
              alt={imageAlt}
              fill
              sizes="(min-width: 768px) 40vw, 100vw"
              draggable={false}
              className="no-long-press object-cover"
            />
          </div>

          <div className="p-6 md:p-8">
            <div className="mb-5 flex flex-col gap-3 text-[var(--text-body)]">{children}</div>

            <ul className="mb-5 grid gap-2 sm:grid-cols-2">
              {features.map(({ icon: Icon, label }) => (
                <li key={label} className="flex items-center gap-2 text-sm font-semibold text-[var(--text-heading)]">
                  <Icon size={15} className="shrink-0 text-forest-700" aria-hidden="true" />
                  {label}
                </li>
              ))}
            </ul>

            {note && (
              <p className="mb-5 rounded-[10px] bg-cream-100 px-4 py-3 text-sm text-[var(--text-body)]">{note}</p>
            )}

            <div className="flex flex-wrap items-center gap-3">{actions}</div>
          </div>
        </div>
      </details>
    </section>
  );
}
