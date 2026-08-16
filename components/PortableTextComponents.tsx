import Image from "next/image";
import type { PortableTextComponents } from "@portabletext/react";
import { urlForImage } from "@/sanity/lib/image";

/**
 * Without this, @portabletext/react silently drops any block type it
 * doesn't recognise — including inline images, which the `post` schema
 * explicitly allows editors to add to article bodies. That meant an editor
 * could add a photo in Studio and it would simply never appear on the site.
 */
export const portableTextComponents: PortableTextComponents = {
  types: {
    image: ({ value }) => {
      if (!value?.asset) return null;
      const url = urlForImage(value).width(1200).fit("max").auto("format").url();
      return (
        <span className="relative my-2 block aspect-[3/2] w-full overflow-hidden rounded-[10px]">
          <Image
            src={url}
            alt={value.alt ?? ""}
            fill
            sizes="(min-width: 768px) 700px, 100vw"
            className="object-cover"
          />
        </span>
      );
    },
  },
};
