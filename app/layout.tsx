import type { Metadata } from "next";
import { Cinzel, Figtree } from "next/font/google";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import "./globals.css";

const cinzel = Cinzel({
  subsets: ["latin"],
  variable: "--font-cinzel",
  weight: ["400", "600", "700"],
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
    "Kyros is a private Old School RuneScape server. Download the client, join Discord, vote for rewards, and explore the wiki.",
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
    <html lang="en" className={`${cinzel.variable} ${figtree.variable}`}>
      <body className="atmosphere noise antialiased">
        <SiteHeader />
        <main className="relative z-0 min-h-screen">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
