import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { DISCORD_INVITE } from "@/lib/site";

const articles: Record<
  string,
  { title: string; body: string[] }
> = {
  "getting-started": {
    title: "Getting started",
    body: [
      "Install Java 17 or newer from Adoptium (Temurin). Older Java versions will not launch the client.",
      "Download from the Play page. Windows users should prefer the Launcher (bundled Java). Mac users unzip and open Play-Kyros.command. Create your character in-game — no website signup.",
      "Do not double-click Kyros.jar alone — use the launcher scripts or Kyros.exe. The client connects to play.kyrosps.io.",
      "Useful first steps in-game: ::home to return to Edgeville, talk to the starter guide, and open the vote / store pages from the website when you want rewards.",
      `Need help? Open a ticket on Discord: ${DISCORD_INVITE}`,
    ],
  },
  economy: {
    title: "Economy",
    body: [
      "Donator Points are the donation currency. Buy bonds from the Store, redeem them in-game, then spend at the Donator Point Store NPC.",
      "Rate: $1 = 100 Donator Points. Larger bonds grant bonus points (see the Store packages).",
      "Lifetime dollars donated unlock donator ranks with distinct chat icons and double-drop chance bonuses — Donator ($10), Super ($50), Elite ($100), Noble ($250), Gold ($500), Platinum ($1,000), Legendary ($2,500), Supreme ($5,000).",
      "Kyro Points (also called Reason Points) are a separate earnable currency for the in-game Kyro Point Store — not purchased with real money.",
      "Trading between players follows the same spirit as Old School — fair play enforced by staff.",
    ],
  },
  commands: {
    title: "Commands",
    body: [
      "Type ::commands in-game for the full scroll. Common player commands:",
      "Teleports: ::home / ::edge, ::train, ::slayer, ::shops, ::cox / ::raids / ::tob, ::gwd, ::mining, ::mlm, ::wcguild, ::abyss, ::dz (donator zone).",
      "Boss / event shortcuts: ::vb / ::gb / ::db / ::malakar, ::globalboss, plus named boss commands (for example ::duke, ::levi, ::muspah).",
      "Account & rewards: ::donated / ::claim, ::vote / ::claimvote, ::clear / ::empty, ::upgrade, ::task, ::bosstask, ::scrolls, ::raffle, ::dailies, ::yell, ::changepass.",
      "Website shortcuts: ::donate, ::vote, ::discord, ::hiscores.",
      "Staff and debug commands are not published publicly.",
    ],
  },
  ranks: {
    title: "Donator ranks",
    body: [
      "Ranks unlock from your lifetime donated total (not from a single package size). A $25 bond adds points; logos unlock at the thresholds below.",
      "Donator — $10+ · Super — $50+ · Elite — $100+ · Noble — $250+ · Gold — $500+ · Platinum — $1,000+ · Legendary — $2,500+ · Supreme — $5,000+.",
      "Each rank has a distinct chat icon/color and a higher double-drop chance (about 2.5% at Donator up to 7% at Supreme).",
      "See the Store page for bond packages and the full rank list.",
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
