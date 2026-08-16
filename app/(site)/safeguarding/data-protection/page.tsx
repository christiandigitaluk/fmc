import type { Metadata } from "next";
import { LinkList } from "@/components/legal/LinkList";

export const metadata: Metadata = {
  title: "Data Protection",
  description: "Forest Circuit's privacy notice, data protection policy and data security policy.",
  alternates: { canonical: "/safeguarding/data-protection" },
};

const DOCUMENTS = [
  {
    label: "Privacy notice",
    href: "https://uploads.documents.cimpress.io/v1/uploads/51d429cd-bd0c-46cb-a341-bbf7510b1129~110/original?tenant=vbu-digital",
  },
  {
    label: "Data protection policy",
    href: "https://uploads.documents.cimpress.io/v1/uploads/e6dcce21-b404-4299-ade5-6ff0b7d7df46~110/original?tenant=vbu-digital",
  },
  {
    label: "Data security policy",
    href: "https://uploads.documents.cimpress.io/v1/uploads/e747aff3-747a-4b9a-abab-d13eface299a~110/original?tenant=vbu-digital",
  },
];

export default function DataProtectionPage() {
  return (
    <div className="container-max max-w-3xl py-14 md:py-20">
      <p className="eyebrow mb-3">How we handle your information</p>
      <h1 style={{ fontSize: "var(--text-h1)" }} className="mb-6">
        Data protection
      </h1>
      <p className="mb-8 text-[var(--text-body)]" style={{ fontSize: "var(--text-lead)" }}>
        Forest Circuit is committed to protecting the personal information of everyone who worships with us,
        volunteers, hires our spaces or gets in touch. Our full policies are available below.
      </p>
      <LinkList links={DOCUMENTS} />
    </div>
  );
}
