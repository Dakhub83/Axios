"use client";

import { useActionState } from "react";
import { submitReturnRequestAction } from "@/app/return-item/actions";

const initialState = { success: false, message: "" };

export default function ReturnItemForm() {
  const [state, formAction, pending] = useActionState(submitReturnRequestAction, initialState);

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
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold mb-1">Order email *</label>
          <input
            type="email"
            name="orderEmail"
            required
            className="w-full border border-border rounded px-3 py-2 bg-background"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-1">Order number</label>
          <input name="orderNumber" className="w-full border border-border rounded px-3 py-2 bg-background" />
        </div>
      </div>
      <div>
        <label className="block text-sm font-semibold mb-1">Item to return *</label>
        <input
          name="itemDescription"
          required
          placeholder="e.g. Pro-Flex Compression Leggings, size M"
          className="w-full border border-border rounded px-3 py-2 bg-background"
        />
      </div>
      <div>
        <label className="block text-sm font-semibold mb-1">Reason *</label>
        <select name="reason" required className="w-full border border-border rounded px-3 py-2 bg-background">
          <option value="">Select one</option>
          <option value="Wrong size">Wrong size</option>
          <option value="Didn't fit as expected">Didn&apos;t fit as expected</option>
          <option value="Defective / damaged">Defective / damaged</option>
          <option value="Not as described">Not as described</option>
          <option value="Changed my mind">Changed my mind</option>
          <option value="Other">Other</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-semibold mb-1">Preferred resolution</label>
        <select name="resolution" className="w-full border border-border rounded px-3 py-2 bg-background">
          <option value="refund">Refund</option>
          <option value="exchange">Exchange for a different size</option>
          <option value="store_credit">Store credit</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-semibold mb-1">Additional details</label>
        <textarea name="details" rows={4} className="w-full border border-border rounded px-3 py-2 bg-background" />
      </div>
      <button
        type="submit"
        disabled={pending}
        className="w-full bg-accent text-black font-semibold px-6 py-3 rounded-full hover:opacity-90 transition-opacity disabled:opacity-50"
      >
        {pending ? "Submitting..." : "Submit Return Request"}
      </button>
    </form>
  );
}
