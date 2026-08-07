import { NextResponse } from "next/server";
import { isStoreAuthenticated } from "@/lib/store-auth";
import { claimVotes } from "@/lib/votes";

export const runtime = "nodejs";

type Props = { params: Promise<{ username: string }> };

/**
 * Matches game ::claimvote → GET api/voting/claim/{username}
 * Returns JSON array of claimed vote id strings.
 */
export async function GET(req: Request, { params }: Props) {
  try {
    if (!(await isStoreAuthenticated(req))) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { username: raw } = await params;
    const username = decodeURIComponent(raw || "").trim();
    if (!username) {
      return NextResponse.json([], { status: 200 });
    }

    const ids = await claimVotes(username);
    return NextResponse.json(ids);
  } catch (err) {
    console.error("voting/claim error", err);
    return NextResponse.json([], { status: 200 });
  }
}
