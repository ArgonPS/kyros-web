import { NextResponse } from "next/server";
import { getVoteStatus } from "@/lib/votes";

export const runtime = "nodejs";

/**
 * Public cooldown status for the vote page.
 * GET /api/vote/status?username=Name
 */
export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const username = (url.searchParams.get("username") || "").trim();
    if (!username || username.length > 12) {
      return NextResponse.json({ error: "Invalid username" }, { status: 400 });
    }
    if (!/^[A-Za-z0-9 _-]+$/.test(username)) {
      return NextResponse.json(
        { error: "Username contains invalid characters." },
        { status: 400 },
      );
    }

    const status = await getVoteStatus(username);
    return NextResponse.json(status, {
      headers: { "Cache-Control": "no-store" },
    });
  } catch (err) {
    console.error("vote status error", err);
    return NextResponse.json({ error: "Status failed" }, { status: 500 });
  }
}
