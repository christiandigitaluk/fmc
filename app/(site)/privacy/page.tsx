import type { Metadata } from "next";
import Link from "next/link";
import { Mail } from "lucide-react";
import { PageAccents } from "@/components/ui/PageAccents";

export const metadata: Metadata = {
  title: "Privacy Notice",
  description: "How Forest Circuit collects, uses and protects information submitted through this website.",
  alternates: { canonical: "/privacy" },
};

const LAST_UPDATED = "17 August 2026";

export default function PrivacyPage() {
  return (
    <div className="relative container-max max-w-3xl py-14 md:py-20">
      <PageAccents variant="blob" />
      <p className="eyebrow mb-3">How we handle your information</p>
      <h1 style={{ fontSize: "var(--text-h1)" }} className="mb-4">
        Privacy notice
      </h1>
      <p className="mb-10 text-sm text-[var(--text-muted)]">Last updated {LAST_UPDATED}</p>

      <div className="flex flex-col gap-8 text-[var(--text-body)]" style={{ fontSize: "var(--text-lead)" }}>
        <p>
          This notice covers this website only: forestcircuit.co.uk. It explains what information we collect when
          you use it, what we do with it, and the choices and rights you have. For our wider policies covering the
          circuit&apos;s churches and safeguarding practice, see{" "}
          <Link href="/safeguarding/data-protection" className="text-forest-600 hover:underline">
            data protection
          </Link>{" "}
          and{" "}
          <Link href="/safeguarding" className="text-forest-600 hover:underline">
            safeguarding
          </Link>
          .
        </p>

        <section>
          <h2 style={{ fontSize: "var(--text-h3)" }} className="mb-3 text-[var(--text-heading)]">
            Who we are
          </h2>
          <p>
            Forest Methodist Circuit is the data controller for information collected through this website.
            We&apos;re a team ministry of ten Methodist churches across Waltham Forest, Wanstead and Loughton, and a
            registered charity. You can reach us using the details at the bottom of this page.
          </p>
        </section>

        <section>
          <h2 style={{ fontSize: "var(--text-h3)" }} className="mb-3 text-[var(--text-heading)]">
            What we collect, and why
          </h2>
          <p className="mb-4">
            We only collect what you give us directly through the forms on this site. There&apos;s no tracking or
            analytics running in the background, and the site doesn&apos;t use advertising or marketing cookies.
          </p>
          <div className="flex flex-col gap-4">
            <div className="rounded-[10px] border-2 border-ink-900 bg-forest-100 p-5">
              <p className="mb-1 font-bold text-[var(--text-heading)]">Contact form</p>
              <p>
                Name, email, phone number, subject and message, so we can read and reply to what you&apos;ve sent
                us.
              </p>
            </div>
            <div className="rounded-[10px] border-2 border-ink-900 bg-forest-100 p-5">
              <p className="mb-1 font-bold text-[var(--text-heading)]">Hall hire enquiries</p>
              <p>
                Organisation name, your name, email and phone number, the room and date you&apos;re asking about,
                and any message, so a church can get back to you about booking a space.
              </p>
            </div>
            <div className="rounded-[10px] border-2 border-ink-900 bg-forest-100 p-5">
              <p className="mb-1 font-bold text-[var(--text-heading)]">Newsletter sign-up</p>
              <p>Name and email address, so we can send you circuit news, roughly once a month, until you unsubscribe.</p>
            </div>
          </div>
        </section>

        <section>
          <h2 style={{ fontSize: "var(--text-h3)" }} className="mb-3 text-[var(--text-heading)]">
            Our legal basis
          </h2>
          <p>
            We handle contact and hall hire enquiries under legitimate interest: responding to a message you&apos;ve
            chosen to send us. We only add you to the newsletter with your consent, given when you sign up, and you
            can withdraw it at any time by unsubscribing or contacting us.
          </p>
        </section>

        <section>
          <h2 style={{ fontSize: "var(--text-h3)" }} className="mb-3 text-[var(--text-heading)]">
            Where it&apos;s stored, and who sees it
          </h2>
          <p>
            Form submissions are stored in Sanity, the content platform this website runs on, and are visible only
            to circuit staff and volunteers who need them to respond. We don&apos;t sell, rent or share your
            information with anyone else for their own marketing. We keep enquiries for as long as it&apos;s useful
            to answer them and for our own record-keeping, then delete them.
          </p>
        </section>

        <section>
          <h2 style={{ fontSize: "var(--text-h3)" }} className="mb-3 text-[var(--text-heading)]">
            Maps on church pages
          </h2>
          <p>
            Each church&apos;s page includes an embedded map from OpenStreetMap so you can see where it is. Loading
            that map shares your IP address with OpenStreetMap in the same way any embedded map or image would; we
            don&apos;t receive any of that information ourselves. Their own privacy policy is available at{" "}
            <a
              href="https://wiki.osmfoundation.org/wiki/Privacy_Policy"
              target="_blank"
              rel="noreferrer"
              className="text-forest-600 hover:underline"
            >
              osmfoundation.org
            </a>
            .
          </p>
        </section>

        <section>
          <h2 style={{ fontSize: "var(--text-h3)" }} className="mb-3 text-[var(--text-heading)]">
            Your rights
          </h2>
          <p className="mb-3">Under UK GDPR, you can ask us at any time to:</p>
          <ul className="flex list-disc flex-col gap-2 pl-5">
            <li>tell you what information we hold about you</li>
            <li>correct anything that&apos;s wrong</li>
            <li>delete your information</li>
            <li>stop using it, or hand you a copy to take elsewhere</li>
          </ul>
          <p className="mt-3">
            Contact us using the details below and we&apos;ll respond within a month. If you&apos;re unhappy with how
            we&apos;ve handled your information, you can also complain to the Information Commissioner&apos;s Office
            at{" "}
            <a href="https://ico.org.uk" target="_blank" rel="noreferrer" className="text-forest-600 hover:underline">
              ico.org.uk
            </a>
            .
          </p>
        </section>

        <section>
          <h2 style={{ fontSize: "var(--text-h3)" }} className="mb-3 text-[var(--text-heading)]">
            Changes to this notice
          </h2>
          <p>
            If we change how this website handles your information, we&apos;ll update this page and the date at the
            top of it.
          </p>
        </section>

        <div className="mt-4 rounded-[10px] border-2 border-ink-900 bg-cream-100 p-5">
          <p className="mb-1 font-bold text-[var(--text-heading)]">Questions about this notice?</p>
          <a href="mailto:office@forestcircuit.org.uk" className="inline-flex items-center gap-2 font-semibold text-forest-700">
            <Mail size={16} aria-hidden="true" />
            office@forestcircuit.org.uk
          </a>
        </div>
      </div>
    </div>
  );
}
