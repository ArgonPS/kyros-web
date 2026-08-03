"use client";

import { useMemo, useState } from "react";
import {
  GAME_MODES,
  HISCORE_SKILLS,
  PLACEHOLDER_HISCORES,
  formatXp,
  type GameMode,
  type HiscoreSkill,
} from "@/lib/hiscores";
import { DISCORD_INVITE } from "@/lib/site";

export function HiscoresBoard() {
  const [skill, setSkill] = useState<HiscoreSkill>("overall");
  const [mode, setMode] = useState<GameMode>("normal");
  const [query, setQuery] = useState("");

  const skillLabel =
    HISCORE_SKILLS.find((s) => s.id === skill)?.label ?? "Overall";
  const modeLabel = GAME_MODES.find((m) => m.id === mode)?.label ?? "Normal";

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return PLACEHOLDER_HISCORES;
    return PLACEHOLDER_HISCORES.filter((r) =>
      r.username.toLowerCase().includes(q),
    );
  }, [query]);

  return (
    <div className="grid gap-8 lg:grid-cols-[220px_1fr]">
      <aside className="panel h-fit p-3">
        <p className="px-2 pb-2 pt-1 font-display text-xs tracking-[0.22em] text-[color:var(--gold)]">
          SKILL
        </p>
        <div className="flex max-h-[28rem] flex-col gap-0.5 overflow-y-auto">
          {HISCORE_SKILLS.map((s) => (
            <button
              key={s.id}
              type="button"
              onClick={() => setSkill(s.id)}
              className={`rounded-sm px-3 py-2 text-left text-sm tracking-wide transition ${
                skill === s.id
                  ? "bg-[rgba(212,168,75,0.14)] text-[color:var(--gold-bright)]"
                  : "text-[color:var(--fg-muted)] hover:bg-white/[0.03] hover:text-[color:var(--fg)]"
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
      </aside>

      <div>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="font-display text-2xl tracking-wide md:text-3xl">
              {skillLabel} leaderboard
            </h2>
            <p className="mt-2 text-sm text-[color:var(--fg-muted)]">
              Gamemode: {modeLabel} · Live ranks unlock with the public world
            </p>
          </div>
          <label className="block text-xs uppercase tracking-[0.16em] text-[color:var(--fg-muted)]">
            Search
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Player name"
              className="mt-2 block w-full min-w-[220px] border border-[color:var(--line)] bg-[color:var(--bg)] px-3 py-2.5 text-sm tracking-normal text-[color:var(--fg)] outline-none focus:border-[color:var(--gold)]"
            />
          </label>
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          {GAME_MODES.map((m) => (
            <button
              key={m.id}
              type="button"
              onClick={() => setMode(m.id)}
              className={`border px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] transition ${
                mode === m.id
                  ? "border-[color:var(--gold)] text-[color:var(--gold)]"
                  : "border-[color:var(--line)] text-[color:var(--fg-muted)] hover:border-[color:var(--gold)]/50 hover:text-[color:var(--fg)]"
              }`}
            >
              {m.label}
            </button>
          ))}
        </div>

        <div className="panel mt-6 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[520px] text-left text-sm">
              <thead>
                <tr className="border-b border-[color:var(--line)] text-xs uppercase tracking-[0.16em] text-[color:var(--fg-muted)]">
                  <th className="px-4 py-3 font-medium">Rank</th>
                  <th className="px-4 py-3 font-medium">Username</th>
                  <th className="px-4 py-3 font-medium">Level</th>
                  <th className="px-4 py-3 font-medium">Experience</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr
                    key={row.rank}
                    className="border-b border-[color:var(--line)]/60 text-[color:var(--fg-muted)] last:border-0"
                  >
                    <td className="px-4 py-3 tabular-nums text-[color:var(--gold)]">
                      {row.rank}
                    </td>
                    <td className="px-4 py-3 text-[color:var(--fg)]">
                      {row.username}
                    </td>
                    <td className="px-4 py-3 tabular-nums">{row.level || "—"}</td>
                    <td className="px-4 py-3 tabular-nums">
                      {row.experience ? formatXp(row.experience) : "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <p className="mt-6 max-w-2xl text-sm text-[color:var(--fg-muted)]">
          Rankings will pull from the Kyros hiscores API once the game server is
          online. In-game{" "}
          <code className="text-[color:var(--gold)]">::hiscores</code> already
          points at this page.{" "}
          <a
            href={DISCORD_INVITE}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[color:var(--gold)] hover:underline"
          >
            Join Discord
          </a>{" "}
          for launch updates.
        </p>
      </div>
    </div>
  );
}
