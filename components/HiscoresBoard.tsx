"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  GAME_MODE_LABELS,
  GAME_MODES,
  HISCORE_BOSSES,
  HISCORE_SKILLS,
  XP_MODE_LABELS,
  XP_MODES,
  formatXp,
  profileHref,
  type BoardTab,
  type GameMode,
  type HiscoreRow,
  type HiscoreSkill,
  type XpMode,
} from "@/lib/hiscores";
import { DISCORD_INVITE } from "@/lib/site";

const EMPTY_ROWS: HiscoreRow[] = Array.from({ length: 25 }, (_, i) => ({
  rank: i + 1,
  username: "-",
  level: 0,
  experience: 0,
}));

export function HiscoresBoard() {
  const [tab, setTab] = useState<BoardTab>("skills");
  const [skill, setSkill] = useState<HiscoreSkill>("overall");
  const [boss, setBoss] = useState(HISCORE_BOSSES[0].id);
  const [mode, setMode] = useState<GameMode>("all");
  const [xpMode, setXpMode] = useState<XpMode>("all");
  const [query, setQuery] = useState("");
  const [rows, setRows] = useState<HiscoreRow[]>(EMPTY_ROWS);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const categoryLabel =
    tab === "skills"
      ? (HISCORE_SKILLS.find((s) => s.id === skill)?.label ?? "Overall")
      : (HISCORE_BOSSES.find((b) => b.id === boss)?.label ?? "Boss");

  useEffect(() => {
    const controller = new AbortController();
    const params = new URLSearchParams({
      tab,
      skill,
      boss,
      mode,
      xp: xpMode,
      q: query.trim(),
    });

    setLoading(true);
    setError(null);

    const timer = setTimeout(() => {
      fetch(`/api/hiscores?${params}`, { signal: controller.signal })
        .then(async (res) => {
          const data = (await res.json()) as {
            rows?: HiscoreRow[];
            error?: string;
          };
          if (!res.ok) throw new Error(data.error || "Failed to load");
          setRows(data.rows?.length ? data.rows : EMPTY_ROWS);
        })
        .catch((err: unknown) => {
          if (err instanceof DOMException && err.name === "AbortError") return;
          setError(err instanceof Error ? err.message : "Failed to load");
          setRows(EMPTY_ROWS);
        })
        .finally(() => setLoading(false));
    }, 200);

    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [tab, skill, boss, mode, xpMode, query]);

  const sidebarItems =
    tab === "skills"
      ? HISCORE_SKILLS.map((s) => ({ id: s.id, label: s.label }))
      : HISCORE_BOSSES.map((b) => ({ id: b.id, label: b.label }));

  const activeId = tab === "skills" ? skill : boss;

  return (
    <div>
      <div className="flex flex-wrap gap-2 border-b border-white/10 pb-4">
        {(
          [
            { id: "skills" as const, label: "Skills Hiscores" },
            { id: "bosses" as const, label: "Boss Hiscores" },
          ] as const
        ).map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setTab(t.id)}
            className={`font-display px-5 py-2.5 text-sm tracking-[0.14em] uppercase transition ${
              tab === t.id
                ? "bg-[color:var(--gold)] text-black"
                : "border border-white/15 text-white/70 hover:border-[color:var(--gold)] hover:text-white"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <label className="block text-xs font-display tracking-[0.16em] text-[color:var(--fg-muted)] uppercase">
          XP Mode
          <select
            value={xpMode}
            onChange={(e) => setXpMode(e.target.value as XpMode)}
            className="mt-2 block w-full border border-white/15 bg-black px-3 py-2.5 text-sm tracking-normal text-white outline-none focus:border-[color:var(--gold)]"
          >
            {XP_MODES.map((x) => (
              <option key={x.id} value={x.id}>
                {x.label}
              </option>
            ))}
          </select>
        </label>

        <label className="block text-xs font-display tracking-[0.16em] text-[color:var(--fg-muted)] uppercase">
          Gamemode
          <select
            value={mode}
            onChange={(e) => setMode(e.target.value as GameMode)}
            className="mt-2 block w-full border border-white/15 bg-black px-3 py-2.5 text-sm tracking-normal text-white outline-none focus:border-[color:var(--gold)]"
          >
            {GAME_MODES.map((m) => (
              <option key={m.id} value={m.id}>
                {m.label}
              </option>
            ))}
          </select>
        </label>

        <label className="block text-xs font-display tracking-[0.16em] text-[color:var(--fg-muted)] uppercase sm:col-span-2 lg:col-span-1">
          Search player
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Username"
            className="mt-2 block w-full border border-white/15 bg-black px-3 py-2.5 text-sm tracking-normal text-white outline-none focus:border-[color:var(--gold)]"
          />
        </label>
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-[240px_1fr]">
        <aside className="h-fit border border-white/10 bg-black/50 p-3">
          <p className="px-2 pb-3 pt-1 font-display text-xs tracking-[0.22em] text-[color:var(--gold)] uppercase">
            {tab === "skills" ? "Skills" : "Bosses"}
          </p>
          <div className="flex flex-col gap-0.5">
            {sidebarItems.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  if (tab === "skills") setSkill(item.id as HiscoreSkill);
                  else setBoss(item.id);
                }}
                className={`px-3 py-2 text-left text-sm tracking-wide transition ${
                  activeId === item.id
                    ? "bg-[rgba(224,180,74,0.16)] text-[color:var(--gold-bright)]"
                    : "text-[color:var(--fg-muted)] hover:bg-white/[0.04] hover:text-white"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </aside>

        <div>
          <h2 className="font-display text-2xl tracking-[0.08em] text-white uppercase md:text-3xl">
            {categoryLabel} Hiscores
          </h2>
          <p className="mt-2 text-sm text-[color:var(--fg-muted)]">
            {loading
              ? "Loading ranks…"
              : "Click a username for full stats. Ranks update on logout."}
            {error ? (
              <span className="mt-1 block text-red-400">{error}</span>
            ) : null}
          </p>

          <div className="mt-6 overflow-hidden border border-white/10 bg-black/40">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[640px] text-left text-sm">
                <thead>
                  <tr className="border-b border-white/10 bg-white/[0.03] font-display text-xs tracking-[0.16em] text-[color:var(--fg-muted)] uppercase">
                    <th className="px-4 py-3.5 font-medium">Rank</th>
                    <th className="px-4 py-3.5 font-medium">Username</th>
                    <th className="px-4 py-3.5 font-medium">Mode</th>
                    <th className="px-4 py-3.5 font-medium">
                      {tab === "skills" ? "Level" : "Kills"}
                    </th>
                    <th className="px-4 py-3.5 font-medium">
                      {tab === "skills" ? "Experience" : "Score"}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row, i) => {
                    const empty = !row.username || row.username === "-";
                    return (
                      <tr
                        key={`${row.rank}-${row.username}-${row.gameMode ?? 0}-${row.gameExperienceMode ?? 0}`}
                        className={`border-b border-white/5 text-[color:var(--fg-muted)] last:border-0 ${
                          i % 2 === 0 ? "bg-transparent" : "bg-white/[0.015]"
                        }`}
                      >
                        <td className="px-4 py-3 tabular-nums text-[color:var(--gold)]">
                          {row.rank}
                        </td>
                        <td className="px-4 py-3 text-white">
                          {empty ? (
                            "-"
                          ) : (
                            <Link
                              href={profileHref(
                                row.username,
                                row.gameMode,
                                row.gameExperienceMode,
                              )}
                              className="hover:text-[color:var(--gold)] hover:underline"
                            >
                              {row.username}
                            </Link>
                          )}
                        </td>
                        <td className="px-4 py-3 text-xs">
                          {empty ? (
                            "—"
                          ) : (
                            <span title={XP_MODE_LABELS[row.gameExperienceMode ?? 0]}>
                              {GAME_MODE_LABELS[row.gameMode ?? 0] ?? "—"}
                            </span>
                          )}
                        </td>
                        <td className="px-4 py-3 tabular-nums">
                          {row.level || "—"}
                        </td>
                        <td className="px-4 py-3 tabular-nums">
                          {row.experience ? formatXp(row.experience) : "—"}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          <p className="mt-6 max-w-2xl text-sm text-[color:var(--fg-muted)]">
            In-game{" "}
            <code className="text-[color:var(--gold)]">::hiscores</code> opens
            this page. Staff accounts are not ranked. Hardcore ironmen are under{" "}
            <strong className="font-medium text-white/80">Hardcore Ironman</strong>
            , not the regular Ironman filter.{" "}
            <a
              href={DISCORD_INVITE}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[color:var(--gold)] hover:underline"
            >
              Join Discord
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
