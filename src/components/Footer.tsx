import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-border mt-16">
      <div className="max-w-6xl mx-auto px-4 py-10 text-sm text-foreground/70 flex flex-col sm:flex-row justify-between gap-4">
        <p>Axios &mdash; family-tested performance gear.</p>
        <nav className="flex flex-wrap gap-4">
          <Link href="/about" className="hover:text-accent transition-colors">
            About Us
          </Link>
          <Link href="/size-guide" className="hover:text-accent transition-colors">
            Size Guide
          </Link>
          <Link href="/team-orders" className="hover:text-accent transition-colors">
            Team Orders
          </Link>
          <Link href="/admin/products" className="hover:text-accent transition-colors">
            Admin
          </Link>
        </nav>
      </div>
    </footer>
  );
}
