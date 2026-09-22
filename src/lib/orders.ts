import { randomUUID } from "crypto";
import { db } from "./db";
import type { Order, OrderItem, OrderWithItems, CartLine, PaymentTransaction, PaymentTransactionStatus } from "./types";

function rowToOrder(row: Record<string, unknown>): Order {
  return {
    id: row.id as string,
    userId: (row.user_id as string) ?? null,
    customerName: row.customer_name as string,
    email: row.email as string,
    address: row.address as string,
    subtotal: row.subtotal as number,
    tax: row.tax as number,
    shippingCost: row.shipping_cost as number,
    discountTotal: row.discount_total as number,
    total: row.total as number,
    paymentMethod: row.payment_method as string,
    status: row.status as string,
    createdAt: row.created_at as string,
  };
}

function rowToTransaction(row: Record<string, unknown>): PaymentTransaction {
  return {
    id: row.id as string,
    orderId: row.order_id as string,
    gateway: row.gateway as string,
    transactionRef: (row.transaction_ref as string) ?? null,
    amount: row.amount as number,
    status: row.status as PaymentTransactionStatus,
    createdAt: row.created_at as string,
  };
}

export function createOrder(input: {
  userId?: string | null;
  customerName: string;
  email: string;
  address: string;
  paymentMethod: string;
  lines: CartLine[];
  tax?: number;
  shippingCost?: number;
  discountTotal?: number;
}): Order {
  const id = randomUUID();
  const subtotal = input.lines.reduce((sum, l) => sum + l.price * l.quantity, 0);
  const tax = input.tax ?? 0;
  const shippingCost = input.shippingCost ?? 0;
  const discountTotal = input.discountTotal ?? 0;
  const total = subtotal + tax + shippingCost - discountTotal;

  const insertOrder = db.prepare(`
    INSERT INTO orders (id, user_id, customer_name, email, address, subtotal, tax, shipping_cost, discount_total, total, payment_method, status)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'test_order')
  `);
  const insertItem = db.prepare(`
    INSERT INTO order_items (id, order_id, product_id, quantity, size, unit_price)
    VALUES (?, ?, ?, ?, ?, ?)
  `);

  const tx = db.transaction(() => {
    insertOrder.run(
      id,
      input.userId ?? null,
      input.customerName,
      input.email,
      input.address,
      subtotal,
      tax,
      shippingCost,
      discountTotal,
      total,
      input.paymentMethod
    );
    input.lines.forEach((line) => {
      insertItem.run(randomUUID(), id, line.productId, line.quantity, line.size, line.price);
    });
  });
  tx();

  return getOrderById(id)! as Order;
}

export function listOrders(): OrderWithItems[] {
  const rows = db.prepare("SELECT * FROM orders ORDER BY created_at DESC").all();
  return rows.map((r) => attachItems(rowToOrder(r as Record<string, unknown>)));
}

export function getOrderById(id: string): OrderWithItems | null {
  const row = db.prepare("SELECT * FROM orders WHERE id = ?").get(id);
  if (!row) return null;
  return attachItems(rowToOrder(row as Record<string, unknown>));
}

function attachItems(order: Order): OrderWithItems {
  const rows = db
    .prepare(
      `SELECT oi.*, p.title as product_title
       FROM order_items oi JOIN products p ON p.id = oi.product_id
       WHERE oi.order_id = ?`
    )
    .all(order.id);
  const items: OrderItem[] = rows.map((r) => {
    const row = r as Record<string, unknown>;
    return {
      id: row.id as string,
      orderId: row.order_id as string,
      productId: row.product_id as string,
      productTitle: row.product_title as string,
      variantId: (row.variant_id as string) ?? null,
      quantity: row.quantity as number,
      size: row.size as string,
      unitPrice: row.unit_price as number,
    };
  });
  return { ...order, items };
}

export function recordPaymentTransaction(input: {
  orderId: string;
  gateway: string;
  transactionRef?: string | null;
  amount: number;
  status?: PaymentTransactionStatus;
}): PaymentTransaction {
  const id = randomUUID();
  db.prepare(
    `INSERT INTO payment_transactions (id, order_id, gateway, transaction_ref, amount, status)
     VALUES (?, ?, ?, ?, ?, ?)`
  ).run(id, input.orderId, input.gateway, input.transactionRef ?? null, input.amount, input.status ?? "pending");
  return rowToTransaction(
    db.prepare("SELECT * FROM payment_transactions WHERE id = ?").get(id) as Record<string, unknown>
  );
}

export function listTransactionsForOrder(orderId: string): PaymentTransaction[] {
  return db
    .prepare("SELECT * FROM payment_transactions WHERE order_id = ? ORDER BY created_at ASC")
    .all(orderId)
    .map((r) => rowToTransaction(r as Record<string, unknown>));
}
