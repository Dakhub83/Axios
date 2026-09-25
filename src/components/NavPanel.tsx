import Link from "next/link";
import type { NavItem } from "@/lib/megaMenu";

export default function NavPanel({
  item,
  visible,
  onNavigate,
}: {
  item: NavItem | null;
  visible: boolean;
  onNavigate: () => void;
}) {
  const show = visible && !!item && (!!item.links?.length || !!item.proof);

  return (
    <div
      className={`absolute inset-x-0 top-full z-40 hidden border-t border-border bg-background shadow-2xl shadow-black/40 transition-all duration-150 ease-out lg:block ${
        show ? "visible translate-y-0 opacity-100" : "invisible -translate-y-1 opacity-0 pointer-events-none"
      }`}
    >
      {item && (
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-6 px-4 py-6 sm:px-8">
          {item.links && item.links.length > 0 ? (
            <ul className="flex flex-wrap gap-x-8 gap-y-2">
              {item.links.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    onClick={onNavigate}
                    className="text-sm text-foreground/70 transition-colors hover:text-accent"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <span />
          )}
          {item.proof && (
            <p className="shrink-0 font-serif text-sm italic text-foreground/80">{item.proof}</p>
          )}
        </div>
      )}
    </div>
  );
}
