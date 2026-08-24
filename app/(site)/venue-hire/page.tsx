import type { Metadata } from "next";
import { Suspense } from "react";
import { HallHireForm } from "@/components/hall-hire/HallHireForm";
import { WansteadSpotlight } from "@/components/hall-hire/WansteadSpotlight";
import { PageAccents } from "@/components/ui/PageAccents";
import { getChurches } from "@/lib/content";

export const metadata: Metadata = {
  title: "Venue hire",
  description: "Enquire about hiring a hall or meeting space at one of our ten churches across East London and Essex.",
  alternates: { canonical: "/venue-hire" },
};

export default async function HallHirePage() {
  const churches = await getChurches();

  return (
    <div className="relative container-max max-w-3xl py-14 md:py-20">
      <PageAccents variant="diamond" />
      <p className="eyebrow mb-3">Community spaces</p>
      <h1 style={{ fontSize: "var(--text-h1)" }} className="mb-4">
        Hall &amp; premises hire
      </h1>
      <p className="mb-10 text-lg text-[var(--text-body)]" style={{ fontSize: "var(--text-lead)" }}>
        Our churches offer warm, affordable spaces for local groups, classes, celebrations and community
        organisations. Tell us what you need and a member of our team will be in touch.
      </p>

      <WansteadSpotlight website={churches.find((c) => c.slug === "wanstead")?.website} />

      <h2 id="enquiry" style={{ fontSize: "var(--text-h3)" }} className="mb-6 scroll-mt-28">
        Make an enquiry
      </h2>
      {/* Suspense boundary required by useSearchParams inside HallHireForm,
          which is what lets this page stay static instead of every visit
          being rendered fresh on the server. The fallback only shows during
          the initial SSR stream, not on client navigations, so a plain
          height-matched placeholder is enough — no need to hand-maintain a
          full field-by-field skeleton that could drift from the real form. */}
      <Suspense fallback={<div className="h-96 animate-pulse rounded-[10px] bg-white" />}>
        <HallHireForm churches={churches} />
      </Suspense>
    </div>
  );
}
