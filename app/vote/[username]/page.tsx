import type { Metadata } from "next";
import { VOTE_POINTS_PER_SITE } from "@/lib/votes";
import { PageHero } from "@/components/PageHero";
import { VoteLinks } from "@/components/VoteLinks";

type Props = { params: Promise<{ username: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { username } = await params;
  const name = decodeURIComponent(username);
  return {
    title: `Vote — ${name}`,
    description: `Vote for Kyros as ${name}, then claim with ::claimvote.`,
  };
}

export default async function VoteUsernamePage({ params }: Props) {
  const { username: raw } = await params;
  const username = decodeURIComponent(raw).trim();

  return (
    <>
      <PageHero
        eyebrow="SUPPORT"
        title="Vote for Kyros"
        lead={`Voting as ${username}. Each site is worth ${VOTE_POINTS_PER_SITE} points — then type ::claimvote in-game.`}
      />
      <div className="mx-auto max-w-6xl px-5 pb-24 md:px-8">
        <VoteLinks initialUsername={username} />
      </div>
    </>
  );
}
