import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { NewsletterSignup } from "@/components/layout/NewsletterSignup";
import { getSiteSettings } from "@/lib/content";

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const settings = await getSiteSettings();

  return (
    // Short pages — Jobs with no vacancies, say — otherwise stopped above the
    // fold on a tall window and left the page background showing beneath the
    // footer. Growing the main column takes up whatever slack is left so the
    // footer always reaches the bottom.
    <div className="flex min-h-dvh flex-col">
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <Header settings={settings} />
      <main id="main-content" className="flex-1">
        {children}
      </main>
      <NewsletterSignup />
      <Footer settings={settings} />
    </div>
  );
}
