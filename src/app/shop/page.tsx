import Link from "next/link";
import { listProducts } from "@/lib/products";
import ProductCard from "@/components/ProductCard";

export const dynamic = "force-dynamic";

export default function ShopPage() {
  const products = listProducts();

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-2xl font-bold mb-8">Shop All</h1>
      {products.length === 0 ? (
        <p className="text-foreground/60">
          No products yet.{" "}
          <Link href="/admin/products/new" className="underline hover:text-accent">
            Add one from the admin panel
          </Link>
          .
        </p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
