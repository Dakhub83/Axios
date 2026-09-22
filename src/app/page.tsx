import Link from "next/link";
import { listProducts } from "@/lib/products";
import ProductCard from "@/components/ProductCard";

export default function HomePage() {
  const products = listProducts().slice(0, 4);

  return (
    <div>
      <section className="max-w-6xl mx-auto px-4 py-20 text-center">
        <h1 className="text-3xl sm:text-5xl font-bold uppercase tracking-tight max-w-3xl mx-auto">
          Built to fail first in our house, not yours.
        </h1>
        <p className="mt-6 max-w-xl mx-auto text-foreground/70">
          Every piece of Axios gear is designed, sewn, and stress-tested at home by the people who
          wear it every day, then pushed through 30 days of real training before it&apos;s allowed on
          this site.
        </p>
        <div className="mt-8 flex items-center justify-center gap-4">
          <Link
            href="/shop"
            className="bg-accent text-black font-semibold px-6 py-3 rounded-full hover:opacity-90 transition-opacity"
          >
            Shop the Collection
          </Link>
          <Link href="/about" className="text-sm underline underline-offset-4 hover:text-accent">
            See how we test
          </Link>
        </div>
      </section>

      <section className="border-y border-border">
        <div className="max-w-6xl mx-auto px-4 py-6 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center text-sm">
          <div className="p-3">30-Day Wear Test</div>
          <div className="p-3">Squat-Proof Certified</div>
          <div className="p-3">Flatlock Seams, Zero Chafe</div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">Latest gear</h2>
          <Link href="/shop" className="text-sm underline underline-offset-4 hover:text-accent">
            View all
          </Link>
        </div>
        {products.length === 0 ? (
          <p className="text-foreground/60">
            No products yet.{" "}
            <Link href="/admin/products/new" className="underline hover:text-accent">
              Add your first product
            </Link>{" "}
            to see it here.
          </p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {products.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
