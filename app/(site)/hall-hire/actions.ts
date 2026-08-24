"use server";

import { submitBookingRequest } from "@/lib/content";
import { isHoneypotFilled } from "@/lib/honeypot";
import type { BookingRequest } from "@/lib/types";

export type HallHireFormState = {
  status: "idle" | "success" | "error";
  message?: string;
};

export async function submitHallHireRequest(
  _prevState: HallHireFormState,
  formData: FormData
): Promise<HallHireFormState> {
  if (isHoneypotFilled(formData)) {
    return {
      status: "success",
      message: "Thank you. Your enquiry has been sent, and a member of our team will be in touch shortly.",
    };
  }

  const orgWebsite = String(formData.get("orgWebsite") ?? "").trim();

  const request: BookingRequest = {
    churchSlug: String(formData.get("churchSlug") ?? ""),
    organisation: String(formData.get("organisation") ?? ""),
    contactName: String(formData.get("contactName") ?? ""),
    contactEmail: String(formData.get("contactEmail") ?? ""),
    contactPhone: String(formData.get("contactPhone") ?? ""),
    ...(orgWebsite ? { orgWebsite } : {}),
    message: String(formData.get("message") ?? ""),
  };

  if (!request.churchSlug || !request.organisation || !request.contactName || !request.contactEmail) {
    return { status: "error", message: "Please fill in all required fields before submitting." };
  }

  const result = await submitBookingRequest(request);
  return result.ok
    ? { status: "success", message: "Thank you. Your enquiry has been sent, and a member of our team will be in touch shortly." }
    : { status: "error", message: "Sorry, something went wrong sending your enquiry. Please try again or email us directly." };
}
