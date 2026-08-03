import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Download",
  description: "Download the Kyros client and start playing.",
};

export default function DownloadPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 pb-24 pt-32 md:px-8 md:pt-36">
      <p className="font-display text-sm tracking-[0.3em] text-[color:var(--gold)]">
        CLIENT
      </p>
      <h1 className="mt-4 font-display text-4xl tracking-wide md:text-5xl">
        Download Kyros
      </h1>
      <p className="mt-5 max-w-2xl text-[color:var(--fg-muted)]">
        Grab the latest Windows client. After launch, create an account in-game
        — no website registration required.
      </p>

      <div className="mt-12 max-w-xl border border-[color:var(--line)] bg-[color:var(--bg-elevated)] p-8">
        <h2 className="font-display text-2xl text-[color:var(--gold)]">
          Windows
        </h2>
        <p className="mt-3 text-sm text-[color:var(--fg-muted)]">
          Requires Java 17+. The public launcher package will be linked here
          once hosting is live.
        </p>
        <span className="btn-primary mt-8 inline-flex cursor-not-allowed opacity-60">
          Coming Soon
        </span>
        <p className="mt-4 text-xs text-[color:var(--fg-muted)]">
          Local builds: use{" "}
          <code className="text-[color:var(--gold)]">client-localhost.jar</code>{" "}
          from the project until the public download is published.
        </p>
      </div>

      <div className="mt-16">
        <h2 className="font-display text-2xl tracking-wide">Quick start</h2>
        <ol className="mt-6 max-w-xl list-decimal space-y-3 pl-5 text-[color:var(--fg-muted)]">
          <li>Install a recent Java runtime (17+).</li>
          <li>Download and run the Kyros client.</li>
          <li>Create your character and join the world.</li>
        </ol>
        <Link href="/wiki" className="btn-ghost mt-8 inline-flex">
          Read the wiki
        </Link>
      </div>
    </div>
  );
}
