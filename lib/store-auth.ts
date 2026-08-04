import { cookies } from "next/headers";
import { timingSafeEqual } from "crypto";

const AUTH_COOKIE = "r_auth";

function getStorePassword(): string {
  const pw = process.env.STORE_API_PASSWORD?.trim();
  if (!pw) {
    throw new Error("STORE_API_PASSWORD is not configured");
  }
  return pw;
}

function safeEqual(a: string, b: string): boolean {
  const ab = Buffer.from(a);
  const bb = Buffer.from(b);
  if (ab.length !== bb.length) return false;
  return timingSafeEqual(ab, bb);
}

/** Token stored in r_auth cookie — simple shared secret for game server. */
export function createAuthToken(): string {
  return getStorePassword();
}

export function verifyPassword(password: string): boolean {
  try {
    return safeEqual(password, getStorePassword());
  } catch {
    return false;
  }
}

function tokenFromCookieHeader(cookieHeader: string | null): string | undefined {
  if (!cookieHeader) return undefined;
  const parts = cookieHeader.split(";");
  for (const part of parts) {
    const [name, ...rest] = part.trim().split("=");
    if (name === AUTH_COOKIE) {
      return decodeURIComponent(rest.join("="));
    }
  }
  return undefined;
}

export async function isStoreAuthenticated(req?: Request): Promise<boolean> {
  try {
    const expected = getStorePassword();
    let token: string | undefined;

    try {
      const jar = await cookies();
      token = jar.get(AUTH_COOKIE)?.value;
    } catch {
      // cookies() unavailable outside a request context
    }

    if (!token && req) {
      token = tokenFromCookieHeader(req.headers.get("cookie"));
    }

    if (!token) return false;
    return safeEqual(token, expected);
  } catch {
    return false;
  }
}

export { AUTH_COOKIE };
