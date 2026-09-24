import Link from "next/link";
import type { MenuLink } from "@/lib/megaMenu";

export default function MegaPanelContent({
  links,
  onNavigate,
}: {
  links: MenuLink[];
  onNavigate?: () => void;
}) {
  return (
    <div className="w-full max-w-xs rounded-xl border border-border bg-muted p-3">
      <ul className="space-y-1">
        {links.map((link) => (
          <li key={link.label}>
            <Link
              href={link.href}
              onClick={onNavigate}
              className="block rounded-md px-3 py-2 text-sm hover:bg-background hover:text-accent transition-colors"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
