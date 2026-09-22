export default function ContactPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold mb-4">Contact Us</h1>
      <p className="text-foreground/70 mb-4">
        Axios is a small, family-run shop &mdash; there&apos;s no call center, just us.
      </p>
      <p className="text-foreground/80 leading-relaxed">
        For sizing questions, order issues, or anything else, reach us at{" "}
        <a href="mailto:hello@axios.example" className="underline hover:text-accent">
          hello@axios.example
        </a>
        . We read every message ourselves and typically reply within a couple of days.
      </p>
    </div>
  );
}
