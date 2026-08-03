import Link from "next/link";

const links = [
  { href: "/download", label: "Download" },
  { href: "/vote", label: "Vote" },
  { href: "/store", label: "Store" },
  { href: "/discord", label: "Discord" },
  { href: "/wiki", label: "Wiki" },
];

export function SiteHeader() {
  return (
    <header className="absolute inset-x-0 top-0 z-40">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-5 md:px-8">
        <Link href="/" className="group flex items-center gap-3">
          <span
            aria-hidden
            className="grid h-9 w-9 place-items-center rounded-sm border border-[color:var(--line)] bg-[color:var(--bg-elevated)] font-display text-lg font-bold text-[color:var(--gold)] transition group-hover:border-[color:var(--gold)]"
          >
            K
          </span>
          <span className="font-display text-xl tracking-[0.18em] text-[color:var(--fg)] md:text-2xl">
            KYROS
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium tracking-wide text-[color:var(--fg-muted)] transition hover:text-[color:var(--gold)]"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <Link href="/download" className="btn-primary text-sm md:text-base">
          Play Now
        </Link>
      </div>
    </header>
  );
}
