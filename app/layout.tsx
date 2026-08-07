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
    default: "Kyros — Old School. Reforged.",
    template: "%s · Kyros",
  },
  description:
    "Kyros — Old School. Reforged. Download the client, join Discord, climb hiscores, and vote for rewards.",
  metadataBase: new URL("https://kyrosps.io"),
  openGraph: {
    title: "Kyros — Old School. Reforged.",
    description: "Old School. Reforged. — forge your legend on Kyros.",
    url: "https://kyrosps.io",
    siteName: "Kyros",
    type: "website",
    images: [{ url: "/kyros-mark.png", width: 512, height: 512, alt: "Kyros" }],
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/kyros-mark.png", type: "image/png", sizes: "512x512" },
    ],
    apple: [{ url: "/apple-icon.png" }],
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
