import { randomUUID } from "crypto";
import { db } from "./db";
import type { Order, OrderItem, OrderWithItems, CartLine } from "./types";

function rowToOrder(row: Record<string, unknown>): Order {
  return {
    id: row.id as string,
    customerName: row.customer_name as string,
    email: row.email as string,
    address: row.address as string,
    total: row.total as number,
    status: row.status as string,
    createdAt: row.created_at as string,
  };
}

export function createOrder(input: {
  customerName: string;
  email: string;
  address: string;
  lines: CartLine[];
}): Order {
  const id = randomUUID();
  const total = input.lines.reduce((sum, l) => sum + l.price * l.quantity, 0);

  const insertOrder = db.prepare(`
    INSERT INTO orders (id, customer_name, email, address, total, status)
    VALUES (?, ?, ?, ?, ?, 'test_order')
  `);
  const insertItem = db.prepare(`
    INSERT INTO order_items (id, order_id, product_id, quantity, size, unit_price)
    VALUES (?, ?, ?, ?, ?, ?)
  `);

  const tx = db.transaction(() => {
    insertOrder.run(id, input.customerName, input.email, input.address, total);
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
      quantity: row.quantity as number,
      size: row.size as string,
      unitPrice: row.unit_price as number,
    };
  });
  return { ...order, items };
}
