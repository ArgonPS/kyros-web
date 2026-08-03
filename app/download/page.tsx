import type { Metadata } from "next";
import Link from "next/link";
import { DISCORD_INVITE } from "@/lib/site";
import { PageHero } from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Download",
  description: "Download the Kyros client and start playing.",
};

export default function DownloadPage() {
  return (
    <>
      <PageHero
        eyebrow="CLIENT"
        title="Download Kyros"
        lead="Windows client with Java 17+. Create your account in-game — no website signup."
      />

      <div className="mx-auto max-w-6xl px-5 pb-24 md:px-8">
        <div className="panel max-w-xl p-8 md:p-10">
          <h2 className="font-display text-2xl text-[color:var(--gold)]">
            Windows
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-[color:var(--fg-muted)]">
            Public launcher package lands here once the game VPS is live. Until
            then, join Discord for launch updates.
          </p>
          <span className="btn-primary mt-8 inline-flex cursor-not-allowed opacity-55">
            Coming Soon
          </span>
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href={DISCORD_INVITE}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost"
            >
              Get notified on Discord
            </a>
            <Link href="/wiki/getting-started" className="btn-ghost">
              Getting started
            </Link>
          </div>
        </div>

        <ol className="mt-16 max-w-xl list-decimal space-y-3 pl-5 text-[color:var(--fg-muted)]">
          <li>Install Java 17 or newer.</li>
          <li>Download and run the Kyros client.</li>
          <li>Create your character and join the world.</li>
        </ol>
      </div>
    </>
  );
}
