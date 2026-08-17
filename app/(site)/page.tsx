import { Hero } from "@/components/home/Hero";
import { FindAChurchBar } from "@/components/home/FindAChurchBar";
import { QuickActionsGrid } from "@/components/home/QuickActionsGrid";
import { CircuitMap } from "@/components/home/CircuitMap";
import { SectionDivider } from "@/components/ui/SectionDivider";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { getChurches, getPosts } from "@/lib/content";

export default async function HomePage() {
  const [churches, posts] = await Promise.all([getChurches(), getPosts()]);
  const areas = Array.from(new Set(churches.map((c) => c.area))).sort();
  const latestPosts = posts.slice(0, 3);

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

      <section className="slant-top bg-forest-100">
        <div className="container-max py-16 md:py-24" aria-labelledby="news-heading">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="eyebrow mb-3">From the circuit</p>
              <h2 id="news-heading" style={{ fontSize: "var(--text-h2)" }}>
                News &amp; community stories
              </h2>
            </div>
            <Button href="/news" variant="secondary">
              Read all news
            </Button>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {latestPosts.map((post) => (
              <Card
                key={post.slug}
                href={`/news/${post.slug}`}
                image={post.coverImage}
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
        </div>
      </section>
    </>
  );
}
