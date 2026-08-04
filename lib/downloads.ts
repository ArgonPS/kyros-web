const RELEASE_BASE =
  process.env.NEXT_PUBLIC_CLIENT_RELEASE_BASE?.trim() ||
  "https://github.com/ArgonPS/kyros-web/releases/latest/download";

export type DownloadOption = {
  id: string;
  title: string;
  badge?: string;
  subtitle: string;
  description: string;
  href: string;
  cta: string;
  recommended?: boolean;
};

export const DOWNLOAD_OPTIONS: DownloadOption[] = [
  {
    id: "windows-launcher",
    title: "Windows Launcher",
    badge: ".exe setup",
    subtitle: "Recommended",
    description:
      "Installer with Java bundled. Run Kyros-Setup.exe — no unzipping, no Java install.",
    href: `${RELEASE_BASE}/Kyros-Setup.exe`,
    cta: "Download Windows Setup",
    recommended: true,
  },
  {
    id: "windows-jar",
    title: "Windows JAR",
    badge: ".exe setup",
    subtitle: "Requires Java 17+",
    description:
      "Smaller installer. Installs the JAR client and desktop shortcut. Needs Java from Adoptium.",
    href: `${RELEASE_BASE}/Kyros-JAR-Setup.exe`,
    cta: "Download JAR Setup",
  },
  {
    id: "mac",
    title: "macOS",
    badge: ".command setup",
    subtitle: "Requires Java 17+",
    description:
      "Double-click Kyros-Mac-Setup.command to install into ~/Applications/Kyros. Install Temurin Java if needed.",
    href: `${RELEASE_BASE}/Kyros-Mac-Setup.command`,
    cta: "Download Mac Setup",
  },
];
