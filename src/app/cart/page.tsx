"use client";

import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/components/CartContext";

export default function CartPage() {
  const { lines, removeLine, updateQuantity, subtotal } = useCart();

  if (lines.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
        <Link href="/shop" className="underline hover:text-accent">
          Continue shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-2xl font-bold mb-8">Your Cart</h1>
      <div className="space-y-4">
        {lines.map((line) => (
          <div key={`${line.productId}-${line.size}`} className="flex gap-4 border-b border-border pb-4">
            <div className="relative w-20 h-20 bg-muted rounded overflow-hidden flex-shrink-0">
              {line.imageUrl && <Image src={line.imageUrl} alt={line.title} fill className="object-cover" />}
            </div>
            <div className="flex-1">
              <Link href={`/products/${line.slug}`} className="font-semibold hover:text-accent">
                {line.title}
              </Link>
              <p className="text-sm text-foreground/60">Size: {line.size}</p>
              <div className="flex items-center gap-3 mt-2">
                <input
                  type="number"
                  min={1}
                  value={line.quantity}
                  onChange={(e) => updateQuantity(line.productId, line.size, Math.max(1, Number(e.target.value)))}
                  className="w-16 border border-border rounded px-2 py-1 bg-background text-sm"
                />
                <button
                  type="button"
                  onClick={() => removeLine(line.productId, line.size)}
                  className="text-sm text-foreground/60 hover:text-red-400 underline"
                >
                  Remove
                </button>
              </div>
            </div>
            <p className="font-medium">${(line.price * line.quantity).toFixed(2)}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 flex items-center justify-between text-lg font-semibold">
        <span>Subtotal</span>
        <span>${subtotal.toFixed(2)}</span>
      </div>

      <Link
        href="/checkout"
        className="mt-6 block text-center bg-accent text-accent-ink font-semibold px-6 py-3 rounded-full hover:opacity-90 transition-opacity"
      >
        Proceed to Checkout
      </Link>
    </div>
  );
}
