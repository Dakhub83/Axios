import Link from "next/link";

export default function ReturnPolicyPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold mb-8">Return Policy</h1>

      <h2 className="text-lg font-semibold mt-8 mb-3">Return window</h2>
      <p className="text-foreground/80 leading-relaxed mb-4">
        You have 30 days from the delivery date to return an item for a refund, exchange, or store
        credit. Items returned after 30 days can&apos;t be accepted.
      </p>

      <h2 className="text-lg font-semibold mt-8 mb-3">Condition</h2>
      <p className="text-foreground/80 leading-relaxed mb-4">
        Items must be unworn (aside from trying them on), unwashed, and with original tags attached.
        We can&apos;t accept items that show signs of wear from actual training use.
      </p>

      <h2 className="text-lg font-semibold mt-8 mb-3">Non-returnable items</h2>
      <p className="text-foreground/80 leading-relaxed mb-4">
        For hygiene reasons, we can&apos;t accept returns on innerwear or swimwear once the hygiene
        seal has been removed.
      </p>

      <h2 className="text-lg font-semibold mt-8 mb-3">Refunds</h2>
      <p className="text-foreground/80 leading-relaxed mb-4">
        Once we receive and inspect your return, refunds are issued to your original payment method
        within 5&ndash;7 business days. Exchanges and store credit are processed faster since they
        don&apos;t depend on payment processor timing.
      </p>

      <h2 className="text-lg font-semibold mt-8 mb-3">Shipping cost</h2>
      <p className="text-foreground/80 leading-relaxed mb-4">
        Returns caused by our error (wrong item, defect) ship free. Otherwise, return shipping is
        the customer&apos;s responsibility unless local rules require otherwise.
      </p>

      <p className="text-foreground/80 leading-relaxed mt-10">
        Ready to send something back?{" "}
        <Link href="/return-item" className="underline hover:text-accent">
          Start a return
        </Link>
        .
      </p>
    </div>
  );
}
