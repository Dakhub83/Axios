import type { Metadata } from "next";
import Link from "next/link";
import { listProducts } from "@/lib/products";
import ProductCard from "@/components/ProductCard";
import ShopToolbar from "@/components/ShopToolbar";

export const dynamic = "force-dynamic";

const departmentLabels: Record<string, string> = {
  women: "Women",
  men: "Men",
  kids: "Kids",
  unisex: "Unisex",
};

type ShopSearchParams = { category?: string; department?: string; sort?: string; q?: string };

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<ShopSearchParams>;
}): Promise<Metadata> {
  const { category, department, q } = await searchParams;
  const departmentLabel = department ? (departmentLabels[department.toLowerCase()] ?? department) : null;
  const label = [departmentLabel, category].filter(Boolean).join(" ") || "All Products";

  // Internal search results are noise for search engines — index the
  // department/category collection pages, not the query-string variants.
  if (q?.trim()) {
    return {
      title: `Search results for "${q.trim()}"`,
      robots: { index: false, follow: true },
    };
  }

  return {
    title: label === "All Products" ? "Shop" : label,
    description: `Shop ${label.toLowerCase()} from Axios — designed, sewn, and wear-tested at home before it ships.`,
    alternates: {
      canonical: `/shop${department ? `?department=${department}` : ""}${
        category ? `${department ? "&" : "?"}category=${encodeURIComponent(category)}` : ""
      }`,
    },
  };
}

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<ShopSearchParams>;
}) {
  const { category, department, sort, q } = await searchParams;
  const query = q?.trim().toLowerCase() || "";
  const allProducts = listProducts();
  const filtered = allProducts.filter((p) => {
    if (department && p.department.toLowerCase() !== department.toLowerCase()) return false;
    if (category && p.category.toLowerCase() !== category.toLowerCase()) return false;
    if (query) {
      const haystack = `${p.title} ${p.category} ${p.shortDescription}`.toLowerCase();
      if (!haystack.includes(query)) return false;
    }
    return true;
  });

  const departmentLabel = department ? (departmentLabels[department.toLowerCase()] ?? department) : null;
  const heading = query
    ? `Results for "${q?.trim()}"`
    : [departmentLabel, category].filter(Boolean).join(" · ") || "Shop All";
  const hasFilter = Boolean(category || department || query);

  const products = [...filtered];
  if (sort === "price-asc") products.sort((a, b) => a.price - b.price);
  else if (sort === "price-desc") products.sort((a, b) => b.price - a.price);
  else if (sort === "name-asc") products.sort((a, b) => a.title.localeCompare(b.title));
  // "newest" (default) keeps listProducts()'s created_at DESC order

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <h1 className="text-2xl font-bold">{heading}</h1>
        {hasFilter && (
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
          {query ? (
            <>
              Nothing matched &quot;{q?.trim()}&quot;.{" "}
              <Link href="/shop" className="underline hover:text-accent">
                View all products
              </Link>
              .
            </>
          ) : hasFilter ? (
            <>
              No products in {heading} yet.{" "}
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
