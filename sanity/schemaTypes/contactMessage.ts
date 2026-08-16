import { defineField, defineType } from "sanity";

export const contactMessage = defineType({
  name: "contactMessage",
  title: "Contact message",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Name", type: "string" }),
    defineField({ name: "email", title: "Email", type: "string" }),
    defineField({ name: "phone", title: "Phone", type: "string" }),
    defineField({ name: "subject", title: "Subject", type: "string" }),
    defineField({ name: "message", title: "Message", type: "text" }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      options: { list: ["new", "read", "replied"] },
      initialValue: "new",
    }),
  ],
  preview: {
    select: { title: "name", subtitle: "subject" },
  },
});
