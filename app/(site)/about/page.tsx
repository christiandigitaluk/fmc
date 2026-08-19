import type { Metadata } from "next";
import Link from "next/link";
import { PageAccents } from "@/components/ui/PageAccents";

export const metadata: Metadata = {
  title: "About us",
  description: "About Forest Methodist Circuit: our mission and our area.",
  alternates: { canonical: "/about" },
};

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
          The Superintendent of Forest Methodist Circuit is <strong>Revd Mike Long</strong>. Meet the rest of the
          team on our{" "}
          <Link href="/staff" className="text-forest-600 hover:underline">
            circuit staff
          </Link>{" "}
          page.
        </p>
      </div>

      <div className="rounded-[10px] border-2 border-ink-900 bg-forest-100 p-6">
        <p className="eyebrow mb-3">Circuit mission statement</p>
        <p className="text-[var(--text-body)]">
          The London Forest Methodist Circuit is committed to furthering God&apos;s kingdom by: enabling and
          supporting local churches in the growth of their discipleship and mission; resourcing local churches under
          the power of the Holy Spirit to function as effective centres for worship, witness and community
          wellbeing; and seeking new developments in mission between and beyond the existing churches.
        </p>
      </div>
    </div>
  );
}
