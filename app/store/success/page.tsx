import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { DISCORD_INVITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Payment successful",
  description: "Your Kyros donation was received.",
};

export default async function StoreSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>;
}) {
  const { session_id: sessionId } = await searchParams;

  return (
    <>
      <PageHero
        eyebrow="STORE"
        title="Payment successful"
        lead="Thank you for supporting Kyros. Your bond is ready to claim in-game."
      />
      <div className="mx-auto max-w-2xl px-5 pb-24 md:px-8">
        <ol className="space-y-4 text-[color:var(--fg-muted)]">
          <li>
            Log into the character name you entered at checkout
            {sessionId ? (
              <span className="mt-1 block text-xs text-white/50">
                Session {sessionId}
              </span>
            ) : null}
          </li>
          <li>
            Type <span className="text-white">::claim</span> (or use the
            donation claim NPC) to receive your bond item.
          </li>
          <li>
            Redeem the bond from your inventory to add Donator Points and update
            your lifetime donated total.
          </li>
        </ol>
        <div className="mt-10 flex flex-wrap gap-3">
          <Link href="/store" className="btn-primary">
            Back to store
          </Link>
          <a
            href={DISCORD_INVITE}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost"
          >
            Discord help
          </a>
        </div>
      </div>
    </>
  );
}
