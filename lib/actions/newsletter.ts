"use server";

import { submitNewsletterSignup } from "@/lib/content";
import type { NewsletterSignup } from "@/lib/types";

export type NewsletterFormState = {
  status: "idle" | "success" | "error";
  message?: string;
};

export async function submitNewsletterForm(
  _prevState: NewsletterFormState,
  formData: FormData
): Promise<NewsletterFormState> {
  const signup: NewsletterSignup = {
    name: String(formData.get("name") ?? ""),
    email: String(formData.get("email") ?? ""),
  };

  if (!signup.name || !signup.email) {
    return { status: "error", message: "Please add your name and email address." };
  }

  const result = await submitNewsletterSignup(signup);
  return result.ok
    ? { status: "success", message: "You're on the list! Watch your inbox for circuit news." }
    : { status: "error", message: "Sorry, something went wrong. Please try again." };
}
