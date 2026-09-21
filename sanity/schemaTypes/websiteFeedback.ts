import { defineField, defineType } from "sanity";

export const websiteFeedback = defineType({
  name: "websiteFeedback",
  title: "Website feedback",
  type: "document",
  fields: [
    defineField({ name: "respondentType", title: "Respondent type", type: "string" }),
    defineField({ name: "easeOfUse", title: "Ease of finding things", type: "string" }),
    defineField({ name: "overallRating", title: "Overall rating", type: "string" }),
    defineField({ name: "recommend", title: "Would recommend", type: "string" }),
    defineField({ name: "comments", title: "Comments", type: "text" }),
    defineField({ name: "name", title: "Name", type: "string" }),
    defineField({ name: "email", title: "Email", type: "string" }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      options: { list: ["new", "read"] },
      initialValue: "new",
    }),
  ],
  preview: {
    select: { title: "overallRating", subtitle: "respondentType" },
  },
});
