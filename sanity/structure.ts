import type { StructureResolver } from "sanity/structure";

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Forest Circuit content")
    .items([
      S.listItem()
        .title("Site settings")
        .child(S.document().schemaType("siteSettings").documentId("siteSettings")),
      S.divider(),
      S.documentTypeListItem("church").title("Churches"),
      S.documentTypeListItem("post").title("News posts"),
      S.documentTypeListItem("notice").title("Noticeboard"),
      S.documentTypeListItem("event").title("Events"),
      S.documentTypeListItem("preachingPlanEntry").title("Preaching plan"),
      S.documentTypeListItem("jobVacancy").title("Jobs"),
      S.divider(),
      S.documentTypeListItem("bookingRequest").title("Hall hire requests"),
      S.documentTypeListItem("newsletterSignup").title("Newsletter signups"),
      S.documentTypeListItem("contactMessage").title("Contact messages"),
    ]);
