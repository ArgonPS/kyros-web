"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type FormEvent,
} from "react";
import {
  VOTE_SITES,
  VOTE_POINTS_PER_SITE,
  buildVoteUrl,
  type VoteSiteId,
  type VoteStatusResponse,
} from "@/lib/votes";

function formatCountdown(ms: number): string {
  const total = Math.max(0, Math.floor(ms / 1000));
  const h = Math.floor(total / 3600);
  const m = Math.floor((total % 3600) / 60);
  const s = total % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

export function VoteLinks({ initialUsername = "" }: { initialUsername?: string }) {
  const [username, setUsername] = useState(initialUsername);
  const [started, setStarted] = useState(Boolean(initialUsername.trim()));
  const [status, setStatus] = useState<VoteStatusResponse | null>(null);
  const [statusError, setStatusError] = useState<string | null>(null);
  const [now, setNow] = useState(() => Date.now());

  const name = username.trim();
  const ready = name.length > 0;

  const totalPossible = useMemo(
    () => VOTE_SITES.length * VOTE_POINTS_PER_SITE,
    [],
  );

  const fetchStatus = useCallback(async (player: string) => {
    try {
      setStatusError(null);
      const res = await fetch(
        `/api/vote/status?username=${encodeURIComponent(player)}`,
        { cache: "no-store" },
      );
      if (!res.ok) {
        throw new Error("Could not load vote status");
      }
      const data = (await res.json()) as VoteStatusResponse;
      setStatus(data);
    } catch {
      setStatusError("Could not load cooldowns — you can still vote.");
      setStatus(null);
    }
  }, []);

  useEffect(() => {
    if (!started || !name) return;
    void fetchStatus(name);
  }, [started, name, fetchStatus]);

  useEffect(() => {
    if (!started || !name) return;
    let pending = 0;
    const onVisible = () => {
      if (document.visibilityState !== "visible") return;
      void fetchStatus(name);
      // The postback can land a few seconds after the vote finishes.
      window.clearTimeout(pending);
      pending = window.setTimeout(() => void fetchStatus(name), 6000);
    };
    document.addEventListener("visibilitychange", onVisible);
    window.addEventListener("focus", onVisible);
    const poll = window.setInterval(() => {
      if (document.visibilityState === "visible") void fetchStatus(name);
    }, 30000);
    return () => {
      document.removeEventListener("visibilitychange", onVisible);
      window.removeEventListener("focus", onVisible);
      window.clearTimeout(pending);
      window.clearInterval(poll);
    };
  }, [started, name, fetchStatus]);

  useEffect(() => {
    if (!started) return;
    const id = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(id);
  }, [started]);

  // When a timer hits zero, refresh from server so available flips cleanly
  useEffect(() => {
    if (!status || !name) return;
    const due = Object.values(status.sites).some((s) => {
      if (!s.availableAt) return false;
      const t = Date.parse(s.availableAt);
      return Number.isFinite(t) && t <= now && !s.available;
    });
    if (due) void fetchStatus(name);
  }, [now, status, name, fetchStatus]);

  function continueToVoting(e: FormEvent) {
    e.preventDefault();
    if (!ready) return;
    setStarted(true);
  }

  function siteCooldownMs(siteId: VoteSiteId): number {
    const site = status?.sites[siteId];
    if (!site?.availableAt) return 0;
    const t = Date.parse(site.availableAt);
    if (!Number.isFinite(t)) return 0;
    return Math.max(0, t - now);
  }

  function isOnCooldown(siteId: VoteSiteId): boolean {
    const site = status?.sites[siteId];
    if (!site) return false;
    if (!site.available) return siteCooldownMs(siteId) > 0;
    return false;
  }

  if (!started) {
    return (
      <div className="mx-auto max-w-lg">
        <p className="text-center text-[color:var(--fg-muted)]">
          Please enter your in-game username.
        </p>
        <form onSubmit={continueToVoting} className="mt-6 space-y-4">
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
            Continue to Voting
          </button>
        </form>
        <p className="mt-6 text-center text-sm text-[color:var(--fg-muted)]">
          Each toplist is worth{" "}
          <span className="text-[color:var(--gold)]">
            {VOTE_POINTS_PER_SITE} vote points
          </span>
          . Vote all {VOTE_SITES.length} for up to{" "}
          <span className="text-[color:var(--gold)]">{totalPossible} points</span>
          , then type{" "}
          <code className="text-[color:var(--gold)]">::claimvote</code> in-game.
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl">
      <div className="flex flex-col gap-3 border border-[color:var(--line)] bg-black/40 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-display text-xs tracking-[0.16em] text-[color:var(--fg-muted)] uppercase">
            Voting as
          </p>
          <p className="mt-1 font-display text-2xl text-[color:var(--gold)]">
            {name}
          </p>
        </div>
        <button
          type="button"
          onClick={() => {
            setStarted(false);
            setStatus(null);
            setStatusError(null);
          }}
          className="btn-ghost shrink-0 text-xs"
        >
          Change name
        </button>
      </div>

      <p className="mt-6 text-sm text-[color:var(--fg-muted)]">
        Vote on each site below — every completed vote gives{" "}
        <span className="text-[color:var(--gold)]">
          {VOTE_POINTS_PER_SITE} vote points
        </span>
        . When you&apos;re done, type{" "}
        <code className="text-[color:var(--gold)]">::claimvote</code> in-game.
      </p>
      {statusError ? (
        <p className="mt-2 text-sm text-[color:var(--fg-muted)]">{statusError}</p>
      ) : null}

      <ul className="mt-6">
        {VOTE_SITES.map((site, index) => {
          const voteUrl = buildVoteUrl(site.id, name);
          const cooling = isOnCooldown(site.id);
          const remaining = siteCooldownMs(site.id);
          return (
            <li
              key={site.id}
              className={`flex flex-col gap-3 border-t border-[color:var(--line)] py-6 sm:flex-row sm:items-center sm:justify-between ${
                cooling ? "opacity-55" : ""
              }`}
            >
              <div className="min-w-0">
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <h2 className="font-display text-xl text-[color:var(--fg)]">
                    {index + 1}. {site.name}
                  </h2>
                  <span className="font-display text-sm tracking-wide text-[color:var(--gold)]">
                    +{VOTE_POINTS_PER_SITE} points
                  </span>
                </div>
                <p className="mt-1 text-sm text-[color:var(--fg-muted)]">
                  {cooling
                    ? `Voted — next vote in ${formatCountdown(remaining)}`
                    : site.note}
                </p>
              </div>
              {cooling ? (
                <span className="inline-flex shrink-0 items-center justify-center border border-white/10 bg-white/5 px-4 py-3 font-display text-xs tracking-[0.12em] text-[color:var(--fg-muted)] uppercase tabular-nums">
                  {formatCountdown(remaining)} remaining
                </span>
              ) : voteUrl ? (
                <a
                  href={voteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary shrink-0 text-center text-xs"
                  onClick={() => {
                    void fetch("/api/vote/intent", {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({ username: name, site: site.id }),
                      keepalive: true,
                    }).catch(() => {});
                    // Refresh soon after they leave so callback can grey the button
                    window.setTimeout(() => void fetchStatus(name), 8000);
                  }}
                >
                  Vote now
                </a>
              ) : site.id === "top100arena" ? (
                <span className="btn-ghost pointer-events-none text-xs opacity-50">
                  Listing pending
                </span>
              ) : (
                <span className="btn-ghost pointer-events-none text-xs opacity-50">
                  Enter username
                </span>
              )}
            </li>
          );
        })}
      </ul>

      <div className="mt-8 border border-[color:var(--line)] bg-[color:var(--bg-elevated)] px-5 py-4 text-sm text-[color:var(--fg-muted)]">
        <p>
          Max from all sites:{" "}
          <span className="text-[color:var(--gold)]">
            {totalPossible} vote points
          </span>{" "}
          every 12 hours (1 vote per site).
        </p>
        <p className="mt-2">
          After voting, return in-game and use{" "}
          <code className="text-[color:var(--gold)]">::claimvote</code>.
        </p>
      </div>
    </div>
  );
}
