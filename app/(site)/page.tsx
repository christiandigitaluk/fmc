import { Hero } from "@/components/home/Hero";
import { FindAChurchBar } from "@/components/home/FindAChurchBar";
import { QuickActionsGrid } from "@/components/home/QuickActionsGrid";
import { CircuitMap } from "@/components/home/CircuitMap";
import { SectionDivider } from "@/components/ui/SectionDivider";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { NoticeStrip } from "@/components/news/NoticeStrip";
import { getChurches, getPosts, getNotices } from "@/lib/content";
import { cn } from "@/lib/cn";

export default async function HomePage() {
  const [churches, posts, notices] = await Promise.all([getChurches(), getPosts(), getNotices()]);
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
      <Hero />
      <FindAChurchBar areas={areas} />
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
        <div className="container-max py-16 md:py-24" aria-labelledby="news-heading">
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
    </>
  );
}
