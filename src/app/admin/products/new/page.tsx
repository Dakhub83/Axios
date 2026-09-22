import ProductForm from "@/components/ProductForm";
import { createProductAction } from "../../actions";

export default function NewProductPage() {
  return (
    <div>
      <h2 className="text-lg font-semibold mb-6">Add Product</h2>
      <ProductForm action={createProductAction} />
    </div>
  );
}
