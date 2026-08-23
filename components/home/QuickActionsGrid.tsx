import { Church, BookOpen, CalendarDays, Building2 } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/cn";

const ACTIONS = [
  {
    href: "/churches",
    icon: Church,
    title: "Find a church",
    description: "Ten churches across East London and Essex, each with its own warm welcome.",
    tone: "bg-forest-700 text-white",
    iconTone: "bg-white text-forest-700",
  },
  {
    href: "/preaching-plan",
    icon: BookOpen,
    title: "Circuit preaching plan",
    description: "See who is preaching, where and when, across the whole circuit this quarter.",
    tone: "bg-orange-500 text-ink-900",
    iconTone: "bg-ink-900 text-orange-500",
  },
  {
    href: "/events",
    icon: CalendarDays,
    title: "Events & community groups",
    description: "Worship services, youth activities and community gatherings near you.",
    tone: "bg-forest-100 text-[var(--text-heading)]",
    iconTone: "bg-forest-700 text-white",
  },
  {
    href: "/hall-hire",
    icon: Building2,
    title: "Hall & premises hire",
    description: "Warm, affordable spaces for local groups, classes and celebrations.",
    tone: "bg-white text-[var(--text-heading)]",
    iconTone: "bg-forest-700 text-white",
  },
];

export function QuickActionsGrid() {
  return (
    <section className="container-max pb-8 pt-16 md:pb-12 md:pt-24" aria-label="Quick actions">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {ACTIONS.map(({ href, icon: Icon, title, description, tone, iconTone }) => (
          <Link key={href} href={href} className={cn("sticker group flex flex-col gap-4 rounded-[16px] p-6 no-underline", tone)}>
            <span className={cn("flex h-12 w-12 items-center justify-center rounded-full", iconTone)}>
              <Icon size={22} strokeWidth={2} aria-hidden="true" />
            </span>
            {/* h2, not h3: this is the first heading level after the hero
                h1, so h3 skipped a level (flagged by Lighthouse's
                heading-order audit). Visual size is set entirely by the
                inline font-size, so the tag change has no visual effect. */}
            <h2 style={{ fontSize: "var(--text-h3)", color: "inherit" }}>{title}</h2>
            <p className="text-sm opacity-90">{description}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
