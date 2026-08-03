import type { Metadata } from "next";
import { HiscoresBoard } from "@/components/HiscoresBoard";
import { PageHero } from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Hiscores",
  description: "Kyros overall and skill hiscores leaderboards.",
};

export default function HiscoresPage() {
  return (
    <>
      <PageHero
        eyebrow="LEADERBOARDS"
        title="Hiscores"
        lead="Track overall and skill rankings across game modes — same vibe as Impact, built for Kyros."
      />
      <div className="mx-auto max-w-6xl px-5 pb-24 md:px-8">
        <HiscoresBoard />
      </div>
    </>
  );
}
