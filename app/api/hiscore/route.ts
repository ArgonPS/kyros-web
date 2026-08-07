import { NextResponse } from "next/server";
import { isStoreAuthenticated } from "@/lib/store-auth";
import {
  normalizeUsernameKey,
  parseBossEntries,
  parseSkillEntries,
  upsertPlayer,
} from "@/lib/hiscores-store";

export const runtime = "nodejs";

type HiscoreBody = {
  owner?: {
    username?: string;
    gameMode?: number;
    gameRank?: number;
    gameExperienceMode?: number;
  };
  entries?: Array<{ skillId?: number; level?: number; experience?: number }>;
  bossEntries?: Array<{
    bossId?: number;
    ownerUsername?: string;
    killCount?: number;
  }>;
};

export async function POST(req: Request) {
  try {
    if (!(await isStoreAuthenticated(req))) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = (await req.json()) as HiscoreBody;
    const username = body.owner?.username?.trim();
    if (!username) {
      return NextResponse.json({ error: "Missing username" }, { status: 400 });
    }

    const gameMode = Number(body.owner?.gameMode) || 0;
    const gameRank = Number(body.owner?.gameRank) || 0;
    const gameExperienceMode = Number(body.owner?.gameExperienceMode) || 0;

    await upsertPlayer({
      username,
      usernameKey: normalizeUsernameKey(username),
      gameMode,
      gameRank,
      gameExperienceMode,
      skills: parseSkillEntries(body.entries ?? []),
      bosses: parseBossEntries(body.bossEntries ?? []),
      updatedAt: new Date().toISOString(),
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("hiscore post error", err);
    const message =
      err instanceof Error ? err.message : "Unable to save hiscores";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
