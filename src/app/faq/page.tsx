const faqs = [
  {
    q: "What does “family-tested” actually mean?",
    a: "Before anything is sold, it's worn by real members of our family through real training — not just checked in a lab.",
  },
  {
    q: "Do you offer team or bulk orders?",
    a: "Yes — see the Team Orders page for gyms, clubs, and squads ordering in bulk.",
  },
  {
    q: "How do I find my size?",
    a: "Check the Size Guide page for body measurements against each product's size chart.",
  },
];

export default function FaqPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold mb-8">Frequently Asked Questions</h1>
      <div className="space-y-8">
        {faqs.map((item) => (
          <div key={item.q}>
            <h2 className="text-lg font-semibold mb-2">{item.q}</h2>
            <p className="text-foreground/80 leading-relaxed">{item.a}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
