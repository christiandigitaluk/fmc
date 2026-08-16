"use client";

import { useId } from "react";
import { cn } from "@/lib/cn";

export interface InputProps {
  label?: string;
  hint?: string;
  error?: string;
  type?: string;
  textarea?: boolean;
  placeholder?: string;
  name?: string;
  required?: boolean;
  value?: string;
  defaultValue?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  className?: string;
}

export function Input({
  label,
  hint,
  error,
  type = "text",
  textarea = false,
  placeholder,
  name,
  required,
  value,
  defaultValue,
  onChange,
  className,
}: InputProps) {
  const id = useId();
  const hintId = hint ? `${id}-hint` : undefined;
  const errorId = error ? `${id}-error` : undefined;

  const fieldClasses = cn(
    "w-full rounded-[4px] border-2 bg-white px-4 py-2.5 text-body text-[var(--text-heading)] placeholder:text-[var(--text-muted)]",
    "focus:outline-none focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-2",
    error ? "border-[var(--error)]" : "border-ink-900",
    className
  );

  return (
    <div>
      {label && (
        <label htmlFor={id} className="mb-1.5 block text-sm font-bold text-[var(--text-heading)]">
          {label}
          {required && <span aria-hidden="true"> *</span>}
        </label>
      )}
      {textarea ? (
        <textarea
          id={id}
          name={name}
          placeholder={placeholder}
          required={required}
          value={value}
          defaultValue={defaultValue}
          onChange={onChange}
          rows={5}
          aria-describedby={cn(hintId, errorId) || undefined}
          aria-invalid={Boolean(error)}
          className={fieldClasses}
          style={{ outlineColor: "var(--focus-ring)" }}
        />
      ) : (
        <input
          id={id}
          name={name}
          type={type}
          placeholder={placeholder}
          required={required}
          value={value}
          defaultValue={defaultValue}
          onChange={onChange}
          aria-describedby={cn(hintId, errorId) || undefined}
          aria-invalid={Boolean(error)}
          className={fieldClasses}
          style={{ outlineColor: "var(--focus-ring)" }}
        />
      )}
      {hint && !error && (
        <p id={hintId} className="mt-1.5 text-sm text-[var(--text-muted)]">
          {hint}
        </p>
      )}
      {error && (
        <p id={errorId} className="mt-1.5 text-sm text-[var(--error)]">
          {error}
        </p>
      )}
    </div>
  );
}
