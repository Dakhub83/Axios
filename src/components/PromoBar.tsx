"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

// Placeholder copy — swap in the real offer (and code, if any) when it's decided.
// Bump storageKey's suffix whenever the copy changes so returning visitors who
// dismissed the old banner see the new one.
const PROMO = {
  message: "Free shipping over $75",
  href: "/shop",
  storageKey: "axios_promo_dismissed_v1",
};

export default function PromoBar() {
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    try {
      if (localStorage.getItem(PROMO.storageKey) === "1") setDismissed(true);
    } catch {
      // Storage unavailable — just show the banner.
    }
  }, []);

  function dismiss() {
    setDismissed(true);
    try {
      localStorage.setItem(PROMO.storageKey, "1");
    } catch {
      // Nothing to persist; the banner just reappears next visit.
    }
  }

  if (dismissed) return null;

  return (
    <div className="relative flex items-center justify-center bg-accent px-10 py-2 text-center text-accent-ink">
      <Link href={PROMO.href} className="text-xs font-semibold uppercase tracking-widest hover:underline">
        {PROMO.message}
      </Link>
      <button
        type="button"
        onClick={dismiss}
        aria-label="Dismiss"
        className="absolute right-3 top-1/2 -translate-y-1/2 text-accent-ink/70 transition-colors hover:text-accent-ink"
      >
        <svg aria-hidden viewBox="0 0 12 12" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M1 1l10 10M11 1L1 11" strokeLinecap="round" />
        </svg>
      </button>
    </div>
  );
}
