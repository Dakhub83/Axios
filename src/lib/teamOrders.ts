import { randomUUID } from "crypto";
import { db } from "./db";
import type { TeamOrderInquiry } from "./types";

function rowToInquiry(row: Record<string, unknown>): TeamOrderInquiry {
  return {
    id: row.id as string,
    organization: row.organization as string,
    contactName: row.contact_name as string,
    email: row.email as string,
    phone: row.phone as string,
    sport: row.sport as string,
    rosterSize: row.roster_size as string,
    targetDate: row.target_date as string,
    currentSupplier: row.current_supplier as string,
    message: row.message as string,
    createdAt: row.created_at as string,
  };
}

export function createTeamOrderInquiry(input: Omit<TeamOrderInquiry, "id" | "createdAt">): TeamOrderInquiry {
  const id = randomUUID();
  db.prepare(`
    INSERT INTO team_order_inquiries
      (id, organization, contact_name, email, phone, sport, roster_size, target_date, current_supplier, message)
    VALUES (@id, @organization, @contactName, @email, @phone, @sport, @rosterSize, @targetDate, @currentSupplier, @message)
  `).run({ id, ...input });
  const row = db.prepare("SELECT * FROM team_order_inquiries WHERE id = ?").get(id);
  return rowToInquiry(row as Record<string, unknown>);
}

export function listTeamOrderInquiries(): TeamOrderInquiry[] {
  const rows = db.prepare("SELECT * FROM team_order_inquiries ORDER BY created_at DESC").all();
  return rows.map((r) => rowToInquiry(r as Record<string, unknown>));
}
