import type { Metadata } from "next";
import Link from "next/link";
import { DISCORD_INVITE } from "@/lib/site";
import { DOWNLOAD_OPTIONS } from "@/lib/downloads";
import { PageHero } from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Download",
  description: "Download the Kyros client for Windows or Mac and start playing.",
};

export default function DownloadPage() {
  return (
    <>
      <PageHero
        eyebrow="CLIENT"
        title="Download Kyros"
        lead="Create your account in-game — no website signup. Connects to play.kyrosps.io."
      />

      <div className="mx-auto max-w-6xl px-5 pb-24 md:px-8">
        <div className="grid gap-5 md:grid-cols-2">
          {DOWNLOAD_OPTIONS.map((opt) => (
            <article
              key={opt.id}
              className={`panel relative flex flex-col p-7 ${
                opt.recommended ? "ring-1 ring-[color:var(--gold)]/45" : ""
              }`}
            >
              {opt.recommended ? (
                <span className="absolute top-4 right-4 font-display text-[0.65rem] tracking-[0.16em] text-[color:var(--gold)] uppercase">
                  Recommended
                </span>
              ) : null}
              <p className="font-display text-xs tracking-[0.2em] text-[color:var(--fg-muted)] uppercase">
                {opt.badge}
              </p>
              <h2 className="mt-2 font-display text-2xl tracking-wide text-[color:var(--gold)]">
                {opt.title}
              </h2>
              <p className="mt-1 text-sm text-white/80">{opt.subtitle}</p>
              <p className="mt-4 flex-1 text-sm leading-relaxed text-[color:var(--fg-muted)]">
                {opt.description}
              </p>
              <a href={opt.href} className="btn-primary mt-8 inline-flex w-full">
                {opt.cta}
              </a>
            </article>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap gap-3">
          <a
            href={DISCORD_INVITE}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost"
          >
            Discord help
          </a>
          <Link href="/wiki/getting-started" className="btn-ghost">
            Getting started
          </Link>
          <a
            href="https://adoptium.net/"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost"
          >
            Get Java (Adoptium)
          </a>
        </div>

        <ol className="mt-16 max-w-2xl list-decimal space-y-3 pl-5 text-[color:var(--fg-muted)]">
          <li>
            Prefer <span className="text-white">Kyros-Setup.exe</span> — one
            installer, Java included, desktop shortcut created for you.
          </li>
          <li>
            JAR / Mac setups need Java 17+ from Adoptium. They install to your
            user folder — no unzipping a zip archive.
          </li>
          <li>Create your character in-game after the client loads.</li>
        </ol>
      </div>
    </>
  );
}
