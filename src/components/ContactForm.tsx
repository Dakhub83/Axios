"use client";

import { useActionState } from "react";
import { submitContactAction, type ContactState } from "@/app/contact/actions";

const initialState: ContactState = { success: false, message: "" };

export default function ContactForm() {
  const [state, formAction, pending] = useActionState(submitContactAction, initialState);

  if (state.success) {
    return (
      <div className="rounded-lg border border-border bg-muted p-8 text-center">
        <p>{state.message}</p>
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-border bg-muted p-8">
      <form action={formAction} className="space-y-4">
        {state.message && <p className="text-sm text-red-400">{state.message}</p>}
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold mb-1">Name *</label>
            <input name="name" required className="w-full border border-border rounded px-3 py-2 bg-background" />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">Email *</label>
            <input
              type="email"
              name="email"
              required
              className="w-full border border-border rounded px-3 py-2 bg-background"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-semibold mb-1">Subject</label>
          <input name="subject" className="w-full border border-border rounded px-3 py-2 bg-background" />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-1">Message *</label>
          <textarea
            name="message"
            required
            rows={5}
            className="w-full border border-border rounded px-3 py-2 bg-background"
          />
        </div>
        <button
          type="submit"
          disabled={pending}
          className="w-full bg-accent text-accent-ink font-semibold px-6 py-3 rounded-full hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          {pending ? "Sending..." : "Send Message"}
        </button>
      </form>
    </div>
  );
}
