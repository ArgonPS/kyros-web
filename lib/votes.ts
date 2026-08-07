import { normalizeUsername } from "@/lib/store";

/** RSPS-List dashboard username (u=...). */
export const RSPS_LIST_USERNAME = "system32";

/** TopG listing id from Voting Code page. */
export const TOPG_SITE_ID = "684800";

/**
 * Top100Arena listing id (number in /listing/XXXXX/vote).
 * Set NEXT_PUBLIC_TOP100ARENA_LISTING_ID on Vercel after the listing is approved.
 */
export const TOP100ARENA_LISTING_ID =
  process.env.NEXT_PUBLIC_TOP100ARENA_LISTING_ID?.trim() || "102549";

/** Vote points granted in-game per completed toplist (matches ::claimvote). */
export const VOTE_POINTS_PER_SITE = 2;

/** Fallback cooldown; each site's own reset window is in VOTE_SITES. */
export const VOTE_COOLDOWN_MS = 12 * 60 * 60 * 1000;

function noteFor(hours: number): string {
  return `${VOTE_POINTS_PER_SITE} vote points — once every ${hours} hours.`;
}

/** cooldownHours must match SITE_COOLDOWN_HOURS in the VPS store. */
export const VOTE_SITES = [
  {
    id: "rulocus",
    name: "RULOCUS",
    cooldownHours: 12,
    note: noteFor(12),
    listingUrl: "https://www.rulocus.com/top-rsps-list/kyros/vote/",
  },
  {
    id: "rsps-list",
    name: "RSPS-List",
    cooldownHours: 12,
    note: noteFor(12),
    listingUrl: `https://www.rsps-list.com/index.php?a=in&u=${RSPS_LIST_USERNAME}`,
  },
  {
    id: "topg",
    name: "TopG",
    cooldownHours: 12,
    note: noteFor(12),
    listingUrl: `https://topg.org/runescape-private-servers/server-${TOPG_SITE_ID}`,
  },
  {
    id: "top100arena",
    name: "Top100Arena",
    // Top100Arena only counts one vote per 24h.
    cooldownHours: 24,
    note: noteFor(24),
    listingUrl: TOP100ARENA_LISTING_ID
      ? `https://www.top100arena.com/listing/${TOP100ARENA_LISTING_ID}/vote`
      : "https://www.top100arena.com/",
  },
] as const;

export type VoteSiteId = (typeof VOTE_SITES)[number]["id"];

export type VoteSiteStatus = {
  available: boolean;
  /** ISO timestamp when the player can vote again; null if available now. */
  availableAt: string | null;
  lastVotedAt: string | null;
};

export type VoteStatusResponse = {
  username: string;
  cooldownMs: number;
  sites: Record<VoteSiteId, VoteSiteStatus>;
};

export function buildRulocusVoteUrl(username: string): string {
  const name = username.trim();
  const params = new URLSearchParams({
    callback: name,
    username: name,
  });
  // Official incentive URL: https://www.rulocus.com/top-rsps-list/kyros/vote/
  return `https://www.rulocus.com/top-rsps-list/kyros/vote/?${params.toString()}`;
}

/** Incentive link: id= passes the in-game name back as userid on postback. */
export function buildRspsListVoteUrl(username: string): string {
  const name = username.trim();
  const params = new URLSearchParams({
    a: "in",
    u: RSPS_LIST_USERNAME,
    id: name,
  });
  return `https://www.rsps-list.com/index.php?${params.toString()}`;
}

/**
 * TopG incentive entry point: /in-SITEID-PARAMETER. Only this form registers the
 * parameter for the postback (the /server-… listing page does not), which comes
 * back from monitor.topg.org as p_resp.
 */
export function buildTopgVoteUrl(username: string): string {
  // TopG PARAMETER: letters, numbers, underscore only (spaces → _). Do not URL-encode —
  // TopG parses the path segment literally.
  const name = username
    .trim()
    .replace(/-/g, " ")
    .replace(/\s+/g, "_")
    .replace(/[^A-Za-z0-9_]/g, "");
  return `https://topg.org/runescape-private-servers/in-${TOPG_SITE_ID}-${name}`;
}

/**
 * Top100Arena: incentive= is returned as postback= on the Incentive Postback URL.
 * Dashboard Incentive Postback must be exactly:
 *   https://kyrosps.io/api/vote/callback?postback=&site=top100arena
 * The vote page itself is the only place that keeps incentive= through the vote —
 * in.asp drops it on the redirect.
 */
export function buildTop100ArenaVoteUrl(username: string): string | null {
  const id = TOP100ARENA_LISTING_ID;
  if (!id) return null;
  const name = username.trim().replace(/-/g, " ").trim();
  const params = new URLSearchParams({ incentive: name });
  return `https://www.top100arena.com/listing/${id}/vote?${params.toString()}`;
}

export function buildVoteUrl(
  siteId: (typeof VOTE_SITES)[number]["id"],
  username: string,
): string | null {
  const name = username.trim();
  if (!name) return null;
  if (siteId === "rulocus") return buildRulocusVoteUrl(name);
  if (siteId === "rsps-list") return buildRspsListVoteUrl(name);
  if (siteId === "topg") return buildTopgVoteUrl(name);
  if (siteId === "top100arena") return buildTop100ArenaVoteUrl(name);
  return null;
}

export function voteUsernameKey(name: string): string {
  return normalizeUsername(name);
}

/** Canonical site ids — Top100Arena callbacks sometimes land as "top100". */
export function normalizeVoteSite(site: string | undefined | null): string {
  const s = (site || "").trim().toLowerCase();
  if (s === "top100" || s === "top100arena") return "top100arena";
  return s || "rulocus";
}

function storeBase(): string | undefined {
  const raw = process.env.HISCORES_STORE_URL?.trim();
  return raw ? raw.replace(/\/$/, "") : undefined;
}

function storeHeaders(): HeadersInit {
  const pw = process.env.STORE_API_PASSWORD?.trim() || "";
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${pw}`,
  };
}

export async function recordVote(input: {
  username: string;
  ip?: string;
  site?: string;
}): Promise<string> {
  const base = storeBase();
  if (!base) {
    throw new Error("Vote store is not configured (HISCORES_STORE_URL)");
  }
  const username = input.username.trim();
  const site = normalizeVoteSite(input.site);
  const res = await fetch(`${base}/votes`, {
    method: "POST",
    headers: storeHeaders(),
    body: JSON.stringify({
      username,
      usernameKey: voteUsernameKey(username),
      ip: input.ip || "",
      site,
      createdAt: new Date().toISOString(),
    }),
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error(`Vote store failed (${res.status})`);
  }
  const data = (await res.json()) as {
    id?: string;
    duplicate?: boolean;
  };
  // Duplicate within cooldown still returns 200 — no extra reward created.
  return data.id || (data.duplicate ? "duplicate" : "ok");
}

/**
 * Toplist postbacks are impossible to debug from the outside (Cloudflare blocks
 * server-side probes), so every raw callback attempt is kept in the store.
 */
export async function logVoteHit(hit: Record<string, unknown>): Promise<void> {
  const base = storeBase();
  if (!base) return;
  try {
    await fetch(`${base}/vote-hits`, {
      method: "POST",
      headers: storeHeaders(),
      body: JSON.stringify({ source: "web", ...hit }),
      cache: "no-store",
    });
  } catch {
    // Diagnostics must never break a callback.
  }
}

/** Remembers a "Vote now" click so an anonymous postback can still be credited. */
export async function recordVoteIntent(input: {
  username: string;
  site: string;
  ip: string;
}): Promise<void> {
  const base = storeBase();
  if (!base) return;
  const username = input.username.trim();
  if (!username || !input.site) return;
  await fetch(`${base}/vote-intents`, {
    method: "POST",
    headers: storeHeaders(),
    body: JSON.stringify({
      username,
      usernameKey: voteUsernameKey(username),
      site: input.site,
      ip: input.ip,
    }),
    cache: "no-store",
  });
}

export async function lookupVoteIntent(
  site: string,
  ip: string,
): Promise<string | null> {
  const base = storeBase();
  if (!base) return null;
  try {
    const params = new URLSearchParams({ site, ip: ip || "" });
    const res = await fetch(`${base}/vote-intents?${params.toString()}`, {
      headers: storeHeaders(),
      cache: "no-store",
    });
    if (!res.ok) return null;
    const data = (await res.json()) as { intent?: { username?: string } | null };
    return data.intent?.username?.trim() || null;
  } catch {
    return null;
  }
}

type StoredVote = {
  id?: string;
  usernameKey?: string;
  site?: string;
  createdAt?: string;
  claimed?: boolean;
};

function parseVoteTime(ts: string | undefined): number | null {
  if (!ts) return null;
  const ms = Date.parse(ts);
  return Number.isFinite(ms) ? ms : null;
}

/** Per-site cooldown status for the vote page UI. */
export async function getVoteStatus(username: string): Promise<VoteStatusResponse> {
  const base = storeBase();
  if (!base) {
    throw new Error("Vote store is not configured (HISCORES_STORE_URL)");
  }
  const name = username.trim();
  const key = voteUsernameKey(name);
  const params = new URLSearchParams({
    usernameKey: key,
    unclaimed: "0",
  });
  const res = await fetch(`${base}/votes?${params.toString()}`, {
    method: "GET",
    headers: storeHeaders(),
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error(`Vote status failed (${res.status})`);
  }
  const data = (await res.json()) as { votes?: StoredVote[] };
  const votes = data.votes ?? [];
  const now = Date.now();

  const newestBySite = new Map<string, number>();
  for (const v of votes) {
    if ((v.usernameKey || "").toLowerCase() !== key) continue;
    const site = normalizeVoteSite(v.site);
    const t = parseVoteTime(v.createdAt);
    if (t == null) continue;
    const prev = newestBySite.get(site);
    if (prev == null || t > prev) newestBySite.set(site, t);
  }

  const sites = {} as Record<VoteSiteId, VoteSiteStatus>;
  for (const site of VOTE_SITES) {
    const last = newestBySite.get(site.id) ?? null;
    const availableAtMs =
      last != null ? last + site.cooldownHours * 60 * 60 * 1000 : null;
    const available = availableAtMs == null || availableAtMs <= now;
    sites[site.id] = {
      available,
      availableAt: !available && availableAtMs != null
        ? new Date(availableAtMs).toISOString()
        : null,
      lastVotedAt: last != null ? new Date(last).toISOString() : null,
    };
  }

  return {
    username: name,
    cooldownMs: VOTE_COOLDOWN_MS,
    sites,
  };
}

/** Claim all unclaimed votes for a player; returns vote ids (game expects string[]). */
export async function claimVotes(username: string): Promise<string[]> {
  const base = storeBase();
  if (!base) {
    throw new Error("Vote store is not configured (HISCORES_STORE_URL)");
  }
  const res = await fetch(`${base}/votes/claim`, {
    method: "POST",
    headers: storeHeaders(),
    body: JSON.stringify({ usernameKey: voteUsernameKey(username) }),
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error(`Vote claim failed (${res.status})`);
  }
  const data = (await res.json()) as { ids?: string[] };
  return data.ids ?? [];
}

/** Accepts VOTE_CALLBACK_SECRET and optional RSPS_LIST_VOTE_SECRET (comma-separated ok). */
export function verifyVoteSecret(secret: string | null | undefined): boolean {
  if (!secret) return false;
  const candidates = [
    process.env.VOTE_CALLBACK_SECRET,
    process.env.RSPS_LIST_VOTE_SECRET,
  ]
    .flatMap((v) => (v || "").split(","))
    .map((s) => s.trim())
    .filter(Boolean);
  return candidates.includes(secret);
}
