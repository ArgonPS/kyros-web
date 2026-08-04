import { NextResponse } from "next/server";
import type Stripe from "stripe";
import { isStoreAuthenticated } from "@/lib/store-auth";
import { normalizeUsername } from "@/lib/store";
import { getStripe } from "@/lib/stripe";

export const runtime = "nodejs";

type IngameItem = { itemId: number; amount: number };

type DonationViewModel = {
  basketModel: {
    id: string;
    username: string;
    stripePrivatePaymentId: string;
    transactionAmount: number;
    paymentStatus: string;
    stripePaymentId: string;
    datePaid: string;
    dateCreated: string;
    hasClaimed: boolean;
    generatedFromIp: string;
    claimedFromIp: string;
    stripeCheckoutUrl: string;
    referralCodeAttatched: string;
  };
  inGameItems: { items: IngameItem[] };
};

type DonationRequestClaim = {
  username: string;
  totalSpentThisClaim: number;
  overallSpent: number;
  viewModels: DonationViewModel[];
};

export async function GET(req: Request) {
  if (!(await isStoreAuthenticated(req))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const usernameRaw = searchParams.get("username")?.trim() ?? "";
  if (!usernameRaw) {
    return NextResponse.json({ error: "Missing username" }, { status: 400 });
  }

  const usernameKey = normalizeUsername(usernameRaw);

  // Escape single quotes for Stripe search query language
  const safeKey = usernameKey.replace(/\\/g, "\\\\").replace(/'/g, "\\'");
  const query = `status:'succeeded' AND metadata['ingame_username_key']:'${safeKey}' AND metadata['claimed']:'false'`;

  const viewModels: DonationViewModel[] = [];
  let totalSpentThisClaim = 0;
  let overallSpent = 0;

  let stripe;
  try {
    stripe = getStripe();
  } catch (err) {
    console.error("store/claim stripe config", err);
    return NextResponse.json(
      { error: "Stripe is not configured on the server" },
      { status: 503 },
    );
  }

  try {
    const unclaimed = await stripe.paymentIntents.search({
      query,
      limit: 100,
    });

    for (const pi of unclaimed.data) {
      // Search index can lag after claim/confirm — re-check live metadata
      const fresh = await stripe.paymentIntents.retrieve(pi.id);
      if (fresh.metadata?.claimed === "true") continue;
      const vm = paymentIntentToViewModel(fresh, usernameRaw);
      if (vm) {
        viewModels.push(vm);
        totalSpentThisClaim += Number(
          fresh.metadata.usd_cents || fresh.amount || 0,
        );
      }
    }

    // Lifetime spent (claimed + unclaimed) for this username
    const allQuery = `status:'succeeded' AND metadata['ingame_username_key']:'${safeKey}'`;
    const all = await stripe.paymentIntents.search({
      query: allQuery,
      limit: 100,
    });
    for (const pi of all.data) {
      overallSpent += Number(pi.metadata.usd_cents || pi.amount || 0);
    }
  } catch (err) {
    console.error("store/claim search failed", err);
    return NextResponse.json(
      { error: "Failed to look up donations" },
      { status: 500 },
    );
  }

  const payload: DonationRequestClaim = {
    username: usernameRaw,
    totalSpentThisClaim,
    overallSpent,
    viewModels,
  };

  return NextResponse.json(payload);
}

function paymentIntentToViewModel(
  pi: Stripe.PaymentIntent,
  username: string,
): DonationViewModel | null {
  const bondItemId = Number(pi.metadata.bond_item_id);
  if (!Number.isFinite(bondItemId) || bondItemId <= 0) {
    console.warn("PI missing bond_item_id", pi.id);
    return null;
  }
  const usdCents = Number(pi.metadata.usd_cents || pi.amount || 0);
  const paid = new Date((pi.created || 0) * 1000).toISOString();

  return {
    basketModel: {
      id: pi.id,
      username,
      stripePrivatePaymentId: pi.id,
      transactionAmount: usdCents,
      paymentStatus: pi.status,
      stripePaymentId: typeof pi.latest_charge === "string" ? pi.latest_charge : pi.id,
      datePaid: paid,
      dateCreated: paid,
      hasClaimed: false,
      generatedFromIp: "",
      claimedFromIp: "",
      stripeCheckoutUrl: "",
      referralCodeAttatched: "",
    },
    inGameItems: {
      items: [{ itemId: bondItemId, amount: 1 }],
    },
  };
}
