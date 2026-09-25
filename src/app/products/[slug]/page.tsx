import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProductBySlug, getRelatedProducts } from "@/lib/products";
import ProductGallery from "@/components/ProductGallery";
import AddToCartForm from "@/components/AddToCartForm";
import WearTestedBadge from "@/components/WearTestedBadge";
import PairsWellWith from "@/components/PairsWellWith";
import { SITE_NAME } from "@/lib/site";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return {};

  const image = product.images[0]?.url;

  return {
    title: product.title,
    description: product.shortDescription,
    alternates: { canonical: `/products/${product.slug}` },
    openGraph: {
      title: `${product.title} | ${SITE_NAME}`,
      description: product.shortDescription,
      type: "website",
      images: image ? [{ url: image, alt: product.images[0]?.altText || product.title }] : undefined,
    },
    twitter: {
      card: image ? "summary_large_image" : "summary",
      title: product.title,
      description: product.shortDescription,
      images: image ? [image] : undefined,
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const related = getRelatedProducts(product);
  const totalStock = product.variants.reduce((sum, v) => sum + v.inventoryCount, 0);
  const hasVariants = product.variants.length > 0;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    description: product.shortDescription,
    category: product.category,
    image: product.images.map((img) => img.url),
    offers: {
      "@type": "Offer",
      url: `/products/${product.slug}`,
      priceCurrency: "USD",
      price: product.price.toFixed(2),
      availability:
        !hasVariants || totalStock > 0
          ? "https://schema.org/InStock"
          : "https://schema.org/OutOfStock",
    },
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <ProductGallery images={product.images} title={product.title} />

        <div>
          <p className="text-sm uppercase tracking-wide text-foreground/60">{product.category}</p>
          <h1 className="text-2xl sm:text-3xl font-bold mt-1">{product.title}</h1>
          <p className="text-xl mt-2">${product.price.toFixed(2)}</p>

          <AddToCartForm product={product} />

          <PairsWellWith products={related} />

          {product.isWearTested && <WearTestedBadge description={product.badgeDescription} />}

          <p className="mt-4 text-foreground/80 leading-relaxed">{product.shortDescription}</p>

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
