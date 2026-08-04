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
    badge: ".jar file",
    subtitle: "Requires Java 17+",
    description:
      "Single Kyros.jar download. Install Java 17+ first (links below). Prefer the Windows Setup if this fails to open.",
    href: `${RELEASE_BASE}/Kyros.jar`,
    cta: "Download JAR",
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

/** Adoptium Temurin 17 direct installers (latest GA). */
export const JAVA_DOWNLOADS = [
  {
    label: "Download Windows JDK 17 installer",
    href: "https://api.adoptium.net/v3/binary/latest/17/ga/windows/x64/jdk/hotspot/normal/eclipse?project=jdk",
  },
  {
    label: "Download Apple Intel JDK 17 installer",
    href: "https://api.adoptium.net/v3/binary/latest/17/ga/mac/x64/jdk/hotspot/normal/eclipse?project=jdk",
  },
  {
    label: "Download Apple Silicon (M1–M3) JDK 17 installer",
    href: "https://api.adoptium.net/v3/binary/latest/17/ga/mac/aarch64/jdk/hotspot/normal/eclipse?project=jdk",
  },
] as const;
