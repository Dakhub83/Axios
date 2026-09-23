import { randomUUID } from "crypto";
import { db } from "./db";
import type { ReturnRequest } from "./types";

function rowToReturnRequest(row: Record<string, unknown>): ReturnRequest {
  return {
    id: row.id as string,
    orderEmail: row.order_email as string,
    orderNumber: row.order_number as string,
    itemDescription: row.item_description as string,
    reason: row.reason as string,
    resolution: row.resolution as string,
    details: row.details as string,
    status: row.status as string,
    createdAt: row.created_at as string,
  };
}

export function createReturnRequest(
  input: Omit<ReturnRequest, "id" | "createdAt" | "status">
): ReturnRequest {
  const id = randomUUID();
  db.prepare(`
    INSERT INTO return_requests
      (id, order_email, order_number, item_description, reason, resolution, details)
    VALUES (@id, @orderEmail, @orderNumber, @itemDescription, @reason, @resolution, @details)
  `).run({ id, ...input });
  const row = db.prepare("SELECT * FROM return_requests WHERE id = ?").get(id);
  return rowToReturnRequest(row as Record<string, unknown>);
}

export function listReturnRequests(): ReturnRequest[] {
  const rows = db.prepare("SELECT * FROM return_requests ORDER BY created_at DESC").all();
  return rows.map((r) => rowToReturnRequest(r as Record<string, unknown>));
}
