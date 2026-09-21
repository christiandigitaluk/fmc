import type { Metadata } from "next";
import { FeedbackForm } from "@/components/feedback/FeedbackForm";
import { PageAccents } from "@/components/ui/PageAccents";

export const metadata: Metadata = {
  title: "Website feedback",
  description: "Tell us what you think of the new Forest Circuit website.",
  alternates: { canonical: "/feedback" },
};

export default function FeedbackPage() {
  return (
    <div className="relative container-max py-14 md:py-20">
      <PageAccents variant="scatter" />
      <p className="eyebrow mb-3">Help us improve</p>
      <h1 style={{ fontSize: "var(--text-h1)" }} className="mb-4 max-w-2xl">
        What do you think of the new website?
      </h1>
      <p className="mb-10 max-w-2xl text-lg text-[var(--text-body)]" style={{ fontSize: "var(--text-lead)" }}>
        We&apos;d love to know how you&apos;re finding it. Just a few quick questions, it takes about a minute.
      </p>

      <div className="max-w-2xl rounded-[10px] border border-line-200 bg-white p-6 shadow-[var(--shadow-card)] sm:p-8">
        <FeedbackForm />
      </div>
    </div>
  );
}
