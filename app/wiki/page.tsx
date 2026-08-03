import type { Metadata } from "next";
import Link from "next/link";

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
    summary: "Kyro Points, trading, and store basics.",
  },
  {
    slug: "commands",
    title: "Commands",
    summary: "Useful player commands once the world is live.",
  },
];

export default function WikiPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 pb-24 pt-32 md:px-8 md:pt-36">
      <p className="font-display text-sm tracking-[0.3em] text-[color:var(--gold)]">
        GUIDES
      </p>
      <h1 className="mt-4 font-display text-4xl tracking-wide md:text-5xl">
        Wiki
      </h1>
      <p className="mt-5 max-w-2xl text-[color:var(--fg-muted)]">
        Player guides and server docs. Articles expand as content is ready.
      </p>

      <ul className="mt-12 max-w-2xl">
        {articles.map((article) => (
          <li key={article.slug} className="border-t border-[color:var(--line)]">
            <Link
              href={`/wiki/${article.slug}`}
              className="block py-6 transition hover:pl-1"
            >
              <h2 className="font-display text-xl text-[color:var(--gold)]">
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
  );
}
