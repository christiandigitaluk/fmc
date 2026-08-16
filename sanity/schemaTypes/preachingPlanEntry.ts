import { defineField, defineType } from "sanity";

export const preachingPlanEntry = defineType({
  name: "preachingPlanEntry",
  title: "Preaching plan entry",
  type: "document",
  fields: [
    defineField({ name: "date", title: "Date", type: "date", validation: (r) => r.required() }),
    defineField({
      name: "church",
      title: "Church",
      type: "reference",
      to: [{ type: "church" }],
      validation: (r) => r.required(),
    }),
    defineField({ name: "time", title: "Time", type: "string", validation: (r) => r.required() }),
    defineField({ name: "preacher", title: "Preacher", type: "string", validation: (r) => r.required() }),
    defineField({ name: "notes", title: "Notes", type: "string" }),
  ],
  preview: {
    select: { title: "preacher", subtitle: "date" },
  },
});
