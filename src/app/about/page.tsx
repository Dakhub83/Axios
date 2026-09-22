export default function AboutPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold mb-2">We didn&apos;t start a brand. We started in a garage.</h1>
      <p className="text-foreground/70 mb-10">
        Axios began the way most great gear ideas do: with someone in our own family unable to find a
        pair of leggings that survived a real workout. So we started making our own.
      </p>

      <h2 className="text-xl font-semibold mt-10 mb-3">Our Story</h2>
      <p className="text-foreground/80 leading-relaxed mb-4">
        Axios wasn&apos;t built in a boardroom. It was built on a sewing table in our house, by a family
        who got tired of gear that looked good in a photo and fell apart in a real workout &mdash;
        leggings that went sheer mid-squat, seams that chewed up an inner thigh by mile three,
        waistbands that gave up by the second wash.
      </p>
      <p className="text-foreground/80 leading-relaxed mb-4">
        So we started cutting our own patterns. We sourced fabric swatches and stretched them across a
        kitchen table to test recovery. We sewed a first pair of leggings, handed them to the person in
        our family who trains hardest, and asked one question: does this survive you?
      </p>
      <p className="text-foreground/80 leading-relaxed">
        Most of the time, the honest answer was no. So we cut again. And again. What you see on this
        site is what survived that process &mdash; gear that made it through our own household&apos;s
        toughest critics before it ever earned the right to be sold.
      </p>

      <h2 className="text-xl font-semibold mt-10 mb-3">How we test</h2>
      <ul className="list-disc pl-5 space-y-2 text-foreground/80">
        <li>
          <strong>First wear:</strong> initial fit, range of motion, and the deep-squat check &mdash;
          does the fabric hold opacity under full-stretch load?
        </li>
        <li>
          <strong>Mid-cycle (after 3&ndash;5 washes):</strong> we check for seam irritation, fabric
          recovery, and whether color or print has started to fade.
        </li>
        <li>
          <strong>Final (day 28&ndash;30):</strong> durability, pilling, and elastic fatigue after real,
          repeated training sessions.
        </li>
      </ul>
      <p className="text-foreground/80 leading-relaxed mt-4">
        If a piece fails at any stage, it goes back to the pattern table. It does not go on this site
        with an asterisk. It simply doesn&apos;t launch until it passes.
      </p>

      <h2 className="text-xl font-semibold mt-10 mb-3">Our promise</h2>
      <ul className="list-disc pl-5 space-y-2 text-foreground/80">
        <li>
          <strong>Family-tested, not lab-tested.</strong> Every product is worn by real people in real
          training before it&apos;s sold to you.
        </li>
        <li>
          <strong>Built where seams meet skin.</strong> Seam placement and fabric choice are decided by
          where irritation actually happens.
        </li>
        <li>
          <strong>Small batch, high accountability.</strong> We&apos;re chasing gear we&apos;d hand to
          our own family without hesitation &mdash; because we already have.
        </li>
      </ul>
    </div>
  );
}
