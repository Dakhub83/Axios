export default function SustainabilityPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold mb-4">Sustainability</h1>
      <p className="text-foreground/70 mb-8">
        We&apos;re a small shop, not a certifying body — this is what we actually do, not a list of
        badges.
      </p>

      <div className="space-y-8">
        <div>
          <h2 className="text-lg font-semibold mb-2">Recycled fabrics, where it makes sense</h2>
          <p className="text-foreground/80 leading-relaxed">
            A number of our pieces are built from recycled nylon or recycled polyester blends —
            it&apos;s listed on the Technical Specs section of each product page, not just claimed
            here. If a fabric isn&apos;t recycled, we don&apos;t say it is.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-2">Testing before shipping, not after returns</h2>
          <p className="text-foreground/80 leading-relaxed">
            Every wear-tested product is worn and washed by our family before it&apos;s listed —
            see{" "}
            <a href="/about#how-we-test" className="underline hover:text-accent">
              How We Test
            </a>
            . Catching a fit or durability problem before it ships means fewer returns, fewer
            reshipped replacements, and less discarded product overall.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-2">What we&apos;re not claiming</h2>
          <p className="text-foreground/80 leading-relaxed">
            We haven&apos;t gone through a third-party sustainability certification, and we&apos;re
            not going to claim one we don&apos;t have. This page will grow honestly as our practices
            do.
          </p>
        </div>
      </div>
    </div>
  );
}
