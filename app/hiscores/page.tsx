import type { Metadata } from "next";
import Image from "next/image";
import { HiscoresBoard } from "@/components/HiscoresBoard";

export const metadata: Metadata = {
  title: "Hiscores",
  description: "Kyros skills and boss hiscores leaderboards.",
};

export default function HiscoresPage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-white/10">
        <Image
          src="/gallery/boss.png"
          alt=""
          fill
          className="object-cover opacity-25"
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/80 to-[#050505]" />
        <div className="relative mx-auto max-w-6xl px-4 py-16 md:px-8 md:py-20">
          <p className="font-display text-sm tracking-[0.28em] text-[color:var(--gold)] uppercase">
            Leaderboards
          </p>
          <h1 className="mt-3 font-display text-4xl tracking-[0.08em] text-white uppercase md:text-6xl">
            Hiscores
          </h1>
          <p className="mt-4 max-w-2xl text-base text-[color:var(--fg-muted)] md:text-lg">
            Skills and boss rankings by XP mode and gamemode — same layout top
            servers use, built for Kyros.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 py-12 pb-24 md:px-8">
        <HiscoresBoard />
      </div>
    </>
  );
}
