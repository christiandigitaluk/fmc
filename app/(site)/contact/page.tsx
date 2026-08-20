import type { Metadata } from "next";
import { Mail, Phone } from "lucide-react";
import { ContactForm } from "@/components/contact/ContactForm";
import { PageAccents } from "@/components/ui/PageAccents";
import { getSiteSettings } from "@/lib/content";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Forest Methodist Circuit.",
  alternates: { canonical: "/contact" },
};

export default async function ContactPage() {
  const settings = await getSiteSettings();

  return (
    <div className="relative container-max py-14 md:py-20">
      <PageAccents variant="scatter" />
      <p className="eyebrow mb-3">Get in touch</p>
      <h1 style={{ fontSize: "var(--text-h1)" }} className="mb-4 max-w-2xl">
        Contact Forest Circuit
      </h1>
      <p className="mb-10 max-w-2xl text-lg text-[var(--text-body)]" style={{ fontSize: "var(--text-lead)" }}>
        For general enquiries, reach the circuit office below, or send us a message using the form.
      </p>

      <div className="mb-14 grid gap-6 md:grid-cols-2">
        <div className="rounded-[10px] border border-line-200 bg-white p-5 shadow-[var(--shadow-card)] sm:p-6">
          <p className="eyebrow mb-2">Phone</p>
          <a href={`tel:${settings.phone.replace(/\s/g, "")}`} className="flex items-center gap-2 text-base font-semibold text-forest-600">
            <Phone size={20} aria-hidden="true" />
            {settings.phone}
          </a>
        </div>
        <div className="rounded-[10px] border border-line-200 bg-white p-5 shadow-[var(--shadow-card)] sm:p-6">
          <p className="eyebrow mb-2">Email</p>
          <a href={`mailto:${settings.email}`} className="flex items-center gap-2 text-base font-semibold text-forest-600">
            <Mail size={20} className="shrink-0" aria-hidden="true" />
            <span className="min-w-0 break-words">{settings.email}</span>
          </a>
        </div>
      </div>

      <h2 style={{ fontSize: "var(--text-h2)" }} className="mb-6">
        Send us a message
      </h2>
      <div className="max-w-2xl rounded-[10px] border border-line-200 bg-white p-6 shadow-[var(--shadow-card)] sm:p-8">
        <ContactForm />
      </div>
    </div>
  );
}
