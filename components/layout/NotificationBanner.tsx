"use client";

import { useState } from "react";
import Link from "next/link";
import { X } from "lucide-react";
import type { SiteSettings } from "@/lib/types";

export function NotificationBanner({ settings }: { settings: SiteSettings }) {
  const [dismissed, setDismissed] = useState(false);

  if (!settings.bannerActive || dismissed) return null;

  return (
    <div className="relative bg-ink-900 text-cream-50" role="region" aria-label="Site announcement">
      <div className="container-max py-2.5 text-center">
        <p className="mx-auto max-w-[calc(100%-56px)] text-sm sm:max-w-none sm:px-10">
          {settings.bannerText}{" "}
          {settings.bannerLinkHref && (
            <Link href={settings.bannerLinkHref} className="font-bold underline text-cream-50 hover:text-forest-100">
              {settings.bannerLinkLabel}
            </Link>
          )}
        </p>
      </div>
      <button
        type="button"
        onClick={() => setDismissed(true)}
        aria-label="Dismiss announcement"
        className="absolute top-1/2 -translate-y-1/2 shrink-0 rounded-full p-1 hover:bg-white/10 focus:outline-none focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-2"
        style={{ outlineColor: "var(--focus-ring)", right: "var(--space-5)" }}
      >
        <X size={16} aria-hidden="true" />
      </button>
    </div>
  );
}
