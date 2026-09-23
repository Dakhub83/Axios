import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { signOutAction } from "./actions";

export default async function AccountPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  return (
    <div className="max-w-xl mx-auto px-4 py-16">
      <h1 className="text-2xl font-bold mb-2">My Account</h1>
      <p className="text-foreground/60 mb-8">Signed in as {user.email}.</p>

      <div className="border border-border rounded-lg p-6 mb-8 space-y-4">
        <div>
          <p className="text-sm text-foreground/60">Name</p>
          <p className="font-semibold">{user.fullName || "—"}</p>
        </div>
        <div>
          <p className="text-sm text-foreground/60">Email</p>
          <p className="font-semibold">{user.email}</p>
        </div>
      </div>

      <form action={signOutAction}>
        <button
          type="submit"
          className="w-full border border-border rounded-full px-6 py-3 font-semibold hover:border-accent hover:text-accent transition-colors"
        >
          Log out
        </button>
      </form>
    </div>
  );
}
