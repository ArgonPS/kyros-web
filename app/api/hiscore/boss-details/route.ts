import { NextResponse } from "next/server";
import { isStoreAuthenticated } from "@/lib/store-auth";

export const runtime = "nodejs";

/** Game server posts boss metadata on boot — acknowledge for compatibility. */
export async function POST(req: Request) {
  if (!(await isStoreAuthenticated(req))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return NextResponse.json({ ok: true });
}
