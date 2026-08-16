"use client";

import { useId } from "react";
import { cn } from "@/lib/cn";

export type SelectOption = string | { value: string; label: string };

export interface SelectProps {
  label?: string;
  options?: SelectOption[];
  value?: string;
  name?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  className?: string;
  ariaLabel?: string;
}

export function Select({ label, options = [], value, name, onChange, className, ariaLabel }: SelectProps) {
  const id = useId();

  return (
    <div>
      {label && (
        <label htmlFor={id} className="mb-1.5 block text-sm font-semibold text-[var(--text-heading)]">
          {label}
        </label>
      )}
      <select
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        aria-label={!label ? ariaLabel : undefined}
        className={cn(
          "w-full rounded-[4px] border border-line-200 bg-white px-4 py-2.5 text-body text-[var(--text-heading)]",
          "focus:outline-none focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-2",
          className
        )}
        style={{ outlineColor: "var(--focus-ring)" }}
      >
        {options.map((opt) => {
          const optValue = typeof opt === "string" ? opt : opt.value;
          const optLabel = typeof opt === "string" ? opt : opt.label;
          return (
            <option key={optValue} value={optValue}>
              {optLabel}
            </option>
          );
        })}
      </select>
    </div>
  );
}
