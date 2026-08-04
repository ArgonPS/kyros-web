import { NextResponse } from "next/server";
import { isStoreAuthenticated } from "@/lib/store-auth";
import { getStripe } from "@/lib/stripe";

export const runtime = "nodejs";

/**
 * Matches DonationCommandHandler.markAsClaimed — POST body is JSON array of basket IDs (PaymentIntent ids).
 */
export async function POST(req: Request) {
  if (!(await isStoreAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let ids: string[];
  try {
    const body = await req.json();
    if (!Array.isArray(body)) {
      return NextResponse.json({ error: "Expected array of ids" }, { status: 400 });
    }
    ids = body.filter((x): x is string => typeof x === "string" && x.startsWith("pi_"));
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const stripe = getStripe();
  const marked: string[] = [];

  for (const id of ids) {
    try {
      const pi = await stripe.paymentIntents.retrieve(id);
      await stripe.paymentIntents.update(id, {
        metadata: {
          ...pi.metadata,
          claimed: "true",
          claimed_at: String(Math.floor(Date.now() / 1000)),
        },
      });
      marked.push(id);
    } catch (err) {
      console.error("Failed to mark claimed", id, err);
    }
  }

  return NextResponse.json({ ok: true, marked });
}
