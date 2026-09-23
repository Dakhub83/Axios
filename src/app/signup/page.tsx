"use client";

import { useActionState } from "react";
import Link from "next/link";
import { signUpAction, type AuthState } from "./actions";

const initialState: AuthState = { success: false, message: "" };

export default function SignupPage() {
  const [state, formAction, pending] = useActionState(signUpAction, initialState);

  return (
    <div className="max-w-md mx-auto px-4 py-16">
      <h1 className="text-2xl font-bold mb-2">Create Account</h1>
      <p className="text-sm text-foreground/60 mb-8">
        Join Axios for faster checkout and to track your orders.
      </p>

      <form action={formAction} className="space-y-4">
        {state.message && <p className="text-sm text-red-400">{state.message}</p>}
        <div>
          <label className="block text-sm font-semibold mb-1">Full name</label>
          <input name="fullName" className="w-full border border-border rounded px-3 py-2 bg-background" />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-1">Email</label>
          <input
            type="email"
            name="email"
            required
            className="w-full border border-border rounded px-3 py-2 bg-background"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-1">Password</label>
          <input
            type="password"
            name="password"
            required
            minLength={8}
            className="w-full border border-border rounded px-3 py-2 bg-background"
          />
          <p className="text-xs text-foreground/50 mt-1">At least 8 characters.</p>
        </div>
        <div>
          <label className="block text-sm font-semibold mb-1">Confirm password</label>
          <input
            type="password"
            name="confirmPassword"
            required
            minLength={8}
            className="w-full border border-border rounded px-3 py-2 bg-background"
          />
        </div>
        <button
          type="submit"
          disabled={pending}
          className="w-full bg-accent text-black font-semibold px-6 py-3 rounded-full hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          {pending ? "Creating account..." : "Create Account"}
        </button>
      </form>

      <p className="text-sm text-foreground/60 mt-6">
        Already have an account?{" "}
        <Link href="/login" className="underline hover:text-accent">
          Log in
        </Link>
      </p>
    </div>
  );
}
