"use client";

import Link from "next/link";
import { useFavorites } from "./FavoritesContext";
import ProductCard from "./ProductCard";
import type { ProductWithDetails } from "@/lib/types";

export default function FavoritesGrid({ allProducts }: { allProducts: ProductWithDetails[] }) {
  const { ids } = useFavorites();
  const favorites = allProducts.filter((p) => ids.includes(p.id));

  if (favorites.length === 0) {
    return (
      <p className="text-foreground/60">
        Nothing saved yet. Tap the heart on any product to add it here.{" "}
        <Link href="/shop" className="underline hover:text-accent">
          Browse the shop
        </Link>
        .
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-10">
      {favorites.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
}
