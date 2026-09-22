import Link from "next/link";
import type { MegaMenu } from "@/lib/megaMenu";
import NavTag from "./NavTag";

export default function MegaPanelContent({
  mega,
  onNavigate,
}: {
  mega: MegaMenu;
  onNavigate?: () => void;
}) {
  if (mega.layout === "columns") {
    return (
      <div className="flex w-full max-w-2xl divide-x divide-border overflow-hidden rounded-xl border border-border bg-muted">
        {mega.columns.map((col) => (
          <div key={col.heading} className="flex-1 p-6">
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-widest text-foreground/50">
              {col.heading}
            </h3>
            <ul className="space-y-3">
              {col.links.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    onClick={onNavigate}
                    className="text-sm hover:text-accent transition-colors"
                  >
                    {link.label}
                    {link.tag && <NavTag tag={link.tag} />}
                  </Link>
                  {link.children && (
                    <ul className="mt-2 ml-3 space-y-2 border-l border-border pl-3">
                      {link.children.map((child) => (
                        <li key={child.label}>
                          <Link
                            href={child.href}
                            onClick={onNavigate}
                            className="text-xs text-foreground/70 hover:text-accent transition-colors"
                          >
                            {child.label}
                            {child.tag && <NavTag tag={child.tag} />}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
        <Link
          href={mega.banner.href}
          onClick={onNavigate}
          className="group relative flex min-w-55 flex-1 flex-col justify-end overflow-hidden bg-linear-to-br from-background via-background to-muted p-6"
        >
          <div
            aria-hidden
            className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(201,162,75,0.16),transparent_60%)]"
          />
          <span className="relative text-[10px] uppercase tracking-widest text-foreground/50">Featured</span>
          <h3 className="relative mt-1 font-serif text-xl group-hover:text-accent transition-colors">
            {mega.banner.title}
          </h3>
          <p className="relative mt-1 text-xs text-foreground/60">{mega.banner.subtitle}</p>
          <span className="relative mt-3 inline-flex items-center gap-1 text-xs uppercase tracking-wider text-accent">
            {mega.banner.cta}
            <span aria-hidden>&rarr;</span>
          </span>
        </Link>
      </div>
    );
  }

  if (mega.layout === "list") {
    return (
      <div className="w-full max-w-xs rounded-xl border border-border bg-muted p-3">
        <ul className="space-y-1">
          {mega.links.map((link) => (
            <li key={link.label}>
              <Link
                href={link.href}
                onClick={onNavigate}
                className="block rounded-md px-3 py-2 text-sm hover:bg-background hover:text-accent transition-colors"
              >
                {link.label}
                {link.tag && <NavTag tag={link.tag} />}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <div className="grid w-full max-w-2xl grid-cols-1 gap-px overflow-hidden rounded-xl bg-border sm:grid-cols-2">
      {mega.features.map((feature) => (
        <Link
          key={feature.name}
          href={feature.href}
          onClick={onNavigate}
          className="bg-muted p-5 hover:bg-background transition-colors"
        >
          <span className="font-serif text-base">
            {feature.name}
            {feature.tag && <NavTag tag={feature.tag} />}
          </span>
          <p className="mt-1 text-xs leading-relaxed text-foreground/60">{feature.description}</p>
        </Link>
      ))}
    </div>
  );
}
