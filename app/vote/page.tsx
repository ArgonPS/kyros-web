import type { Metadata } from "next";
import { DISCORD_INVITE } from "@/lib/site";
import { PageHero } from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Vote",
  description: "Vote for Kyros and claim in-game rewards.",
};

const sites = [
  {
    name: "RuneLocus",
    note: "Primary toplist — claim rewards in-game after voting.",
  },
  {
    name: "TopG",
    note: "Secondary list — vote once per cycle for bonus points.",
  },
  {
    name: "RSPS-List",
    note: "Extra visibility — helps keep Kyros growing.",
  },
];

export default function VotePage() {
  return (
    <>
      <PageHero
        eyebrow="SUPPORT"
        title="Vote for Kyros"
        lead="Toplist links go live with the public world. Until then, stick with Discord for launch news."
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
        <ul className="max-w-2xl">
          {sites.map((site) => (
            <li
              key={site.name}
              className="flex flex-col gap-3 border-t border-[color:var(--line)] py-7 sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <h2 className="font-display text-xl text-[color:var(--fg)]">
                  {site.name}
                </h2>
                <p className="mt-1 text-sm text-[color:var(--fg-muted)]">
                  {site.note}
                </p>
              </div>
              <span className="btn-ghost pointer-events-none text-xs opacity-50">
                Link soon
              </span>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
