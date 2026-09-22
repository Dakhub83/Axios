export type MenuTag = "New" | "Restocked";

export type MenuLink = {
  label: string;
  href: string;
  tag?: MenuTag;
  children?: MenuLink[];
};

export type MegaMenuColumn = {
  heading: string;
  links: MenuLink[];
};

export type MegaMenuBanner = {
  title: string;
  subtitle: string;
  href: string;
  cta: string;
};

export type FeatureCard = {
  name: string;
  description: string;
  href: string;
  tag?: MenuTag;
};

export type MegaMenu =
  | { layout: "columns"; columns: MegaMenuColumn[]; banner: MegaMenuBanner }
  | { layout: "list"; links: MenuLink[] }
  | { layout: "features"; features: FeatureCard[] };

export type NavItem = {
  label: string;
  href: string;
  mega?: MegaMenu;
};

export const navItems: NavItem[] = [
  {
    label: "New In",
    href: "/shop?sort=new",
  },
  {
    label: "Women",
    href: "/shop?category=women",
    mega: {
      layout: "columns",
      columns: [
        {
          heading: "Product Type",
          links: [
            {
              label: "Sports Bras",
              href: "/shop?category=womens-sports-bras",
              children: [
                { label: "Low Impact", href: "/shop?category=womens-sports-bras&impact=low" },
                { label: "Medium Impact", href: "/shop?category=womens-sports-bras&impact=medium" },
                { label: "High Impact", href: "/shop?category=womens-sports-bras&impact=high", tag: "New" },
              ],
            },
            { label: "Tops", href: "/shop?category=womens-tops" },
            { label: "Bottoms", href: "/shop?category=womens-bottoms" },
            { label: "One-Pieces", href: "/shop?category=womens-one-pieces" },
            { label: "Outerwear", href: "/shop?category=womens-outerwear" },
          ],
        },
        {
          heading: "Fit & Style",
          links: [
            { label: "High-Waisted", href: "/shop?fit=high-waisted&category=women" },
            { label: "Seamless", href: "/shop?fit=seamless&category=women", tag: "Restocked" },
            { label: "Oversized", href: "/shop?fit=oversized&category=women" },
          ],
        },
      ],
      banner: {
        title: "The Sculpt & Lift Set",
        subtitle: "Engineered compression meets second-skin comfort.",
        href: "/shop?collection=sculpt-and-lift",
        cta: "Shop the Set",
      },
    },
  },
  {
    label: "Men",
    href: "/shop?category=men",
    mega: {
      layout: "columns",
      columns: [
        {
          heading: "Product Type",
          links: [
            { label: "Gym Stringers", href: "/shop?category=mens-stringers", tag: "New" },
            { label: "Drop-Arm Tanks", href: "/shop?category=mens-drop-arm-tanks" },
            { label: "Tees", href: "/shop?category=mens-tees" },
            { label: '5" Shorts', href: "/shop?category=mens-shorts-5in" },
            { label: "Joggers", href: "/shop?category=mens-joggers", tag: "Restocked" },
            { label: "Base Layers", href: "/shop?category=mens-base-layers" },
          ],
        },
        {
          heading: "Fit & Style",
          links: [
            { label: "Oversized Pump Covers", href: "/shop?fit=oversized-pump-covers" },
            { label: "Aero-Dry", href: "/shop?fit=aero-dry&category=men" },
            { label: "Heavyweight Fleece", href: "/shop?fit=heavyweight-fleece" },
          ],
        },
      ],
      banner: {
        title: "The Core Drop",
        subtitle: "Stringers and shorts built for the last rep.",
        href: "/shop?collection=core-drop",
        cta: "Shop the Drop",
      },
    },
  },
  {
    label: "Kids",
    href: "/shop?category=kids",
    mega: {
      layout: "columns",
      columns: [
        {
          heading: "Product Type",
          links: [
            { label: "Tees", href: "/shop?category=kids-tees" },
            { label: "Shorts", href: "/shop?category=kids-shorts" },
            { label: "Leggings", href: "/shop?category=kids-leggings" },
            { label: "Hoodies", href: "/shop?category=kids-hoodies", tag: "New" },
            { label: "Base Layers", href: "/shop?category=kids-base-layers" },
          ],
        },
        {
          heading: "Fit & Style",
          links: [
            { label: "Everyday Stretch", href: "/shop?fit=everyday-stretch&category=kids" },
            { label: "Seamless", href: "/shop?fit=seamless&category=kids", tag: "Restocked" },
            { label: "Weatherproof", href: "/shop?fit=weatherproof&category=kids" },
          ],
        },
      ],
      banner: {
        title: "The Junior Training Kit",
        subtitle: "Durable, easy-care performance gear sized for growing athletes.",
        href: "/shop?collection=junior-training-kit",
        cta: "Shop the Kit",
      },
    },
  },
  {
    label: "Collections",
    href: "/shop?view=collections",
    mega: {
      layout: "list",
      links: [
        { label: "The Seamless Edit", href: "/shop?collection=seamless-edit" },
        { label: "The Off-Duty Line", href: "/shop?collection=off-duty-line" },
        { label: "The High-Velocity Drop", href: "/shop?collection=high-velocity-drop", tag: "New" },
        { label: "Blackout Series", href: "/shop?collection=blackout-series", tag: "Restocked" },
      ],
    },
  },
  {
    label: "Fabric & Innovation",
    href: "/shop?view=fabric",
    mega: {
      layout: "features",
      features: [
        {
          name: "AeroWeave",
          description: "Engineered mesh that vents heat exactly where you sweat the most.",
          href: "/fabric/aeroweave",
        },
        {
          name: "FlexArmor",
          description: "Reinforced fibers that shrug off barbell, rig, and rack friction.",
          href: "/fabric/flexarmor",
          tag: "New",
        },
        {
          name: "CloudKnit",
          description: "A brushed, buttery-soft knit built for studio and recovery days.",
          href: "/fabric/cloudknit",
        },
        {
          name: "ShieldTech",
          description: "A weatherproof shell that blocks wind and rain without the bulk.",
          href: "/fabric/shieldtech",
        },
      ],
    },
  },
];

export function slugify(label: string) {
  return label.toLowerCase().replace(/[^a-z0-9]+/g, "-");
}
