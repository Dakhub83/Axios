import type { Metadata } from "next";
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/components/CartContext";
import { FavoritesProvider } from "@/components/FavoritesContext";
import PromoBar from "@/components/PromoBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getCurrentUser } from "@/lib/auth";
import { SITE_URL, SITE_NAME, SITE_DESCRIPTION } from "@/lib/site";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — Family-Tested Performance Gear`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    title: `${SITE_NAME} — Family-Tested Performance Gear`,
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} — Family-Tested Performance Gear`,
    description: SITE_DESCRIPTION,
  },
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const user = await getCurrentUser();

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <CartProvider>
          <FavoritesProvider>
            <PromoBar />
            <Header user={user} />
            <main className="flex-1">{children}</main>
            <Footer />
          </FavoritesProvider>
        </CartProvider>
      </body>
    </html>
  );
}
