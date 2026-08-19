import Image from "next/image";
import { ExternalLink, Train, Utensils, Theater, DoorOpen, CircleParking } from "lucide-react";
import { Button } from "@/components/ui/Button";

/**
 * Wanstead is a circuit priority in its own right: the building no longer
 * holds Sunday services, and the Mission Strategy 2025-28 commits to
 * developing it as a venue with a missional element. So it gets a spotlight
 * above the general enquiry form rather than sitting as one option among ten
 * in the dropdown.
 */
const FEATURES = [
  { icon: Theater, label: "Main hall with a stage end" },
  { icon: DoorOpen, label: "Smaller additional rooms" },
  { icon: Utensils, label: "Kitchen and servery" },
  { icon: CircleParking, label: "Parking, including accessible bays" },
  { icon: Train, label: "5 minutes from Snaresbrook" },
];

export function WansteadSpotlight() {
  return (
    <section
      aria-labelledby="wanstead-spotlight-heading"
      className="sticker mb-12 overflow-hidden rounded-[20px] bg-white"
      style={{ borderColor: "var(--orange-500)" }}
    >
      <div className="grid md:grid-cols-[1fr_1.15fr]">
        <div className="relative min-h-[220px] md:min-h-full">
          <Image
            src="/images/wanstead.jpg"
            alt="Wanstead Methodist Church on Hermon Hill"
            fill
            sizes="(min-width: 768px) 40vw, 100vw"
            draggable={false}
            priority
            className="no-long-press object-cover"
          />
        </div>

        <div className="p-6 md:p-8">
          <span className="sticker mb-4 inline-flex -rotate-1 items-center rounded-full bg-orange-500 px-4 py-1.5 text-xs font-extrabold uppercase tracking-wide text-ink-900">
            Now seeking hirers
          </span>

          <h2 id="wanstead-spotlight-heading" style={{ fontSize: "var(--text-h3)" }} className="mb-3">
            Wanstead: a venue with room for more
          </h2>

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
            <Button href="/hall-hire?church=wanstead#enquiry" variant="primary">
              Enquire about Wanstead
            </Button>
            <a
              href="https://wansteadmethodists.org.uk/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-forest-600 hover:text-forest-700"
            >
              wansteadmethodists.org.uk
              <ExternalLink size={14} aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
