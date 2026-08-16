import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type Variant = "rings" | "scatter" | "diamond" | "nested" | "plus" | "blob" | "arc" | "confetti";

/**
 * Very subtle decorative shapes for otherwise plain, text-heavy pages — echoes
 * the blob/ring motif from the homepage hero, but small and faint enough to
 * sit quietly in the corners without competing with content. Each page picks
 * a different `variant` so the site doesn't feel like it's stamping the same
 * accent everywhere.
 */
export function PageAccents({ variant = "rings", className }: { variant?: Variant; className?: string }) {
  return (
    <div aria-hidden="true" className={cn("pointer-events-none absolute inset-0 -z-10 overflow-hidden", className)}>
      {VARIANTS[variant]}
    </div>
  );
}

const VARIANTS: Record<Variant, ReactNode> = {
  rings: (
    <>
      <div className="absolute -right-6 top-8 h-20 w-20 rounded-full border-2 border-forest-700/15 md:h-28 md:w-28" />
      <div className="absolute bottom-10 left-2 h-3 w-3 rounded-full bg-orange-500/25 md:left-6" />
    </>
  ),
  scatter: (
    <>
      <div className="absolute right-6 top-10 h-2 w-2 rounded-full bg-orange-500/25" />
      <div className="absolute right-12 top-16 h-1.5 w-1.5 rounded-full bg-forest-600/25" />
      <div className="absolute right-4 top-24 h-1 w-1 rounded-full bg-forest-600/25" />
      <div className="absolute bottom-8 left-4 h-14 w-14 rounded-full border-2 border-orange-500/15 md:h-20 md:w-20" />
    </>
  ),
  diamond: (
    <>
      <div className="absolute -left-4 top-12 h-12 w-12 rotate-45 rounded-[6px] border-2 border-forest-700/15 md:h-16 md:w-16" />
      <div className="absolute bottom-12 right-6 h-2.5 w-2.5 rounded-full bg-orange-500/25" />
    </>
  ),
  nested: (
    <>
      <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full border-2 border-forest-700/10 md:h-32 md:w-32" />
      <div className="absolute right-2 top-2 h-10 w-10 rounded-full border-2 border-orange-500/15 md:h-14 md:w-14" />
    </>
  ),
  plus: (
    <>
      <div className="absolute right-8 top-10 h-3 w-0.5 -translate-x-1/2 bg-forest-600/20" />
      <div className="absolute right-8 top-10 h-0.5 w-3 -translate-x-1/2 translate-y-1 bg-forest-600/20" />
      <div className="absolute bottom-10 left-6 h-3 w-3 rounded-full bg-orange-500/20" />
    </>
  ),
  blob: <div className="absolute -bottom-10 -right-10 h-32 w-32 rounded-full bg-forest-700/[0.06] md:h-40 md:w-40" />,
  arc: (
    <>
      <div className="absolute -left-10 bottom-0 h-24 w-24 rounded-full border-2 border-forest-700/15 md:h-32 md:w-32" />
      <div className="absolute right-8 top-6 h-2 w-2 rounded-full bg-orange-500/25" />
    </>
  ),
  confetti: (
    <>
      <div className="absolute left-6 top-10 h-1.5 w-1.5 rounded-full bg-orange-500/25" />
      <div className="absolute left-14 top-6 h-1 w-1 rounded-full bg-forest-600/25" />
      <div className="absolute right-10 bottom-8 h-2 w-2 rounded-full bg-forest-600/20" />
      <div className="absolute right-20 bottom-16 h-1 w-1 rounded-full bg-orange-500/25" />
    </>
  ),
};
