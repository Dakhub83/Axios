"use server";

import { redirect } from "next/navigation";
import { signIn } from "@/lib/auth";

export type AuthState = { success: boolean; message: string };

export async function signInAction(_prevState: AuthState, formData: FormData): Promise<AuthState> {
  const email = String(formData.get("email") || "").trim();
  const password = String(formData.get("password") || "");

  if (!email || !password) {
    return { success: false, message: "Enter your email and password." };
  }

  const result = await signIn(email, password);
  if ("error" in result) return { success: false, message: result.error };

  redirect("/account");
}
