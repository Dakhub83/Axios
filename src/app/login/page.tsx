"use client";

import { useActionState } from "react";
import Link from "next/link";
import { signInAction, type AuthState } from "./actions";

const initialState: AuthState = { success: false, message: "" };

export default function LoginPage() {
  const [state, formAction, pending] = useActionState(signInAction, initialState);

  return (
    <div className="max-w-md mx-auto px-4 py-16">
      <div className="rounded-lg border border-border bg-muted p-8">
        <h1 className="text-2xl font-bold mb-2">Log In</h1>
        <p className="text-sm text-foreground/60 mb-8">Welcome back to Axios.</p>

        <form action={formAction} className="space-y-4">
          {state.message && <p className="text-sm text-red-400">{state.message}</p>}
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
              className="w-full border border-border rounded px-3 py-2 bg-background"
            />
          </div>
          <button
            type="submit"
            disabled={pending}
            className="w-full bg-accent text-black font-semibold px-6 py-3 rounded-full hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {pending ? "Logging in..." : "Log In"}
          </button>
        </form>

        <div className="flex items-center gap-4 my-8" aria-hidden>
          <span className="h-px flex-1 bg-border" />
          <span className="text-xs uppercase tracking-widest text-foreground/50">New to Axios</span>
          <span className="h-px flex-1 bg-border" />
        </div>

        <Link
          href="/signup"
          className="block w-full border border-border rounded-full px-6 py-3 text-center font-semibold hover:border-accent hover:text-accent transition-colors"
        >
          Create Account
        </Link>
      </div>
    </div>
  );
}
