import { cn } from "@/lib/cn";

export type BadgeTone = "forest" | "orange" | "ink" | "outline";

export interface BadgeProps {
  tone?: BadgeTone;
  className?: string;
  children?: React.ReactNode;
}

const toneClasses: Record<BadgeTone, string> = {
  forest: "bg-forest-700 text-white",
  orange: "bg-orange-500 text-ink-900",
  ink: "bg-ink-900 text-cream-50",
  outline: "bg-cream-50 text-ink-800",
};

export function Badge({ tone = "forest", className, children }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border-2 border-ink-900 px-3 py-1 text-xs font-bold uppercase tracking-wide",
        toneClasses[tone],
        className
      )}
    >
      {children}
    </span>
  );
}
