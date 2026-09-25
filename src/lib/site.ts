// Set NEXT_PUBLIC_SITE_URL in production (Vercel/host env vars) to the real
// domain — metadata, the sitemap, and robots.txt all resolve from this.
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
export const SITE_NAME = "Axios";
export const SITE_DESCRIPTION =
  "Gym wear and footwear designed and wear-tested at home before it ever reaches you.";
