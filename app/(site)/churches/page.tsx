import type { Metadata } from "next";
import { Suspense } from "react";
import { ChurchDirectory } from "@/components/churches/ChurchDirectory";
import { getChurches } from "@/lib/content";

export const metadata: Metadata = {
  title: "Find a church",
  description: "Ten Methodist churches across Waltham Forest, Wanstead and Loughton. Find service times, ministers and facilities.",
  alternates: { canonical: "/churches" },
};

export default async function ChurchesPage() {
  const allChurches = await getChurches();
  const churches = allChurches.filter((c) => c.worshipping !== false);

  return (
    <div className="container-max py-14 md:py-20">
      <p className="eyebrow mb-3">Ten churches, one circuit</p>
      <h1 style={{ fontSize: "var(--text-h1)" }} className="mb-4 max-w-2xl">
        Find a church near you
      </h1>
      <p className="mb-10 max-w-2xl text-lg text-[var(--text-body)]" style={{ fontSize: "var(--text-lead)" }}>
        Every church in Forest Circuit offers a warm welcome, whatever your background or story. Search by name,
        area or postcode to find your nearest congregation.
      </p>
      {/* Suspense required by useSearchParams inside ChurchDirectory, which
          is what lets this page stay static instead of every visit being
          rendered fresh on the server (same fix as /venue-hire). Fallback
          only shows during the initial SSR stream, not client navigations. */}
      <Suspense fallback={<div className="h-96 animate-pulse rounded-[10px] bg-white" />}>
        <ChurchDirectory churches={churches} />
      </Suspense>
    </div>
  );
}
