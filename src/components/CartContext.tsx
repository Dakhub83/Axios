"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import type { CartLine } from "@/lib/types";

type CartContextValue = {
  lines: CartLine[];
  addLine: (line: CartLine) => void;
  removeLine: (productId: string, size: string) => void;
  updateQuantity: (productId: string, size: string, quantity: number) => void;
  clear: () => void;
  subtotal: number;
  count: number;
};

const CartContext = createContext<CartContextValue | null>(null);

const STORAGE_KEY = "axios-cart";

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) setLines(JSON.parse(raw));
    } catch {
      // ignore corrupted local storage
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
    } catch {
      // storage unavailable, ignore
    }
  }, [lines, hydrated]);

  function addLine(line: CartLine) {
    setLines((prev) => {
      const existing = prev.find((l) => l.productId === line.productId && l.size === line.size);
      if (existing) {
        return prev.map((l) =>
          l.productId === line.productId && l.size === line.size
            ? { ...l, quantity: l.quantity + line.quantity }
            : l
        );
      }
      return [...prev, line];
    });
  }

  function removeLine(productId: string, size: string) {
    setLines((prev) => prev.filter((l) => !(l.productId === productId && l.size === size)));
  }

  function updateQuantity(productId: string, size: string, quantity: number) {
    setLines((prev) =>
      prev.map((l) => (l.productId === productId && l.size === size ? { ...l, quantity } : l))
    );
  }

  function clear() {
    setLines([]);
  }

  const subtotal = lines.reduce((sum, l) => sum + l.price * l.quantity, 0);
  const count = lines.reduce((sum, l) => sum + l.quantity, 0);

  return (
    <CartContext.Provider value={{ lines, addLine, removeLine, updateQuantity, clear, subtotal, count }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
