import { NextResponse } from "next/server";
import type Stripe from "stripe";
import { getStripe } from "@/lib/stripe";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const stripe = getStripe();
  const secret = process.env.STRIPE_WEBHOOK_SECRET?.trim();
  if (!secret) {
    console.error("STRIPE_WEBHOOK_SECRET missing");
    return NextResponse.json({ error: "Webhook not configured" }, { status: 500 });
  }

  const body = await req.text();
  const signature = req.headers.get("stripe-signature");
  if (!signature) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, signature, secret);
  } catch (err) {
    console.error("Webhook signature failed", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  try {
    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;
      await ensurePaymentIntentReady(stripe, session);
    }
  } catch (err) {
    console.error("Webhook handler error", err);
    return NextResponse.json({ error: "Handler failed" }, { status: 500 });
  }

  return NextResponse.json({ received: true });
}

async function ensurePaymentIntentReady(
  stripe: Stripe,
  session: Stripe.Checkout.Session,
) {
  const piId =
    typeof session.payment_intent === "string"
      ? session.payment_intent
      : session.payment_intent?.id;
  if (!piId) {
    console.warn("checkout.session.completed without payment_intent", session.id);
    return;
  }

  const sessionMeta = session.metadata ?? {};

  await stripe.paymentIntents.update(piId, {
    metadata: {
      package_id: sessionMeta.package_id ?? "",
      bond_item_id: sessionMeta.bond_item_id ?? "",
      points: sessionMeta.points ?? "",
      ingame_username: sessionMeta.ingame_username ?? "",
      ingame_username_key: sessionMeta.ingame_username_key ?? "",
      usd_cents: sessionMeta.usd_cents ?? "",
      claimed: sessionMeta.claimed === "true" ? "true" : "false",
      checkout_session_id: session.id,
    },
  });
}
