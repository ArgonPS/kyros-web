import { NextResponse } from "next/server";
import { AUTH_COOKIE, createAuthToken, verifyPassword } from "@/lib/store-auth";

export const runtime = "nodejs";

/**
 * Matches Java HttpClient.authenticate():
 * POST body is a JSON-encoded password string; response is a JSON string token;
 * client stores it as Cookie r_auth=<token>.
 */
export async function POST(req: Request) {
  try {
    const raw = await req.text();
    let password: string;
    try {
      password = JSON.parse(raw) as string;
    } catch {
      password = raw;
    }
    if (typeof password !== "string" || !verifyPassword(password)) {
      return NextResponse.json("invalid", { status: 401 });
    }

    const token = createAuthToken();
    const res = NextResponse.json(token);
    res.cookies.set(AUTH_COOKIE, token, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 365,
    });
    return res;
  } catch (err) {
    console.error("authenticate/login", err);
    return NextResponse.json("error", { status: 500 });
  }
}
