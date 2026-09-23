import Link from "next/link";

export default function HelpMenu() {
  return (
    <div tabIndex={0} className="group relative hidden sm:block">
      <span className="text-sm tracking-wide hover:text-accent transition-colors cursor-default">
        Help
      </span>
      <div
        className="invisible absolute right-0 top-full z-50 w-48 pt-2 opacity-0 transition-opacity
          group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100"
      >
        <div className="rounded-lg border border-border bg-background p-2 shadow-2xl shadow-black/40">
          <Link
            href="/return-policy"
            className="block rounded px-3 py-2 text-sm hover:bg-muted hover:text-accent transition-colors"
          >
            Return Policy
          </Link>
          <Link
            href="/return-item"
            className="block rounded px-3 py-2 text-sm hover:bg-muted hover:text-accent transition-colors"
          >
            Return Item
          </Link>
        </div>
      </div>
    </div>
  );
}
