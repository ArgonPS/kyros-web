import type { Metadata } from "next";
import { DISCORD_INVITE } from "@/lib/site";
import { PageHero } from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Store",
  description: "Kyro Points and store packages for Kyros.",
};

const packages = [
  { name: "Spark", points: "250" },
  { name: "Forge", points: "750" },
  { name: "Realm", points: "2,000" },
];

export default function StorePage() {
  return (
    <>
      <PageHero
        eyebrow="KYRO POINTS"
        title="Store"
        lead="Checkout with Stripe and PayPal when payments go live. Claims sync to your in-game account."
      />

      <div className="mx-auto max-w-6xl px-5 pb-24 md:px-8">
        <div className="grid gap-5 md:grid-cols-3">
          {packages.map((pkg) => (
            <div key={pkg.name} className="panel p-7">
              <h2 className="font-display text-2xl text-[color:var(--gold)]">
                {pkg.name}
              </h2>
              <p className="mt-5 text-3xl font-semibold tabular-nums">
                {pkg.points}
                <span className="ml-2 text-sm font-normal text-[color:var(--fg-muted)]">
                  KP
                </span>
              </p>
              <p className="mt-2 text-sm text-[color:var(--fg-muted)]">
                Pricing TBA
              </p>
              <button
                type="button"
                disabled
                className="btn-primary mt-8 w-full cursor-not-allowed opacity-50"
              >
                Unavailable
              </button>
            </div>
          ))}
        </div>
        <p className="mt-10 text-sm text-[color:var(--fg-muted)]">
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
