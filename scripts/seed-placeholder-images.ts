// One-off dev utility: generates simple gradient PNGs (no real photography,
// no new dependencies — hand-rolled PNG encoder) and attaches one to every
// product that has none, purely so product pages/cards/galleries can be
// reviewed with real image files in place. Replace via /admin/products
// whenever actual product photography exists — these are not meant to ship.
import { mkdirSync, writeFileSync } from "fs";
import path from "path";
import { deflateSync } from "zlib";
import { listProducts, updateProduct, type ProductInput } from "../src/lib/products";

const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads");

const CRC_TABLE = (() => {
  const table: number[] = [];
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    table[n] = c;
  }
  return table;
})();

function crc32(buf: Buffer): number {
  let c = 0xffffffff;
  for (let i = 0; i < buf.length; i++) c = CRC_TABLE[(c ^ buf[i]) & 0xff] ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
}

function chunk(type: string, data: Buffer): Buffer {
  const typeBuf = Buffer.from(type, "ascii");
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length);
  const crcBuf = Buffer.alloc(4);
  crcBuf.writeUInt32BE(crc32(Buffer.concat([typeBuf, data])));
  return Buffer.concat([len, typeBuf, data, crcBuf]);
}

type RGB = [number, number, number];

function gradientPng(width: number, height: number, from: RGB, to: RGB): Buffer {
  const sig = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
  const ihdrData = Buffer.alloc(13);
  ihdrData.writeUInt32BE(width, 0);
  ihdrData.writeUInt32BE(height, 4);
  ihdrData[8] = 8; // bit depth
  ihdrData[9] = 2; // color type: RGB
  const ihdr = chunk("IHDR", ihdrData);

  const raw = Buffer.alloc(height * (1 + width * 3));
  let offset = 0;
  for (let y = 0; y < height; y++) {
    raw[offset++] = 0; // filter: none
    for (let x = 0; x < width; x++) {
      // Diagonal gradient, top-left to bottom-right.
      const t = (x / width + y / height) / 2;
      raw[offset++] = Math.round(from[0] + (to[0] - from[0]) * t);
      raw[offset++] = Math.round(from[1] + (to[1] - from[1]) * t);
      raw[offset++] = Math.round(from[2] + (to[2] - from[2]) * t);
    }
  }
  const idat = chunk("IDAT", deflateSync(raw));
  const iend = chunk("IEND", Buffer.alloc(0));
  return Buffer.concat([sig, ihdr, idat, iend]);
}

const PALETTES: Record<string, [RGB, RGB]> = {
  women: [
    [58, 31, 43],
    [201, 138, 125],
  ],
  men: [
    [26, 28, 34],
    [76, 97, 120],
  ],
  kids: [
    [18, 51, 49],
    [111, 174, 156],
  ],
  unisex: [
    [34, 31, 26],
    [201, 162, 75],
  ],
};

function slugify(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

mkdirSync(UPLOAD_DIR, { recursive: true });

const products = listProducts();
let attached = 0;

for (const product of products) {
  if (product.images.length > 0) continue;

  const [from, to] = PALETTES[product.department] ?? PALETTES.unisex;
  const png = gradientPng(900, 1125, from, to);
  const filename = `placeholder-${slugify(product.title)}.png`;
  writeFileSync(path.join(UPLOAD_DIR, filename), png);

  const input: ProductInput = {
    title: product.title,
    category: product.category,
    department: product.department,
    categoryId: product.categoryId,
    price: product.price,
    shortDescription: product.shortDescription,
    isWearTested: product.isWearTested,
    badgeDescription: product.badgeDescription,
    attributes: product.attributes,
    images: [{ url: `/uploads/${filename}`, altText: `${product.title} — placeholder test image` }],
    specs: product.specs.map((s) => ({ label: s.label, value: s.value })),
    sizeRows: product.sizeRows.map((r) => ({
      size: r.size,
      waist: r.waist,
      hip: r.hip,
      inseam: r.inseam,
      fitNote: r.fitNote,
    })),
  };

  updateProduct(product.id, input);
  attached += 1;
}

console.log(`Attached placeholder images to ${attached} product(s) (${products.length - attached} already had real images).`);
console.log("These are solid-gradient TEST images only — replace via /admin/products before launch.");
