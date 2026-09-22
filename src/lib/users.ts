import { randomUUID } from "crypto";
import { db } from "./db";
import type { User, UserAddress, UserFitProfile } from "./types";

function rowToUser(row: Record<string, unknown>): User {
  return {
    id: row.id as string,
    email: row.email as string,
    passwordHash: row.password_hash as string,
    fullName: row.full_name as string,
    phone: row.phone as string,
    emailVerifiedAt: (row.email_verified_at as string) ?? null,
    createdAt: row.created_at as string,
    updatedAt: row.updated_at as string,
  };
}

function rowToAddress(row: Record<string, unknown>): UserAddress {
  return {
    id: row.id as string,
    userId: row.user_id as string,
    label: row.label as string,
    fullName: row.full_name as string,
    phone: row.phone as string,
    addressLine1: row.address_line1 as string,
    addressLine2: row.address_line2 as string,
    city: row.city as string,
    state: row.state as string,
    postalCode: row.postal_code as string,
    country: row.country as string,
    isDefaultShipping: Boolean(row.is_default_shipping),
    isDefaultBilling: Boolean(row.is_default_billing),
    createdAt: row.created_at as string,
  };
}

function rowToFitProfile(row: Record<string, unknown>): UserFitProfile {
  let measurements: Record<string, string | number> = {};
  try {
    measurements = JSON.parse((row.measurements_json as string) || "{}");
  } catch {
    measurements = {};
  }
  return {
    id: row.id as string,
    userId: row.user_id as string,
    heightCm: (row.height_cm as number) ?? null,
    weightKg: (row.weight_kg as number) ?? null,
    preferredFit: row.preferred_fit as string,
    measurements,
    updatedAt: row.updated_at as string,
  };
}

/**
 * `passwordHash` must already be a one-way hash (e.g. bcrypt/argon2) produced
 * by the caller's auth layer. This function never hashes, verifies, or
 * otherwise handles raw passwords.
 */
export function createUser(input: {
  email: string;
  passwordHash: string;
  fullName?: string;
  phone?: string;
}): User {
  const id = randomUUID();
  db.prepare(
    "INSERT INTO users (id, email, password_hash, full_name, phone) VALUES (?, ?, ?, ?, ?)"
  ).run(id, input.email.toLowerCase(), input.passwordHash, input.fullName ?? "", input.phone ?? "");
  return getUserById(id)!;
}

export function getUserByEmail(email: string): User | null {
  const row = db.prepare("SELECT * FROM users WHERE email = ?").get(email.toLowerCase());
  return row ? rowToUser(row as Record<string, unknown>) : null;
}

export function getUserById(id: string): User | null {
  const row = db.prepare("SELECT * FROM users WHERE id = ?").get(id);
  return row ? rowToUser(row as Record<string, unknown>) : null;
}

export function listAddressesForUser(userId: string): UserAddress[] {
  return db
    .prepare("SELECT * FROM user_addresses WHERE user_id = ? ORDER BY created_at ASC")
    .all(userId)
    .map((r) => rowToAddress(r as Record<string, unknown>));
}

export function createUserAddress(
  input: Omit<UserAddress, "id" | "createdAt" | "isDefaultShipping" | "isDefaultBilling"> & {
    isDefaultShipping?: boolean;
    isDefaultBilling?: boolean;
  }
): UserAddress {
  const id = randomUUID();
  db.prepare(
    `INSERT INTO user_addresses
      (id, user_id, label, full_name, phone, address_line1, address_line2, city, state, postal_code, country, is_default_shipping, is_default_billing)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
  ).run(
    id,
    input.userId,
    input.label,
    input.fullName,
    input.phone,
    input.addressLine1,
    input.addressLine2,
    input.city,
    input.state,
    input.postalCode,
    input.country,
    input.isDefaultShipping ? 1 : 0,
    input.isDefaultBilling ? 1 : 0
  );
  return rowToAddress(db.prepare("SELECT * FROM user_addresses WHERE id = ?").get(id) as Record<string, unknown>);
}

export function getFitProfile(userId: string): UserFitProfile | null {
  const row = db.prepare("SELECT * FROM user_fit_profiles WHERE user_id = ?").get(userId);
  return row ? rowToFitProfile(row as Record<string, unknown>) : null;
}

export function upsertFitProfile(input: {
  userId: string;
  heightCm?: number | null;
  weightKg?: number | null;
  preferredFit?: string;
  measurements?: Record<string, string | number>;
}): UserFitProfile {
  const existing = getFitProfile(input.userId);
  const measurementsJson = JSON.stringify(input.measurements ?? existing?.measurements ?? {});

  if (existing) {
    db.prepare(
      `UPDATE user_fit_profiles
       SET height_cm = ?, weight_kg = ?, preferred_fit = ?, measurements_json = ?, updated_at = datetime('now')
       WHERE user_id = ?`
    ).run(
      input.heightCm ?? existing.heightCm,
      input.weightKg ?? existing.weightKg,
      input.preferredFit ?? existing.preferredFit,
      measurementsJson,
      input.userId
    );
  } else {
    db.prepare(
      `INSERT INTO user_fit_profiles (id, user_id, height_cm, weight_kg, preferred_fit, measurements_json)
       VALUES (?, ?, ?, ?, ?, ?)`
    ).run(
      randomUUID(),
      input.userId,
      input.heightCm ?? null,
      input.weightKg ?? null,
      input.preferredFit ?? "",
      measurementsJson
    );
  }

  return getFitProfile(input.userId)!;
}
