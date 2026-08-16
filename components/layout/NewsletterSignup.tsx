"use client";

import { useActionState } from "react";
import { Mail } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Alert } from "@/components/ui/Alert";
import { submitNewsletterForm, type NewsletterFormState } from "@/lib/actions/newsletter";

const initialState: NewsletterFormState = { status: "idle" };

export function NewsletterSignup() {
  const [state, formAction, pending] = useActionState(submitNewsletterForm, initialState);

  return (
    <section
      className="relative overflow-hidden border-t-8 border-white bg-forest-700 text-white md:border-t-[10px]"
      aria-labelledby="newsletter-heading"
    >
      {/* Decorative shapes for a bit of quirk */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-16 -top-20 h-56 w-56 rounded-full bg-forest-600/60 md:h-72 md:w-72"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-10 bottom-0 hidden h-40 w-40 rounded-full border-2 border-orange-500/40 lg:block"
      />

      <div className="container-max relative grid gap-10 py-20 md:py-28 lg:grid-cols-[1fr_1fr] lg:items-center">
        <div>
          <span className="sticker mb-5 inline-flex items-center rounded-full bg-orange-500 px-4 py-1.5 text-sm font-bold uppercase tracking-wide text-ink-900">
            Don&apos;t miss a thing
          </span>
          <h2 id="newsletter-heading" className="max-w-md text-white" style={{ fontSize: "var(--text-h1)" }}>
            Get circuit news in your inbox
          </h2>
          <p className="mt-4 max-w-md text-white/85" style={{ fontSize: "var(--text-lead)" }}>
            Service updates, events and stories from across our ten churches, roughly once a month. No spam,
            unsubscribe whenever you like.
          </p>
        </div>

        <div className="relative mx-auto w-full max-w-md lg:mx-0 lg:justify-self-end">
          <span className="sticker absolute -right-4 -top-6 z-10 hidden rotate-6 rounded-full bg-white px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-forest-700 sm:inline-flex">
No spam, we promise
          </span>

          <div className="sticker -rotate-1 rounded-[20px] bg-white p-6 text-[var(--text-heading)] sm:p-8">
            {state.status === "success" ? (
              <Alert tone="success" title="Thank you!">
                {state.message}
              </Alert>
            ) : (
              <form action={formAction} className="flex flex-col gap-5" noValidate>
                {state.status === "error" && (
                  <Alert tone="error" title="Something's not right">
                    {state.message}
                  </Alert>
                )}
                <Input label="Your name" name="name" required placeholder="Full name" />
                <Input label="Email address" name="email" type="email" required placeholder="you@example.com" />
                <Button type="submit" variant="primary" size="lg" disabled={pending} className="w-full">
                  <Mail size={18} aria-hidden="true" />
                  {pending ? "Signing you up…" : "Sign me up"}
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
