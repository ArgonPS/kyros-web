"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const SLIDES = [
  {
    src: "/hero/nex.png",
    label: "Nex",
    tint: "from-sky-900/35 via-transparent to-indigo-950/40",
    ken: "hero-ken-nex",
  },
  {
    src: "/hero/inferno.png",
    label: "Inferno",
    tint: "from-orange-900/40 via-transparent to-red-950/45",
    ken: "hero-ken-inferno",
  },
  {
    src: "/hero/raid.png",
    label: "Raids",
    tint: "from-rose-950/40 via-transparent to-red-950/50",
    ken: "hero-ken-raid",
  },
] as const;

const INTERVAL_MS = 6500;

export function HeroBackdrop() {
  const [index, setIndex] = useState(0);
  const [cycle, setCycle] = useState(0);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [progress, setProgress] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);
  const parallaxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduceMotion(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (reduceMotion) {
      setProgress(1);
      return;
    }

    let frame = 0;
    const start = performance.now();

    const tick = (now: number) => {
      const elapsed = now - start;
      const p = Math.min(1, elapsed / INTERVAL_MS);
      setProgress(p);

      if (p >= 1) {
        setIndex((i) => (i + 1) % SLIDES.length);
        setCycle((c) => c + 1);
        return;
      }

      frame = requestAnimationFrame(tick);
    };

    setProgress(0);
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [reduceMotion, cycle]);

  useEffect(() => {
    if (reduceMotion) return;
    const root = rootRef.current;
    const layer = parallaxRef.current;
    if (!root || !layer) return;

    let raf = 0;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    const onMove = (e: PointerEvent) => {
      const rect = root.getBoundingClientRect();
      const nx = (e.clientX - rect.left) / rect.width - 0.5;
      const ny = (e.clientY - rect.top) / rect.height - 0.5;
      targetX = nx * 18;
      targetY = ny * 12;
    };

    const onLeave = () => {
      targetX = 0;
      targetY = 0;
    };

    const loop = () => {
      currentX += (targetX - currentX) * 0.06;
      currentY += (targetY - currentY) * 0.06;
      layer.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;
      raf = requestAnimationFrame(loop);
    };

    root.addEventListener("pointermove", onMove);
    root.addEventListener("pointerleave", onLeave);
    raf = requestAnimationFrame(loop);

    return () => {
      root.removeEventListener("pointermove", onMove);
      root.removeEventListener("pointerleave", onLeave);
      cancelAnimationFrame(raf);
      layer.style.transform = "";
    };
  }, [reduceMotion]);

  const goTo = (i: number) => {
    setIndex(i);
    setCycle((c) => c + 1);
  };

  return (
    <div ref={rootRef} className="absolute inset-0 overflow-hidden">
      <div
        ref={parallaxRef}
        className="pointer-events-none absolute inset-[-4%] will-change-transform"
        aria-hidden
      >
        {SLIDES.map((slide, i) => (
          <div
            key={slide.src}
            className={[
              "absolute inset-0 transition-opacity duration-[1400ms] ease-[cubic-bezier(0.4,0,0.2,1)]",
              i === index ? "opacity-100" : "opacity-0",
            ].join(" ")}
          >
            <Image
              src={slide.src}
              alt=""
              fill
              priority={i === 0}
              sizes="100vw"
              className={[
                "object-cover object-center",
                !reduceMotion && i === index ? slide.ken : "scale-110",
              ].join(" ")}
            />
            <div
              className={`absolute inset-0 bg-gradient-to-br ${slide.tint} transition-opacity duration-1000 ${
                i === index ? "opacity-100" : "opacity-0"
              }`}
            />
          </div>
        ))}
      </div>

      {!reduceMotion && (
        <div
          className="pointer-events-none absolute inset-0 opacity-40 mix-blend-soft-light"
          aria-hidden
        >
          <div className="hero-shimmer absolute inset-0" />
        </div>
      )}

      <div className="pointer-events-none absolute inset-0 bg-black/40" aria-hidden />
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black via-black/45 to-black/35"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.45)_68%,rgba(0,0,0,0.8)_100%)]"
        aria-hidden
      />

      <div className="absolute inset-x-0 bottom-6 z-10 flex items-center justify-center gap-3 px-4">
        {SLIDES.map((slide, i) => {
          const active = i === index;
          return (
            <button
              key={slide.src}
              type="button"
              aria-label={`Show ${slide.label}`}
              aria-current={active ? "true" : undefined}
              onClick={() => goTo(i)}
              className="relative h-1.5 w-10 overflow-hidden rounded-full bg-white/20 transition hover:bg-white/35"
            >
              <span
                className="absolute inset-y-0 left-0 bg-[color:var(--gold)]"
                style={{
                  width: active
                    ? `${reduceMotion ? 100 : Math.max(progress * 100, 3)}%`
                    : "0%",
                }}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}
