import { listProducts } from "@/lib/products";
import FavoritesGrid from "@/components/FavoritesGrid";

export const dynamic = "force-dynamic";

export default function FavoritesPage() {
  const allProducts = listProducts();

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-2xl font-bold mb-8">Favorites</h1>
      <FavoritesGrid allProducts={allProducts} />
    </div>
  );
}
