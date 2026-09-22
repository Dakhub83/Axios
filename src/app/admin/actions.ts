"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createProduct, updateProduct, deleteProduct, type ProductInput } from "@/lib/products";
import { saveUploadedImage } from "@/lib/uploadImage";
import { parseSpecsText, parseSizeRowsText } from "@/lib/parseForm";
import { createWearTestEntry } from "@/lib/wearTests";

async function buildProductInput(formData: FormData): Promise<ProductInput> {
  const files = formData.getAll("images").filter((f): f is File => f instanceof File && f.size > 0);
  const imageUrls = await Promise.all(files.map((f) => saveUploadedImage(f)));

  return {
    title: String(formData.get("title") || ""),
    category: String(formData.get("category") || ""),
    price: Number(formData.get("price") || 0),
    shortDescription: String(formData.get("shortDescription") || ""),
    isWearTested: formData.get("isWearTested") === "on",
    badgeDescription: String(formData.get("badgeDescription") || ""),
    images: imageUrls.map((url) => ({ url })),
    specs: parseSpecsText(String(formData.get("specsText") || "")),
    sizeRows: parseSizeRowsText(String(formData.get("sizeRowsText") || "")),
  };
}

export async function createProductAction(formData: FormData) {
  const input = await buildProductInput(formData);
  const product = createProduct(input);
  revalidatePath("/admin/products");
  revalidatePath("/shop");
  redirect(`/admin/products/${product.id}/edit`);
}

export async function updateProductAction(id: string, formData: FormData) {
  const input = await buildProductInput(formData);

  // Keep existing images if no new ones were uploaded
  const hasNewImages = input.images.length > 0;
  if (!hasNewImages) {
    const { getProductById } = await import("@/lib/products");
    const existing = getProductById(id);
    if (existing) input.images = existing.images.map((i) => ({ url: i.url, altText: i.altText }));
  }

  updateProduct(id, input);
  revalidatePath("/admin/products");
  revalidatePath(`/admin/products/${id}/edit`);
  revalidatePath("/shop");
  redirect("/admin/products");
}

export async function deleteProductAction(id: string) {
  deleteProduct(id);
  revalidatePath("/admin/products");
  revalidatePath("/shop");
}

export async function createWearTestEntryAction(formData: FormData) {
  createWearTestEntry({
    testerName: String(formData.get("testerName") || ""),
    itemType: String(formData.get("itemType") || ""),
    fabricBlend: String(formData.get("fabricBlend") || ""),
    washCount: Number(formData.get("washCount") || 0),
    checkpoint: String(formData.get("checkpoint") || "First Wear"),
    dateTested: String(formData.get("dateTested") || new Date().toISOString().slice(0, 10)),
    comfortRating: Number(formData.get("comfortRating") || 5),
    performanceNotes: String(formData.get("performanceNotes") || ""),
    passFail: String(formData.get("passFail") || "Pass"),
  });
  revalidatePath("/admin/wear-tests");
}
