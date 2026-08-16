import type { Metadata } from "next";
import { PreachingPlanExplorer } from "@/components/preaching-plan/PreachingPlanExplorer";
import { PageAccents } from "@/components/ui/PageAccents";
import { getPreachingPlan, getChurches } from "@/lib/content";

export const metadata: Metadata = {
  title: "Preaching plan",
  description: "Search the Forest Circuit quarterly preaching plan by preacher, church or date.",
  alternates: { canonical: "/preaching-plan" },
};

export default async function PreachingPlanPage() {
  const [entries, allChurches] = await Promise.all([getPreachingPlan(), getChurches()]);
  const churches = allChurches.filter((c) => c.worshipping !== false);

  return (
    <div className="relative container-max py-14 md:py-20">
      <PageAccents variant="plus" />
      <p className="eyebrow mb-3">Autumn quarter 2026</p>
      <h1 style={{ fontSize: "var(--text-h1)" }} className="mb-4 max-w-2xl">
        Circuit preaching plan
      </h1>
      <p className="mb-10 max-w-2xl text-lg text-[var(--text-body)]" style={{ fontSize: "var(--text-lead)" }}>
        See who is preaching, where and when, across all ten churches this quarter. Search by preacher, church or
        date, or print a copy for your noticeboard.
      </p>
      <PreachingPlanExplorer entries={entries} churches={churches} />
    </div>
  );
}
