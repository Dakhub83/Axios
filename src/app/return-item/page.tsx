import Link from "next/link";
import ReturnItemForm from "@/components/ReturnItemForm";

export default function ReturnItemPage() {
  return (
    <div>
      <section className="max-w-2xl mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl sm:text-4xl font-bold uppercase tracking-tight">Return an Item</h1>
        <p className="mt-4 text-foreground/70">
          Have your order email and item details ready. See our{" "}
          <Link href="/return-policy" className="underline hover:text-accent">
            return policy
          </Link>{" "}
          for eligibility windows and condition requirements before you submit.
        </p>
      </section>

      <section className="max-w-xl mx-auto px-4 pb-20">
        <ReturnItemForm />
      </section>
    </div>
  );
}
