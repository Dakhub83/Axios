"use client";

import { useCart } from "./CartContext";

export default function CartCount() {
  const { count } = useCart();
  if (count === 0) return <span>(0)</span>;
  return <span>({count})</span>;
}
