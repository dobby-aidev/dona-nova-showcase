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
      { url: "/favicon.ico" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
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
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </head>
      <body className="antialiased bg-[#06080e] text-[#f8fafc]">{children}</body>
    </html>
  );
}
