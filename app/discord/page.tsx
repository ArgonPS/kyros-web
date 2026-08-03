import type { Metadata } from "next";
import { DISCORD_INVITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Discord",
  description: "Join the Kyros Discord community.",
};

export default function DiscordPage() {
  const hasInvite = DISCORD_INVITE.length > 0;

  return (
    <div className="mx-auto max-w-6xl px-5 pb-24 pt-32 md:px-8 md:pt-36">
      <p className="font-display text-sm tracking-[0.3em] text-[color:var(--gold)]">
        COMMUNITY
      </p>
      <h1 className="mt-4 font-display text-4xl tracking-wide md:text-5xl">
        Discord
      </h1>
      <p className="mt-5 max-w-2xl text-[color:var(--fg-muted)]">
        Announcements, support, events, and players — join the Kyros Discord to
        stay connected with the server.
      </p>

      <div className="mt-12 max-w-xl border border-[color:var(--line)] bg-[color:var(--bg-elevated)] p-8">
        <h2 className="font-display text-2xl text-[color:var(--gold)]">
          Join the server
        </h2>
        <p className="mt-3 text-sm text-[color:var(--fg-muted)]">
          Get help from staff, find teammates, and hear about updates first.
        </p>
        {hasInvite ? (
          <a
            href={DISCORD_INVITE}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary mt-8 inline-flex"
          >
            Open Discord
          </a>
        ) : (
          <>
            <span className="btn-primary mt-8 inline-flex cursor-not-allowed opacity-60">
              Invite coming soon
            </span>
            <p className="mt-4 text-xs text-[color:var(--fg-muted)]">
              Set{" "}
              <code className="text-[color:var(--gold)]">
                NEXT_PUBLIC_DISCORD_INVITE
              </code>{" "}
              in{" "}
              <code className="text-[color:var(--gold)]">.env.local</code> to
              your discord.gg link.
            </p>
          </>
        )}
      </div>
    </div>
  );
}
