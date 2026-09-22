export type PaymentMethod = "card" | "paypal" | "apple_pay" | "google_pay" | "cash_on_delivery";

export const paymentMethods: { id: PaymentMethod; label: string; description: string }[] = [
  { id: "card", label: "Credit / Debit Card", description: "Visa, Mastercard, Amex" },
  { id: "paypal", label: "PayPal", description: "Pay with your PayPal balance or linked card" },
  { id: "apple_pay", label: "Apple Pay", description: "Checkout with Face ID or Touch ID" },
  { id: "google_pay", label: "Google Pay", description: "Pay with a card saved to your Google account" },
  { id: "cash_on_delivery", label: "Cash on Delivery", description: "Pay in cash when your order arrives" },
];

export function isPaymentMethod(value: string): value is PaymentMethod {
  return paymentMethods.some((m) => m.id === value);
}

export function paymentMethodLabel(id: string): string {
  return paymentMethods.find((m) => m.id === id)?.label ?? id;
}
