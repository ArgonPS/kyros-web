export type BoardTab = "skills" | "bosses";

export type GameMode =
  | "all"
  | "normal"
  | "ironman"
  | "group_ironman"
  | "hardcore"
  | "hardcore_group"
  | "ultimate";

export type XpMode = "all" | "easy" | "intermediate" | "hard" | "extreme";

export type HiscoreSkill =
  | "overall"
  | "attack"
  | "defence"
  | "strength"
  | "hitpoints"
  | "ranged"
  | "prayer"
  | "magic"
  | "cooking"
  | "woodcutting"
  | "fletching"
  | "fishing"
  | "firemaking"
  | "crafting"
  | "smithing"
  | "mining"
  | "herblore"
  | "agility"
  | "thieving"
  | "slayer"
  | "farming"
  | "runecraft"
  | "hunter"
  | "construction";

export type HiscoreRow = {
  rank: number;
  username: string;
  level: number;
  experience: number;
};

export const GAME_MODES: { id: GameMode; label: string }[] = [
  { id: "all", label: "Every Mode" },
  { id: "normal", label: "Normal" },
  { id: "ironman", label: "Ironman" },
  { id: "group_ironman", label: "Group Ironman" },
  { id: "hardcore", label: "Hardcore Ironman" },
  { id: "hardcore_group", label: "Hardcore Group Ironman" },
  { id: "ultimate", label: "Ultimate Ironman" },
];

export const XP_MODES: { id: XpMode; label: string }[] = [
  { id: "all", label: "Every Experience" },
  { id: "easy", label: "Easy" },
  { id: "intermediate", label: "Intermediate" },
  { id: "hard", label: "Hard" },
  { id: "extreme", label: "Extreme" },
];

export const HISCORE_SKILLS: { id: HiscoreSkill; label: string }[] = [
  { id: "overall", label: "Overall" },
  { id: "attack", label: "Attack" },
  { id: "defence", label: "Defence" },
  { id: "strength", label: "Strength" },
  { id: "hitpoints", label: "Hitpoints" },
  { id: "ranged", label: "Ranged" },
  { id: "prayer", label: "Prayer" },
  { id: "magic", label: "Magic" },
  { id: "cooking", label: "Cooking" },
  { id: "woodcutting", label: "Woodcutting" },
  { id: "fletching", label: "Fletching" },
  { id: "fishing", label: "Fishing" },
  { id: "firemaking", label: "Firemaking" },
  { id: "crafting", label: "Crafting" },
  { id: "smithing", label: "Smithing" },
  { id: "mining", label: "Mining" },
  { id: "herblore", label: "Herblore" },
  { id: "agility", label: "Agility" },
  { id: "thieving", label: "Thieving" },
  { id: "slayer", label: "Slayer" },
  { id: "farming", label: "Farming" },
  { id: "runecraft", label: "Runecraft" },
  { id: "hunter", label: "Hunter" },
  { id: "construction", label: "Construction" },
];

/** Matches server Hiscores.sendBossDetails() list */
export const HISCORE_BOSSES: { id: string; label: string }[] = [
  { id: "abyssal_sire", label: "Abyssal Sire" },
  { id: "alchemical_hydra", label: "Alchemical Hydra" },
  { id: "argentavis", label: "Argentavis" },
  { id: "barrows_chests", label: "Barrows Chests" },
  { id: "callisto", label: "Callisto" },
  { id: "cerberus", label: "Cerberus" },
  { id: "cox", label: "Chambers of Xeric" },
  { id: "cox_olm", label: "Chambers of Xeric (Olm Only)" },
  { id: "chaos_elemental", label: "Chaos Elemental" },
  { id: "chaos_fanatic", label: "Chaos Fanatic" },
  { id: "clue_all", label: "Clue Scrolls (All)" },
  { id: "clue_beginner", label: "Clue Scrolls (Beginner)" },
  { id: "clue_easy", label: "Clue Scrolls (Easy)" },
  { id: "clue_medium", label: "Clue Scrolls (Medium)" },
  { id: "clue_hard", label: "Clue Scrolls (Hard)" },
  { id: "clue_elite", label: "Clue Scrolls (Elite)" },
  { id: "clue_master", label: "Clue Scrolls (Master)" },
  { id: "collections", label: "Collections Logged" },
  { id: "commander_zilyana", label: "Commander Zilyana" },
  { id: "corp", label: "Corporeal Beast" },
  { id: "crazy_archaeologist", label: "Crazy Archaeologist" },
  { id: "dagannoth_prime", label: "Dagannoth Prime" },
  { id: "dagannoth_rex", label: "Dagannoth Rex" },
  { id: "dagannoth_supreme", label: "Dagannoth Supreme" },
  { id: "demonic_gorilla", label: "Demonic Gorilla" },
  { id: "duke_sucellus", label: "Duke Sucellus" },
  { id: "fight_caves", label: "Fight Caves" },
  { id: "galvek", label: "Galvek" },
  { id: "general_graardor", label: "General Graardor" },
  { id: "giant_mole", label: "Giant Mole" },
  { id: "grotesque_guardians", label: "Grotesque Guardians" },
  { id: "inferno", label: "Inferno" },
  { id: "kalphite_queen", label: "Kalphite Queen" },
  { id: "king_black_dragon", label: "King Black Dragon" },
  { id: "kraken", label: "Kraken" },
  { id: "kreearra", label: "Kree'Arra" },
  { id: "kril", label: "K'ril Tsutsaroth" },
  { id: "nightmare", label: "The Nightmare" },
  { id: "leviathan", label: "Leviathan" },
  { id: "nex", label: "Nex" },
  { id: "ophidia", label: "Ophidia" },
  { id: "phantom_muspah", label: "Phantom Muspah" },
  { id: "sarachnis", label: "Sarachnis" },
  { id: "scorpia", label: "Scorpia" },
  { id: "skotizo", label: "Skotizo" },
  { id: "gauntlet", label: "The Gauntlet" },
  { id: "corrupted_gauntlet", label: "The Corrupted Gauntlet" },
  { id: "tob", label: "Theatre of Blood" },
  { id: "thermy", label: "Thermonuclear Smoke Devil" },
  { id: "toa", label: "Tombs of Amascut" },
  { id: "vardorvis", label: "Vardorvis" },
  { id: "venenatis", label: "Venenatis" },
  { id: "vetion", label: "Vet'ion" },
  { id: "vorkath", label: "Vorkath" },
  { id: "whisperer", label: "The Whisperer" },
  { id: "wintertodt", label: "Wintertodt" },
  { id: "zulrah", label: "Zulrah" },
];

export const PLACEHOLDER_HISCORES: HiscoreRow[] = Array.from(
  { length: 25 },
  (_, i) => ({
    rank: i + 1,
    username: "—",
    level: 0,
    experience: 0,
  }),
);

export function formatXp(n: number) {
  return n.toLocaleString("en-US");
}
