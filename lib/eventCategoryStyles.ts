import type { EventCategory } from "@/lib/types";
import type { BadgeTone } from "@/components/ui/Badge";

/** Each category gets a distinct, consistent colour drawn from the existing
 * brand tones — used for both the category filter pills and the badge on
 * each event card, so the colour coding matches everywhere. */
export const CATEGORY_TONE: Record<EventCategory, BadgeTone> = {
  Community: "forest",
  Worship: "ink",
  Youth: "orange",
  "Special Services": "outline",
};

export const CATEGORY_PILL_CLASSES: Record<EventCategory, { active: string; inactive: string }> = {
  Community: {
    active: "sticker bg-forest-700 text-white",
    inactive: "border-2 border-transparent bg-forest-100 text-forest-700 hover:border-forest-700/30",
  },
  Worship: {
    active: "sticker bg-ink-900 text-cream-50",
    inactive: "border-2 border-transparent bg-ink-900/10 text-ink-800 hover:border-ink-900/30",
  },
  Youth: {
    active: "sticker bg-orange-500 text-ink-900",
    inactive: "border-2 border-transparent bg-orange-100 text-ink-800 hover:border-orange-500/40",
  },
  "Special Services": {
    active: "sticker bg-white text-ink-900",
    inactive: "border-2 border-line-200 bg-white text-ink-600 hover:border-ink-900/30",
  },
};

export const ALL_PILL_CLASSES = {
  active: "sticker bg-ink-900 text-cream-50",
  inactive: "border-2 border-line-200 bg-white text-ink-600 hover:border-ink-900/30",
};
