import type { GameMode, HiscoreSkill, XpMode } from "@/lib/hiscores";

/** Skill slug → game skillId (-1 overall, else StatType ordinal). */
export const SKILL_IDS: Record<HiscoreSkill, number> = {
  overall: -1,
  attack: 0,
  defence: 1,
  strength: 2,
  hitpoints: 3,
  ranged: 4,
  prayer: 5,
  magic: 6,
  cooking: 7,
  woodcutting: 8,
  fletching: 9,
  fishing: 10,
  firemaking: 11,
  crafting: 12,
  smithing: 13,
  mining: 14,
  herblore: 15,
  agility: 16,
  thieving: 17,
  slayer: 18,
  farming: 19,
  runecraft: 20,
  hunter: 21,
  construction: 22,
};

/** Boss slug → numeric bossId from Hiscores.java */
export const BOSS_IDS: Record<string, number> = {
  abyssal_sire: 1,
  alchemical_hydra: 2,
  argentavis: 3,
  barrows_chests: 4,
  callisto: 5,
  cerberus: 6,
  cox: 7,
  cox_olm: 8,
  chaos_elemental: 9,
  chaos_fanatic: 10,
  clue_all: 11,
  clue_beginner: 12,
  clue_easy: 13,
  clue_medium: 14,
  clue_hard: 15,
  clue_elite: 16,
  clue_master: 17,
  collections: 18,
  commander_zilyana: 19,
  corp: 20,
  crazy_archaeologist: 21,
  dagannoth_prime: 22,
  dagannoth_rex: 23,
  dagannoth_supreme: 24,
  demonic_gorilla: 25,
  duke_sucellus: 26,
  fight_caves: 27,
  galvek: 28,
  general_graardor: 29,
  giant_mole: 30,
  grotesque_guardians: 31,
  inferno: 32,
  kalphite_queen: 33,
  king_black_dragon: 34,
  kraken: 35,
  kreearra: 36,
  kril: 37,
  nightmare: 38,
  leviathan: 39,
  nex: 40,
  ophidia: 41,
  phantom_muspah: 42,
  sarachnis: 43,
  scorpia: 44,
  skotizo: 45,
  gauntlet: 46,
  corrupted_gauntlet: 47,
  tob: 48,
  thermy: 49,
  toa: 50,
  vardorvis: 51,
  venenatis: 52,
  vetion: 53,
  vorkath: 54,
  whisperer: 55,
  wintertodt: 56,
  zulrah: 57,
  dominion_of_echoes: 58,
};

/** Matches Hiscores.java gameMode switch */
export const GAME_MODE_IDS: Record<Exclude<GameMode, "all">, number> = {
  normal: 0,
  ironman: 1,
  group_ironman: 2,
  hardcore: 3,
  hardcore_group: 4,
  ultimate: 5,
};

/** Matches Difficulty.ordinal() (OSRS = Insane = 4) */
export const XP_MODE_IDS: Record<Exclude<XpMode, "all">, number> = {
  easy: 0,
  intermediate: 1,
  hard: 2,
  extreme: 3,
  insane: 4,
};

/** Reason-style column label for boss tables */
export const BOSS_METRICS: Record<string, string> = {
  barrows_chests: "Chests Opened",
  cox: "Raid Completions",
  cox_olm: "Raid Completions",
  clue_all: "Completions",
  clue_beginner: "Completions",
  clue_easy: "Completions",
  clue_medium: "Completions",
  clue_hard: "Completions",
  clue_elite: "Completions",
  clue_master: "Completions",
  collections: "Collections",
  fight_caves: "Completions",
  inferno: "Completions",
  gauntlet: "Completions",
  corrupted_gauntlet: "Completions",
  tob: "Raid Completions",
  toa: "Raid Completions",
};

export type SkillEntry = { level: number; experience: number };

export type HiscorePlayer = {
  username: string;
  usernameKey: string;
  gameMode: number;
  gameRank: number;
  gameExperienceMode: number;
  skills: Record<string, SkillEntry>;
  bosses: Record<string, number>;
  updatedAt: string;
};

export type HiscoreDatabase = {
  players: Record<string, HiscorePlayer>;
};

export function playerKey(
  usernameKey: string,
  gameMode: number,
  gameExperienceMode: number,
): string {
  return `${usernameKey}|${gameMode}|${gameExperienceMode}`;
}

export function emptyDatabase(): HiscoreDatabase {
  return { players: {} };
}
