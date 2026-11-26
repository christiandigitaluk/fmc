import { Hero } from "@/components/home/Hero";
import { FindAChurchBar } from "@/components/home/FindAChurchBar";
import { QuickActionsGrid } from "@/components/home/QuickActionsGrid";
import { CircuitMap } from "@/components/home/CircuitMap";
import { EventPosterWidget } from "@/components/home/EventPosterWidget";
import { SectionDivider } from "@/components/ui/SectionDivider";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { NoticeStrip } from "@/components/news/NoticeStrip";
import { getChurches, getPosts, getNotices, getEvents } from "@/lib/content";
import { FeaturedEvent } from "@/components/home/FeaturedEvent";
import { cn } from "@/lib/cn";
import { BASE_OPEN_GRAPH, HOME_TITLE, SITE_DESCRIPTION } from "@/lib/seo";
import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
  openGraph: { ...BASE_OPEN_GRAPH, title: HOME_TITLE, description: SITE_DESCRIPTION, url: "/" },
  twitter: { card: "summary_large_image", title: HOME_TITLE, description: SITE_DESCRIPTION },
};

/**
 * Tells Google the site's name, so results show "Forest Methodist Circuit"
 * above the link rather than the bare domain. Google reads this from the home
 * page only.
 */
const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Forest Methodist Circuit",
  alternateName: "Forest Circuit",
  url: "https://www.forestcircuit.co.uk/",
};

export default async function HomePage() {
  const [churches, posts, notices, events] = await Promise.all([getChurches(), getPosts(), getNotices(), getEvents()]);
  // getEvents drops events once they have ended, so this goes undefined, and
  // the spotlight disappears, as soon as the bazaar is over. Swap the slug
  // (and the copy below) for the next major event.
  const featured = events.find((e) => e.slug === "christmas-bazaar-winchester-road-2026");
  const areas = Array.from(new Set(churches.map((c) => c.area))).sort();
  const latestPosts = posts.slice(0, 3);
  // Matches the grid layout directly below: below three posts the section
  // narrows to max-w-3xl (768px) instead of the full container. Card's
  // default sizes hint assumes the standard 3-up grid, which is wrong here
  // whenever there are fewer posts — a card can render at up to double what
  // that hint claims, so the browser fetches an image too small for the box
  // and quietly upscales it. Only visible as softness on ordinary screens,
  // since a Retina display's extra pixel density happens to paper over it.
  const newsCardSizes =
    latestPosts.length >= 3
      ? undefined // Card's own default already matches this layout
      : latestPosts.length === 2
        ? "(min-width: 640px) 384px, 100vw"
        : "(min-width: 768px) 768px, 100vw";

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }} />
      <Hero />
      <FindAChurchBar areas={areas} />
      {featured && (
        <FeaturedEvent
          event={featured}
          church={churches.find((c) => c.slug === featured.churchSlug)}
          lead="Winchester Road's much-loved Christmas Bazaar is back. Bring the family, find a gift and stay for lunch."
          highlights={["Santa's Grotto", "Homemade cakes", "Christmas gifts & crafts", "Tea, coffee & lunches", "Jams & sweets"]}
          admission="Entrance £1, children free"
        />
      )}
      <QuickActionsGrid />
      <SectionDivider />

      <section className="container-max pb-16 pt-8 md:pb-24 md:pt-12" aria-labelledby="churches-heading">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow mb-3">Ten churches, one circuit</p>
            <h2 id="churches-heading" style={{ fontSize: "var(--text-h2)" }}>
              A warm welcome, wherever you are
            </h2>
          </div>
          <Button href="/churches" variant="secondary">
            View all churches
          </Button>
        </div>
        <div
          className="sticker overflow-hidden rounded-[20px] bg-white p-3"
          style={{ borderColor: "var(--orange-500)" }}
        >
          <CircuitMap />
        </div>
      </section>

      {/*
        With only one article live, a 3-column grid left two-thirds of the
        row empty and stranded "Read all news" over that blank space. Below
        three posts, the block narrows to fit what is actually there and the
        button moves under the cards instead of floating beside the heading.
        Revert to the plain header-row layout once there are three or more
        posts and this bit of scaffolding is no longer earning its keep.
      */}
      <section className="slant-top bg-forest-100">
        {/* Bottom padding is deliberately smaller than the top: the top
            needs room for the slant-top clip, but the bottom runs straight
            into the newsletter band below, and the noticeboard strip that
            now ends the section is only a few lines of inline text — the
            full 96px used to read as a lot of bare green underneath it. */}
        <div className="container-max pt-16 pb-8 md:pt-24 md:pb-12" aria-labelledby="news-heading">
          <div className={cn("mb-10", latestPosts.length >= 3 ? "mx-auto max-w-none" : "mx-auto max-w-3xl")}>
            <div
              className={cn(
                "mb-10 flex flex-wrap gap-4",
                latestPosts.length >= 3 ? "items-end justify-between" : "flex-col items-start"
              )}
            >
              <div>
                <p className="eyebrow mb-3">From the circuit</p>
                <h2 id="news-heading" style={{ fontSize: "var(--text-h2)" }}>
                  News &amp; community stories
                </h2>
              </div>
              {latestPosts.length >= 3 && (
                <Button href="/news" variant="secondary">
                  Read all news
                </Button>
              )}
            </div>

            <div
              className={cn(
                "grid gap-6",
                latestPosts.length >= 3
                  ? "sm:grid-cols-2 lg:grid-cols-3"
                  : latestPosts.length === 2
                    ? "sm:grid-cols-2"
                    : "grid-cols-1"
              )}
            >
              {latestPosts.map((post) => (
                <Card
                  key={post.slug}
                  href={`/news/${post.slug}`}
                  image={post.coverImage}
                  sizes={newsCardSizes}
                  eyebrow={new Date(post.publishedAt).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                  title={post.title}
                  footer="Read more →"
                >
                  {post.excerpt}
                </Card>
              ))}
            </div>

            {latestPosts.length < 3 && (
              <Button href="/news" variant="secondary" className="mt-6">
                Read all news
              </Button>
            )}
          </div>

          <NoticeStrip notices={notices} />
        </div>
      </section>

      {/* Retires itself once endsAt has passed, so this can stay in place
          afterwards. Swap the details (and the id) for the next one. */}
      <EventPosterWidget
        id="christmas-bazaar-winchester-road-2026"
        badge="Christmas Bazaar"
        title="Winchester Road, 10am to 3pm"
        startsAt="2026-11-28T10:00:00"
        endsAt="2026-11-28T15:00:00"
        cta={{ label: "See it on the events page", href: "/events#christmas-bazaar-winchester-road-2026" }}
        poster={{
          src: "/images/christmas-bazaar-winchester-road-2026-poster.webp",
          width: 595,
          height: 839,
          alt: "Christmas Bazaar at Winchester Road Methodist Church, Saturday 28 November, 10am to 3pm. Santa's Grotto, homemade cakes, Christmas gifts and crafts, tea, coffee and lunches, jams and sweets. Entrance £1, children free.",
        }}
      />
    </>
  );
}
