"use client";

import { useFavorites } from "./FavoritesContext";

export default function FavoriteButton({
  productId,
  size = "md",
}: {
  productId: string;
  size?: "sm" | "md";
}) {
  const { isFavorite, toggle } = useFavorites();
  const active = isFavorite(productId);
  const dimensions = size === "sm" ? "h-8 w-8" : "h-10 w-10";
  const iconSize = size === "sm" ? "h-4 w-4" : "h-[1.125rem] w-[1.125rem]";

  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggle(productId);
      }}
      aria-pressed={active}
      aria-label={active ? "Remove from favorites" : "Add to favorites"}
      className={`flex ${dimensions} items-center justify-center rounded-full border border-border bg-background/80 backdrop-blur-sm transition-colors hover:border-accent ${
        active ? "text-accent" : "text-foreground/70"
      }`}
    >
      <svg
        aria-hidden
        viewBox="0 0 20 18"
        className={iconSize}
        fill={active ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path
          d="M10 17S1.5 12 1.5 6.2C1.5 3.3 3.7 1.5 6.2 1.5c1.6 0 3.1.9 3.8 2.3.7-1.4 2.2-2.3 3.8-2.3 2.5 0 4.7 1.8 4.7 4.7C18.5 12 10 17 10 17z"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}
