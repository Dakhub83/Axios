import Database from "better-sqlite3";
import path from "path";

const dbPath = path.join(process.cwd(), "data", "axios.db");

const globalForDb = globalThis as unknown as { db: Database.Database | undefined };

export const db = globalForDb.db ?? new Database(dbPath);

if (process.env.NODE_ENV !== "production") globalForDb.db = db;

db.pragma("journal_mode = WAL");
db.pragma("foreign_keys = ON");

db.exec(`
  CREATE TABLE IF NOT EXISTS products (
    id TEXT PRIMARY KEY,
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    category TEXT NOT NULL,
    price REAL NOT NULL,
    short_description TEXT NOT NULL,
    is_wear_tested INTEGER NOT NULL DEFAULT 1,
    badge_description TEXT NOT NULL DEFAULT '',
    created_at TEXT NOT NULL DEFAULT (datetime('now')),
    updated_at TEXT NOT NULL DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS product_images (
    id TEXT PRIMARY KEY,
    product_id TEXT NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    url TEXT NOT NULL,
    alt_text TEXT NOT NULL DEFAULT '',
    position INTEGER NOT NULL DEFAULT 0
  );

  CREATE TABLE IF NOT EXISTS product_specs (
    id TEXT PRIMARY KEY,
    product_id TEXT NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    label TEXT NOT NULL,
    value TEXT NOT NULL,
    position INTEGER NOT NULL DEFAULT 0
  );

  CREATE TABLE IF NOT EXISTS product_size_rows (
    id TEXT PRIMARY KEY,
    product_id TEXT NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    size TEXT NOT NULL,
    waist TEXT NOT NULL DEFAULT '',
    hip TEXT NOT NULL DEFAULT '',
    inseam TEXT NOT NULL DEFAULT '',
    fit_note TEXT NOT NULL DEFAULT '',
    position INTEGER NOT NULL DEFAULT 0
  );

  CREATE TABLE IF NOT EXISTS orders (
    id TEXT PRIMARY KEY,
    customer_name TEXT NOT NULL,
    email TEXT NOT NULL,
    address TEXT NOT NULL,
    total REAL NOT NULL,
    payment_method TEXT NOT NULL DEFAULT 'card',
    status TEXT NOT NULL DEFAULT 'test_order',
    created_at TEXT NOT NULL DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS order_items (
    id TEXT PRIMARY KEY,
    order_id TEXT NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    product_id TEXT NOT NULL REFERENCES products(id),
    quantity INTEGER NOT NULL,
    size TEXT NOT NULL,
    unit_price REAL NOT NULL
  );

  CREATE TABLE IF NOT EXISTS team_order_inquiries (
    id TEXT PRIMARY KEY,
    organization TEXT NOT NULL,
    contact_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL DEFAULT '',
    sport TEXT NOT NULL,
    roster_size TEXT NOT NULL,
    target_date TEXT NOT NULL DEFAULT '',
    current_supplier TEXT NOT NULL DEFAULT '',
    message TEXT NOT NULL DEFAULT '',
    created_at TEXT NOT NULL DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS wear_test_entries (
    id TEXT PRIMARY KEY,
    tester_name TEXT NOT NULL,
    item_type TEXT NOT NULL,
    fabric_blend TEXT NOT NULL,
    wash_count INTEGER NOT NULL DEFAULT 0,
    checkpoint TEXT NOT NULL,
    date_tested TEXT NOT NULL,
    comfort_rating INTEGER NOT NULL,
    performance_notes TEXT NOT NULL DEFAULT '',
    pass_fail TEXT NOT NULL,
    created_at TEXT NOT NULL DEFAULT (datetime('now'))
  );

  -- 1. Product & Category schema
  CREATE TABLE IF NOT EXISTS categories (
    id TEXT PRIMARY KEY,
    slug TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    parent_id TEXT REFERENCES categories(id) ON DELETE SET NULL,
    created_at TEXT NOT NULL DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS product_variants (
    id TEXT PRIMARY KEY,
    product_id TEXT NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    color TEXT NOT NULL DEFAULT '',
    size TEXT NOT NULL,
    sku TEXT UNIQUE NOT NULL,
    inventory_count INTEGER NOT NULL DEFAULT 0,
    price_override REAL,
    created_at TEXT NOT NULL DEFAULT (datetime('now'))
  );

  -- 2. User & Athlete Profile schema
  CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    full_name TEXT NOT NULL DEFAULT '',
    phone TEXT NOT NULL DEFAULT '',
    email_verified_at TEXT,
    created_at TEXT NOT NULL DEFAULT (datetime('now')),
    updated_at TEXT NOT NULL DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS user_addresses (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    label TEXT NOT NULL DEFAULT 'Home',
    full_name TEXT NOT NULL,
    phone TEXT NOT NULL DEFAULT '',
    address_line1 TEXT NOT NULL,
    address_line2 TEXT NOT NULL DEFAULT '',
    city TEXT NOT NULL,
    state TEXT NOT NULL DEFAULT '',
    postal_code TEXT NOT NULL DEFAULT '',
    country TEXT NOT NULL,
    is_default_shipping INTEGER NOT NULL DEFAULT 0,
    is_default_billing INTEGER NOT NULL DEFAULT 0,
    created_at TEXT NOT NULL DEFAULT (datetime('now'))
  );

  -- Self-reported sizing data, not biometric identifiers (see PR notes on scope).
  CREATE TABLE IF NOT EXISTS user_fit_profiles (
    id TEXT PRIMARY KEY,
    user_id TEXT UNIQUE NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    height_cm REAL,
    weight_kg REAL,
    preferred_fit TEXT NOT NULL DEFAULT '',
    measurements_json TEXT NOT NULL DEFAULT '{}',
    updated_at TEXT NOT NULL DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS return_requests (
    id TEXT PRIMARY KEY,
    order_email TEXT NOT NULL,
    order_number TEXT NOT NULL DEFAULT '',
    item_description TEXT NOT NULL,
    reason TEXT NOT NULL,
    resolution TEXT NOT NULL DEFAULT 'refund',
    details TEXT NOT NULL DEFAULT '',
    status TEXT NOT NULL DEFAULT 'pending',
    created_at TEXT NOT NULL DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS sessions (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    expires_at TEXT NOT NULL,
    created_at TEXT NOT NULL DEFAULT (datetime('now'))
  );

  -- 3. Order & Payment Transactions schema
  CREATE TABLE IF NOT EXISTS payment_transactions (
    id TEXT PRIMARY KEY,
    order_id TEXT NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    gateway TEXT NOT NULL,
    transaction_ref TEXT,
    amount REAL NOT NULL,
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'succeeded', 'failed', 'refunded')),
    created_at TEXT NOT NULL DEFAULT (datetime('now'))
  );
`);

function hasColumn(table: string, column: string): boolean {
  const columns = db.prepare(`PRAGMA table_info(${table})`).all() as { name: string }[];
  return columns.some((c) => c.name === column);
}

if (!hasColumn("orders", "payment_method")) {
  db.exec("ALTER TABLE orders ADD COLUMN payment_method TEXT NOT NULL DEFAULT 'card'");
}

if (!hasColumn("products", "category_id")) {
  db.exec("ALTER TABLE products ADD COLUMN category_id TEXT REFERENCES categories(id)");
}
if (!hasColumn("products", "attributes_json")) {
  db.exec("ALTER TABLE products ADD COLUMN attributes_json TEXT NOT NULL DEFAULT '{}'");
}

if (!hasColumn("orders", "user_id")) {
  db.exec("ALTER TABLE orders ADD COLUMN user_id TEXT REFERENCES users(id)");
}
if (!hasColumn("orders", "subtotal")) {
  db.exec("ALTER TABLE orders ADD COLUMN subtotal REAL");
  db.exec("UPDATE orders SET subtotal = total WHERE subtotal IS NULL");
}
if (!hasColumn("orders", "tax")) {
  db.exec("ALTER TABLE orders ADD COLUMN tax REAL NOT NULL DEFAULT 0");
}
if (!hasColumn("orders", "shipping_cost")) {
  db.exec("ALTER TABLE orders ADD COLUMN shipping_cost REAL NOT NULL DEFAULT 0");
}
if (!hasColumn("orders", "discount_total")) {
  db.exec("ALTER TABLE orders ADD COLUMN discount_total REAL NOT NULL DEFAULT 0");
}

if (!hasColumn("order_items", "variant_id")) {
  db.exec("ALTER TABLE order_items ADD COLUMN variant_id TEXT REFERENCES product_variants(id)");
}
