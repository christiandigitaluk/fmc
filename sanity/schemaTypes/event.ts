import { defineField, defineType } from "sanity";
import { EVENT_CATEGORIES } from "@/lib/types";

export const event = defineType({
  name: "event",
  title: "Event",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "title" }, validation: (r) => r.required() }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: { list: [...EVENT_CATEGORIES] },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "startDateTime",
      title: "Start",
      type: "datetime",
      description: "For recurring events, this is a template — only its time-of-day and duration are used.",
      validation: (r) => r.required(),
    }),
    defineField({ name: "endDateTime", title: "End", type: "datetime", validation: (r) => r.required() }),
    defineField({
      name: "recurrence",
      title: "Repeats monthly",
      type: "object",
      description: "Set this for events that repeat on a fixed nth-weekday every month (e.g. '3rd Sunday'). Leave empty for one-off events.",
      fields: [
        defineField({
          name: "nthWeekday",
          title: "Which occurrence",
          type: "number",
          options: { list: [{ title: "1st", value: 1 }, { title: "2nd", value: 2 }, { title: "3rd", value: 3 }, { title: "4th", value: 4 }, { title: "5th", value: 5 }] },
        }),
        defineField({
          name: "weekday",
          title: "Day of week",
          type: "number",
          options: {
            list: [
              { title: "Sunday", value: 0 },
              { title: "Monday", value: 1 },
              { title: "Tuesday", value: 2 },
              { title: "Wednesday", value: 3 },
              { title: "Thursday", value: 4 },
              { title: "Friday", value: 5 },
              { title: "Saturday", value: 6 },
            ],
          },
        }),
      ],
    }),
    defineField({
      name: "church",
      title: "Church",
      type: "reference",
      to: [{ type: "church" }],
      validation: (r) => r.required(),
    }),
    defineField({ name: "location", title: "Location override", type: "string" }),
    defineField({ name: "description", title: "Description", type: "text" }),
    defineField({ name: "image", title: "Image", type: "image", options: { hotspot: true } }),
    defineField({ name: "ticketUrl", title: "Ticket link", type: "url" }),
  ],
  preview: {
    select: { title: "title", subtitle: "category" },
  },
});
