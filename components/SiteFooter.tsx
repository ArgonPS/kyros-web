import Link from "next/link";
import { DISCORD_INVITE, SITE_URL } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-[#080808]">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 md:grid-cols-4 md:px-8">
        <div className="md:col-span-1">
          <p className="font-brand text-2xl tracking-[0.18em] text-[color:var(--gold)]">
            KYROS
          </p>
          <p className="mt-4 text-sm leading-relaxed text-[color:var(--fg-muted)]">
            Community-driven private OSRS. Support the world by voting or the
            store — help keep Kyros online.
          </p>
        </div>

        <div>
          <h3 className="font-display text-sm tracking-[0.18em] text-white uppercase">
            Kyros
          </h3>
          <ul className="mt-4 space-y-2 text-sm text-[color:var(--fg-muted)]">
            <li>
              <Link href="/download" className="hover:text-[color:var(--gold)]">
                Play
              </Link>
            </li>
            <li>
              <Link href="/news" className="hover:text-[color:var(--gold)]">
                News
              </Link>
            </li>
            <li>
              <Link href="/hiscores" className="hover:text-[color:var(--gold)]">
                Hiscores
              </Link>
            </li>
            <li>
              <Link href="/store" className="hover:text-[color:var(--gold)]">
                Store
              </Link>
            </li>
            <li>
              <Link href="/vote" className="hover:text-[color:var(--gold)]">
                Vote
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-display text-sm tracking-[0.18em] text-white uppercase">
            Resources
          </h3>
          <ul className="mt-4 space-y-2 text-sm text-[color:var(--fg-muted)]">
            <li>
              <Link href="/wiki" className="hover:text-[color:var(--gold)]">
                Guides
              </Link>
            </li>
            <li>
              <Link href="/wiki/getting-started" className="hover:text-[color:var(--gold)]">
                Getting started
              </Link>
            </li>
            <li>
              <a
                href={DISCORD_INVITE}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[color:var(--gold)]"
              >
                Rules (Discord)
              </a>
            </li>
            <li>
              <a href={SITE_URL} className="hover:text-[color:var(--gold)]">
                kyrosps.io
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-display text-sm tracking-[0.18em] text-white uppercase">
            Support
          </h3>
          <ul className="mt-4 space-y-2 text-sm text-[color:var(--fg-muted)]">
            <li>
              <a
                href={DISCORD_INVITE}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[color:var(--gold)]"
              >
                Discord tickets
              </a>
            </li>
            <li>
              <Link href="/discord" className="hover:text-[color:var(--gold)]">
                Community
              </Link>
            </li>
          </ul>
          <a
            href={DISCORD_INVITE}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary mt-6 !px-4 !py-2.5 !text-xs"
          >
            Join Discord
          </a>
        </div>
      </div>
      <div className="border-t border-white/10 py-4 text-center text-xs text-[color:var(--fg-muted)]">
        © {new Date().getFullYear()} Kyros · Not affiliated with Jagex Ltd.
      </div>
    </footer>
  );
}
