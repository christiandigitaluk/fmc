import { defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site settings",
  type: "document",
  fields: [
    defineField({ name: "bannerActive", title: "Show banner", type: "boolean", initialValue: false }),
    defineField({ name: "bannerText", title: "Banner text", type: "string" }),
    defineField({ name: "bannerLinkHref", title: "Banner link URL", type: "string" }),
    defineField({ name: "bannerLinkLabel", title: "Banner link label", type: "string" }),
    defineField({
      name: "bannerEndsAt",
      title: "Show banner until",
      type: "date",
      options: { dateFormat: "YYYY-MM-DD" },
      description:
        "Optional. The last day the banner appears; it switches itself off after that. Leave blank to keep it up until you untick Show banner.",
    }),
    defineField({ name: "phone", title: "Circuit phone", type: "string" }),
    defineField({ name: "email", title: "Circuit email", type: "string" }),
    defineField({ name: "facebookUrl", title: "Facebook URL", type: "url" }),
    defineField({ name: "instagramUrl", title: "Instagram URL", type: "url" }),
  ],
  preview: {
    prepare: () => ({ title: "Site settings" }),
  },
});
