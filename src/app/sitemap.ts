import type { MetadataRoute } from "next";
import { listProducts } from "@/lib/products";
import { SITE_URL } from "@/lib/site";

const staticRoutes = [
  { path: "/", priority: 1, changeFrequency: "daily" as const },
  { path: "/shop", priority: 0.9, changeFrequency: "daily" as const },
  { path: "/about", priority: 0.5, changeFrequency: "monthly" as const },
  { path: "/faq", priority: 0.4, changeFrequency: "monthly" as const },
  { path: "/contact", priority: 0.4, changeFrequency: "monthly" as const },
  { path: "/size-guide", priority: 0.4, changeFrequency: "monthly" as const },
  { path: "/shipping-returns", priority: 0.4, changeFrequency: "monthly" as const },
  { path: "/return-policy", priority: 0.4, changeFrequency: "monthly" as const },
  { path: "/team-orders", priority: 0.4, changeFrequency: "monthly" as const },
  { path: "/production", priority: 0.3, changeFrequency: "monthly" as const },
  { path: "/sustainability", priority: 0.3, changeFrequency: "monthly" as const },
  { path: "/discounts", priority: 0.3, changeFrequency: "monthly" as const },
  { path: "/privacy-policy", priority: 0.2, changeFrequency: "yearly" as const },
  { path: "/terms-of-service", priority: 0.2, changeFrequency: "yearly" as const },
  { path: "/accessibility", priority: 0.2, changeFrequency: "yearly" as const },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const products = listProducts();

  const productEntries: MetadataRoute.Sitemap = products.map((p) => ({
    url: `${SITE_URL}/products/${p.slug}`,
    lastModified: p.updatedAt,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((r) => ({
    url: `${SITE_URL}${r.path}`,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));

  return [...staticEntries, ...productEntries];
}
