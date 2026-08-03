import Link from "next/link";
import { DISCORD_INVITE } from "@/lib/site";

const paths = [
  {
    title: "Download",
    body: "Get the Kyros client and create your character in-game.",
    href: "/download",
    cta: "Get client",
  },
  {
    title: "Discord",
    body: "Announcements, tickets, LFG, and the player community.",
    href: DISCORD_INVITE,
    external: true,
    cta: "Join now",
  },
  {
    title: "Vote",
    body: "Support the world on toplists and claim in-game rewards.",
    href: "/vote",
    cta: "Vote sites",
  },
];

export default function HomePage() {
  return (
    <>
      <section className="relative flex min-h-[100svh] items-end overflow-hidden md:items-center">
        <div aria-hidden className="rune-grid pointer-events-none absolute inset-0" />
        <div
          aria-hidden
          className="glow-orb pointer-events-none absolute left-1/2 top-[12%] h-[48vmin] w-[80vmin] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(212,168,75,0.32),transparent_68%)] blur-3xl"
        />
        <div
          aria-hidden
          className="drift pointer-events-none absolute right-[-8%] top-[28%] hidden h-64 w-64 rounded-full border border-[color:var(--line)] opacity-40 md:block"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[color:var(--bg)] via-[color:var(--bg)]/80 to-transparent"
        />

        <div className="relative mx-auto w-full max-w-6xl px-5 pb-20 pt-36 md:px-8 md:pb-28 md:pt-40">
          <p className="animate-rise font-display text-xs tracking-[0.42em] text-[color:var(--gold)] md:text-sm">
            PRIVATE OSRS · KYROSPS.IO
          </p>
          <h1 className="animate-rise-delay mt-6 font-display text-[18vw] leading-[0.88] tracking-[0.08em] text-[color:var(--fg)] sm:text-[14vw] md:text-[9.5rem] lg:text-[11rem]">
            <span className="gold-text">KYROS</span>
          </h1>
          <p className="animate-rise-delay-2 mt-6 max-w-xl text-base leading-relaxed text-[color:var(--fg-muted)] md:mt-8 md:text-xl">
            Forge your legend. Download the client, join the Discord, and step
            into a private Old School world built for players.
          </p>
          <div className="animate-rise-delay-2 mt-10 flex flex-wrap gap-4">
            <Link href="/download" className="btn-primary">
              Download Client
            </Link>
            <a
              href={DISCORD_INVITE}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost"
            >
              Join Discord
            </a>
          </div>
        </div>
      </section>

      <div className="hairline" />

      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <div className="max-w-2xl">
            <h2 className="font-display text-3xl tracking-wide md:text-4xl">
              Enter the world
            </h2>
            <p className="mt-4 text-[color:var(--fg-muted)]">
              Everything you need before the first login — client, community,
              and votes.
            </p>
          </div>

          <div className="mt-14 grid gap-0 md:grid-cols-3">
            {paths.map((item, i) => {
              const className =
                "group relative block border-t border-[color:var(--line)] py-8 pr-4 transition hover:bg-white/[0.015] md:border-t-0 md:border-l md:px-8 md:py-4 first:md:border-l-0 first:md:pl-0";
              const inner = (
                <>
                  <p className="font-display text-xs tracking-[0.28em] text-[color:var(--gold-deep)]">
                    0{i + 1}
                  </p>
                  <h3 className="mt-4 font-display text-2xl tracking-wide text-[color:var(--gold)] transition group-hover:text-[color:var(--gold-bright)]">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-[color:var(--fg-muted)]">
                    {item.body}
                  </p>
                  <span className="mt-6 inline-block text-xs font-semibold uppercase tracking-[0.16em] text-[color:var(--fg)] transition group-hover:text-[color:var(--gold)]">
                    {item.cta} →
                  </span>
                </>
              );

              if ("external" in item && item.external) {
                return (
                  <a
                    key={item.title}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={className}
                  >
                    {inner}
                  </a>
                );
              }

              return (
                <Link key={item.title} href={item.href} className={className}>
                  {inner}
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <div className="hairline" />

      <section className="py-20 md:py-24">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-8 px-5 md:flex-row md:items-end md:px-8">
          <div className="max-w-xl">
            <h2 className="font-display text-3xl tracking-wide md:text-4xl">
              The community is live
            </h2>
            <p className="mt-4 text-[color:var(--fg-muted)]">
              Rules, tickets, announcements, and players — join Discord while
              the public world comes online.
            </p>
          </div>
          <a
            href={DISCORD_INVITE}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
          >
            discord.gg/munhcFgfez
          </a>
        </div>
      </section>
    </>
  );
}
