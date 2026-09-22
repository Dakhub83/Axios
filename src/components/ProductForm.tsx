import Image from "next/image";
import type { ProductWithDetails } from "@/lib/types";

export default function ProductForm({
  action,
  product,
}: {
  action: (formData: FormData) => void | Promise<void>;
  product?: ProductWithDetails;
}) {
  const specsText = product?.specs.map((s) => `${s.label}: ${s.value}`).join("\n") ?? "";
  const sizeRowsText =
    product?.sizeRows.map((r) => `${r.size}, ${r.waist}, ${r.hip}, ${r.inseam}, ${r.fitNote}`).join("\n") ?? "";

  return (
    <form action={action} className="space-y-5 max-w-xl">
      <div>
        <label className="block text-sm font-semibold mb-1">Title *</label>
        <input
          name="title"
          required
          defaultValue={product?.title}
          className="w-full border border-border rounded px-3 py-2 bg-background"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold mb-1">Category *</label>
          <input
            name="category"
            required
            placeholder="Leggings, Shorts, Tops, Footwear..."
            defaultValue={product?.category}
            className="w-full border border-border rounded px-3 py-2 bg-background"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-1">Price (USD) *</label>
          <input
            type="number"
            step="0.01"
            name="price"
            required
            defaultValue={product?.price}
            className="w-full border border-border rounded px-3 py-2 bg-background"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold mb-1">Short description *</label>
        <textarea
          name="shortDescription"
          required
          rows={3}
          defaultValue={product?.shortDescription}
          className="w-full border border-border rounded px-3 py-2 bg-background"
        />
      </div>

      <div>
        <label className="flex items-center gap-2 text-sm font-semibold">
          <input type="checkbox" name="isWearTested" defaultChecked={product?.isWearTested ?? true} />
          Show &quot;Family Wear-Tested Approved&quot; badge
        </label>
      </div>

      <div>
        <label className="block text-sm font-semibold mb-1">Badge description</label>
        <textarea
          name="badgeDescription"
          rows={3}
          defaultValue={
            product?.badgeDescription ||
            "This product completed our full 30-day internal testing cycle, worn by real members of our family through actual training sessions."
          }
          className="w-full border border-border rounded px-3 py-2 bg-background"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold mb-1">
          Product images {product ? "(upload new ones to replace existing)" : ""}
        </label>
        <input type="file" name="images" accept="image/*" multiple className="w-full text-sm" />
        {product && product.images.length > 0 && (
          <div className="mt-2 flex gap-2">
            {product.images.map((img) => (
              <div key={img.id} className="relative w-14 h-14 rounded overflow-hidden border border-border">
                <Image src={img.url} alt={img.altText || product.title} fill className="object-cover" />
              </div>
            ))}
          </div>
        )}
      </div>

      <div>
        <label className="block text-sm font-semibold mb-1">
          Technical spec bullets &mdash; one per line, as &quot;Label: Value&quot;
        </label>
        <textarea
          name="specsText"
          rows={6}
          defaultValue={specsText}
          placeholder={"Fabric: 78% Nylon / 22% Spandex, 235 gsm\nMoisture-wicking: Inherent fiber-level wicking"}
          className="w-full border border-border rounded px-3 py-2 bg-background font-mono text-sm"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold mb-1">
          Fit &amp; size guide &mdash; one row per line, as &quot;Size, Waist, Hip, Inseam, Fit note&quot;
        </label>
        <textarea
          name="sizeRowsText"
          rows={6}
          defaultValue={sizeRowsText}
          placeholder={"XS, 24-25, 34-35, 27, Compression fit - true to size\nS, 26-27, 36-37, 27.5, Compression fit - true to size"}
          className="w-full border border-border rounded px-3 py-2 bg-background font-mono text-sm"
        />
      </div>

      <button
        type="submit"
        className="bg-accent text-black font-semibold px-6 py-3 rounded-full hover:opacity-90 transition-opacity"
      >
        {product ? "Save Changes" : "Create Product"}
      </button>
    </form>
  );
}
