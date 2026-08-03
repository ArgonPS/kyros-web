"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { DISCORD_INVITE, NAV_LINKS } from "@/lib/site";

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="absolute inset-x-0 top-0 z-40">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-5 md:px-8">
        <Link href="/" className="group flex items-center gap-3">
          <Image
            src="/kyros-mark.png"
            alt=""
            width={40}
            height={40}
            className="h-10 w-10 rounded-sm border border-[color:var(--line)] object-cover transition group-hover:border-[color:var(--gold)]"
            priority
          />
          <span className="font-display text-xl tracking-[0.22em] text-[color:var(--fg)] md:text-2xl">
            KYROS
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium tracking-[0.08em] text-[color:var(--fg-muted)] uppercase transition hover:text-[color:var(--gold)]"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={DISCORD_INVITE}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost hidden !px-4 !py-2.5 text-xs sm:inline-flex"
          >
            Discord
          </a>
          <Link href="/download" className="btn-primary !px-4 !py-2.5 text-xs md:text-sm">
            Play Now
          </Link>
          <button
            type="button"
            aria-label="Menu"
            aria-expanded={open}
            className="grid h-10 w-10 place-items-center border border-[color:var(--line)] text-[color:var(--fg)] md:hidden"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="font-display text-lg">{open ? "×" : "☰"}</span>
          </button>
        </div>
      </div>

      {open ? (
        <div className="border-t border-[color:var(--line)] bg-[rgba(7,6,5,0.96)] px-5 py-4 backdrop-blur-md md:hidden">
          <nav className="flex flex-col gap-3">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="py-2 font-display tracking-[0.14em] text-[color:var(--fg-muted)] uppercase"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <a
              href={DISCORD_INVITE}
              target="_blank"
              rel="noopener noreferrer"
              className="py-2 font-display tracking-[0.14em] text-[color:var(--gold)] uppercase"
            >
              Open Discord
            </a>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
