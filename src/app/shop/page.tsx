import Link from "next/link";
import { listProducts } from "@/lib/products";
import ProductCard from "@/components/ProductCard";
import ShopToolbar from "@/components/ShopToolbar";

export const dynamic = "force-dynamic";

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; sort?: string }>;
}) {
  const { category, sort } = await searchParams;
  const allProducts = listProducts();
  const filtered = category
    ? allProducts.filter((p) => p.category.toLowerCase() === category.toLowerCase())
    : allProducts;

  const products = [...filtered];
  if (sort === "price-asc") products.sort((a, b) => a.price - b.price);
  else if (sort === "price-desc") products.sort((a, b) => b.price - a.price);
  else if (sort === "name-asc") products.sort((a, b) => a.title.localeCompare(b.title));
  // "newest" (default) keeps listProducts()'s created_at DESC order

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <h1 className="text-2xl font-bold">{category ? `Shop ${category}` : "Shop All"}</h1>
        {category && (
          <Link href="/shop" className="text-sm underline hover:text-accent">
            Clear filter
          </Link>
        )}
      </div>

      <div className="mb-8">
        <ShopToolbar count={products.length} />
      </div>

      {products.length === 0 ? (
        <p className="text-foreground/60">
          {category ? (
            <>
              No products in {category} yet.{" "}
              <Link href="/shop" className="underline hover:text-accent">
                View all products
              </Link>
              .
            </>
          ) : (
            <>
              No products yet.{" "}
              <Link href="/admin/products/new" className="underline hover:text-accent">
                Add one from the admin panel
              </Link>
              .
            </>
          )}
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-10">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
