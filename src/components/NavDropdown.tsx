"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { navItems } from "@/lib/megaMenu";
import MegaPanelContent from "./MegaPanelContent";
import MobileNav from "./MobileNav";

const defaultActiveLabel = navItems.find((item) => item.mega)?.label ?? navItems[0].label;

export default function NavDropdown({
  id,
  open,
  onClose,
}: {
  id: string;
  open: boolean;
  onClose: () => void;
}) {
  const [activeLabel, setActiveLabel] = useState(defaultActiveLabel);
  const [prevOpen, setPrevOpen] = useState(open);
  const panelRef = useRef<HTMLDivElement>(null);

  if (open !== prevOpen) {
    setPrevOpen(open);
    if (open) setActiveLabel(defaultActiveLabel);
  }

  useEffect(() => {
    if (!open) return;

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    function onClickOutside(e: MouseEvent) {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        onClose();
      }
    }
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("mousedown", onClickOutside);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("mousedown", onClickOutside);
    };
  }, [open, onClose]);

  const activeItem = navItems.find((item) => item.label === activeLabel);

  return (
    <div
      id={id}
      ref={panelRef}
      role="region"
      aria-label="Site navigation"
      className={`absolute inset-x-0 top-full z-40 max-h-[calc(100vh-72px)] overflow-y-auto border-b border-border bg-background shadow-2xl shadow-black/40 transition-all duration-200 ease-out ${
        open ? "visible translate-y-0 opacity-100" : "invisible -translate-y-2 opacity-0 pointer-events-none"
      }`}
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 py-10 sm:px-8 lg:flex-row lg:items-start">
        <nav aria-label="Main" className="hidden lg:block lg:w-[30%] lg:shrink-0">
          <ul className="space-y-1">
            {navItems.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  onClick={onClose}
                  onMouseEnter={() => setActiveLabel(item.label)}
                  onFocus={() => setActiveLabel(item.label)}
                  className={`block font-serif text-2xl transition-colors ${
                    activeLabel === item.label ? "text-accent" : "text-foreground/70 hover:text-foreground"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden lg:flex lg:flex-1">
          {activeItem?.mega ? (
            <MegaPanelContent mega={activeItem.mega} onNavigate={onClose} />
          ) : (
            <p className="text-sm text-foreground/50">Fresh drops, updated weekly.</p>
          )}
        </div>

        <div className="lg:hidden">
          <MobileNav onNavigate={onClose} />
        </div>
      </div>
    </div>
  );
}
