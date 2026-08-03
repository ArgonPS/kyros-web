import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

const articles: Record<
  string,
  { title: string; body: string[] }
> = {
  "getting-started": {
    title: "Getting started",
    body: [
      "Download the Kyros client from the Download page, then launch it with Java 17 or newer.",
      "Create your character in-game. There is no separate website signup for play.",
      "Explore starter areas and check the vote page when you want reward points.",
    ],
  },
  economy: {
    title: "Economy",
    body: [
      "Kyro Points are the donation currency used at the in-game point store.",
      "When the web store is live, purchases claim into your account via the game API.",
      "Trading between players follows the same spirit as Old School — fair play enforced by staff.",
    ],
  },
  commands: {
    title: "Commands",
    body: [
      "Player commands will be listed here once the live world config is finalized.",
      "Staff and debug commands are not published publicly.",
    ],
  },
};

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return Object.keys(articles).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = articles[slug];
  if (!article) return { title: "Wiki" };
  return { title: article.title };
}

export default async function WikiArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = articles[slug];
  if (!article) notFound();

  return (
    <article className="mx-auto max-w-3xl px-5 pb-24 pt-32 md:px-8 md:pt-36">
      <Link
        href="/wiki"
        className="text-sm text-[color:var(--fg-muted)] hover:text-[color:var(--gold)]"
      >
        ← Wiki
      </Link>
      <h1 className="mt-6 font-display text-4xl tracking-wide">{article.title}</h1>
      <div className="mt-8 space-y-5 text-[color:var(--fg-muted)] leading-relaxed">
        {article.body.map((para) => (
          <p key={para}>{para}</p>
        ))}
      </div>
    </article>
  );
}
