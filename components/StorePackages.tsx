"use client";

import { useState, type FormEvent } from "react";
import {
  BOND_PACKAGES,
  DONATOR_RANKS,
  POINTS_PER_DOLLAR,
  formatPoints,
  packageBonusLabel,
  type BondPackage,
} from "@/lib/store";

export function StorePackages({ initialUsername = "" }: { initialUsername?: string }) {
  const [username, setUsername] = useState(initialUsername);
  const [started, setStarted] = useState(Boolean(initialUsername.trim()));
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const name = username.trim();
  const ready = name.length > 0;

  function continueToStore(e: FormEvent) {
    e.preventDefault();
    if (!ready) return;
    setError(null);
    setStarted(true);
  }

  async function buy(pkg: BondPackage) {
    setError(null);
    if (!name) {
      setError("Enter your in-game username before checkout.");
      return;
    }
    setLoadingId(pkg.id);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ packageId: pkg.id, username: name }),
      });
      const data = (await res.json()) as { url?: string; error?: string };
      if (!res.ok || !data.url) {
        throw new Error(data.error || "Checkout failed");
      }
      window.location.href = data.url;
    } catch (e) {
      setError(e instanceof Error ? e.message : "Checkout failed");
      setLoadingId(null);
    }
  }

  if (!started) {
    return (
      <div className="mx-auto max-w-lg">
        <p className="text-center text-[color:var(--fg-muted)]">
          Please enter your in-game username.
        </p>
        <form onSubmit={continueToStore} className="mt-6 space-y-4">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            maxLength={12}
            placeholder="Exact character name"
            className="w-full border border-[color:var(--line)] bg-black/50 px-4 py-3 text-center text-lg text-white outline-none focus:border-[color:var(--gold)]"
            autoComplete="username"
            autoFocus
          />
          <button
            type="submit"
            disabled={!ready}
            className="btn-primary w-full disabled:pointer-events-none disabled:opacity-40"
          >
            Continue to Store
          </button>
        </form>
        <p className="mt-6 text-center text-sm text-[color:var(--fg-muted)]">
          $1 USD = {POINTS_PER_DOLLAR} Donator Points. Bonds are claimed in-game
          with <code className="text-[color:var(--gold)]">::claim</code>.
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col gap-3 border border-[color:var(--line)] bg-black/40 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-display text-xs tracking-[0.16em] text-[color:var(--fg-muted)] uppercase">
            Shopping as
          </p>
          <p className="mt-1 font-display text-2xl text-[color:var(--gold)]">
            {name}
          </p>
        </div>
        <button
          type="button"
          onClick={() => {
            setStarted(false);
            setError(null);
          }}
          className="btn-ghost shrink-0 text-xs"
        >
          Change name
        </button>
      </div>

      {error ? (
        <p className="mt-4 text-sm text-red-400" role="alert">
          {error}
        </p>
      ) : null}

      <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,1fr)_280px] lg:items-start">
        <section aria-labelledby="packages-heading">
          <h2
            id="packages-heading"
            className="font-display text-2xl tracking-[0.08em] text-white uppercase"
          >
            Bonds
          </h2>
          <p className="mt-2 text-sm text-[color:var(--fg-muted)]">
            Secure Stripe checkout (USD). Redeem in-game for Donator Points.
          </p>

          <ul className="mt-6 divide-y divide-[color:var(--line)] border-y border-[color:var(--line)]">
            {BOND_PACKAGES.map((pkg) => {
              const bonus = packageBonusLabel(pkg);
              return (
                <li
                  key={pkg.id}
                  className="flex flex-col gap-4 py-6 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                      <h3 className="font-display text-xl tracking-wide text-[color:var(--fg)]">
                        {pkg.name}
                      </h3>
                      {bonus ? (
                        <span className="border border-[color:var(--gold)]/40 bg-[color:var(--gold)]/10 px-2 py-0.5 font-display text-[0.65rem] tracking-[0.14em] text-[color:var(--gold)] uppercase">
                          {bonus}
                        </span>
                      ) : null}
                      {pkg.bestValue ? (
                        <span className="font-display text-[0.65rem] tracking-[0.14em] text-[color:var(--gold-bright)] uppercase">
                          Best value
                        </span>
                      ) : null}
                    </div>
                    <p className="mt-2 text-sm text-[color:var(--fg-muted)]">
                      <span className="tabular-nums text-white">
                        {formatPoints(pkg.points)}
                      </span>{" "}
                      Donator Points
                    </p>
                  </div>
                  <div className="flex shrink-0 flex-col items-stretch gap-2 sm:items-end">
                    <p className="text-right text-2xl font-semibold tabular-nums text-white">
                      ${pkg.usd.toFixed(2)}
                    </p>
                    <button
                      type="button"
                      onClick={() => buy(pkg)}
                      disabled={loadingId !== null}
                      className="btn-primary disabled:cursor-wait disabled:opacity-60"
                    >
                      {loadingId === pkg.id ? "Redirecting…" : "Buy now"}
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        </section>

        <aside
          className="border border-[color:var(--line)] bg-black/40 px-5 py-6 lg:sticky lg:top-24"
          aria-labelledby="ranks-heading"
        >
          <h2
            id="ranks-heading"
            className="font-display text-xl tracking-[0.08em] text-white uppercase"
          >
            Kyros Ranks
          </h2>
          <p className="mt-2 text-sm text-[color:var(--fg-muted)]">
            Help support development and unlock benefits from lifetime donated.
          </p>
          <ul className="mt-6 space-y-3">
            {DONATOR_RANKS.map((rank) => (
              <li
                key={rank.id}
                className="flex items-baseline justify-between gap-3 border-t border-[color:var(--line)] pt-3 first:border-t-0 first:pt-0"
              >
                <span className="text-sm text-[color:var(--fg-muted)]">
                  ${rank.threshold.toLocaleString("en-US")} Donated:
                </span>
                <span
                  className="font-display text-sm tracking-wide"
                  style={{ color: rank.accent }}
                >
                  {rank.name}
                </span>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </div>
  );
}
