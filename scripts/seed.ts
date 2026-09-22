import { createProduct } from "../src/lib/products";

createProduct({
  title: "Pro-Flex Compression Leggings",
  category: "Leggings",
  price: 68,
  shortDescription:
    "Squat-proof compression built to hold its shape through your heaviest set and your hundredth wash. Flatlock seams sit off every friction zone. Tested for 30 days by our own family before it earned a place on this site.",
  isWearTested: true,
  badgeDescription:
    "This product completed our full 30-day internal testing cycle — worn by real members of our family through actual training sessions, washed 10+ times, and checked at three points for seam irritation, fabric recovery, and squat-proof opacity.",
  images: [],
  specs: [
    { label: "Fabric", value: "78% Nylon / 22% Spandex compression knit, 235 gsm" },
    { label: "Stretch & recovery", value: "4-way stretch, snaps back in under 2 seconds" },
    { label: "Moisture-wicking", value: "Inherent fiber-level wicking, wicks in under 5 seconds" },
    { label: "Opacity", value: "Squat-tested opaque at full stretch" },
    { label: "Seam construction", value: "Flatlock stitching throughout, zero exposed overlock seams" },
    { label: "Care", value: "Machine wash cold, no fabric softener, hang dry" },
  ],
  sizeRows: [
    { size: "XS", waist: "24-25", hip: "34-35", inseam: "27", fitNote: "Compression fit - true to size" },
    { size: "S", waist: "26-27", hip: "36-37", inseam: "27.5", fitNote: "Compression fit - true to size" },
    { size: "M", waist: "28-29", hip: "38-39", inseam: "28", fitNote: "Compression fit - true to size" },
    { size: "L", waist: "30-32", hip: "40-42", inseam: "28.5", fitNote: "Compression fit - true to size" },
    { size: "XL", waist: "33-35", hip: "43-45", inseam: "29", fitNote: "Compression fit - true to size" },
  ],
});

console.log("Seeded: Pro-Flex Compression Leggings (no image — upload one from /admin/products)");
