import { defineField, defineType } from "sanity";

export const bookingRequest = defineType({
  name: "bookingRequest",
  title: "Hall hire request",
  type: "document",
  fields: [
    defineField({ name: "churchSlug", title: "Church slug", type: "string" }),
    defineField({ name: "organisation", title: "Organisation", type: "string" }),
    defineField({ name: "contactName", title: "Contact name", type: "string" }),
    defineField({ name: "contactEmail", title: "Contact email", type: "string" }),
    defineField({ name: "contactPhone", title: "Contact phone", type: "string" }),
    defineField({
      name: "orgWebsite",
      title: "Organisation website / social media",
      type: "string",
      description: "The enquiring group's own site or social page, not the circuit's. Optional.",
    }),
    defineField({ name: "message", title: "Message", type: "text" }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      options: { list: ["new", "in-progress", "confirmed", "declined"] },
      initialValue: "new",
    }),
  ],
  preview: {
    select: { title: "organisation", subtitle: "status" },
  },
});
