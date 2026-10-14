import type { Metadata } from "next";
import { Mail, Phone } from "lucide-react";
import { PageAccents } from "@/components/ui/PageAccents";

export const metadata: Metadata = {
  title: "Prayer",
  description: "Join a small group praying online for one another and for Forest Circuit every Monday morning.",
  alternates: { canonical: "/prayer" },
};

export default function PrayerPage() {
  return (
    <div className="relative container-max max-w-3xl py-14 md:py-20">
      <PageAccents variant="rings" />
      <p className="eyebrow mb-3">Pray with us</p>
      <h1 style={{ fontSize: "var(--text-h1)" }} className="mb-6">
        Prayer for Forest Circuit
      </h1>

      <p
        className="mb-6 font-bold text-[var(--text-heading)]"
        style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-h3)" }}
      >
        When we pray, God works.
      </p>

      <div className="mb-10 flex flex-col gap-4 text-[var(--text-body)]" style={{ fontSize: "var(--text-lead)" }}>
        <p>
          We believe that prayer makes a difference. Ultimately, we depend on our Heavenly Father to guide us and
          fulfil his purposes among us.
        </p>
        <p>
          For the past year, a small group has been meeting online at 9.00am each Monday morning, to pray for one
          another and for Forest Circuit.
        </p>
        <p>
          We&apos;d love you to join us! There&apos;s no need to make a regular commitment; you&apos;d be very
          welcome to come along, find out more and try it out.
        </p>
        <p>
          Our hope is to see more people praying for the Circuit each week, with small groups of three meeting at the
          same time and following the same simple format.
        </p>
      </div>

      <div className="rounded-[10px] border-2 border-ink-900 bg-forest-100 p-6">
        <p className="eyebrow mb-3">Interested?</p>
        <p className="mb-4 text-[var(--text-body)]">
          To find out more or to join us, please contact <strong>David Bishop</strong>.
        </p>
        <div className="flex flex-col gap-2 sm:flex-row sm:gap-6">
          <a href="tel:07458002275" className="inline-flex items-center gap-2 font-semibold text-forest-600">
            <Phone size={16} aria-hidden="true" />
            07458 002275
          </a>
          <a
            href="mailto:operations@forestcircuit.org.uk"
            className="inline-flex min-w-0 items-center gap-2 font-semibold text-forest-600"
          >
            <Mail size={16} className="shrink-0" aria-hidden="true" />
            <span className="min-w-0 break-words">operations@forestcircuit.org.uk</span>
          </a>
        </div>
      </div>
    </div>
  );
}
