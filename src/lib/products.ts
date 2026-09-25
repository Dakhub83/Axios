import { randomUUID } from "crypto";
import { db } from "./db";
import type {
  Product,
  ProductAttributes,
  ProductImage,
  ProductSpec,
  ProductSizeRow,
  ProductVariant,
  ProductWithDetails,
} from "./types";

function parseAttributes(raw: unknown): ProductAttributes {
  try {
    return JSON.parse((raw as string) || "{}");
  } catch {
    return {};
  }
}

function rowToProduct(row: Record<string, unknown>): Product {
  return {
    id: row.id as string,
    slug: row.slug as string,
    title: row.title as string,
    category: row.category as string,
    department: (row.department as string) || "unisex",
    categoryId: (row.category_id as string) ?? null,
    price: row.price as number,
    shortDescription: row.short_description as string,
    isWearTested: Boolean(row.is_wear_tested),
    badgeDescription: row.badge_description as string,
    attributes: parseAttributes(row.attributes_json),
    createdAt: row.created_at as string,
    updatedAt: row.updated_at as string,
  };
}

function rowToVariant(row: Record<string, unknown>): ProductVariant {
  return {
    id: row.id as string,
    productId: row.product_id as string,
    color: row.color as string,
    size: row.size as string,
    sku: row.sku as string,
    inventoryCount: row.inventory_count as number,
    priceOverride: (row.price_override as number) ?? null,
    createdAt: row.created_at as string,
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
  const variants = db
    .prepare("SELECT * FROM product_variants WHERE product_id = ? ORDER BY created_at ASC")
    .all(product.id)
    .map((r) => rowToVariant(r as Record<string, unknown>));
  return { ...product, images, specs, sizeRows, variants };
}

export function listVariantsForProduct(productId: string): ProductVariant[] {
  return db
    .prepare("SELECT * FROM product_variants WHERE product_id = ? ORDER BY created_at ASC")
    .all(productId)
    .map((r) => rowToVariant(r as Record<string, unknown>));
}

export function createVariant(input: {
  productId: string;
  color: string;
  size: string;
  sku: string;
  inventoryCount: number;
  priceOverride?: number | null;
}): ProductVariant {
  const id = randomUUID();
  db.prepare(
    `INSERT INTO product_variants (id, product_id, color, size, sku, inventory_count, price_override)
     VALUES (?, ?, ?, ?, ?, ?, ?)`
  ).run(id, input.productId, input.color, input.size, input.sku, input.inventoryCount, input.priceOverride ?? null);
  return rowToVariant(db.prepare("SELECT * FROM product_variants WHERE id = ?").get(id) as Record<string, unknown>);
}

export function adjustVariantInventory(variantId: string, delta: number): void {
  db.prepare("UPDATE product_variants SET inventory_count = inventory_count + ? WHERE id = ?").run(
    delta,
    variantId
  );
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

// Prefers a different category in the same department (e.g. a top to go with
// leggings) and falls back to the rest of the department if there isn't enough.
export function getRelatedProducts(
  product: ProductWithDetails,
  limit = 3
): ProductWithDetails[] {
  const others = listProducts().filter((p) => p.id !== product.id);
  const sameDeptDifferentCategory = others.filter(
    (p) => p.department === product.department && p.category !== product.category
  );
  const pool = sameDeptDifferentCategory.length >= limit
    ? sameDeptDifferentCategory
    : others.filter((p) => p.department === product.department);
  return pool.slice(0, limit);
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
  department?: string;
  categoryId?: string | null;
  price: number;
  shortDescription: string;
  isWearTested: boolean;
  badgeDescription: string;
  attributes?: ProductAttributes;
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
    INSERT INTO products (id, slug, title, category, department, category_id, price, short_description, is_wear_tested, badge_description, attributes_json)
    VALUES (@id, @slug, @title, @category, @department, @categoryId, @price, @shortDescription, @isWearTested, @badgeDescription, @attributesJson)
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
      department: input.department ?? "unisex",
      categoryId: input.categoryId ?? null,
      price: input.price,
      shortDescription: input.shortDescription,
      isWearTested: input.isWearTested ? 1 : 0,
      badgeDescription: input.badgeDescription,
      attributesJson: JSON.stringify(input.attributes ?? {}),
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
    const current = db.prepare("SELECT category_id, attributes_json, department FROM products WHERE id = ?").get(id) as
      | { category_id: string | null; attributes_json: string; department: string }
      | undefined;
    const categoryId = input.categoryId !== undefined ? input.categoryId : (current?.category_id ?? null);
    const attributesJson =
      input.attributes !== undefined ? JSON.stringify(input.attributes) : (current?.attributes_json ?? "{}");

    db.prepare(`
      UPDATE products
      SET title = ?, category = ?, department = ?, category_id = ?, price = ?, short_description = ?, is_wear_tested = ?, badge_description = ?, attributes_json = ?, updated_at = datetime('now')
      WHERE id = ?
    `).run(
      input.title,
      input.category,
      input.department ?? current?.department ?? "unisex",
      categoryId,
      input.price,
      input.shortDescription,
      input.isWearTested ? 1 : 0,
      input.badgeDescription,
      attributesJson,
      id
    );

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
