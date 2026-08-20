import type { Metadata } from "next";
import { Mail, Phone } from "lucide-react";
import { PageAccents } from "@/components/ui/PageAccents";

export const metadata: Metadata = {
  title: "Circuit Staff",
  description: "Meet the officers, ministers and lay staff of Forest Methodist Circuit.",
  alternates: { canonical: "/staff" },
};

type Person = { name: string; role: string; email: string; phone?: string; dayOff?: string };

const OFFICERS: Person[] = [
  { name: "Florestine Corbett", role: "Circuit Steward", email: "flo_corbett@hotmail.com" },
  { name: "Eric Aidoo", role: "Circuit Steward", email: "aidoobaker@yahoo.com" },
  { name: "John Marange", role: "Safeguarding Officer", email: "forestsafeguarding@outlook.com" },
  { name: "Dallion Roye", role: "Meeting Secretary", email: "d.roye818@btinternet.com" },
];

const MINISTERS: Person[] = [
  { name: "Revd Mike Long", role: "Superintendent", phone: "07458 002274", email: "mike.long@methodist.org.uk" },
  { name: "Revd Sue Creighton", role: "Minister", phone: "07961 897445", email: "suegriffiths@mybroadbandmail.com", dayOff: "Friday" },
  { name: "Revd Kong Ching Hii", role: "Minister", phone: "07458 050834", email: "kongching.hii@methodist.org.uk", dayOff: "Friday" },
  { name: "Revd Stephanie Njeru", role: "Minister", phone: "07458 050833", email: "stephanie.njeru@methodist.org.uk", dayOff: "Friday" },
];

const LAY_STAFF: Person[] = [
  { name: "David Bishop", role: "Operations Manager", phone: "07458 002275", email: "operations@forestcircuit.org.uk" },
  { name: "Bradley M", role: "Communications Officer", phone: "07832 335634", email: "communications@forestcircuit.org.uk" },
  { name: "Zak Njeru", role: "Pastoral Worker", phone: "07458 002244", email: "pastoralmethodist@gmail.com" },
  { name: "Valerie Rogers", role: "Finance Officer", phone: "07832 335641", email: "valerie.rogers@forestcircuit.org.uk" },
];

function PersonCard({ person }: { person: Person }) {
  return (
    <li className="rounded-[10px] border border-line-200 bg-white p-5 shadow-[var(--shadow-card)]">
      <p className="font-bold text-[var(--text-heading)]">{person.name}</p>
      <p className="text-sm text-[var(--text-muted)]">
        {person.role}
        {person.dayOff ? ` · Day off: ${person.dayOff}` : ""}
      </p>
      <div className="mt-2 flex flex-col gap-1.5">
        {person.phone && (
          <a href={`tel:${person.phone.replace(/\s/g, "")}`} className="inline-flex items-center gap-2 text-sm font-semibold text-forest-600">
            <Phone size={14} aria-hidden="true" />
            {person.phone}
          </a>
        )}
        <a href={`mailto:${person.email}`} className="inline-flex items-center gap-2 text-sm font-semibold text-forest-600">
          <Mail size={14} aria-hidden="true" />
          {person.email}
        </a>
      </div>
    </li>
  );
}

function PersonSection({ title, people }: { title: string; people: Person[] }) {
  return (
    <section className="mb-12">
      <h2 style={{ fontSize: "var(--text-h3)" }} className="mb-6">
        {title}
      </h2>
      <ul className="grid gap-4 sm:grid-cols-2">
        {people.map((person) => (
          <PersonCard key={person.email} person={person} />
        ))}
      </ul>
    </section>
  );
}

export default function StaffPage() {
  return (
    <div className="relative container-max max-w-3xl py-14 md:py-20">
      <PageAccents variant="rings" />
      <p className="eyebrow mb-3">Meet the team</p>
      <h1 style={{ fontSize: "var(--text-h1)" }} className="mb-6">
        Circuit staff
      </h1>
      <p className="mb-12 text-[var(--text-body)]" style={{ fontSize: "var(--text-lead)" }}>
        The officers, ministers and lay staff who support the ten churches of Forest Circuit day to day.
      </p>

      <PersonSection title="Circuit staff" people={MINISTERS} />
      <PersonSection title="Lay circuit staff" people={LAY_STAFF} />
      <PersonSection title="Circuit officers" people={OFFICERS} />
    </div>
  );
}
