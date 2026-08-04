import type { Metadata } from "next";
import { DISCORD_INVITE } from "@/lib/site";
import { DONATOR_RANKS, POINTS_PER_DOLLAR } from "@/lib/store";
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
        lead="Buy a bond, claim it in-game with ::claim, then redeem for Donator Points."
      >
        <p className="inline-block border border-[color:var(--line)] bg-black/40 px-4 py-2 font-display text-sm tracking-[0.14em] text-[color:var(--gold)] uppercase">
          $1 = {POINTS_PER_DOLLAR} Donator Points
          <span className="ml-2 normal-case tracking-normal text-[color:var(--fg-muted)]">
            · bulk bonds grant bonus points
          </span>
        </p>
      </PageHero>

      <div className="mx-auto max-w-6xl px-5 pb-24 md:px-8">
        <section aria-labelledby="packages-heading">
          <h2
            id="packages-heading"
            className="font-display text-2xl tracking-[0.08em] text-white uppercase md:text-3xl"
          >
            Packages
          </h2>
          <p className="mt-3 max-w-2xl text-[color:var(--fg-muted)]">
            Secure checkout via Stripe. Enter your exact in-game username, then
            claim the bond after payment.
          </p>
          <div className="mt-8">
            <StorePackages />
          </div>
        </section>

        <section className="mt-20" aria-labelledby="ranks-heading">
          <h2
            id="ranks-heading"
            className="font-display text-2xl tracking-[0.08em] text-white uppercase md:text-3xl"
          >
            Donator ranks
          </h2>
          <p className="mt-3 max-w-2xl text-[color:var(--fg-muted)]">
            Lifetime dollars donated unlock chat icons and rank perks. Package
            size does not set your rank — a $25 bond adds points, but logos
            unlock at $10, $50, $100, and higher thresholds.
          </p>

          <ul className="mt-8 divide-y divide-[color:var(--line)] border-y border-[color:var(--line)]">
            {DONATOR_RANKS.map((rank) => (
              <li
                key={rank.id}
                className="flex flex-wrap items-center gap-x-6 gap-y-2 py-4 md:flex-nowrap"
              >
                <span
                  className="inline-block h-2.5 w-2.5 shrink-0 rounded-full"
                  style={{ backgroundColor: rank.accent }}
                  aria-hidden
                />
                <span
                  className="min-w-[10rem] font-display text-lg tracking-wide"
                  style={{ color: rank.accent }}
                >
                  {rank.name}
                </span>
                <span className="tabular-nums text-white">
                  ${rank.threshold.toLocaleString("en-US")}+
                </span>
                <span className="text-sm text-[color:var(--fg-muted)] md:ml-auto">
                  Distinct chat icon · {rank.doubleDropChance}% double-drop
                  chance
                </span>
              </li>
            ))}
          </ul>
        </section>

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
                1. Buy a bond
              </span>
              <p className="mt-1">
                Enter your username and pay with Stripe Checkout. Bonds grant
                Donator Points after you redeem them (not Kyro Points).
              </p>
            </li>
            <li>
              <span className="font-display tracking-wide text-white uppercase">
                2. Claim &amp; redeem in-game
              </span>
              <p className="mt-1">
                Type <span className="text-white">::claim</span> to receive the
                bond, then redeem it from your inventory for points and lifetime
                donated.
              </p>
            </li>
            <li>
              <span className="font-display tracking-wide text-white uppercase">
                3. Spend &amp; rank up
              </span>
              <p className="mt-1">
                Spend Donator Points at the Donator Point Store NPC. Rank logos
                unlock automatically from your lifetime total.
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
