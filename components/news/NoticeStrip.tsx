import { ArrowUpRight } from "lucide-react";
import { noticeBadge, firstSentence } from "@/lib/notice";
import type { Notice } from "@/lib/types";

/** Never more than this on the home page, however many are live. */
const MAX = 2;

/**
 * Noticeboard items as a quiet footnote under the home page news cards.
 *
 * The /news page shows these as tilted sticker cards. Here they must not
 * compete with the articles above them, so this is the opposite treatment:
 * no card, no border, no shadow, no heading that would rank alongside "News
 * and community stories". Just a hairline, a small label, and one line each.
 *
 * Capped at MAX so the strip cannot grow into a block no matter how many
 * notices are live. The full set is on /news.
 */
export function NoticeStrip({ notices }: { notices: Notice[] }) {
  const shown = notices.slice(0, MAX);
  if (shown.length === 0) return null;

  return (
    <div aria-label="Noticeboard" className="mt-10 border-t border-ink-900/10 pt-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:gap-8">
        {/* Brand orange, chosen deliberately for brand consistency. Note for
            anyone tuning this later: as text on the forest-100 band it sits at
            about 2.3:1, below the 4.5:1 WCAG AA asks for at this size, so
            don't treat it as a precedent for orange body copy. */}
        <p className="eyebrow shrink-0 !text-orange-500 sm:pt-0.5">Noticeboard</p>

        <ul className="flex min-w-0 flex-col gap-2.5">
          {shown.map((notice) => {
            const external = Boolean(notice.url);
            return (
              <li key={notice.slug} className="min-w-0">
                <a
                  href={notice.url ?? "/news"}
                  {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
                  className="group inline text-sm text-[var(--text-body)] no-underline"
                >
                  <span
                    aria-hidden="true"
                    className="mr-2 inline-block h-3 w-3 rounded-full border-2 border-white bg-forest-700 align-[0.5px]"
                  />
                  <span className="font-bold text-[var(--text-heading)] group-hover:underline">{notice.title}</span>
                  <span className="mx-1.5 text-[var(--text-muted)]">·</span>
                  {firstSentence(notice.summary)}
                  <span className="ml-1.5 whitespace-nowrap font-semibold text-forest-700">
                    {noticeBadge(notice)}
                    <ArrowUpRight size={14} className="ml-0.5 inline align-[-2px]" aria-hidden="true" />
                  </span>
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
