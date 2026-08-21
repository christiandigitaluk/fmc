/**
 * The site's own origin, without a trailing slash.
 *
 * Vercel sets VERCEL_PROJECT_PRODUCTION_URL at build time to the project's
 * production domain, so share links and og:image URLs resolve absolutely
 * without making pages dynamic. The fallback is the domain the circuit will
 * use once DNS points here.
 *
 * Server only: VERCEL_PROJECT_PRODUCTION_URL is not NEXT_PUBLIC_, so it is not
 * inlined into client bundles. Read it in a server component and pass the
 * finished URL down as a prop.
 */
export const SITE_ORIGIN = `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL ?? "www.forestcircuit.co.uk"}`;
