import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "DONA NOVA — The World's Infrastructure Intelligence Platform",
  description:
    "Discover, understand and analyze the world's physical infrastructure through the most trusted digital intelligence platform on Earth.",
  keywords: ["infrastructure", "intelligence", "energy", "global", "platform"],
  authors: [{ name: "DONA CODEX" }],
  creator: "DONA CODEX",
  openGraph: {
    title: "DONA NOVA",
    description: "The World's Infrastructure Intelligence Platform",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "DONA NOVA",
    description: "The World's Infrastructure Intelligence Platform",
  },
  robots: { index: true, follow: true },
  metadataBase: new URL("https://donanova.com"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
