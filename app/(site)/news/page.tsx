import type { Metadata } from "next";
import { Card } from "@/components/ui/Card";
import { PageAccents } from "@/components/ui/PageAccents";
import { getPosts } from "@/lib/content";

export const metadata: Metadata = {
  title: "News",
  description: "Stories, updates and news from across Forest Circuit's ten churches.",
  alternates: { canonical: "/news" },
};

export default async function NewsPage() {
  const posts = await getPosts();

  return (
    <div className="relative container-max py-14 md:py-20">
      <PageAccents variant="nested" />
      <p className="eyebrow mb-3">From the circuit</p>
      <h1 style={{ fontSize: "var(--text-h1)" }} className="mb-4 max-w-2xl">
        News &amp; community stories
      </h1>
      <p className="mb-10 max-w-2xl text-lg text-[var(--text-body)]" style={{ fontSize: "var(--text-lead)" }}>
        Updates, reflections and stories from our churches and the communities we serve.
      </p>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <Card
            key={post.slug}
            href={`/news/${post.slug}`}
            image={post.coverImage}
            imageOverlay
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
  );
}
