import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Wiki",
  description: "Guides and information for Kyros players.",
};

const articles = [
  {
    slug: "getting-started",
    title: "Getting started",
    summary: "Java, download, first login, and where to begin.",
  },
  {
    slug: "economy",
    title: "Economy",
    summary: "Donator Points, Kyro Points, trading, and store basics.",
  },
  {
    slug: "ranks",
    title: "Donator ranks",
    summary: "Lifetime thresholds, chat icons, and rank perks.",
  },
  {
    slug: "commands",
    title: "Commands",
    summary: "Useful player teleports, claims, and account commands.",
  },
];

export default function WikiPage() {
  return (
    <>
      <PageHero
        eyebrow="GUIDES"
        title="Wiki"
        lead="Player guides and server docs. More articles as content lands."
      />

      <div className="mx-auto max-w-6xl px-5 pb-24 md:px-8">
        <ul className="max-w-2xl">
          {articles.map((article) => (
            <li key={article.slug} className="border-t border-[color:var(--line)]">
              <Link
                href={`/wiki/${article.slug}`}
                className="group flex flex-col gap-1 py-5"
              >
                <span className="font-display text-xl tracking-wide text-[color:var(--gold)] group-hover:text-[color:var(--gold-bright)]">
                  {article.title}
                </span>
                <span className="text-sm text-[color:var(--fg-muted)]">
                  {article.summary}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
