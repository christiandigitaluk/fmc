"use client";

import { useEffect } from "react";

/**
 * Opens the hall spotlight named in the URL hash, so a link such as the
 * Noticeboard's /venue-hire#shern-hall lands on the card already expanded.
 * Browsers scroll to a collapsed <details> but do not open it, which left
 * visitors on a teaser one tap short of what they came for.
 */
export function OpenSpotlightFromHash() {
  useEffect(() => {
    function open() {
      const id = decodeURIComponent(window.location.hash.slice(1));
      if (!id) return;
      const target = document.getElementById(id);
      if (target instanceof HTMLDetailsElement) target.open = true;
    }
    open();
    window.addEventListener("hashchange", open);
    return () => window.removeEventListener("hashchange", open);
  }, []);

  return null;
}
