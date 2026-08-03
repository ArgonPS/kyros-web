"use client";

import Image from "next/image";
import { useState } from "react";

const SHOTS = [
  { src: "/gallery/boss.png", alt: "Bossing on Kyros", label: "Bossing" },
  { src: "/gallery/raid.png", alt: "Raids on Kyros", label: "Raids" },
  { src: "/gallery/skilling.png", alt: "Skilling on Kyros", label: "Skilling" },
  { src: "/gallery/pvp.png", alt: "Wilderness PvP on Kyros", label: "Wilderness" },
  { src: "/gallery/city.png", alt: "Trading hub on Kyros", label: "Economy" },
];

export function GalleryCarousel() {
  const [index, setIndex] = useState(0);
  const shot = SHOTS[index];

  function prev() {
    setIndex((i) => (i - 1 + SHOTS.length) % SHOTS.length);
  }
  function next() {
    setIndex((i) => (i + 1) % SHOTS.length);
  }

  return (
    <div className="relative">
      <div className="relative aspect-[16/9] overflow-hidden border border-white/10 bg-black">
        <Image
          src={shot.src}
          alt={shot.alt}
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 960px"
          priority={index === 0}
        />
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-4 md:p-6">
          <p className="font-display text-sm tracking-[0.2em] text-[color:var(--gold)] uppercase">
            {shot.label}
          </p>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between gap-3">
        <button type="button" onClick={prev} className="btn-ghost !px-4 !py-2 !text-xs">
          ← Prev
        </button>
        <div className="flex flex-wrap justify-center gap-2">
          {SHOTS.map((s, i) => (
            <button
              key={s.src}
              type="button"
              aria-label={`Show ${s.label}`}
              onClick={() => setIndex(i)}
              className={`h-2.5 w-2.5 rounded-full transition ${
                i === index ? "bg-[color:var(--gold)]" : "bg-white/25 hover:bg-white/50"
              }`}
            />
          ))}
        </div>
        <button type="button" onClick={next} className="btn-ghost !px-4 !py-2 !text-xs">
          Next →
        </button>
      </div>

      <div className="mt-4 grid grid-cols-5 gap-2">
        {SHOTS.map((s, i) => (
          <button
            key={s.src}
            type="button"
            onClick={() => setIndex(i)}
            className={`relative aspect-video overflow-hidden border transition ${
              i === index
                ? "border-[color:var(--gold)]"
                : "border-white/10 opacity-70 hover:opacity-100"
            }`}
          >
            <Image src={s.src} alt="" fill className="object-cover" sizes="120px" />
          </button>
        ))}
      </div>
    </div>
  );
}
