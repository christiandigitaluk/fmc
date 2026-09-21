"use client";

import { useActionState } from "react";
import { Select } from "@/components/ui/Select";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Alert } from "@/components/ui/Alert";
import { Honeypot } from "@/components/ui/Honeypot";
import { submitFeedbackForm, type FeedbackFormState } from "@/app/(site)/feedback/actions";

const initialState: FeedbackFormState = { status: "idle" };

const RESPONDENT_OPTIONS = [
  { value: "", label: "Choose one" },
  { value: "Member of a Forest Circuit church", label: "Member of a Forest Circuit church" },
  { value: "Visitor exploring the circuit", label: "Visitor exploring the circuit" },
  { value: "Looking to hire a venue", label: "Looking to hire a venue" },
  { value: "Other", label: "Other" },
];

const EASE_OPTIONS = [
  { value: "", label: "Choose one" },
  { value: "Very easy", label: "Very easy" },
  { value: "Easy", label: "Easy" },
  { value: "OK", label: "OK" },
  { value: "Difficult", label: "Difficult" },
  { value: "Very difficult", label: "Very difficult" },
];

const RATING_OPTIONS = [
  { value: "", label: "Choose one" },
  { value: "Excellent", label: "Excellent" },
  { value: "Good", label: "Good" },
  { value: "OK", label: "OK" },
  { value: "Poor", label: "Poor" },
];

const RECOMMEND_OPTIONS = [
  { value: "", label: "Choose one" },
  { value: "Yes", label: "Yes" },
  { value: "Maybe", label: "Maybe" },
  { value: "No", label: "No" },
];

export function FeedbackForm() {
  const [state, formAction, pending] = useActionState(submitFeedbackForm, initialState);

  if (state.status === "success") {
    return (
      <Alert tone="success" title="Feedback received">
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

      <Select label="Which best describes you?" name="respondentType" options={RESPONDENT_OPTIONS} defaultValue="" />

      <div className="grid gap-6 sm:grid-cols-2">
        <Select
          label="How easy was it to find what you were looking for?"
          name="easeOfUse"
          options={EASE_OPTIONS}
          defaultValue=""
        />
        <Select
          label="How would you rate the overall look and feel of the site?"
          name="overallRating"
          options={RATING_OPTIONS}
          defaultValue=""
        />
      </div>

      <Select
        label="Would you recommend the site to others in the circuit?"
        name="recommend"
        options={RECOMMEND_OPTIONS}
        defaultValue=""
      />

      <Input
        label="Anything else you'd like to tell us?"
        name="comments"
        textarea
        placeholder="What didn't work, what you'd like to see, or just general thoughts. Optional."
      />

      <div className="grid gap-6 sm:grid-cols-2">
        <Input label="Your name" name="name" placeholder="Optional" />
        <Input label="Email address" name="email" type="email" placeholder="Optional, if you'd like a reply" />
      </div>

      <div>
        <Button type="submit" variant="primary" size="lg" disabled={pending}>
          {pending ? "Sending…" : "Send feedback"}
        </Button>
      </div>
    </form>
  );
}
