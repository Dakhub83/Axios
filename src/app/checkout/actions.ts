"use server";

import { createOrder } from "@/lib/orders";
import type { CartLine } from "@/lib/types";

export type CheckoutState = {
  success: boolean;
  message: string;
  orderId?: string;
};

export async function placeOrderAction(
  lines: CartLine[],
  _prevState: CheckoutState,
  formData: FormData
): Promise<CheckoutState> {
  const customerName = String(formData.get("customerName") || "").trim();
  const email = String(formData.get("email") || "").trim();
  const address = String(formData.get("address") || "").trim();

  if (!customerName || !email || !address) {
    return { success: false, message: "Please fill in all fields." };
  }
  if (lines.length === 0) {
    return { success: false, message: "Your cart is empty." };
  }

  const order = createOrder({ customerName, email, address, lines });

  return {
    success: true,
    message: "Test order placed. No payment was charged — this is a system test.",
    orderId: order.id,
  };
}
