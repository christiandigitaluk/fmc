import type { Metadata } from "next";
import { LinkList } from "@/components/legal/LinkList";
import { PageAccents } from "@/components/ui/PageAccents";

export const metadata: Metadata = {
  title: "Useful Links",
  description: "Links to the wider Methodist Church and related organisations.",
  alternates: { canonical: "/useful-links" },
};

const LINKS = [
  { label: "Methodist Church Great Britain", href: "http://www.methodist.org.uk/" },
  {
    label: "3Generate — Methodist Children and Youth Assembly",
    href: "https://www.methodist.org.uk/our-work/children-youth-family-ministry/events-including-3generate/3generate/",
  },
  {
    label: "What is distinctive about Methodism",
    href: "https://www.methodist.org.uk/about-us/the-methodist-church/what-is-distinctive-about-methodism/",
  },
  { label: "London District of the Methodist Church", href: "http://www.methodistlondon.org.uk/" },
  { label: "Wesley's Chapel and Leysian Mission, City Road, London", href: "https://www.wesleyschapel.org.uk/" },
  { label: "Methodist Central Hall, Storey's Gate, London", href: "https://www.mchw.live/" },
  { label: "The New Room, Bristol", href: "http://www.newroombristol.org.uk/" },
  { label: "Mow Cop, Staffordshire", href: "http://www.methodistheritage.org.uk/mowcop.htm" },
  { label: "Epworth Old Rectory, Lincolnshire", href: "https://www.epwortholdrectory.org.uk/index.php" },
  { label: "Methodist Insurance", href: "https://www.methodistinsurance.co.uk/" },
  { label: "United Methodist Church, USA", href: "http://www.umc.org/" },
  { label: "Korean Methodist Church", href: "https://kmc.or.kr/eng-home" },
  { label: "Churches Together in England", href: "https://cte.org.uk/" },
  { label: "Churches Together in Britain and Ireland", href: "https://ctbi.org.uk/" },
  { label: "World Council of Churches", href: "https://www.oikoumene.org/" },
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
        Links to the wider Methodist Church and related organisations.
      </p>
      <LinkList links={LINKS} />
    </div>
  );
}
