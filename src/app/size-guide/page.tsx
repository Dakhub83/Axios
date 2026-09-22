import Link from "next/link";
import { listProducts } from "@/lib/products";

export const dynamic = "force-dynamic";

export default function SizeGuidePage() {
  const products = listProducts().filter((p) => p.sizeRows.length > 0);

  return (
    <div className="max-w-2xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold mb-4">Size Guide</h1>
      <p className="text-foreground/70 mb-4">
        Find your fit before you buy. Measurements below are body measurements, not garment
        measurements.
      </p>
      <ul className="list-disc pl-5 space-y-2 text-foreground/80 mb-10">
        <li>
          <strong>Waist:</strong> measure around the narrowest part of your natural waistline.
        </li>
        <li>
          <strong>Hip:</strong> measure around the fullest part of your hips, feet together.
        </li>
        <li>
          <strong>Inseam:</strong> measure from the crotch seam to the bottom of the ankle on a
          well-fitting pair.
        </li>
      </ul>

      {products.length === 0 ? (
        <p className="text-foreground/60">
          No size charts yet &mdash; add fit rows when you{" "}
          <Link href="/admin/products/new" className="underline hover:text-accent">
            create a product
          </Link>
          .
        </p>
      ) : (
        products.map((product) => (
          <div key={product.id} className="mb-10">
            <h2 className="text-lg font-semibold mb-3">{product.title}</h2>
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
        ))
      )}
    </div>
  );
}
