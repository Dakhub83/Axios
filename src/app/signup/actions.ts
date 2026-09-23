"use server";

import { redirect } from "next/navigation";
import { signUp } from "@/lib/auth";

export type AuthState = { success: boolean; message: string };

export async function signUpAction(_prevState: AuthState, formData: FormData): Promise<AuthState> {
  const fullName = String(formData.get("fullName") || "").trim();
  const email = String(formData.get("email") || "").trim();
  const password = String(formData.get("password") || "");
  const confirmPassword = String(formData.get("confirmPassword") || "");

  if (password !== confirmPassword) {
    return { success: false, message: "Passwords do not match." };
  }

  const result = await signUp({ email, password, fullName });
  if ("error" in result) return { success: false, message: result.error };

  redirect("/account");
}
