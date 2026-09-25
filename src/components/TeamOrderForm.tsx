"use client";

import { useActionState } from "react";
import { submitTeamOrderAction } from "@/app/team-orders/actions";

const initialState = { success: false, message: "" };

export default function TeamOrderForm() {
  const [state, formAction, pending] = useActionState(submitTeamOrderAction, initialState);

  if (state.success) {
    return (
      <div className="border border-border rounded-lg p-6 text-center">
        <p>{state.message}</p>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-4">
      {state.message && <p className="text-sm text-red-400">{state.message}</p>}
      <div>
        <label className="block text-sm font-semibold mb-1">Team / Club / Organization name *</label>
        <input name="organization" required className="w-full border border-border rounded px-3 py-2 bg-background" />
      </div>
      <div>
        <label className="block text-sm font-semibold mb-1">Contact name *</label>
        <input name="contactName" required className="w-full border border-border rounded px-3 py-2 bg-background" />
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold mb-1">Email *</label>
          <input type="email" name="email" required className="w-full border border-border rounded px-3 py-2 bg-background" />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-1">Phone number</label>
          <input type="tel" name="phone" className="w-full border border-border rounded px-3 py-2 bg-background" />
        </div>
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold mb-1">Sport *</label>
          <select name="sport" required className="w-full border border-border rounded px-3 py-2 bg-background">
            <option value="">Select one</option>
            <option value="Soccer">Soccer</option>
            <option value="Swimming">Swimming</option>
            <option value="Tennis">Tennis</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-semibold mb-1">Estimated roster size / quantity *</label>
          <input name="rosterSize" required className="w-full border border-border rounded px-3 py-2 bg-background" />
        </div>
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold mb-1">Target delivery date</label>
          <input type="date" name="targetDate" className="w-full border border-border rounded px-3 py-2 bg-background" />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-1">Current uniform supplier (if any)</label>
          <input name="currentSupplier" className="w-full border border-border rounded px-3 py-2 bg-background" />
        </div>
      </div>
      <div>
        <label className="block text-sm font-semibold mb-1">Tell us more about what you need</label>
        <textarea name="message" rows={4} className="w-full border border-border rounded px-3 py-2 bg-background" />
      </div>
      <button
        type="submit"
        disabled={pending}
        className="w-full bg-accent text-accent-ink font-semibold px-6 py-3 rounded-full hover:opacity-90 transition-opacity disabled:opacity-50"
      >
        {pending ? "Sending..." : "Send Inquiry"}
      </button>
    </form>
  );
}
