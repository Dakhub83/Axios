"use client";

import { useState } from "react";
import Image from "next/image";
import type { ProductImage } from "@/lib/types";

export default function ProductGallery({ images, title }: { images: ProductImage[]; title: string }) {
  const [active, setActive] = useState(0);
  const current = images[active];

  return (
    <div>
      <div className="relative aspect-square bg-muted rounded-lg overflow-hidden">
        {current ? (
          <Image src={current.url} alt={current.altText || title} fill className="object-cover" priority />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-foreground/40 text-sm">
            No image uploaded yet
          </div>
        )}
      </div>
      {images.length > 1 && (
        <div className="mt-3 grid grid-cols-5 gap-2">
          {images.map((img, i) => (
            <button
              key={img.id}
              type="button"
              onClick={() => setActive(i)}
              className={`relative aspect-square rounded overflow-hidden border ${
                i === active ? "border-accent" : "border-border"
              }`}
            >
              <Image src={img.url} alt={img.altText || title} fill className="object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
