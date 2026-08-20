import { defineField, defineType } from "sanity";

export const notice = defineType({
  name: "notice",
  title: "Noticeboard item",
  type: "document",
  description:
    "A short notice shown under the news articles: an opportunity, a deadline, something from the wider Methodist Church worth a line rather than a whole article.",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title" },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "summary",
      title: "Summary",
      type: "text",
      rows: 3,
      description: "One or two sentences. Anything longer wants to be a news article instead.",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "deadline",
      title: "Deadline",
      type: "date",
      options: { dateFormat: "YYYY-MM-DD" },
      description:
        "Optional. Shown on the badge, and the notice comes off the site by itself once this date has passed.",
    }),
    defineField({
      name: "label",
      title: "Badge label",
      type: "string",
      description: 'Used only when there is no deadline. Defaults to "Opportunity".',
    }),
    defineField({
      name: "url",
      title: "Link",
      type: "url",
      description: "Where the notice points. Strip any utm or tracking parameters first.",
    }),
  ],
  preview: { select: { title: "title", subtitle: "deadline" } },
});
