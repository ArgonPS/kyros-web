import type { Metadata } from "next";
import { DISCORD_INVITE } from "@/lib/site";
import { VOTE_POINTS_PER_SITE, VOTE_SITES } from "@/lib/votes";
import { PageHero } from "@/components/PageHero";
import { VoteLinks } from "@/components/VoteLinks";

export const metadata: Metadata = {
  title: "Vote",
  description: "Vote for Kyros and claim rewards in-game with ::claimvote.",
};

export default function VotePage() {
  const total = VOTE_SITES.length * VOTE_POINTS_PER_SITE;

  return (
    <>
      <PageHero
        eyebrow="SUPPORT"
        title="Vote for Kyros"
        lead={`Help grow the server — each toplist is worth ${VOTE_POINTS_PER_SITE} vote points (up to ${total} if you vote on all of them).`}
      >
        <a
          href={DISCORD_INVITE}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-ghost"
        >
          Join Discord
        </a>
      </PageHero>

      <div className="mx-auto max-w-6xl px-5 pb-24 md:px-8">
        <VoteLinks />
      </div>
    </>
  );
}
