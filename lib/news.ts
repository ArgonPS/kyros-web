export type NewsArticle = {
  slug: string;
  date: string;
  title: string;
  excerpt: string;
  /** Full article paragraphs for /news/[slug] */
  body: string[];
};

export const NEWS: NewsArticle[] = [
  {
    slug: "battle-pass-season-1",
    date: "Aug 7, 2026",
    title: "Battle Pass — Season 1: Summer is live!",
    excerpt:
      "60 tiers of rewards, daily and weekly challenges scaled to your game mode, and a full Summer cosmetic suit. Talk to the Battle Pass Guide at home to start.",
    body: [
      "The Kyros Battle Pass is here! Season 1: Summer brings 60 tiers of rewards you unlock by completing challenges across the whole game — bossing, slayer, raids, skilling, clues, minigames, and more. Talk to the Battle Pass Guide at home (next to the Referral Clerk) to view your pass and get started.",
      "How it works: completing challenges awards Battle Pass XP, and XP levels you through 60 tiers. Every tier has a reward on the Free track, and a second reward on the Premium track. Challenges rotate on a schedule — dailies reset every day, weeklies every week, and seasonal challenges run for the whole season.",
      "Fair for every game mode: challenge goals scale with your chosen difficulty. An XP challenge that asks an Insane-mode player for 100K Slayer XP asks an Easy-mode player for the equivalent at their rates — the same real effort no matter which mode you picked at tutorial.",
      "Free track: coins, supplies, mystery boxes, vote points, XP and drop-rate scrolls, perk point scrolls, the Summer frog mask, and the Summer Spirit pet at tier 60. Everyone earns Battle Pass XP and free rewards automatically — no purchase needed.",
      "Premium track: unlock it by redeeming a Battle Pass ticket, available in the Donator Store (1,000 Donator Points) or the Referral Rewards shop (15 referral points). Premium rewards include the full 6-piece Summer suit — flippers, gloves, shorts, shirt, imp mask — plus the Summer cape, shield, boxing gloves, and the Summer Dragon pet at tier 60. Premium also unlocks bonus premium challenges and awards Premium Pass Shards along the track: collect 100 shards and you can redeem your next season's pass free.",
      "Buying Premium later? No problem — premium rewards for tiers you've already reached can be claimed retroactively the moment you activate your ticket.",
      "Season 1 is open-ended while the server grows — no end-date pressure. When the season eventually rolls over (think Halloween or Winter themes), battle pass progress resets for the new season but everything you claimed is yours to keep.",
    ],
  },
  {
    slug: "donator-boss",
    date: "Aug 3, 2026",
    title: "How the Donator Boss works",
    excerpt:
      "Every real donation fills a shared world meter. At $200 USD the Donator Boss spawns — here’s the full breakdown.",
    body: [
      "The Donator Boss is a community world event. When players support Kyros through the Store, those dollars do two separate things at once: they reward the donor personally, and they fill a shared public meter that eventually spawns a boss everyone can fight.",
      "Personal rewards (yours alone): Buy a bond on kyrosps.io/store (all prices are USD). After Stripe payment, type ::claim in-game to receive the bond item, then redeem it for Donator Points. Your lifetime donated total unlocks donator ranks (chat icons and double-drop bonuses). Nobody else receives your points or rank.",
      "Community meter (shared): The same claim also adds those USD to a server-wide counter. The meter broadcasts every $50 of progress (for example $50/$200, $100/$200) until it reaches $200. That $200 threshold is only the spawn cost — it is not paid out as cash or Donator Points to whoever kills the boss.",
      "When the meter hits $200, the world announces a countdown (about three minutes). Type ::db to teleport to the arena. Extra donations past $200 while a boss is alive or spawning are stored as overflow and can queue additional bosses after the current one dies.",
      "Kill rewards: Anyone who dealt at least 100 damage when the boss dies gets one roll from the Donator Boss loot table (mystery boxes and special items) plus perk points (4 normally, or 8 if you donated recently). These are in-game rewards — not a share of the real-money donations.",
      "Quick summary: You keep your bond, points, and rank. The community gets progress toward a public boss fight. Use ::db when it spawns, deal damage, and roll loot with everyone else.",
    ],
  },
  {
    slug: "launch-prep",
    date: "Aug 3, 2026",
    title: "Kyros is coming — website & Discord live",
    excerpt:
      "The site and Discord are online. VPS provisioning is underway — join Discord for launch pings.",
    body: [
      "Kyros now has a public website and Discord. Download, hiscores, store, and wiki pages are live on kyrosps.io while the world finishes coming online.",
      "Join Discord for rules, tickets, LFG, and launch announcements. Accept the rules on join to unlock Member.",
      "The Play page has Windows, JAR, and Mac client options targeting play.kyrosps.io.",
    ],
  },
  {
    slug: "community-open",
    date: "Aug 3, 2026",
    title: "Community Discord is open",
    excerpt:
      "Rules, tickets, LFG, and announcements are ready. Accept the rules on join to unlock Member.",
    body: [
      "Our Discord is open for the community. Channels cover announcements, support tickets, looking-for-group, and general chat.",
      "Accept the rules when you join to unlock the Member role and the rest of the server.",
    ],
  },
  {
    slug: "hiscores-ready",
    date: "Aug 3, 2026",
    title: "Hiscores are live",
    excerpt:
      "Skills and boss hiscores update when you log out. Filter by gamemode, XP mode, and search by name.",
    body: [
      "Kyros hiscores are connected to the game world. Your skills and boss kill counts post when you log out (staff accounts are excluded).",
      "Open kyrosps.io/hiscores or type ::hiscores in-game. Filter by skill or boss, gamemode, and XP difficulty, or search for a player name.",
      "Ranks refresh from the latest logout snapshot — train, log out, and check the board.",
    ],
  },
  {
    slug: "client-download",
    date: "Aug 3, 2026",
    title: "Client download is up",
    excerpt:
      "Grab the Windows client from the Play page. It targets play.kyrosps.io — connect when the world goes live.",
    body: [
      "Download Kyros from the Play page. Prefer Kyros-Setup.exe on Windows (Java included). JAR and Mac setup options are also available.",
      "The client connects to play.kyrosps.io. Create your character in-game — no website signup required.",
    ],
  },
];

export function getNewsArticle(slug: string): NewsArticle | undefined {
  return NEWS.find((n) => n.slug === slug);
}
