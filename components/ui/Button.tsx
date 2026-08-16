import Link from "next/link";
import { cn } from "@/lib/cn";

export type ButtonVariant = "primary" | "secondary" | "inverse" | "ghost" | "orange";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  href?: string;
  target?: string;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  className?: string;
  children?: React.ReactNode;
  onClick?: () => void;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary: "sticker bg-forest-700 text-white hover:bg-forest-600",
  orange: "sticker bg-orange-500 text-ink-900 hover:brightness-105",
  secondary: "sticker bg-white text-forest-700 hover:bg-forest-100",
  inverse: "bg-transparent text-white border-2 border-white hover:bg-white/10",
  ghost: "bg-transparent text-forest-700 hover:bg-forest-100",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "text-sm px-4 py-2",
  md: "text-base px-5 py-2.5",
  lg: "text-lg px-8 py-4",
};

export function Button({
  variant = "primary",
  size = "md",
  href,
  target,
  disabled,
  type = "button",
  className,
  children,
  onClick,
}: ButtonProps) {
  const classes = cn(
    "inline-flex items-center justify-center gap-2 rounded-full font-bold transition-[background-color,transform,box-shadow] duration-150 ease-[cubic-bezier(.22,.61,.36,1)] disabled:opacity-50 disabled:pointer-events-none",
    variantClasses[variant],
    sizeClasses[size],
    className
  );

  if (href && !disabled) {
    return (
      <Link href={href} target={target} rel={target === "_blank" ? "noreferrer" : undefined} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} disabled={disabled} onClick={onClick} className={classes}>
      {children}
    </button>
  );
}
