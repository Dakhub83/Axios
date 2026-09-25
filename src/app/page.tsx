import Link from "next/link";
import { listProducts } from "@/lib/products";
import ProductCard from "@/components/ProductCard";
import AppPromoSection from "@/components/AppPromoSection";

const categoryTiles = [
  { label: "Leggings", category: "Leggings" },
  { label: "Jackets", category: "Jackets" },
  { label: "Tops", category: "Tops" },
  { label: "Hoodies", category: "Hoodies" },
  { label: "Joggers", category: "Joggers" },
  { label: "Accessories", category: "Accessories" },
];

export default function HomePage() {
  const products = listProducts().slice(0, 4);

  return (
    <div>
      <section
        className="relative min-h-[85vh] flex flex-col text-left"
        style={{
          // Deliberately kept dark regardless of the site's light theme — the
          // photo is a moody gym shot and a light scrim would wash it out, so
          // this section overrides text color to white/cream explicitly
          // rather than relying on the (now dark) --foreground token.
          // Top to bottom: brand accent glow, a scrim that keeps the headline
          // legible over the photo, then the photo itself.
          backgroundImage:
            "url(/hero-overlay.svg), linear-gradient(90deg, rgba(10,10,10,0.92) 0%, rgba(10,10,10,0.7) 34%, rgba(10,10,10,0.28) 68%, rgba(10,10,10,0.5) 100%), linear-gradient(180deg, rgba(10,10,10,0.25) 0%, rgba(10,10,10,0) 42%, rgba(10,10,10,0.88) 100%), url(/hero-athlete.png)",
          backgroundSize: "cover, cover, cover, cover",
          // Photo anchors to the top so the model's head is never cropped on
          // short/wide viewports, where `cover` would otherwise crop both ends.
          backgroundPosition: "center, center, center, center top",
          backgroundRepeat: "no-repeat, no-repeat, no-repeat, no-repeat",
        }}
      >
        <div className="relative z-10 flex flex-1 items-center px-6 sm:px-10 lg:px-16">
          <div className="max-w-xl">
            <h1 className="font-serif uppercase text-4xl sm:text-6xl leading-tight tracking-wide text-white">
              No Claims.
              <br />
              Only Proof.
            </h1>
            <p className="mt-6 font-serif text-lg sm:text-xl text-white/80">
              30 days of real training, 10+ wash cycles, and a{" "}
              <span className="italic text-accent">published fabric spec</span> on every
              tag.
            </p>
          </div>
        </div>

        <div className="relative z-10 flex items-center px-6 sm:px-10 lg:px-16 pb-14">
          <Link
            href="/shop"
            className="border border-accent text-accent px-8 py-3 rounded-full text-sm tracking-[0.15em] uppercase hover:bg-accent hover:text-accent-ink transition-colors"
          >
            Shop Now
          </Link>
        </div>
      </section>

      <section className="border-y border-border">
        <div className="max-w-6xl mx-auto px-4 py-8 grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-border text-center text-xs tracking-[0.15em] uppercase text-foreground/70">
          <div className="p-3">30-Day Wear Test</div>
          <div className="p-3">Squat-Proof Certified</div>
          <div className="p-3">Flatlock Seams, Zero Chafe</div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-20">
        <div className="flex items-end justify-between mb-8">
          <h2 className="font-serif text-2xl sm:text-3xl">Shop by Category</h2>
          <Link
            href="/shop"
            className="text-sm tracking-widest uppercase underline underline-offset-4 hover:text-accent"
          >
            Shop Now
          </Link>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-2 sm:grid sm:grid-cols-3 sm:overflow-visible sm:pb-0 lg:grid-cols-6">
          {categoryTiles.map((tile) => (
            <Link key={tile.category} href={`/shop?category=${encodeURIComponent(tile.category)}`} className="group w-36 shrink-0 sm:w-auto">
              <div className="relative aspect-[3/4] overflow-hidden rounded-lg bg-linear-to-br from-muted via-muted to-background">
                <div
                  aria-hidden
                  className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(122,46,63,0.18),transparent_60%)] transition-opacity group-hover:opacity-70"
                />
                <span className="absolute inset-0 flex items-center justify-center font-serif text-6xl text-foreground/10 transition-colors group-hover:text-foreground/15">
                  {tile.label.charAt(0)}
                </span>
              </div>
              <div className="mt-3 rounded-md border border-border py-3 text-center text-xs uppercase tracking-widest transition-colors group-hover:border-accent group-hover:text-accent">
                {tile.label}
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-20">
        <div className="flex items-end justify-between mb-10">
          <h2 className="font-serif text-2xl sm:text-3xl">Latest gear</h2>
          <Link
            href="/shop"
            className="text-sm tracking-widest uppercase underline underline-offset-4 hover:text-accent"
          >
            View all
          </Link>
        </div>
        {products.length === 0 ? (
          <p className="text-foreground/60">
            No products yet.{" "}
            <Link href="/admin/products/new" className="underline hover:text-accent">
              Add your first product
            </Link>{" "}
            to see it here.
          </p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {products.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </section>

      <AppPromoSection />
    </div>
  );
}
