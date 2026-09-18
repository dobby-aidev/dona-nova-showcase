import type { Metadata } from "next";
import { Cinzel, JetBrains_Mono, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["500", "700", "800", "900"],
  variable: "--font-cinzel",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-mono",
  display: "swap",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-sans",
  display: "swap",
});

const NOVA_FAVICON_DATA_URI =
  "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMiAzMiIgd2lkdGg9IjMyIiBoZWlnaHQ9IjMyIj4KICA8ZGVmcz4KICAgIDxsaW5lYXJHcmFkaWVudCBpZD0iaGRyU3RhckdvbGQiIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMTAwJSIgeTI9IjEwMCUiPgogICAgICA8c3RvcCBvZmZzZXQ9IjAlIiBzdG9wLWNvbG9yPSIjRkZGRkZGIiAvPgogICAgICA8c3RvcCBvZmZzZXQ9IjI1JSIgc3RvcC1jb2xvcj0iI0ZGRTA4MiIgLz4KICAgICAgPHN0b3Agb2Zmc2V0PSI2MCUiIHN0b3AtY29sb3I9IiNGNUQ3N0YiIC8+CiAgICAgIDxzdG9wIG9mZnNldD0iODUlIiBzdG9wLWNvbG9yPSIjRDRBRjM3IiAvPgogICAgICA8c3RvcCBvZmZzZXQ9IjEwMCUiIHN0b3AtY29sb3I9IiM4QzZEMjMiIC8+CiAgICA8L2xpbmVhckdyYWRpZW50PgogIDwvZGVmcz4KICA8cmVjdCB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHJ4PSI3IiBmaWxsPSIjMDcwODBlIiAvPgogIDxjaXJjbGUgY3g9IjE2IiBjeT0iMTYiIHI9IjExIiBmaWxsPSJub25lIiBzdHJva2U9IiNENEFGMzciIHN0cm9rZS13aWR0aD0iMS4yIiBvcGFjaXR5PSIwLjYiIC8+CiAgPHBhdGggZD0iTTE2IDcuNSBMMTcuOCAxNC4yIEwyNC41IDE2IEwxNy44IDE3LjggTDE2IDI0LjUgTDE0LjIgMTcuOCBMNy41IDE2IEwxNC4yIDE0LjIgWiIgZmlsbD0iI0Q0QUYzNyIgb3BhY2l0eT0iMC45IiAvPgogIDxwYXRoIGQ9Ik0xNiAyLjUgUTE2IDE2IDI5LjUgMTYgUTE2IDE2IDE2IDI5LjUgUTE2IDE2IDIuNSAxNiBRMTYgMTYgMTYgMi41IFoiIGZpbGw9InVybCgjaGRyU3RhckdvbGQpIiAvPgogIDxjaXJjbGUgY3g9IjE2IiBjeT0iMTYiIHI9IjMuMiIgZmlsbD0iIzA3MDgwZSIgc3Ryb2tlPSIjRkZGIiBzdHJva2Utd2lkdGg9IjAuOCIgLz4KICA8Y2lyY2xlIGN4PSIxNiIgY3k9IjE2IiByPSIxLjgiIGZpbGw9IiNGRkZGRkYiIC8+Cjwvc3ZnPg==";

export const metadata: Metadata = {
  title: "Dona Nova",
  description:
    "Open-source global infrastructure intelligence radar. Explore 3,160+ verified power grids, water networks, and AI data centers in photorealistic 3D.",
  keywords: ["infrastructure", "open-source", "energy-grid", "satellite-3d", "dona-nova", "dona-codex"],
  authors: [
    { name: "dobby-aidev", url: "https://dobby.donacodex.com" },
    { name: "Dona Codex", url: "https://donacodex.com" }
  ],
  creator: "dobby-aidev",
  icons: {
    icon: [
      { url: NOVA_FAVICON_DATA_URI, type: "image/svg+xml" },
      { url: "/favicon.ico?v=nova5", sizes: "any" },
      { url: "/icon.svg?v=nova5", type: "image/svg+xml" },
    ],
    apple: "/apple-touch-icon.png?v=nova5",
  },
  openGraph: {
    title: "DONA NOVA — Global Open Infrastructure Radar",
    description: "Open-source global infrastructure intelligence radar powered by real satellite and grid telemetry.",
    url: "https://nova.donacodex.com",
    siteName: "DONA NOVA",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "DONA NOVA — Global Open Infrastructure Radar",
    description: "Open-source global infrastructure intelligence radar powered by real satellite and grid telemetry.",
  },
  robots: { index: true, follow: true },
  metadataBase: new URL("https://nova.donacodex.com"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" className={`${cinzel.variable} ${jetbrainsMono.variable} ${plusJakartaSans.variable}`}>
      <head>
        <link rel="icon" href={NOVA_FAVICON_DATA_URI} type="image/svg+xml" sizes="any" />
        <link rel="shortcut icon" href={NOVA_FAVICON_DATA_URI} type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png?v=nova5" />
      </head>
      <body className="antialiased bg-[#07080e] text-[#f5f2eb]">{children}</body>
    </html>
  );
}
