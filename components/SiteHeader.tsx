"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { DISCORD_INVITE, NAV_LINKS, TOP_LINKS } from "@/lib/site";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50">
      <div className="border-b border-white/10 bg-black/90 text-xs">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-2 md:px-8">
          <div className="flex flex-wrap items-center gap-4 text-[color:var(--fg-muted)]">
            <span className="hidden font-display tracking-[0.16em] text-[color:var(--gold)] uppercase sm:inline">
              More on Kyros
            </span>
            {TOP_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="tracking-wide uppercase transition hover:text-[color:var(--gold)]"
              >
                {link.label}
              </Link>
            ))}
          </div>
          <a
            href={DISCORD_INVITE}
            target="_blank"
            rel="noopener noreferrer"
            className="font-display tracking-[0.14em] text-[color:var(--gold)] uppercase transition hover:text-[color:var(--gold-bright)]"
          >
            Join Discord
          </a>
        </div>
      </div>

      <div className="border-b border-white/10 bg-[#0a0a0a]/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 md:px-8">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/kyros-mark.png"
              alt=""
              width={42}
              height={42}
              className="h-10 w-10 object-cover"
              priority
            />
            <span className="font-brand text-xl tracking-[0.2em] text-white md:text-2xl">
              KYROS
            </span>
          </Link>

          <nav className="hidden items-center gap-6 lg:flex">
            {NAV_LINKS.map((link) => {
              const active =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`font-display text-sm tracking-[0.14em] uppercase transition ${
                    active
                      ? "text-[color:var(--gold)]"
                      : "text-white/70 hover:text-white"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <Link href="/download" className="btn-play !py-2.5 !text-xs sm:!text-sm">
              Download Client
            </Link>
            <button
              type="button"
              aria-label="Menu"
              className="grid h-10 w-10 place-items-center border border-white/15 text-white lg:hidden"
              onClick={() => setOpen((v) => !v)}
            >
              {open ? "×" : "☰"}
            </button>
          </div>
        </div>

        {open ? (
          <div className="border-t border-white/10 bg-black px-4 py-4 lg:hidden">
            <nav className="flex flex-col gap-3">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="font-display tracking-[0.14em] text-white/80 uppercase"
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <a
                href={DISCORD_INVITE}
                target="_blank"
                rel="noopener noreferrer"
                className="font-display tracking-[0.14em] text-[color:var(--gold)] uppercase"
              >
                Discord
              </a>
            </nav>
          </div>
        ) : null}
      </div>
    </header>
  );
}
