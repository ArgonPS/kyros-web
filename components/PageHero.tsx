import type { ReactNode } from "react";

type Props = {
  eyebrow: string;
  title: string;
  lead: string;
  children?: ReactNode;
};

export function PageHero({ eyebrow, title, lead, children }: Props) {
  return (
    <div className="relative overflow-hidden pb-10 pt-32 md:pt-36">
      <div
        aria-hidden
        className="glow-orb pointer-events-none absolute left-1/2 top-8 h-[28vmin] w-[55vmin] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(212,168,75,0.2),transparent_70%)] blur-2xl"
      />
      <div className="relative mx-auto max-w-6xl px-5 md:px-8">
        <p className="animate-rise font-display text-sm tracking-[0.34em] text-[color:var(--gold)]">
          {eyebrow}
        </p>
        <h1 className="animate-rise-delay mt-4 max-w-3xl font-display text-4xl tracking-wide md:text-5xl lg:text-6xl">
          {title}
        </h1>
        <p className="animate-rise-delay-2 mt-5 max-w-2xl text-base leading-relaxed text-[color:var(--fg-muted)] md:text-lg">
          {lead}
        </p>
        {children ? <div className="animate-rise-delay-2 mt-8">{children}</div> : null}
      </div>
    </div>
  );
}
