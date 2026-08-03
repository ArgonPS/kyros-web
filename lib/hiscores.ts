export type GameMode = "normal" | "ironman" | "hardcore" | "ultimate";

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
  { id: "normal", label: "Normal" },
  { id: "ironman", label: "Ironman" },
  { id: "hardcore", label: "Hardcore" },
  { id: "ultimate", label: "Ultimate" },
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

/** Placeholder rows until the live hiscores API is wired. */
export const PLACEHOLDER_HISCORES: HiscoreRow[] = [
  { rank: 1, username: "—", level: 0, experience: 0 },
  { rank: 2, username: "—", level: 0, experience: 0 },
  { rank: 3, username: "—", level: 0, experience: 0 },
  { rank: 4, username: "—", level: 0, experience: 0 },
  { rank: 5, username: "—", level: 0, experience: 0 },
  { rank: 6, username: "—", level: 0, experience: 0 },
  { rank: 7, username: "—", level: 0, experience: 0 },
  { rank: 8, username: "—", level: 0, experience: 0 },
  { rank: 9, username: "—", level: 0, experience: 0 },
  { rank: 10, username: "—", level: 0, experience: 0 },
];

export function formatXp(n: number) {
  return n.toLocaleString("en-US");
}
