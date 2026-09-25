"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

export default function SearchBar({ onSearch }: { onSearch: () => void }) {
  const router = useRouter();
  const [value, setValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const q = value.trim();
    router.push(q ? `/shop?q=${encodeURIComponent(q)}` : "/shop");
    onSearch();
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-4 sm:px-8">
      <svg
        aria-hidden
        viewBox="0 0 20 20"
        className="h-[18px] w-[18px] shrink-0 text-foreground/50"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
      >
        <circle cx="8.5" cy="8.5" r="6" />
        <path d="M17 17l-4-4" strokeLinecap="round" />
      </svg>
      <input
        ref={inputRef}
        type="search"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Search products…"
        className="flex-1 bg-transparent font-serif text-lg outline-none placeholder:text-foreground/40"
      />
      <button
        type="submit"
        className="shrink-0 rounded-full border border-accent px-5 py-1.5 text-xs uppercase tracking-widest text-accent transition-colors hover:bg-accent hover:text-accent-ink"
      >
        Search
      </button>
    </form>
  );
}
