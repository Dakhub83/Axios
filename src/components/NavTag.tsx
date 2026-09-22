import type { MenuTag } from "@/lib/megaMenu";

export default function NavTag({ tag }: { tag: MenuTag }) {
  return (
    <span
      className={`ml-2 align-middle text-[10px] font-semibold uppercase tracking-wider ${
        tag === "New" ? "text-accent" : "text-tag-restocked"
      }`}
    >
      {tag}
    </span>
  );
}
