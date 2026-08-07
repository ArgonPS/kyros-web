import { GAME_MODE_IDS, type HiscorePlayer } from "@/lib/hiscores-data";

/** Skill id in Kyros store → RuneLite HiscoreSkill name */
const SKILL_NAMES: Array<{ id: number; name: string }> = [
  { id: -1, name: "Overall" },
  { id: 0, name: "Attack" },
  { id: 1, name: "Defence" },
  { id: 2, name: "Strength" },
  { id: 3, name: "Hitpoints" },
  { id: 4, name: "Ranged" },
  { id: 5, name: "Prayer" },
  { id: 6, name: "Magic" },
  { id: 7, name: "Cooking" },
  { id: 8, name: "Woodcutting" },
  { id: 9, name: "Fletching" },
  { id: 10, name: "Fishing" },
  { id: 11, name: "Firemaking" },
  { id: 12, name: "Crafting" },
  { id: 13, name: "Smithing" },
  { id: 14, name: "Mining" },
  { id: 15, name: "Herblore" },
  { id: 16, name: "Agility" },
  { id: 17, name: "Thieving" },
  { id: 18, name: "Slayer" },
  { id: 19, name: "Farming" },
  { id: 20, name: "Runecraft" },
  { id: 21, name: "Hunter" },
  { id: 22, name: "Construction" },
];

/**
 * Kyros bossId → RuneLite activity/boss display name (exact match for HiscoreSkill).
 * Custom Kyros-only bosses are omitted.
 */
const ACTIVITY_NAMES: Array<{ id: number; name: string }> = [
  { id: 11, name: "Clue Scrolls (all)" },
  { id: 12, name: "Clue Scrolls (beginner)" },
  { id: 13, name: "Clue Scrolls (easy)" },
  { id: 14, name: "Clue Scrolls (medium)" },
  { id: 15, name: "Clue Scrolls (hard)" },
  { id: 16, name: "Clue Scrolls (elite)" },
  { id: 17, name: "Clue Scrolls (master)" },
  { id: 18, name: "Collections Logged" },
  { id: 1, name: "Abyssal Sire" },
  { id: 2, name: "Alchemical Hydra" },
  { id: 4, name: "Barrows Chests" },
  { id: 5, name: "Callisto" },
  { id: 6, name: "Cerberus" },
  { id: 7, name: "Chambers of Xeric" },
  { id: 8, name: "Chambers of Xeric: Challenge Mode" },
  { id: 9, name: "Chaos Elemental" },
  { id: 10, name: "Chaos Fanatic" },
  { id: 19, name: "Commander Zilyana" },
  { id: 20, name: "Corporeal Beast" },
  { id: 21, name: "Crazy Archaeologist" },
  { id: 22, name: "Dagannoth Prime" },
  { id: 23, name: "Dagannoth Rex" },
  { id: 24, name: "Dagannoth Supreme" },
  { id: 26, name: "Duke Sucellus" },
  { id: 29, name: "General Graardor" },
  { id: 30, name: "Giant Mole" },
  { id: 31, name: "Grotesque Guardians" },
  { id: 33, name: "Kalphite Queen" },
  { id: 34, name: "King Black Dragon" },
  { id: 35, name: "Kraken" },
  { id: 36, name: "Kree'Arra" },
  { id: 37, name: "K'ril Tsutsaroth" },
  { id: 40, name: "Nex" },
  { id: 38, name: "Nightmare" },
  { id: 42, name: "Phantom Muspah" },
  { id: 43, name: "Sarachnis" },
  { id: 44, name: "Scorpia" },
  { id: 45, name: "Skotizo" },
  { id: 46, name: "The Gauntlet" },
  { id: 47, name: "The Corrupted Gauntlet" },
  { id: 39, name: "The Leviathan" },
  { id: 55, name: "The Whisperer" },
  { id: 48, name: "Theatre of Blood" },
  { id: 49, name: "Thermonuclear Smoke Devil" },
  { id: 50, name: "Tombs of Amascut" },
  { id: 32, name: "TzKal-Zuk" },
  { id: 27, name: "TzTok-Jad" },
  { id: 51, name: "Vardorvis" },
  { id: 52, name: "Venenatis" },
  { id: 53, name: "Vet'ion" },
  { id: 54, name: "Vorkath" },
  { id: 56, name: "Wintertodt" },
  { id: 57, name: "Zulrah" },
];

export type IndexLiteSkill = {
  name: string;
  rank: number;
  level: number;
  xp: number;
};

export type IndexLiteActivity = {
  name: string;
  rank: number;
  score: number;
};

export type IndexLiteResponse = {
  skills: IndexLiteSkill[];
  activities: IndexLiteActivity[];
};

/** Map RuneLite endpoint mode query → Kyros gameMode id (or null = any / prefer normal). */
export function resolveGameModeFilter(
  mode: string | null,
): number | null {
  const m = (mode || "").trim().toLowerCase();
  if (!m || m === "normal" || m === "all") return 0;
  if (m === "ironman" || m === "im") return GAME_MODE_IDS.ironman;
  if (m === "hardcore" || m === "hcim" || m === "hardcore_ironman") {
    return GAME_MODE_IDS.hardcore;
  }
  if (m === "ultimate" || m === "uim") return GAME_MODE_IDS.ultimate;
  if (m === "group" || m === "gim") return GAME_MODE_IDS.group_ironman;
  if (m === "hardcore_group" || m === "hcgim") {
    return GAME_MODE_IDS.hardcore_group;
  }
  return 0;
}

function skillValue(p: HiscorePlayer, skillId: number): {
  level: number;
  experience: number;
} {
  const entry = p.skills[String(skillId)];
  if (!entry) {
    return { level: skillId === 3 ? 10 : 1, experience: 0 };
  }
  return { level: entry.level || 0, experience: entry.experience || 0 };
}

function bossScore(p: HiscorePlayer, bossId: number): number {
  return p.bosses[String(bossId)] ?? 0;
}

function rankForSkill(
  pool: HiscorePlayer[],
  player: HiscorePlayer,
  skillId: number,
): number {
  const mine = skillValue(player, skillId);
  if (mine.level <= 0 && mine.experience <= 0) return -1;

  const ranked = pool
    .map((p) => ({ p, ...skillValue(p, skillId) }))
    .filter((r) => r.level > 0 || r.experience > 0)
    .sort((a, b) => {
      if (b.level !== a.level) return b.level - a.level;
      return b.experience - a.experience;
    });

  const idx = ranked.findIndex(
    (r) =>
      r.p.usernameKey === player.usernameKey &&
      r.p.gameMode === player.gameMode &&
      r.p.gameExperienceMode === player.gameExperienceMode,
  );
  return idx >= 0 ? idx + 1 : -1;
}

function rankForBoss(
  pool: HiscorePlayer[],
  player: HiscorePlayer,
  bossId: number,
): number {
  const mine = bossScore(player, bossId);
  if (mine <= 0) return -1;

  const ranked = pool
    .map((p) => ({ p, score: bossScore(p, bossId) }))
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score);

  const idx = ranked.findIndex(
    (r) =>
      r.p.usernameKey === player.usernameKey &&
      r.p.gameMode === player.gameMode &&
      r.p.gameExperienceMode === player.gameExperienceMode,
  );
  return idx >= 0 ? idx + 1 : -1;
}

export function buildIndexLite(
  player: HiscorePlayer,
  pool: HiscorePlayer[],
): IndexLiteResponse {
  const skills: IndexLiteSkill[] = SKILL_NAMES.map(({ id, name }) => {
    const { level, experience } = skillValue(player, id);
    return {
      name,
      rank: rankForSkill(pool, player, id),
      level,
      xp: experience,
    };
  });

  const activities: IndexLiteActivity[] = ACTIVITY_NAMES.map(
    ({ id, name }) => {
      const score = bossScore(player, id);
      return {
        name,
        rank: rankForBoss(pool, player, id),
        score: score > 0 ? score : -1,
      };
    },
  );

  return { skills, activities };
}
