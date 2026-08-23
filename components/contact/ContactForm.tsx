"use client";

import { useActionState } from "react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Alert } from "@/components/ui/Alert";
import { Honeypot } from "@/components/ui/Honeypot";
import { submitContactForm, type ContactFormState } from "@/app/(site)/contact/actions";

const initialState: ContactFormState = { status: "idle" };

export function ContactForm() {
  const [state, formAction, pending] = useActionState(submitContactForm, initialState);

  if (state.status === "success") {
    return (
      <Alert tone="success" title="Message sent">
        {state.message}
      </Alert>
    );
  }

  return (
    <form action={formAction} className="flex flex-col gap-6" noValidate>
      <Honeypot />
      {state.status === "error" && (
        <Alert tone="error" title="Something's not right">
          {state.message}
        </Alert>
      )}

      <div className="grid gap-6 sm:grid-cols-2">
        <Input label="Your name" name="name" required placeholder="Full name" />
        <Input label="Email address" name="email" type="email" required placeholder="you@example.com" />
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <Input label="Phone number" name="phone" type="tel" placeholder="Optional" />
        <Input label="Subject" name="subject" placeholder="What's this about?" />
      </div>

      <Input label="Message" name="message" textarea required placeholder="How can we help?" />

      <div>
        <Button type="submit" variant="primary" size="lg" disabled={pending}>
          {pending ? "Sending…" : "Send message"}
        </Button>
      </div>
    </form>
  );
}
