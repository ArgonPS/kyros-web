/** Public site links — set NEXT_PUBLIC_DISCORD_INVITE in .env.local for production. */
export const DISCORD_INVITE =
  process.env.NEXT_PUBLIC_DISCORD_INVITE?.trim() || "";
