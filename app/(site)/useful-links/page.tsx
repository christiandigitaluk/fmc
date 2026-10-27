import type { Metadata } from "next";
import { LinkList } from "@/components/legal/LinkList";
import { PageAccents } from "@/components/ui/PageAccents";

export const metadata: Metadata = {
  title: "Useful Links",
  description:
    "Links to the wider Methodist Church, including the Methodist Church in Britain, the London District and Methodist Central Hall.",
  alternates: { canonical: "/useful-links" },
};

const LINKS = [
  { label: "Methodist Church Great Britain", href: "https://www.methodist.org.uk/" },
  {
    label: "3Generate: Methodist Children and Youth Assembly",
    href: "https://www.methodist.org.uk/for-churches/ministries/children-youth-family-ministry/3generate/",
  },
  {
    label: "What is distinctive about Methodism",
    href: "https://www.methodist.org.uk/about/what-is-distinctive-about-methodism/",
  },
  { label: "London District of the Methodist Church", href: "https://www.methodistlondon.org.uk/" },
  { label: "Methodist Central Hall, Storey's Gate, London", href: "https://www.mchw.live/" },
];

export default function UsefulLinksPage() {
  return (
    <div className="relative container-max max-w-3xl py-14 md:py-20">
      <PageAccents variant="arc" />
      <p className="eyebrow mb-3">Beyond the circuit</p>
      <h1 style={{ fontSize: "var(--text-h1)" }} className="mb-6">
        Useful links
      </h1>
      <p className="mb-8 text-[var(--text-body)]" style={{ fontSize: "var(--text-lead)" }}>
        Links to the wider Methodist Church.
      </p>
      <LinkList links={LINKS} />
    </div>
  );
}
