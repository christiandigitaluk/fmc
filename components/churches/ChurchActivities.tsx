import { ChevronDown } from "lucide-react";
import type { ChurchActivityGroup } from "@/lib/types";

/**
 * Regular gatherings, collapsed by default so a long weekly programme sits
 * under the service times without burying the rest of the page.
 *
 * Built on <details>/<summary> rather than state: it works before hydration,
 * keyboard and screen reader support come for free, and the browser's own
 * find-in-page can open a closed panel to reveal a match.
 */
export function ChurchActivities({ groups }: { groups: ChurchActivityGroup[] }) {
  const withActivities = groups.filter((group) => group.activities.length > 0);
  if (withActivities.length === 0) return null;

  return (
    <div className="mt-4 flex flex-col gap-3">
      {withActivities.map((group) => (
        <details
          key={group.title}
          className="group rounded-[10px] border border-line-200 bg-white [&_summary::-webkit-details-marker]:hidden"
        >
          <summary className="flex cursor-pointer list-none items-center justify-between gap-3 p-4 focus:outline-none focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:[outline-color:var(--focus-ring)]">
            <span className="min-w-0">
              <span className="font-semibold text-[var(--text-heading)]">{group.title}</span>
              {group.intro && <span className="ml-2 text-sm text-[var(--text-muted)]">{group.intro}</span>}
            </span>
            <span className="flex shrink-0 items-center gap-2 text-sm font-semibold text-forest-600">
              {group.activities.length}
              <ChevronDown size={18} aria-hidden="true" className="disclosure-chevron" />
            </span>
          </summary>

          <ul className="border-t border-line-200 px-4 pb-2">
            {group.activities.map((activity) => (
              <li
                key={`${activity.name}-${activity.time}`}
                className="flex gap-4 border-t border-line-200 py-3 first:border-t-0"
              >
                <span
                  className="w-[4.5rem] shrink-0 pt-0.5 text-sm font-extrabold text-forest-700"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {activity.time}
                </span>
                <div className="min-w-0">
                  <p className="font-semibold text-[var(--text-heading)]">{activity.name}</p>
                  <p className="text-sm font-semibold text-[var(--text-muted)]">
                    {activity.frequency}
                    {activity.note && ` (${activity.note})`}
                  </p>
                  {activity.description && (
                    <p className="mt-1 text-sm text-[var(--text-body)]">{activity.description}</p>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </details>
      ))}
    </div>
  );
}
