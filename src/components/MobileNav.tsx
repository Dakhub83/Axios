"use client";

import { useState } from "react";
import Link from "next/link";
import { navItems, slugify } from "@/lib/megaMenu";
import type { SafeUser } from "@/lib/auth";

export default function MobileNav({
  onNavigate,
  user,
}: {
  onNavigate: () => void;
  user: SafeUser | null;
}) {
  const [expanded, setExpanded] = useState<Set<string>>(new Set());

  function toggle(label: string) {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(label)) next.delete(label);
      else next.add(label);
      return next;
    });
  }

  return (
    <nav aria-label="Mobile" className="px-4 py-6">
      <ul className="flex flex-col divide-y divide-border">
        {navItems.map((item) => {
          const isExpanded = expanded.has(item.label);
          const panelId = `mobile-panel-${slugify(item.label)}`;

          return (
            <li key={item.label} className="py-1">
              <div className="flex items-center justify-between">
                <Link
                  href={item.href}
                  onClick={onNavigate}
                  className="py-2 font-serif text-xl hover:text-accent transition-colors"
                >
                  {item.label}
                </Link>
                {item.links && (
                  <button
                    type="button"
                    aria-expanded={isExpanded}
                    aria-controls={panelId}
                    aria-label={`${isExpanded ? "Collapse" : "Expand"} ${item.label} menu`}
                    onClick={() => toggle(item.label)}
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-border hover:border-accent transition-colors"
                  >
                    <svg
                      aria-hidden
                      viewBox="0 0 10 6"
                      className={`h-2.5 w-2.5 transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`}
                    >
                      <path
                        d="M1 1l4 4 4-4"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                )}
              </div>

              {item.links && (
                <div
                  id={panelId}
                  className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${
                    isExpanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="overflow-hidden">
                    <ul className="space-y-2 pt-1 pb-4 pl-1">
                      {item.links.map((link) => (
                        <li key={link.label}>
                          <Link
                            href={link.href}
                            onClick={onNavigate}
                            className="block text-sm text-foreground/80 hover:text-accent transition-colors"
                          >
                            {link.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </li>
          );
        })}
        <li className="pt-4">
          <Link
            href="/favorites"
            onClick={onNavigate}
            className="font-serif text-xl hover:text-accent transition-colors sm:hidden"
          >
            Favorites
          </Link>
        </li>
        <li className="pt-4">
          <Link
            href={user ? "/account" : "/login"}
            onClick={onNavigate}
            className="font-serif text-xl hover:text-accent transition-colors sm:hidden"
          >
            Account
          </Link>
        </li>
        <li className="pt-4">
          <Link
            href="/cart"
            onClick={onNavigate}
            className="font-serif text-xl hover:text-accent transition-colors sm:hidden"
          >
            Cart
          </Link>
        </li>
      </ul>
    </nav>
  );
}
