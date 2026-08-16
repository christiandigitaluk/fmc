"use client";

import { useId, useRef } from "react";
import { cn } from "@/lib/cn";

export interface TabsProps {
  items?: string[];
  value?: string;
  onChange?: (value: string) => void;
  label?: string;
}

export function Tabs({ items = [], value, onChange, label = "Filter" }: TabsProps) {
  const idBase = useId();
  const refs = useRef<Record<string, HTMLButtonElement | null>>({});

  function handleKeyDown(e: React.KeyboardEvent, index: number) {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    e.preventDefault();
    const nextIndex = e.key === "ArrowRight" ? (index + 1) % items.length : (index - 1 + items.length) % items.length;
    const nextItem = items[nextIndex];
    onChange?.(nextItem);
    refs.current[nextItem]?.focus();
  }

  return (
    <div role="tablist" aria-label={label} className="flex flex-wrap gap-1 border-b border-line-200">
      {items.map((item, index) => {
        const selected = item === value;
        return (
          <button
            key={item}
            ref={(el) => {
              refs.current[item] = el;
            }}
            role="tab"
            id={`${idBase}-${item}`}
            aria-selected={selected}
            tabIndex={selected ? 0 : -1}
            onClick={() => onChange?.(item)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            className={cn(
              "relative px-4 py-2.5 text-sm font-semibold transition-colors focus:outline-none focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-2",
              selected ? "text-[var(--text-heading)]" : "text-[var(--text-muted)] hover:text-[var(--text-heading)]"
            )}
            style={{ outlineColor: "var(--focus-ring)" }}
          >
            {item}
            {selected && (
              <span
                aria-hidden="true"
                className="absolute -bottom-px left-0 right-0 h-[2px]"
                style={{ background: "var(--orange-500)" }}
              />
            )}
          </button>
        );
      })}
    </div>
  );
}
