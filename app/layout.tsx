import type { Metadata } from "next";
import { Cinzel, Figtree, Oswald } from "next/font/google";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import "./globals.css";

const cinzel = Cinzel({
  subsets: ["latin"],
  variable: "--font-cinzel",
  weight: ["400", "600", "700"],
});

const oswald = Oswald({
  subsets: ["latin"],
  variable: "--font-oswald",
  weight: ["400", "500", "600", "700"],
});

const figtree = Figtree({
  subsets: ["latin"],
  variable: "--font-figtree",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "Kyros — Private OSRS Server",
    template: "%s · Kyros",
  },
  description:
    "Kyros is a private Old School RuneScape server. Download the client, join Discord, climb hiscores, and vote for rewards.",
  metadataBase: new URL("https://kyrosps.io"),
  openGraph: {
    title: "Kyros",
    description: "Private Old School RuneScape — forge your legend.",
    url: "https://kyrosps.io",
    siteName: "Kyros",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cinzel.variable} ${oswald.variable} ${figtree.variable}`}
    >
      <body className="atmosphere antialiased">
        <SiteHeader />
        <main className="relative z-0 min-h-screen">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
