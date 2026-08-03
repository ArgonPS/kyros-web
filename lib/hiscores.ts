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

export const HISCORE_BOSSES: { id: string; label: string }[] = [
  { id: "abyssal_sire", label: "Abyssal Sire" },
  { id: "alchemical_hydra", label: "Alchemical Hydra" },
  { id: "callisto", label: "Callisto" },
  { id: "cerberus", label: "Cerberus" },
  { id: "cox", label: "Chambers of Xeric" },
  { id: "corp", label: "Corporeal Beast" },
  { id: "gauntlet", label: "The Gauntlet" },
  { id: "nex", label: "Nex" },
  { id: "nightmare", label: "The Nightmare" },
  { id: "tob", label: "Theatre of Blood" },
  { id: "toa", label: "Tombs of Amascut" },
  { id: "vorkath", label: "Vorkath" },
  { id: "zulrah", label: "Zulrah" },
];

/** Placeholder rows until the live hiscores API is wired. */
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
