import type { Metadata } from "next";
import Link from "next/link";
import { NEWS } from "@/lib/site";
import { PageHero } from "@/components/PageHero";

export const metadata: Metadata = {
  title: "News",
  description: "Latest Kyros updates and announcements.",
};

export default function NewsPage() {
  return (
    <>
      <PageHero
        eyebrow="UPDATES"
        title="Latest news"
        lead="Patch notes, events, and launch updates. More posts as the world comes online."
      />
      <div className="mx-auto max-w-6xl px-4 pb-24 md:px-8">
        <ul className="max-w-3xl space-y-0">
          {NEWS.map((item) => (
            <li key={item.slug} className="border-t border-white/10 py-8">
              <p className="font-display text-xs tracking-[0.2em] text-[color:var(--gold)] uppercase">
                {item.date}
              </p>
              <h2 className="mt-2 font-display text-2xl tracking-wide text-white uppercase">
                {item.title}
              </h2>
              <p className="mt-3 text-[color:var(--fg-muted)]">{item.excerpt}</p>
            </li>
          ))}
        </ul>
        <Link href="/" className="btn-ghost mt-10 inline-flex">
          ← Back home
        </Link>
      </div>
    </>
  );
}
