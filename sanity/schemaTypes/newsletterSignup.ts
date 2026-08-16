import { defineField, defineType } from "sanity";

export const newsletterSignup = defineType({
  name: "newsletterSignup",
  title: "Newsletter signup",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Name", type: "string" }),
    defineField({ name: "email", title: "Email", type: "string" }),
  ],
  preview: {
    select: { title: "name", subtitle: "email" },
  },
});
