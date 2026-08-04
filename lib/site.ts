export const SITE_URL = "https://kyrosps.io";

export const DISCORD_INVITE =
  process.env.NEXT_PUBLIC_DISCORD_INVITE?.trim() ||
  "https://discord.gg/munhcFgfez";

/** Default / legacy single download — prefer DOWNLOAD_OPTIONS in lib/downloads.ts */
export const CLIENT_DOWNLOAD_URL =
  process.env.NEXT_PUBLIC_CLIENT_DOWNLOAD_URL?.trim() ||
  "https://github.com/ArgonPS/kyros-web/releases/latest/download/Kyros-Windows-Launcher.zip";

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

export const NEWS = [
  {
    slug: "launch-prep",
    date: "Aug 3, 2026",
    title: "Kyros is coming — website & Discord live",
    excerpt:
      "The site and Discord are online. VPS provisioning is underway — join Discord for launch pings.",
  },
  {
    slug: "community-open",
    date: "Aug 3, 2026",
    title: "Community Discord is open",
    excerpt:
      "Rules, tickets, LFG, and announcements are ready. Accept the rules on join to unlock Member.",
  },
  {
    slug: "hiscores-ready",
    date: "Aug 3, 2026",
    title: "Hiscores page is ready",
    excerpt:
      "Leaderboards UI is live on kyrosps.io — live ranks connect when the world opens.",
  },
  {
    slug: "client-download",
    date: "Aug 3, 2026",
    title: "Client download is up",
    excerpt:
      "Grab the Windows client from the Play page. It targets play.kyrosps.io — connect when the world goes live.",
  },
] as const;
