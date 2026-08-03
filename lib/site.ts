/** Public site config */
export const SITE_URL = "https://kyrosps.io";

export const DISCORD_INVITE =
  process.env.NEXT_PUBLIC_DISCORD_INVITE?.trim() ||
  "https://discord.gg/munhcFgfez";

/** Primary nav — Roat-style order */
export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/hiscores", label: "Hiscores" },
  { href: "/download", label: "Download" },
  { href: "/vote", label: "Vote" },
  { href: "/store", label: "Store" },
  { href: "/wiki", label: "Wiki" },
] as const;

export const TOP_LINKS = [
  { href: "/vote", label: "Vote" },
  { href: "/hiscores", label: "Hiscores" },
  { href: "/wiki", label: "Wiki" },
] as const;
