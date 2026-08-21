import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PortableText, type PortableTextBlock } from "@portabletext/react";
import { Badge } from "@/components/ui/Badge";
import { portableTextComponents } from "@/components/PortableTextComponents";
import { ShareArticle } from "@/components/news/ShareArticle";
import { SITE_ORIGIN } from "@/lib/siteOrigin";
import { getPost, getPosts } from "@/lib/content";

export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return { title: "Story not found" };
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/news/${post.slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      url: `/news/${post.slug}`,
      publishedTime: post.publishedAt,
      images: post.coverImage ? [{ url: post.coverImage }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: post.coverImage ? [post.coverImage] : undefined,
    },
  };
}

function isPortableText(body: unknown): body is PortableTextBlock[] {
  return Array.isArray(body) && body.length > 0 && typeof body[0] === "object";
}

export default async function NewsArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  const articleUrl = `${SITE_ORIGIN}/news/${post.slug}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    image: post.coverImage ? [post.coverImage] : undefined,
    datePublished: post.publishedAt,
    author: { "@type": "Organization", name: "Forest Methodist Circuit" },
    publisher: { "@type": "Organization", name: "Forest Methodist Circuit" },
    mainEntityOfPage: { "@type": "WebPage", "@id": articleUrl },
  };

  return (
    <article>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {/*
        No ink overlay here, unlike the church hero. Nothing sits on top of this
        image (the date and title are below it), so the scrim served no legibility
        purpose and only muted the cover. It turned the white logo on the brand
        share graphic grey.
      */}
      <div className="relative h-64 w-full overflow-hidden md:h-96">
        <Image src={post.coverImage} alt="" fill priority sizes="100vw" className="object-cover" />
      </div>

      <div className="container-max max-w-3xl py-14 md:py-20">
        <p className="mb-3 text-sm text-[var(--text-muted)]">
          {new Date(post.publishedAt).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}
        </p>
        <h1 style={{ fontSize: "var(--text-h1)" }} className="mb-5">
          {post.title}
        </h1>
        <div className="mb-8 flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <Badge key={tag} tone="forest">
              {tag}
            </Badge>
          ))}
        </div>

        <div className="flex flex-col gap-5 text-lg text-[var(--text-body)]" style={{ fontSize: "var(--text-lead)" }}>
          {isPortableText(post.body) ? (
            <PortableText value={post.body} components={portableTextComponents} />
          ) : (
            (post.body as string[]).map((paragraph, i) => <p key={i}>{paragraph}</p>)
          )}
        </div>

        <ShareArticle url={articleUrl} title={post.title} />

        <p className="mt-12">
          <Link href="/news" className="text-forest-600">
            ← Back to all news
          </Link>
        </p>
      </div>
    </article>
  );
}
