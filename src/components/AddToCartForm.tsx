"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "./CartContext";
import type { ProductWithDetails } from "@/lib/types";

export default function AddToCartForm({ product }: { product: ProductWithDetails }) {
  const { addLine } = useCart();
  const router = useRouter();
  const sizes = Array.from(new Set(product.sizeRows.map((r) => r.size)));
  const [size, setSize] = useState(sizes[0] || "One Size");
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  function handleAdd() {
    addLine({
      productId: product.id,
      slug: product.slug,
      title: product.title,
      price: product.price,
      size,
      quantity,
      imageUrl: product.images[0]?.url ?? null,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  return (
    <div className="mt-6 space-y-4">
      {sizes.length > 0 && (
        <div>
          <label className="block text-sm font-semibold mb-2">Size</label>
          <div className="flex flex-wrap gap-2">
            {sizes.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setSize(s)}
                className={`px-3 py-1.5 rounded border text-sm ${
                  s === size ? "border-accent bg-accent text-black" : "border-border hover:border-accent"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      )}

      <div>
        <label className="block text-sm font-semibold mb-2">Quantity</label>
        <input
          type="number"
          min={1}
          value={quantity}
          onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
          className="w-20 border border-border rounded px-2 py-1.5 bg-background"
        />
      </div>

      <div className="flex gap-3">
        <button
          type="button"
          onClick={handleAdd}
          className="flex-1 bg-accent text-black font-semibold px-6 py-3 rounded-full hover:opacity-90 transition-opacity"
        >
          {added ? "Added!" : "Add to Cart"}
        </button>
        <button
          type="button"
          onClick={() => {
            handleAdd();
            router.push("/cart");
          }}
          className="flex-1 border border-border font-semibold px-6 py-3 rounded-full hover:border-accent transition-colors"
        >
          Buy Now
        </button>
      </div>
    </div>
  );
}
