import { randomBytes, randomUUID, scryptSync, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";
import { db } from "./db";
import { createUser, getUserByEmail, getUserById } from "./users";
import type { User } from "./types";

const SESSION_COOKIE = "axios_session";
const SESSION_TTL_DAYS = 30;

export type SafeUser = { id: string; email: string; fullName: string };

function toSafeUser(user: User): SafeUser {
  return { id: user.id, email: user.email, fullName: user.fullName };
}

export function hashPassword(password: string): string {
  const salt = randomBytes(16).toString("hex");
  const hash = scryptSync(password, salt, 64).toString("hex");
  return `${salt}:${hash}`;
}

export function verifyPassword(password: string, stored: string): boolean {
  const [salt, hash] = stored.split(":");
  if (!salt || !hash) return false;
  const candidate = scryptSync(password, salt, 64);
  const expected = Buffer.from(hash, "hex");
  if (candidate.length !== expected.length) return false;
  return timingSafeEqual(candidate, expected);
}

export async function signUp(input: {
  email: string;
  password: string;
  fullName?: string;
}): Promise<{ user: SafeUser } | { error: string }> {
  const email = input.email.trim().toLowerCase();
  if (!email || !email.includes("@")) return { error: "Enter a valid email address." };
  if (input.password.length < 8) return { error: "Password must be at least 8 characters." };
  if (getUserByEmail(email)) return { error: "An account with that email already exists." };

  const user = createUser({
    email,
    passwordHash: hashPassword(input.password),
    fullName: input.fullName?.trim() ?? "",
  });
  await createSession(user.id);
  return { user: toSafeUser(user) };
}

export async function signIn(
  email: string,
  password: string
): Promise<{ user: SafeUser } | { error: string }> {
  const user = getUserByEmail(email.trim().toLowerCase());
  if (!user || !verifyPassword(password, user.passwordHash)) {
    return { error: "Incorrect email or password." };
  }
  await createSession(user.id);
  return { user: toSafeUser(user) };
}

export async function createSession(userId: string): Promise<void> {
  const id = randomUUID();
  const expiresAt = new Date(Date.now() + SESSION_TTL_DAYS * 24 * 60 * 60 * 1000);
  db.prepare("INSERT INTO sessions (id, user_id, expires_at) VALUES (?, ?, ?)").run(
    id,
    userId,
    expiresAt.toISOString()
  );

  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, id, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    expires: expiresAt,
    path: "/",
  });
}

export async function getCurrentUser(): Promise<SafeUser | null> {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get(SESSION_COOKIE)?.value;
  if (!sessionId) return null;

  const row = db.prepare("SELECT * FROM sessions WHERE id = ?").get(sessionId) as
    | { id: string; user_id: string; expires_at: string }
    | undefined;
  if (!row) return null;

  if (new Date(row.expires_at).getTime() < Date.now()) {
    db.prepare("DELETE FROM sessions WHERE id = ?").run(row.id);
    return null;
  }

  const user = getUserById(row.user_id);
  return user ? toSafeUser(user) : null;
}

export async function signOut(): Promise<void> {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get(SESSION_COOKIE)?.value;
  if (sessionId) db.prepare("DELETE FROM sessions WHERE id = ?").run(sessionId);
  cookieStore.delete(SESSION_COOKIE);
}
