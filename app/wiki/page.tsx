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
    summary: "First login, controls, and where to begin.",
  },
  {
    slug: "economy",
    title: "Economy",
    summary: "Donator Points, Kyro Points, trading, and store basics.",
  },
  {
    slug: "commands",
    title: "Commands",
    summary: "Useful player commands once the world is live.",
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
                className="group block py-7 transition hover:pl-1"
              >
                <h2 className="font-display text-xl text-[color:var(--gold)] group-hover:text-[color:var(--gold-bright)]">
                  {article.title}
                </h2>
                <p className="mt-2 text-sm text-[color:var(--fg-muted)]">
                  {article.summary}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
