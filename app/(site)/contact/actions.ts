"use server";

import { submitContactMessage } from "@/lib/content";
import { isHoneypotFilled } from "@/lib/honeypot";
import type { ContactMessage } from "@/lib/types";

export type ContactFormState = {
  status: "idle" | "success" | "error";
  message?: string;
};

export async function submitContactForm(
  _prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  if (isHoneypotFilled(formData)) {
    return { status: "success", message: "Thank you. Your message has been sent, and we'll get back to you soon." };
  }

  const contact: ContactMessage = {
    name: String(formData.get("name") ?? ""),
    email: String(formData.get("email") ?? ""),
    phone: String(formData.get("phone") ?? ""),
    subject: String(formData.get("subject") ?? ""),
    message: String(formData.get("message") ?? ""),
  };

  if (!contact.name || !contact.email || !contact.message) {
    return { status: "error", message: "Please fill in all required fields before submitting." };
  }

  const result = await submitContactMessage(contact);
  return result.ok
    ? { status: "success", message: "Thank you. Your message has been sent, and we'll get back to you soon." }
    : { status: "error", message: "Sorry, something went wrong sending your message. Please try again or email us directly." };
}
