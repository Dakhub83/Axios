"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import CartCount from "./CartCount";
import NavDropdown from "./NavDropdown";
import type { SafeUser } from "@/lib/auth";

function supportsHover() {
  return typeof window !== "undefined" && window.matchMedia("(hover: hover)").matches;
}

export default function Header({ user }: { user: SafeUser | null }) {
  const [open, setOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  function close() {
    setOpen(false);
  }

  function handleMouseEnter() {
    if (!supportsHover()) return;
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpen(true);
  }

  function handleMouseLeave() {
    if (!supportsHover()) return;
    closeTimer.current = setTimeout(() => setOpen(false), 150);
  }

  return (
    <header
      className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur"
      onMouseLeave={handleMouseLeave}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-4 py-5 sm:px-8">
        <Link href="/" className="font-serif text-xl tracking-[0.2em] uppercase" onClick={close}>
          Axios
        </Link>

        <div className="flex items-center gap-4">
          <Link
            href={user ? "/account" : "/login"}
            onClick={close}
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
            onClick={close}
            className="flex items-center gap-1 text-sm tracking-wide hover:text-accent transition-colors"
          >
            Cart
            <CartCount />
          </Link>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            onMouseEnter={handleMouseEnter}
            aria-expanded={open}
            aria-controls="nav-dropdown"
            className="flex items-center gap-3 rounded-full border border-border pl-4 pr-3 py-2 text-sm tracking-widest uppercase hover:border-accent transition-colors"
          >
            {open ? "Close" : "Menu"}
            <span aria-hidden className="flex w-4 flex-col gap-[3px]">
              <span
                className={`h-px bg-foreground transition-transform ${open ? "translate-y-[3.5px] rotate-45" : ""}`}
              />
              <span
                className={`h-px bg-foreground transition-transform ${open ? "-translate-y-[3.5px] -rotate-45" : ""}`}
              />
            </span>
          </button>
        </div>
      </div>

      <NavDropdown id="nav-dropdown" open={open} onClose={close} user={user} />
    </header>
  );
}
