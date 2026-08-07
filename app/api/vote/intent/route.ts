import { NextResponse } from "next/server";
import { VOTE_SITES, recordVoteIntent } from "@/lib/votes";

export const runtime = "nodejs";

const SITE_IDS = new Set<string>(VOTE_SITES.map((s) => s.id));

/**
 * Called when a player clicks "Vote now". Lets an incentive postback that arrives
 * without the player name still be credited, matched on the voter's IP.
 */
export async function POST(req: Request) {
  try {
    const body = (await req.json().catch(() => null)) as {
      username?: string;
      site?: string;
    } | null;
    const username = (body?.username || "").trim().slice(0, 25);
    const site = (body?.site || "").trim().toLowerCase();
    if (!username || !SITE_IDS.has(site)) {
      return NextResponse.json({ error: "Invalid intent" }, { status: 400 });
    }

    const ip =
      (req.headers.get("x-forwarded-for") || "").split(",")[0].trim() ||
      req.headers.get("x-real-ip") ||
      "";

    await recordVoteIntent({ username, site, ip });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("vote intent error", err);
    return NextResponse.json({ error: "Intent failed" }, { status: 500 });
  }
}
