import Link from "next/link";
import { DISCORD_INVITE, NAV_LINKS, SITE_URL } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="relative border-t border-[color:var(--line)] bg-[#050403]">
      <div className="hairline absolute inset-x-0 top-0" />
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 md:grid-cols-[1.4fr_1fr] md:px-8">
        <div>
          <p className="font-display text-2xl tracking-[0.2em] text-[color:var(--gold)]">
            KYROS
          </p>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-[color:var(--fg-muted)]">
            A private Old School RuneScape experience. Forge your legend at{" "}
            <a href={SITE_URL} className="text-[color:var(--gold-bright)]">
              kyrosps.io
            </a>
            . Not affiliated with Jagex Ltd.
          </p>
          <a
            href={DISCORD_INVITE}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary mt-8 inline-flex"
          >
            Join Discord
          </a>
        </div>
        <div className="grid grid-cols-2 gap-3 text-sm text-[color:var(--fg-muted)] sm:justify-items-end">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="tracking-wide transition hover:text-[color:var(--gold)]"
            >
              {link.label}
            </Link>
          ))}
          <a
            href={DISCORD_INVITE}
            target="_blank"
            rel="noopener noreferrer"
            className="tracking-wide transition hover:text-[color:var(--gold)]"
          >
            Open Discord
          </a>
        </div>
      </div>
    </footer>
  );
}
