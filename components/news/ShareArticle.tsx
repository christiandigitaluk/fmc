"use client";

import { useState } from "react";
import { Mail, Link2, Check } from "lucide-react";
import { FacebookIcon, WhatsAppIcon } from "@/components/ui/SocialIcons";

/**
 * Share controls for a news article.
 *
 * WhatsApp comes first deliberately: circuit news travels through church
 * WhatsApp groups more than anywhere else. Facebook matches the circuit's own
 * channel, email suits anyone forwarding to a congregation list, and copy link
 * covers everything else.
 *
 * The URL is passed in rather than read from window.location so the buttons
 * are correct in the server-rendered HTML, and so a share never carries a
 * preview hostname or a query string picked up along the way.
 *
 * Styled as the sticker circles used for the footer social icons, so this
 * reads as part of the site rather than a bolted-on widget.
 */
const CIRCLE =
  "flex h-11 w-11 items-center justify-center rounded-full border-2 border-ink-900 bg-cream-50 text-ink-900 no-underline shadow-[var(--shadow-sticker-sm)] transition-[transform,background-color] duration-200 ease-[cubic-bezier(.22,.61,.36,1)] hover:bg-orange-500 hover:shadow-[var(--shadow-sticker)] focus:outline-none focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-2";

export function ShareArticle({ url, title }: { url: string; title: string }) {
  const [status, setStatus] = useState<"idle" | "copied" | "failed">("idle");

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  const copied = status === "copied";

  /**
   * Older Safari and any non-secure context have no navigator.clipboard, and
   * the modern API also rejects when the document is not focused. Without this
   * the button would look like it had done nothing at all.
   */
  function legacyCopy(text: string): boolean {
    try {
      const field = document.createElement("textarea");
      field.value = text;
      field.setAttribute("readonly", "");
      field.style.cssText = "position:fixed;top:0;left:0;opacity:0";
      document.body.appendChild(field);
      field.select();
      const ok = document.execCommand("copy");
      field.remove();
      return ok;
    } catch {
      return false;
    }
  }

  async function copy() {
    let ok = false;
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(url);
        ok = true;
      }
    } catch {
      ok = false;
    }
    if (!ok) ok = legacyCopy(url);

    // Always report the outcome. A copy button that silently fails is worse
    // than one that admits it.
    setStatus(ok ? "copied" : "failed");
    window.setTimeout(() => setStatus("idle"), 2500);
  }

  return (
    <section aria-labelledby="share-heading" className="mt-12 border-t border-line-200 pt-6">
      <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
        <p id="share-heading" className="eyebrow">
          Share this
        </p>

        <div className="flex items-center gap-3">
          <a
            href={`https://wa.me/?text=${encodedTitle}%20${encodedUrl}`}
            target="_blank"
            rel="noreferrer"
            aria-label={`Share "${title}" on WhatsApp`}
            className={`${CIRCLE} hover:-rotate-6`}
            style={{ outlineColor: "var(--focus-ring)" }}
          >
            <WhatsAppIcon size={20} />
          </a>

          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
            target="_blank"
            rel="noreferrer"
            aria-label={`Share "${title}" on Facebook`}
            className={`${CIRCLE} hover:rotate-6`}
            style={{ outlineColor: "var(--focus-ring)" }}
          >
            <FacebookIcon size={18} />
          </a>

          <a
            href={`mailto:?subject=${encodedTitle}&body=${encodedTitle}%0A%0A${encodedUrl}`}
            aria-label={`Share "${title}" by email`}
            className={`${CIRCLE} hover:-rotate-6`}
            style={{ outlineColor: "var(--focus-ring)" }}
          >
            <Mail size={18} aria-hidden="true" />
          </a>

          <button
            type="button"
            onClick={copy}
            aria-label={`Copy a link to "${title}"`}
            className={`${CIRCLE} hover:rotate-6`}
            style={{ outlineColor: "var(--focus-ring)" }}
          >
            {copied ? <Check size={18} aria-hidden="true" /> : <Link2 size={18} aria-hidden="true" />}
          </button>

          {/* Announced to screen readers as well as shown, since the icon
              swap alone is easy to miss. */}
          <span
            role="status"
            aria-live="polite"
            className={`text-sm font-semibold ${status === "failed" ? "text-[var(--text-body)]" : "text-forest-600"}`}
          >
            {status === "copied" ? "Link copied" : status === "failed" ? "Press Ctrl or Cmd and C to copy" : ""}
          </span>
        </div>
      </div>
    </section>
  );
}
