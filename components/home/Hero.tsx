import Image from "next/image";
import { Button } from "@/components/ui/Button";

export function Hero() {
  return (
    <section className="slant-bottom relative overflow-hidden bg-forest-100">
      {/* Decorative accent shape */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-28 left-1/3 hidden h-64 w-64 rounded-full border-2 border-forest-700/25 lg:block"
      />

      {/* A little orange warmth in the top corner, to answer the badge on the
          photo below it. An outline rather than a fill — orange is the accent
          in this palette, not a surface. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 -top-28 h-64 w-64 rounded-full border-2 border-orange-500/30 sm:-right-20 sm:h-80 sm:w-80"
      />

      <div className="container-max relative grid gap-12 py-20 md:py-28 lg:grid-cols-[1.05fr_1fr] lg:items-center">
        <div>
          <span className="sticker mb-6 inline-flex -rotate-2 items-center rounded-full bg-white px-6 py-3 text-lg font-extrabold uppercase tracking-wide text-ink-900 md:text-xl">
            Forest Methodist Circuit
          </span>
          <h1
            className="max-w-2xl font-bold text-ink-900"
            style={{ fontSize: "var(--text-hero)", lineHeight: "var(--leading-display)", letterSpacing: "var(--tracking-display)" }}
          >
            Worship, witness, and community wellbeing in East London &amp; Essex.
          </h1>
          <p className="mt-6 max-w-lg text-ink-600" style={{ fontSize: "var(--text-lead)" }}>
            We are ten Methodist churches across Waltham Forest, Wanstead and Loughton. Heaven touching earth,
            we warmly invite you to join us.
          </p>
          <div className="mt-9 flex flex-wrap gap-4">
            <Button href="/churches" variant="primary" size="lg">
              Find a church near you
            </Button>
            <Button href="/preaching-plan" variant="secondary" size="lg">
              Circuit preaching plan
            </Button>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-md lg:mx-0 lg:max-w-none lg:justify-self-stretch">
          <span className="sticker absolute -right-4 -top-5 z-10 hidden rotate-6 items-center rounded-full bg-orange-500 px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-ink-900 sm:inline-flex">
            Worship together
          </span>
          <div className="sticker rotate-1 overflow-hidden rounded-[20px] bg-white p-2">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[14px]">
              <Image
                src="/images/hero-worship.png"
                alt="Members of the congregation singing together from hymn books during a Sunday service"
                fill
                sizes="(min-width: 1024px) 45vw, 90vw"
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
