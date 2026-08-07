import { NextResponse } from "next/server";
import {
  BOSS_IDS,
  GAME_MODE_IDS,
  SKILL_IDS,
  XP_MODE_IDS,
} from "@/lib/hiscores-data";
import { loadDatabase } from "@/lib/hiscores-store";
import type { GameMode, HiscoreSkill, XpMode } from "@/lib/hiscores";

export const runtime = "nodejs";

const LIMIT = 25;

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const tab = searchParams.get("tab") === "bosses" ? "bosses" : "skills";
    const skill = (searchParams.get("skill") || "overall") as HiscoreSkill;
    const boss = searchParams.get("boss") || "abyssal_sire";
    const mode = (searchParams.get("mode") || "all") as GameMode;
    const xp = (searchParams.get("xp") || "all") as XpMode;
    const q = (searchParams.get("q") || "").trim().toLowerCase();

    const db = await loadDatabase();
    let rows = Object.values(db.players);

    if (mode !== "all" && mode in GAME_MODE_IDS) {
      const id = GAME_MODE_IDS[mode as Exclude<GameMode, "all">];
      rows = rows.filter((p) => p.gameMode === id);
    }
    if (xp !== "all" && xp in XP_MODE_IDS) {
      const id = XP_MODE_IDS[xp as Exclude<XpMode, "all">];
      rows = rows.filter((p) => p.gameExperienceMode === id);
    }
    if (q) {
      rows = rows.filter((p) => p.usernameKey.includes(q));
    }

    type Ranked = {
      rank: number;
      username: string;
      level: number;
      experience: number;
      gameMode: number;
      gameExperienceMode: number;
    };

    let ranked: Ranked[];

    if (tab === "skills") {
      const skillId = SKILL_IDS[skill] ?? -1;
      const key = String(skillId);
      ranked = rows
        .map((p) => {
          const entry = p.skills[key] ?? { level: 0, experience: 0 };
          return {
            username: p.username,
            level: entry.level,
            experience: entry.experience,
            gameMode: p.gameMode,
            gameExperienceMode: p.gameExperienceMode,
          };
        })
        .filter((r) => r.level > 0 || r.experience > 0)
        .sort((a, b) => {
          if (b.level !== a.level) return b.level - a.level;
          return b.experience - a.experience;
        })
        .slice(0, LIMIT)
        .map((r, i) => ({ rank: i + 1, ...r }));
    } else {
      const bossId = BOSS_IDS[boss] ?? 1;
      const key = String(bossId);
      ranked = rows
        .map((p) => {
          const kills = p.bosses[key] ?? 0;
          return {
            username: p.username,
            level: kills,
            experience: kills,
            gameMode: p.gameMode,
            gameExperienceMode: p.gameExperienceMode,
          };
        })
        .filter((r) => r.level > 0)
        .sort((a, b) => b.level - a.level)
        .slice(0, LIMIT)
        .map((r, i) => ({ rank: i + 1, ...r }));
    }

    while (ranked.length < LIMIT) {
      ranked.push({
        rank: ranked.length + 1,
        username: "-",
        level: 0,
        experience: 0,
        gameMode: 0,
        gameExperienceMode: 0,
      });
    }

    return NextResponse.json({ rows: ranked });
  } catch (err) {
    console.error("hiscores get error", err);
    const message =
      err instanceof Error ? err.message : "Unable to load hiscores";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
