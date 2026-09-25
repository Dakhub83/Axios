"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "./CartContext";
import FavoriteButton from "./FavoriteButton";
import type { ProductWithDetails } from "@/lib/types";

const LOW_STOCK_THRESHOLD = 5;

export default function AddToCartForm({ product }: { product: ProductWithDetails }) {
  const { addLine } = useCart();
  const router = useRouter();
  const sizes = Array.from(new Set(product.sizeRows.map((r) => r.size)));
  const [size, setSize] = useState(sizes[0] || "One Size");
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const variant = product.variants.find((v) => v.size === size);
  const stock = variant ? variant.inventoryCount : null;
  const outOfStock = stock === 0;

  function handleSizeChange(next: string) {
    setSize(next);
    setQuantity(1);
  }

  function handleAdd() {
    if (outOfStock) return;
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
      {stock !== null && (
        <p className="flex items-center gap-2 text-xs uppercase tracking-widest">
          <span
            aria-hidden
            className={`h-1.5 w-1.5 rounded-full ${
              outOfStock ? "bg-red-500" : stock <= LOW_STOCK_THRESHOLD ? "bg-amber-400" : "bg-emerald-500"
            }`}
          />
          {outOfStock ? "Out of stock" : stock <= LOW_STOCK_THRESHOLD ? `Low stock — ${stock} left` : "In stock"}
        </p>
      )}

      {sizes.length > 0 && (
        <div>
          <label className="block text-sm font-semibold mb-2">Size</label>
          <div className="flex flex-wrap gap-2">
            {sizes.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => handleSizeChange(s)}
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
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            disabled={outOfStock}
            aria-label="Decrease quantity"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-border hover:border-accent transition-colors disabled:opacity-40"
          >
            −
          </button>
          <span className="w-6 text-center tabular-nums">{quantity}</span>
          <button
            type="button"
            onClick={() => setQuantity((q) => Math.min(stock ?? Infinity, q + 1))}
            disabled={outOfStock || (stock !== null && quantity >= stock)}
            aria-label="Increase quantity"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-border hover:border-accent transition-colors disabled:opacity-40"
          >
            +
          </button>
        </div>
      </div>

      <div className="flex gap-3">
        <button
          type="button"
          onClick={handleAdd}
          disabled={outOfStock}
          className="flex-1 bg-accent text-black font-semibold px-6 py-3 rounded-full hover:opacity-90 transition-opacity disabled:opacity-40"
        >
          {outOfStock ? "Out of Stock" : added ? "Added!" : "Add to Cart"}
        </button>
        <FavoriteButton productId={product.id} />
      </div>
      <button
        type="button"
        onClick={() => {
          if (outOfStock) return;
          handleAdd();
          router.push("/cart");
        }}
        disabled={outOfStock}
        className="w-full border border-bone text-bone font-semibold px-6 py-3 rounded-full hover:bg-bone hover:text-background transition-colors disabled:opacity-40"
      >
        Buy It Now
      </button>
    </div>
  );
}
