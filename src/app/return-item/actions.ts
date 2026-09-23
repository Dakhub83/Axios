"use server";

import { revalidatePath } from "next/cache";
import { createReturnRequest } from "@/lib/returns";

export async function submitReturnRequestAction(
  _prevState: { success: boolean; message: string },
  formData: FormData
): Promise<{ success: boolean; message: string }> {
  const orderEmail = String(formData.get("orderEmail") || "").trim();
  const itemDescription = String(formData.get("itemDescription") || "").trim();
  const reason = String(formData.get("reason") || "").trim();

  if (!orderEmail || !itemDescription || !reason) {
    return { success: false, message: "Please fill in all required fields." };
  }

  createReturnRequest({
    orderEmail,
    orderNumber: String(formData.get("orderNumber") || "").trim(),
    itemDescription,
    reason,
    resolution: String(formData.get("resolution") || "refund"),
    details: String(formData.get("details") || "").trim(),
  });

  revalidatePath("/admin/returns");
  return {
    success: true,
    message: "Return request received. We'll email you a prepaid return label within 1 business day.",
  };
}
