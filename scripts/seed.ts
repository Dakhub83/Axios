import { createProduct, createVariant, listVariantsForProduct, type ProductInput } from "../src/lib/products";
import { db } from "../src/lib/db";

// Deterministic so re-running the seed doesn't reshuffle stock levels.
function inventoryFor(seed: string): number {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) hash = (hash * 31 + seed.charCodeAt(i)) >>> 0;
  return (hash % 40) + 1; // 1..40
}

const BADGE =
  "This product completed our full 30-day internal testing cycle — worn by real members of our family through actual training sessions, washed 10+ times, and checked at three points for seam irritation, fabric recovery, and squat-proof opacity.";

type SeedProduct = Omit<ProductInput, "images" | "isWearTested" | "badgeDescription"> & {
  isWearTested?: boolean;
};

const bottomSizes = [
  { size: "XS", waist: "24-25", hip: "34-35", inseam: "27", fitNote: "Compression fit - true to size" },
  { size: "S", waist: "26-27", hip: "36-37", inseam: "27.5", fitNote: "Compression fit - true to size" },
  { size: "M", waist: "28-29", hip: "38-39", inseam: "28", fitNote: "Compression fit - true to size" },
  { size: "L", waist: "30-32", hip: "40-42", inseam: "28.5", fitNote: "Compression fit - true to size" },
  { size: "XL", waist: "33-35", hip: "43-45", inseam: "29", fitNote: "Compression fit - true to size" },
];

const topSizes = [
  { size: "XS", waist: "24-25", hip: "33-34", inseam: "-", fitNote: "Athletic fit - size up for relaxed" },
  { size: "S", waist: "26-27", hip: "35-36", inseam: "-", fitNote: "Athletic fit - size up for relaxed" },
  { size: "M", waist: "28-30", hip: "37-39", inseam: "-", fitNote: "Athletic fit - size up for relaxed" },
  { size: "L", waist: "31-33", hip: "40-42", inseam: "-", fitNote: "Athletic fit - size up for relaxed" },
  { size: "XL", waist: "34-36", hip: "43-45", inseam: "-", fitNote: "Athletic fit - size up for relaxed" },
];

const kidsSizes = [
  { size: "6-7Y", waist: "21-22", hip: "24-25", inseam: "17", fitNote: "Room to grow - true to age" },
  { size: "8-9Y", waist: "23-24", hip: "26-27", inseam: "19", fitNote: "Room to grow - true to age" },
  { size: "10-11Y", waist: "25-26", hip: "28-30", inseam: "21", fitNote: "Room to grow - true to age" },
  { size: "12-13Y", waist: "27-28", hip: "31-33", inseam: "23", fitNote: "Room to grow - true to age" },
];

const oneSize = [{ size: "One Size", waist: "-", hip: "-", inseam: "-", fitNote: "Fits most" }];

const products: SeedProduct[] = [
  // ---------- WOMEN ----------
  {
    title: "Pro-Flex Compression Leggings",
    category: "Leggings",
    department: "women",
    price: 68,
    shortDescription:
      "Squat-proof compression built to hold its shape through your heaviest set and your hundredth wash. Flatlock seams sit off every friction zone.",
    specs: [
      { label: "Fabric", value: "78% Nylon / 22% Spandex compression knit, 235 gsm" },
      { label: "Stretch & recovery", value: "4-way stretch, snaps back in under 2 seconds" },
      { label: "Opacity", value: "Squat-tested opaque at full stretch" },
      { label: "Seam construction", value: "Flatlock stitching throughout, zero exposed overlock seams" },
      { label: "Care", value: "Machine wash cold, no fabric softener, hang dry" },
    ],
    sizeRows: bottomSizes,
  },
  {
    title: "Contour High-Waisted Legging",
    category: "Leggings",
    department: "women",
    price: 74,
    shortDescription:
      "A 10.5\" waistband that stays put through burpees and deadlifts, with contoured seaming that follows the leg instead of fighting it.",
    specs: [
      { label: "Fabric", value: "72% Recycled Nylon / 28% Elastane, 250 gsm" },
      { label: "Rise", value: "10.5 inch high rise with internal drawcord" },
      { label: "Opacity", value: "Squat-tested opaque at full stretch" },
      { label: "Pockets", value: "Dual side drop-in pockets, phone-secure at a sprint" },
      { label: "Care", value: "Machine wash cold, hang dry" },
    ],
    sizeRows: bottomSizes,
  },
  {
    title: "Apex Seamless Sports Bra",
    category: "Sports Bras",
    department: "women",
    price: 48,
    shortDescription:
      "Medium-impact seamless knit with zoned compression through the band. No wires, no digging, no re-adjusting between sets.",
    specs: [
      { label: "Fabric", value: "80% Nylon / 20% Elastane seamless jacquard, 190 gsm" },
      { label: "Impact rating", value: "Medium - tested through box jumps and sprint intervals" },
      { label: "Construction", value: "Circular-knit seamless body, zero side seams" },
      { label: "Pads", value: "Removable moulded cups" },
      { label: "Care", value: "Machine wash cold, hang dry" },
    ],
    sizeRows: topSizes,
  },
  {
    title: "Form Long-Sleeve Crop",
    category: "Tops",
    department: "women",
    price: 54,
    shortDescription:
      "A lightweight training layer with thumbholes and a cropped hem that stays put when you reach overhead.",
    specs: [
      { label: "Fabric", value: "88% Polyester / 12% Elastane jersey, 155 gsm" },
      { label: "Moisture-wicking", value: "Inherent fiber-level wicking, wicks in under 5 seconds" },
      { label: "Details", value: "Thumbholes, flatlock shoulder seams" },
      { label: "Care", value: "Machine wash cold, tumble dry low" },
    ],
    sizeRows: topSizes,
  },
  {
    title: "Studio Oversized Hoodie",
    category: "Hoodies",
    department: "women",
    price: 88,
    shortDescription:
      "Brushed-back fleece cut deliberately oversized for the walk to the gym and the hour after training.",
    specs: [
      { label: "Fabric", value: "80% Cotton / 20% Recycled Polyester brushed fleece, 380 gsm" },
      { label: "Fit", value: "Oversized - size down for a standard fit" },
      { label: "Details", value: "Double-layer hood, kangaroo pocket, ribbed cuffs" },
      { label: "Care", value: "Machine wash cold, tumble dry low" },
    ],
    sizeRows: topSizes,
  },
  {
    title: "Airflow Running Short",
    category: "Shorts",
    department: "women",
    price: 52,
    shortDescription:
      "A 3\" split-hem running short with a bonded liner that does not ride, over a perforated back yoke for airflow.",
    specs: [
      { label: "Fabric", value: "100% Recycled Polyester ripstop, 95 gsm" },
      { label: "Inseam", value: "3 inch with split hem" },
      { label: "Liner", value: "Bonded brief liner, chafe-free at distance" },
      { label: "Care", value: "Machine wash cold, hang dry" },
    ],
    sizeRows: bottomSizes,
  },

  // ---------- MEN ----------
  {
    title: "Vector Training Tee",
    category: "Tops",
    department: "men",
    price: 42,
    shortDescription:
      "The everyday training tee, cut athletic through the chest with a dropped back hem that stays tucked when you hinge.",
    specs: [
      { label: "Fabric", value: "60% Combed Cotton / 40% Polyester, 175 gsm" },
      { label: "Moisture-wicking", value: "Wicks in under 5 seconds, dries in under 20 minutes" },
      { label: "Seam construction", value: "Flatlock shoulder and side seams" },
      { label: "Care", value: "Machine wash cold, tumble dry low" },
    ],
    sizeRows: topSizes,
  },
  {
    title: "Hex Gym Stringer",
    category: "Tanks",
    department: "men",
    price: 38,
    shortDescription:
      "A cut-away stringer with a deep armhole that clears the lat on every rep. Lightweight enough to forget you are wearing it.",
    specs: [
      { label: "Fabric", value: "92% Cotton / 8% Elastane rib knit, 160 gsm" },
      { label: "Armhole", value: "Deep cut-away, full lat clearance" },
      { label: "Seam construction", value: "Bound armholes, no raw edges" },
      { label: "Care", value: "Machine wash cold, hang dry" },
    ],
    sizeRows: topSizes,
  },
  {
    title: "Range 7\" Training Short",
    category: "Shorts",
    department: "men",
    price: 58,
    shortDescription:
      "A 7\" four-way stretch short built for lifting and conditioning in the same session. Zip pocket holds a phone through sprints.",
    specs: [
      { label: "Fabric", value: "87% Nylon / 13% Elastane woven stretch, 165 gsm" },
      { label: "Inseam", value: "7 inch" },
      { label: "Pockets", value: "Two hand pockets plus zip back pocket" },
      { label: "Care", value: "Machine wash cold, hang dry" },
    ],
    sizeRows: bottomSizes,
  },
  {
    title: "Tempo Tapered Jogger",
    category: "Joggers",
    department: "men",
    price: 78,
    shortDescription:
      "Tapered through the calf with an articulated knee, so it moves for warm-ups and still reads clean on the street.",
    specs: [
      { label: "Fabric", value: "94% Polyester / 6% Elastane double-knit, 280 gsm" },
      { label: "Fit", value: "Tapered with articulated knee panels" },
      { label: "Details", value: "Zip ankle cuffs, drawcord waist, zip side pockets" },
      { label: "Care", value: "Machine wash cold, tumble dry low" },
    ],
    sizeRows: bottomSizes,
  },
  {
    title: "Shield Weather Jacket",
    category: "Jackets",
    department: "men",
    price: 145,
    shortDescription:
      "A packable wind and water-resistant shell for training through weather that would otherwise cancel the session.",
    specs: [
      { label: "Fabric", value: "100% Recycled Nylon ripstop with DWR finish, 60 gsm" },
      { label: "Weather rating", value: "Wind-blocking, water-resistant to sustained light rain" },
      { label: "Seam construction", value: "Fully taped seams" },
      { label: "Details", value: "Packs into its own chest pocket, elastic storm cuffs" },
      { label: "Care", value: "Machine wash cold, tumble dry low to reactivate DWR" },
    ],
    sizeRows: topSizes,
  },
  {
    title: "Core Thermal Base Layer",
    category: "Base Layers",
    department: "men",
    price: 64,
    shortDescription:
      "A next-to-skin thermal layer with grid-backed fleece that traps heat without trapping sweat.",
    specs: [
      { label: "Fabric", value: "85% Polyester / 15% Elastane grid fleece, 200 gsm" },
      { label: "Thermal rating", value: "Rated to 5°C as a single layer in motion" },
      { label: "Construction", value: "Grid-back knit for heat retention with airflow channels" },
      { label: "Care", value: "Machine wash cold, hang dry" },
    ],
    sizeRows: topSizes,
  },

  // ---------- KIDS ----------
  {
    title: "Junior Training Tee",
    category: "Tops",
    department: "kids",
    price: 28,
    shortDescription:
      "A durable everyday training tee that survives practice, the wash, and being handed down to a sibling.",
    specs: [
      { label: "Fabric", value: "65% Cotton / 35% Recycled Polyester, 170 gsm" },
      { label: "Durability", value: "Reinforced shoulder seams, tested to 40 wash cycles" },
      { label: "Care", value: "Machine wash warm, tumble dry low" },
    ],
    sizeRows: kidsSizes,
  },
  {
    title: "Junior Everyday Short",
    category: "Shorts",
    department: "kids",
    price: 30,
    shortDescription:
      "An elastic-waist training short with deep pockets, built for practice and everything after it.",
    specs: [
      { label: "Fabric", value: "100% Recycled Polyester woven, 130 gsm" },
      { label: "Waist", value: "Elastic waistband with internal drawcord" },
      { label: "Care", value: "Machine wash warm, tumble dry low" },
    ],
    sizeRows: kidsSizes,
  },
  {
    title: "Junior Stretch Legging",
    category: "Leggings",
    department: "kids",
    price: 32,
    shortDescription:
      "A four-way stretch legging that keeps its shape through gymnastics, football practice, and the school run.",
    specs: [
      { label: "Fabric", value: "80% Nylon / 20% Elastane knit, 210 gsm" },
      { label: "Stretch & recovery", value: "4-way stretch, holds shape after 40 washes" },
      { label: "Care", value: "Machine wash cold, hang dry" },
    ],
    sizeRows: kidsSizes,
  },
  {
    title: "Junior Fleece Hoodie",
    category: "Hoodies",
    department: "kids",
    price: 52,
    shortDescription:
      "A brushed fleece hoodie warm enough for touchline mornings, cut with room to move.",
    specs: [
      { label: "Fabric", value: "75% Cotton / 25% Polyester brushed fleece, 330 gsm" },
      { label: "Details", value: "Kangaroo pocket, ribbed cuffs and hem" },
      { label: "Care", value: "Machine wash warm, tumble dry low" },
    ],
    sizeRows: kidsSizes,
  },
  {
    title: "Junior Weatherproof Jacket",
    category: "Jackets",
    department: "kids",
    price: 68,
    shortDescription:
      "A lightweight water-resistant shell that packs into a bag and handles a wet touchline without the bulk.",
    specs: [
      { label: "Fabric", value: "100% Recycled Nylon with DWR finish, 70 gsm" },
      { label: "Weather rating", value: "Wind-blocking, water-resistant to light rain" },
      { label: "Details", value: "Adjustable hood, elastic cuffs, reflective back hit" },
      { label: "Care", value: "Machine wash cold, tumble dry low" },
    ],
    sizeRows: kidsSizes,
  },

  // ---------- UNISEX ----------
  {
    title: "Grip Training Sock 3-Pack",
    category: "Accessories",
    department: "unisex",
    price: 22,
    shortDescription:
      "Silicone-gripped crew socks with a cushioned footbed, for lifting platforms and studio floors alike.",
    isWearTested: false,
    specs: [
      { label: "Fabric", value: "76% Combed Cotton / 20% Polyamide / 4% Elastane" },
      { label: "Grip", value: "Silicone dot sole, tested on rubber and hardwood" },
      { label: "Pack", value: "Three pairs - obsidian, ash, bone" },
      { label: "Care", value: "Machine wash warm, tumble dry low" },
    ],
    sizeRows: oneSize,
  },
  {
    title: "Flatlock Gym Towel",
    category: "Accessories",
    department: "unisex",
    price: 18,
    shortDescription:
      "A fast-drying microfibre towel with a corner loop, sized to cover a bench without pooling on the floor.",
    isWearTested: false,
    specs: [
      { label: "Fabric", value: "85% Polyester / 15% Polyamide microfibre, 300 gsm" },
      { label: "Dimensions", value: "100 x 40 cm" },
      { label: "Dry time", value: "Air-dries in under 30 minutes" },
      { label: "Care", value: "Machine wash warm, no fabric softener" },
    ],
    sizeRows: oneSize,
  },
];

function slugify(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

let created = 0;
let patched = 0;

let stocked = 0;

for (const p of products) {
  const slug = slugify(p.title);
  const existing = db.prepare("SELECT id FROM products WHERE slug = ?").get(slug) as { id: string } | undefined;

  let productId: string;

  if (existing) {
    // Keep any uploaded images and edits; just make sure it is filed correctly.
    db.prepare("UPDATE products SET department = ?, category = ? WHERE id = ?").run(
      p.department ?? "unisex",
      p.category,
      existing.id
    );
    patched += 1;
    productId = existing.id;
  } else {
    const product = createProduct({
      ...p,
      isWearTested: p.isWearTested ?? true,
      badgeDescription: p.isWearTested === false ? "" : BADGE,
      images: [],
    });
    created += 1;
    productId = product.id;
  }

  // Back-fill one stock-keeping variant per size so the product page can show
  // a real "low stock" / "out of stock" state instead of a fabricated one.
  if (listVariantsForProduct(productId).length === 0) {
    for (const row of p.sizeRows) {
      createVariant({
        productId,
        color: "Default",
        size: row.size,
        sku: `${slug}-${row.size}`.toUpperCase().replace(/[^A-Z0-9]+/g, "-"),
        inventoryCount: inventoryFor(`${slug}-${row.size}`),
      });
    }
    stocked += 1;
  }
}

const counts = db
  .prepare("SELECT department, COUNT(*) AS n FROM products GROUP BY department ORDER BY department")
  .all() as { department: string; n: number }[];

console.log(`Seeded ${created} new products, refiled ${patched} existing, stocked ${stocked} with variants.`);
for (const c of counts) console.log(`  ${c.department}: ${c.n}`);
console.log("Images are empty — upload them from /admin/products.");
