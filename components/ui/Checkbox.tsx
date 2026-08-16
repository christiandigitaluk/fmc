"use client";

import { useId } from "react";

export interface CheckboxProps {
  label?: string;
  checked?: boolean;
  name?: string;
  onChange?: (checked: boolean) => void;
}

export function Checkbox({ label, checked, name, onChange }: CheckboxProps) {
  const id = useId();
  return (
    <div className="flex items-center gap-2.5">
      <input
        id={id}
        name={name}
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange?.(e.target.checked)}
        className="h-5 w-5 rounded-[4px] border border-line-200 accent-[var(--forest-700)] focus:outline-none focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-2"
        style={{ outlineColor: "var(--focus-ring)" }}
      />
      {label && (
        <label htmlFor={id} className="text-body text-[var(--text-heading)]">
          {label}
        </label>
      )}
    </div>
  );
}
