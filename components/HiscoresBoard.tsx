"use client";

import { useMemo, useState } from "react";
import {
  GAME_MODES,
  HISCORE_BOSSES,
  HISCORE_SKILLS,
  PLACEHOLDER_HISCORES,
  XP_MODES,
  formatXp,
  type BoardTab,
  type GameMode,
  type HiscoreSkill,
  type XpMode,
} from "@/lib/hiscores";
import { DISCORD_INVITE } from "@/lib/site";

export function HiscoresBoard() {
  const [tab, setTab] = useState<BoardTab>("skills");
  const [skill, setSkill] = useState<HiscoreSkill>("overall");
  const [boss, setBoss] = useState(HISCORE_BOSSES[0].id);
  const [mode, setMode] = useState<GameMode>("all");
  const [xpMode, setXpMode] = useState<XpMode>("all");
  const [query, setQuery] = useState("");

  const categoryLabel =
    tab === "skills"
      ? (HISCORE_SKILLS.find((s) => s.id === skill)?.label ?? "Overall")
      : (HISCORE_BOSSES.find((b) => b.id === boss)?.label ?? "Boss");

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return PLACEHOLDER_HISCORES;
    return PLACEHOLDER_HISCORES.filter((r) =>
      r.username.toLowerCase().includes(q),
    );
  }, [query]);

  const sidebarItems =
    tab === "skills"
      ? HISCORE_SKILLS.map((s) => ({ id: s.id, label: s.label }))
      : HISCORE_BOSSES.map((b) => ({ id: b.id, label: b.label }));

  const activeId = tab === "skills" ? skill : boss;

  return (
    <div>
      {/* Skills / Bosses tabs — Reason style */}
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

      {/* Filters */}
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
          <div className="flex max-h-[32rem] flex-col gap-0.5 overflow-y-auto">
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
            Live ranks connect when the world opens — filters are ready now.
          </p>

          <div className="mt-6 overflow-hidden border border-white/10 bg-black/40">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[560px] text-left text-sm">
                <thead>
                  <tr className="border-b border-white/10 bg-white/[0.03] font-display text-xs tracking-[0.16em] text-[color:var(--fg-muted)] uppercase">
                    <th className="px-4 py-3.5 font-medium">Rank</th>
                    <th className="px-4 py-3.5 font-medium">Username</th>
                    <th className="px-4 py-3.5 font-medium">
                      {tab === "skills" ? "Level" : "Kills"}
                    </th>
                    <th className="px-4 py-3.5 font-medium">
                      {tab === "skills" ? "Experience" : "Score"}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row, i) => (
                    <tr
                      key={row.rank}
                      className={`border-b border-white/5 text-[color:var(--fg-muted)] last:border-0 ${
                        i % 2 === 0 ? "bg-transparent" : "bg-white/[0.015]"
                      }`}
                    >
                      <td className="px-4 py-3 tabular-nums text-[color:var(--gold)]">
                        {row.rank}
                      </td>
                      <td className="px-4 py-3 text-white">{row.username}</td>
                      <td className="px-4 py-3 tabular-nums">
                        {row.level || "—"}
                      </td>
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
            Empty ranks are placeholders until the hiscores API is live. In-game{" "}
            <code className="text-[color:var(--gold)]">::hiscores</code> opens
            this page.{" "}
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
    </div>
  );
}
