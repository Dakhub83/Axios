import { notFound } from "next/navigation";
import { getProductById } from "@/lib/products";
import ProductForm from "@/components/ProductForm";
import { updateProductAction, deleteProductAction } from "../../../actions";

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = getProductById(id);
  if (!product) notFound();

  const boundUpdate = updateProductAction.bind(null, id);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold">Edit: {product.title}</h2>
        <form action={deleteProductAction.bind(null, id)}>
          <button type="submit" className="text-sm text-red-400 underline">
            Delete product
          </button>
        </form>
      </div>
      <ProductForm action={boundUpdate} product={product} />
    </div>
  );
}
