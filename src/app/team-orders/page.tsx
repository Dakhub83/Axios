import TeamOrderForm from "@/components/TeamOrderForm";

export default function TeamOrdersPage() {
  return (
    <div>
      <section className="max-w-3xl mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl sm:text-4xl font-bold uppercase tracking-tight">
          Custom team gear, built the same way we build everything: tested before it&apos;s trusted.
        </h1>
        <p className="mt-6 text-foreground/70">
          From local clubs to competitive programs, we design and manufacture custom uniforms and
          technical apparel for soccer, swimming, and tennis teams &mdash; built on the same
          wear-testing standard behind every Axios product.
        </p>
      </section>

      <section className="max-w-2xl mx-auto px-4 pb-10">
        <h2 className="text-lg font-semibold mb-3">Who we serve</h2>
        <ul className="list-disc pl-5 space-y-1 text-foreground/80 mb-8">
          <li>Youth and amateur soccer clubs</li>
          <li>Competitive swim clubs and academies</li>
          <li>Tennis clubs and academies</li>
          <li>School and collegiate athletic programs</li>
        </ul>

        <h2 className="text-lg font-semibold mb-3">Sport-specific capabilities</h2>
        <table className="w-full text-sm border-collapse mb-10">
          <thead>
            <tr className="text-left text-foreground/60">
              <th className="py-1.5 pr-2">Sport</th>
              <th className="py-1.5">What we build for it</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t border-border">
              <td className="py-2 pr-2 font-medium">Soccer</td>
              <td className="py-2">Industrial-wash-durable knits, reinforced seams, breathable panels for full-match wear.</td>
            </tr>
            <tr className="border-t border-border">
              <td className="py-2 pr-2 font-medium">Swimming</td>
              <td className="py-2">Chlorine-resistant fiber blends, UPF-rated fabric, compression cuts for hydrodynamics.</td>
            </tr>
            <tr className="border-t border-border">
              <td className="py-2 pr-2 font-medium">Tennis</td>
              <td className="py-2">UV-protective fabric, integrated ball pockets, breathable high-sweat-zone panels.</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section className="max-w-xl mx-auto px-4 pb-20">
        <h2 className="text-lg font-semibold mb-4">Tell us about your team</h2>
        <TeamOrderForm />
      </section>
    </div>
  );
}
