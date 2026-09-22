"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "./CartContext";
import type { ProductWithDetails } from "@/lib/types";

const NEW_DROP_WINDOW_DAYS = 30;

function isNewDrop(createdAt: string): boolean {
  const ageInDays = (Date.now() - new Date(createdAt).getTime()) / (1000 * 60 * 60 * 24);
  return ageInDays <= NEW_DROP_WINDOW_DAYS;
}

export default function ProductCard({ product }: { product: ProductWithDetails }) {
  const { addLine } = useCart();
  const [added, setAdded] = useState(false);
  const image = product.images[0];
  const href = `/products/${product.slug}`;

  function handleQuickAdd() {
    const sizes = Array.from(new Set(product.sizeRows.map((r) => r.size)));
    addLine({
      productId: product.id,
      slug: product.slug,
      title: product.title,
      price: product.price,
      size: sizes[0] || "One Size",
      quantity: 1,
      imageUrl: image?.url ?? null,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  }

  return (
    <div className="group">
      <div className="relative aspect-[4/5] overflow-hidden rounded-lg bg-muted">
        <Link href={href} className="absolute inset-0 z-0" aria-label={product.title}>
          {image ? (
            <Image
              src={image.url}
              alt={image.altText || product.title}
              fill
              className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-sm text-foreground/40">
              No image yet
            </div>
          )}
        </Link>

        {(isNewDrop(product.createdAt) || product.isWearTested) && (
          <div className="pointer-events-none absolute left-3 top-3 z-10 flex flex-col items-start gap-1.5">
            {isNewDrop(product.createdAt) && (
              <span className="rounded-full border border-accent bg-background/80 px-2.5 py-1 text-[10px] uppercase tracking-widest text-accent backdrop-blur-sm">
                New Drop
              </span>
            )}
            {product.isWearTested && (
              <span className="rounded-full border border-accent bg-background/80 px-2.5 py-1 text-[10px] uppercase tracking-widest text-accent backdrop-blur-sm">
                Wear-Tested
              </span>
            )}
          </div>
        )}

        <div className="absolute inset-x-3 bottom-3 z-10 translate-y-2 opacity-0 transition-all duration-300 ease-out group-hover:translate-y-0 group-hover:opacity-100">
          <button
            type="button"
            onClick={handleQuickAdd}
            className="w-full rounded-full border border-accent bg-background/90 py-2.5 text-xs font-semibold uppercase tracking-widest text-accent backdrop-blur-sm transition-colors hover:bg-accent hover:text-black"
          >
            {added ? "Added" : "Quick Add"}
          </button>
        </div>
      </div>

      <Link href={href} className="mt-4 block">
        <h3 className="font-serif text-lg transition-colors group-hover:text-accent">{product.title}</h3>
        <p className="text-xs uppercase tracking-widest text-foreground/60">{product.category}</p>
        <p className="mt-1 text-accent">${product.price.toFixed(2)}</p>
      </Link>
    </div>
  );
}
