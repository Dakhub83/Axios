export type MenuLink = {
  label: string;
  href: string;
};

export type NavItem = {
  label: string;
  href: string;
  links?: MenuLink[];
  proof?: string;
};

// Every entry points at a filter that returns real products. Add a link when
// the product exists, not before — an empty category reads as a broken store.
export const navItems: NavItem[] = [
  {
    label: "New In",
    href: "/shop?sort=new",
    proof: "Nothing ships until it's hand-tested at home.",
  },
  {
    label: "Women",
    href: "/shop?department=women",
    proof: "Tested through 200 squats — zero see-through.",
    links: [
      { label: "Leggings", href: "/shop?department=women&category=Leggings" },
      { label: "Sports Bras", href: "/shop?department=women&category=Sports%20Bras" },
      { label: "Tops", href: "/shop?department=women&category=Tops" },
      { label: "Shorts", href: "/shop?department=women&category=Shorts" },
      { label: "Hoodies", href: "/shop?department=women&category=Hoodies" },
    ],
  },
  {
    label: "Men",
    href: "/shop?department=men",
    proof: "Flatlock seams. Zero chafe, mile six.",
    links: [
      { label: "Tops", href: "/shop?department=men&category=Tops" },
      { label: "Tanks & Stringers", href: "/shop?department=men&category=Tanks" },
      { label: "Shorts", href: "/shop?department=men&category=Shorts" },
      { label: "Joggers", href: "/shop?department=men&category=Joggers" },
      { label: "Base Layers", href: "/shop?department=men&category=Base%20Layers" },
      { label: "Jackets", href: "/shop?department=men&category=Jackets" },
    ],
  },
  {
    label: "Kids",
    href: "/shop?department=kids",
    proof: "Same 30-day wear test, sized for growing kids.",
    links: [
      { label: "Tops", href: "/shop?department=kids&category=Tops" },
      { label: "Shorts", href: "/shop?department=kids&category=Shorts" },
      { label: "Leggings", href: "/shop?department=kids&category=Leggings" },
      { label: "Hoodies", href: "/shop?department=kids&category=Hoodies" },
      { label: "Jackets", href: "/shop?department=kids&category=Jackets" },
    ],
  },
  {
    label: "Accessories",
    href: "/shop?category=Accessories",
    proof: "Built to outlast the kit it rides with.",
  },
];

export function slugify(label: string) {
  return label.toLowerCase().replace(/[^a-z0-9]+/g, "-");
}
