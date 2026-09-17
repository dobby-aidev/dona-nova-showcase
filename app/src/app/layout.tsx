import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "DONA NOVA — Global Open Infrastructure Radar",
  description:
    "Open-source global infrastructure intelligence radar. Explore 35,000+ power grids, water networks, and data centers in photorealistic 3D.",
  keywords: ["infrastructure", "open-source", "energy-grid", "satellite-3d", "dona-nova", "dona-codex"],
  authors: [
    { name: "dobby-aidev", url: "https://dobby.donacodex.com" },
    { name: "Dona Codex", url: "https://donacodex.com" }
  ],
  creator: "dobby-aidev",
  icons: {
    icon: [
      { url: "/favicon.svg?v=2026.3", type: "image/svg+xml" },
      { url: "/icon.svg?v=2026.3", type: "image/svg+xml" },
    ],
    shortcut: "/favicon.svg?v=2026.3",
    apple: "/favicon.svg?v=2026.3",
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
    <html lang="tr" className={inter.variable}>
      <head>
        <link rel="icon" href="/favicon.svg?v=2026.3" type="image/svg+xml" />
        <link rel="alternate icon" href="/icon.svg?v=2026.3" type="image/svg+xml" />
        <link rel="shortcut icon" href="/favicon.svg?v=2026.3" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/favicon.svg?v=2026.3" />
      </head>
      <body className="antialiased bg-[#090a0e] text-[#fcf8ee]">{children}</body>
    </html>
  );
}
