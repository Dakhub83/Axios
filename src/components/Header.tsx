import Link from "next/link";
import CartCount from "./CartCount";

export default function Header() {
  return (
    <header className="border-b border-border sticky top-0 z-40 bg-background/95 backdrop-blur">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between gap-6">
        <Link href="/" className="text-xl font-bold tracking-tight uppercase">
          Axios
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm">
          <Link href="/shop" className="hover:text-accent transition-colors">
            Shop
          </Link>
          <Link href="/about" className="hover:text-accent transition-colors">
            About Us
          </Link>
          <Link href="/size-guide" className="hover:text-accent transition-colors">
            Size Guide
          </Link>
          <Link href="/team-orders" className="hover:text-accent transition-colors">
            Team Orders
          </Link>
        </nav>
        <div className="flex items-center gap-4 text-sm">
          <Link href="/admin/products" className="hidden sm:inline hover:text-accent transition-colors">
            Admin
          </Link>
          <Link href="/cart" className="flex items-center gap-1 hover:text-accent transition-colors">
            Cart
            <CartCount />
          </Link>
        </div>
      </div>
    </header>
  );
}
