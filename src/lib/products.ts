import { randomUUID } from "crypto";
import { db } from "./db";
import type { Product, ProductImage, ProductSpec, ProductSizeRow, ProductWithDetails } from "./types";

function rowToProduct(row: Record<string, unknown>): Product {
  return {
    id: row.id as string,
    slug: row.slug as string,
    title: row.title as string,
    category: row.category as string,
    price: row.price as number,
    shortDescription: row.short_description as string,
    isWearTested: Boolean(row.is_wear_tested),
    badgeDescription: row.badge_description as string,
    createdAt: row.created_at as string,
    updatedAt: row.updated_at as string,
  };
}

function rowToImage(row: Record<string, unknown>): ProductImage {
  return {
    id: row.id as string,
    productId: row.product_id as string,
    url: row.url as string,
    altText: row.alt_text as string,
    position: row.position as number,
  };
}

function rowToSpec(row: Record<string, unknown>): ProductSpec {
  return {
    id: row.id as string,
    productId: row.product_id as string,
    label: row.label as string,
    value: row.value as string,
    position: row.position as number,
  };
}

function rowToSizeRow(row: Record<string, unknown>): ProductSizeRow {
  return {
    id: row.id as string,
    productId: row.product_id as string,
    size: row.size as string,
    waist: row.waist as string,
    hip: row.hip as string,
    inseam: row.inseam as string,
    fitNote: row.fit_note as string,
    position: row.position as number,
  };
}

function attachDetails(product: Product): ProductWithDetails {
  const images = db
    .prepare("SELECT * FROM product_images WHERE product_id = ? ORDER BY position ASC")
    .all(product.id)
    .map((r) => rowToImage(r as Record<string, unknown>));
  const specs = db
    .prepare("SELECT * FROM product_specs WHERE product_id = ? ORDER BY position ASC")
    .all(product.id)
    .map((r) => rowToSpec(r as Record<string, unknown>));
  const sizeRows = db
    .prepare("SELECT * FROM product_size_rows WHERE product_id = ? ORDER BY position ASC")
    .all(product.id)
    .map((r) => rowToSizeRow(r as Record<string, unknown>));
  return { ...product, images, specs, sizeRows };
}

export function listProducts(): ProductWithDetails[] {
  const rows = db.prepare("SELECT * FROM products ORDER BY created_at DESC").all();
  return rows.map((r) => attachDetails(rowToProduct(r as Record<string, unknown>)));
}

export function getProductBySlug(slug: string): ProductWithDetails | null {
  const row = db.prepare("SELECT * FROM products WHERE slug = ?").get(slug);
  if (!row) return null;
  return attachDetails(rowToProduct(row as Record<string, unknown>));
}

export function getProductById(id: string): ProductWithDetails | null {
  const row = db.prepare("SELECT * FROM products WHERE id = ?").get(id);
  if (!row) return null;
  return attachDetails(rowToProduct(row as Record<string, unknown>));
}

function slugify(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export type ProductInput = {
  title: string;
  category: string;
  price: number;
  shortDescription: string;
  isWearTested: boolean;
  badgeDescription: string;
  images: { url: string; altText?: string }[];
  specs: { label: string; value: string }[];
  sizeRows: { size: string; waist: string; hip: string; inseam: string; fitNote: string }[];
};

export function createProduct(input: ProductInput): Product {
  const id = randomUUID();
  let slug = slugify(input.title);
  const existing = db.prepare("SELECT id FROM products WHERE slug = ?").get(slug);
  if (existing) slug = `${slug}-${id.slice(0, 6)}`;

  const insertProduct = db.prepare(`
    INSERT INTO products (id, slug, title, category, price, short_description, is_wear_tested, badge_description)
    VALUES (@id, @slug, @title, @category, @price, @shortDescription, @isWearTested, @badgeDescription)
  `);

  const insertImage = db.prepare(`
    INSERT INTO product_images (id, product_id, url, alt_text, position) VALUES (?, ?, ?, ?, ?)
  `);
  const insertSpec = db.prepare(`
    INSERT INTO product_specs (id, product_id, label, value, position) VALUES (?, ?, ?, ?, ?)
  `);
  const insertSizeRow = db.prepare(`
    INSERT INTO product_size_rows (id, product_id, size, waist, hip, inseam, fit_note, position)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `);

  const tx = db.transaction(() => {
    insertProduct.run({
      id,
      slug,
      title: input.title,
      category: input.category,
      price: input.price,
      shortDescription: input.shortDescription,
      isWearTested: input.isWearTested ? 1 : 0,
      badgeDescription: input.badgeDescription,
    });
    input.images.forEach((img, i) => insertImage.run(randomUUID(), id, img.url, img.altText ?? "", i));
    input.specs.forEach((spec, i) => insertSpec.run(randomUUID(), id, spec.label, spec.value, i));
    input.sizeRows.forEach((row, i) =>
      insertSizeRow.run(randomUUID(), id, row.size, row.waist, row.hip, row.inseam, row.fitNote, i)
    );
  });
  tx();

  return getProductById(id)! as Product;
}

export function updateProduct(id: string, input: ProductInput): void {
  const tx = db.transaction(() => {
    db.prepare(`
      UPDATE products
      SET title = ?, category = ?, price = ?, short_description = ?, is_wear_tested = ?, badge_description = ?, updated_at = datetime('now')
      WHERE id = ?
    `).run(input.title, input.category, input.price, input.shortDescription, input.isWearTested ? 1 : 0, input.badgeDescription, id);

    db.prepare("DELETE FROM product_images WHERE product_id = ?").run(id);
    db.prepare("DELETE FROM product_specs WHERE product_id = ?").run(id);
    db.prepare("DELETE FROM product_size_rows WHERE product_id = ?").run(id);

    const insertImage = db.prepare(`INSERT INTO product_images (id, product_id, url, alt_text, position) VALUES (?, ?, ?, ?, ?)`);
    const insertSpec = db.prepare(`INSERT INTO product_specs (id, product_id, label, value, position) VALUES (?, ?, ?, ?, ?)`);
    const insertSizeRow = db.prepare(`
      INSERT INTO product_size_rows (id, product_id, size, waist, hip, inseam, fit_note, position)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `);

    input.images.forEach((img, i) => insertImage.run(randomUUID(), id, img.url, img.altText ?? "", i));
    input.specs.forEach((spec, i) => insertSpec.run(randomUUID(), id, spec.label, spec.value, i));
    input.sizeRows.forEach((row, i) =>
      insertSizeRow.run(randomUUID(), id, row.size, row.waist, row.hip, row.inseam, row.fitNote, i)
    );
  });
  tx();
}

export function deleteProduct(id: string): void {
  db.prepare("DELETE FROM products WHERE id = ?").run(id);
}
