"use server";

import { createOrder, recordPaymentTransaction } from "@/lib/orders";
import { isPaymentMethod, paymentMethodLabel } from "@/lib/payments";
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
  const paymentMethod = String(formData.get("paymentMethod") || "");

  if (!customerName || !email || !address) {
    return { success: false, message: "Please fill in all fields." };
  }
  if (!isPaymentMethod(paymentMethod)) {
    return { success: false, message: "Please choose a payment method." };
  }
  if (lines.length === 0) {
    return { success: false, message: "Your cart is empty." };
  }

  const order = createOrder({ customerName, email, address, paymentMethod, lines });

  // No real gateway is wired up yet, so this records the attempt as a
  // successful test transaction rather than a live charge.
  recordPaymentTransaction({
    orderId: order.id,
    gateway: paymentMethod,
    amount: order.total,
    status: "succeeded",
  });

  return {
    success: true,
    message: `Test order placed via ${paymentMethodLabel(paymentMethod)}. No payment was charged — this is a system test.`,
    orderId: order.id,
  };
}
