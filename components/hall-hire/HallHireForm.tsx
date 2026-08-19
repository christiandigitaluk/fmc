"use client";

import { useActionState } from "react";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Checkbox } from "@/components/ui/Checkbox";
import { Button } from "@/components/ui/Button";
import { Alert } from "@/components/ui/Alert";
import { submitHallHireRequest, type HallHireFormState } from "@/app/(site)/hall-hire/actions";
import type { Church } from "@/lib/types";

const initialState: HallHireFormState = { status: "idle" };

export function HallHireForm({ churches, defaultChurchSlug }: { churches: Church[]; defaultChurchSlug?: string }) {
  const [state, formAction, pending] = useActionState(submitHallHireRequest, initialState);

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
      {state.status === "error" && (
        <Alert tone="error" title="Something's not right">
          {state.message}
        </Alert>
      )}

      <Select
        label="Which church would you like to hire?"
        name="churchSlug"
        options={churchOptions}
        defaultValue={defaultChurchSlug}
      />

      <div className="grid gap-6 sm:grid-cols-2">
        <Input label="Organisation or group name" name="organisation" required placeholder="e.g. Leytonstone Toddler Group" />
        <Input label="Room or space needed" name="room" placeholder="e.g. Main hall, meeting room" />
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <Input label="Your name" name="contactName" required placeholder="Full name" />
        <Input label="Requested date" name="requestedDate" type="date" />
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <Input label="Email address" name="contactEmail" type="email" required placeholder="you@example.com" />
        <Input label="Phone number" name="contactPhone" type="tel" placeholder="Optional" />
      </div>

      <Input label="Tell us about your booking" name="message" textarea placeholder="Dates, times, numbers attending, and anything else we should know." />

      <Checkbox label="I agree to be contacted about this enquiry" />

      <div>
        <Button type="submit" variant="primary" size="lg" disabled={pending}>
          {pending ? "Sending…" : "Send enquiry"}
        </Button>
      </div>
    </form>
  );
}
