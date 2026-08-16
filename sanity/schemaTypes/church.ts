import { defineField, defineType } from "sanity";

export const church = defineType({
  name: "church",
  title: "Church",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Name", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "name" },
      validation: (r) => r.required(),
    }),
    defineField({ name: "area", title: "Area", type: "string", validation: (r) => r.required() }),
    defineField({ name: "address", title: "Street address", type: "string" }),
    defineField({ name: "postcode", title: "Postcode", type: "string" }),
    defineField({ name: "minister", title: "Minister", type: "string" }),
    defineField({ name: "phone", title: "Phone", type: "string" }),
    defineField({ name: "email", title: "Email", type: "string" }),
    defineField({ name: "image", title: "Cover image", type: "image", options: { hotspot: true } }),
    defineField({ name: "description", title: "Description", type: "text" }),
    defineField({
      name: "serviceTimes",
      title: "Service times",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "day", type: "string" },
            { name: "time", type: "string" },
            { name: "label", type: "string" },
          ],
        },
      ],
    }),
    defineField({
      name: "facilities",
      title: "Facilities",
      type: "array",
      of: [{ type: "string" }],
      options: {
        list: [
          "Wheelchair access",
          "Hall hire",
          "Youth programme",
          "Parking",
          "Toddler group",
          "Food bank",
          "Hearing loop",
        ],
      },
    }),
    defineField({ name: "hallHireInfo", title: "Hall hire info", type: "text" }),
    defineField({ name: "lat", title: "Latitude", type: "number" }),
    defineField({ name: "lng", title: "Longitude", type: "number" }),
    defineField({
      name: "worshipping",
      title: "Active worshipping congregation",
      type: "boolean",
      description: "Turn off for buildings kept on purely for hall hire, with no regular services.",
      initialValue: true,
    }),
  ],
  preview: {
    select: { title: "name", subtitle: "area" },
  },
});
