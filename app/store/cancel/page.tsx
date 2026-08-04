import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Checkout canceled",
  description: "Your Kyros checkout was canceled.",
};

export default function StoreCancelPage() {
  return (
    <>
      <PageHero
        eyebrow="STORE"
        title="Checkout canceled"
        lead="No charge was made. You can return to the store whenever you’re ready."
      />
      <div className="mx-auto max-w-2xl px-5 pb-24 md:px-8">
        <Link href="/store" className="btn-primary">
          Back to store
        </Link>
      </div>
    </>
  );
}
