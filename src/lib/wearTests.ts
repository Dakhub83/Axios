import { randomUUID } from "crypto";
import { db } from "./db";
import type { WearTestEntry } from "./types";

function rowToEntry(row: Record<string, unknown>): WearTestEntry {
  return {
    id: row.id as string,
    testerName: row.tester_name as string,
    itemType: row.item_type as string,
    fabricBlend: row.fabric_blend as string,
    washCount: row.wash_count as number,
    checkpoint: row.checkpoint as string,
    dateTested: row.date_tested as string,
    comfortRating: row.comfort_rating as number,
    performanceNotes: row.performance_notes as string,
    passFail: row.pass_fail as string,
    createdAt: row.created_at as string,
  };
}

export function createWearTestEntry(input: Omit<WearTestEntry, "id" | "createdAt">): WearTestEntry {
  const id = randomUUID();
  db.prepare(`
    INSERT INTO wear_test_entries
      (id, tester_name, item_type, fabric_blend, wash_count, checkpoint, date_tested, comfort_rating, performance_notes, pass_fail)
    VALUES (@id, @testerName, @itemType, @fabricBlend, @washCount, @checkpoint, @dateTested, @comfortRating, @performanceNotes, @passFail)
  `).run({ id, ...input });
  const row = db.prepare("SELECT * FROM wear_test_entries WHERE id = ?").get(id);
  return rowToEntry(row as Record<string, unknown>);
}

export function listWearTestEntries(): WearTestEntry[] {
  const rows = db.prepare("SELECT * FROM wear_test_entries ORDER BY created_at DESC").all();
  return rows.map((r) => rowToEntry(r as Record<string, unknown>));
}
