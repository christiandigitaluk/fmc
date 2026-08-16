"use client";

import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { presentationTool } from "sanity/presentation";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "@/sanity/schemaTypes";
import { structure } from "@/sanity/structure";
import { projectId, dataset, apiVersion } from "@/sanity/env";

export default defineConfig({
  basePath: "/studio",
  name: "forest-circuit",
  title: "Forest Circuit",
  projectId: projectId || "placeholder",
  dataset,
  apiVersion,
  schema: { types: schemaTypes },
  plugins: [
    structureTool({ structure }),
    visionTool(),
    presentationTool({
      previewUrl: {
        previewMode: {
          enable: "/api/draft-mode/enable",
        },
      },
      resolve: {
        locations: {
          church: {
            select: { slug: "slug.current", name: "name" },
            resolve: (doc) => ({
              locations: doc?.slug
                ? [
                    { title: doc.name || "Untitled church", href: `/churches/${doc.slug}` },
                    { title: "Find a church", href: "/churches" },
                  ]
                : [{ title: "Find a church", href: "/churches" }],
            }),
          },
          post: {
            select: { slug: "slug.current", title: "title" },
            resolve: (doc) => ({
              locations: doc?.slug
                ? [
                    { title: doc.title || "Untitled post", href: `/news/${doc.slug}` },
                    { title: "News", href: "/news" },
                  ]
                : [{ title: "News", href: "/news" }],
            }),
          },
          event: {
            select: { title: "title" },
            resolve: () => ({ locations: [{ title: "Events", href: "/events" }] }),
          },
          preachingPlanEntry: {
            select: { date: "date" },
            resolve: () => ({ locations: [{ title: "Preaching plan", href: "/preaching-plan" }] }),
          },
          jobVacancy: {
            select: { title: "title" },
            resolve: (doc) => ({
              locations: [{ title: doc?.title || "Jobs", href: "/jobs" }],
            }),
          },
          siteSettings: {
            select: { bannerText: "bannerText" },
            resolve: () => ({ locations: [{ title: "Home", href: "/" }] }),
          },
        },
      },
    }),
  ],
});
