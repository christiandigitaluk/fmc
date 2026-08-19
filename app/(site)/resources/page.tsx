import type { Metadata } from "next";
import { Download } from "lucide-react";
import { PageAccents } from "@/components/ui/PageAccents";

export const metadata: Metadata = {
  title: "Resources",
  description: "Download the circuit's preaching plan, church map and safeguarding policy.",
  alternates: { canonical: "/resources" },
};

type Resource = { title: string; description: string; href: string; size: string };

const RESOURCES: Resource[] = [
  {
    title: "Autumn preaching plan",
    description: "Service times, preachers and communion dates for every church, September to November 2026.",
    href: "/documents/preaching-plan-sept-nov-2026.pdf",
    size: "PDF · 158 KB",
  },
  {
    title: "Circuit overview map",
    description: "Where all ten churches sit across Waltham Forest, Wanstead and Loughton.",
    href: "/documents/Forest-Circuit-Overview-Map.pdf",
    size: "PDF · 9.2 MB",
  },
  {
    title: "Circuit Mission Strategy 2025–28",
    description: "The circuit's mission statement and the five priorities agreed by the Circuit Leadership Team.",
    // Spaces are percent-encoded here so the href is a valid URI, while the
    // file on disk keeps the readable name people see when they save it.
    href: "/documents/Circuit%20Mission%20Strategy%202025%20-%2028.pdf",
    size: "PDF · 480 KB",
  },
  {
    title: "Safeguarding policy 2025–26",
    description: "The circuit's full safeguarding policy, roles and responsibilities.",
    href: "/documents/safeguarding-policy-2025-26.pdf",
    size: "PDF · 590 KB",
  },
];

export default function ResourcesPage() {
  return (
    <div className="relative container-max max-w-3xl py-14 md:py-20">
      <PageAccents variant="arc" />
      <p className="eyebrow mb-3">Documents to download</p>
      <h1 style={{ fontSize: "var(--text-h1)" }} className="mb-6">
        Resources
      </h1>
      <p className="mb-10 text-[var(--text-body)]" style={{ fontSize: "var(--text-lead)" }}>
        The circuit&apos;s current printable documents, in one place.
      </p>

      <ul className="flex flex-col gap-4">
        {RESOURCES.map((resource) => (
          <li key={resource.href} className="rounded-[10px] border border-line-200 bg-white p-5 shadow-[var(--shadow-card)]">
            <a href={resource.href} target="_blank" rel="noreferrer" className="flex items-start justify-between gap-4">
              <div>
                <p className="font-bold text-[var(--text-heading)]">{resource.title}</p>
                <p className="mt-1 text-sm text-[var(--text-body)]">{resource.description}</p>
                <p className="mt-2 text-xs font-semibold uppercase tracking-wide text-[var(--text-muted)]">
                  {resource.size}
                </p>
              </div>
              <span
                aria-hidden="true"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-ink-900 bg-forest-100 text-ink-900"
              >
                <Download size={18} />
              </span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
