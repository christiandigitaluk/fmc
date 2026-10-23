import type { Metadata } from "next";
import Image from "next/image";
import { Mail, Phone } from "lucide-react";
import { BreakableText } from "@/components/ui/BreakableText";
import { PageAccents } from "@/components/ui/PageAccents";

export const metadata: Metadata = {
  title: "Circuit Staff",
  description: "Meet the officers, ministers and lay staff of Forest Methodist Circuit.",
  alternates: { canonical: "/staff" },
};

type Person = {
  name: string;
  role: string;
  email: string;
  phone?: string;
  dayOff?: string;
  /** File in public/images/staff, without the extension. Omit until a portrait exists. */
  photo?: string;
  /**
   * Where the crop zooms in, as a percentage down the painting (default 38).
   * Lower it for someone whose head sits high in the frame, which moves them
   * down inside the circle.
   */
  photoFocus?: number;
};

const OFFICERS: Person[] = [
  { name: "Florestine Corbett", role: "Circuit Steward", email: "flo_corbett@hotmail.com", photo: "florestine-corbett" },
  { name: "Eric Aidoo", role: "Circuit Steward", email: "aidoobaker@yahoo.com", photo: "eric-aidoo" },
  { name: "John Marange", role: "Safeguarding Officer", email: "forestsafeguarding@outlook.com", photo: "john-marange", photoFocus: 22 },
  { name: "Dallion Roye", role: "Meeting Secretary", email: "d.roye818@btinternet.com", photo: "dallion-roye" },
];

const MINISTERS: Person[] = [
  { name: "Revd Mike Long", role: "Superintendent", phone: "07458 002274", email: "mike.long@methodist.org.uk", photo: "mike-long" },
  { name: "Revd Sue Creighton", role: "Minister", phone: "07961 897445", email: "suegriffiths@mybroadbandmail.com", dayOff: "Friday", photo: "sue-creighton" },
  { name: "Revd Kong Ching Hii", role: "Minister", phone: "07458 050834", email: "kongching.hii@methodist.org.uk", dayOff: "Friday", photo: "kong-ching-hii" },
  { name: "Revd Stephanie Njeru", role: "Minister", phone: "07458 050833", email: "stephanie.njeru@methodist.org.uk", dayOff: "Friday", photo: "stephanie-njeru" },
];

const LAY_STAFF: Person[] = [
  { name: "David Bishop", role: "Operations Manager", phone: "07458 002275", email: "operations@forestcircuit.org.uk", photo: "david-bishop" },
  { name: "Bradley M", role: "Communications Officer", phone: "07832 335634", email: "communications@forestcircuit.org.uk", photo: "bradley-m" },
  { name: "Zak Njeru", role: "Pastoral Worker", phone: "07458 002244", email: "pastoralmethodist@gmail.com", photo: "zak-njeru" },
  { name: "Valerie Rogers", role: "Finance Officer", phone: "07832 335641", email: "circuit.finance@forestcircuit.org.uk", photo: "valerie-rogers" },
];

/** "Revd Mike Long" reads as ML, not RM: the title is not part of the name. */
function initials(name: string): string {
  const words = name.replace(/^Revd\s+/, "").split(/\s+/);
  return (words[0][0] + (words.length > 1 ? words[words.length - 1][0] : "")).toUpperCase();
}

const PORTRAIT_FRAME =
  "relative block h-20 w-20 shrink-0 overflow-hidden rounded-full border-2 border-ink-900 shadow-[var(--shadow-sticker-sm)]";

function Portrait({ person }: { person: Person }) {
  if (!person.photo) {
    return (
      <span
        aria-hidden="true"
        className={`${PORTRAIT_FRAME} flex items-center justify-center bg-forest-100 text-xl font-bold text-forest-700`}
        style={{ fontFamily: "var(--font-display)" }}
      >
        {initials(person.name)}
      </span>
    );
  }

  return (
    <span className={`${PORTRAIT_FRAME} bg-cream-50`}>
      {/* Empty alt: the name sits right beside it, so a description would
          only make a screen reader say it twice. The paintings leave a wide
          margin of bare paper round each head, so the image is scaled up
          about a point just above centre, where the faces sit.

          `sizes` is deliberately about double what is drawn (80px frame x
          1.3 scale = 104px). Stating the true size made the browser fetch a
          256px file, which a 3x phone was already stretching before anyone
          pinched in. At 208px a retina screen takes the full 640px file, so
          there is room to zoom to roughly 2-3x before it softens. */}
      <Image
        src={`/images/staff/${person.photo}.webp`}
        alt=""
        fill
        sizes="208px"
        draggable={false}
        className="no-long-press scale-[1.3] object-cover"
        style={{ transformOrigin: `50% ${person.photoFocus ?? 38}%` }}
      />
    </span>
  );
}

function PersonCard({ person }: { person: Person }) {
  return (
    <li className="rounded-[10px] border border-line-200 bg-white p-5 shadow-[var(--shadow-card)]">
      <div className="flex items-center gap-4">
        <Portrait person={person} />
        <div className="min-w-0">
          <p className="font-bold text-[var(--text-heading)]">{person.name}</p>
          <p className="text-sm text-[var(--text-muted)]">
            {person.role}
            {person.dayOff ? ` · Day off: ${person.dayOff}` : ""}
          </p>
        </div>
      </div>
      <div className="mt-4 flex flex-col gap-1.5">
        {person.phone && (
          <a href={`tel:${person.phone.replace(/\s/g, "")}`} className="inline-flex items-center gap-2 text-sm font-semibold text-forest-600">
            <Phone size={14} aria-hidden="true" />
            {person.phone}
          </a>
        )}
        <a href={`mailto:${person.email}`} className="inline-flex min-w-0 items-center gap-2 text-sm font-semibold text-forest-600">
          <Mail size={14} className="shrink-0" aria-hidden="true" />
          <span className="min-w-0">
            <BreakableText text={person.email} />
          </span>
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
