import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { NEWS, getNewsArticle } from "@/lib/news";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return NEWS.map((n) => ({ slug: n.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = getNewsArticle(slug);
  if (!article) return { title: "News" };
  return {
    title: article.title,
    description: article.excerpt,
  };
}

export default async function NewsArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = getNewsArticle(slug);
  if (!article) notFound();

  return (
    <article className="mx-auto max-w-3xl px-5 pb-24 pt-32 md:px-8 md:pt-36">
      <Link
        href="/news"
        className="text-sm text-[color:var(--fg-muted)] hover:text-[color:var(--gold)]"
      >
        ← News
      </Link>
      <p className="mt-6 font-display text-xs tracking-[0.2em] text-[color:var(--gold)] uppercase">
        {article.date}
      </p>
      <h1 className="mt-3 font-display text-4xl tracking-wide text-white uppercase">
        {article.title}
      </h1>
      <div className="mt-8 space-y-5 text-[color:var(--fg-muted)] leading-relaxed">
        {article.body.map((para) => (
          <p key={para.slice(0, 48)}>{para}</p>
        ))}
      </div>
      <Link href="/news" className="btn-ghost mt-12 inline-flex">
        ← Back to news
      </Link>
    </article>
  );
}
