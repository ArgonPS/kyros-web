import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Store",
  description: "Kyro Points and store packages for Kyros.",
};

const packages = [
  { name: "Spark", points: "250", price: "—" },
  { name: "Forge", points: "750", price: "—" },
  { name: "Realm", points: "2,000", price: "—" },
];

export default function StorePage() {
  return (
    <div className="mx-auto max-w-6xl px-5 pb-24 pt-32 md:px-8 md:pt-36">
      <p className="font-display text-sm tracking-[0.3em] text-[color:var(--gold)]">
        KYRO POINTS
      </p>
      <h1 className="mt-4 font-display text-4xl tracking-wide md:text-5xl">
        Store
      </h1>
      <p className="mt-5 max-w-2xl text-[color:var(--fg-muted)]">
        Purchase Kyro Points when payments go live. Checkout will use Stripe
        and PayPal; claims sync to your in-game account.
      </p>

      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {packages.map((pkg) => (
          <div
            key={pkg.name}
            className="border border-[color:var(--line)] bg-[color:var(--bg-elevated)] p-7"
          >
            <h2 className="font-display text-2xl text-[color:var(--gold)]">
              {pkg.name}
            </h2>
            <p className="mt-4 text-3xl font-semibold tabular-nums text-[color:var(--fg)]">
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
    </div>
  );
}
