import type { Metadata } from "next";
import { Mail } from "lucide-react";
import { PageAccents } from "@/components/ui/PageAccents";

export const metadata: Metadata = {
  title: "About us",
  description: "About Forest Methodist Circuit — our mission, our area, and our ministers.",
  alternates: { canonical: "/about" },
};

const MINISTERS = [
  { name: "Rev Mike Long", role: "Superintendent minister", churches: "Leytonstone and Cann Hall", email: "mike.long@methodist.org.uk" },
  { name: "Rev Sue Creighton", role: "Minister", churches: "Loughton and Trinity Debden", email: "suegriffiths@mybroadbandmail.com" },
  { name: "Rev Stephanie Njeru", role: "Minister", churches: "Leyton, Lighthouse and Winchester Road", email: "stephanie.njeru@methodist.org.uk" },
  { name: "Rev Kong Ching Hii", role: "Minister", churches: "Shern Hall and Woodford", email: "kongching.hii@methodist.org.uk" },
];

export default function AboutPage() {
  return (
    <div className="relative container-max max-w-3xl py-14 md:py-20">
      <PageAccents variant="rings" />
      <p className="eyebrow mb-3">Who we are</p>
      <h1 style={{ fontSize: "var(--text-h1)" }} className="mb-6">
        About Forest Circuit
      </h1>

      <div className="mb-10 flex flex-col gap-4 text-[var(--text-body)]" style={{ fontSize: "var(--text-lead)" }}>
        <p>
          Forest Circuit is in the London District of the Methodist Church. We comprise ten churches with a very
          diverse demographic within the circuit.
        </p>
        <p>
          The circuit covers a wide area from Loughton, Essex in the north, continuing south to Leytonstone E11,
          and includes churches in Chingford, Leyton, Leytonstone and Woodford.
        </p>
        <p>
          The Superintendent of Forest Methodist Circuit is <strong>Rev Mike Long</strong>.
        </p>
      </div>

      <div className="mb-12 rounded-[10px] border-2 border-ink-900 bg-forest-100 p-6">
        <p className="eyebrow mb-3">Circuit mission statement</p>
        <p className="text-[var(--text-body)]">
          Forest Circuit exists to further God&apos;s kingdom by enabling and supporting local churches in their
          discipleship and mission; resourcing local churches under the power of the Holy Spirit to function as
          effective worship, witness, and welfare centres.
        </p>
      </div>

      <h2 style={{ fontSize: "var(--text-h3)" }} className="mb-6">
        Circuit ministers
      </h2>
      <ul className="flex flex-col gap-4">
        {MINISTERS.map((minister) => (
          <li key={minister.email} className="rounded-[10px] border border-line-200 bg-white p-5 shadow-[var(--shadow-card)]">
            <p className="font-bold text-[var(--text-heading)]">{minister.name}</p>
            <p className="text-sm text-[var(--text-muted)]">
              {minister.role} &middot; {minister.churches}
            </p>
            <a href={`mailto:${minister.email}`} className="mt-2 inline-flex items-center gap-2 text-sm font-semibold text-forest-600">
              <Mail size={14} aria-hidden="true" />
              {minister.email}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
