import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Vote",
  description: "Vote for Kyros and claim in-game rewards.",
};

const sites = [
  {
    name: "RuneLocus",
    note: "Primary toplist — claim rewards in-game after voting.",
  },
  {
    name: "TopG",
    note: "Secondary list — vote once per cycle for bonus points.",
  },
  {
    name: "RSPS-List",
    note: "Extra visibility — helps keep Kyros growing.",
  },
];

export default function VotePage() {
  return (
    <div className="mx-auto max-w-6xl px-5 pb-24 pt-32 md:px-8 md:pt-36">
      <p className="font-display text-sm tracking-[0.3em] text-[color:var(--gold)]">
        SUPPORT
      </p>
      <h1 className="mt-4 font-display text-4xl tracking-wide md:text-5xl">
        Vote for Kyros
      </h1>
      <p className="mt-5 max-w-2xl text-[color:var(--fg-muted)]">
        Vote on the sites below, then claim your rewards in-game. Live vote
        links and automatic claiming will wire up when the API is online.
      </p>

      <ul className="mt-12 max-w-2xl space-y-0">
        {sites.map((site) => (
          <li
            key={site.name}
            className="flex flex-col gap-2 border-t border-[color:var(--line)] py-6 sm:flex-row sm:items-center sm:justify-between"
          >
            <div>
              <h2 className="font-display text-xl text-[color:var(--fg)]">
                {site.name}
              </h2>
              <p className="mt-1 text-sm text-[color:var(--fg-muted)]">
                {site.note}
              </p>
            </div>
            <span className="btn-ghost pointer-events-none text-sm opacity-50">
              Link soon
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
