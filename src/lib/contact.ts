import { randomUUID } from "crypto";
import { db } from "./db";
import type { ContactMessage } from "./types";

function rowToContactMessage(row: Record<string, unknown>): ContactMessage {
  return {
    id: row.id as string,
    name: row.name as string,
    email: row.email as string,
    subject: row.subject as string,
    message: row.message as string,
    emailed: Boolean(row.emailed),
    createdAt: row.created_at as string,
  };
}

export function createContactMessage(
  input: Omit<ContactMessage, "id" | "createdAt">
): ContactMessage {
  const id = randomUUID();
  db.prepare(`
    INSERT INTO contact_messages (id, name, email, subject, message, emailed)
    VALUES (@id, @name, @email, @subject, @message, @emailed)
  `).run({ id, ...input, emailed: input.emailed ? 1 : 0 });
  const row = db.prepare("SELECT * FROM contact_messages WHERE id = ?").get(id);
  return rowToContactMessage(row as Record<string, unknown>);
}

export function listContactMessages(): ContactMessage[] {
  const rows = db.prepare("SELECT * FROM contact_messages ORDER BY created_at DESC").all();
  return rows.map((r) => rowToContactMessage(r as Record<string, unknown>));
}
