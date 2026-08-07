import { NextResponse } from "next/server";
import {
  buildIndexLite,
  resolveGameModeFilter,
} from "@/lib/hiscores-index-lite";
import { loadDatabase, normalizeUsernameKey } from "@/lib/hiscores-store";

export const runtime = "nodejs";

/**
 * Jagex / RuneLite-compatible hiscores lookup.
 * RuneLite calls: GET .../index_lite.json?player=Name
 * Optional: &mode=ironman|hardcore|ultimate (baked into HiscoreEndpoint URLs).
 */
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const raw = (searchParams.get("player") || searchParams.get("username") || "")
      .trim();
    if (!raw) {
      return NextResponse.json({ error: "Missing player" }, { status: 400 });
    }

    const key = normalizeUsernameKey(raw);
    const modeId = resolveGameModeFilter(searchParams.get("mode"));

    const db = await loadDatabase();
    const all = Object.values(db.players);
    const matches = all.filter((p) => p.usernameKey === key);

    if (!matches.length) {
      return NextResponse.json({ error: "Player not found" }, { status: 404 });
    }

    let player =
      modeId != null
        ? matches.find((p) => p.gameMode === modeId) ?? null
        : null;

    if (!player) {
      // Fall back to most recently updated account for that name
      player = [...matches].sort((a, b) =>
        (b.updatedAt || "").localeCompare(a.updatedAt || ""),
      )[0];
    }

    const pool =
      modeId != null ? all.filter((p) => p.gameMode === modeId) : all;

    const body = buildIndexLite(player, pool);
    return NextResponse.json(body, {
      headers: {
        "Cache-Control": "public, s-maxage=30, stale-while-revalidate=60",
      },
    });
  } catch (err) {
    console.error("index_lite hiscores error", err);
    return NextResponse.json(
      { error: "Unable to load hiscores" },
      { status: 500 },
    );
  }
}
