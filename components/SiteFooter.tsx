import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-[color:var(--line)] bg-[#080706]">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 py-10 md:flex-row md:items-center md:justify-between md:px-8">
        <div>
          <p className="font-display text-lg tracking-[0.16em] text-[color:var(--gold)]">
            KYROS
          </p>
          <p className="mt-2 max-w-md text-sm text-[color:var(--fg-muted)]">
            A private Old School RuneScape experience. Not affiliated with Jagex
            Ltd.
          </p>
        </div>
        <div className="flex flex-wrap gap-5 text-sm text-[color:var(--fg-muted)]">
          <Link href="/download" className="hover:text-[color:var(--gold)]">
            Download
          </Link>
          <Link href="/vote" className="hover:text-[color:var(--gold)]">
            Vote
          </Link>
          <Link href="/store" className="hover:text-[color:var(--gold)]">
            Store
          </Link>
          <Link href="/discord" className="hover:text-[color:var(--gold)]">
            Discord
          </Link>
          <Link href="/wiki" className="hover:text-[color:var(--gold)]">
            Wiki
          </Link>
        </div>
      </div>
    </footer>
  );
}
