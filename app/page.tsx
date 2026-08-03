import Link from "next/link";

export default function HomePage() {
  return (
    <>
      <section className="relative flex min-h-[100svh] items-center overflow-hidden">
        <div
          aria-hidden
          className="glow-orb pointer-events-none absolute left-1/2 top-[18%] h-[42vmin] w-[70vmin] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(212,168,75,0.28),transparent_70%)] blur-2xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[color:var(--bg)] to-transparent"
        />

        <div className="relative mx-auto w-full max-w-6xl px-5 pb-24 pt-32 md:px-8 md:pt-36">
          <p className="animate-rise font-display text-sm tracking-[0.35em] text-[color:var(--gold)] md:text-base">
            KYROS
          </p>
          <h1 className="animate-rise-delay mt-5 max-w-3xl font-display text-4xl leading-[1.1] tracking-wide text-[color:var(--fg)] md:text-6xl lg:text-7xl">
            Forge your legend on{" "}
            <span className="gold-text">kyrosps.io</span>
          </h1>
          <p className="animate-rise-delay-2 mt-6 max-w-xl text-base leading-relaxed text-[color:var(--fg-muted)] md:text-lg">
            A private Old School experience — download the client, claim vote
            rewards, and step into Gielinor your way.
          </p>
          <div className="animate-rise-delay-2 mt-10 flex flex-wrap gap-4">
            <Link href="/download" className="btn-primary">
              Download Client
            </Link>
            <Link href="/discord" className="btn-ghost">
              Join Discord
            </Link>
          </div>
        </div>
      </section>

      <section className="border-t border-[color:var(--line)] py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <h2 className="font-display text-3xl tracking-wide text-[color:var(--fg)] md:text-4xl">
            Built for players
          </h2>
          <p className="mt-4 max-w-2xl text-[color:var(--fg-muted)]">
            Everything you need to get in-game — client, votes, and store —
            from one place.
          </p>
          <div className="mt-12 grid gap-10 md:grid-cols-3">
            {[
              {
                title: "Download",
                body: "Get the Kyros client for Windows. Launch and connect in minutes.",
                href: "/download",
              },
              {
                title: "Vote",
                body: "Support the server on toplists and claim in-game rewards.",
                href: "/vote",
              },
              {
                title: "Store",
                body: "Kyro Points and perks — Stripe and PayPal when live.",
                href: "/store",
              },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group block border-t border-[color:var(--line)] pt-6 transition hover:border-[color:var(--gold)]"
              >
                <h3 className="font-display text-xl tracking-wide text-[color:var(--gold)] group-hover:text-[#f0d78c]">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[color:var(--fg-muted)]">
                  {item.body}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
