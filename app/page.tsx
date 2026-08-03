import Image from "next/image";
import Link from "next/link";
import { DISCORD_INVITE } from "@/lib/site";

const contentTiles = [
  {
    title: "PvP Content",
    body: "Wilderness fights, risk, and competitive PKing when the world is live.",
    href: "/download",
    tone: "linear-gradient(135deg, rgba(196,60,40,0.55), rgba(10,10,10,0.2))",
  },
  {
    title: "PvM Content",
    body: "Raids, bosses, and endgame hunts with friends from Discord LFG.",
    href: "/download",
    tone: "linear-gradient(135deg, rgba(224,180,74,0.4), rgba(10,10,10,0.25))",
  },
  {
    title: "Skilling Content",
    body: "Train, gather, and climb the hiscores across every skill.",
    href: "/hiscores",
    tone: "linear-gradient(135deg, rgba(47,143,136,0.45), rgba(10,10,10,0.25))",
  },
  {
    title: "Community",
    body: "Tickets, events, announcements — the Discord is already open.",
    href: DISCORD_INVITE,
    external: true,
    tone: "linear-gradient(135deg, rgba(80,80,90,0.5), rgba(10,10,10,0.3))",
  },
];

export default function HomePage() {
  return (
    <>
      {/* Hero — Roat-style full bleed */}
      <section className="relative min-h-[92svh] overflow-hidden">
        <Image
          src="/kyros-hero-bg.png"
          alt=""
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/75 to-black/35" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40" />

        <div className="relative mx-auto flex min-h-[92svh] max-w-6xl flex-col justify-center px-4 pb-16 pt-10 md:px-8">
          <div className="animate-rise online-pill w-fit">
            <span className="online-dot" aria-hidden />
            Community is live — join them
          </div>

          <p className="animate-rise-delay mt-8 font-display text-sm tracking-[0.28em] text-white/70 uppercase md:text-base">
            Explore the content of
          </p>
          <h1 className="animate-rise-delay mt-3 font-brand text-6xl tracking-[0.12em] text-white sm:text-7xl md:text-8xl lg:text-9xl">
            <span className="gold-text">KYROS</span>
          </h1>
          <p className="animate-rise-delay-2 mt-2 font-display text-2xl tracking-[0.08em] text-white uppercase md:text-4xl">
            Here
          </p>
          <p className="animate-rise-delay-2 mt-6 max-w-lg text-base leading-relaxed text-white/75 md:text-lg">
            If you&apos;re ready to play, download the client. Until launch, jump
            into Discord for news, tickets, and the community.
          </p>
          <div className="animate-rise-delay-2 mt-9 flex flex-wrap gap-4">
            <Link href="/download" className="btn-play">
              Play Now
            </Link>
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

      {/* Content tiles */}
      <section className="bg-[#070707] py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-4 md:px-8">
          <div className="mb-10 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="font-display text-3xl tracking-[0.08em] text-white uppercase md:text-4xl">
                Explore Kyros
              </h2>
              <p className="mt-2 max-w-xl text-[color:var(--fg-muted)]">
                PvP, PvM, skilling, and community — pick your path and jump in.
              </p>
            </div>
            <Link href="/download" className="btn-play w-fit">
              Play Now
            </Link>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {contentTiles.map((tile) => {
              const style = {
                ["--tile-bg" as string]: `${tile.tone}, url('/kyros-hero-bg.png')`,
              };
              const inner = (
                <div className="flex h-full min-h-[260px] flex-col justify-end p-6 md:p-8">
                  <h3 className="font-display text-2xl tracking-[0.1em] text-white uppercase md:text-3xl">
                    {tile.title}
                  </h3>
                  <p className="mt-3 max-w-sm text-sm leading-relaxed text-white/75">
                    {tile.body}
                  </p>
                  <span className="btn-play mt-6 w-fit !py-2 !text-xs">
                    Play Now
                  </span>
                </div>
              );

              if (tile.external) {
                return (
                  <a
                    key={tile.title}
                    href={tile.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="content-tile block"
                    style={style}
                  >
                    {inner}
                  </a>
                );
              }

              return (
                <Link
                  key={tile.title}
                  href={tile.href}
                  className="content-tile block"
                  style={style}
                >
                  {inner}
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Bottom CTA like Roat */}
      <section className="relative overflow-hidden border-y border-white/10">
        <Image
          src="/kyros-hero-bg.png"
          alt=""
          fill
          className="object-cover object-[center_70%] opacity-40"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/75" />
        <div className="relative mx-auto max-w-3xl px-4 py-20 text-center md:px-8 md:py-24">
          <h2 className="font-display text-3xl tracking-[0.1em] text-white uppercase md:text-5xl">
            Ready to join the action?
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-[color:var(--fg-muted)] md:text-lg">
            Like what you see? More content is coming weekly. Download when the
            world opens — or join Discord now and be first in line.
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <Link href="/download" className="btn-play">
              Play Now
            </Link>
            <Link href="/hiscores" className="btn-ghost">
              Hiscores
            </Link>
            <a
              href={DISCORD_INVITE}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              Join Discord
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
