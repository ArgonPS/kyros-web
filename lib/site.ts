/** Public site config */
export const SITE_URL = "https://kyrosps.io";

/** Permanent invite — override with NEXT_PUBLIC_DISCORD_INVITE if needed */
export const DISCORD_INVITE =
  process.env.NEXT_PUBLIC_DISCORD_INVITE?.trim() ||
  "https://discord.gg/munhcFgfez";

export const NAV_LINKS = [
  { href: "/download", label: "Download" },
  { href: "/hiscores", label: "Hiscores" },
  { href: "/vote", label: "Vote" },
  { href: "/store", label: "Store" },
  { href: "/discord", label: "Discord" },
  { href: "/wiki", label: "Wiki" },
] as const;
