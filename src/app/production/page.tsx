export default function ProductionPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold mb-4">Where It&apos;s Made</h1>
      <p className="text-foreground/70 mb-8">
        A straight answer to a question we&apos;d want answered too.
      </p>

      <div className="space-y-8">
        <div>
          <h2 className="text-lg font-semibold mb-2">Where the designs come from</h2>
          <p className="text-foreground/80 leading-relaxed">
            Every pattern starts the way Axios did — cut, fit, and tested by our own family, on our
            own kitchen table, before it goes anywhere near production. See{" "}
            <a href="/about" className="underline hover:text-accent">
              Our Story
            </a>{" "}
            for how that started.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-2">Where it&apos;s actually sewn</h2>
          <p className="text-foreground/80 leading-relaxed">
            Once a pattern survives our own testing, production is handled by a sourced
            manufacturing partner — we&apos;re a small family operation, not a garment factory, and
            we&apos;re not going to pretend otherwise. We&apos;re not listing a specific factory name
            or address here yet; if that matters to your order, ask us directly on the{" "}
            <a href="/contact" className="underline hover:text-accent">
              Contact Us
            </a>{" "}
            page and we&apos;ll tell you plainly.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-2">What stays in-house</h2>
          <p className="text-foreground/80 leading-relaxed">
            Design, fit, and quality control don&apos;t get outsourced. Every batch that comes back
            from production still goes through our own{" "}
            <a href="/about#how-we-test" className="underline hover:text-accent">
              wear-testing process
            </a>{" "}
            before it&apos;s listed — if it doesn&apos;t hold up, it doesn&apos;t go on the site.
          </p>
        </div>
      </div>
    </div>
  );
}
