import { Sparkle } from "lucide-react";

export function SectionDivider() {
  return (
    <div className="container-max flex items-center gap-4" aria-hidden="true">
      <div className="h-0 flex-1 border-t-2 border-dashed border-ink-900/20" />
      <span className="sticker flex h-11 w-11 rotate-6 items-center justify-center rounded-full bg-orange-500 text-ink-900">
        <Sparkle size={18} strokeWidth={2.5} aria-hidden="true" />
      </span>
      <div className="h-0 flex-1 border-t-2 border-dashed border-ink-900/20" />
    </div>
  );
}
