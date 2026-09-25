export default function AccessibilityPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold mb-4">Accessibility Statement</h1>
      <p className="text-foreground/70 mb-8">
        Axios is a small, family-run shop — this page is a plain statement of intent, not a
        compliance certificate.
      </p>

      <div className="space-y-8">
        <div>
          <h2 className="text-lg font-semibold mb-2">Our commitment</h2>
          <p className="text-foreground/80 leading-relaxed">
            We want this site to be usable by as many people as possible, including people using
            screen readers, keyboard-only navigation, or browser zoom. We build with the Web
            Content Accessibility Guidelines (WCAG) 2.1 as a reference point and keep fixing issues
            as we find them.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-2">Where we are today</h2>
          <p className="text-foreground/80 leading-relaxed">
            We&apos;re a small team still actively building this store, so some pages are ahead of
            others. We haven&apos;t run a full third-party audit, and we&apos;re not claiming full
            WCAG conformance — just that accessibility is something we&apos;re actively working on,
            not an afterthought.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-2">Found a problem?</h2>
          <p className="text-foreground/80 leading-relaxed">
            If something on this site is hard to use with assistive technology, tell us on the{" "}
            <a href="/contact" className="underline hover:text-accent">
              Contact Us
            </a>{" "}
            page. We read every message ourselves and will do our best to fix it.
          </p>
        </div>
      </div>
    </div>
  );
}
