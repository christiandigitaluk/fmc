import type { Metadata } from "next";
import Link from "next/link";
import { Mail } from "lucide-react";
import { LinkList } from "@/components/legal/LinkList";
import { PageAccents } from "@/components/ui/PageAccents";

export const metadata: Metadata = {
  title: "Safeguarding",
  description: "Forest Circuit's safeguarding principles, policies and contacts.",
  alternates: { canonical: "/safeguarding" },
};

const PRINCIPLES = [
  "the care and nurture of, and respectful pastoral ministry with, all children, young people and adults",
  "the safeguarding and protection of all children, young people and adults when they are vulnerable",
  "the establishing of safe, caring communities which provide a loving environment where there is informed vigilance as to the dangers of abuse",
];

const POLICY_DOCUMENTS = [
  {
    label: "Forest Circuit Safeguarding Policy 2025-26",
    href: "/documents/safeguarding-policy-2025-26.pdf",
  },
  {
    label: "Taking Children Off Site Policy",
    href: "https://uploads.documents.cimpress.io/v1/uploads/f227800c-bb2a-4470-8b0e-2f82ef5c1321~110/original?tenant=vbu-digital",
  },
  {
    label: "Agencies which provide information and support",
    href: "https://uploads.documents.cimpress.io/v1/uploads/62a4f52b-094f-4416-8b03-a2993cfb13b1~110/original?tenant=vbu-digital",
  },
  {
    label: "Other Support Agencies",
    href: "https://uploads.documents.cimpress.io/v1/uploads/8aaaebcd-2a27-466d-81b3-b28294082774~110/original?tenant=vbu-digital",
  },
];

export default function SafeguardingPage() {
  return (
    <div className="relative container-max max-w-3xl py-14 md:py-20">
      <PageAccents variant="blob" />
      <p className="eyebrow mb-3">Keeping our community safe</p>
      <h1 style={{ fontSize: "var(--text-h1)" }} className="mb-6">
        Safeguarding
      </h1>

      <p className="mb-6 text-[var(--text-body)]" style={{ fontSize: "var(--text-lead)" }}>
        Every person has a value and dignity which comes directly from the creation of male and female in
        God&apos;s own image and likeness. Christians see this potential as fulfilled by God&apos;s recreation of
        us in Christ. Among other things this implies a duty to value all people as bearing the image of God and
        therefore to protect them from harm.
      </p>

      <h2 style={{ fontSize: "var(--text-h3)" }} className="mb-3">
        Our principles
      </h2>
      <p className="mb-3 text-[var(--text-body)]">We are committed to:</p>
      <ul className="mb-6 flex list-disc flex-col gap-2 pl-5 text-[var(--text-body)]">
        {PRINCIPLES.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>

      <div className="mb-8 flex flex-col gap-3 text-[var(--text-body)]">
        <p>
          We will carefully select and train all those with any responsibility within the Church, in line with
          Safer Recruitment principles, including the use of criminal records disclosures and registration with
          the relevant vetting and barring schemes.
        </p>
        <p>
          We will respond without delay to every complaint made which suggests that an adult, child or young
          person may have been harmed, cooperating with the police and local authority in any investigation.
        </p>
        <p>
          We will seek to work with anyone who has suffered abuse, developing with them an appropriate ministry
          of informed pastoral care, and will seek to challenge any abuse of power, especially by anyone in a
          position of trust.
        </p>
        <p>
          We will seek to offer pastoral care and support, including supervision and referral to the proper
          authorities, to any member of our church community known to have offended against a child, young
          person or vulnerable adult. In all these principles we will follow legislation, guidance and
          recognised good practice.
        </p>
      </div>

      <div className="mb-10 rounded-[10px] border-2 border-ink-900 bg-forest-100 p-5">
        <p className="text-[var(--text-body)]">
          <strong>John Marange</strong> is the Safeguarding Officer for Forest Circuit.
        </p>
        <a
          href="mailto:forestsafeguarding@outlook.com"
          className="mt-1 inline-flex items-center gap-2 font-semibold text-forest-700"
        >
          <Mail size={16} aria-hidden="true" />
          forestsafeguarding@outlook.com
        </a>
      </div>

      <h2 style={{ fontSize: "var(--text-h3)" }} className="mb-3">
        Policy documents
      </h2>
      <p className="mb-4 text-[var(--text-body)]">
        The Forest Circuit&apos;s general safeguarding policies are contained within the documents listed below.
      </p>
      <LinkList links={POLICY_DOCUMENTS} />

      <p className="mt-10 text-sm text-[var(--text-muted)]">
        See also{" "}
        <Link href="/safeguarding/connection" className="text-forest-600 hover:underline">
          Connection safeguarding
        </Link>{" "}
        and{" "}
        <Link href="/safeguarding/data-protection" className="text-forest-600 hover:underline">
          data protection
        </Link>
        .
      </p>
    </div>
  );
}
