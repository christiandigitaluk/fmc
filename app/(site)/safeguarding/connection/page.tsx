import type { Metadata } from "next";
import { LinkList } from "@/components/legal/LinkList";

export const metadata: Metadata = {
  title: "Connection Safeguarding",
  description: "Safeguarding policies, guidelines and training resources from the wider Methodist Church.",
  alternates: { canonical: "/safeguarding/connection" },
};

const POLICIES_AND_GUIDELINES = [
  {
    label: "Care Act Guidance 2018",
    href: "https://www.gov.uk/government/publications/care-act-statutory-guidance/care-and-support-statutory-guidance",
  },
  {
    label: "Charity Commission — How to report a serious incident",
    href: "https://www.gov.uk/guidance/how-to-report-a-serious-incident-in-your-charity",
  },
  {
    label: "Domestic Abuse Guidelines",
    href: "https://www.methodist.org.uk/downloads/safe-update-6-1110-domestic-abuse-guidelines.pdf",
  },
  { label: "GDPR", href: "https://ico.org.uk/for-organisations/guide-to-the-general-data-protection-regulation-gdpr/" },
  { label: "Health and Safety Policy", href: "http://bit.do/healthandsafetypolicy" },
  {
    label: "Health and Safety Tips for Churches",
    href: "https://www.methodistinsurance.co.uk/risk-management/health-and-safety-advice/index.aspx",
  },
  { label: "Retaining Records — Best Practice", href: "https://www.methodist.org.uk/static/rm/document_retention.pdf" },
  {
    label: "Safeguarding Policy 2019",
    href: "https://www.methodist.org.uk/media/15910/bookmarked-safeguarding-policies-procedures-and-guidance-for-the-methodist-church-october-2019.pdf",
  },
  { label: "The Role of the Trustee", href: "https://www.methodist.org.uk/static/rm/role-of-a-trustee-text-only.pdf" },
];

const SOCIAL_MEDIA_GUIDELINES = [
  { label: "Guidance for children aged 5–10", href: "https://www.methodist.org.uk/media/3988/social-media-guidelines-for-children-5-10.pdf" },
  { label: "Guidance for parents", href: "https://www.methodist.org.uk/media/3986/social-media-guidelines-for-parents.pdf" },
  { label: "Guidance for workers", href: "https://www.methodist.org.uk/media/3990/social-media-guidelines-for-workers.pdf" },
  { label: "Guidance for young people aged 11–18", href: "https://www.methodist.org.uk/media/3987/social-media-guidelines-for-young-people-11-18.pdf" },
  { label: "Search engines for kids", href: "https://searchenginewatch.com/2017/11/13/4-safe-search-engines-for-kids/" },
  {
    label: "Social Media Policy Part I",
    href: "https://www.methodist.org.uk/for-ministers-and-office-holders/guidance-for-churches/technology-and-church/social-media-guidelines/",
  },
  { label: "Social Media Policy Part II", href: "https://www.methodist.org.uk/media/3992/conf_social_media_guidelines_part2_0710.pdf" },
  { label: "Training ideas for use with young people", href: "https://www.methodist.org.uk/media/3989/social-media-training-ideas.pdf" },
];

const TRAINING = [
  {
    label: "Creating Safer Places — Foundation Module Handbook",
    href: "https://www.methodist.org.uk/media/4321/2016_css_fm_and_fmr_handbook_inclwelshlegislation.pdf",
  },
  {
    label: "Creating Safer Places — Refresher Module Handbook",
    href: "https://www.methodist.org.uk/media/4321/2016_css_fm_and_fmr_handbook_inclwelshlegislation.pdf",
  },
  {
    label: "Creating Safer Places — Advanced Module Handbook (2018)",
    href: "https://www.methodist.org.uk/media/7485/2980-safeguarding-css-advanced-module-2018-participant-handbook.pdf",
  },
];

export default function ConnectionSafeguardingPage() {
  return (
    <div className="container-max max-w-3xl py-14 md:py-20">
      <p className="eyebrow mb-3">Wider Methodist Church resources</p>
      <h1 style={{ fontSize: "var(--text-h1)" }} className="mb-4">
        Connection safeguarding
      </h1>
      <p className="mb-10 text-[var(--text-body)]" style={{ fontSize: "var(--text-lead)" }}>
        Safeguarding policies, guidelines and training materials published by the Methodist Church and partner
        organisations, for use alongside our own{" "}
        <a href="/safeguarding" className="text-forest-600 hover:underline">
          circuit safeguarding policy
        </a>
        .
      </p>

      <section className="mb-10">
        <h2 style={{ fontSize: "var(--text-h3)" }} className="mb-4">
          Policies &amp; guidelines
        </h2>
        <LinkList links={POLICIES_AND_GUIDELINES} />
      </section>

      <section className="mb-10">
        <h2 style={{ fontSize: "var(--text-h3)" }} className="mb-4">
          Social media guidelines
        </h2>
        <LinkList links={SOCIAL_MEDIA_GUIDELINES} />
      </section>

      <section>
        <h2 style={{ fontSize: "var(--text-h3)" }} className="mb-4">
          Training
        </h2>
        <LinkList links={TRAINING} />
      </section>
    </div>
  );
}
