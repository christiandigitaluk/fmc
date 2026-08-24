import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/cn";

export type CardTone = "cream" | "forest" | "orange" | "ink";

export interface CardProps {
  eyebrow?: string;
  title?: string;
  image?: string;
  /** Darkens the image with a gradient overlay — useful for photos where the
   * card's white text/badges need to sit directly on top, or for visual
   * consistency across a set of stock photos with varying brightness. */
  imageOverlay?: boolean;
  footer?: React.ReactNode;
  href?: string;
  tone?: CardTone;
  className?: string;
  children?: React.ReactNode;
  /**
   * How wide the card's image actually renders, as a next/image `sizes`
   * string. Defaults to the standard 3-up grid (news listing, church
   * directory). Pass an explicit value wherever a Card sits in a layout that
   * doesn't match that — a wrong hint doesn't error, it just makes the
   * browser fetch an image too small for the box and silently upscale it,
   * which only shows up as softness on ordinary (non-Retina) screens.
   */
  sizes?: string;
}

const toneClasses: Record<CardTone, string> = {
  cream: "bg-white text-[var(--text-heading)]",
  forest: "bg-forest-700 text-white",
  orange: "bg-orange-500 text-ink-900",
  ink: "bg-ink-900 text-cream-50",
};

const toneEyebrowClasses: Record<CardTone, string> = {
  cream: "",
  forest: "!text-white",
  orange: "!text-ink-900",
  ink: "!text-white",
};

const toneHeadingColor: Record<CardTone, string> = {
  cream: "var(--text-heading)",
  forest: "#ffffff",
  orange: "var(--ink-900)",
  ink: "var(--cream-50)",
};

export function Card({
  eyebrow,
  title,
  image,
  imageOverlay,
  footer,
  href,
  tone = "cream",
  className,
  children,
  sizes = "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw",
}: CardProps) {
  const content = (
    <>
      {image && (
        <div className="relative aspect-[3/2] w-full overflow-hidden rounded-t-[8px] border-b-2 border-ink-900">
          <Image src={image} alt="" fill sizes={sizes} className="object-cover" />
          {imageOverlay && (
            <div
              className="absolute inset-0"
              style={{
                // Evenly spaced stops following a single quadratic falloff.
                // The previous hand-picked stops changed slope by up to 59%
                // from one band to the next, and the eye reads an abrupt
                // change in a gradient's rate as a line across the image.
                background:
                  "linear-gradient(to top, rgba(16,25,15,0.62) 0%, rgba(16,25,15,0.502) 10%, rgba(16,25,15,0.397) 20%, rgba(16,25,15,0.304) 30%, rgba(16,25,15,0.223) 40%, rgba(16,25,15,0.155) 50%, rgba(16,25,15,0.099) 60%, rgba(16,25,15,0.056) 70%, rgba(16,25,15,0.025) 80%, rgba(16,25,15,0.006) 90%, rgba(16,25,15,0) 100%)",
              }}
              aria-hidden="true"
            />
          )}
        </div>
      )}
      <div className="p-5">
        {eyebrow && <p className={cn("eyebrow mb-2", toneEyebrowClasses[tone])}>{eyebrow}</p>}
        {title && (
          <h3 className="mb-2" style={{ fontSize: "var(--text-h3)", color: toneHeadingColor[tone] }}>
            {title}
          </h3>
        )}
        {children && <div className="text-body opacity-90">{children}</div>}
        {footer && <div className="mt-4 text-sm font-bold">{footer}</div>}
      </div>
    </>
  );

  const classes = cn(
    "sticker block overflow-hidden rounded-[10px]",
    toneClasses[tone],
    href && "hover:-translate-x-0.5 hover:-translate-y-0.5",
    className
  );

  if (href) {
    return (
      <Link href={href} className={classes}>
        {content}
      </Link>
    );
  }

  return <div className={classes}>{content}</div>;
}
