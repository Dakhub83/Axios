export default function DiscountsPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold mb-4">Student &amp; Military Discount</h1>
      <span className="inline-block rounded-full border border-accent px-3 py-1 text-xs uppercase tracking-widest text-accent mb-8">
        Coming Soon
      </span>
      <p className="text-foreground/80 leading-relaxed">
        We&apos;re setting up verified discounts for students and military, veterans, and their
        families — details and how to verify will land here as soon as it&apos;s ready. If you want
        to be notified when it launches, reach out on the{" "}
        <a href="/contact" className="underline hover:text-accent">
          Contact Us
        </a>{" "}
        page.
      </p>
    </div>
  );
}
