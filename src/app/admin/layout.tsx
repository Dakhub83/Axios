import Link from "next/link";

export default function AdminLayout({ children }: LayoutProps<"/admin">) {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-xl font-bold">Admin</h1>
        <nav className="flex gap-4 text-sm">
          <Link href="/admin/products" className="hover:text-accent">
            Products
          </Link>
          <Link href="/admin/orders" className="hover:text-accent">
            Orders
          </Link>
          <Link href="/admin/team-orders" className="hover:text-accent">
            Team Inquiries
          </Link>
          <Link href="/admin/wear-tests" className="hover:text-accent">
            Wear Tests
          </Link>
          <Link href="/" className="hover:text-accent">
            View site
          </Link>
        </nav>
      </div>
      {children}
    </div>
  );
}
