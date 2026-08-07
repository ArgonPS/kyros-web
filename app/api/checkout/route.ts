import { NextResponse } from "next/server";
import {
  getBondPackage,
  normalizeUsername,
  resolveStripePriceId,
} from "@/lib/store";
import { getSiteUrl, getStripe } from "@/lib/stripe";

export const runtime = "nodejs";

type CheckoutBody = {
  packageId?: string;
  username?: string;
};

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as CheckoutBody;
    const packageId = body.packageId?.trim();
    const usernameRaw = body.username?.trim() ?? "";

    if (!packageId) {
      return NextResponse.json({ error: "Missing packageId" }, { status: 400 });
    }
    if (usernameRaw.length < 1 || usernameRaw.length > 12) {
      return NextResponse.json(
        { error: "Enter a valid in-game username (1–12 characters)." },
        { status: 400 },
      );
    }
    if (!/^[A-Za-z0-9 _-]+$/.test(usernameRaw)) {
      return NextResponse.json(
        { error: "Username contains invalid characters." },
        { status: 400 },
      );
    }

    const pkg = getBondPackage(packageId);
    if (!pkg) {
      return NextResponse.json({ error: "Unknown package" }, { status: 400 });
    }

    const priceId = resolveStripePriceId(pkg);
    const username = usernameRaw.trim().replace(/\s+/g, " ");
    const usernameKey = normalizeUsername(username);
    const site = getSiteUrl().replace(/\/$/, "");
    const stripe = getStripe();

    // Prices are Stripe live `currency: usd` — Checkout inherits USD from the Price.
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${site}/store/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${site}/store/cancel`,
      metadata: {
        package_id: pkg.id,
        bond_item_id: String(pkg.bondItemId),
        points: String(pkg.points),
        ingame_username: username,
        ingame_username_key: usernameKey,
        usd_cents: String(pkg.usd * 100),
        currency: "usd",
      },
      payment_intent_data: {
        metadata: {
          package_id: pkg.id,
          bond_item_id: String(pkg.bondItemId),
          points: String(pkg.points),
          ingame_username: username,
          ingame_username_key: usernameKey,
          usd_cents: String(pkg.usd * 100),
          currency: "usd",
          claimed: "false",
        },
      },
      custom_text: {
        submit: {
          message: `Bonds will be claimable in-game on account: ${username}. Charged in USD.`,
        },
      },
    });

    if (!session.url) {
      return NextResponse.json(
        { error: "Checkout session missing URL" },
        { status: 500 },
      );
    }

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("checkout error", err);
    const message =
      err instanceof Error ? err.message : "Unable to start checkout";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
