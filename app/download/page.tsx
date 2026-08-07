import type { Metadata } from "next";
import Link from "next/link";
import { DISCORD_INVITE } from "@/lib/site";
import { DOWNLOAD_OPTIONS, JAVA_DOWNLOADS } from "@/lib/downloads";
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
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
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

        <section className="mt-20">
          <h2 className="text-center font-display text-3xl tracking-[0.12em] text-[color:var(--gold)] uppercase md:text-4xl">
            Help &amp; Support
          </h2>

          <div className="mt-8 grid gap-5 md:grid-cols-2">
            <article className="panel p-7 md:col-span-2">
              <h3 className="text-xl font-semibold text-white">
                Installing on Mac (&quot;Apple could not verify…&quot; warning)
              </h3>
              <p className="mt-2 text-sm text-[color:var(--fg-muted)]">
                The Kyros installer isn&apos;t signed with an Apple developer
                certificate yet, so macOS shows a security warning. The
                installer is safe — here&apos;s the easiest way to run it:
              </p>
              <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm text-[color:var(--fg-muted)]">
                <li>
                  Download <span className="text-white">Kyros-Mac-Setup.command</span> above.
                </li>
                <li>
                  Open the <span className="text-white">Terminal</span> app
                  (press <span className="text-white">Cmd+Space</span>, type
                  &quot;Terminal&quot;, hit Enter).
                </li>
                <li>
                  Paste this and press Enter:
                  <code className="mt-2 block rounded bg-black/40 px-3 py-2 font-mono text-[color:var(--gold)]">
                    bash ~/Downloads/Kyros-Mac-Setup.command
                  </code>
                </li>
                <li>
                  Kyros installs to{" "}
                  <span className="text-white">~/Applications/Kyros</span> and
                  launches. Next time, just double-click{" "}
                  <span className="text-white">Play-Kyros.command</span> in
                  that folder.
                </li>
              </ol>
              <p className="mt-4 text-sm text-[color:var(--fg-muted)]">
                Alternative: double-click the download, dismiss the warning,
                then go to System Settings → Privacy &amp; Security and click{" "}
                <span className="text-white">Open Anyway</span>. If the game
                doesn&apos;t start, install Java 17 below and try again.
              </p>
            </article>

            <article className="panel p-7">
              <h3 className="text-xl font-semibold text-white">
                Download Java 17
              </h3>
              <p className="mt-2 text-sm text-[color:var(--fg-muted)]">
                JAR and Mac packages need Java 17+. Install from below:
              </p>
              <ul className="mt-5 space-y-3">
                {JAVA_DOWNLOADS.map((item) => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-[color:var(--gold)] underline-offset-4 hover:underline"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </article>

            <article className="panel flex flex-col p-7">
              <h3 className="text-xl font-semibold text-white">
                Need additional help?
              </h3>
              <p className="mt-2 flex-1 text-sm text-[color:var(--fg-muted)]">
                Come reach out to us on Discord.
              </p>
              <a
                href={DISCORD_INVITE}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost mt-8 inline-flex w-full items-center justify-center gap-2"
              >
                <svg
                  aria-hidden
                  viewBox="0 0 24 24"
                  className="h-5 w-5 fill-current"
                >
                  <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
                </svg>
                Join Discord
              </a>
              <Link
                href="/wiki/getting-started"
                className="mt-3 text-center text-sm text-[color:var(--fg-muted)] underline-offset-4 hover:text-white hover:underline"
              >
                Getting started wiki
              </Link>
            </article>
          </div>
        </section>
      </div>
    </>
  );
}
