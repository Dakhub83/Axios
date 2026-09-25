import nodemailer from "nodemailer";

// Real outbound email requires SMTP credentials in env vars — none are
// fabricated here. Until SMTP_HOST/SMTP_USER/SMTP_PASS are set (e.g. via an
// account with Gmail, Resend, Postmark, etc.), sendContactEmail() is a no-op
// and messages are still captured in the contact_messages table for the
// admin panel, exactly like return requests and team order inquiries.
function isConfigured() {
  return Boolean(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS);
}

export async function sendContactEmail(input: {
  name: string;
  email: string;
  subject: string;
  message: string;
}): Promise<{ sent: boolean; reason?: string }> {
  if (!isConfigured()) {
    return { sent: false, reason: "not_configured" };
  }

  const to = process.env.CONTACT_TO_EMAIL || process.env.SMTP_USER!;

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: process.env.SMTP_SECURE === "true",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Axios Contact Form" <${process.env.SMTP_USER}>`,
      to,
      replyTo: input.email,
      subject: input.subject ? `[Contact] ${input.subject}` : `[Contact] New message from ${input.name}`,
      text: `From: ${input.name} <${input.email}>\n\n${input.message}`,
    });

    return { sent: true };
  } catch (err) {
    console.error("sendContactEmail failed:", err);
    return { sent: false, reason: "send_error" };
  }
}
