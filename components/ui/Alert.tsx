import { cn } from "@/lib/cn";

export type AlertTone = "info" | "success" | "warning" | "error";

export interface AlertProps {
  tone?: AlertTone;
  title?: string;
  className?: string;
  children?: React.ReactNode;
}

const toneClasses: Record<AlertTone, string> = {
  info: "bg-forest-100 text-[var(--text-heading)]",
  success: "bg-[#e9f2ec] text-[var(--success)]",
  warning: "bg-[#fbeedd] text-[var(--warning)]",
  error: "bg-[#f6e8e6] text-[var(--error)]",
};

export function Alert({ tone = "info", title, className, children }: AlertProps) {
  return (
    <div
      role={tone === "error" ? "alert" : "status"}
      className={cn("rounded-[10px] border-2 border-ink-900 p-4", toneClasses[tone], className)}
    >
      {title && <p className="mb-1 font-bold text-[var(--text-heading)]">{title}</p>}
      {children && <div className="text-sm text-[var(--text-body)]">{children}</div>}
    </div>
  );
}
