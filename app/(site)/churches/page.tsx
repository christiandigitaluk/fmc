import type { Metadata } from "next";
import { ChurchDirectory } from "@/components/churches/ChurchDirectory";
import { getChurches } from "@/lib/content";

export const metadata: Metadata = {
  title: "Find a church",
  description: "Ten Methodist churches across Waltham Forest, Wanstead and Loughton. Find service times, ministers and facilities.",
  alternates: { canonical: "/churches" },
};

export default async function ChurchesPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const [allChurches, params] = await Promise.all([getChurches(), searchParams]);
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
      <ChurchDirectory churches={churches} initialQuery={params.q ?? ""} />
    </div>
  );
}
