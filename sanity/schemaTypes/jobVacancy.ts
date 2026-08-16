import { defineField, defineType } from "sanity";

export const jobVacancy = defineType({
  name: "jobVacancy",
  title: "Job vacancy",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Role title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "salary", title: "Salary", type: "string", validation: (r) => r.required() }),
    defineField({ name: "hours", title: "Hours", type: "string", validation: (r) => r.required() }),
    defineField({ name: "closingDate", title: "Closing date", type: "string", validation: (r) => r.required() }),
    defineField({ name: "advertHref", title: "Job advert link", type: "url" }),
    defineField({ name: "descriptionHref", title: "Job description link", type: "url" }),
    defineField({
      name: "active",
      title: "Show on site",
      type: "boolean",
      description: "Turn off once the role is filled or the closing date has passed, rather than deleting it.",
      initialValue: true,
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "closingDate", active: "active" },
    prepare: ({ title, subtitle, active }) => ({
      title,
      subtitle: active === false ? `Closed · closed ${subtitle}` : `Open · closes ${subtitle}`,
    }),
  },
});
