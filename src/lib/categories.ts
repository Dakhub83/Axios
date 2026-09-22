import { randomUUID } from "crypto";
import { db } from "./db";
import type { Category } from "./types";

function rowToCategory(row: Record<string, unknown>): Category {
  return {
    id: row.id as string,
    slug: row.slug as string,
    name: row.name as string,
    parentId: (row.parent_id as string) ?? null,
    createdAt: row.created_at as string,
  };
}

export function listCategories(): Category[] {
  return db
    .prepare("SELECT * FROM categories ORDER BY name ASC")
    .all()
    .map((r) => rowToCategory(r as Record<string, unknown>));
}

export function getCategoryBySlug(slug: string): Category | null {
  const row = db.prepare("SELECT * FROM categories WHERE slug = ?").get(slug);
  return row ? rowToCategory(row as Record<string, unknown>) : null;
}

export function createCategory(input: { slug: string; name: string; parentId?: string | null }): Category {
  const id = randomUUID();
  db.prepare("INSERT INTO categories (id, slug, name, parent_id) VALUES (?, ?, ?, ?)").run(
    id,
    input.slug,
    input.name,
    input.parentId ?? null
  );
  return getCategoryBySlug(input.slug)!;
}
