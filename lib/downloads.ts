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
    badge: ".exe package",
    subtitle: "Recommended",
    description:
      "Bundled Java runtime — unzip and double-click Kyros.exe. No Java install needed.",
    href: `${RELEASE_BASE}/Kyros-Windows-Launcher.zip`,
    cta: "Download Windows Launcher",
    recommended: true,
  },
  {
    id: "windows-jar",
    title: "Windows JAR",
    badge: ".jar + launcher",
    subtitle: "Requires Java 17+",
    description:
      "Smaller download. Use Play-Kyros.bat (do not double-click the .jar — modern Java needs JVM flags).",
    href: `${RELEASE_BASE}/Kyros-Windows-JAR.zip`,
    cta: "Download Windows JAR",
  },
  {
    id: "mac",
    title: "macOS",
    badge: ".command launcher",
    subtitle: "Requires Java 17+",
    description:
      "Unzip, then right-click Play-Kyros.command → Open. Install Temurin Java from Adoptium if needed.",
    href: `${RELEASE_BASE}/Kyros-Mac.zip`,
    cta: "Download for Mac",
  },
  {
    id: "all-os",
    title: "All OS (JAR)",
    badge: ".jar file",
    subtitle: "Windows, Mac, Linux",
    description:
      "Cross-platform package with both Play-Kyros.bat and Play-Kyros.command. Requires Java 17+.",
    href: `${RELEASE_BASE}/Kyros-Client.zip`,
    cta: "Download JAR package",
  },
];
