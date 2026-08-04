"use client";

import { useState } from "react";
import {
  BOND_PACKAGES,
  formatPoints,
  pointsPerDollar,
  type BondPackage,
} from "@/lib/store";

export function StorePackages() {
  const [username, setUsername] = useState("");
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function buy(pkg: BondPackage) {
    setError(null);
    const name = username.trim();
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

  return (
    <div>
      <label className="block max-w-md">
        <span className="font-display text-xs tracking-[0.16em] text-[color:var(--fg-muted)] uppercase">
          In-game username
        </span>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          maxLength={12}
          placeholder="Exact character name"
          className="mt-2 w-full border border-[color:var(--line)] bg-black/50 px-4 py-3 text-white outline-none focus:border-[color:var(--gold)]"
          autoComplete="username"
        />
      </label>
      <p className="mt-2 text-sm text-[color:var(--fg-muted)]">
        Bonds are delivered to this account via{" "}
        <span className="text-white">::claim</span> after payment.
      </p>
      {error ? (
        <p className="mt-3 text-sm text-red-400" role="alert">
          {error}
        </p>
      ) : null}

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {BOND_PACKAGES.map((pkg) => (
          <article
            key={pkg.id}
            className={`panel relative flex flex-col p-6 ${
              pkg.bestValue ? "ring-1 ring-[color:var(--gold)]/50" : ""
            }`}
          >
            {pkg.bestValue ? (
              <span className="absolute top-3 right-3 font-display text-[0.65rem] tracking-[0.16em] text-[color:var(--gold)] uppercase">
                Best value
              </span>
            ) : null}
            <h3 className="font-display text-xl tracking-wide text-[color:var(--gold)]">
              {pkg.name}
            </h3>
            <p className="mt-4 text-3xl font-semibold tabular-nums">
              ${pkg.usd}
            </p>
            <p className="mt-2 text-sm text-[color:var(--fg-muted)]">
              <span className="tabular-nums text-white">
                {formatPoints(pkg.points)}
              </span>{" "}
              DP
              <span className="mt-1 block text-xs">
                {pointsPerDollar(pkg)} pts / $
              </span>
            </p>
            <button
              type="button"
              onClick={() => buy(pkg)}
              disabled={loadingId !== null}
              className="btn-primary mt-auto w-full disabled:cursor-wait disabled:opacity-60"
            >
              {loadingId === pkg.id ? "Redirecting…" : "Buy now"}
            </button>
          </article>
        ))}
      </div>
    </div>
  );
}
