import { notFound } from "next/navigation";
import { getProductBySlug } from "@/lib/products";
import ProductGallery from "@/components/ProductGallery";
import AddToCartForm from "@/components/AddToCartForm";
import WearTestedBadge from "@/components/WearTestedBadge";

export const dynamic = "force-dynamic";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <ProductGallery images={product.images} title={product.title} />

        <div>
          <p className="text-sm uppercase tracking-wide text-foreground/60">{product.category}</p>
          <h1 className="text-2xl sm:text-3xl font-bold mt-1">{product.title}</h1>
          <p className="text-xl mt-2">${product.price.toFixed(2)}</p>

          {product.isWearTested && <WearTestedBadge description={product.badgeDescription} />}

          <p className="mt-4 text-foreground/80 leading-relaxed">{product.shortDescription}</p>

          <AddToCartForm product={product} />

          {product.specs.length > 0 && (
            <div className="mt-10">
              <h2 className="text-sm font-semibold uppercase tracking-wide mb-3">Technical Specs</h2>
              <ul className="space-y-2 text-sm">
                {product.specs.map((spec) => (
                  <li key={spec.id} className="border-b border-border pb-2">
                    <strong>{spec.label}:</strong> {spec.value}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {product.sizeRows.length > 0 && (
            <div className="mt-10">
              <h2 className="text-sm font-semibold uppercase tracking-wide mb-3">Fit & Size Guide</h2>
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="text-left text-foreground/60">
                    <th className="py-1.5 pr-2">Size</th>
                    <th className="py-1.5 pr-2">Waist</th>
                    <th className="py-1.5 pr-2">Hip</th>
                    <th className="py-1.5 pr-2">Inseam</th>
                    <th className="py-1.5">Fit note</th>
                  </tr>
                </thead>
                <tbody>
                  {product.sizeRows.map((row) => (
                    <tr key={row.id} className="border-t border-border">
                      <td className="py-1.5 pr-2">{row.size}</td>
                      <td className="py-1.5 pr-2">{row.waist}</td>
                      <td className="py-1.5 pr-2">{row.hip}</td>
                      <td className="py-1.5 pr-2">{row.inseam}</td>
                      <td className="py-1.5">{row.fitNote}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
