import { NextResponse } from "next/server";
import { loadDatabase, normalizeUsernameKey } from "@/lib/hiscores-store";

export const runtime = "nodejs";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const raw = (searchParams.get("username") || "").trim();
    if (!raw) {
      return NextResponse.json({ error: "Missing username" }, { status: 400 });
    }

    const key = normalizeUsernameKey(raw);
    const modeParam = searchParams.get("mode");
    const xpParam = searchParams.get("xp");
    const wantMode =
      modeParam != null && modeParam !== "" ? Number(modeParam) : null;
    const wantXp =
      xpParam != null && xpParam !== "" ? Number(xpParam) : null;

    const db = await loadDatabase();
    const matches = Object.values(db.players).filter(
      (p) => p.usernameKey === key,
    );

    if (!matches.length) {
      return NextResponse.json({ error: "Player not found" }, { status: 404 });
    }

    let player = matches[0];
    if (wantMode != null && Number.isFinite(wantMode)) {
      const filtered = matches.filter((p) => p.gameMode === wantMode);
      if (filtered.length) player = filtered[0];
    }
    if (wantXp != null && Number.isFinite(wantXp)) {
      const pool =
        wantMode != null && Number.isFinite(wantMode)
          ? matches.filter((p) => p.gameMode === wantMode)
          : matches;
      const filtered = pool.filter((p) => p.gameExperienceMode === wantXp);
      if (filtered.length) player = filtered[0];
    }

    // Prefer most recently updated when still ambiguous
    if (
      (wantMode == null || !Number.isFinite(wantMode)) &&
      (wantXp == null || !Number.isFinite(wantXp)) &&
      matches.length > 1
    ) {
      player = [...matches].sort((a, b) =>
        (b.updatedAt || "").localeCompare(a.updatedAt || ""),
      )[0];
    }

    const siblings = matches.map((p) => ({
      gameMode: p.gameMode,
      gameExperienceMode: p.gameExperienceMode,
      updatedAt: p.updatedAt,
    }));

    return NextResponse.json({ player, siblings });
  } catch (err) {
    console.error("hiscores player error", err);
    const message =
      err instanceof Error ? err.message : "Unable to load player";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
