import type { Metadata } from "next";
import { DISCORD_INVITE } from "@/lib/site";
import { PageHero } from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Discord",
  description: "Join the Kyros Discord community.",
};

export default function DiscordPage() {
  return (
    <>
      <PageHero
        eyebrow="COMMUNITY"
        title="Join the Kyros Discord"
        lead="Announcements, support tickets, LFG, and the player base — this is the hub while the world comes online."
      >
        <a
          href={DISCORD_INVITE}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary"
        >
          Open Discord
        </a>
      </PageHero>

      <div className="mx-auto max-w-6xl px-5 pb-24 md:px-8">
        <div className="panel max-w-2xl p-8 md:p-10">
          <h2 className="font-display text-2xl text-[color:var(--gold)]">
            What you get
          </h2>
          <ul className="mt-6 space-y-4 text-[color:var(--fg-muted)]">
            <li className="border-t border-[color:var(--line)] pt-4">
              Permanent invite — never expires
            </li>
            <li className="border-t border-[color:var(--line)] pt-4">
              Rules screening + Member role on join
            </li>
            <li className="border-t border-[color:var(--line)] pt-4">
              Ticket support for help, appeals, and billing later
            </li>
            <li className="border-t border-[color:var(--line)] pt-4">
              Game channels for PvM, economy, and skilling
            </li>
          </ul>
          <p className="mt-8 text-sm text-[color:var(--fg-muted)]">
            Invite:{" "}
            <a
              href={DISCORD_INVITE}
              className="text-[color:var(--gold-bright)] underline-offset-4 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              {DISCORD_INVITE.replace("https://", "")}
            </a>
          </p>
        </div>
      </div>
    </>
  );
}
