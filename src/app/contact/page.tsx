import ContactForm from "@/components/ContactForm";

export default function ContactPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold mb-4">Contact Us</h1>
      <p className="text-foreground/70 mb-8">
        Axios is a small, family-run shop &mdash; there&apos;s no call center, just us. For sizing
        questions, order issues, or anything else, send a message below or email{" "}
        <a href="mailto:hello@axios.example" className="underline hover:text-accent">
          hello@axios.example
        </a>{" "}
        directly. We read every message ourselves and typically reply within a couple of days.
      </p>
      <ContactForm />
    </div>
  );
}
