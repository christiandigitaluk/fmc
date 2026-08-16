import type { Metadata } from "next";
import { Alert } from "@/components/ui/Alert";
import { PageAccents } from "@/components/ui/PageAccents";
import { getJobVacancies } from "@/lib/content";

export const metadata: Metadata = {
  title: "Jobs",
  description: "Current job vacancies at Forest Methodist Circuit.",
  alternates: { canonical: "/jobs" },
};

export default async function JobsPage() {
  const vacancies = await getJobVacancies();

  return (
    <div className="relative container-max max-w-3xl py-14 md:py-20">
      <PageAccents variant="confetti" />
      <p className="eyebrow mb-3">Work with us</p>
      <h1 style={{ fontSize: "var(--text-h1)" }} className="mb-6">
        Jobs
      </h1>
      <p className="mb-10 text-[var(--text-body)]" style={{ fontSize: "var(--text-lead)" }}>
        From time to time Forest Circuit advertises paid roles alongside our churches&apos; many volunteering
        opportunities. Current vacancies are listed below.
      </p>

      {vacancies.length === 0 ? (
        <Alert tone="info" title="No current vacancies">
          There are no paid roles advertised at the moment. Please check back soon, or{" "}
          <a href="mailto:office@forestcircuit.co.uk" className="font-semibold underline">
            get in touch
          </a>{" "}
          if you&apos;d like to be notified when a position opens.
        </Alert>
      ) : (
        <ul className="flex flex-col gap-6">
          {vacancies.map((job) => (
            <li key={job.title} className="rounded-[10px] border-2 border-ink-900 bg-white p-6 shadow-[var(--shadow-card)]">
              <h2 style={{ fontSize: "var(--text-h3)" }} className="mb-3">
                {job.title}
              </h2>
              <ul className="mb-4 flex flex-col gap-1 text-sm text-[var(--text-body)]">
                <li>Salary: {job.salary}</li>
                <li>Hours: {job.hours}</li>
                <li>Closing date: {job.closingDate}</li>
              </ul>
              <div className="flex flex-wrap gap-4 text-sm font-semibold text-forest-600">
                {job.advertHref && (
                  <a href={job.advertHref} target="_blank" rel="noreferrer">
                    Job advert
                  </a>
                )}
                {job.descriptionHref && (
                  <a href={job.descriptionHref} target="_blank" rel="noreferrer">
                    Job description
                  </a>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
