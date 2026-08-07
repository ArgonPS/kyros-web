import Image from "next/image";
import Link from "next/link";
import { GalleryCarousel } from "@/components/GalleryCarousel";
import { HeroBackdrop } from "@/components/HeroBackdrop";
import { DISCORD_INVITE, NEWS } from "@/lib/site";

export default function HomePage() {
  return (
    <>
      {/* Hero — brand over Nex / Inferno / raids mix */}
      <section className="relative min-h-[88svh] overflow-hidden">
        <HeroBackdrop />

        <div className="relative mx-auto flex min-h-[88svh] max-w-6xl flex-col items-center justify-center px-4 pb-20 pt-16 text-center md:px-8">
          <Image
            src="/kyros-mark.png"
            alt="Kyros"
            width={128}
            height={128}
            className="animate-rise mb-6 h-24 w-24 rounded-2xl object-cover shadow-[0_0_40px_rgba(201,162,39,0.18)] md:h-28 md:w-28"
            priority
          />
          <h1 className="animate-rise-delay font-brand text-5xl tracking-[0.14em] text-white sm:text-6xl md:text-7xl">
            <span className="gold-text">KYROS</span>
          </h1>
          <p className="animate-rise-delay-2 mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/85 md:text-xl">
            Designed by passionate players — a private Old School experience with
            unique features and boundless fun. The game you love, reimagined.
          </p>
          <div className="animate-rise-delay-2 mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link href="/download" className="btn-play">
              Play Now
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

      {/* Welcome / About — Reason style */}
      <section className="bg-[#080808] py-16 md:py-24">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 md:grid-cols-2 md:px-8">
          <div>
            <p className="font-display text-sm tracking-[0.28em] text-[color:var(--gold)] uppercase">
              Welcome to Kyros
            </p>
            <h2 className="mt-3 font-display text-3xl tracking-[0.06em] text-white uppercase md:text-4xl">
              About Kyros
            </h2>
            <p className="mt-5 text-base leading-relaxed text-[color:var(--fg-muted)] md:text-lg">
              Kyros is a one-of-a-kind OSRS experience — veterans of the grind who
              wanted more fun, more content, and a community that actually sticks
              around. Download when the world opens, or jump into Discord today.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/download" className="btn-primary">
                Download Kyros
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
          <div className="relative aspect-[16/10] overflow-hidden border border-white/10">
            <Image
              src="/gallery/home.png"
              alt="Kyros home hub in Blood Torva"
              fill
              className="object-cover object-center"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>
      </section>

      {/* In-game gallery */}
      <section className="border-y border-white/10 bg-[#050505] py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-4 md:px-8">
          <div className="mb-10 text-center">
            <p className="font-display text-sm tracking-[0.28em] text-[color:var(--gold)] uppercase">
              In-game
            </p>
            <h2 className="mt-3 font-display text-3xl tracking-[0.06em] text-white uppercase md:text-4xl">
              See the world
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-[color:var(--fg-muted)]">
              Nex, DT2 bosses, Inferno, Blood Torva, and the Perk system — a
              taste of what&apos;s waiting on Kyros.
            </p>
          </div>
          <GalleryCarousel />
        </div>
      </section>

      {/* Latest news */}
      <section className="bg-[#0a0a0a] py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-4 md:px-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="font-display text-sm tracking-[0.28em] text-[color:var(--gold)] uppercase">
                Updates
              </p>
              <h2 className="mt-2 font-display text-3xl tracking-[0.06em] text-white uppercase md:text-4xl">
                Latest news
              </h2>
            </div>
            <Link
              href="/news"
              className="font-display text-sm tracking-[0.16em] text-[color:var(--gold)] uppercase hover:text-[color:var(--gold-bright)]"
            >
              Browse all news →
            </Link>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {NEWS.slice(0, 3).map((item) => (
              <article
                key={item.slug}
                className="border border-white/10 bg-black/40 p-6 transition hover:border-[color:var(--gold)]/50"
              >
                <p className="font-display text-xs tracking-[0.18em] text-[color:var(--fg-muted)] uppercase">
                  {item.date}
                </p>
                <h3 className="mt-3 font-display text-xl tracking-wide text-white uppercase">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[color:var(--fg-muted)]">
                  {item.excerpt}
                </p>
                <Link
                  href={`/news/${item.slug}`}
                  className="mt-5 inline-block text-xs font-semibold uppercase tracking-[0.16em] text-[color:var(--gold)]"
                >
                  Read more
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA — Reason style */}
      <section className="relative overflow-hidden py-20 md:py-28">
        <Image
          src="/gallery/gear.png"
          alt=""
          fill
          className="object-cover opacity-30"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/75" />
        <div className="relative mx-auto max-w-3xl px-4 text-center md:px-8">
          <h2 className="font-display text-3xl tracking-[0.08em] text-white uppercase md:text-5xl">
            Ready to begin your adventure?
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-[color:var(--fg-muted)] md:text-lg">
            Join a community of passionate players and experience a one-of-a-kind
            journey. Start today.
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <Link href="/download" className="btn-play">
              Play Now
            </Link>
            <a
              href={DISCORD_INVITE}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              Join Now
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
