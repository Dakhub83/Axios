"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import CartCount from "./CartCount";
import NavPanel from "./NavPanel";
import MobileNav from "./MobileNav";
import { navItems } from "@/lib/megaMenu";
import type { SafeUser } from "@/lib/auth";

function supportsHover() {
  return typeof window !== "undefined" && window.matchMedia("(hover: hover)").matches;
}

export default function Header({ user }: { user: SafeUser | null }) {
  const [hovered, setHovered] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  function reset() {
    setHovered(null);
    setMobileOpen(false);
  }

  function handleEnter(label: string) {
    if (!supportsHover()) return;
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setHovered(label);
  }

  function handleLeave() {
    if (!supportsHover()) return;
    closeTimer.current = setTimeout(() => setHovered(null), 150);
  }

  const activeItem = navItems.find((item) => item.label === hovered) ?? null;

  return (
    <header
      className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur"
      onMouseLeave={handleLeave}
    >
      <div className="mx-auto flex max-w-6xl items-center gap-6 px-4 py-5 sm:px-8">
        <div className="flex items-center gap-4">
          <Link href="/" className="font-serif text-xl tracking-[0.2em] uppercase" onClick={reset}>
            Axios
          </Link>
          <span
            aria-hidden
            className="hidden h-5 w-px bg-linear-to-b from-transparent via-accent/70 to-transparent lg:block"
          />
        </div>

        <nav aria-label="Main" className="hidden flex-1 items-center gap-7 lg:flex">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              onMouseEnter={() => handleEnter(item.label)}
              onClick={reset}
              className={`relative py-1 text-xs uppercase tracking-widest transition-colors hover:text-accent ${
                hovered === item.label ? "text-accent" : "text-foreground/80"
              }`}
            >
              {item.label}
              <span
                aria-hidden
                className={`pointer-events-none absolute inset-x-0 -bottom-[7px] h-[2px] origin-center rounded-full bg-accent shadow-[0_0_8px_1px_rgba(201,162,75,0.55)] transition-transform duration-200 ${
                  hovered === item.label ? "scale-x-100" : "scale-x-0"
                }`}
              />
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <Link
            href={user ? "/account" : "/login"}
            onClick={reset}
            aria-label="Account"
            className="hidden sm:flex items-center hover:text-accent transition-colors"
          >
            <svg
              aria-hidden
              viewBox="0 0 20 20"
              className="h-[18px] w-[18px]"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
            >
              <circle cx="10" cy="6.75" r="3.25" />
              <path d="M3.75 17c.9-3.2 3.3-4.75 6.25-4.75S15.35 13.8 16.25 17" strokeLinecap="round" />
            </svg>
          </Link>
          <Link
            href="/cart"
            onClick={reset}
            className="flex items-center gap-1 text-sm tracking-wide hover:text-accent transition-colors"
          >
            Cart
            <CartCount />
          </Link>
          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-border hover:border-accent transition-colors lg:hidden"
          >
            <span aria-hidden className="flex w-4 flex-col gap-[3px]">
              <span
                className={`h-px bg-foreground transition-transform ${mobileOpen ? "translate-y-[3.5px] rotate-45" : ""}`}
              />
              <span
                className={`h-px bg-foreground transition-transform ${mobileOpen ? "-translate-y-[3.5px] -rotate-45" : ""}`}
              />
            </span>
          </button>
        </div>
      </div>

      <NavPanel item={activeItem} visible={!!hovered} onNavigate={reset} />

      <div
        id="mobile-nav"
        className={`overflow-hidden border-t border-border bg-background transition-all duration-200 ease-out lg:hidden ${
          mobileOpen ? "max-h-[80vh] opacity-100" : "max-h-0 border-t-0 opacity-0"
        }`}
      >
        <MobileNav onNavigate={reset} user={user} />
      </div>
    </header>
  );
}
