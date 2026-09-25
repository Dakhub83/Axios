"use client";

import { useState } from "react";

export default function WearTestedBadge({ description }: { description: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="mt-4">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="inline-flex items-center gap-2 border border-bone text-bone rounded-full px-4 py-2 text-sm font-semibold hover:bg-bone hover:text-background transition-colors"
      >
        <span aria-hidden>&#9733;</span> Family Wear-Tested Approved
      </button>
      {open && (
        <p className="mt-3 text-sm text-foreground/70 leading-relaxed max-w-md">
          {description ||
            "This product completed our full 30-day internal testing cycle, worn by real members of our family through actual training sessions."}
        </p>
      )}
    </div>
  );
}
