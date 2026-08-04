/** In-game donation currency (matches `donatorPoints` / DonatorBond). */
export const POINTS_PER_DOLLAR = 100;

export type BondPackage = {
  id: string;
  name: string;
  usd: number;
  points: number;
  /** In-game bond item id delivered on ::claim */
  bondItemId: number;
  /** Stripe Price ID (live). Override via STRIPE_PRICE_<ID> env. */
  stripePriceId: string;
  /** Highlight as best value (Patron $100). */
  bestValue?: boolean;
};

/** Matches DonatorBond.redeem amounts + bond item IDs. */
export const BOND_PACKAGES: BondPackage[] = [
  {
    id: "starter",
    name: "Starter",
    usd: 5,
    points: 500,
    bondItemId: 30464,
    // Test-mode defaults; override with STRIPE_PRICE_* or live prices via env for production go-live
    stripePriceId: "price_1U0Y70Fra3ryrFFUBpRETGoR",
  },
  {
    id: "boost",
    name: "Boost",
    usd: 10,
    points: 1_000,
    bondItemId: 30497,
    stripePriceId: "price_1U0Y71Fra3ryrFFUiPZfleis",
  },
  {
    id: "bundle",
    name: "Bundle",
    usd: 25,
    points: 3_000,
    bondItemId: 30466,
    stripePriceId: "price_1U0Y73Fra3ryrFFUgijId8JA",
  },
  {
    id: "support",
    name: "Support",
    usd: 50,
    points: 6_000,
    bondItemId: 30467,
    stripePriceId: "price_1U0Y74Fra3ryrFFUOpeh5mfm",
  },
  {
    id: "patron",
    name: "Patron",
    usd: 100,
    points: 12_500,
    bondItemId: 30468,
    stripePriceId: "price_1U0Y75Fra3ryrFFUGtIrNgIk",
    bestValue: true,
  },
];

export type DonatorRank = {
  id: string;
  name: string;
  /** Lifetime USD donated required (`totalDonated`). */
  threshold: number;
  accent: string;
  /** SecondaryGroup.doubleDropChance */
  doubleDropChance: number;
};

/** Matches DonatorBond.checkDonatorStatus + SecondaryGroup. */
export const DONATOR_RANKS: DonatorRank[] = [
  {
    id: "donator",
    name: "Donator",
    threshold: 10,
    accent: "#db5b58",
    doubleDropChance: 2.5,
  },
  {
    id: "super",
    name: "Super Donator",
    threshold: 50,
    accent: "#1E90FF",
    doubleDropChance: 2.75,
  },
  {
    id: "elite",
    name: "Elite Donator",
    threshold: 100,
    accent: "#27ae60",
    doubleDropChance: 3.0,
  },
  {
    id: "noble",
    name: "Noble Donator",
    threshold: 250,
    accent: "#8D501B",
    doubleDropChance: 3.2,
  },
  {
    id: "gold",
    name: "Gold Donator",
    threshold: 500,
    accent: "#F7E521",
    doubleDropChance: 3.5,
  },
  {
    id: "platinum",
    name: "Platinum Donator",
    threshold: 1_000,
    accent: "#78757A",
    doubleDropChance: 4.0,
  },
  {
    id: "legendary",
    name: "Legendary Donator",
    threshold: 2_500,
    accent: "#E121F7",
    doubleDropChance: 5.0,
  },
  {
    id: "supreme",
    name: "Supreme Donator",
    threshold: 5_000,
    accent: "#FC7306",
    doubleDropChance: 7.0,
  },
];

export function formatPoints(n: number): string {
  return n.toLocaleString("en-US");
}

export function pointsPerDollar(pkg: BondPackage): number {
  return Math.round(pkg.points / pkg.usd);
}

export function getBondPackage(id: string): BondPackage | undefined {
  return BOND_PACKAGES.find((p) => p.id === id);
}

/** Resolve Stripe price ID, allowing env overrides per package. */
export function resolveStripePriceId(pkg: BondPackage): string {
  const envKey = `STRIPE_PRICE_${pkg.id.toUpperCase()}`;
  const fromEnv = process.env[envKey]?.trim();
  return fromEnv || pkg.stripePriceId;
}

/** Normalize RuneScape-style names for matching. */
export function normalizeUsername(name: string): string {
  return name.trim().replace(/\s+/g, " ").toLowerCase();
}
