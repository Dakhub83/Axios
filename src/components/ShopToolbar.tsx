"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

const sortOptions = [
  { value: "newest", label: "Newest" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "name-asc", label: "Name: A to Z" },
];

export default function ShopToolbar({ count }: { count: number }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const sort = searchParams.get("sort") || "newest";

  function handleSortChange(value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value === "newest") params.delete("sort");
    else params.set("sort", value);
    const query = params.toString();
    router.push(query ? `${pathname}?${query}` : pathname);
  }

  return (
    <div className="flex flex-wrap items-center justify-between gap-4 border-y border-border py-4">
      <p className="text-xs uppercase tracking-widest text-foreground/60">
        {count} {count === 1 ? "item" : "items"}
      </p>
      <label className="flex items-center gap-3 text-xs uppercase tracking-widest text-foreground/60">
        Sort by
        <select
          value={sort}
          onChange={(e) => handleSortChange(e.target.value)}
          className="rounded-full border border-border bg-background px-3 py-1.5 text-foreground transition-colors focus:border-accent focus:outline-none"
        >
          {sortOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}
