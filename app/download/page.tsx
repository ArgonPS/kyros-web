import type { Metadata } from "next";
import Link from "next/link";
import { CLIENT_DOWNLOAD_URL, DISCORD_INVITE } from "@/lib/site";
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
            Unzip, run Play-Kyros.bat, and log in. The client targets{" "}
            <span className="text-white">play.kyrosps.io</span> — connection
            works once the world and DNS are live.
          </p>
          <a href={CLIENT_DOWNLOAD_URL} className="btn-primary mt-8 inline-flex">
            Download client
          </a>
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href={DISCORD_INVITE}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost"
            >
              Discord status
            </a>
            <Link href="/wiki/getting-started" className="btn-ghost">
              Getting started
            </Link>
          </div>
        </div>

        <ol className="mt-16 max-w-xl list-decimal space-y-3 pl-5 text-[color:var(--fg-muted)]">
          <li>Install Java 17 or newer from Adoptium.</li>
          <li>Download and unzip the Kyros client.</li>
          <li>Run Play-Kyros.bat and create your character.</li>
        </ol>
      </div>
    </>
  );
}
