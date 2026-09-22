"use client";

import { useActionState, useEffect } from "react";
import Link from "next/link";
import { useCart } from "@/components/CartContext";
import { placeOrderAction, type CheckoutState } from "./actions";

const initialState: CheckoutState = { success: false, message: "" };

export default function CheckoutPage() {
  const { lines, subtotal, clear } = useCart();
  const boundAction = placeOrderAction.bind(null, lines);
  const [state, formAction, pending] = useActionState(boundAction, initialState);

  useEffect(() => {
    if (state.success) clear();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.success]);

  if (state.success) {
    return (
      <div className="max-w-xl mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Test order placed</h1>
        <p className="text-foreground/70">{state.message}</p>
        <p className="text-sm text-foreground/50 mt-2">Order ID: {state.orderId}</p>
        <Link href="/shop" className="mt-8 inline-block underline hover:text-accent">
          Continue shopping
        </Link>
      </div>
    );
  }

  if (lines.length === 0) {
    return (
      <div className="max-w-xl mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
        <Link href="/shop" className="underline hover:text-accent">
          Continue shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto px-4 py-12">
      <h1 className="text-2xl font-bold mb-2">Checkout</h1>
      <p className="text-sm text-foreground/60 mb-8">
        This is a system test. No payment processor is connected yet — placing an order here just
        records a test order so you can verify the full flow.
      </p>

      <div className="border border-border rounded-lg p-4 mb-8">
        {lines.map((line) => (
          <div key={`${line.productId}-${line.size}`} className="flex justify-between text-sm py-1">
            <span>
              {line.title} ({line.size}) &times; {line.quantity}
            </span>
            <span>${(line.price * line.quantity).toFixed(2)}</span>
          </div>
        ))}
        <div className="flex justify-between font-semibold pt-3 mt-3 border-t border-border">
          <span>Total</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
      </div>

      <form action={formAction} className="space-y-4">
        {state.message && !state.success && (
          <p className="text-sm text-red-400">{state.message}</p>
        )}
        <div>
          <label className="block text-sm font-semibold mb-1">Full name</label>
          <input name="customerName" required className="w-full border border-border rounded px-3 py-2 bg-background" />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-1">Email</label>
          <input type="email" name="email" required className="w-full border border-border rounded px-3 py-2 bg-background" />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-1">Shipping address</label>
          <textarea name="address" required rows={3} className="w-full border border-border rounded px-3 py-2 bg-background" />
        </div>
        <button
          type="submit"
          disabled={pending}
          className="w-full bg-accent text-black font-semibold px-6 py-3 rounded-full hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          {pending ? "Placing test order..." : "Place Test Order"}
        </button>
      </form>
    </div>
  );
}
