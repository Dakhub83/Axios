"use server";

import { revalidatePath } from "next/cache";
import { createContactMessage } from "@/lib/contact";
import { sendContactEmail } from "@/lib/mailer";

export type ContactState = { success: boolean; message: string };

export async function submitContactAction(
  _prevState: ContactState,
  formData: FormData
): Promise<ContactState> {
  const name = String(formData.get("name") || "").trim();
  const email = String(formData.get("email") || "").trim();
  const subject = String(formData.get("subject") || "").trim();
  const message = String(formData.get("message") || "").trim();

  if (!name || !email || !message) {
    return { success: false, message: "Please fill in your name, email, and message." };
  }

  const { sent } = await sendContactEmail({ name, email, subject, message });

  createContactMessage({ name, email, subject, message, emailed: sent });

  revalidatePath("/admin/contact-messages");

  return {
    success: true,
    message: "Thanks — your message has been sent. We read every one ourselves and typically reply within a couple of days.",
  };
}
