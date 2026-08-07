"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  BOSS_METRICS,
  SKILL_IDS,
  BOSS_IDS,
  type HiscorePlayer,
} from "@/lib/hiscores-data";
import {
  formatXp,
  GAME_MODE_LABELS,
  HISCORE_BOSSES,
  HISCORE_SKILLS,
  profileHref,
  XP_MODE_LABELS,
} from "@/lib/hiscores";

type ProfileTab = "skills" | "bosses";

type Sibling = {
  gameMode: number;
  gameExperienceMode: number;
  updatedAt: string;
};

export function HiscoreProfile({
  username,
  initialMode,
  initialXp,
}: {
  username: string;
  initialMode?: number | null;
  initialXp?: number | null;
}) {
  const [tab, setTab] = useState<ProfileTab>("skills");
  const [player, setPlayer] = useState<HiscorePlayer | null>(null);
  const [siblings, setSiblings] = useState<Sibling[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [mode, setMode] = useState<number | null>(initialMode ?? null);
  const [xp, setXp] = useState<number | null>(initialXp ?? null);

  useEffect(() => {
    const controller = new AbortController();
    const params = new URLSearchParams({ username });
    if (mode != null) params.set("mode", String(mode));
    if (xp != null) params.set("xp", String(xp));

    setLoading(true);
    setError(null);

    fetch(`/api/hiscores/player?${params}`, { signal: controller.signal })
      .then(async (res) => {
        const data = (await res.json()) as {
          player?: HiscorePlayer;
          siblings?: Sibling[];
          error?: string;
        };
        if (!res.ok) throw new Error(data.error || "Player not found");
        setPlayer(data.player ?? null);
        setSiblings(data.siblings ?? []);
      })
      .catch((err: unknown) => {
        if (err instanceof DOMException && err.name === "AbortError") return;
        setPlayer(null);
        setError(err instanceof Error ? err.message : "Failed to load");
      })
      .finally(() => setLoading(false));

    return () => controller.abort();
  }, [username, mode, xp]);

  const skillRows = useMemo(() => {
    if (!player) return [];
    return HISCORE_SKILLS.map((s) => {
      const id = SKILL_IDS[s.id];
      const entry = player.skills[String(id)] ?? { level: 0, experience: 0 };
      return {
        label: s.label,
        level: entry.level,
        experience: entry.experience,
      };
    });
  }, [player]);

  const bossRows = useMemo(() => {
    if (!player) return [];
    return HISCORE_BOSSES.map((b) => {
      const id = BOSS_IDS[b.id];
      const amount = player.bosses[String(id)] ?? 0;
      return {
        label: b.label,
        metric: BOSS_METRICS[b.id] || "Kills",
        amount,
      };
    }).filter((r) => r.amount > 0);
  }, [player]);

  return (
    <div>
      <Link
        href="/hiscores"
        className="text-sm text-[color:var(--gold)] hover:underline"
      >
        ← Back to hiscores
      </Link>

      <h1 className="mt-4 font-display text-3xl tracking-[0.08em] text-white uppercase md:text-5xl">
        {username}&apos;s Profile
      </h1>

      {loading ? (
        <p className="mt-4 text-sm text-[color:var(--fg-muted)]">Loading…</p>
      ) : error || !player ? (
        <p className="mt-4 text-sm text-red-400">
          {error || "Player not found. Rankings update when players log out."}
        </p>
      ) : (
        <>
          <div className="mt-4 flex flex-wrap gap-4 text-sm text-[color:var(--fg-muted)]">
            <p>
              XP Mode:{" "}
              <span className="text-[color:var(--gold)]">
                {XP_MODE_LABELS[player.gameExperienceMode] ?? "Unknown"}
              </span>
            </p>
            <p>
              Game Mode:{" "}
              <span className="text-[color:var(--gold)]">
                {GAME_MODE_LABELS[player.gameMode] ?? "Unknown"}
              </span>
            </p>
            <p>
              Updated:{" "}
              <span className="text-white/80">
                {new Date(player.updatedAt).toLocaleString()}
              </span>
            </p>
          </div>

          {siblings.length > 1 ? (
            <div className="mt-4 flex flex-wrap gap-2">
              {siblings.map((s) => {
                const active =
                  s.gameMode === player.gameMode &&
                  s.gameExperienceMode === player.gameExperienceMode;
                return (
                  <Link
                    key={`${s.gameMode}-${s.gameExperienceMode}`}
                    href={profileHref(
                      username,
                      s.gameMode,
                      s.gameExperienceMode,
                    )}
                    onClick={(e) => {
                      e.preventDefault();
                      setMode(s.gameMode);
                      setXp(s.gameExperienceMode);
                      window.history.replaceState(
                        null,
                        "",
                        profileHref(username, s.gameMode, s.gameExperienceMode),
                      );
                    }}
                    className={`border px-3 py-1.5 text-xs tracking-wide transition ${
                      active
                        ? "border-[color:var(--gold)] bg-[rgba(224,180,74,0.16)] text-[color:var(--gold-bright)]"
                        : "border-white/15 text-white/70 hover:border-[color:var(--gold)]"
                    }`}
                  >
                    {GAME_MODE_LABELS[s.gameMode] ?? s.gameMode} ·{" "}
                    {XP_MODE_LABELS[s.gameExperienceMode] ?? s.gameExperienceMode}
                  </Link>
                );
              })}
            </div>
          ) : null}

          <div className="mt-8 flex flex-wrap gap-2 border-b border-white/10 pb-4">
            {(
              [
                { id: "skills" as const, label: "Stats" },
                { id: "bosses" as const, label: "Boss Kills" },
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

          <div className="mt-6 overflow-hidden border border-white/10 bg-black/40">
            <div className="overflow-x-auto">
              {tab === "skills" ? (
                <table className="w-full min-w-[520px] text-left text-sm">
                  <thead>
                    <tr className="border-b border-white/10 bg-white/[0.03] font-display text-xs tracking-[0.16em] text-[color:var(--fg-muted)] uppercase">
                      <th className="px-4 py-3.5 font-medium">Skill</th>
                      <th className="px-4 py-3.5 font-medium">Level</th>
                      <th className="px-4 py-3.5 font-medium">Experience</th>
                    </tr>
                  </thead>
                  <tbody>
                    {skillRows.map((row, i) => (
                      <tr
                        key={row.label}
                        className={`border-b border-white/5 text-[color:var(--fg-muted)] last:border-0 ${
                          i % 2 === 0 ? "bg-transparent" : "bg-white/[0.015]"
                        }`}
                      >
                        <td className="px-4 py-3 text-white">{row.label}</td>
                        <td className="px-4 py-3 tabular-nums text-[color:var(--gold)]">
                          {formatXp(row.level)}
                        </td>
                        <td className="px-4 py-3 tabular-nums">
                          {formatXp(row.experience)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <table className="w-full min-w-[560px] text-left text-sm">
                  <thead>
                    <tr className="border-b border-white/10 bg-white/[0.03] font-display text-xs tracking-[0.16em] text-[color:var(--fg-muted)] uppercase">
                      <th className="px-4 py-3.5 font-medium">Boss</th>
                      <th className="px-4 py-3.5 font-medium">Column</th>
                      <th className="px-4 py-3.5 font-medium">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bossRows.length === 0 ? (
                      <tr>
                        <td
                          colSpan={3}
                          className="px-4 py-8 text-[color:var(--fg-muted)]"
                        >
                          No boss kills recorded yet.
                        </td>
                      </tr>
                    ) : (
                      bossRows.map((row, i) => (
                        <tr
                          key={row.label}
                          className={`border-b border-white/5 text-[color:var(--fg-muted)] last:border-0 ${
                            i % 2 === 0 ? "bg-transparent" : "bg-white/[0.015]"
                          }`}
                        >
                          <td className="px-4 py-3 text-white">{row.label}</td>
                          <td className="px-4 py-3">{row.metric}</td>
                          <td className="px-4 py-3 tabular-nums text-[color:var(--gold)]">
                            {formatXp(row.amount)}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
