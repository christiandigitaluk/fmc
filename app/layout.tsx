import type { Metadata } from "next";
import { BASE_OPEN_GRAPH, HOME_TITLE, SHARE_IMAGE_URL, SITE_DESCRIPTION } from "@/lib/seo";
import localFont from "next/font/local";
import { draftMode } from "next/headers";
import { VisualEditing } from "next-sanity";
import { ExitPreviewButton } from "@/components/ExitPreviewButton";
import "./globals.css";

// Self-hosted (not next/font/google) so the build never depends on Google's
// font CDN being reachable — both files are variable fonts covering the
// weight range we use, downloaded once into public/fonts.
const baloo2 = localFont({
  src: "../public/fonts/Baloo2-Variable.woff2",
  variable: "--font-baloo-2",
  weight: "600 800",
  display: "swap",
});

const instrumentSans = localFont({
  src: "../public/fonts/InstrumentSans-Variable.woff2",
  variable: "--font-instrument-sans",
  weight: "400 700",
  display: "swap",
});

// The canonical URL and the home page's own title, description and og:url are
// set on the home page itself, not here: anything in this block is inherited
// by every page that doesn't override it, so a canonical of "/" here would
// tell Google that any page missing its own was a copy of the home page.
export const metadata: Metadata = {
  metadataBase: new URL("https://www.forestcircuit.co.uk"),
  title: {
    default: HOME_TITLE,
    template: "%s | Forest Circuit",
  },
  description: SITE_DESCRIPTION,
  openGraph: BASE_OPEN_GRAPH,
  twitter: {
    card: "summary_large_image",
    images: [SHARE_IMAGE_URL],
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Forest Methodist Circuit",
  alternateName: "Forest Circuit",
  url: "https://www.forestcircuit.co.uk",
  logo: "https://www.forestcircuit.co.uk/images/logo-ink.png",
  description: SITE_DESCRIPTION,
  areaServed: "Waltham Forest, Wanstead and Loughton",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isEnabled: preview } = await draftMode();

  return (
    <html lang="en" className={`${baloo2.variable} ${instrumentSans.variable}`}>
      <body className="antialiased">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }} />
        {children}
        {preview && (
          <>
            <VisualEditing />
            <ExitPreviewButton />
          </>
        )}
      </body>
    </html>
  );
}
