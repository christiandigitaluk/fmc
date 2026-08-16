# Forest Circuit — Website

A new marketing and CMS-driven site for [Forest Methodist Circuit](https://www.forestcircuit.co.uk/), a team ministry
of ten Methodist churches across Waltham Forest, Wanstead and Loughton. Built to the circuit's new brand identity —
"Heaven touching earth" — using Next.js 15 (App Router), TypeScript, Tailwind CSS 4, and Sanity Studio as the
headless CMS.

## Run locally

```bash
npm install
npm run dev        # http://localhost:3010
npm run build      # production build
```

The whole site works immediately with **zero configuration** — every page reads from realistic mock data in
`lib/mock/` via the fallback layer in `lib/content.ts`. Nothing needs a Sanity account to preview or demo the site.

## Pages

| Route | Purpose |
|---|---|
| `/` | Home — hero, find-a-church search, quick actions, featured churches and news |
| `/churches` | Church directory — search, filter by area and facilities, grid/list view |
| `/churches/[slug]` | Church detail — service times, facilities, hall hire, map, contact |
| `/preaching-plan` | Searchable, printable circuit preaching plan |
| `/events` | Events by category, each with an "Add to calendar" (.ics) export |
| `/news` + `/news/[slug]` | Circuit news and community stories |
| `/hall-hire` | Hall & premises hire enquiry form (server action) |
| `/contact` | Circuit and per-church contact details |
| `/studio` | Embedded Sanity Studio (content admin) |

## Design system

All tokens in `app/globals.css` are ported 1:1 from the brand handoff (`colors.css`, `typography.css`,
`spacing.css`, `effects.css`) into a Tailwind v4 `@theme` block — forest green primary actions, gold accents only,
Instrument Serif display type, Instrument Sans body/UI, pill buttons, 10px card radius. UI primitives in
`components/ui/` (Button, Card, Badge, Input, Select, Checkbox, Tabs, Alert) match the component contracts supplied
in the design handoff.

## Going live: connecting Sanity CMS

The site is fully wired for [Sanity.io](https://www.sanity.io) but runs on mock data until you connect a real
project. To switch to live, editable content:

1. **Create a free Sanity account** at [sanity.io](https://www.sanity.io) and create a new project (any name).
2. In the Sanity dashboard, note your **Project ID**, and create a dataset named `production` if one doesn't exist.
3. Copy `.env.local.example` to `.env.local` and fill in:
   ```
   NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
   NEXT_PUBLIC_SANITY_DATASET=production
   ```
4. Restart `npm run dev`, then visit `http://localhost:3010/studio` — you'll be prompted to add
   `http://localhost:3010` as a CORS origin in your Sanity project (Studio gives you a one-click button for this).
5. Log in with your Sanity account and start adding Churches, News posts, Events and Preaching plan entries. Every
   page on the site will now read live content instead of mock data — no code changes needed.
6. To let the **hall hire form** write real booking requests into Sanity, create an API token with **Editor**
   permissions at `manage.sanity.io` → your project → API → Tokens, and add it as `SANITY_API_TOKEN` in
   `.env.local` (and in your hosting provider's environment variables — never commit this token).

Non-technical volunteers can be invited as Studio members (Settings → Members in the Sanity dashboard) with
"Editor" access, so they can update news, service times and preaching plans without touching code.

## Content structure (Sanity schemas)

Defined in `sanity/schemaTypes/`: `church`, `post` (news), `event`, `preachingPlanEntry`, `bookingRequest` (hall
hire submissions), and a singleton `siteSettings` (banner, circuit contact details, social links).

## Deployment

1. Push this repository to GitHub.
2. Import into [Vercel](https://vercel.com) (free tier is fine) — it auto-detects Next.js.
3. Add the same environment variables from `.env.local` in Vercel's project settings.
4. Point `forestcircuit.co.uk` DNS at Vercel once you're ready to go live.

## Accessibility

Built to a WCAG 2.1 AAA target: semantic landmarks and skip link, visible gold focus rings on every interactive
element, labelled form fields with error/hint associations, a focus-trapped and `Escape`-closable mobile nav
drawer, and a print-friendly preaching plan view. Run a manual keyboard-only pass and an automated audit (e.g.
axe DevTools) before launch.

## Images

Logo and editorial photography from the brand handoff live in `public/images/`. Replace with final client-approved
photography before launch — church-specific photos would strengthen each `/churches/[slug]` page.
