import Image from "next/image";
import { ExternalLink, Train, Utensils, Theater, DoorOpen, CircleParking, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/Button";

/**
 * Wanstead is a circuit priority in its own right: the building no longer
 * holds Sunday services, and the Mission Strategy 2025-28 commits to
 * developing it as a venue with a missional element. So it gets a spotlight
 * above the general enquiry form rather than sitting as one option among ten
 * in the dropdown.
 *
 * Collapsed by default: at full height it pushed the enquiry form well below
 * the fold, which read as an advert rather than a prompt. The teaser keeps
 * Wanstead in front of every visitor while leaving the form the main event.
 *
 * The photograph stays in the markup while collapsed but is not fetched:
 * a closed panel paints nothing, so the lazy image never comes near the
 * viewport. That is also why it no longer carries `priority`, which would
 * preload an image the visitor may never open, competing with the real LCP
 * element. Verified: no network request for it until the panel opens.
 */
const FEATURES = [
  { icon: Theater, label: "Main hall with a stage end" },
  { icon: DoorOpen, label: "Smaller additional rooms" },
  { icon: Utensils, label: "Kitchen and servery" },
  { icon: CircleParking, label: "Parking, including accessible bays" },
  { icon: Train, label: "5 minutes from Snaresbrook" },
];

export function WansteadSpotlight({ website }: { website?: string }) {
  return (
    <section aria-labelledby="wanstead-spotlight-heading" className="mb-12">
      <details
        className="sticker overflow-hidden rounded-[20px] bg-white [&_summary::-webkit-details-marker]:hidden"
        style={{ borderColor: "var(--orange-500)" }}
      >
        <summary className="flex cursor-pointer list-none items-start gap-4 p-6 focus:outline-none focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:[outline-color:var(--focus-ring)]">
          <div className="min-w-0 flex-1">
            <span className="sticker mb-3 inline-flex -rotate-1 items-center rounded-full bg-orange-500 px-4 py-1.5 text-xs font-extrabold uppercase tracking-wide text-ink-900">
              Now seeking hirers
            </span>
            <h2 id="wanstead-spotlight-heading" style={{ fontSize: "var(--text-h3)" }} className="mb-2">
              Wanstead: a venue with room for more
            </h2>
            {/* Hidden on mobile. The badge and heading already say what this
                is, and on a phone this paragraph pushed the enquiry form
                further down for the many visitors who arrive from a different
                church's enquiry link and did not come here for Wanstead. */}
            <p className="hidden text-[var(--text-body)] sm:block">
              A community hub with a main hall and stage end, five minutes from Snaresbrook, and we are actively
              looking for regular hirers.
            </p>
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
              src="/images/wanstead.jpg"
              alt="Wanstead Methodist Church on Hermon Hill"
              fill
              sizes="(min-width: 768px) 40vw, 100vw"
              draggable={false}
              className="no-long-press object-cover"
            />
          </div>

          <div className="p-6 md:p-8">
            <div className="mb-5 flex flex-col gap-3 text-[var(--text-body)]">
              <p>
                Wanstead stopped holding Sunday services a few years ago, but the building never went quiet. It is now
                a community hub and home to The Wanstead Curtain theatre company, and we are actively looking for more
                regular hirers to fill the week.
              </p>
              <p>
                It suits rehearsals, classes, workshops, committees and performance, and we would love to hear from
                arts groups in particular.
              </p>
            </div>

            <ul className="mb-5 grid gap-2 sm:grid-cols-2">
              {FEATURES.map(({ icon: Icon, label }) => (
                <li key={label} className="flex items-center gap-2 text-sm font-semibold text-[var(--text-heading)]">
                  <Icon size={15} className="shrink-0 text-forest-700" aria-hidden="true" />
                  {label}
                </li>
              ))}
            </ul>

            <p className="mb-5 rounded-[10px] bg-cream-100 px-4 py-3 text-sm text-[var(--text-body)]">
              Please note this is a no-alcohol venue, and we are unable to take birthday party bookings.
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <Button href="/venue-hire?church=wanstead#enquiry" variant="primary">
                Enquire about Wanstead
              </Button>
              {website && (
                <a
                  href={website}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-forest-600 hover:text-forest-700"
                >
                  {website.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "")}
                  <ExternalLink size={14} aria-hidden="true" />
                </a>
              )}
            </div>
          </div>
        </div>
      </details>
    </section>
  );
}
