import { defineField, defineType } from "sanity";

export const post = defineType({
  name: "post",
  title: "News post",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "title" }, validation: (r) => r.required() }),
    defineField({ name: "excerpt", title: "Excerpt", type: "text" }),
    defineField({ name: "coverImage", title: "Cover image", type: "image", options: { hotspot: true } }),
    defineField({
      name: "coverFit",
      title: "Cover image fit",
      type: "string",
      description:
        "Crop to fill suits a photograph. Choose Show whole image for a logo or graphic, which would otherwise be cut off on wide screens.",
      options: {
        list: [
          { title: "Crop to fill (default)", value: "cover" },
          { title: "Show whole image", value: "contain" },
        ],
        layout: "radio",
      },
      initialValue: "cover",
    }),
    defineField({ name: "publishedAt", title: "Published at", type: "datetime", validation: (r) => r.required() }),
    defineField({ name: "tags", title: "Tags", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "body", title: "Body", type: "array", of: [{ type: "block" }, { type: "image" }] }),
  ],
  preview: {
    select: { title: "title", subtitle: "publishedAt" },
  },
});
