import type { ReactNode } from "react";

type Props = {
  eyebrow: string;
  title: string;
  lead: string;
  children?: ReactNode;
};

export function PageHero({ eyebrow, title, lead, children }: Props) {
  return (
    <div className="relative overflow-hidden border-b border-white/10 bg-[#0a0a0a] pb-10 pt-14 md:pt-16">
      <div className="relative mx-auto max-w-6xl px-4 md:px-8">
        <p className="animate-rise font-display text-sm tracking-[0.28em] text-[color:var(--gold)] uppercase">
          {eyebrow}
        </p>
        <h1 className="animate-rise-delay mt-3 font-display text-4xl tracking-[0.06em] text-white uppercase md:text-5xl lg:text-6xl">
          {title}
        </h1>
        <p className="animate-rise-delay-2 mt-4 max-w-2xl text-base leading-relaxed text-[color:var(--fg-muted)] md:text-lg">
          {lead}
        </p>
        {children ? <div className="animate-rise-delay-2 mt-8">{children}</div> : null}
      </div>
    </div>
  );
}
