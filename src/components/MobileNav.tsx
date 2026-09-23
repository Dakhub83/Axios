"use client";

import { useState } from "react";
import Link from "next/link";
import { navItems, slugify } from "@/lib/megaMenu";
import NavTag from "./NavTag";
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
                {item.mega && (
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

              {item.mega && (
                <div
                  id={panelId}
                  className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${
                    isExpanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="space-y-5 pt-1 pb-4 pl-1">
                      {item.mega.layout === "columns" && (
                        <>
                          {item.mega.columns.map((col) => (
                            <div key={col.heading}>
                              <h3 className="mb-2 text-xs font-semibold uppercase tracking-widest text-foreground/50">
                                {col.heading}
                              </h3>
                              <ul className="space-y-2">
                                {col.links.map((link) => (
                                  <li key={link.label}>
                                    <Link
                                      href={link.href}
                                      onClick={onNavigate}
                                      className="block text-sm text-foreground/80 hover:text-accent transition-colors"
                                    >
                                      {link.label}
                                      {link.tag && <NavTag tag={link.tag} />}
                                    </Link>
                                    {link.children && (
                                      <ul className="mt-1.5 ml-3 space-y-1.5 border-l border-border pl-3">
                                        {link.children.map((child) => (
                                          <li key={child.label}>
                                            <Link
                                              href={child.href}
                                              onClick={onNavigate}
                                              className="block text-xs text-foreground/60 hover:text-accent transition-colors"
                                            >
                                              {child.label}
                                              {child.tag && <NavTag tag={child.tag} />}
                                            </Link>
                                          </li>
                                        ))}
                                      </ul>
                                    )}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                          <Link
                            href={item.mega.banner.href}
                            onClick={onNavigate}
                            className="block rounded-lg border border-border p-4 hover:border-accent transition-colors"
                          >
                            <span className="text-[10px] uppercase tracking-widest text-foreground/50">Featured</span>
                            <p className="mt-1 font-serif text-base">{item.mega.banner.title}</p>
                            <p className="mt-1 text-xs text-foreground/60">{item.mega.banner.subtitle}</p>
                          </Link>
                        </>
                      )}

                      {item.mega.layout === "list" && (
                        <ul className="space-y-2">
                          {item.mega.links.map((link) => (
                            <li key={link.label}>
                              <Link
                                href={link.href}
                                onClick={onNavigate}
                                className="block text-sm text-foreground/80 hover:text-accent transition-colors"
                              >
                                {link.label}
                                {link.tag && <NavTag tag={link.tag} />}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}

                      {item.mega.layout === "features" && (
                        <ul className="space-y-3">
                          {item.mega.features.map((feature) => (
                            <li key={feature.name}>
                              <Link
                                href={feature.href}
                                onClick={onNavigate}
                                className="block rounded-lg border border-border p-3 hover:border-accent transition-colors"
                              >
                                <span className="font-serif text-sm">
                                  {feature.name}
                                  {feature.tag && <NavTag tag={feature.tag} />}
                                </span>
                                <p className="mt-1 text-xs text-foreground/60">{feature.description}</p>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </li>
          );
        })}
        <li className="pt-4">
          <Link
            href={user ? "/account" : "/login"}
            onClick={onNavigate}
            className="font-serif text-xl hover:text-accent transition-colors sm:hidden"
          >
            {user ? user.fullName || "Account" : "Log In"}
          </Link>
        </li>
        <li className="pt-4 sm:hidden">
          <p className="font-serif text-xl">Help</p>
          <div className="mt-2 space-y-2 pl-1">
            <Link
              href="/return-policy"
              onClick={onNavigate}
              className="block text-sm text-foreground/80 hover:text-accent transition-colors"
            >
              Return Policy
            </Link>
            <Link
              href="/return-item"
              onClick={onNavigate}
              className="block text-sm text-foreground/80 hover:text-accent transition-colors"
            >
              Return Item
            </Link>
          </div>
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
