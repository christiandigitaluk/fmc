"use client";

import { useActionState, useEffect, useState } from "react";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Checkbox } from "@/components/ui/Checkbox";
import { Button } from "@/components/ui/Button";
import { Alert } from "@/components/ui/Alert";
import { Honeypot } from "@/components/ui/Honeypot";
import { submitHallHireRequest, type HallHireFormState } from "@/app/(site)/hall-hire/actions";
import type { Church } from "@/lib/types";

const initialState: HallHireFormState = { status: "idle" };

export function HallHireForm({ churches, defaultChurchSlug }: { churches: Church[]; defaultChurchSlug?: string }) {
  const [state, formAction, pending] = useActionState(submitHallHireRequest, initialState);

  /**
   * Controlled rather than defaultValue. The "Enquire about Wanstead" button
   * on this same page links to ?church=wanstead, which is a same-route
   * navigation: this component never unmounts, so a defaultValue would only
   * ever reflect the church selected on first load. Syncing on the prop keeps
   * the select in step with the URL while leaving the visitor free to change
   * it afterwards.
   */
  const [churchSlug, setChurchSlug] = useState(defaultChurchSlug ?? "");

  useEffect(() => {
    // Only when the URL names a church, so arriving without the parameter
    // never wipes a choice the visitor has already made.
    if (defaultChurchSlug) setChurchSlug(defaultChurchSlug);
  }, [defaultChurchSlug]);

  const churchOptions = churches.map((c) => ({ value: c.slug, label: `${c.name} (${c.area})` }));

  if (state.status === "success") {
    return (
      <Alert tone="success" title="Enquiry sent">
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

      <Select
        label="Which church would you like to hire?"
        name="churchSlug"
        options={churchOptions}
        value={churchSlug}
        onChange={(e) => setChurchSlug(e.target.value)}
      />

      <Input label="Organisation or group name" name="organisation" required placeholder="e.g. Leytonstone Toddler Group" />

      <div className="grid gap-6 sm:grid-cols-2">
        <Input label="Your name" name="contactName" required placeholder="Full name" />
        <Input label="Website or social media" name="orgWebsite" placeholder="Optional" />
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <Input label="Email address" name="contactEmail" type="email" required placeholder="you@example.com" />
        <Input label="Phone number" name="contactPhone" type="tel" placeholder="Optional" />
      </div>

      <Input
        label="Tell us about your enquiry"
        name="message"
        textarea
        placeholder="The room or space you need, dates, times, numbers attending, and anything else we should know."
      />

      <Checkbox label="I agree to be contacted about this enquiry" />

      <div>
        <Button type="submit" variant="primary" size="lg" disabled={pending}>
          {pending ? "Sending…" : "Send enquiry"}
        </Button>
      </div>
    </form>
  );
}
