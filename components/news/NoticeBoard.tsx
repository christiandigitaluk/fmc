import { ExternalLink } from "lucide-react";
import type { Notice } from "@/lib/types";

/**
 * Short notices pinned under the news articles, as small tilted cards in the
 * circuit's sticker style.
 *
 * Deliberately lighter than the article cards above: no images, no headings
 * that compete, and a hard cap on how much can be said. Anything needing more
 * than a sentence or two should be a news post instead.
 *
 * Expired notices are filtered out in getNotices, not here, so no page can
 * render a stale deadline.
 */
function badgeText(notice: Notice): string {
  if (!notice.deadline) return notice.label ?? "Opportunity";
  // Parsed as UTC midnight, formatted in the site's locale. Only ever a date,
  // never a time, so there is no hour to drift across a timezone boundary.
  const on = new Date(`${notice.deadline}T00:00:00Z`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    timeZone: "UTC",
  });
  return `Closes ${on}`;
}

function NoticeBody({ notice }: { notice: Notice }) {
  const dated = Boolean(notice.deadline);
  return (
    <>
      <span
        className={`sticker mb-3 inline-flex items-center self-start rounded-full px-3 py-1 text-xs font-extrabold uppercase tracking-wide text-ink-900 ${
          dated ? "bg-orange-500" : "bg-forest-100"
        }`}
      >
        {badgeText(notice)}
      </span>
      <p className="mb-1.5 font-bold text-[var(--text-heading)]">{notice.title}</p>
      <p className="text-sm text-[var(--text-body)]">{notice.summary}</p>
      {notice.url && (
        <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-forest-600">
          {new URL(notice.url).hostname.replace(/^www\./, "")}
          <ExternalLink size={14} aria-hidden="true" />
        </span>
      )}
    </>
  );
}

export function NoticeBoard({ notices }: { notices: Notice[] }) {
  if (notices.length === 0) return null;

  return (
    <section aria-labelledby="noticeboard-heading" className="mt-16">
      <p className="eyebrow mb-3">Also worth knowing</p>
      <h2 id="noticeboard-heading" style={{ fontSize: "var(--text-h2)" }} className="mb-3">
        Noticeboard
      </h2>
      <p className="mb-8 max-w-2xl text-[var(--text-body)]">
        Short notices and opportunities from across the circuit and the wider Methodist Church.
      </p>

      <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {notices.map((notice, i) => (
          <li key={notice.slug} className={i % 2 === 0 ? "-rotate-1" : "rotate-1"}>
            {notice.url ? (
              <a
                href={notice.url}
                target="_blank"
                rel="noreferrer"
                className="sticker flex h-full flex-col rounded-[10px] bg-white p-5 no-underline"
              >
                <NoticeBody notice={notice} />
              </a>
            ) : (
              <div className="sticker flex h-full flex-col rounded-[10px] bg-white p-5">
                <NoticeBody notice={notice} />
              </div>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}
