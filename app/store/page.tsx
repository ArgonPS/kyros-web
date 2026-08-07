import type { Metadata } from "next";
import { DISCORD_INVITE } from "@/lib/site";
import { POINTS_PER_DOLLAR } from "@/lib/store";
import { PageHero } from "@/components/PageHero";
import { StorePackages } from "@/components/StorePackages";

export const metadata: Metadata = {
  title: "Store",
  description:
    "Donator Points packages and rank tiers for Kyros. Support the server and unlock in-game rewards.",
};

export default function StorePage() {
  return (
    <>
      <PageHero
        eyebrow="DONATOR POINTS"
        title="Store"
        lead="Enter your in-game username, pick a bond, then claim it with ::claim and redeem for Donator Points."
      >
        <p className="inline-block border border-[color:var(--line)] bg-black/40 px-4 py-2 font-display text-sm tracking-[0.14em] text-[color:var(--gold)] uppercase">
          $1 USD = {POINTS_PER_DOLLAR} Donator Points
          <span className="ml-2 normal-case tracking-normal text-[color:var(--fg-muted)]">
            · charged in USD · bulk bonds grant bonus points
          </span>
        </p>
      </PageHero>

      <div className="mx-auto max-w-6xl px-5 pb-24 md:px-8">
        <StorePackages />

        <section className="mt-20" aria-labelledby="how-heading">
          <h2
            id="how-heading"
            className="font-display text-2xl tracking-[0.08em] text-white uppercase md:text-3xl"
          >
            How it works
          </h2>
          <ol className="mt-8 max-w-2xl space-y-6 text-[color:var(--fg-muted)]">
            <li>
              <span className="font-display tracking-wide text-white uppercase">
                1. Enter your name
              </span>
              <p className="mt-1">
                Use your exact in-game username so the bond lands on the right
                account.
              </p>
            </li>
            <li>
              <span className="font-display tracking-wide text-white uppercase">
                2. Buy a bond
              </span>
              <p className="mt-1">
                Pay with Stripe Checkout (USD). Larger bonds include bonus
                Donator Points.
              </p>
            </li>
            <li>
              <span className="font-display tracking-wide text-white uppercase">
                3. Claim &amp; redeem
              </span>
              <p className="mt-1">
                Type <span className="text-white">::claim</span>, redeem the
                bond for points, and spend them at the Donator Point Store. Rank
                logos unlock from lifetime donated.
              </p>
            </li>
          </ol>
        </section>

        <p className="mt-16 text-sm text-[color:var(--fg-muted)]">
          Questions about donations?{" "}
          <a
            href={DISCORD_INVITE}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[color:var(--gold)] hover:underline"
          >
            Open a Discord ticket
          </a>
          .
        </p>
      </div>
    </>
  );
}
