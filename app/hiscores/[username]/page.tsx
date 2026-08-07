import type { Metadata } from "next";
import Image from "next/image";
import { HiscoreProfile } from "@/components/HiscoreProfile";

type Props = {
  params: Promise<{ username: string }>;
  searchParams: Promise<{ mode?: string; xp?: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { username } = await params;
  const name = decodeURIComponent(username);
  return {
    title: `${name} — Hiscores`,
    description: `Kyros hiscores profile for ${name}.`,
  };
}

export default async function HiscorePlayerPage({ params, searchParams }: Props) {
  const { username: raw } = await params;
  const sp = await searchParams;
  const username = decodeURIComponent(raw);
  const mode =
    sp.mode != null && sp.mode !== "" && Number.isFinite(Number(sp.mode))
      ? Number(sp.mode)
      : null;
  const xp =
    sp.xp != null && sp.xp !== "" && Number.isFinite(Number(sp.xp))
      ? Number(sp.xp)
      : null;

  return (
    <>
      <section className="relative overflow-hidden border-b border-white/10">
        <Image
          src="/gallery/nex.png"
          alt=""
          fill
          className="object-cover opacity-25"
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/80 to-[#050505]" />
        <div className="relative mx-auto max-w-6xl px-4 py-12 md:px-8 md:py-16">
          <p className="font-display text-sm tracking-[0.28em] text-[color:var(--gold)] uppercase">
            Player profile
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 py-10 pb-24 md:px-8">
        <HiscoreProfile
          username={username}
          initialMode={mode}
          initialXp={xp}
        />
      </div>
    </>
  );
}
