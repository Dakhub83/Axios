import Link from "next/link";
import { navItems } from "@/lib/megaMenu";
import PaymentIcons from "./PaymentIcons";
import SocialLinks from "./SocialLinks";

type FooterLink = { label: string; href: string };

const companyLinks: FooterLink[] = [
  { label: "About Us", href: "/about" },
  { label: "How We Test", href: "/about#how-we-test" },
  { label: "Team Orders", href: "/team-orders" },
  { label: "Size Guide", href: "/size-guide" },
];

const supportLinks: FooterLink[] = [
  { label: "Contact Us", href: "/contact" },
  { label: "Shipping & Returns", href: "/shipping-returns" },
  { label: "FAQ", href: "/faq" },
  { label: "Return Policy", href: "/return-policy" },
  { label: "Return Item", href: "/return-item" },
];

const shopLinks: FooterLink[] = navItems.map((item) => ({
  label: item.label,
  href: item.href,
}));

const legalLinks: FooterLink[] = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms of Service", href: "/terms-of-service" },
];

function FooterColumn({ heading, links }: { heading: string; links: FooterLink[] }) {
  return (
    <div>
      <h3 className="mb-4 text-xs font-semibold uppercase tracking-widest text-foreground/50">{heading}</h3>
      <ul className="space-y-2.5">
        {links.map((link) => (
          <li key={link.label}>
            <Link href={link.href} className="text-sm text-foreground/70 hover:text-accent transition-colors">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="border-t border-border mt-16">
      <div className="max-w-6xl mx-auto px-4 py-14">
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-5">
          <div className="col-span-2 lg:col-span-1">
            <p className="font-serif text-lg tracking-[0.15em] uppercase">Axios</p>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-foreground/60">
              Family-tested performance gear, sewn and stress-tested at home before it reaches you.
            </p>
            <div className="mt-5">
              <SocialLinks />
            </div>
          </div>

          <FooterColumn heading="Company" links={companyLinks} />
          <FooterColumn heading="Support" links={supportLinks} />
          <FooterColumn heading="Shop" links={shopLinks} />
          <FooterColumn heading="Legal" links={legalLinks} />
        </div>

        <div className="mt-14 flex flex-col items-center gap-6 border-t border-border pt-8 lg:flex-row lg:items-end lg:justify-between">
          <p className="text-xs text-foreground/50">&copy; {new Date().getFullYear()} Axios. All rights reserved.</p>

          <div className="flex flex-col items-center gap-3 lg:items-end">
            <p className="text-[11px] uppercase tracking-widest text-foreground/50">Accepted Payments</p>
            <PaymentIcons />
          </div>
        </div>
      </div>
    </footer>
  );
}
