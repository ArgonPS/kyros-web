import { NextResponse } from "next/server";
import {
  logVoteHit,
  lookupVoteIntent,
  normalizeVoteSite,
  recordVote,
  verifyVoteSecret,
} from "@/lib/votes";

export const runtime = "nodejs";

/** Every param name the four toplists have been seen to use for the player name. */
const NAME_KEYS = [
  "callback",
  "username",
  "userid",
  "id",
  "postback",
  "incentive",
  "p_resp",
  "user",
  "player",
  "nick",
  "name",
  "u",
] as const;

const IP_KEYS = ["ip", "userip", "voterip", "user_ip"] as const;

/**
 * Toplist incentive callbacks:
 * - RULOCUS: callback/username + secret + ip
 * - RSPS-List: userid + secret + voted + userip
 * - TopG: p_resp + ip (no secret; only sent after a successful vote)
 * - Top100Arena: postback + optional ip (no secret).
 *   Dashboard Incentive Postback must be:
 *   https://kyrosps.io/api/vote/callback?postback=&site=top100arena
 */
async function handle(req: Request) {
  const url = new URL(req.url);
  const query = Object.fromEntries(url.searchParams.entries());
  const clientIp =
    (req.headers.get("x-forwarded-for") || "").split(",")[0].trim() ||
    req.headers.get("x-real-ip") ||
    "";
  const hit: Record<string, unknown> = {
    method: req.method,
    query,
    clientIp,
    ua: req.headers.get("user-agent") || "",
  };

  try {
    const params = new Map<string, string>();
    for (const [k, v] of url.searchParams.entries()) {
      if (v.trim()) params.set(k.toLowerCase(), v.trim());
    }

    if (req.method === "POST") {
      const contentType = req.headers.get("content-type") || "";
      let body: Record<string, unknown> | null = null;
      if (contentType.includes("application/json")) {
        body = (await req.json().catch(() => null)) as Record<
          string,
          unknown
        > | null;
      } else if (
        contentType.includes("form") ||
        contentType.includes("urlencoded")
      ) {
        const form = await req.formData().catch(() => null);
        if (form) {
          body = {};
          for (const [k, v] of form.entries()) body[k] = String(v);
        }
      }
      if (body) {
        hit.body = body;
        for (const [k, v] of Object.entries(body)) {
          const key = k.toLowerCase();
          const value = v == null ? "" : String(v).trim();
          if (value && !params.has(key)) params.set(key, value);
        }
      }
    }

    const pick = (keys: readonly string[]) => {
      for (const k of keys) {
        const v = params.get(k);
        if (v) return v;
      }
      return "";
    };

    let callback = pick(NAME_KEYS);
    const ip = pick(IP_KEYS);
    const secret = params.get("secret") || "";
    const voted = params.get("voted") ?? null;
    const rawSite = params.get("site") || "";
    let siteHint = rawSite.toLowerCase();

    // Top100Arena appends the player name to the end of the saved postback URL,
    // so a trailing site= swallows it (…?postback=&site=top100arenaAkatsuki).
    const glued = /^(top100arena|top100|topg|rulocus|rsps-list)(.+)$/i.exec(rawSite);
    if (glued) {
      siteHint = glued[1].toLowerCase();
      if (!callback) callback = glued[2];
      hit.gluedSiteParam = true;
    }
    const isTopGStyle = url.searchParams.has("p_resp") || params.has("p_resp");
    const hasPostback = url.searchParams.has("postback") || params.has("postback");

    const isTop100ArenaStyle =
      siteHint === "top100arena" ||
      siteHint === "top100" ||
      // Top100Arena incentive postback always includes postback= (no secret).
      (hasPostback && !isTopGStyle && !verifyVoteSecret(secret));

    // TopG / Top100Arena have no shared secret — they only hit after a real vote.
    if (!isTopGStyle && !isTop100ArenaStyle && !verifyVoteSecret(secret)) {
      hit.outcome = "rejected: bad secret";
      await logVoteHit(hit);
      return NextResponse.json({ error: "Invalid secret" }, { status: 403 });
    }

    // RSPS-List sends voted=0 for duplicates — ignore those
    if (voted != null && voted !== "" && voted !== "1") {
      hit.outcome = `ignored: voted=${voted}`;
      await logVoteHit(hit);
      return new NextResponse("OK", { status: 200 });
    }

    const site = normalizeVoteSite(
      siteHint ||
        (isTopGStyle
          ? "topg"
          : isTop100ArenaStyle
            ? "top100arena"
            : voted != null
              ? "rsps-list"
              : "rulocus"),
    );
    hit.site = site;

    let username = callback.replace(/[^A-Za-z0-9_\- ]+/g, "").trim();
    // Toplists occasionally drop the incentive value on redirects; fall back to
    // the player's own "Vote now" click for that site.
    if (!username || username.length > 25) {
      const fromIntent =
        site === "topg" || site === "top100arena"
          ? await lookupVoteIntent(site, ip || clientIp)
          : null;
      if (fromIntent) {
        username = fromIntent;
        hit.matchedIntent = true;
      } else {
        hit.outcome = "rejected: no username";
        await logVoteHit(hit);
        return NextResponse.json({ error: "Invalid callback" }, { status: 400 });
      }
    }

    const id = await recordVote({ username, ip: ip || "", site });
    hit.username = username;
    hit.outcome = id === "duplicate" ? "duplicate" : "recorded";
    hit.voteId = id;
    await logVoteHit(hit);

    return new NextResponse("OK", { status: 200 });
  } catch (err) {
    hit.outcome = `error: ${err instanceof Error ? err.message : String(err)}`;
    await logVoteHit(hit);
    console.error("vote callback error", err);
    return NextResponse.json({ error: "Callback failed" }, { status: 500 });
  }
}

export async function GET(req: Request) {
  return handle(req);
}

export async function POST(req: Request) {
  return handle(req);
}
