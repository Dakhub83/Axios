"use client";

import { useState } from "react";
import Link from "next/link";
import CartCount from "./CartCount";
import NavDropdown from "./NavDropdown";

export default function Header() {
  const [open, setOpen] = useState(false);

  function close() {
    setOpen(false);
  }

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-4 py-5 sm:px-8">
        <Link href="/" className="font-serif text-xl tracking-[0.2em] uppercase" onClick={close}>
          Axios
        </Link>

        <div className="flex items-center gap-4">
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

      <NavDropdown id="nav-dropdown" open={open} onClose={close} />
    </header>
  );
}
