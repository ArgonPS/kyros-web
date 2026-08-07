export const SITE_URL = "https://kyrosps.io";

export const DISCORD_INVITE =
  process.env.NEXT_PUBLIC_DISCORD_INVITE?.trim() ||
  "https://discord.gg/munhcFgfez";

/** Default / legacy single download — prefer DOWNLOAD_OPTIONS in lib/downloads.ts */
export const CLIENT_DOWNLOAD_URL =
  process.env.NEXT_PUBLIC_CLIENT_DOWNLOAD_URL?.trim() ||
  "https://github.com/ArgonPS/kyros-web/releases/latest/download/Kyros-Setup.exe";

/** Reason-style primary nav */
export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/news", label: "News" },
  { href: "/vote", label: "Vote" },
  { href: "/hiscores", label: "Hiscores" },
  { href: "/store", label: "Store" },
  { href: "/download", label: "Play" },
] as const;

export const TOP_LINKS = [
  { href: "/wiki", label: "Wiki" },
  { href: "/discord", label: "Discord" },
  { href: "/hiscores", label: "Hiscores" },
] as const;

/** Re-export news so existing imports from `@/lib/site` keep working. */
export { NEWS } from "@/lib/news";
