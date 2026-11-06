"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { Expand, X } from "lucide-react";

/**
 * An event's poster as a small thumbnail on its card, opening full size in
 * a modal when tapped. Suggested at a staff meeting: posters give the events
 * page something to look at, but shown full size they would turn a scannable
 * list into a wall of A4s.
 *
 * Uses a native <dialog> with showModal(), which brings focus trapping,
 * Escape to close and the inert page behind it for free. The full-size image
 * is only rendered once the dialog has been opened, so a page of thumbnails
 * never downloads every poster at full resolution.
 *
 * Width and height come from the Sanity asset's metadata; posters are nearly
 * always A4 portrait, so that ratio stands in if they are missing.
 */
export function EventPoster({
  src,
  title,
  width: rawWidth,
  height: rawHeight,
}: {
  src: string;
  title: string;
  // Sanity sends null, not undefined, for a missing value, which a
  // destructuring default would let straight through.
  width?: number | null;
  height?: number | null;
}) {
  const width = rawWidth ?? 1000;
  const height = rawHeight ?? 1414;
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [opened, setOpened] = useState(false);
  const landscape = width > height;

  const open = () => {
    setOpened(true);
    dialogRef.current?.showModal();
  };
  const close = () => dialogRef.current?.close();

  return (
    <>
      <button
        type="button"
        onClick={open}
        aria-label={`View the poster for ${title}`}
        className="group flex items-center gap-3 text-left sm:flex-col sm:items-end sm:gap-1.5"
      >
        <span className="relative block h-[84px] w-[60px] shrink-0 rotate-2 overflow-hidden rounded-[6px] border-2 border-ink-900 bg-cream-100 shadow-[3px_3px_0_var(--ink-900)] transition-transform duration-150 group-hover:rotate-0 group-focus-visible:rotate-0">
          <Image src={src} alt="" fill sizes="120px" className="object-cover object-top" />
        </span>
        <span className="flex items-center gap-1 text-sm font-semibold text-forest-600 group-hover:text-forest-700">
          <Expand size={14} aria-hidden="true" />
          View poster
        </span>
      </button>

      <dialog
        ref={dialogRef}
        aria-label={`Poster for ${title}`}
        // A click on the dialog element itself, rather than anything inside
        // it, can only have landed on the backdrop.
        onClick={(e) => {
          if (e.target === e.currentTarget) close();
        }}
        className={`m-auto w-[calc(100%-2rem)] overflow-visible bg-transparent p-0 backdrop:bg-ink-900/75 ${
          landscape ? "max-w-4xl" : "max-w-md"
        }`}
      >
        <div className="relative rounded-[16px] border-2 border-ink-900 bg-white p-2 shadow-[6px_6px_0_var(--ink-900)]">
          <button
            type="button"
            onClick={close}
            aria-label="Close"
            className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full border-2 border-ink-900 bg-white text-ink-900 transition-transform hover:scale-105"
          >
            <X size={18} strokeWidth={2.5} aria-hidden="true" />
          </button>
          {opened && (
            <Image
              src={src}
              alt={`Poster for ${title}`}
              width={width}
              height={height}
              sizes={landscape ? "(min-width: 920px) 56rem, 100vw" : "(min-width: 480px) 28rem, 100vw"}
              className="mx-auto h-auto max-h-[calc(100dvh-4rem)] w-auto rounded-[10px]"
            />
          )}
        </div>
      </dialog>
    </>
  );
}
