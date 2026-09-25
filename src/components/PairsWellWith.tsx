import Link from "next/link";
import Image from "next/image";
import FavoriteButton from "./FavoriteButton";
import type { ProductWithDetails } from "@/lib/types";

export default function PairsWellWith({ products }: { products: ProductWithDetails[] }) {
  if (products.length === 0) return null;

  return (
    <div className="mt-10 border-t border-border pt-6">
      <h2 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide">
        <svg
          aria-hidden
          viewBox="0 0 20 20"
          className="h-4 w-4 text-accent"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
        >
          <path d="M8 12a3 3 0 003 3h3a3 3 0 000-6h-1" strokeLinecap="round" />
          <path d="M12 8a3 3 0 00-3-3H6a3 3 0 000 6h1" strokeLinecap="round" />
        </svg>
        Pairs Well With
      </h2>

      <div className="mt-4 space-y-4">
        {products.map((p) => {
          const image = p.images[0];
          return (
            <div key={p.id} className="flex items-center gap-4">
              <Link
                href={`/products/${p.slug}`}
                className="relative h-16 w-16 shrink-0 overflow-hidden rounded-md bg-muted"
              >
                {image ? (
                  <Image src={image.url} alt={image.altText || p.title} fill className="object-cover" />
                ) : null}
              </Link>
              <div className="min-w-0 flex-1">
                <Link
                  href={`/products/${p.slug}`}
                  className="block truncate text-sm font-medium transition-colors hover:text-accent"
                >
                  {p.title}
                </Link>
                <p className="text-sm text-accent">${p.price.toFixed(2)} USD</p>
                <Link
                  href={`/products/${p.slug}`}
                  className="text-xs uppercase tracking-widest text-foreground/60 underline underline-offset-2 hover:text-accent"
                >
                  Choose options →
                </Link>
              </div>
              <FavoriteButton productId={p.id} size="sm" />
            </div>
          );
        })}
      </div>
    </div>
  );
}
