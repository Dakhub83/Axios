import Link from "next/link";
import Image from "next/image";
import type { ProductWithDetails } from "@/lib/types";

export default function ProductCard({ product }: { product: ProductWithDetails }) {
  const image = product.images[0];
  return (
    <Link
      href={`/products/${product.slug}`}
      className="group block border border-border rounded-lg overflow-hidden hover:border-accent transition-colors"
    >
      <div className="relative aspect-square bg-muted">
        {image ? (
          <Image src={image.url} alt={image.altText || product.title} fill className="object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-foreground/40 text-sm">
            No image yet
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-semibold group-hover:text-accent transition-colors">{product.title}</h3>
        <p className="text-sm text-foreground/60">{product.category}</p>
        <p className="mt-1 font-medium">${product.price.toFixed(2)}</p>
      </div>
    </Link>
  );
}
