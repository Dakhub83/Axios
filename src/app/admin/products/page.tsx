import Link from "next/link";
import Image from "next/image";
import { listProducts } from "@/lib/products";
import { deleteProductAction } from "../actions";

export const dynamic = "force-dynamic";

export default function AdminProductsPage() {
  const products = listProducts();

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold">Products ({products.length})</h2>
        <Link
          href="/admin/products/new"
          className="bg-accent text-black font-semibold px-4 py-2 rounded-full text-sm hover:opacity-90"
        >
          + Add Product
        </Link>
      </div>

      {products.length === 0 ? (
        <p className="text-foreground/60">No products yet. Add your first one to test the full flow.</p>
      ) : (
        <div className="space-y-3">
          {products.map((product) => (
            <div key={product.id} className="flex items-center gap-4 border border-border rounded-lg p-3">
              <div className="relative w-16 h-16 bg-muted rounded overflow-hidden flex-shrink-0">
                {product.images[0] && (
                  <Image src={product.images[0].url} alt={product.title} fill className="object-cover" />
                )}
              </div>
              <div className="flex-1">
                <p className="font-semibold">{product.title}</p>
                <p className="text-sm text-foreground/60">
                  {product.category} &middot; ${product.price.toFixed(2)} &middot; {product.images.length} image(s)
                </p>
              </div>
              <Link href={`/products/${product.slug}`} className="text-sm underline hover:text-accent" target="_blank">
                View
              </Link>
              <Link href={`/admin/products/${product.id}/edit`} className="text-sm underline hover:text-accent">
                Edit
              </Link>
              <form action={deleteProductAction.bind(null, product.id)}>
                <button type="submit" className="text-sm text-red-400 underline">
                  Delete
                </button>
              </form>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
