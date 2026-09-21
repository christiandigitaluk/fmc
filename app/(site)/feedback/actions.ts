"use server";

import { submitWebsiteFeedback } from "@/lib/content";
import { isHoneypotFilled } from "@/lib/honeypot";
import type { WebsiteFeedback } from "@/lib/types";

export type FeedbackFormState = {
  status: "idle" | "success" | "error";
  message?: string;
};

export async function submitFeedbackForm(
  _prevState: FeedbackFormState,
  formData: FormData
): Promise<FeedbackFormState> {
  if (isHoneypotFilled(formData)) {
    return { status: "success", message: "Thank you for your feedback." };
  }

  const feedback: WebsiteFeedback = {
    respondentType: String(formData.get("respondentType") ?? ""),
    easeOfUse: String(formData.get("easeOfUse") ?? ""),
    overallRating: String(formData.get("overallRating") ?? ""),
    recommend: String(formData.get("recommend") ?? ""),
    comments: String(formData.get("comments") ?? ""),
    name: String(formData.get("name") ?? ""),
    email: String(formData.get("email") ?? ""),
  };

  if (!feedback.respondentType || !feedback.easeOfUse || !feedback.overallRating || !feedback.recommend) {
    return { status: "error", message: "Please answer each question before submitting." };
  }

  const result = await submitWebsiteFeedback(feedback);
  return result.ok
    ? { status: "success", message: "Thank you for your feedback, it really helps us improve the site." }
    : { status: "error", message: "Sorry, something went wrong sending your feedback. Please try again." };
}
